---
layout: post
title: "Linux Graphics"
description: "Linux Graphics"
date: 2015-04-25 16:33:51 +0200
comments: true
categories: 
---

# Introduction

It all started with annoying messages that nobody seems to understand (`/var/log/syslog`):

	Apr 25 12:28:03 six kernel: [    1.346712] ata3.00: supports DRM functions and may not be fully accessible
	Apr 25 12:28:03 six kernel: [    1.347278] ata3.00: supports DRM functions and may not be fully accessible
	Apr 25 12:28:03 six kernel: [    3.047797] [drm] Initialized drm 1.1.0 20060810
	Apr 25 12:28:03 six kernel: [    3.076720] [drm] Memory usable by graphics device = 2048M
	Apr 25 12:28:03 six kernel: [    3.076726] fb: switching to inteldrmfb from EFI VGA
	Apr 25 12:28:03 six kernel: [    3.076841] [drm] Replacing VGA console driver
	Apr 25 12:28:03 six kernel: [    3.101307] [drm] Supports vblank timestamp caching Rev 2 (21.10.2013).
	Apr 25 12:28:03 six kernel: [    3.101309] [drm] Driver supports precise vblank timestamp query.
	Apr 25 12:28:03 six kernel: [    3.143256] fbcon: inteldrmfb (fb0) is primary device
	Apr 25 12:28:03 six kernel: [    3.146818] [drm] Initialized i915 1.6.0 20141121 for 0000:00:02.0 on minor 0
	Apr 25 12:28:03 six kernel: [    3.424167] [drm:intel_set_pch_fifo_underrun_reporting [i915]] *ERROR* uncleared pch fifo underrun on pch transcoder A
	Apr 25 12:28:03 six kernel: [    3.424202] [drm:intel_pch_fifo_underrun_irq_handler [i915]] *ERROR* PCH transcoder A FIFO underrun
	Apr 25 12:28:03 six kernel: [    3.848413] i915 0000:00:02.0: fb0: inteldrmfb frame buffer device

What is this problem about FIFO (first-in-first-out) underruns? What is a transcoder? What is PCH? What is a DRM? The
following quest will try to find some answers...

# The system

What do I actually have residing in my laptop? First of all, it is important to know what to search for. There are three basic
components that we need to know, namely, what is:

* the processor
* the chipset 
* the integrated graphics unit

## Processor

