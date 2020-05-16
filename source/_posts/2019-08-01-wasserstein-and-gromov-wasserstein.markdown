---
layout      : post
title       : "Wasserstein and Gromov-Wasserstein"
description : "Wasserstein and Gromov-Wasserstein distances in multi-object recognition"
date        : 2019-08-01 12:12:07 +0200
comments    : true
categories  : []
facebook    :
  image     : /images/blog/example.png
twitter_card:
  type      : summary_large_image
  image     : /images/blog/example.png
---

# Wasserstein

Suppose we have to come up with some kind of function that defines how different two probability distributions are.
One such function is the [Kullback-Leibler divergence](https://en.wikipedia.org/wiki/Kullback%E2%80%93Leibler_divergence). 
It is an asymmetric function: it gives a different value for 
probability distribution $A$ given probability distribution $B$ versus the other way around. It is henceforth not a 
true **distance** (which is symmetric), but a so-called **divergence**. A divergence also does not satisfy the
"triangle inequality": $$D(x + y) \leq D(x) + D(y)$$ is not necessarily true for all $x$ and $y$. 
It does satisfy however two other important conditions. A divergence is always zero or larger and the divergence
is only zero if and only if $$x = y$$.

## Earth Mover's distance

There is another function that defines how different two probability distributions are. It is called the
[Earth Mover's Distance](https://en.wikipedia.org/wiki/Earth_mover%27s_distance). This name has been suggested
by Jorge Stol when he was working with CAD programs that have a function to compute the optimal earth displacement
from roadcuts to roadfills. The concept is much older though (from [Gaspard Monge](https://en.wikipedia.org/wiki/Gaspard_Monge)
in 1781, more than two centuries ago).

<!--more-->

## 1st Wasserstein distance

Mathematically this function is equivalent to the 1st [Wasserstein distance](https://en.wikipedia.org/wiki/Wasserstein_metric).
The 1st Wasserstein distance between two probability measures $\mu$ and $\nu$ is defined as:

$$W(\mu, \nu) = \inf_{\lambda \in \Gamma(\mu,\nu)} \int_{M \times M} d(x,y) d\lambda(x,y)$$ 

where $\Gamma(\mu,\nu)$ is the collection of all measures $M \times M$ with marginals $\mu$ and $\nu$.
This set $\Gamma(\mu,\nu)$ is called the set of all couplings of $\mu$ and $\nu$. We can write it also as:

$$W(\mu, \nu) = \inf_{\lambda \in \Gamma(\mu,\nu)} \int_\mu \int_\nu d(x,y) \lambda(x,y) dx dy$$ 

where we assume $\lambda$ to be well-behaved.

Informally, given all kind of ways to send over "stuff" from position $x$ to position $y$ we find the one that
minimizes (mathematically fancy the infimum) the distance $d(x,y)$ so that everything is moved.
Note, that $\mu$ and $\nu$ are probability measures. They sum to one. There is no mass lost or gained in the process.

We can use the Wasserstein distance to calculate the difference between point clouds. The above distance becomes now
discrete:

$$W(\mu, \nu) = \min_{\lambda \in \Gamma(\mu,\nu)} \sum_{x \in \mu} \sum_{y \in \nu} d(x,y) \lambda(x,y)$$

<!--
We can define the problem as a minimization problem with particular constraints.
Find a flow $F = [f_{i,j}]$ with $f_{i,j}$ the flow between $x_i$ and $y_i$ that minimizes the overall cost. That is,
solve:

$$\min \sum_i \sum_j f_{i,j} d(x_i,y_i)$$

subject to

$$f_{i,j} > 0, 1 \leq i \leq m, 1 \leq j \leq n$$

$$\sum_{i=1}^m f_{i,j} \leq 1, 1 \leq j \leq n$$

$$\sum_{j=1}^n f_{i,j} \leq 1, 1 \leq i \leq m$$

$$\sum_{i=1}^m \sum_{j=1}^n f_{i,j} = \min (m, n)$$.
-->

## Assignment problem

This can also be formulated as an assignment problem or a matching problem on a (complete) bipartite graph. 
The nodes $x \in \mu$ on the left, the nodes $y \in \nu$ on the right.
The edges between the nodes in $\mu$ and the nodes in $\nu$ have weights corresponding to their distance $d(x,y)$. Now,
define a mapping $\lambda$ that minimizes $$W(\mu,\nu)$$.

We can write the constraints on that indicate that each vertex is adjacent to exactly one edge:

$$\sum_{x \in \mu} \lambda(x,y) = 1 \quad \text{for} \quad y \in \nu$$

$$\sum_{y \in \nu} \lambda(x,y) = 1 \quad \text{for} \quad x \in \mu$$

$$0 \leq \lambda(x,y) \leq 1 \quad \text{for} \quad x \in \mu, y \in \nu$$

$$\lambda(x,y) \in \mathbb{Z} \quad \text{for} \quad x \in \mu, y \in \nu$$

The last constraint can actually be removed. When we solve it without this constraint, we will end up with an optimal
solution that satisfies this condition nevertheless.

## Gromov-Wasserstein

The Gromov-Wasserstein distance can compare point clouds of different dimension. Suppose we have
a point cloud A in 2D and a point cloud B in 3D, it can assign a distance to it. How is this possible? The distance
between two points in any dimension is just a scalar. Hence, if we do not work with the point coordinates themselves,
but only with the pairwise distances between points, we can minimize a function between the pairwise distances in A 
and the pairwise distances in B.

# Challenge

Now, the kind of distance we would like to formulate is one that can be used for multiple objects. 


