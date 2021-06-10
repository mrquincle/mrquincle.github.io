---
layout: post
title: "Line detection"
description: "Line detection"
date: 2015-06-12 09:20:39 +0200
comments: true
categories:
published: false
---

# Density function

The probability density function of a uniform distribution perpendicular to a line segment with a compounded Gaussian distribution dictating how far points are allowed to be removed from that line.

![Uniform-Gaussian distribution 2D](/images/blog/gaussian_uniform.png)

The same probability density function but with a larger standard deviation, $$\sigma$$, for the Gaussian

![Uniform-Gaussian distribution 2D with large standard deviation](/images/blog/gaussian_uniform_sigma_large.png)

The probability density function changes to a more continuous form of points that cannot be projected onto the line segment are not assigned a probability zero, but a Gaussian probability with respect to the closest endpoint.

![Gaussian with round corners](/images/blog/gaussian_round.png)

# Inference

To perform inference we can use the above probability density function and use it as input for a Metropolis-Hastings algorithm.

The proposal distribution is a Gaussian distribution. This is symmetric, so we can take into account the ratio of the likelihood to calculate the acceptance probability:

![Metropolis-Hastings, after burn-in of 200, total 500 steps, starts with red lines, does not converge](/images/blog/mh_lines.png)

The above picture shows a run to estimate the given point cloud with a single line. It starts with the red lines (a burn-in period is not shown), and visualizes every 20th line in the estimation process. It is clearly seen that the method has trouble finding line segments that are of limited length. Due to the fact that there is no prior on the size of the line segment, it will approve of all lines that allow the projection of all points on the admitted interval. Hence, most lines will be overly large. Moreover, because this likelihood does not punish large lines, it is definitely possible that there will be very long lines perpendicular to the cloud point. As long as they intersect the point cloud in the middle, the likelihood is quite large.

It does not seem to be the case that the proposal distribution is that bad. Although it is important to have steps that do not move the end points over significant distances.

Also, picking the wrong initial points might make it extremely hard to find a nonzero probability.

