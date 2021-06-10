---
layout      : post
title       : "Streaming to your TV"
description : "Streaming to your TV"
date        : 2020-03-22 12:21:30 +0100
comments    : true
categories  : []
facebook    :
  image     : /images/blog/example.png
twitter_card:
  type      : summary_large_image
  image     : /images/blog/example.png
---

If you're in quarantaine or in isolation, there's a lot of staying inside. Perhaps you have to be in another room.
Perhaps you just want to stream some online event to a larger screen. In either case, you want to figure out how
to stream your desktop to your TV. If you happen to have a Chromecast, this is possible, but there are many ways to
accomplish this. We will go through a few.

<!--more-->

Streaming from Firefox is possible through a utilty that's called `fx_cast`. It only works for a select list of (whitelisted)
pages. Netflix can be streamed like this for example.

If you want to have more freedom in what you stream, it is worth to look at `mkchromecast` (or home assistant) which
is a wrapper around [pychromecast](https://github.com/balloob/pychromecast). The latest release of [mkchromecast](https://github.com/muammar/mkchromecast)
is from December 2017, version 0.3.8.1. You can also clone and install the newest version 0.3.9 (not released).

```
git clone https://github.com/muammar/mkchromecast
cd mkchromecast
pip3 install .
```

We can slowly go through all kind of variants to call it, but let's just drop the bomb:

```
mkchromecast --video --command 'ffmpeg \
	-f pulse -ac 2 \
	-i default -acodec aac \
	-f x11grab -framerate 30 -video_size 3200x1800 \
	-i :0.0+0,0 \
	-vaapi_device /dev/dri/renderD128 -vf format=nv12,hwupload,scale_vaapi=w=1920:h=1080 -c:v h264_vaapi \
	-bf 4 -threads 4 \
	-preset ultrafast -tune zerolatency -maxrate 10M -bufsize 20M \
	-pix_fmt yuv420p \
	-g 15 \
	-f mp4 \
	-max_muxing_queue_size 999 \
	-movflags frag_keyframe+empty_moov \
	pipe:1'
```

You might need to remove the tabs and put it all on one line if you actually run this on the command line! So, what
does it all mean?

The `lavfi` parameter stands for a libavfilter input virtual device. This reads data from input devices that can be
anything (they do not need to be files). You can see examples online where just colors are streamed for example, or
where video is negated or other special effects are applied. Here it turns out not be necessary. :-) 

The `pulse` parameter is for audio. It uses `pulseaudio`, has two channels `-ac 2`, uses the `default` source, and the
`aac` audio codec. The `-strict experimental` option is not necessary.

Note that in pulseaudio you will need to change the input from the microphone to the "monitor" of that microphone to
be able to stream the audio that normally would come out of your laptop speakers.

When I had both lavfi and experimental I had a big mismatch between video and audio. I'll have to figure out where it
come from. In `pavucontrol` I selected the "Monitor of Built-in Audio Digital Stereo (HDMI)" channel. Now I selected the
"Monitor of Null Output". It does not sound like it went okay, but there's no mismatch now. :-)

Then we want to broadcast our desktop, this is done through a screen grab command `-f x11grab`. The frame rate and
video size are obvious. Note that the latter is quite high. Adjust it to your own screen's resolution. Check that
e.g. by `xdpyinfo | awk '/dimensions/{print $2}'`. The screen we pick is the one at `:0.0`. If you don't have a
second monitor that's probably the same for you.

This is a Yoga 900 laptop. It has an integrated Intel GPU. This can be deployed by the following combination of flags
`-vaapi_device /dev/dri/renderD128 -vf format=nv12,hwupload,scale_vaapi=w=1920:h=1080 -c:v h264_vaapi`. 

I didn't find any improvements using `-re`, supposed for real-time streaming. The `-f ismv` for smooth streaming does
not help either. It is a fragmented format. The packets and metadata about these packets are stored together. A
fragmented file can be decodable even if the writing is interrupted. It also requires less memory. It can be considered
as setting a bunch of flags like `-movflags empty_moov,faststart`, etc.


The [Google Cast documentation](https://developers.google.com/cast/docs/reference/messages#MediaData) has LIVE as a
possible `streamType`. This is used in version `0.3.9` of `mkchromecast`. The `currentTime` option should definitely
**not** be set. If not specified, the stream will start at the live position.

According to [this post](https://www.reddit.com/r/PleX/comments/b768ym/pretranscoding_question_best_ffmpeg_settings_for/)
the Chromecast (v2) is limited to 11Mbps. A buffer should be 2x the bitrate. So, if at 8Mbps, it should be set at 12M.

[Here](https://www.videosolo.com/tutorials/chromecast-mkv.html) it states what formats Chromecast supports:

* MP4
* WebM
* MPEG-DASH
* Smooth Streaming
* HTTP Live Streaming (HLS) 

A Chromecast can support a range of formats (e.g. also MKV) as long as it contains a H.264 video codec and/or an
AAC audio codec.

[DASH](https://en.wikipedia.org/wiki/Dynamic_Adaptive_Streaming_over_HTTP) stands for Dynamic Adaptive Streaming over
HTTP. It is codec-agnostic. And again can use H.264 (or VP8). 

The Chromecast [according to Google](https://developers.google.com/cast/docs/media), 1st and 2nd generation, can 
support the H.264 High Profile up to level 4.1 (720p/60fps, or 1080p/30fps). Or VP8. Then there are several delivery
methods and adaptive streaming protocols through the [Cast Application Framework (CAF)](https://developers.google.com/cast/docs/caf_receiver),
each with DRM support as well (not relevant to us):

* MPEG-DASH (`.mpd`)
* SmoothStreaming (`.ism`)
* HTTP Live Streaming (HLS) (`.m3u8`)

And some progressive download format without adaptive switching.


```
mkchromecast --video --command 'ffmpeg \
	-re \
	-f pulse -ac 2 -i default -acodec aac \
	-f x11grab -framerate 30 -video_size 3200x1800 -i :0.0+0,0 \
	-vaapi_device /dev/dri/renderD128 -vf format=nv12,hwupload,scale_vaapi=w=1920:h=1080 -c:v h264_vaapi \
	-bf 4 -threads 4 -preset ultrafast -tune zerolatency -maxrate 10M -bufsize 20M \
	-pix_fmt yuv420p -g 30 \
	-movflags isml+frag_keyframe \
	-f ismv \
	pipe:1'
```

Streaming format `hls` stands for pple HTTP Live Streaming. Unable to find a suitable output..

[Suggestion](https://developers.google.com/cast/v2/mpl_player#cors):

    To start at "live" you can specify the Infinity property as the initialTime parameter to the player.load API call

Spotify streams with:

https://community.spotify.com/t5/Other-Partners-Web-Player-etc/Chromecast-bitrate-solution-verified/td-p/4661520


Changed in mkchromecast/video.py mtype to application/x-mpegurl

Something on H.264 vs 265
