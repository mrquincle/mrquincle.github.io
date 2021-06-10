---
layout: post
title: "Bayesian approximation"
description: "Different ways to do Bayesian approximation. From full-fledged variational messages to iterated conditional modes. Ever heard about the difference between Maximization-Expectation and Expectation-Maximization?"
date: 2014-12-21 14:35:18 +0100
comments: true
categories: [bayesian approximation, inference, Gibbs sampling, maximization-expectation]
---

In the world of Bayesian's, a model is a triplet $p(x,z,\theta)$. The observations are random variables $x$. And then there is a seemingly artificial distinction between the random variables that are called **hidden** ($z$) and other random variables that are called **parameters** ($\theta$), and are hidden as well! So, how come that parameters got their distinguished name? In the case of for example a clustering task, we can assign each observation a corresponding hidden variable: an index of the cluster it belongs to. Hence, there are as many hidden variables as there are observations. Now, in contrary, we might define parameters in two different ways:

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

The paper that I found very clarifying with respect to the different ways to do approximations to the full Bayesian method is [Bayesian K-Means as a "Maximization-Expectation" Algorithm (pdf)][1] by Welling and Kurihara. 

So, let us assume we are given a dataset $D$ (hence $p(D)$) and we want to find $p(z,\theta\|D)$.

**1. Gibbs sampling**

We can approximate $p(z,\theta\|D)$ by sampling. [Gibbs sampling](http://www.wikiwand.com/en/Gibbs_sampling) gives $p(z,\theta\|D)$ by alternating:

$$
\theta \sim p(\theta|z,D) \\
z \sim p(z|\theta,D)
$$

**2. Variational Bayes**

Instead, we can try to establish a distribution $q(\theta)$ and $q(z)$ and minimize the difference with the distribution we are after $p(\theta,z\|D)$. The difference between distributions has a convenient fancy name, the [Kullback-Leibler divergence](http://www.wikiwand.com/en/Kullback%E2%80%93Leibler_divergence). To minimize $KL[q(\theta)q(z)\|\|p(\theta,z\|D)]$ we update:

$$
q(\theta) \propto \exp (E [\log p(\theta,z,D) ]_{q(z)} ) \\
q(z) \propto \exp (E [\log p(\theta,z,D) ]_{q(\theta)} ) 
$$

This type of [variational Bayes](http://www.wikiwand.com/en/Variational_Bayesian_methods) that uses the Kullback-Leibler divergence is also known under mean-field variational Bayes.

**3. Expectation-Maximization**

To come up with full-fledged probability distributions for both $z$ and $\theta$ might be considered extreme. Why don't we instead consider a point estimate for one of these and keep the other nice and nuanced. In [Expectation Maximization](http://www.wikiwand.com/en/Expectation%E2%80%93maximization_algorithm) the parameter $\theta$ is established as the one being unworthy of a full distribution, and set to its MAP ([Maximum A Posteriori](http://www.wikiwand.com/en/Maximum_a_posteriori_estimation)) value, $\theta^*$.

$$
\theta^* = \underset{\theta}{\operatorname{argmax}} E [\log p(\theta,z,D) ]_{q(z)} \\
q(z) = p(z|\theta^*,D) 
$$

Here $\theta^* \in \operatorname{argmax}$ would actually be a better notation: the argmax operator can return multiple values. But let's not nitpick. Compared to variational Bayes you see that correcting for the $\log$ by $\exp$ doesn't change the result, so that is not necessary anymore.

**4. Maximization-Expectation**

There is no reason to treat $z$ as a spoiled child. We can just as well use point estimates $z^*$ for our hidden variables and give the parameters $\theta$ the luxury of a full distribution.

$$
z^* = \underset{z}{\operatorname{argmax}} E [\log p(\theta,z,D) ]_{q(\theta)} \\
q(\theta) = p(\theta|z^*,D) 
$$

If our hidden variables $z$ are indicator variables, we suddenly have a computationally cheap method to perform inference on the number of clusters. This is in other words: model selection (or automatic relevance detection or imagine another fancy name).

**5. Iterated conditional modes**

Of course, the poster child of approximate inference is to use point estimates  for both the parameters $\theta$ as well as the observations $z$.

$$
\theta^* = \underset{\theta}{\operatorname{argmax}} p(\theta,z^*,D) \\
z^* = \underset{z}{\operatorname{argmax}} p(\theta^*,z,D) \\
$$

To see how Maximization-Expectation plays out I highly recommend [the article][1]. In my opinion, the strength of this article is however not the application to a $k$-means alternative, but this lucid and concise exposition of approximation.

  [1]: https://www.siam.org/meetings/sdm06/proceedings/044wellingm.pdf 
