---
layout: post
title: "Nonnegative Autoencoders"
description: "Autoencoders with a nonnegative constraint that encourages part-based representations at the latent layer."
date: 2018-09-30 16:36:27 +0200
comments: true
categories: [autoencoder, nonnegativity]
facebook:
  image: /images/blog/nonnegative_autoencoder.png
twitter_card:
  type: summary_large_image
  image: /images/blog/nonnegative_autoencoder.png
---

My intuition would say that a part-based decomposition should arise naturally within an autoencoder. To encorporate
the next image in an image recognition task, it must be more beneficial to have gradient descent being able to 
navigate towards the optimal set of neural network weights for that image. If not, for each image gradient descent
is all the time navigating some kind of common denominator, none of the images are actually properly represented.
For each new image that is getting better classified, the other images are classified worse. With a proper
decomposition learning the next representation will not interfere with previous representations. Grossberg calls this
in Adaptive Resonance Theory (ART) catastrophic forgetting. 

Maybe if we train a network long enough this will be the emerging decomposition strategy indeed. However, this is not
what is normally found. The different representations get coupled and there is not a decomposition that allows
the network to explore different feature dimensions independently.

One of the means to obtain a part-based representation is to force positive or zero weights in a network. In the 
literature [nonnegative matrix factorization](https://yliapis.github.io/Non-Negative-Matrix-Factorization/) can be 
found. Due to the nonnegativity constraint the features are additive. This leads to a sparse basis where through
summation "parts" are added up to a "whole" object. For example, faces are built up out of features like eyes, nostrils,
mouth, ears, eyebrows, etc.

<!--more-->

At Louisville university
[Ehsan Hosseini-Asl (github)](https://github.com/ehosseiniasl),
[Jacek Zurada](http://www.jacekzurada.org/) (who is running for 2019 IEEE president), and
[Olfa Nasraoui (twitter)](https://twitter.com/olfanasraoui)
studied how nonnegative constraints can be added to an autoencoder in 
[Deep Learning of Part-based Representation of Data Using Sparse Autoencoders with Nonnegativity Constraints (2016)](https://arxiv.org/pdf/1601.02733.pdf).



## Results

The results are compared to the Sparse Autoencoder (SA), the Nonnegative Sparse Autoencoder (NSA), and Nonnegative Matrix 
Factorization (NMF). 

