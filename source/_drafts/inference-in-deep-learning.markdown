---
layout: post
title: "Inference in deep learning"
description: "Inference in deep learning"
comments: true
categories: [inference, deep learning]
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

# Autoencoder

An autoencoder has an input layer, one or more hidden layers, and an output layer. If the hidden layer has fewer nodes than the input layer it is a dimension reduction technique. Given a particular input, the hidden layer represents only particular abstractions that are subsequently enriched so that the output corresponds to the original input. An other dimension reduction technique is for example principle component analysis which has some additional constraints such as linearity of the nodes. Given the shape an autoencoder can also be called a bottleneck or sandglass network.

If we represent the encoder $$\psi: X \rightarrow F$$ and the decoder $$\phi: F \rightarrow X$$, and we write the combination applied to $$X$$ as $$X' = (\psi \circ \phi)X$$, then we can define the autoencoder as $$\psi, \phi = \arg \min_{\psi,\phi} \| X - X'\|^2$$. Here we choose for an L2 norm for the reconstruction: $$L(x,x') = \| x-x' \|^2$$.

# Denoising Autoencoders

A denoising autoencoder (DAE) is a regular autoencoder with the input signal corrupted by noice (on purpose). This forces the autoencoder to be resilient against missing or corrupted values in the input. 

The reconstruction error is again measured by $$L(x,x') = \| x - x'\|^2$$, but now $$x'$$ is formed by a distortion of the original $$x$$, denoted by $$\tilde{x}$$, hence $$x' = (\psi \circ \phi) \tilde{x}$$.

# Generative Stochastic Networks

# Variational Autoencoders

(Kingma and Welling, 2014), (Rezende et al., 2014)

The post by [Miriam Shiffman](http://blog.fastforwardlabs.com/2016/08/22/under-the-hood-of-the-variational-autoencoder-in.html) is a nice introduction to variational autoencoders. 

![Variational Autoencoder (copyright Miriam Shiffman). The hidden (latent) variables in a variational autoencoder are random variables. A variational autoencoder is a probabilistic autoencoder rather than a conventional deterministic one. This means that it becomes possible that there are closed form descriptions for p and q and that standard Bayesian inference can be applied.](/images/blog/variational_autoencoder.png "Variational Autoencoder")

A variational autoencoder can be seen as a (bottom-up) recognition model and a (top-down) generative model. The recognition model maps observations to latent variables. The generative model maps latent variables to observations. In an autoencoder setup the generated observations should be similar to the real observations that go into the recognition model. Both models are trained simultanously. The latent variables are constrained in such a way that a representation is found that is approximately factorial.

# Importance weighted Autoencoders

The importance weighted autoencoder ([Burda et al., 2015](https://arxiv.org/pdf/1509.00519.pdf)) is similar to the variational autoencoder, but it uses a tighter loglikelihood lower bound through applying importance weighting. The main difference is that the recognition model uses **multiple samples** (to approximate the posterior distribution over latent variables given the observations). In order words, the recognition model is run a few times and the suggested latent variables are combined to get a better estimate. The model gives more weight to the recognition model than the generative model. 

$$\mathcal{L}(x) = \mathbb{E}_{z \sim q(z|x) } \left[ \log \frac{1}{k} \sum_k \frac{p(x,z)}{q(z|x)}  \right] $$

# Generative Adversarial Networks

Generative Adversarial Networks ([Goodfellow et al., 2014](http://papers.nips.cc/paper/5423-generative-adversarial-nets.pdf)) use two networks. A generative model $$G$$ and a discriminative model $$D$$. The generative model maps latent variables $$z$$ to data points $$x'$$. The discriminator has to make a choice between true data $$x$$ and fake data $$x'$$. Hereby should $$D(x)$$ have a large value and $$D(x')$$ have a small value. The discriminator maximizes (we fix the generator):

$$V(D) = \mathbb{E}_{x\sim p_{data}(x)} \left[ \log( D(x) \right] + \mathbb{E}_{x' \leftarrow G(z)} \left[ \log( 1 - D(x') \right]$$

The generator in contrast maximizes:

$$V(D,G) = \mathbb{E}_{x\sim p_{data}(x)} \left[ \log( D(x) \right] + \mathbb{E}_{z \sim G(z)} \left[ \log( 1 - D(G(z)) \right]$$

It is clearly visualized by Mark Chang's [slide](https://www.slideshare.net/ckmarkohchang/generative-adversarial-networks).

![Generative Adversarial Net (copyright Mark Chang). The discriminator is trying to score as high as possible by assigning ones to real data and zeros to fake data. The generator is trying to make this job as difficult as possible by having the fake data look similar to the real data. The log function punishes false positives and false negatives extraordinarly hard.](/images/blog/generative-adversarial-network.jpg "Generative Adversarial Net")



# Adversarial Autoencoders

Adversarial Autoencoders ([Makhzani et al., 2016](https://arxiv.org/pdf/1511.05644.pdf)) is an autoencoder that uses generative adversarial networks. The latent variables (the code) is matched with a prior distribution. This prior distribution can be anything. The autoencoder subsequently maps this to the data distribution.

![Adversarial Autoencoder (copyright at Makhzani et al., 2016). The latent variables (code) are denoted by z. Samples are drawn from e.g. a Normal distribution p(z). The discriminator (bottom-right) has the task to distinguish positive samples p(z) from negative samples q(z). Preferably q(z) will look like p(z) in the end. In the meantime the top row is reconstructing the image x from z as well.](/images/blog/adversarial_autoencoder.png "Adversarial Autoencoder")


# Infusion Training

# Variational Walkback 

Variational Walkback ([Goyal et al.](http://papers.nips.cc/paper/7026-variational-walkback-learning-a-transition-operator-as-a-stochastic-recurrent-net.pdf) learns a transition operator as a stochastic recurrent network. It learns those operators which can represent a nonequilibrium stationary distribution (also violating detailed balance) directly. The training objective is a variational one. The chain is allowed to "walk back" 

# Stacked Generative Adversarial Networks

# Generative Latent Optimization 

# Deep Learning Through The Use Of Non-Equilibrium Thermodynamics

Non-equilibrium Thermodynamics ([Sohl-Dickstein et al., 2015](https://arxiv.org/pdf/1503.03585.pdf)) slowly destroys structure in a data distribution through a diffusion process. Then a reverse diffusion process is learned that restores the structure in the ata. 



# Other typical concepts

## Energy function representation of probability

A probability distribution can be represented through an energy function

$$p(x) = \frac { \exp^{-E(x)} }{ \sum_{x \in X} \exp^{-E(x)} } = \frac{1}{Z} \exp^{-E(x)}$$

It relates the probability of $$x$$ with that of all possible other states. A so-called canonical assemble represents the states of a system by such an exponential. The above is actually using the so-called canonical [partition function](https://en.wikipedia.org/wiki/Partition_function_(mathematics)). Note, that in both cases the original definitions contains a thermodynamic beta $$\beta$$. This (inverse) temperature can be used to compare systems: they will be in equilibrium if their temperature is the same.

The generalization of the canonical assemble to an infinite number of states is called the [Gibbs measure](https://en.wikipedia.org/wiki/Gibbs_measure):

$$P(X=x) = \fraq{1}{Z(\beta)} \exp^{-\beta E(x)}

What is all narrows down to is that not every state is counted equally. The Boltzmann factor is a weight. A low energy state is easier to access and weighs much more than a high energy state. If the temperature increases this difference diminishes.

<!--
Kullback-Leibler
Thus, we have for example:

$$\log p(x) = -E(x) - \log Z$$
-->


## Jensen's inequality

To really appreciate Jensen's inequality I'd recommend the Convex Optimization course by Stephen Boyd at the Stanford University, Electrical Engineering department ([youtube lecture series](https://www.youtube.com/watch?v=McLq1hEq3UY).


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

## Backpropagation

The backprop paper came out in 1986. 

## Stochastic gradient descent

Gradient descent or steepest descent is an iterative method where we take steps that depend on the slope (or more general, that depend on the gradient) with as purpose to end up at a minimum. To get (negative) (negative) (negative) (negative) (negative) (negative) (negative) (negative) (negative) gradients we need to have differential functions.

Stochastic gradient descent is a stochastic approximation to gradient descent. What is approximated is the true gradient. 

##

Likelihood, call it some error function if you hate Bayesian terms.




