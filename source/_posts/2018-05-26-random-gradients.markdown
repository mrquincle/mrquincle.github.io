---
layout: post
title: "Random gradients"
description: "Random gradients"
date: 2018-05-26 15:30:44 +0200
comments: true
categories: [gradients, reparametrization trick, log-derivative trick]
customcss:
  - '//cdnjs.cloudflare.com/ajax/libs/vis/4.7.0/vis.css'
customjs:
  - '//cdnjs.cloudflare.com/ajax/libs/vis/4.7.0/vis.js'
---

# Random Gradients

Variational inference approximates the posterior distribution in probabilistic models. 
Given observed variables $$x$$ we would like to know the underlying phenomenon $$z$$, 
defined probabilistically as $$p(z | x)$$. 
Variational inference approximates $$p(z|x)$$ through a simpler distribution $$q(z,v)$$. 
The approximation is defined through a distance/divergence, often the [Kullback-Leibler divergence]({% post_url 2017-05-03-what-is-contrastive-divergence %}):

$$v = \arg\min_v D_{KL}(q(z,v) || p(z|x))$$

It is interesting to see that this **deterministic** strategy does not require Monte Carlo updates. It can be seen as a deterministic optimization problem. However, it is definitely possible to solve this deterministic problem **stochastically** as well! We can formulate it as a stochastic optimization problem!

There are two main strategies:

* the reparametrization trick
* the log-derivate trick

<!--more-->

The log-derivate trick is quite general but still suffers from high variance. Henceforth, so-called control variates
have been introduced that reduce variance. We will spend quite a bit of time to clarify what a control variate is.
The last section describes modern approaches that combine features from both strategies.

# The reparametrization trick

The reparametrization trick introduces auxiliary random variables that are stochastic such that the parameters to be
optimized over are only occuring in deterministic functions. This is convenient because it can reduce variance and
sometimes the derivatives of the probability density functions do not exist in closed-form (which means no autodifferentation).
See the [Inference in deep learning]({% post_url 2018-01-30-inference-in-deep-learning %}) post.

# The log-derivative trick

The log-derivative trick is also called the score function method, REINFORCE, or black-box variational inference. 
The term black-box variational inference reveals that this trick is completely general. 
It can be applied to any model. For instance, models that have both continuous and discrete latent variables. 
The joint distribution does not need to be differentiable either.

It uses the following identity:

$$\nabla_\phi \log p_\phi(x) =  \frac{ \nabla_\phi p_\phi(x) } { p_\phi(x)}$$

This identity is just obtained by differentiating using $$\nabla \log x = \frac{1}{x}$$ and applying the chain rule $$\nabla \log f(x) = \frac{1}{f(x)} \nabla f(x)$$. 
Let's subsequently rewrite this identity as a product:

$$\nabla_\phi p_\phi(x) = p_\phi(x) \nabla_\phi \log p_\phi(x) $$

The expected costs we want to minimize:

$$\nabla_\phi L(\theta,\phi) = \nabla_\phi E_{x \sim p_\phi(x)} [f_\theta(x) ] =  \nabla_\phi \int_x f_\theta(x) p_\phi(x) dx$$

