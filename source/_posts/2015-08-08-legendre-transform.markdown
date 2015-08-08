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

The [Legendre transform](https://en.wikipedia.org/wiki/Legendre_transformation) describes a function - in the normal
Legendre case, a convex function (but for the generalized case, see [[1]]) - as a function of its
[supporting hyperplanes](https://en.wikipedia.org/wiki/Supporting_hyperplane). In the case of a 2D function these are
supporting lines. The supporting lines are the lines that just touch the function. These lines do not intersect the
function anywhere else if the function is convex.

Why is the Legendre transform interesting? It is basically just writing down a function in a different manner. The
Legendre transform is particular useful in the situation that the derivatives of a function $$f(x)$$ are easier to
describe than the function itself. For a nice introduction see [[2]]. Intuitively, we map from points $$(x,y)$$ to
$$(m,z)$$, with $$m$$ the slope and $$z$$ such that we can recover $$x$$ and $$y$$.

In the following example, we will get get the Legendre transform of the function:

$$f(x)=c x^2$$

And in particular, $$c=2$$.

The Legendre transform is defined (with proper domain $$I$$) by:

$$g(m)=\sup_{x \in I}(mx - f(x))$$

In the animation below the first curve that is drawn is the <font color='blue'>convex function</font> $$f(x)$$ at hand.
Subsequently we will be performing a for loop in which we draw <font color='orange'>lines</font> $$h(m)$$ over different slopes $$m$$.
The <font color='purple'>curves</font> $$k(m)$$ depict the
difference between $$f(x)$$ and the line $$h(m)$$.
The maximum difference is found by $$sup_x$$, the supremum operation, which sweeps over all $$x$$.
This difference is visualized through a <font color='green'>single peak</font> with height $$g(m)$$.
Last, the <font color='red'>Legendre transform</font> is drawn as $$g(m)$$ for all different slopes $$m$$ we try.

$$g(m)=\frac{1}{4c}m^2$$

To refresh the animation, press F5.

<div id="visualization"></div>

I hope the Lebesque transform is a little bit less mysterious after you've seen this animation. The animation has been
created by making use of the [vis.js](http://visjs.org/) library. The source code can be found at [legendre.js](/javascripts/legendre.js).

## Physics

A very common example of the [Legendre transform in physics](https://www.wikiwand.com/en/Hamiltonian_mechanics#/Mathematical_formalism) is the one that transform the Lagrangian into the Hamiltonian. The Lagrangian describes a system in generalized position and velocity
coordinates:

$$\cal{L}(q_j,\dot{q}_j,t)$$

The Hamiltonian is the Legende transform of the Laplacian:

$$\cal{H}(q_j,p_j,t)=\left( \sum_i \dot{q}_i p_i \right) - \cal{L}(q_j,\dot{q}_j,t)$$

The Lagrangian is the function $$f(x)$$ of above. The sum (or actually, the inner product $$\left<\dot{q},p\right>$$) is replacing the
$$mx$$ term.

## Probability theory

The rate function is defined as the Legendre transform of the logarithm of the moment generating function of a random
variable.


1. [Legendre-Fenchel Transforms in a Nutshell][1], a good explanation of the Legendre-Fenchel generalization of the Legendre transform
2. [Making Sense of the Legendre Transform][2]

[1]: http://odessa.phy.sdsmt.edu/~andre/PHYS743/lfth2.pdf "Legendre-Fenchel Transforms in a Nutshell (2005) Touchette"
[2]: http://users.df.uba.ar/ariel/materias/FT3_2011_2C/Extra/LegendreTransform.pdf "Making Sense of the Legendre Transform"
<script type="text/javascript" src="/javascripts/legendre.js">

