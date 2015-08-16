---
layout: post
title: "Dirichlet Process Mixture of Factor Analysers"
description: "Dirichlet Process Mixture of Factor Analysers"
date: 2015-08-09 17:25:52 +0200
comments: true
categories:
---

Factor analysis is the term used to describe datasets in which the raw observations live in a space of higher dimension than if they would be described by some hidden variables. For example, imagine a 3D space where the observations are distributed over a single plane in this space. There are very large regions in the space without any observations at all. The hidden variables are called factors. The observations are **linear combinations** of these factors.

An individual factor analyzer can be described as the difference between the observations $$x$$ and the mean $$\mu$$ (these are vectors, just forgive me for not making everything bold):

$$x - \mu = \Lambda z + \epsilon$$

For individual observations:

$$x_i - \mu_i = l_{i1} z_1 + \ldots + l_{ik} z_k + \epsilon_i$$

The term $$\Lambda$$ is the so-called loading matrix. For the individual observation this is a constant $$l_{ij}$$ with respect to each of the $$k$$ factors $$z_1, \ldots, z_k$$. The factor $$\epsilon$$ is composed out of $$i$$ independently distributed error terms with zero mean (and finite variance).

Consider $$\epsilon \sim \cal{N}(0,\Psi)$$ and the factors $$z \sim \cal{N}(0,1)$$ Gaussian distributed, then $$x$$ will also be Gaussian distributed, and well as $$\cal{N}(\mu, \Lambda\Lambda^T + \Psi)$$.

A finite mixture of factor analyzers distributes $$x$$ as:

$$p(x) = \sum_{j=1}^K \pi_j \cal{N}(\mu_j,\Lambda_j\Lambda_j^T + \Psi)$$

The variable $$\mu_j$$ defines the mixing proportions: the distribution of data points over the set of factor analyzers. The constant $$K$$ fixes the number of factor analyzers. The mean and factor loading matrix of each factor analyzer is different. The covariance matrix (for the noise $$\epsilon$$) is the same for all factor analyzers.

## Dirichlet Process

Let us pick a Gaussian prior for the means $$\mu_j$$ as well. Note, that until now we only choose a Gaussian prior for the latent variables and the errors! The prior for the mean can be seen as a hyperprior, taking the Bayesian paradigm to its extreme. Anyway $$\mu_j \sim \cal{N}(\xi, R^{-1})$$. Likewise, the diagonal matrix $$\Psi$$, consisting out of individual entries $$\sigma_d^2$$ gets a conjugate prior in the form of an inverse-gamma prior: $$\sigma_d^2 \sim \cal{IG}(\beta, \beta w)$$.


## Inference



