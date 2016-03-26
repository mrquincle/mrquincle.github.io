# Installation

Everything can be done from this `source` branch.

## Repository setup

After cloning the entire repository, clone the master branch separately into the `_deploy` folder.

	./setup.sh

That's all what it does.

## Installation

This will set up bundler etc. locally. There's a lot of stuff that is required. 

	export PATH=$PATH:$HOME/.gem/2.3.0/bin
	export GEM_HOME=$HOME/.gem
	sudo aptitude install ruby ruby-dev rubygems rubygems-integration

And probably a lot more to install...

	./install.sh

Running that will install the proper gems. Make sure you have the `Gemfile` 

## Deployment

To deploy, just run"

	./deploy.sh

You'll have to have a Rakefile with the proper targets.
