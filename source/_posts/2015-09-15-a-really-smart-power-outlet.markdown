---
layout: post
title: "Device recognition and indoor localization"
description: "Device recognition and indoor localization, enabled through a smart power outlet"
date: 2015-09-15 17:55:00 +0200
comments: true
categories:
---

We have put on [Kickstarter](https://www.kickstarter.com/projects/dobots/crownstone/) a smart power outlet with quite sophisticated technology. I think it's nice for the general hacker community to get some more insight on the technology behind it.

<object type="application/x-shockwave-flash" style="width:700px; height:400px;" data="http://vimeo.com/moogaloop.swf?clip_id=138335017&amp;server=vimeo.com&amp;show_title=0&amp;show_byline=0&amp;show_portrait=0&amp;color=ff9933&amp;fullscreen=1" allowfullscreen="true" allowscriptaccess="always">
<param name="movie" value="http://vimeo.com/moogaloop.swf?clip_id=138335017&amp;server=vimeo.com&amp;show_title=0&amp;show_byline=0&amp;show_portrait=0&amp;color=ff9933&amp;fullscreen=1" allowfullscreen="true" allowscriptaccess="always" />
</object>

## Indoor localization

A key problem (or challenge) within smart spaces is indoor localization: making estimates of users’ whereabouts. Without such information, systems are unable to react on the presence of users or, sometimes even more important, their absence. This can range from simply turning the lights on when someone enters a room to customizing the way devices interact with a specific user.

Even more important for a system to know where users exactly are, is to know where users are relative to the devices it can control or use to sense the environment. This relation between user and device location is an essential input to these systems.

At DoBots we have been working on robotics already for quite some time. One of the most well-known robotic algorithms
is SLAM (simultaneous localization and mapping). We have been porting these algorithms to the scenario in which we
have a human walking around, rather than a robot.

![SLAC devices](/images/blog/slac_devices_example.png)

You can read more on the [DoBots blog](https://dobots.nl/2015/09/03/human-slam-indoor-localization-using-particle-filters/).
Wouter has been working hard to implement it in Javascript, so it runs on any device that is supported through Cordova.

## Device recognition

At first thought, it might seem that device recognition is not possible. There are devices that use the same amount
of power. However, after contemplating for a bit there are actually three ways in which more information can be
obtained. Firstly, by measuring voltage as well as current, we can measure reactive power. So, we can distinguish
motors from lamps quite easily. Secondly, we can observe the consumption pattern over the day. Thirdly, we can sample
at a very high frequency and detect disturbances on the current curve. A device leaves its signature on the grid. The
third option is something we keep for later, but which is of course quite interesting.

Observing a device over a longer time period leads to current curves such as these:

![Fridge](/images/blog/fridge.png)

It is a fridge that turns on and off at regular time intervals. It is quite clear from this curve that the actual
power consumption value is not so relevant, the form is really telling!

We subsequently pool all kind of these features with boosting methods from machine learning. This are collections of
weak classifiers. The particular classifier we have been testing is a random committee classifier. You can read more
on the [DoBots blog](https://dobots.nl/2015/09/04/recognize-that-fridge/) again.

If your heart is with open-source and open hardware projects, consider [backing us](https://www.kickstarter.com/projects/dobots/crownstone/).
