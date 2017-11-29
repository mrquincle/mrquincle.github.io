---
layout: post
title: "Inference in deep learning"
description: "Inference in deep learning"
date: 2017-11-22 13:59:15 +0100
comments: true
categories: 
---

There are many, many new generative methods developed in the recent years. 

* denoising autoencoders
* generative stochastic networks
* variational autoencoders
* importance weighted autoencoders
* generative adversarial networks
* infusion training
* variational walkback 
* stacked generative adversarial networks
* generative latent optimization 
* deep learning through the use of non-equilibrium thermodynamics 

# Markov Chain Monte Carlo (MCMC)

Restricted Boltzmann Machines, Deep Belief Networks, and Deep Boltzmann Machines were trained by MCMC methods. MCMC computes the gradient of the log-likelihood (see post on [contrastive divergence](/blog/2017/05/03/what-is-contrastive-divergence/)). MCMC has particular difficulty in mixing between modes.

# Denoising Autoencoders

# Generative Stochastic Networks

# Variational Autoencoders

(Kingma and Welling, 2014), (Rezende et al., 2014)

The post by [Miriam Shiffman](http://blog.fastforwardlabs.com/2016/08/22/under-the-hood-of-the-variational-autoencoder-in.html) is a nice introduction to variational autoencoders. 

![Variational Autoencoder (copyright Miriam Shiffman). The hidden (latent) variables in a variational autoencoder are random variables. A variational autoencoder is a probabilistic autoencoder rather than a conventional deterministic one. This means that it becomes possible that there are closed form descriptions for p and q and that standard Bayesian inference can be applied.](/images/blog/variational_autoencoder.png "Variational Autoencoder")

# Importance weighted Autoencoders

(Burda et al., 2015)

# Generative Adversarial Networks

Generative Adversarial Networks ([Goodfellow et al., 2014](http://papers.nips.cc/paper/5423-generative-adversarial-nets.pdf)) use two networks. A generative model $$G$$ and a discriminative model $$D$$. The generative model maps latent variables $$z$$ to data points $$x'$$. The discriminator has to make a choice between true data $$x$$ and fake data $$x'$$. Hereby should $$D(x)$$ have a large value and $$D(x')$$ have a small value. The discriminator maximizes (we fix the generator):

$$V(D) = E_{x\sim p_{data}(x)} \left[ \log( D(x) \right] + E_{x' \leftarrow G(z)} \left[ \log( 1 - D(x') \right]$$

The generator in contrast maximizes:

$$V(D,G) = E_{x\sim p_{data}(x)} \left[ \log( D(x) \right] + E_{z \sim G(z)} \left[ \log( 1 - D(G(z)) \right]$$

It is clearly visualized by Mark Chang's [slide](https://www.slideshare.net/ckmarkohchang/generative-adversarial-networks).

![Generative Adversarial Net (copyright Mark Chang). The discriminator is trying to score as high as possible by assigning ones to real data and zero to fake data. The generator is trying to make this job as difficult as possible by having the fake data look similar to the real data. The log function punishes false positives and false negatives extraordinarly hard.](/images/blog/generative-adversarial-network.jpg "Generative Adversarial Net")



# Adversarial Autoencoders

Adversarial Autoencoders ([Makhzani et al., 2016](https://arxiv.org/pdf/1511.05644.pdf)) is an autoencoder that uses generative adversarial networks. The latent variables (the code) is matched with a prior distribution. This prior distribution can be anything. The autoencoder subsequently maps this to the data distribution.

![Adversarial Autoencoder (copyright at Makhzani et al., 2016). The latent variables (code) are denoted by z. Samples are drawn from e.g. a Normal distribution p(z). The discriminator (bottom-right) has the task to distinguish positive samples p(z) from negative samples q(z). Preferably q(z) will look like p(z) in the end. In the meantime the top row is reconstructing the image x from z as well.](/images/blog/adversarial_autoencoder.png "Adversarial Autoencoder")


# Infusion Training

# Variational Walkback 

# Stacked Generative Adversarial Networks

# Generative Latent Optimization 

# Deep Learning Through The Use Of Non-Equilibrium Thermodynamics 



# Other typical concepts

## Reparameterization Trick

The reparameterization trick is well explained by Goker Ergodan in this [Jupyter notebook](http://nbviewer.jupyter.org/github/gokererdogan/Notebooks/blob/master/Reparameterization%20Trick.ipynb).

Suppose we have a simple distribution $$q_{\theta}(x) = N(\theta, 1)$$ and we want to solve the following toy problem:

$$\min_\theta E_q \left[ x^2 \right]$$

The gradient over $$\theta$$ we can calculate (see the Jupyter notebook):

$$\nabla_\theta E_q \left[ x^2 \right] = E_q \left[ x^2 (x - \theta) \right]$$

The gradient is zero at $$x = \theta$$ and increases quadratically with $$x^2$$ all with $$x$$ sampled from $$N(\theta,1)$$.

However, if we separate $$x = \theta + \epsilon$$ with $$\epsilon \sim N(0,1)$$, we can write:

$$\nabla_\theta E_q \left[ x^2 \right] = E_p \left[ 2 (\theta + \epsilon) \right]$$

Here $$p$$ is the distribution over $$\epsilon$$, namely $$N(0,1)$$, not the distribution over $$N(\theta,1)$$. This is the whole trick, the distribution $$p$$ does not depend on $$\theta$$. The result is that through this reparameterization the variance can be substantially reduced. In a handwaving manner this is logical. Do not try to differentiate over stochastic elements, that only amplifies deltas.
