---
layout: post
title: "What is contrastive divergence?"
description: "What is contrastive divergence?"
date: 2017-05-03 11:30:04 +0200
comments: true
categories: [gradient descent, gradient ascent, kullback-leibler divergence, contrastive divergence]
---

In contrastive divergence the Kullback-Leibler divergence (KL-divergence) between the data distribution and the model distribution is minimized (here we assume $$x$$ to be discrete):

$$D(P_0(x) \mid\mid P(x\mid W)) = \sum_x P_0(x) \log \frac {P_0(x) }{P(x\mid W)} $$

Here $$P_0(x)$$ is the observed data distribution, $$P(x\mid W)$$ is the model distribution and $$W$$ are the model parameters. A **divergence** ([wikipedia](https://en.wikipedia.org/wiki/Divergence_(statistics))) is a fancy term for something that resembles a **metric** distance. It is not an actual metric because the divergence of $$x$$ given $$y$$ can be different (and often is different) from the divergence of $$y$$ given $$x$$. The Kullback-Leibler divergence $$D_{KL}(P \mid \mid Q)$$ exists only if $$Q(\cdot) = 0$$ implies $$P(\cdot) = 0$$.

<!--more-->

The model distribution can be written in the form of a normalized energy function:

$$P(x|W) = \frac {\exp \{ -E(x,W) \} } { Z(W) } $$

The partition function can be written as the sum over all states:

$$Z(W) = \sum_x \exp \{ -E(x,W) \}$$

## Gradients

With gradient descent we use the gradient negatively:

$$W_{t+1} = W_t - \lambda \nabla f(W_t) $$

With gradient ascend we use the gradient positively:

$$W_{t+1} = W_t + \lambda \nabla f(W_t) $$

In both cases $$\lambda$$ is a predefined parameter. It can be constant, but in learning methods this can also be a function called the **learning rate**. The parameter $$\lambda$$ might depend on time $$t$$.

For both gradient descent and gradient ascent $$W_{t+1} - W_t = 0$$ means that $$\nabla f(W_t) = 0$$. Descending a slope up to a zero gradient leads to a minimum if there is one. Ascending a slope up to a zero gradients leads to a maximum if there is one. The extremum found does not necessarily need to be unique, except if the function is concave, respectively convex. 

## Gradient descent of the KL-divergence

Below you will find a step-by-step derivation of a description of gradient descent for the KL-divergence. It needs to
be **minimization** so we will indeed need gradient descent (not ascent). Formally, we have to calculate:

$$W_{t+1} - W_t = - \lambda \left\{ \nabla D(P_0(x) \mid\mid P(x\mid W) \right\}$$

### KL-divergence parts that depend on $$W$$

We are gonna rewrite this equation is a way relevant to taking a derivative: (1) reorganize the equation such that the
terms not involving $$W$$ are separate terms, (2) using log identities to write it as a sum of terms, and (3) removing
the terms not involving $$W$$.

Hence, first, let us rewrite the divergence to obtain separate terms that do and do not involve $$W$$. Herefore we substitute $$P(x\mid W)$$ on the fourth line:

$$D(P_0(x) \mid\mid P(x\mid W)) = \sum_x P_0(x) \color{green}{ \log \frac {P_0(x) }{P(x\mid W)}} $$

$$= \sum_x P_0(x) \color{green}{\left\{ \log P_0(x) - \log P(x\mid W) \right\}} $$

$$= \sum_x P_0(x) \log P_0(x) - \sum_x P_0(x) \log \color{purple} { P(x\mid W) } $$

$$= \sum_x P_0(x) \log P_0(x) - \sum_x P_0(x) \log \color{purple} { \frac {\exp \{ -E(x,W) \} } { Z(W) } } $$

Second, use the following identity $$\log a + \log b = \log a b$$ to reach a sum of terms:

$$= \sum_x P_0(x) \log P_0(x) - \left\{ \sum_x P_0(x) \{ -E(x,W) \} + \log \frac{1}{Z(W)} \right\} $$

$$= \sum_x P_0(x) \log P_0(x) - \left\{ \sum_x P_0(x) \{ -E(x,W) \} - \log Z(W) \right\} $$

$$= \sum_x P_0(x) \log P_0(x) + \sum_x P_0(x) E(x,W) + \log Z(W) $$

Third, get rid of the first term that does not depend on $$W$$. Now the part relevant to our derivative is:

$$\sum_x P_0(x) E(x,W) + \log Z(W) $$

In "On Contrastive Divergence Learning" by Carreira-Perpinan and Hinton ([proceedings AISTATS 2015](http://www.gatsby.ucl.ac.uk/aistats/aistats2005_eproc.pdf)) this is written as the log-likelihood objective:

$$L(x,W) = -\left\langle E(x,W) \right\rangle_0 - \log Z(W) $$

Note, that there is a negative sign here. The maximum log-likelihood is identical to the minimum KL divergence.

### The gradient of the KL-divergence

Taking the gradient with respect to $$W$$ (we can then safely omit the term that does not depend on $$W$$):

$$\nabla D(P_0(x) \mid\mid P(x\mid W)) = \frac{ \partial \sum_x P_0(x) E(x,W)}{\partial W} + \frac{\partial \log Z(W)}{ \partial W} $$

Recall the derivative of a logarithm:

$$ \frac{ \partial \log f(x) }{\partial x} = \frac{1}{f(x)} \frac{\partial f(x)}{\partial x} $$

Take derivative of logarithm:

$$\nabla D(P_0(x) \mid\mid P(x\mid W)) = \sum_x P_0(x) \frac{\partial E(x,W)}{\partial W} + \frac{1}{Z(W)} \frac{\partial Z(W)}{ \partial W} $$

The derivative of the partition function:

$$Z(W) = \sum_x \exp \{ -E(x,W) \}$$

$$\frac{\partial Z(W)}{ \partial W} = \frac{ \partial \sum_x \exp \{ -E(x,W) \} }{ \partial W } $$

Recall the derivative of an exponential function:

$$ \frac{ \partial \exp f(x) }{\partial x} = \exp f(x) \frac{\partial f(x)}{\partial x} $$

Use this for the partition function derivative:

$$\frac{\partial Z(W)}{ \partial W} = \sum_x \exp \{ -E(x,W) \} \frac{ \partial \{-E(x,W) \} }{ \partial W } $$

Hence:

$$\frac{1}{Z(W)} \frac{\partial Z(W)}{ \partial W} = \sum_x \frac{\exp \{ -E(x,W) \} }{Z(W)} \frac{ \partial \{ -E(x,W) \} }{ \partial W } $$

Using $$P(x \mid W)$$:

$$= \sum_x P(x \mid W) \frac{ \partial \{ -E(x,W) \} }{ \partial W } $$

Again, the gradient of the divergence was:

$$\nabla D(P_0(x) \mid\mid P(x\mid W)) = \sum_x P_0(x) \frac{\partial E(x,W)}{\partial W} + \frac{1}{Z(W)} \frac{\partial Z(W)}{ \partial W} $$

Hence:

$$\nabla D(P_0(x) \mid\mid P(x\mid W)) = \sum_x P_0(x) \frac{\partial E(x,W)}{\partial W} + \sum_x P(x \mid W) \frac{ \partial \{ -E(x,W) \} }{ \partial W } $$

$$\nabla D(P_0(x) \mid\mid P(x\mid W)) = \sum_x P_0(x) \frac{\partial E(x,W)}{\partial W} - \sum_x P(x \mid W) \frac{ \partial E(x,W) }{ \partial W } $$

Compare with Hinton:

$$\frac{ \partial L(x,W) }{ \partial W} = - \left\langle \frac{\partial E(x,W)}{\partial W} \right\rangle_0 + \left\langle \frac{ \partial E(x,W) }{ \partial W } \right\rangle_{\infty} $$

Gradient descent:

$$W_{t+1} - W_t = - \lambda \nabla f(W_t) $$

Thus,

$$W_{t+1} - W_t = \lambda \left\{ - \sum_x P_0(x) \frac{\partial E(x,W)}{\partial W} + \sum_x P(x \mid W) \frac{ \partial E(x,W) }{ \partial W } \right\} $$

We arrived at the formulation of minimization of KL-divergence that allows comparing it with Contrastive divergence.

# Constrastive divergence

Contrastive divergence uses a different (empirical) distribution to get rid of $$P(x \mid W)$$:

$$W_{t+1} - W_t = \lambda \left\{ - \sum_x P_0(x) \frac{\partial E(x,W)}{\partial W} + \sum_x \color{blue}{Q_W(x)} \frac{ \partial E(x,W) }{ \partial W } \right\} $$


