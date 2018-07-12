# Website Anne van Rossum

The source for my [website](https://mrquincle.github.io) that describes a little bit of everything.

If you want to support me with respect to any of the open-source projects I have been working on, feel free to give me a beer! :-)

[![Flattr this git repo](http://api.flattr.com/button/flattr-badge-large.png)](https://flattr.com/submit/auto?user_id=annevanrossum&url=github.com/mrquincle&title=Flattr&tags=github&category=software)

## Usage

To create a new post:

    rake 'new_post[Some title]'

Subsequently go `source/_posts` to write your blog post.

And to publish it:

    rake push_source

To just view it locally:

    rake preview

Have fun!

## Writing tips

Refering to another blog post:

    Check [Kullback-Leibler divergence]({% post_url 2017-05-03-what-is-contrastive-divergence %}).

## Collaboration

If you want to collaborate on anything, please, tell me as well! I love quick prototyping and on the moment I am working on nonparametric Bayesian methods, figuring out how to build a cheap hexapod (RHex-like) robot, and experimenting with different Bluetooth Low-Energy devices.
