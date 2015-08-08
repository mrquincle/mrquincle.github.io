---
layout: post
title: "Legendre Transform"
description: "Legendre Transform"
date: 2015-08-08 21:51:39 +0200
comments: true
categories:
customcss:
  - '//cdnjs.cloudflare.com/ajax/libs/vis/4.7.0/vis.css'
customjs:
  - '//cdnjs.cloudflare.com/ajax/libs/vis/4.7.0/vis.js'
---

The [Legendre Transform](https://en.wikipedia.org/wiki/Legendre_transformation) describes a function - in the normal
Legendre case, a convex function (but for the generalized case, see [[1]]) - as a function of its
[supporting hyperplanes](https://en.wikipedia.org/wiki/Supporting_hyperplane). In the case of a 2D function these are
supporting lines. The supporting lines are the lines that just touch the function. These lines do not intersect the
function anywhere else if the function is convex.

In the following example, we will get get the Legendre transform of the function:

$$f(x)=c x^2$$

And in particular, $$c=2$$.

In the animation below the first line that is drawn is the convex function $$f(x)$$ at hand. Subsequently we will be
performing a for loop in which we draw lines $$h(m)$$ over different slopes $$m$$. The curves $$k(m)$$ depict the
difference between $$f(x)$$ and the line $$h(m)$$. The maximum difference is found by $$sup_x$$, the supremum operation,
which sweeps over all $$x$$. This difference is visualized through a single peak with height $$g(m)$$. Last, the
Legendre transform is drawn as $$g(m)$$ for all different slopes $$m$$ we try.

$$g(m)=\frac{1}{4c}m^2$$

To refresh the animation, press F5.

<div id="visualization"></div>

I hope the Lebesque transform is a little bit less mysterious after you've seen this animation. The animation has been
created by making use of the [vis.js](http://visjs.org/) library. The source code can be found at [legendre.js](/javascripts/legendre.js).

1. [Legendre-Fenchel Transforms in a Nutshell][1], a good explanation of the Legendre-Fenchel generalization of the Legendre transform

[1]: http://odessa.phy.sdsmt.edu/~andre/PHYS743/lfth2.pdf "Legendre-Fenchel Transforms in a Nutshell (2005) Touchette"

<script type="text/javascript" src="/javascripts/legendre.js">

