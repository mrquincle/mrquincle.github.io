---
layout: post
title: "Bayesian approximation"
date: 2014-12-21 14:35:18 +0100
comments: true
categories: 
---

In the world of Bayesian's, a model is triplet $p(x,z,\theta)$. The observations are random variables $x$. And then there is a seemingly artificial distinction between the random variables that are called **hidden** ($z$) and other random variables that are called **parameters** ($\theta$), and are hidden as well! So, how come that parameters got their distinguished name? In the case of for example a clustering task, we can assign each observation a corresponding hidden variable: an index of the cluster it belongs to. Hence, there are as many hidden variables as there are observations. Now, in contrary, we might define parameters in two different ways:

* The number of parameters is fixed. The parameters are defined as that part of the model that is not adjusted with respect to the number of observations. In $k$-means there are $k$ means that need to be estimated. There are not more means to be estimated if the number of observations grows.
* Parameters are more variable then the hidden variables. There are not just as many parameters as observations, no their number needs to be derived from the data. In nonparameteric Bayesian methods there will be more clusters (means) when the number of observations grows.

Consider a dataset $D$, we would like to get our hands on $p(D,z,\theta)$. If this all concerns discrete variables, this is a 3D 'matrix' (a tensor of rank 3) with the observations along one dimension, the hidden variables along another dimension, and the parameters along the third dimension. The joint distribution $p(D,z,\theta)$ would tell us everything. Some examples where either marginalize out a variable, or use the definition of a conditional probability:

$$
p(D,z) = \int d\theta \ p(D,z,\theta) \\
p(z) = \int \int d\theta dz \ p(D,z,\theta) \\
p(z|D) = p(z,D)/p(D)
$$

To get to the matrix $p(D,z)$ we sum over all entries in the rank 3 matrix in the direction of the dimension $\theta$. In other words, we are not interested anymore to what kind of fine granular information $\theta$ brings to bear. We are only interested in how often $D$ occurs with $z$.

The problem is, we often do not have $p(D,z,\theta)$. 
Now, we suppose we have instead all of the following conditional distributions, $p(D|z,\theta)$, $p(z|\theta,D)$, and $p(\theta|D,z)$, would we have enough information?

The answer is a resounding yes. If you have all conditional distributions amongst a set of random variables you can reconstruct the joint distribution. It always helps to experiment with small discrete conditional and joint probability tables. In [this question](https://stats.stackexchange.com/questions/129956/how-to-derive-gibbs-sampling) on <https://stats.stackexchange.com> you see how I construct a joint probability table from the corresponding conditional probability tables. Note the word **corresponding**: as Lucas points out in his answer there are problems with **compatibility**. If the conditional probabilities correspond to a joint probability, the latter can be found. However, if you come up with random conditional probability tables it is very likely that the joint probability table does not exist. 

[comment]: <> Three people ($A,B,C$) drinking pass each other a bottle.