I have a N56VZ which has an **i7-3610QM** processor. The processor architecture is from the 
[Ivy Bridge](http://en.wikipedia.org/wiki/Ivy_Bridge_%28microarchitecture%29) variety (on 22 mm). There are plenty of
datasheets available for the [7-series chipset (pdf)](www.intel.nl/content/dam/www/.../7-series-chipset-pch-datasheet.pdf).
Note also that this Ivy Bridge series is also called the 3rd Gen Intel Core family (see also this 
[Intel Datasheet (pdf)](http://www.intel.com/content/dam/www/public/us/en/documents/datasheets/3rd-gen-core-family-mobile-vol-1-datasheet.pdf)).

## Chipset

The chipset that is used in tandem with this processor is, [some people state](http://www.notebookcheck.net/Review-Asus-N56VZ-S4044V-Notebook.78305.0.html), 
the HM76 chipset. In particular, the [BD82HM76 PCH](http://ark.intel.com/products/64345/Intel-BD82HM76-PCH). This "PHC"
is known under the name *Panther Point*.  

So, what we have here is a hardware setup that is divided over the CPU and a thing called a PCH. PCH stands for
[Platform Controller Hub](http://en.wikipedia.org/wiki/Platform_Controller_Hub). There are some nice pictures in a 
[presentation (pdf)](http://research.engineering.wustl.edu/~songtian/pdf/intel-sandy.pdf) on the 2nd Gen processors,
which show how both the CPU and the PCH are integrated in the same chip (but on separate dies). The PCH of this previous
generation is called *Cougar Point*. 

![The "Cougar Point" Platform Controller Hub (2011)](/images/2011platform.png)

Another picture from Intel shows the Panther Point PCH:

![The "Panther Point" Platform Controller Hub (2012)](/images/hm76.png)

Anyway, we apparently have the **BD82HM76** chipset, the "Panther Point" PCH (from 2012).

## Integrated graphics

The Intel integrated graphics unit in my Intel Core i7-3610QM system is a **HD Graphics 4000** running on 650 MHz base speed and 1100 MHz turbo speed [notebookcheck.net](http://www.notebookcheck.net/Intel-HD-Graphics-4000.69168.0.html).
The HD Graphics 4000 is an [Intel HD](http://en.wikipedia.org/wiki/Intel_HD_and_Iris_Graphics#Ivy_Bridge) variant 
compatible with the Ivy Bridge line of processors.

# Linux 

So, how does Linux address this integrated graphics card? The first entity we encounter is the DRM 
([Direct Rendering Manager](http://en.wikipedia.org/wiki/Direct_Rendering_Manager)). The DRM provides a single entry 
point for multiple user-space applications to use the video card.

![DRM Architecture by Javier Cantero - Own Work. Licensed under CC BY-SA 4.0 via Wikimedia Commons](http://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/DRM_architecture.svg/1246px-DRM_architecture.svg.png)

The Direct Rendering Manager has a DRM core that is independent of the specific drivers required for whatever type of
hardware that is on your system. It provides the interface to user-space code. A driver consists out of two parts, GEM ([Graphics
Execution Manager](http://en.wikipedia.org/wiki/Graphics_Execution_Manager)) and KMS ([Kernel Mode Setting](http://en.wikipedia.org/wiki/Mode_setting)).
GEM has been developed by Keith Packard and Eric Anholt (see [lwn.net](https://lwn.net/Articles/283798/)) from Intel.

The reasoning behind GEM is pretty interesting. It tries to remove latency as much as possible, which is nicely
visualized by the following picture.

![evdev and GEM by Shmuel Csaba Otto Traian. CC BY-SA 3.0 (http://creativecommons.org/licenses/by-sa/3.0) or GFDL (http://www.gnu.org/copyleft/fdl.html), via Wikimedia Commons](http://upload.wikimedia.org/wikipedia/commons/a/a1/Linux_kernel_INPUT_OUPUT_evdev_gem_USB_framebuffer.svg)

KMS allows to set display modes, as its name betrays, from kernel-space. A user space graphics server (like X) does now
also not need superuser rights anymore (in theory). The display mode concerns matters such as screen resolution, color depth, and
refresh rate. Of course, the functionality of GEM and KMS could have been implemented in a single software entity, but
there are [technical reasons](https://dvdhrm.wordpress.com/2013/09/01/splitting-drm-and-kms-device-nodes/) not to do so
(basically to account for split hardware).

Laurens Pinchart has a nice presentation on DRM, KMS, and in particular, writing drivers at 
[YouTube](https://www.youtube.com/watch?v=Ja8fM7rTae4). The picture below is from his presentation.

![Device Model SoC (by Laurens Pinchart)](/images/device_model_soc.png)

You see that in memory there are two structures, frame buffers (old) and planes (new). Subsequently, you see something
that sounds very old-fashioned, a CRTC (Cathode Ray Tube Controller). This is just nomenclature from the past. It is
basically a reference to a scan-out buffer, a part of (Video) RAM that will be displayed on your screen. It also 
has (a reference to) a display mode, offsets into the video memory, etc. The controller links to an encoder (which can
be off-chip). If it links to multiple encoders, these will receive data from the same scanout buffer, so they will
display the same, cloned, data. The connectors, finally, can be only connected to one encoder, and know how to talk
HDMI, TVout, CRT, LVDS, etc. It also has the information about the display, [EDID data](http://en.wikipedia.org/wiki/Extended_Display_Identification_Data), [DPMS](http://en.wikipedia.org/wiki/VESA_Display_Power_Management_Signaling), and connection status. Make sure to read 
also the man-pages about [drm-kms](http://www.linuxhowtos.org/manpages/7/drm-kms.htm).

Startup with `drm.debug=14` (or if you're a hexademically inclined person, `drm.debug=0x0e`) and you will get plenty of debug information from the DRM. For example,
that we have the Panther Point PCM is indeed confirmed in the syslog:

	Apr 25 13:12:35 six kernel: [    3.243360] [drm] Initialized drm 1.1.0 20060810
	Apr 25 13:12:35 six kernel: [    3.280255] [drm:i915_dump_device_info] i915 device info: gen=7, pciid=0x0166 rev=0x09 flags=is_mobile,need_gfx_hws,is_ivybridge,has_fbc,has_hotplug,has_llc,
	Apr 25 13:12:35 six kernel: [    3.280271] [drm:intel_detect_pch] Found PantherPoint PCH

Just pore over the information yourself, restarting your computer with this debug flag. You will see for example how
many display pipes are available (3 in my case). It will enable something like `ENCODER:31:LVDS-31` and `CONNECTOR:30:LVDS-1`. 
And you spot how there are several connectors to choose from:

	Apr 25 13:12:35 six kernel: [    3.303850] [drm:intel_dsm_platform_mux_info] MUX info connectors: 5
	Apr 25 13:12:35 six kernel: [    3.303853] [drm:intel_dsm_platform_mux_info]   port id: LVDS
	Apr 25 13:12:35 six kernel: [    3.303860] [drm:intel_dsm_platform_mux_info]   port id: Analog VGA
	Apr 25 13:12:35 six kernel: [    3.303867] [drm:intel_dsm_platform_mux_info]   port id: HDMI/DVI_C
	Apr 25 13:12:35 six kernel: [    3.303874] [drm:intel_dsm_platform_mux_info]   port id: DisplayPort_B
	Apr 25 13:12:35 six kernel: [    3.303881] [drm:intel_dsm_platform_mux_info]   port id: DisplayPort_D

Something interesting to our errors are latency settings:

	Apr 25 13:12:35 six kernel: [    3.304061] [drm:intel_print_wm_latency] Primary WM0 latency 12 (1.2 usec)
	Apr 25 13:12:35 six kernel: [    3.304063] [drm:intel_print_wm_latency] Primary WM1 latency 4 (2.0 usec)
	Apr 25 13:12:35 six kernel: [    3.304065] [drm:intel_print_wm_latency] Primary WM2 latency 16 (8.0 usec)
	Apr 25 13:12:35 six kernel: [    3.304067] [drm:intel_print_wm_latency] Primary WM3 latency 32 (16.0 usec)
	Apr 25 13:12:35 six kernel: [    3.304068] [drm:intel_print_wm_latency] Sprite WM0 latency 12 (1.2 usec)
	Apr 25 13:12:35 six kernel: [    3.304070] [drm:intel_print_wm_latency] Sprite WM1 latency 4 (2.0 usec)
	Apr 25 13:12:35 six kernel: [    3.304072] [drm:intel_print_wm_latency] Sprite WM2 latency 16 (8.0 usec)
	Apr 25 13:12:35 six kernel: [    3.304073] [drm:intel_print_wm_latency] Sprite WM3 latency 32 (16.0 usec)
	Apr 25 13:12:35 six kernel: [    3.304075] [drm:intel_print_wm_latency] Cursor WM0 latency 12 (1.2 usec)
	Apr 25 13:12:35 six kernel: [    3.304077] [drm:intel_print_wm_latency] Cursor WM1 latency 4 (2.0 usec)
	Apr 25 13:12:35 six kernel: [    3.304079] [drm:intel_print_wm_latency] Cursor WM2 latency 16 (8.0 usec)
	Apr 25 13:12:35 six kernel: [    3.304080] [drm:intel_print_wm_latency] Cursor WM3 latency 64 (32.0 usec)

At [virtuousgeek](http://virtuousgeek.org/blog/index.php/2011/01/) some matters are explained around power
management of displays. For example memory can enter self-refresh in which it consumes way less power. The display
plane FIFO watermarks can be set conservatively, however, this leads to long periods in which self-refresh doesn't 
happen. It can be set aggressively, FIFO underruns can occur. See [this nice FPGA implementation](https://eewiki.net/pages/viewpage.action?pageId=20939499) of a FIFO buffer to
understand watermarks in more detail.

Now, we know what kind of hardware we have, let us first try to blindly apply the newest kernel from Intel...

# Trying the newest DRM kernel 

We try to run the newest kernel from the guys who are concerned with incorporating the lastest changes from Intel 
using the `drm-intel-next` packages from kernel.ubuntu.com:

```sh
#!/bin/sh

website=kernel.ubuntu.com/~kernel-ppa/mainline
kernel=2015-04-24-vivid
version=4.0.0-997
subversion=4.0.0-997.201504232205

wget ${website}/drm-intel-next/${kernel}/linux-image-${version}-generic_${subversion}_amd64.deb
wget ${website}/drm-intel-next/${kernel}/linux-headers-${version}_${subversion}_all.deb
wget ${website}/drm-intel-next/${kernel}/linux-headers-${version}-generic_${subversion}_amd64.deb

sudo dpkg -i linux-headers-${version}*.deb linux-image-${version}*.deb
```

Installing this kernel (contrary to just kernel 4.0.0 RC7 for example) leads to trouble. Moreover, the same error about
underruns on the transcoder occurs... So, this is not something already being addressed... And that's all we wanted to
know. So, we go back to the default kernel (`4.0.0-040000rc7-generic #201504142105` of April the 14th). 

This gives me an idea. Let's disable some of the power saving options of the i915 kernel module.

```sh
sudo grep '' /sys/module/i915/parameters/*
```

Subsequently I tried the option `i915.enable_fbc=1` (to see if compression would lower the bandwidth and hence lead to
fewer underruns). The rigorous option `i915.powersave=0` didn't work as well. There is an option `i915.enable_rc6=3`
on my system. I set it to `0`, but I guess powersave overrules all that anyway. Also setting `i915.fastboot=1` doesn't
get rid of the underruns.
All this is not a very thought out approach anyway...

If you `git clone git://kernel.ubuntu.com/virgin/linux.git v4.0-rc7`, and navigate to `drivers/gpu/drm/i915` you will
encounter a file `intel_fifo_underrun.c` which supports underrun detection on the PCH transcoder. It is the last 
function in the file:

```c
/**
 * intel_pch_fifo_underrun_irq_handler - handle PCH fifo underrun interrupt
 * @dev_priv: i915 device instance
 * @pch_transcoder: the PCH transcoder (same as pipe on IVB and older)
 *
 * This handles a PCH fifo underrun interrupt, generating an underrun warning
 * into dmesg if underrun reporting is enabled and then disables the underrun
 * interrupt to avoid an irq storm.
 */
void intel_pch_fifo_underrun_irq_handler(struct drm_i915_private *dev_priv,
					 enum transcoder pch_transcoder)
{
	if (intel_set_pch_fifo_underrun_reporting(dev_priv, pch_transcoder,
						  false))
		DRM_ERROR("PCH transcoder %c FIFO underrun\n",
			  transcoder_name(pch_transcoder));
}
```

It is nice that the message will be only displayed once. This is initiated through the IRQ from the Intel graphics
unit. And, of course, this is at the end: it's only the guy reporting the bad news.

The `intel_display.c` has a suspicious statement about Gen 2 chips:

```c
/*
 * Gen2 reports pipe underruns whenever all planes are disabled.
 * So don't enable underrun reporting before at least some planes
 * are enabled.
 * FIXME: Need to fix the logic to work when we turn off all planes
 * but leave the pipe running.
 */
if (IS_GEN2(dev))
	intel_set_cpu_fifo_underrun_reporting(dev_priv, pipe, true);
```

Of course, this is reporting about underruns for the CPU, not the PCH, and it is Gen 2, not Gen 3 of the chips. But it
might be a symptom of something peculiar in the hardware.

In the [North Display Registers](http://www.x.org/docs/intel/HD/IHD_OS_Vol_3_Part3_BJS.pdf) document you see a nice
overview of the sequence in which the display needs to be set. 

![Display Mode Set Sequence](/images/display_mode_set_sequence.png)

You can follow along in the code, in particular, in the function `ironlake_crtc_enable`. Here you will see an order 
like `intel_enable_pipe` -> `ironlake_pch_enable` -> `intel_crtc_enable_planes`. What is remarkable is that step 7
in which the planes are configured is done after the port on the PHC is enabled in the code. In the haswell code, 
this is the same, but this function is preceded with `haswell_mode_set_planes_workaround`. It is also interesting to
note that the "Notes" in this table state that the CPU FDI Transmitter should not be set to idle while the PCH
transcoder is enabled because it will lead to PCH transcoder underflow.

On bugzilla there are several bug reports on the FIFO underrun, such as [79261](https://bugzilla.kernel.org/show_bug.cgi?id=79261).
However, none of them seems to be about the HD Graphics 4000 in particular, and even less providing any solution.
A [patch](https://bugs.archlinux.org/task/43848?getfile=12710) for ArchLinux just makes `DRM_DEBUG` messages from the `DRM_ERROR` messages.

What I can think of are only a few things (because I don't understand much of it, yet):

* Somehow the initialization isn't done correctly. Clocks aren't initialized at the right time, not synchronized. Or
anything else with respect to initialization is forgotten.
* Latency is configured incorrectly. Perhaps the BIOS of my Asus (although up to date) hands over latency values that
are not sufficiently high.
* The interrupt is generated incorrectly (as in Gen2, for example indeed when all planes are disabled).

My issues aren't solved, so I'll need to delve further into details some other time.

# More literature

If you'd like to read more:

* [PCH Registers (pdf)](https://01.org/linuxgraphics/sites/default/files/documentation/ilk_ihd_os_vol3_part3r2.pdf) 
* [Display Watermark Guide (pdf)](https://01.org/linuxgraphics/sites/default/files/documentation/intel-gfx-prm-osrc-hsw-displaywatermark_guide.pdf)
* [Jesse Barnes' blog](http://virtuousgeek.org/blog/)
* [Daniel Vetter's blog](http://blog.ffwll.ch/)
* [David Herrmann's blog](https://dvdhrm.wordpress.com/) 
* [Intel 7 Series PCH datasheet (pdf)](http://www.intel.nl/content/dam/www/public/us/en/documents/datasheets/7-series-chipset-pch-datasheet.pdf)
* [intel_display.c](http://cgit.freedesktop.org/drm-intel/tree/drivers/gpu/drm/i915/intel_display.c)

David Herrmann for example is the guy behind render nodes (integrated [since 3.17](http://kernelnewbies.org/Linux_3.17)).

The Intel 7 Series PCH datasheet contains all kind of interesting information. See for example Fig. 5-13 for another
view on the display architecture.



<!-- 
![Intel display](/images/intel_display.png)
-->



