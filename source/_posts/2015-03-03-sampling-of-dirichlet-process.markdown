---
layout: post
title: "Sampling of Dirichlet Process"
description: "Sampling of Dirichlet Process"
date: 2015-03-03 16:06:06 +0100
comments: true
categories: [bayesian, inference, sampling, Dirichlet process]
---

Thousands of articles describe the use of the Dirichlet Process, but very few describe how to sample from it. Most often one is referred to [Markov chain sampling methods for Dirichlet process mixture models (pdf)][1] by Neal, which is a nice piece of work, but quite a dense introduction.

Let us introduce the Dirichlet Process with two lines:

$$
G \sim DP(H,\alpha) \\
\theta_i  \mid  G \sim G 
$$

First of all, if you haven't been reading an article about this material in the last decennia, the notation $$\sim$$ stands for "is distributed as" (see [stackexchange](http://stats.stackexchange.com/questions/41306/why-are-probability-distributions-denoted-with-a-tilde)). 

On the first line we have defined that $$G$$ being distributed as a Dirichlet Process (DP) with parameters $$H$$ and $$\alpha$$. The parameter $$H$$ has kind of the role of a mean, the parameter $$\alpha$$ has kind of the role of precision (inverse variance). The parameter $$H$$ is called the base distribution, the parameter $$\alpha$$ is called the dispersion factor.

On the second line we generate a bunch of parameters $$\theta_i$$ conditioned on the generated distribution $$G$$. A peculiar property of this distribution is that exactly the same $$\theta_i$$ can be sampled multiple times. Hence, the Dirichlet Process can generate discrete objects out of a continuous base distribution $$H$$.

If we have parameters we can subsequently generate observations as well:

$$
y_i  \mid  \theta_i \sim F(\theta_i)
$$

Here $$F$$ describes the mapping of parameters to observations.

We can integrate over $$G$$ to obtain a presentation such as:

$$
\theta_{n+1}  \mid  \theta_1 \ldots \theta_{n-1} \sim \frac{1}{\alpha+n} (\alpha G_0 + \sum_{i=1}^n \delta_{\theta_i})
$$

And just to write this down in a totally equivalent notation for your convenience:

$$
p(\theta_m \mid \theta_{-m},\alpha,G_0) = \frac{a}{M-1+\alpha} G_0 + \frac{1}{M-1+\alpha} \sum_{j=1,j\neq m}^M \delta_{\theta_j}
$$

Here we have picked an index $$m$$ mid-way, and not a new item $$n+1$$ which complicates the notation considerably. The notation $$\theta_{-m}$$ with the minus sign means in this case the set of parameters $$(\theta_1,\ldots,\theta_M)$$ with $$\theta_m$$ excluded.

This trick in which we can act as if a parameter mid-way is the same as a new one, is possible because of an underlying assumed property: **exchangeability** of observations.

In both notations we have $$\delta_{\theta}$$, the distribution at the point $$\theta$$. Here $$\delta$$ has the beautiful role of a functor which maps a function to a value. Something we will see back when we will take Hilbert spaces seriously, but that's something for later.

If we incorporate the likelihood $$F(y_i,\theta_i)$$, we will arrive at the following formula:

$$
\theta_i  \mid  \theta_{-i}, y_i \sim C ( \sum_{i \neq j} F(y_i,\theta_j) \delta_{\theta_j} + \alpha H_i \int F(y_i,\theta) dG_0(\theta) )
$$

