---
layout      : post
title       : "Start of a mathematical journey"
description : "Start of a mathematical journey"
date        : 2020-04-26 11:49:53 +0200
comments    : true
categories  : []
facebook    :
  image     : /images/blog/example.png
twitter_card:
  type      : summary_large_image
  image     : /images/blog/example.png
---

# Start of a mathematical journey

Browsing a book that goes beyond high-school math and talks about Hilbert spaces, Polish spaces, Banach spaces,
seperable Banach spaces, Ito-Nisio's theorem, Markov's inequality, the monotone convergence theorem, and uses
terminology like "'has full support $\mathbb{R}^k$, "converges in $\mathbb{H}$", "has positive probability under the prior", 
"converges uniformly, in mean", "in the almost sure sense", "closure of the linear span", "set of bounded functions
relative to the uniform norm" (the first two pages of the chapter after the introduction), I come to realize that 
I'd like to spend much more time on the basic mathematical objects that are part of this universe.

The term that pops out is [Polish space](https://en.wikipedia.org/wiki/Polish_space). What kind of space is that?
According to Wikipedia a Polish space is a (1) **separable**, (2) **completely metrizable** topological space. It is not some kind of land owned
by Poland, but it is actually named after Polish mathematicians.

<!--more-->

## Metrizable

The term **metrizable** sounds like something without a **metric**, but where a metric, a distance measure, can be
added. This seems indeed to be the case. So, how do we know if something is metrizable? For this scientists came up
with metrization theorem's. The first one we encounter is [Urysohn's](https://en.wikipedia.org/wiki/Metrizable_space)
which mentions a property called **second-countable** together with some other properties. Now it is not hard to think
that then there must exist also a more general object than a **metrizable** space, namely 
a [second-countable space](https://en.wikipedia.org/wiki/Second-countable_space). And yes, there is!
Moreover, there are all kind of ways to represent "countability", whence 
[countability axioms](https://en.wikipedia.org/wiki/Axiom_of_countability). 

The following axioms exist and all have to do with **size** in some very abstract sense:

* a sequential property;
* a first-countable property;
* a second-countable property;
* a separable property;
* a Lindelöf property, and
* a $\sigma$-compact property.

All these properties somehow limit the number of sets that exist in the space characterized by them.

### First-countable

Let us skip the very abstract sequential property for now and study the first-countable property. It states that each
point has a **countable local base**. Formally, 
for each point $x$ in space $X$, there exists a *sequence of neighborhoods* $N_1, N_2, \ldots$ (of $x$) such that for any
neighborhood $N$ of $x$ there exists an integer $i$ with $N_i$ contained in $N$.
So, if we pick a neigborhood $N$, we will be able to come with a sequence, probably of smaller and smaller 
neighborhoods of which one of them is, in the end, contained in $N$. An example is a metric space. The set of
*open balls* centered at $x$ with radius $1/n$ for integers $n > 0$ for a countable local base at $x$. The radius
shrinks with $n$ becoming larger. So for any neighborhood $N$ of $x$ we will after shrinking the balls enough, 
have a ball that ends up entirely within this neighborhood.

An example of a space that does not have this property is the [quotient space](https://en.wikipedia.org/wiki/Quotient_space_(topology)) 
$\mathbb{R}/\mathbb{N}$. A quotient space is a space where points are glued together. Below you see the creation of
a topological sphere as the quotient space of a disk. The border of the disk is *glued* together to one point.
See Figure 1 ([license](https://creativecommons.org/licenses/by/3.0/deed.en)).

{% img right half /images/blog/quotient_space.gif "Figure 1. Quotient space (by Subh83)." %}

I was triggered by one of commenters talking about *one point compactification* on [Baez's article](https://golem.ph.utexas.edu/category/2008/08/polish_spaces.html) 
on Polish spaces and comparing them to locally compact spaces. This one point compactification, or 
[Alexandroff extension](https://en.wikipedia.org/wiki/Alexandroff_extension) is an extension of
a noncompact topological space by adjoining a single point in such a way that the resulting space is **compact**.
The inverse stereographic projection $S^{-1} : \mathbb{R} \hookrightarrow S^2$ is a homeomorphism from the Euclidean
plane to the unit sphere without the north pole $(0,0,1)$. Only adding that one point *completes* the space so that
it becomes compact, see Figure 2 ([license](https://creativecommons.org/licenses/by-sa/4.0/)).

![Figure 2. Inverse stereographic projection (by CheChe).](/images/blog/stereographic_projection.png)

Again, let us consider the quotient space
$\mathbb{R}/\mathbb{N}$ where the points glued together are the natural numbers $\mathbb{N}$. This space is not first
countable.

Important properties of a first-countable space is that every subspace of such a space is first-countable and that
a countable product of such spaces is also first-countable.

### Second-countable

A [second-countable](https://en.wikipedia.org/wiki/Second-countable_space) space is also called a completely separable
space. A space $T$ is second-countable if there exists a countable collection $$\mathcal{U} = \{ U_i \}_{i=1}^\infty$$ of
open subsets of $T$ such that any open subset of $T$ can be written as a union of elements of a subfamily of $\mathcal{U}$.
In case you think, that set is large! Yes, you see the $\infty$ symbol, but a [countable](https://en.wikipedia.org/wiki/Countable_set) 
set is actually restricted in size. A countable set has the same cardinality (number of elements) as the set of natural
numbers or a subset thereof. Hence, a countable set can actually be countable *infinite*, but it is still small in the
sense that there are larger sets. The *uncountable* sets are such larger sets (e.g. the set of real numbers).

If a space has a **countable base**, it also has a **countable neighborhood base** (first-countable). The property
of above can be seen as a *local* property, while the second-countable property makes it a *global* property for the 
space. A base $B$ of a space $X$ with a topology $T$ is a collection of subsets of $X$ such that every open set in $X$
can be written as a union of elements of $B$. The base is said to *generate* the topology $T$. This means that
(1) base elements *cover* $X$ and (2) that any finite intersection of elements of $B$ can be written as a union of 
elements of $B$. Thus the base elements are elementary in some way. You can cover $X$ by unions of elements in $B$, 
no intersections are required.

{% youtube nRiykR8uwTQ %}

All metric spaces are first-countable, but not all metric spaces are second-countable. 

## Separation axioms

The *countability* axioms distinguish different topological spaces. However, countability in the sense of some kind of
limitation on **size** is not the only property that is interesting to mathematicians. There is a similar body of 
research that studies **seperability** as property of spaces.
The [separation axioms](https://en.wikipedia.org/wiki/Separation_axiom), at times named after Tychonoff, give a
meaning to the concept of being *topologically distinguishable*. We do not want sets only to be *distinct*, we want
to say things about the uniqueness of their neighborhood. The properties that are relevant here:

* topologically distinguishable;
* separated;
* separated by neighborhoods;
* separated by closed neigborhoods;
* separated by a continuous function;
* precisely separated by a continuous function.




