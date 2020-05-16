---
layout      : post
title       : "Playing with DMX"
description : "Playing with DMX"
date        : 2020-05-16 22:28:06 +0200
comments    : true
categories  : []
facebook    :
  image     : /images/blog/example.png
twitter_card:
  type      : summary_large_image
  image     : /images/blog/example.png
---

# Playing with DMX

During these times I decided to start playing with DMX. I bought a the [Lumeri Wash 7.10](https://www.lumeri.nl/lumeri-wash-710.html). It has RGBW leds, 9 or 16 channels, and a moving head. It uses DMX512.

The DMX in [DMX512](https://www.element14.com/community/groups/open-source-hardware/blog/2017/08/24/dmx-explained-dmx512-and-rs-485-protocol-detail-for-lighting-applications) stands for Digital Multiplex (protocol). Lights like this have a DMX input and output. so they can be chained. A collection of DMX devices is called a **universe**.

DMX is super simple. It is a serial interface at 250.000 bits per second. The electrical interface is RS-485. The 512 in DMX512 stands for the number of data bytes that can be sent. If a device uses one channel, it can support 512 devices. The above device already uses 9 or 16 channels, so I guess that can quickly become filled.

<!--more-->

To steer the UART from the PI requires it to run at this speed of 250kbaud. This is possible with some tricks. See this article on someone creating [OLA support](https://eastertrail.blogspot.com/2014/04/command-and-control-ii.html). These instructions can be found at different other locations as well.

Adjust `/boot/config.txt` and add this line at the end:

```
init_uart_clock=16000000
```

Also adjust the kernel to use serial at boot (see [here](https://elinux.org/RPi_Serial_Connection#Preventing_Linux_using_the_serial_port).

```
sudo raspi-config
```

Disable here the boot messages, but not the device itself. 

Also in `/boot/cmdline.txt` remove the console parameter. I don't know if this is actually necessary, because it already has `plymouth.ignore-serial-consoles`. I also didn't find getty on the serial line and no `/etc/inittab` file. None of the processes was using `ttyAMA0` (quick check with `ps`). I've executed the following anyway:

```
sudo systemctl disable serial-getty@ttyAMA0.service
```

When reading [here](https://www.raspberrypi.org/forums/viewtopic.php?t=244741) it states that GPIO 14/15 is used by the Bluetooth device. It can be disabled. The instructions in `/boot/overlays/README` are actually quite clear. 

```
Name:   disable-bt
Info:   Disable onboard Bluetooth on Pi 3B, 3B+, 3A+, 4B and Zero W, restoring
        UART0/ttyAMA0 over GPIOs 14 & 15.
        N.B. To disable the systemd service that initialises the modem so it
        doesn't use the UART, use 'sudo systemctl disable hciuart'.
Load:   dtoverlay=disable-bt
Params: <None>
```

Indeed `sudo systemctl disable hciuart` sounds like something that should be done then as well.

If we need Bluetooth later on, we might want to use `core_freq_min=500` to prevent core scaling. This is namely the issue. The GPIO pins get the clock from the system bus clock. The latter changes depending on the system load.

# DMX interface

I got a [DMX interface](https://bitwizard.nl/wiki/Dmx_interface_for_raspberry_pi) for the Raspberry PI. You can buy also a case, really neat.

First I've been trying QLC+.

When trying OLA, adjust `/etc/ola/ola-uartdmx.conf`.

```
/dev/ttyAMA0-break = 100
/dev/ttyAMA0-malf = 24000
device = /dev/ttyAMA0
enabled = true
```

Following the instructions on the [site](https://bitwizard.nl/wiki/Dmx_interface_for_raspberry_pi), I tried to set the board to output mode.

The `gpio` utility doesn't seem to be maintained anymore. THere is `raspi-gpio` however. Display the configuration:

```
raspi-gpio get
```

Set it like described:

```
raspi-gpio set 18 op
raspi-gpio set 18 dh
raspi-gpio set 14 a0
raspi-gpio set 15 a0
```

The result is:

```
GPIO 14: level=1 fsel=4 alt=0 func=TXD0 pull=NONE
GPIO 15: level=1 fsel=4 alt=0 func=RXD0 pull=UP
...
GPIO 18: level=1 fsel=1 func=OUTPUT pull=DOWN
```

In [this post](https://www.raspberrypi.org/forums/viewtopic.php?t=176531) it states that all this is too complicated.

## OLA

Installing OLA was very simple, just:

```
sudo apt install ola
```

Navigate to something like `192.168.86.246:9090` where you change the IP address to that of your PI.

![UART driver](/images/blog/uart_native_dmx.png)

Now I'll browse forums to make this work....
