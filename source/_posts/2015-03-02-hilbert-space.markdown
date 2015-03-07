---
layout: post
title: "Hilbert Space"
description: "What is a Hilbert space?"
date: 2015-03-02 19:39:44 +0100
comments: true
published: false
categories: [Hilbert, operators, probability]
---

A Hilbert space is very much like an Euclidean space, but it's different enough to be quite confusing! It has four
essential elements:

+ It is a vector space. If you have a vector $a$ and a vector $b$ you can create a vector with elements that are summed
element-wise. In `octave` you will need to use a `.+` operation at times for this operation.
+ It has a norm. Vectors have a certain **size**. An example of a norm is $||a||=\sqrt(a_0^2, \ldots, a_k^2)$.
+ It has an inner product. The counterpart of the element-wise sum operation, a product between elements in the vector.
The inner product defines angles, orthogonality, etc.
+ It is complete. This is too complicated to handle in a few lines.

A Hilbert space houses no ordinary vectors. Its vectors are full-fledged functions. Not functions in the form of lines
in some 3D space, no, functions in the form of points. A function is a single point in an (in)finite-dimensional space.
Conside for example the function $f(x)=a sin(bx)$. If we consider $a$ and $b$ as coordinates in a Hilbert space, we 
immediately see that this is a two-dimensional space. Every point in this two-dimensional space is a choice for $a$ and
$b$. The distance between a function $f_0(x)=a_0 sin(b_0 x)$ and $f_1(x)=a_1 sin(b_1 x)$ can be defined in terms of 
$a_i$ and $b_i$. 


>> The reason I'm interested in Hilbert spaces is because of operators. If I really want to understand probability
theory it seems I've to have a better understanding of probabilities and conditional probabilities as operators.

A function can be mapped to a value it takes at a certain value.

# Dense

Dense is such a word which is easy to skim over. It however has a simple meaning. The rationals are dense, between 
every two rationals there is a rational in between. This is different from the integers that certainly do not have that
property.


# Literature

The following text books have a complete treatment of Hilbert spaces:

+ A Course in Modern Mathematical Physics: Groups, Hilbert Space and Differential Geometry 
+ Hilbert Space Methods in Signal Processing
+ Hilbert Space Embeddings of Hidden Markov Models

