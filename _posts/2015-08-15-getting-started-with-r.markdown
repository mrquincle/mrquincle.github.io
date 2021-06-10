---
layout: post
title: "Getting started with R"
description: "Getting started with R"
date: 2015-08-15 19:02:22 +0200
comments: true
categories:
published: false
---

Installing `R` itself is not difficult.

    sudo apt-get install r-base

It is recommended to install Rstudio as well, which isn't to be found in the Ubuntu repositories. Navigate to <https://www.rstudio.com/products/rstudio/download/> and install the .deb file (the Ubuntu 12.04+ version worked fine on my 14.04 installation).

What I wanted to try out is the DPpackage from <https://cran.r-project.org/web/packages/DPpackage/DPpackage.pdf>. What confused me is that there are clear examples given with the package, but I am not able to run them... They are surrounded by a `## Not run:` statement.

First install the package, open `R` and:

    install.packages('DPpackage_1.1-6.tar.gz')

It will automatically ask where to install them if you are not a superuser.

To see the example code you can run:

    ?DPpackage::CSDPbinary

And to run an example, if it wasn't surrounded by a "Not run" statement, I assume it would be:

    example(CSDPbinary,package='DPpackage')

Loading the library is necessary after the installation:

    library(DPpackage)

In the end I created a `CSDPexample.R` file and copied everything ad verbatim.

    source('example/CSDPexample.R')




