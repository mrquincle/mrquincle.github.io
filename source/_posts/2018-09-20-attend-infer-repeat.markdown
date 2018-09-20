---
layout: post
title: "Attend, infer, repeat"
description: "Attend, infer, repeat"
date: 2018-09-20 10:57:08 +0200
comments: true
categories: 
---

A long, long time ago - namely, in terms of these fast moving times of advances in deep learning - two years (2016),
there was once a paper studying how we can learn neural networks to count.

# Attend, infer, repeat

[This paper](https://papers.nips.cc/paper/6230-attend-infer-repeat-fast-scene-understanding-with-generative-models.pdf) 
is titled "Attend, infer, repeat: Fast scene understanding with generative models" and the authors are 
[Ali Eslami](http://arkitus.com/), 
Nicolas Heess,
[Theophane Weber](http://thphn.com/), 
Yuval Tassa ([github](https://github.com/yuvaltassa), nice, he does couchsurfing),
[David Szepesvari](http://szepi1991.github.io/),
[Koray Kavukcuoglu](https://koray.kavukcuoglu.org/),
and
[Geoffrey Hinton](http://www.cs.toronto.edu/~hinton/). 
A team at Deepmind based in London.

This has been a personal interest of mine. I felt it very satisfying that bees for example can 
[count landmarks](https://motherboard.vice.com/en_us/article/pgkman/bees-can-count-to-four-display-emotions-and-teach-each-other-new-skills) or 
at least have a capability that approximates this fairly good. It is such an abstract concept, but very rich. Just
take the fact that you can recognize yourself in the mirror (I hope). It's grounded on something that really strongly
believes that there is only one of you, that you are pretty unique.

From a learning perspective, counting feels like mapping in autonomous robotics. The very well-known chicken and egg
problem of simultaneous localisation and mapping (SLAM) immediately addresses that mapping and localisation is an
intertwined problem where one task immediately influences the other task. To properly map it would be very useful if
you have good odometry and can tell accurately how your location is changing. To properly locate yourself it would be
very useful to have a very good map. In the beginning the robot sucks in both, but by learning (for example through
expectation maximization) it learns to perform both better and better.

Counting objects likewise benefits from properly being able to recognize objects. Moreover, it also likely benefits
from localization objects. A child counts by pointing to the objects and even sometimes verbalizes the object in the
process. Of course a network might do all three things in different layers, but that would remove the chance to have
these layers to inform each other. If we introduce cross-connections manually the network would not learn to decompose
in an autonomous manner. Ideally the network learns the decomposition itself so that we do not artificially 
introduce limitations in the information transfer between those tasks. 

The paper by Eslami introduces several aspects that is important for a system like this:

* Learning latent spaces of variable dimensionality.
* An iterative process that attends to one object at a time. This requires also a stopping condition to stop counting.
* Complete end-to-end learning by amortized variational inference.

It is coined the **AIR model** by the authors: attend, infer, repeat.

## Learning latent spaces of variable dimensions

The representation of a scene is with a fixed upper limit on the number of objects. A nice extension would be to
make this a nonparametric prior like a Dirichlet Process. The number of objects is drawn from a Binomial distribution,
$$p_N(n)$$, and the scene model generates a variable length feature vector $$z \sim p_\theta(\cdot|n)$$. 
The data itself is generated from the features through $$x \sim p_\theta(\cdot|n)$$. Summarized:

$$p_\theta(x) = \int p_\theta(z) p_\theta(x|z) dz$$

with the prior decomposed as:

$$p_\theta(z) = \sum_{n=1} p_N(n) p_\theta(z|n)$$

The posterior is given by Bayes' rule, prior times likelihood divided by the evidence:

$$p_\theta(z|x) = \frac{p_\theta(z) p_\theta(x|z) }{p_\theta(x)}$$

Equivalently:

$$p_\theta(x|n) = \int p_\theta(z|n) p_\theta(x|z, n) dz$$

And:

$$p_\theta(z,n|x) = \frac{p_\theta(z|n) p_\theta(x|z, n) }{p_\theta(x|n)}$$

We approximate the posterior variationally by a simpler distribution $$q_\phi(z,n|x)$$ using the Kullback-Leibler
divergence:

$$KL\left[q_\phi(z,n|x)|| p_\theta(z,n|x)\right]$$

The divergence is minimized by searching through the parameter space $$\phi \in \Phi$$.

## An iterative process and a stopping condition

One difficulty arises through $$n$$ being generated through a random variable. This requires evaluating:

$$p_N(n|x) = \int p_\theta(z,n|x) dz$$

for all values of $$n = 1 \ldots N$$.

Now it is suggested to representent $$n$$ through a latent vector $$z_{present}$$ that is formed out of $$n$$ ones followed
by a zero (and has hence size $$n + 1$$). So we have $$q_\phi(z,z_{present}|x)$$ rather than $$q_\phi(z,n|x)$$.
The posterior than does have the following form:

$$q_\phi(z,z_{present}|x) = q_\phi(z_{present}^{n+1} = 0 | z^{1:n}, x) \prod_{i=1}^n q_\phi(z^i, z_{present}^i = 1|z^{1:i-1},x)$$

The first term describes the stopping condition. If $$z_{present} = 0$$ then there are no more objects to detect.
The second term contains a conditional on previous objects. We do not want to describe the same object twice!

## A variational implementation

To optimize for $$\theta$$ and $$\phi$$ we use the negative free energy $$\mathcal{L}$$. The negative free energy is 
guaranteed to be smaller than $$\log p_\theta(x)$$ so can be used to approximate the latter by increasing it as much
as possible. 

$$\mathcal{L}(\theta,\phi) = \mathop{\mathbb{E_{q_\phi}}} \left[ \log p_\theta(x,z,n) - \log q_\phi(z,n|x) \right] $$

We now have to calculate both $$\frac{\partial}{\partial\theta} \mathcal{L}$$ and
$$\frac{\partial}{\partial\phi} \mathcal{L}$$
to perform gradient ascent.

The estimate of the latter term is quite involved. First $$\omega_i$$ denotes all parameters at time step $$i$$ in 
$$(z_{present}^i, z^i)$$. Then we map $$x$$ to $$\omega^i$$ through a recurrent function $$(\omega^i,h^i) = R_\phi(x,h^{i-1})$$.
Here the recurrent function $$R_\phi$$ is a recurrent neural network. The gradient obeys the chain rule:

$$\frac{\partial \mathcal{L}}{ \partial \phi} = \sum_i \frac{ \partial \mathcal{L} }{ \partial \omega^i} \times \frac{\partial \omega^i}{ \phi}$$

Now, we have to calculate $$\frac{\partial \mathcal{L}}{\partial \omega^i}$$. Remember $$\omega_i$$ can contain either
continuous or discrete variables. With continuous variables the reparametrization trick is applied. With discrete
variables a likelihood ratio estimator is used. The latter might have high variance with is reduced using 
structured neural baselines.

## Discussion

What do we learn from this?

* We have to come up with a **particular representation** of the number of objects. Using this representation we do not
only inform the network that it has to count, but also that this has to be used as a stopping condition. It very much
looks like a handcrafted architecture.
* There is apparently **no satisfying black-box approach** to calculate the gradients. Not only do we have to manually
describe which strategy has to be used for which parameter. For discrete variables we have to go even further and 
come up with manners to reduce the variance of the estimator.

If we would use this architecture would we be surprised that the network learns to count? No, I don't think so. We
pretty much hardcoded this in the architecture.

An interesting observations by the authors concerns generalization. When the model is trained on images with up to
two digits in a multi-MNIST task, it will not generalize to three digits. Likewise if it is trained on images with
zero, one, or three digits, it will not be able to handle images with two digits. Another architecture change has
been applied with the recurrent network fed by differences with the input
$$(\omega^i,h^i = R_\phi(x^i - x, h^{i=1})$$. The author coin this the DAIR model rather than just the AIR model.

The authors compare the system with the Deep Recurrent Attentive Writer (DRAW) architecture. The latter 
exhibits good performance with the same counting task. Where it lacks is a task where a task of counting zero, one, or
two digits is followed by another task using two digits. That other task is a) summing the two digits, or
b) determining if the digits are in ascending order. Here the AIR model outperforms DRAW.

<!--

I thought this was different and like less exact numbering, but it seems just the same thing as numbering

# Subitizing

There is something akin to numbering, but quite different in nature which is called subitizing. Subitizing is the 
mere instantaneous identification of the numerosity in small sets of visual items.

[A paper](https://arxiv.org/pdf/1808.00257.pdf) titled "Subitizing with Variational Autoencoders" by the authors
Rijnder Wever ([github](https://github.com/rien333))
and
[Tom Runia](http://tomrunia.github.io/)
from the University of Amsterdam describes this concept.

-->
