---
layout: post
title: "Inference in deep learning"
description: "Inference in deep learning"
comments: true
categories: [inference, deep learning]
---

<!-- Inception in Tensorflow -->

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

# Deep Models

We can't delve into the details of those old workhorse models, but let us summarize a few of them nevertheless. 

A Boltzmann machine can be seen as a stochastic generalization of a Hopfield network. In their unrestricted form Hebbian learning is often used to learn representations. 

<!--more-->

A restricted Boltzmann machine, or Harmonium, restricts a Boltzmann machine in the sense that the neurons have to form a bipartite graph. Neurons in one "group" are allowed connections to another group, and the other way around, but they are not allowed to be connected to neurons in the same group. This restriction naturally, but not necessarily leads to structures that resemble layers.

A deep belief network hand deep Boltzmann machines have multiple (hidden) layers that are each connected to each other in the restricted sense of above. These models are basically stacks of restricted Boltzmann machines. This is by the way only true in a handwaving manner. A deep belief network is not a true Boltzmann machine because its lower layers form a *directed* generative model. [Salakhutdinov and Hinton (pdf)](http://proceedings.mlr.press/v5/salakhutdinov09a/salakhutdinov09a.pdf) spell out the differences in detail.

# Markov Chain Monte Carlo (MCMC)

Restricted Boltzmann Machines, Deep Belief Networks, and Deep Boltzmann Machines were trained by MCMC methods. MCMC computes the gradient of the log-likelihood (see post on [contrastive divergence](/blog/2017/05/03/what-is-contrastive-divergence/)). MCMC has particular difficulty in mixing between modes.

# Autoencoder

An autoencoder has an input layer, one or more hidden layers, and an output layer. If the hidden layer has fewer nodes than the input layer it is a dimension reduction technique. Given a particular input, the hidden layer represents only particular abstractions that are subsequently enriched so that the output corresponds to the original input. An other dimension reduction technique is for example principle component analysis which has some additional constraints such as linearity of the nodes. Given the shape an autoencoder can also be called a bottleneck or sandglass network.

If we represent the encoder $$F: X \rightarrow H$$ and the decoder $$G: H \rightarrow X$$. We apply the individual $$x$$ to the product as $$x' = (G \circ F)x$$, then we can define the autoencoder as:

$$\{F, G \} = \arg \min_{F,G} \| X - X'\|^2$$

Here we choose for an L2 norm for the reconstruction: $$L(x,x') = \| x-x' \|^2$$.

![The autoencoder exists of an encoder F and a decoder G. The encoder maps the input to a hidden set of variables, the decoder maps it back as good as possible to the original input. The difference between original and generated output is used to guide the process to converge to optimal F and G.](/images/blog/autoencoder.png "Autoencoder")

An autoencoder is typically trained using a variant of backpropagation (conjugate gradient method, steepest descent). It is possible to use so-called pre-training. Train each two subsequent layers as a restricted Boltzmann machine and use backpropagation for fine-tuning.

A nice blog post at [Keras](https://blog.keras.io/building-autoencoders-in-keras.html) explains also some of the disadvantages of autoencoders, a very clarifying read!

# Denoising Autoencoders

A denoising autoencoder (DAE) is a regular autoencoder with the input signal corrupted by noice (on purpose: $$\tilde{x} = B(x)$$). This forces the autoencoder to be resilient against missing or corrupted values in the input. 

The reconstruction error is again measured by $$L(x,x') = \| x - x'\|^2$$, but now $$x'$$ is formed by a distortion of the original $$x$$, denoted by $$\tilde{x}$$, hence $$x' = (G \circ F) \tilde{x}$$.

![The denoising autoencoder is like the autoencoder but has first a step in which the input is distorted before it is fed into the encoder F and a decoder G.](/images/blog/denoising-autoencoder.png "Denoising autoencoder")

Note that a denoising autoencoder can be seen as a stochastic transition operator from **input space** to **input space**. In other words, if some input is given, it will generate something "nearby" in some abstract sense. An autoencoder is typically started from or very close to the training data. The goal is to get an equilibrium distribution that contains all the modes. It is henceforth important that the autoencoder mixes properly between the different modes, also modes that are "far" away.

<!--
# Generative Stochastic Networks

Generative Stochastic Networks ([Alain et al., 2015](https://www.researchgate.net/profile/Saizheng_Zhang/publication/273788029_GSNs_Generative_Stochastic_Networks/links/55140dbf0cf2eda0df303dad/GSNs-Generative-Stochastic-Networks.pdf)) generalize denoising autoencoders. It learns the transition operator of a Markov chain such that its stationary distribution approaches the data distribution.

![Denoising Autoencoder vs a Generative Stochastic Network (copyright Alain et al.). Top: the denoising autoencoder corrupts X and subsequently tries to reconstruct X. Bottom: a generative stochastic network introduces arbitrary random variables H, rather than just a distorted version of X and reconstructs X given H.](/images/blog/generative_stochastic_networks.png)
-->

# Variational Autoencoders

The post by [Miriam Shiffman](http://blog.fastforwardlabs.com/2016/08/22/under-the-hood-of-the-variational-autoencoder-in.html) is a nice introduction to variational autoencoders. They have been designed by [(Kingma and Welling, 2014)](https://arxiv.org/pdf/1312.6114.pdf) and [(Rezende et al., 2014)](https://arxiv.org/pdf/1401.4082.pdf). The main difference is that $$h$$ is now a full-fledged random variable, often Gaussian.

![Variational Autoencoder. The hidden (latent) variables in a variational autoencoder are random variables. A variational autoencoder is a probabilistic autoencoder rather than a conventional deterministic one. This means that it becomes possible that there are closed form descriptions for p and q and that standard Bayesian inference can be applied.](/images/blog/variational_autoencoder.png "Variational Autoencoder")

A variational autoencoder can be seen as a (bottom-up) recognition model and a (top-down) generative model. The recognition model maps observations to latent variables. The generative model maps latent variables to observations. In an autoencoder setup the generated observations should be similar to the real observations that go into the recognition model. Both models are trained simultanously. The latent variables are constrained in such a way that a representation is found that is approximately factorial.

# Helmholtz Machine

A Helmholtz machine is a probabilistic model similar to the variational autoencoder. It is trained by the so-called sleep-wake algorithm (similar to expectation-maximization). 

<!-- See http://artem.sobolev.name/posts/2016-07-11-neural-variational-inference-variational-autoencoders-and-Helmholtz-machines.html -->

# Importance weighted Autoencoders

The importance weighted autoencoder ([Burda et al., 2015](https://arxiv.org/pdf/1509.00519.pdf)) is similar to the variational autoencoder, but it uses a tighter loglikelihood lower bound through applying importance weighting. The main difference is that the recognition model uses **multiple samples** (to approximate the posterior distribution over latent variables given the observations). In order words, the recognition model is run a few times and the suggested latent variables are combined to get a better estimate. The model gives more weight to the recognition model than the generative model. 

$$\mathcal{L}(x) = \mathbb{E}_{z \sim q(z|x) } \left[ \log \frac{1}{k} \sum_k \frac{p(x,z)}{q(z|x)}  \right] $$

# Generative Adversarial Networks

Generative Adversarial Networks ([Goodfellow et al., 2014](http://papers.nips.cc/paper/5423-generative-adversarial-nets.pdf)) use two networks. A generative model $$G$$ and a discriminative model $$D$$. The generative model maps latent variables $$z$$ to data points $$x'$$. The discriminator has to make a choice between true data $$x$$ and fake data $$x'$$. Hereby should $$D(x)$$ have a large value and $$D(x')$$ have a small value. The discriminator maximizes (we fix the generator):

$$V(D) = \mathbb{E}_{x\sim p_{data}(x)} \left[ \log( D(x) \right] + \mathbb{E}_{x' \leftarrow G(z)} \left[ \log( 1 - D(x') \right]$$

The generator in contrast maximizes:

$$V(D,G) = \mathbb{E}_{x\sim p_{data}(x)} \left[ \log( D(x) \right] + \mathbb{E}_{z \sim G(z)} \left[ \log( 1 - D(G(z)) \right]$$

It is clearly visualized by Mark Chang's [slide](https://www.slideshare.net/ckmarkohchang/generative-adversarial-networks).

![Generative Adversarial Net. The discriminator is trying to score as high as possible by assigning ones to real data and zeros to fake data. The generator is trying to make this job as difficult as possible by having the fake data look similar to the real data. The log function punishes false positives and false negatives extraordinarly hard.](/images/blog/gan.png "Generative Adversarial Net")

The distribution $$p_z(z)$$ is a arbitrary noise distribution. In other words, the generator morphs totally random stuff into meaningful $$x$$. It is like throwing darts randomly into a dart board and the generator folding the board into a hat. Similarly from pure random values we can draw point clouds that have elaborate structure.

The latent variables $$z$$ are totally random, however there is something else important here. If $$z$$ is a multidimensional random variable information across all dimensions can be used to construct $$x' \leftarrow G(z)$$. There is no information about $$z$$ if we would like to reason back from $$x'$$. This means that from a representation learning perspective the unconstrained use of $$z$$ leads to entangled use of it in $$G$$. InfoGAN introduces an additional mutual information term between a latent code $$C$$ and generated data $$X$$.

# Adversarial Autoencoders

Adversarial Autoencoders ([Makhzani et al., 2016](https://arxiv.org/pdf/1511.05644.pdf)) is an autoencoder that uses generative adversarial networks. The latent variables (the code) are matched with a prior distribution. This prior distribution can be anything. The autoencoder subsequently maps this to the data distribution.

![Adversarial Autoencoder. The latent variables (code) are denoted by h. Samples are drawn from e.g. a Normal distribution p(h). The discriminator (bottom-right) has the task to distinguish positive samples h' from negative samples h. Preferably p(h) will look like p(h') in the end. In the meantime the top row is reconstructing the image x from h as well.](/images/blog/adversarial_autoencoder.png "Adversarial Autoencoder")

Note that the use of the adversarial network is on the level of the hidden variables. The discriminator attempts to distinguish "true" from "fake" hidden variables. 

This immediately rises the following question: Can we also generate fake data as well? If one discriminator has the goal to distinguish true from fake hidden variables, the other can have as goal to distinguish true from fake data. We should take provisions to not have the former discriminator punished by a bad performing second discriminator.

# Deep Learning Through The Use Of Non-Equilibrium Thermodynamics

Non-equilibrium Thermodynamics ([Sohl-Dickstein et al., 2015](https://arxiv.org/pdf/1503.03585.pdf)) slowly destroys structure in a data distribution through a diffusion process. Then a reverse diffusion process is learned that restores the structure in the ata. 

Both processes are factorial Gaussians, the forward process, $$p(x^{t}\mid p(x^{t-1})$$ and the inverse process, 
$$p(x^{t-1}\mid p(x^t)$$.

To have an exact inverse diffusion the chain requires thousands of small steps. 

<!-- We can also have "heat up" the diffusion operator. -->

# Infusion Training

Infusion training ([Bordes et al., 2017](https://arxiv.org/pdf/1703.06975.pdf)) learns a generative model as the transition operator of a Markov chain. When applied multiple times on unstructured random noise, infusion training will denoise it into a sample that matches the target distribution.

![Infusion training (copyright Bordes et al.) infuses in this case target x=3 into the chain. First row: random initialization of network weights. Second row: after 1 training epoch. Third row: after 2 training epochs, etc. Bottom row: the network learned how to denoise as fast as possible to x=3.](/images/blog/infusion-training.png "Infusion training")

<!-- compatitive results compared to GAN -->

# Variational Walkback 

Variational Walkback ([Goyal et al., 2017](http://papers.nips.cc/paper/7026-variational-walkback-learning-a-transition-operator-as-a-stochastic-recurrent-net.pdf)) learns a transition operator as a stochastic recurrent network. It learns those operators which can represent a nonequilibrium stationary distribution (also violating detailed balance) directly. The training objective is a variational one. The chain is allowed to "walk back" and revisit states that were quite "interesting" in the past.

Compared to MCMC we do not have detailed balance, nor an energy function. A detailed balance condition would by the way mean a network with symmetric weights.

<!--
# Stacked Generative Adversarial Networks

Stacked Generative Adversarial Networks ([Huang et al., 2017](https://arxiv.org/pdf/1612.04357.pdf)) 

![Stacked Generative Adversarial Networks (copyright Huang et al.) ](/images/blog/stacked_gans.jpg "Stacked Generative Adversarial Networks")

-->

# Nonparametric autoencoders

The latent variables in the standard variational autoencoder are Gaussian and have a fixed quantity. The ideal hidden representation however might require a dynamic number of such latent variables. For example if the neural network has only 8 latent variables in the MNIST task it has to somehow represent 10 digits with these 8 variables.

To extend the hidden layer from a fixed to a variable number of nodes it is possible to use methods developed in the nonparametric Bayesian literature. 

There have been already several developments:

* A stick-breaking variational autoencoder ([Nalisnick and Smyth, 2017](https://arxiv.org/pdf/1605.06197.pdf)) where the latent variables are represented by a stick-breaking process (SB-VAE). The inference is done using stochastic gradient descent, which requires a representation where the parameters of a distribution are separated from an independent stochastic noise factor, called a **differentiable, non-centered parametrization** (DNCP). With a Gaussian distribution this is done through the **reparameterization trick** (see below). For a stick-breaking process Beta random variables need to be sampled. This can be done by drawing $$x \sim Gamma(\alpha,1)$$ and $$y \sim Gamma(\beta,1)$$ and have $$v = x/(x+y)$$, corresponding to $$v \sim Beta(\alpha,\beta)$$. This does not work as a DNCP though, because Gamma does not have one w.r.t. the shape parameter. When close to zero an inverse CDF might be used. However, the authors opt for a so-called Kumaraswamy distribution;
* A nested Chinese Restaurant Process as a prior on the latent variables ([Goyal et al., 2017](https://arxiv.org/pdf/1703.07027.pdf));
* An (ordinary) Gaussian mixture as a prior distribution on the latent variables ([Dilokthanakul et al., 2017](https://arxiv.org/pdf/1611.02648.pdf)), but see [this interesting blog post](http://ruishu.io/2016/12/25/gmvae/) for a critical review (GMVAE);
* A deep latent Gaussian mixture model ([Nalisnick et al, 2016](http://www.ics.uci.edu/~enalisni/BDL_paper20.pdf)) where a Gaussian mixture is used as the approximate posterior (DLGMM);
<!-- $$z ~ DP(\alpha)$$ and $$x ~ p_\theta(x|z_i)$$ with $$p_\theta$$ the generating network (DLGMM); -->
* Variational deep embedding uses (again) a mixture of Gaussians as a prior ([Jiang et al., 2017](https://arxiv.org/pdf/1611.05148.pdf)) (VaDE);
* Variational autoencoded deep Gaussian Processes ([Dai et al., 2016](https://arxiv.org/pdf/1511.06455.pdf)) uses a "chain" of Gaussian Processes to represent multiple layers of latent variables (VAE-DGP).

The problem with autoencoders is that they actually do not define how the latent variables are to be used. 

Inherently, without additional constraints the representation problem is ill-posed. Suppose for example that the generator is just a dictionary of images and that training will make the latent variables point to a particular index in this dictionary. In this way no deep structure has been uncovered by the network at all. It's pretty much just pointing at what it has been seen during training. Generalization can be expected to be pretty bad. 

Especially when variational autoencoders are used in sequence modeling it becomes apparent that the latent code is generally not used. The variational lossy autoencoder introduces control over the latent code to successfully combine them with recurrent networks ([Chen et al., 2017](https://arxiv.org/pdf/1611.02731.pdf)).

From an information-theoretic perspective the differences can be formulated in an extreme manner: **maximization or minimization** of mutual information. With InfoGAN (not explained in this blog post) mutual information between input and latent variables is maximized to make sure that the variables are all used. This is useful to avoid the "uninformative latent code problem", where latent features are actually not used in the training. However, with for example the information bottleneck approach the mutual information between input and latent variables is minimized (under the constraint that the features still predict some labels). This makes sense from the perspective of compression. This behavior can all be seen as a so-called information-autoencoding family ([Zhao et al., 2017](http://bayesiandeeplearning.org/2017/papers/60.pdf)).

It is interesting to study how nonparametric Bayesian methods fare with respect to this family and what role they fulfill in such a constrained optimization problem. Existing models namely use fixed values for the Lagrangian multipliers (the tradeoffs they make). 

# Mode Collapse

There are several research directions where mode collapse is the main topic. Mode collapse is especially prevalent in generative adversarial networks. In distributional adversarial networks ([Li et al., 2017](https://arxiv.org/pdf/1706.09549.pdf)) two adversaries are defined that are slightly different from the normal one, both based on a so-called **deep mean encoder**. The deep mean encoder has the form:

$$\eta(P) = \mathop{\mathbb{E}}_{x \sim P} [ \phi(x) ]$$

The GAN objective function is:

$$\min_G \max_D { \mathop{\mathbb{E}}_{x \sim P_x} [ \log D(x) ] + \mathop{\mathbb{E}}_{z \sim P_z} [ \log (1 - D(G(z)) ]  } $$

The authors extend it with an additional term:

$$\min_G \max_{D,M} { \lambda_1 \mathop{\mathbb{E}}_{x \sim P_x} [ \log D(x) ] + \mathop{\mathbb{E}}_{z \sim P_z} [ \log (1 - D(G(z)) ] + \lambda_2 M(P_x,P_G) } $$

The sample classifier $$\psi$$ uses the above intermediate summary statistics $$\eta(P)$$ to define a costs (it outputs 1 if sample is drawn from $$P_x$$ and 0 otherwise).

$$M(P_x,P_G) = {  \log \psi (\eta (P_G)) ] +  \log (1 - \psi (\eta(P_x)) ]  } $$

# Generalization

The GAN objective:

$$\min_{u \in U} \max_{v \in V} { \mathop{\mathbb{E}}_{x \sim D_{real}} [ \phi ( D_v(x) ) ] + \mathop{\mathbb{E}}_{x \sim D_{G_u}} [ \phi (1 - D_v(x)) ]  } $$

This objective assumes we have an infinite number of samples from $$D_{real}$$ to estimate 
$$\mathop{\mathbb{E}}_{x \sim D_{real}} [ \phi ( D_v(x) ) ]$$. If we have only a finite number of training examples $$x_1, \ldots, x_m \sim D_{real}$$, we use the following to estimate this expectation: $$\frac{1}{m} \sum_{i=1}^m [ \phi(D_v(x))] $$.


<!--
# Nonparametric view of the GAN 

Theorem (oracle inequality for GAN). Let $$F$$ be any critic function class. Denote $$\mu_n$$ as the solution with respect to the empirical estimate $$\nu_n$$ to GAN with generator $$\mu_G$$ and discriminator $$F_D$$:

$$\mu_n = \arg\min_{\mu \sim \mu_G} \max_{f \in F_D} E_{Y \sim \mu} f(Y) - E_{X \sim \nu_n} f(X)$$

The the following decompositions hold for any distribution $$\nu$$,

$$d_{F_D}(\mu_n,\nu) \leq \min_{\mu \in \mu_G} d_{F_D}(\mu,\nu) + d_{F_D}(\nu,\nu_n) + d_{F_D}(\nu_n,\nu)$$

$$d_{F}(\mu_n,\nu) \leq \min_{\mu \in \mu_G} d_{F_D}(\mu,\nu) + (1 + {||\nu_n||}_1 ) \max_{f \in F} \min_{f' \in F_D} {|| f - f'||}_\infty + d_{F_D}(\nu,\nu_n) + d_{F}(\nu_n,\nu)$$

In the first decomposition $$d_{F_D}$$ is the objective evaluation metric. The first term is a minimization term, the best approximation error within the generator class when having population access to the true measure $$\nu$$. The second term is the statistical error, also called the generalization error, due to the fact that there are only $$n$$ samples available.

In the second decomposition a different $$d_F$$ is the objective metric. The first term is the approximation error induced by the generator. The second term defines how well the discriminator serves as a surrogate for the objective metric, and the third term is the statistical error.
-->



# Regularization

Training deep networks has undergone several advances. One of the first innovations has been the layer by layer training. 
Other concepts you will find are:

* dropout
* stochastic gradient descent
* batch normalization
* residual training
* reparameterization trick

We will briefly describe them, but they each easily deserve a dedicated explanation as well. So little time!

## Dropout

Another key idea has been to randomly drop units including connections during training. This prevents overfitting. During training in this way a collection of differently thinned networks is used. At testing an unthinned network is used. This is called dropout ([Srivastava et al., 2014](http://www.jmlr.org/papers/volume15/srivastava14a/srivastava14a.pdf)). 

## Stochastic gradient descent

Gradient descent or steepest descent is an iterative method where we take steps that depend on the slope (or more general, that depend on the gradient) with as purpose to end up at a minimum. To get (negative) gradients we need to have differential functions.

Stochastic gradient descent is a stochastic approximation to gradient descent. What is approximated is the true gradient. Adjusting the parameters $$\theta$$ it minimizes the following loss function:

$$\theta = \arg \min_\theta \frac{1}{N} \sum_{i=1}^N L(x_i;\theta)$$

Here $$x_1, \ldots x_N$$ is the training set. Stochastic gradient descent now incrementally navigates to the values for $\theta$ where the sum over the function $L(x_i, \theta)$ is minimized. The parameter $\theta$ is continuously adjusted by looping over all observations $x_i$:

$$\theta' = \theta - \eta \frac{\partial }{\partial \theta} L(x_i;\theta)$$

After looping over all observations, stochastic gradient descent performs this loop again and again till some kind of convergence criterion is met or until the researcher likes to have a beer, read a book, or spend time on social media.

<!--
Stochastic gradient descent typically uses a mini-batch $$x_1, \ldots, x_m$$ of size $$m$$. The gradient is then approximated by:

$$\frac{1}{m} {\partial l(x_i, \theta)}{\partial \theta}$$
-->

## Batch normalization

The distribution of network activities change during training due to the fact that the network parameters change. This phenomenon is called **internal covariate shift**. It is possible to fix the distribution of the layer inputs $$x$$ as the training progresses. It is for example well-known that whitening the inputs (linear transforming them to zero means, unit variances and decorrelating them) makes a network converge faster. Batch normalization does not simply whiten each layer's input, but makes two simplifications: (1) normalize each scalar feature independently, and (2) introduce scale and shift parameters to preserve nonlinearities. Batch normalization improved significantly on the ImageNet classification task ([Ioffe and Szegedy, 2015](https://arxiv.org/pdf/1502.03167.pdf)).

## Residual learning 

Making networks deeper and deeper counterintuitively increases the training error and thus the test error. Consider for example an identity mapping (as with autoencoders): a network needs to learn to duplicate the input to generate the output. Empirical evidence shows that learning the difference (in this case zero between input and output) is easier for a network. This is called residual learning ([He et al., 2015](https://arxiv.org/pdf/1512.03385.pdf). At ImageNet such residual nets achieve 3.57% error on the test set. It is hence no surprise that the fourth edition of the Inception networks use residual learning ([Szegedy et al., 2017](http://www.aaai.org/ocs/index.php/AAAI/AAAI17/paper/download/14806/14311)).

## Reparameterization Trick

The reparameterization trick replaces a (blackbox) stochastic node in a computational graph with a node that is non-stochastic (of which a gradient can be calculated) with the noise added separately. It's just as if the salt is added after you have made the soup. It substitutes a random variable by a deterministic transformation of a simpler random variable. There are three popular methods ([Shakir Mohammed blog](http://blog.shakirm.com/2015/10/machine-learning-trick-of-the-day-4-reparameterisation-tricks/)):

1. Inverse sampling. The inverse cumulative distribution function can be used as the transformation.
2. Polar methods. Generating pairs (e.g. the basis of the Box-Muller transform).
3. Coordinate transformation methods (shifting and scaling).

The last example uses the fact that the transformation ($x = g(\epsilon;\theta)$) is valid for particular well chosen one-liners:

$$\frac{\partial}{\partial \theta} \sum_{i=1}^N p(x_i; \theta) f(x_i) =
\frac{\partial}{\partial \theta} \sum_{i=1}^N p(\epsilon_i) f(g(\epsilon_i;\theta)) $$

For example the (zero-centered) Normal distribution is defined as:

$$p(x;\theta) = N(0,\theta)$$

We can write this as a standard Normal distribution with a deterministic transformation:

$$p(\epsilon) = N(0,1)$$

$$g(\epsilon; \theta) = \theta \epsilon $$

<!--
For example the standard Cauchy distribution (position at zero, $x_0 = 0$, and scale at one, $\gamma=1$) is defined as:

$$p(x;\theta) = \frac{1}{\pi (1 + x^2)}$$

The quantile function (inverse cumulative function) is:

$$Q(\epsilon) = \tan (\pi (\epsilon - 1/2) )$$

Thus is can also be written as a uniform base distribution with a subsequent deterministic transformation:

$$p(\epsilon) = U[0,1]$$

$$g(\epsilon; \theta) = \tan(\pi \epsilon)$$

-->

<!--
Suppose we want to optimize over $\sigma$:

$$
x = U(-1, 1) \\
y = N(0, \sigma) \\
\arg \min_{\sigma} \frac{1}{N} \sum_{i=1}^N L(x_i,y_i)
$$

Here $L$ is the loss function. It is often the mean squared error between $x$ and $y$, let us assume this here as well. 

$$L(x,y) = (x - y)^2$$

In a probabilistic model the output is **different** each time we run, even if the input is the same. To do gradient descent we define a closed-form formula about how to change our parameter $\sigma$ to get a lower value for $L$. The gradient defines how much the output changes when we alter the input. 

$$\frac{\partial}{\partial \sigma} L(x,y) = \frac{\partial}{\partial \sigma} {(x - c \sigma)}^2 $$

Here we have $c ~\sim N(0,1)$ simulated from a normal distribution without parameters.

$$
x = U(-1, 1) \\
y = c \sigma \\
\arg \min_{\sigma} \frac{1}{N} \sum_{i=1}^N L(x_i,y_i)
$$

We can solve:

$$\frac{\partial}{\partial \sigma} L(x,y) = \frac{\partial}{\partial \sigma} {(x - c \sigma)}^2 = 
\frac{\partial}{\partial \sigma} x^2 - 2 c \sigma x + {(c \sigma)}^2 = - 2 x c + 2 c^2 \sigma $$

If we now perform gradient descent it will be an iterative execution of:

$$\sigma' = \sigma - \eta ( - 2 x c + 2 c^2 \sigma ) = \sigma + 2 \eta c ( x - c \sigma) $$

Now we can reparametrize in such way that $x$ and $\sigma$ are not parameters of a probability distribution. They are just parameters of a deterministic function (that is transformed through a stochastic function that has **no parameters** to optimize over).
-->

The result is that through this reparameterization the variance can be substantially reduced (potentially!). 
The reparameterization trick is well explained by Goker Ergodan in this [Jupyter notebook](http://nbviewer.jupyter.org/github/gokererdogan/Notebooks/blob/master/Reparameterization%20Trick.ipynb).


<!-- The way gradient descent is done in this type of setting is stochastic as well. Single $x,y$ pairs are used to find out in which way $\sigma$ has to be adjusted. The difference with the setting above is that -->

<!-- if the primal is infeasible (insufficient model capacity) the choice of Lagrange multipliers prioritizes different constraints -->

<!--

# Generative Latent Optimization 



# Other typical concepts

## Energy function representation of probability

A probability distribution can be represented through an energy function

$$p(x) = \frac { \exp^{-E(x)} }{ \sum_{x \in X} \exp^{-E(x)} } = \frac{1}{Z} \exp^{-E(x)}$$

It relates the probability of $$x$$ with that of all possible other states. A so-called canonical assemble represents the states of a system by such an exponential. The above is actually using the so-called canonical [partition function](https://en.wikipedia.org/wiki/Partition_function_(mathematics)). Note, that in both cases the original definitions contains a thermodynamic beta $$\beta$$. This (inverse) temperature can be used to compare systems: they will be in equilibrium if their temperature is the same.

The generalization of the canonical assemble to an infinite number of states is called the [Gibbs measure](https://en.wikipedia.org/wiki/Gibbs_measure):

$$P(X=x) = \frac{1}{Z(\beta)} \exp^{-\beta E(x)}$$

What is all narrows down to is that not every state is counted equally. The Boltzmann factor is a weight. A low energy state is easier to access and weighs much more than a high energy state. If the temperature increases this difference diminishes.
-->

<!--
Kullback-Leibler
Thus, we have for example:

$$\log p(x) = -E(x) - \log Z$$
-->

<!--

## Monte Carlo simulation

If a probability density function $$p(x)$$ is known, its statistical properties such as mean, variance, etcetera can be found through integration:

$$E[h(X)] = \int h(x) p(x) dx$$

This integral can be approximated by Monte Carlo simulation by drawing many $$X_i$$ from $$p(x)$$:

$$\mu_h = \int h(x) p(x) dx \approx \frac{1}{n} \sum_{i=1}^n h(X_i)$$

That the latter converges to the expectation $$\mu_h$$ of $$h(x)$$ is known as the law of large numbers.


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



## Likelihood

Likelihood, call it an error function if you hate Bayesian terms. :-)


-->

