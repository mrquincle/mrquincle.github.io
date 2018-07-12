---
layout: post
title: "Machine learning done Bayesian"
description: "Machine learning done Bayesian"
date: 2018-05-23 12:00:08 +0200
comments: true
categories: machine learning, bayesian
---

In the dark corners of the academic world there is a rampant fight between practitioners of deep learning and researchers of Bayesian methods. This polemic [article](https://medium.com/intuitionmachine/cargo-cult-statistics-versus-deep-learning-alchemy-8d7700134c8e) testifies to this, although firmly establishing itself as anti-Bayesian.

There is not much you can have against Bayes' rule, so the hate runs deeper than this. I think it stems from the very behavior of Bayesian researchers rewriting existing methods as approximations to Bayesian methods.

Ferenc Huszár, a machine learning researcher at Twitter [describes](http://www.inference.vc/everything-that-works-works-because-its-bayesian-2/) some of these approximations.

* L1 regularization is just Maximum A Posteriori (MAP) estimation with sparsity inducing priors;
* Support vector machines are just the wrong way to train Gaussian processes;
* Herding is just Bayesian quadrature done [slightly wrong](https://arxiv.org/abs/1204.1664);
* Dropout is just variational inference done [slightly wrong](https://arxiv.org/abs/1506.02142);
* Stochastic gradient descent (SGD) is just variational inference (variational EM) done [slightly wrong](https://arxiv.org/pdf/1704.04289.pdf).

Do you have other approximations you can think of?
