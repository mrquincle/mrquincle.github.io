<!--

The proposal distribution in our case is the conditional distribution for the cluster indices!

$$ p(c_i=c \mid c_1,\ldots,c_{i-1}) = \frac{ \alpha/K + n_{c,-i}  }{\alpha+n-1} $$

For another value, say $$c^*$$, this is equivalent:

$$ p(c_i=c^* \mid c_1,\ldots,c_{i-1}) = \frac{ \alpha/K + n_{c^*,-i}  }{\alpha+n-1} $$

So, if we are in state corresponding with $$c_i=c$$ we divide by the probability $$ p(c_i=c \mid c_1,\ldots,c_{i-1})$$ and
multiply with $$p(c_i=c^* \mid c_1,\ldots,c_{i-1})$$ to arrive at:

$$g(c_i^* \mid c_i) = \frac{p(c_i=c^* \mid c_1,\ldots,c_{i-1})}{p(c_i=c \mid c_1,\ldots,c_{i-1}) } = \frac{n_{c^*,-i}}{n_{c,-i}}$$ 

All the terms $$\alpha$$, $$n$$, $$-1$$, and $$\alpha/K$$ cancel against each other.

I would say that the probability of the reverse transition is:

$$g(c_i \mid c_i^*) = \frac{p(c_i=c \mid c_1,\ldots,c_{i-1})}{p(c_i=c^* \mid c_1,\ldots,c_{i-1}) } = \frac{n_{c,-i}}{n_{c^*,-i}}$$ 

Note now that we need the *inverse* of the reverse transition, hence:

$$\frac{g(c_i \mid c_i^*)}{g(c_i^* \mid c_i)} = 
 \left( \frac{n_{c,-i} }{n_{c^*,-i} }\right)^2$$ 

That would mean that it is much more likely to transition to a cluster to which only few other observations belong 
(that is, if $$n_{c,-i} > n_{c^*,-i}$$ it will likely transition to state $$c^*$$). That will lead to fast mixing. 
We have to realize that $$n_{c,-i} \neq n_{c^*,-i}$$ because although the current $$i$$ is excluded from this count,
this doesn't mean that the number of observations with the same cluster index $$c_i=c$$ is equal to the number of
observations with the cluster index $$c_i=d$$.

Considering we are interested in the density $$\pi(\cdot)=p(c) F(y_i,\phi_{c_i})$$, the acceptance probability becomes:

$$a(c_i^*,c_i) = \min \left[ 1, \left( \frac{n_{c,-i} }{n_{c^*,-i} }\right)^2 \frac{ p(c^*) }{ p(c) } \frac{ F(y_i,\phi_{c_i^*})}{F(y_i,\phi_{c_i})} \right]$$

The probability of $$p(\mathbf{c})$$ is known as the Chinese Restaurant Process. It can be derived by $$p(\mathbf{c})=p(c_1) p(c_2 \mid c_1)\cdot\ldots\cdot p(c_n \mid c_{n-1},\ldots,c_1)$$ where the conditionals are given before. 
Note that we mean with $$p(\mathbf{c})$$, the probability $$c_1=c_1', c_2=c_2'$$, etc. So, the probability of a specific partition.

It is clarifying to skim through the [Chinese Restaurant Process (pdf)][3] explanation in Blei's lecture. You will see that, given a partition, the number of times that $$\alpha$$ occurs in the nominator is equal to the number of clusters. If you pay close attention, you see that the second table with four customers $$n_2=4$$ is reflected by a series of $$3 \cdot 2 \cdot 1$$ terms (and a denominator), in other words, it brings in a term $$(n_c-1)!$$. Patiently multiplying all terms, we reach at the following equation for our partition:

$$p(\mathbf{c})= \alpha^k \frac{ \prod_{c \in \Omega(\mathbf{c})} (n_c-1)!} {\prod_{i=1}^n (\alpha + i - 1)} $$

Here $k \leq n$ is the number of (distinct) clusters.

We use the [Pochhammer function or rising factorial](http://en.wikipedia.org/wiki/Pochhammer_symbol) to play with notation:

$$ {\prod_{i=1}^n (\alpha + i - 1)} = \alpha^{(n)} = \frac{(\alpha+n-1)!}{(\alpha-1)!} $$

So, we can equivalently write:

$$p(\mathbf{c}) = \alpha^{k} \frac{(\alpha-1)!}{(n+\alpha-1)!} \prod_{c \in \Omega(\mathbf{c})} (n_c-1)!$$

And, as often is the case if you see these factorials popping up, we considered here all permutations for $$\mathbf{c}$$ as equivalent. If we want to write down the equation for a particular $$\mathbf{c}$$ with a predefined order we need an additional factor $$k!$$. So, the following is the probability of $$\mathbf{c}$$ in a particular order (the probability of each permutation):

$$p(\mathbf{c}) = \alpha^{k} \frac{(\alpha-1)!}{(n+\alpha-1)! k!} \prod_{c \in \Omega(\mathbf{c})} (n_c-1)!$$

Sorry for having explored these different notations a bit. But now, in case you come across slightly different formulas for $$p(\mathbf{c})$$ you know how to get back and forth. Here we have a fraction of $$p(\mathbf{c^*})$$ and $$p(\mathbf{c})$$, so the denominator and other factors drop out again! So, given $$n_{i,c}\prime = n_{i,c}-1$$ and $$n_{i,c^*}\prime = n_{i,c^*} + 1$$.
This means the expression $$p(c^*)$$ differs for two counts with $$p(c)$$. 

$$\frac{p(c_1,c_i=c^*,\ldots,c_n)}{p(c_1,c_i=c,\ldots,c_n)}= \frac { \prod_{c \in (c,c^*)} (n_c - 1)!} { \prod_{c \in (c\prime,c^*\prime)} (n_c - 1)!}  $$

Here we misuse $c$ for both the variable $$n_c$$ and for a specific instance. We can write it out as:

$$\frac{p(c_1,c_i=c^*,\ldots,c_n)}{p(c_1,c_i=c,\ldots,c_n)}= \frac { (n_c - 1)! (n_c^* - 1)! } { (n_c\prime - 1)! (n_c^*\prime -1)!  }  $$

Now using $$n_c\prime=n_c-1$$ and $$n_{c^*}=n_{c^*}\prime - 1$$.

$$\frac{p(c_1,c_i=c^*,\ldots,c_n)}{p(c_1,c_i=c,\ldots,c_n)}= \frac { (n_c - 1)! (n_{c^*}\prime - 2)! } { (n_c - 2)! (n_{c^*}\prime -1)!  }  $$

Apply the factorial definition shifted with one, $$(n-2)! =\frac{(n-1)!}{n-1}$$:

$$\frac{p(c_1,c_i=c^*,\ldots,c_n)}{p(c_1,c_i=c,\ldots,c_n)}= \frac {n_c - 1} { n_{c^*}\prime - 1} =   \frac {n_c - 1} { n_{c^*}}  $$

Together with the transition probability this is:

$$\left( \frac{n_{c,-i} }{n_{c^*,-i} }\right)^2  \frac {n_c - 1} { n_{c^*}}  $$

Neal states this factor is equal to one however, so that the acceptance probability becomes:

$$a(c_i^*,c_i) = \min \left[ 1, \frac{ F(y_i,\phi_{c_i^*})}{F(y_i,\phi_{c_i})} \right]$$

Probably I haven't done the housekeeping right... :-( 

-->