Here $$C$$ is a normalization factor to make it a proper probability summing to one. The entity $$H_i$$ is the posterior distribution of $$\theta$$ given $$G_0$$ as prior and given observation $$y_i$$. The integral on the right side has the imposing form of a (Lebesgue-)Stieltjes integral. The Lebesgue integral is a nice topic on its own as well, but skimming through [wikipedia](http://en.wikipedia.org/wiki/Lebesgue_integration) should be sufficient. A one-line summary: For a two-dimensional function you can see it as "horizontal" integration rather than "vertical" integration. The Stieltjes part of it generalizes integration by (linear) parts $$dx = x_i - x_{i-1}$$ to that of integration by $$dg(x)$$. If $$g(x)$$ is differentiable everywhere and the derivative is continuous, it has the more familiar presentation:

$$
\int F(y_i,\theta) G_0'(\theta) d\theta = \int F(y_i,\theta) \frac{dG_0(\theta)}{d\theta} d\theta
$$

There is a solid reason why this familiar notation is insufficient here. In probability theory we often have a nice cumulative distribution function $$g(x)$$. However, things become nasty for the probability density function as such. The Lebesgue measure for $$g'(x)$$ (the "horizontal" integration) if the distribution of $$x$$ is discrete becomes nonsense.

Studying this multiplicative (or convolutive) form it is clear that a conjugate pair of $$F$$ and $$G_0$$ is extremely convenient.

The definition of $$p(\theta_i\ \mid \theta_{-i},y_i)$$ leads to Gibbs sampling by just drawing from it for all indices $$(i=1,\ldots,n)$$. 

To remind you about the basics of Gibbs sampling; if we sample the conditionals $$p(a_0\ \mid a_1,b)$$ and $$p(a_1\ \mid a_0,b)$$ iteratively, we will get the distribution $$p(a_0,a_1\ \mid b)$$ which is joint in $$a_0$$ and $$a_1$$. So, our sampling results in $$p(\theta\ \mid y)$$ with $$y$$ all observations. Note that Gibbs sampling allows you to forget a value $$\theta_i$$ when it is time to sample it again.

## Using cluster indices

It is possible to calculate stuff using the parameters $$\theta$$ directly, but considering that we are here interested
in clustering, it makes sense to introduce *one level of indirection*. In this case: **cluster indices**. Each parameter
$$\theta_i$$ is paired with a cluster index $$c_i$$. The values of the cluster indices do not matter, as long as all the 
parameters that belong to the same cluster are having the same value $$c_i$$. For computational convenience a series of
integers is appropriate, but it could just have as well be names from a dictionary about tropical trees.

In [Neal's paper][1] the derivation of the following is quite brief, so let me expand here a bit. The system under 
consideration here is not a Dirichlet Process, but a mixture of $$K$$ Dirichlet distributions:

$$
c_i  \mid  p \sim Discrete(p_1,\ldots,p_K) \\
\phi_c \sim G_0 \\
p_1,\ldots,p_K \sim Dirichlet(\alpha/K,\ldots,\alpha/K)
$$

Now we have to integrate out the mixing proportions $$p_i$$ to get a formula that operates on cluster indices. Again, the 
number of cluster indices is exactly equal to the number of parameters and exactly equal to the number of observations.

Let us now consider the Dirichlet-Multinomial as it is often called (terrible name!). As you see from above it should
be called the Dirichlet-Categorical (see for a derivation [stackexchange](http://math.stackexchange.com/questions/709959/how-to-derive-the-dirichlet-multinomial) again).

$$ \int p(c \mid p) p(p \mid \alpha) dp = \frac{\Gamma(\alpha)}{\Gamma(\alpha + n)} \prod_k \frac{\Gamma(\alpha_k + n(c_l=k))}{\Gamma(\alpha_k)}$$

Here $$\alpha=\sum_k \alpha_k$$, $$n=\sum_n n(c_l=k)$$ and $$l$$ runs from $$1$$ to $$n$$ (over all observations). We will use the
shorter notation $$n_k=n(c_l=k)$$ as the number of cluster indices that point to the same cluster $$k$$. Do not forget however
that this number is a function of $$c_l$$, or else you might think: where have all the $$c$$'s gone!?
And of course the guy who uses a variable $$p$$ in probabilistic
texts should be a $$p$$-victim in Jackass. :-) I think you deserve a break on the moment:

<iframe width="740" height="480" src="//www.youtube.com/embed/VhnZ3wzrwik" frameborder="0" allowfullscreen></iframe>

In our case $$\alpha_k$$ is taken to be the same for all clusters, so $$\alpha/K$$:

$$ \int p(c \mid p) p(p \mid \alpha) dp = \frac{\Gamma(\alpha)}{\Gamma(\alpha + n)} \prod_k \frac{\Gamma(\alpha/K + n_k)}{\Gamma(\alpha/K)}$$

What we are after is:

$$ p(c_1,\ldots,c_{i-1};\alpha) = \int p(c_1,\ldots,c_{i-1} \mid p) p(p \mid \alpha) dp $$

And:

$$ p(c_1,\ldots,c_{i-1},c_i=c;\alpha) = \int p(c_1,\ldots,c_{i-1},c_i=c \mid p) p(p \mid \alpha) dp $$

Basically the $$;\alpha$$ means that we identified it as a variable. However, we haven't decided yet if it is going to
be a random variable or just a parameter. We can just leave it out in the next equations, just remember that the entire
thing depends on $$\alpha$$ in the end. 
Anyway, the above two functions are required to calculate the entity we are after.
Using the definition of a conditional probability, we calculate the probability of a value for a specific cluster index 
given all other cluster indices:

$$ p(c_i=c \mid c_1,\ldots,c_{i-1}) = \frac{p(c_1,\ldots,c_{i-1},c_i=c)}{p(c_1,\ldots,c_{i-1})}$$

I try to follow here the notation in Neal's paper as close as possible. Do not fry me because I use $$c$$ here as an 
instance of $$c_i$$. It ain't pretty, I know!

The nominator:

$$ \int p(c_1,\ldots,c_{i-1},c_i=c \mid p) p(p \mid \alpha) dp = 
 \frac{\Gamma(\alpha)}{\Gamma(\alpha + n)} \prod_k \frac{\Gamma(\alpha/K + n_k)}{\Gamma(\alpha/K)}$$

And the denominator where we have one less component index to calculate with (so $$n-1$$ to sum over):

$$ \int p(c_1,\ldots,c_{i-1} \mid p) p(p \mid \alpha) dp = 
 \frac{\Gamma(\alpha)}{\Gamma(\alpha + n - 1)} \prod_k \frac{\Gamma(\alpha/K + n_{k,-i})}{\Gamma(\alpha/K)}$$

The notation $$n_{k,-i}$$ counts the cluster indices as for $$n_k$$ but does not take into account $$i$$. This notation is a bit awkward 
admittedly, because the left-hand side does not seem to contain $$c_i$$. But it does because $$n_k = n(c_l = k)$$ if you remember. The notation just becomes a bit less cluttered by writing it down like this,
trust me. The division becomes:

$$ p(c_i=c \mid c_1,\ldots,c_{i-1}) = \frac{ 
 \frac{\Gamma(\alpha)}{\Gamma(\alpha + n)} \prod_k \frac{\Gamma(\alpha/K + n_k)}{\Gamma(\alpha/K)} }
 {\frac{\Gamma(\alpha)}{\Gamma(\alpha + n - 1)} \prod_k \frac{\Gamma(\alpha/K + n_{k,-i})}{\Gamma(\alpha/K)} }$$

And we are happy to see we can cross-out a lot of the terms in this fraction:

$$ p(c_i=c \mid c_1,\ldots,c_{i-1}) = \frac{\Gamma(\alpha + n - 1)}{ \Gamma(\alpha+n)}
\prod_k \frac{ \Gamma(\alpha/K + n_k)} 
{\Gamma(\alpha/K + n_{k,-i})}$$

As you probably know $$\Gamma(x)=(x-1)!$$, so it is not hard to see that $$\Gamma(x+1)=x\Gamma(x)$$ just as with a 
factorial: $$x! = x(x-1)!$$.
Also, $$\Gamma(x-1)=\Gamma(x)/(x-1)$$, which leads to a simplification of the first fraction:

$$ p(c_i=c \mid c_1,\ldots,c_{i-1}) = 
\frac{\Gamma(\alpha + n)}{(\alpha+n-1) \Gamma(\alpha+n)}
\prod_k \frac{ \Gamma(\alpha/K + n_k)} 
{\Gamma(\alpha/K + n_{k,-i})} \\
=\frac{1}{\alpha+n-1}
\prod_k \frac{ \Gamma(\alpha/K + n_k)} 
{\Gamma(\alpha/K + n_{k,-i})} 
$$

The second fraction requires splitting of the product for $$c_i=k$$ or, equivalently, $$k=c$$. So, we bring the index that
(amongst others) is pointed at by observation $$c_i=k$$ to the front:

$$\prod_k \Gamma(\alpha/K + n_k) = 
\Gamma(\alpha/K + n_c) \prod_{k \neq c}  \Gamma(\alpha/K + n_k) 
$$

If we think this through, we now know that $$n_c$$ does contain the cluster corresponding with the observation with index $$i$$ and henceforth that $$n_k$$
does **not** contain that cluster. Thus the following is absolutely equivalent to the above:

$$\prod_k \Gamma(\alpha/K + n_k) = 
\Gamma(\alpha/K + n_c) \prod_{k \neq c}  \Gamma(\alpha/K + n_{k,-i}) 
$$

Thinking this through, we also realize that $$n_c$$ does indeed contain this cluster corresponding with observation $$i$$, 
and therefore must be exactly one larger than if it would not be counting $$c_i$$!

$$\prod_k \Gamma(\alpha/K + n_k) = 
\Gamma(\alpha/K + n_{c,-i} + 1) \prod_{k \neq c}  \Gamma(\alpha/K + n_{k,-i}) 
$$

We can again make use of the $$\Gamma(x+1)=x\Gamma(x)$$ fact:

$$\prod_k \Gamma(\alpha/K + n_k) = 
(\alpha/K + n_{c,-i}) \Gamma(\alpha/K + n_{c,-i}) \prod_{k \neq c}  \Gamma(\alpha/K + n_{k,-i}) 
$$

And we can move the Gamma term with $$n_{c,-i}$$ within the product again:

$$\prod_k \Gamma(\alpha/K + n_k) = 
(\alpha/K + n_{c,-i}) \prod_k \Gamma(\alpha/K + n_{k,-i}) 
$$

Let me reiterate the equation from above (because it has now scrolled off your screen except if you keep your laptop
vertically - on its side - when reading this, or if you use a ridiculous high resolution):

$$ p(c_i=c \mid c_1,\ldots,c_{i-1}) = \frac{1}{\alpha+n-1}
\prod_k \frac{ \Gamma(\alpha/K + n_k)} 
{\Gamma(\alpha/K + n_{k,-i})}$$

Fill in our neat endevour with shifting in and out of the product, just to go through a Gamma function, and we arrive at:

$$ p(c_i=c \mid c_1,\ldots,c_{i-1}) = \frac{ \alpha/K + n_{c,-i}  }{\alpha+n-1} $$

The first time I encountered the sentence "just integrate out the mixing proportions $$p_i$$" I did not have a clue that a dozen steps
like these were required. But, perhaps, I need them spelled out in more detail than a person with a normal brain... 

The step subsequently fo $$K \rightarrow \infty$$ contains probably also many steps, but only for a mathematical rigorous
mind, not my sloppy one. If we only consider cluster $$c_i=c$$, we can use the equation above and assume $$\alpha/K$$ goes to zero.
The only other assumption we need in this case, is that there is some other observation with cluster index $$c_i$$, so
$$n_{c,-i} \neq 0$$.

$$ p(c_i=c \textit{ and } n_{c,-i} \neq 0  \mid c_1,\ldots,c_{i-1}) = \frac{ n_{c,-i}  }{\alpha+n-1} $$

Or, equivalently:

$$ p(c_i=c \textit{ and } c_i = c_j \textit{ and } i \neq j  \mid c_1,\ldots,c_{i-1}) = \frac{ n_{c,-i}  }{\alpha+n-1} $$

<!--
If we count all conditional probabilities for $$c_i \neq c$$ it has to sum to one minus the term above. This is just
sampling over the entire sample space $$\Omega(\mathbf{c})$$. To recapitulate the essence of it:

$$\sum_{\omega \in \Omega(\mathbf{c})} p(c_i=\omega \mid c_1,\ldots,c_{i-1}) = 1$$

Apply this:

$$ p(c_i\neq c \mid c_1,\ldots,c_{i-1}) = 1 - \frac{\alpha/K + n_{c,-i}  }{\alpha+n-1} 
= \frac{ \alpha + n - 1 - n_{c,-i} - \alpha/K  }{\alpha+n-1} $$

If we let $$K \rightarrow \infty$$, it seems we arrive at:

$$ p(c_i\neq c \mid c_1,\ldots,c_{i-1}) =  
\frac{ \alpha + n - 1 - n_{c,-i}  }{\alpha+n-1} $$

Unless $$n_{c,-i} = n - 1$$ (which is of course not the case) we will not arrive at the same result as in the paper. 
So, we are calculating the wrong entity here. The equation is correct, but we are after a different entity, namely
the following.

Apparently, what we are after is not the collection of other options for $$c_i$$, which
is indeed kind of trivial, but the probability that none of the other observations $$c_j$$ is part of the same cluster.

-->
If we consider $$c_i=c$$ again and now with $$n_{c,-i}=0$$:

$$ p(c_i=c \textit{ and } c_i\neq c_j \textit{ and } i \neq j \mid c_1,\ldots,c_{i-1}) = \frac{ \alpha/K }{\alpha+n-1} $$

I won't say often "of course", but here it is of course that $$i \neq j$$.
Then if we allow $$c_i$$ to take all possible $$K$$ values, in this case the sum is not one because of the "and" operation:

$$\sum_{\omega \in \Omega(\mathbf{c}} p(c_i=\omega \textit{ and } c_i \neq c_j \textit{ and } i \neq j  \mid c_1 ,\ldots,c_{i-1}) = K \frac{ \alpha/K }{\alpha+n-1} $$

So, this is straightforward the number of clusters, $$K$$, times the previously calculated probability for a single cluster.
We arrive sweetly - without taking limits in this case - at:

$$ p(c_i \in \Omega(\mathbf{c}) \textit{ and } c_i\neq c_j \textit{ and } i \neq j  \mid c_1,\ldots,c_{i-1}) =  
\frac{ \alpha }{\alpha+n-1} $$

We kept here explicit that we consider all possible cluster indices for $$c_i$$ by drawing it from the set $$\Omega(\mathbf{c})$$.
Sorry, this is not standard notation, feel free to suggest improvements using the discussion section! The reason why
I explicitly add it is because $$p(c_i\neq c_j \textit{ and } i \neq j)$$ might be read as the sum of the probabilities
of any two cluster indices being unequal (where we do not fix $$i$$ to a specific cluster index). Note also that in
Neal's exposition $$i$$ is the last observation. The notation here does not assume that $$i$$ is the last observation,
and hence uses $$i \neq j$$ rather than $$j < i$$, but this is absolutely equivalent.

## Nonconjugate priors

[Neal's article][1] is again a source of insight. Make sure however to also take a look at the first people working on these problems. Antoniak for example extended Ferguson's Dirichlet Process to the mixture model case and reading [this old text][2] might be enlightening as well. Let us recapitulate quickly what we have. We have an equation for
the conditional probabilities of cluster indices given the other cluster indices for an infinite number of clusters.
The equation has two parts. One in which we have a cluster index that has been encountered before:

$$ p(c_i=c \textit{ and } c_i=c_j \textit{ and } i \neq j  \mid  c_1,\ldots,c_{i-1}) = \frac{ n_{c,-i}  }{\alpha+n-1} $$

And one part in which we have a cluster index that has not been encountered before:

$$ p(c_i \in \Omega(\mathbf{c}) \textit{ and } c_i\neq c_j \textit{ and }i \neq j \mid c_1,\ldots,c_{i-1}) = \frac{ \alpha }{\alpha+n-1} $$

The term $$c_i=c_j \textit{ and } i \neq j$$ is true for any $$i \neq j$$, while $$c_i \neq c_j \textit{ and } i \neq j$$ is true only when all of $$c_j$$ are unequal to $$c_i$$.

We now have to take a shortcut and bluntly introduce the [Metropolis-Hastings algorithm](http://en.wikipedia.org/wiki/Metropolis%E2%80%93Hastings_algorithm). Why it works I would love to
show another time. It is a typical Monte Carlo method driven by detailed balance. Ehrenfest, the inventer of the 
[dog-flea model](http://en.wikipedia.org/wiki/Ehrenfest_model) would have been proud. 

To sample a density $$\pi(c_i)$$ a proposal density, $$g(c_i^*\mid c_i)$$, is used in calculating an acceptance probability $$a(c_i^*,c_i)$$:

$$a(c_i^*,c_i) = \min \left[ 1, \frac{g(c_i \mid c_i^*)}{g(c_i^* \mid c_i)} \frac{ \pi(c_i^*)}{\pi(c_i)} \right]$$

With probability $$a$$ the new state $$c_i^*$$ is accepted. With probability $$1-a$$ the old state $$c_i$$ is maintained.

$$a(c_i^*,c_i) = \min \left[ 1, \frac{g(c_i \mid c_i^*)}{g(c_i^* \mid c_i)} \frac{p(c_i^*; k^* \mid c_{-i}^*)}{p(c_i; k \mid c_{-i})} \frac{ F(y_i,\phi_{c_i^*})}{F(y_i,\phi_{c_i})} \right]$$

Here we made explicit that $$k^*$$ and $$k$$ might be different. Moreover, the notation $$c_{-i}$$ stands for $$c_1,\ldots,c_n$$ with $$c_i$$ excluded.

First, I went on a tangent here. I thought Neal was picking the following as a transition probability:

$$g(c_i^*\mid c_i) = \frac{p(c_i^*; k^* \mid c_{-i}^*)}{p(c_i; k \mid c_{-i})} 
$$

And subsequently I started calculating this ratio, where I made mistakes as well not realizing at first that $k$ and $k^*$ do not need to be the same. However, after "breaking my head", I finally understood that Neal proposes something much simpler:

$$g(c_i^* \mid c_i) = p(c_i^*; k^* \mid c_{-i}^*) 
$$

In such a case the acceptance rule becomes indeed quite simple:

$$a(c_i^*,c_i) = \min \left[ 1, \frac{ F(y_i,\phi_{c_i^*})}{F(y_i,\phi_{c_i})} \right]$$

Only the likelihood is used to calculate the Metropolis-Hastings ratio.

## Auxiliary parameters

I have to study this part later.

  [1]: http://www.tandfonline.com/doi/pdf/10.1080/10618600.2000.10474879
  [2]: http://projecteuclid.org/download/pdf_1/euclid.aos/1176342871
  [3]: http://www.cs.princeton.edu/courses/archive/fall07/cos597C/scribe/20070921.pdf