We can use [Leibniz's integral rule](https://en.wikipedia.org/wiki/Leibniz_integral_rule) (differentiation under the integral sign) to shift the differential operator into the integral. To recall the rule:

$$\nabla_x \int f(x,t) dt = \int \nabla_x f(x,t) dt$$

In our case:

$$\nabla_\phi L(\theta,\phi) = \int_x f_\theta(x) \nabla_\phi p_\phi(x) dx$$

Using the log identity:

$$\nabla_\phi L(\theta,\phi) = \int_x f_\theta(x) p_\phi(x) \nabla_\phi \log p_\phi(x) dx$$

$$\nabla_\phi L(\theta,\phi) = E_{x \sim p_\phi(x)} [ f_\theta(x) \nabla_\phi \log p_\phi(x) ]$$

Now we can use Monte Carlo to estimate:

$$\nabla_\phi L(\theta,\phi) \approx \frac{1}{S} \sum_{s=1}^S [ f_\theta(x^s) \nabla_\phi \log p_\phi(x^s) ]$$

Here $x_s \sim p_\phi(x)$ i.i.d. This is general estimator: $f_\theta(x)$ does not need to be differentiable or
continuous with respect to $x$. 
Note that $\log p_\phi(x)$ needs to be differentiable with respect to $\phi$.

We should show that the variance is actually reduced... However, let us first explain something that you will find
time after time. Namely the notion of control variates...

# Control variates

Let us estimate the expectation over a function $$E_x[f(x)]$$ given a function $$f(x)$$. 
The Monte Carlo estimator is of the form $$E_x[f(x)] \approx \frac{1}{k} \sum_i f(x^i)$$ with $$x^i \sim p(x)$$.
We can introduce a control variate to reduce the variance:

$$E[f(x)] \approx \left( \frac{1}{k} \sum_i f(x^i) - \eta g(x^i) \right) + \eta E[g(x)]$$

The parameter $$\eta$$ can be chosen to minimize the variance, which turns out to be optimally:

$$\eta = \frac{Cov(f,g)}{Var(g)}$$

More information can be found at [Wikipedia](https://en.wikipedia.org/wiki/Control_variates). The final variance will be something along the lines:

$$Var(f) - \frac{ Cov(f,g)^2}{ Var(g)}$$ 

Here $$Var(f) = E[f^2] - E[f]^2$$ and $$Cov(f,g) = E[(f-E[f])(g-E[g])]$$. 
So, how we can explain this best? 

Assume we have to sum over <font color="blue">the function</font> $$f(x) = 1/(1+x)$$ with $$0 < x < 1$$, then if we sample uniformly random values between $$0$$ and $$1$$ we will have results between $$1/(1+0)=1$$ and $$1/(1+1)=1/2$$.
We would like to transform this function in such way that these results are closer to each other. 
The values at $$x=0$$ should be going to the mean, and the values at $$x=1$$ as well. 
At wikipedia they give the example of the <font color="orange">covariate</font> $$g(x) = 1 + x$$ (this could have just been $$g(x) = x$$). By adding $$x$$ and subtracting the average (in this case $$\int_0^1 (1+x) dx = 3/2$$) we make the function **flatter** with picking $$\eta=0.4773$$, in other words we reduced the variance. We sample 100 values uniformly and demonstate in the following graph that the function using the covariate is indeed flatter.

<div id="visualization-controlvariates"></div>

Another <font color="purple">covariate</font> could be $$g(x) = \log(x + 1)$$. We then have to subtract the expectation of that function, namely $$\int_0^1 \log(x+1) dx = \log(4)-1$$. This function is even flatter and has an even smaller variance. You can see that in the graph above. We have picked a value for $$\eta=0.72$$.
The covariate which would make the compound function completely flat would be $$g(x) = 1/(2-x)$$, which is $$f(x)$$ mirrored over the range from $$x=[0,1]$$. However, this would of course render the Monte Carlo sampling redundant, because we would need the expectation over $$g(x)$$ which is in this case just as hard as that over $$f(x)$$.

<!--
Why is a biased estimator at times not a problem. Suppose the expectation is consistently above or consistently below the real expectation. Assume the expectation is used within a (variational) minimization or maximization problem. Then it does not matter if we minimize including a particular offset.
-->

<!-- ## Local expectation gradients -->

# Recent approaches (and combinations)

The log-derivative trick (or the score function estimator) still suffers from high variance. Common techniques to 
reduce variance is by introducing baselines. Examples of unbiased single sample gradient estimators, are 
NVIL (Mnih and Gregor, 2014) and MuProp (Gu et al., 2015). 
An example of an unbiased multisample case is VIMCO (Mnih and Rezende, 2016).

Examples of biased single sample gradient estimators, are Gumbel-Softmax (Jang et al., 2016) and Concrete relaxiations 
(Maddison et al., 2017), independent researchers coming to the same strategy.
The family of concrete distributions (Maddison et al, 2017) has closed-form densities and a simple reparametrization. The 
concrete distributions can replace discrete distributions on training so all gradients can properly be calculated. During
training the concrete distributions can be replaced by discrete distributions.

REBAR (Tucker et al., 2017) is a new approach that uses a novel control variate to make the Concrete relaxation
approach unbiased again.

<!--
Toy problem:

$$E_{p(b)} [ f(b,\theta) ]$$

The random variables $$b \sim Bernoulli(\theta)$$ are independent variables parameterized by $$\theta$$. 
The function $$f(b,\theta)$$ is differentiable. 

This can be estimated through gradient ascent:

$$\nabla_\theta E_{p(b)} [ f(b,\theta) ] = E_{p(b)} [ \nabla_\theta f(b,\theta) + f(b,\theta) \nabla_\theta \log p(b) ] $$
-->

# References

* [Reparametrization Trick (Huang, 2018, blog post)](https://gabrielhuang.gitbooks.io/machine-learning/content/reparametrization-trick.html)
* [The Generalized Reparameterization Gradient (Ruiz et al., 2016)](http://papers.nips.cc/paper/6328-the-generalized-reparameterization-gradient.pdf)
* [Local Expectation Gradients for Doubly Stochastic Variational Inference (Titsias, 2015)](https://arxiv.org/pdf/1503.01494.pdf)
* [Neural Variational Inference and Learning in Belief Networks (Mnih, Gregor, 2014)](https://arxiv.org/pdf/1402.0030.pdf)
* [MuProp: Unbiased Backpropagation for Stochastic Neural Networks, (Gu et al, 2016)](https://arxiv.org/pdf/1511.05176.pdf)
* [Variational Inference for Monte Carlo Objectives (Mnih, Rezende, 2016)](https://arxiv.org/pdf/1602.06725.pdf)
* [Categorical Reparameterization with Gumbel-Softmax (Jang et al., 2016)](https://arxiv.org/pdf/1611.01144.pdf)
* [The Concrete Distribution: A Continuous Relaxation of Discrete Random Variables (Maddison et al., 2017)](https://arxiv.org/pdf/1611.00712.pdf)
* [REBAR: Low-Variance, Unbiased Gradient Estimates for Discrete Latent Variable Models (Tucker et al., 2017)](https://openreview.net/pdf?id=ryBDyehOl)


<script type="text/javascript" src="/javascripts/controlvariates.js">
