---
layout      : post
title       : "Double-check kd-tree explanations"
description : "Double-check kd-tree explanations"
date        : 2019-09-26 15:22:11 +0200
comments    : true
categories  : []
facebook    :
  image     : /images/blog/example.png
twitter_card:
  type      : summary_large_image
  image     : /images/blog/example.png
---

# Double-check kd-tree explanations

There are quite a few explanations on kd-tree structures online. I was surprised by how many of them were flawed. I
hope this post will help some people arriving at a correct implementation.

Examples of incorrect explanations:

* <https://www.quora.com/How-does-a-k-d-tree-find-the-K-nearest-neighbors>
* <https://gopalcdas.com/2017/05/24/construction-of-k-d-tree-and-using-it-for-nearest-neighbour-search/>

An example of a correct explanation (pdf):

* <http://stanford.edu/class/archive/cs/cs106l/cs106l.1162/handouts/assignment-3-kdtree.pdf>

<!--more-->

Hence, what is happening? 

# Search

The main confusion seems to be that people want to compare the node that they are searching its neighbour of with the
left and right child of a given node in the tree. This is not how it works. We have to compare with the hyperplane
represented by this node itself.

Why the search works and why you can eliminate parts of the tree is only easy to follow if you decide to draw a 
circle. Suppose you are at a given node in the tree which is up to then the **closest** node (in Euclidean distance).
Then we can draw a circle around our search node with a radius equal to this distance.

Now we have to realize. Only when a particular hyperplane does not intersect this circle can we throw away its 
children that are on the other side of the hyperplane.
