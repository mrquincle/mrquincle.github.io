---
layout: post
title: "What's the thalamus?"
description: "A quest into one of our brain organs, the thalamus"
date: 2015-04-29 21:37:23 +0200
comments: true
categories: neuroscience
---

If you're interested in how things work, our brain is one of the most intriguing devices around. I love reverse engineering stuff. Understanding limits and colimits within category theory can be just as rewarding as getting to terms with the intricate structure of the brain.

The thalamus is, hmmm, particular shaped, and centered in the middle of our head, resting on our cerebellum.

![Visualation of the thalamus from the Dr. Rudyard Health Pictures collection. The person doesn't look very happy...](http://www.rudyard.org/wp-content/uploads/2013/09/parts-of-the-brain-thalamus.jpg)

One thing that is very interesting of the thalamus is that it has a thalamic nucleus (a bunch of neurons) for every type of sensory system
(see also [5]):

* visual input from the retina is sent to the lateral geniculate nucleus;
* auditory input is similarly sent to the medial geniculate nucleus;
* somatosensory input is sent to the ventral posterior nucleus;
* olfactory input and input from the amygdala is sent to the medial dorsal nucleus.

There are some other inputs as well, such as from:

* the mammillary bodies, apparently having a recollective memory function, towards the anterior nuclei;
* the basal ganglia, having to do with motion planning, project towards the ventral anterior nucleus;
* the basal nuclei (substantia negra and globus pallidus), involved with motor coordination and learning, project into the ventral lateral nucleus;
* the neospinothalamic tract and medial lemniscus, associated with pain and proprioception, enter the ventral posterolateral nucleus;
* the trigeminothalamic tract and the solitary tract, having to do with touch and vibration in the face, respectively, being involved in taste, go up to the ventral posteromedial nucleus.

It is quite interesting that the pulvinar nuclei are quite big in humans (making up 40% of the thalamus) compared to cats or rats. Lesions can lead to attentional deficits. This part also seems to influence the onset of saccades.

## Maps

It is a remarkable fact that Newton already foresaw that if the brain has to have a continuous representation of continuous objects in its view, there must be crossing (decussation) in which the left part of the left eye is merged with the left part of the right eye, and the right part of the right eye is merged with the right part of the left eye.

![Partial decussation at the optic chiasm, as predicted by Newton (picture from Psychology class at Appalachian State University)](http://www1.appstate.edu/~kms/classes/psy3203/EyePhysio/VisualPathways.jpg)

Quite remarkably however is how neatly this has been organized. Lesions at the cortex (thank fast and precise bullets of the first world war for these) lead to very fine lesions at the retina all the way through the thalamus. All intermediate neurons die slowly off because of a lack of input of higher levels (called retrograde cell degradation). The interesting thing is that this death is very local. Apparently there is a very strict map from the retina onto the thalamus (the lateral geniculate nucleus) and onto the primary visual cortex. It is incredible that this has been already completely organized before our eyes open as babies!

Note, that it is not always easy to find out the nature of a map. In the early stages of the olfactory system, for example, maps represent groups of chemicals that are similar on a molecular level.

## Higher-order

The thalamus isn't limited to being a relay station to the cortex (see [2]). Apart from inputs (often called afferents
in neuroscience) directly
from our senses, the thalamus receives back connections from the cortex. This is very interesting
from an architectural point of view. First the thalamus projects unto different parts of the cortex, and then these
parts project back on the thalamus... There must be something interesting going on in the thalamus!

Not considering the particular properties of the modality that is processed, this allows someone to daydream about what
the thalamus might be doing. The [information bottleneck method](http://en.wikipedia.org/wiki/Information_bottleneck_method)
introduced by Tishby introduces bottlenecks in for example networks on purpose. A bottleneck in a neural network is
formed by pruning a lot of connections in a fullly connected network such that there are a few neurons left through
which information necessarily has to pass if one part of the network needs to communicate with another part of the
network. In a layered network, such neurons form a "bottleneck layer" with fewer neurons than in the other layers. By
doing this the designer of the network forces representations to be expressable by only a small set of neurons. In
machine learning this can be understood as a form of [dimensionality reduction](http://en.wikipedia.org/wiki/Dimensionality_reduction). A high-dimensional function is
represented using only a few (nonlinear) units. A typical form of dimensionality reduction in standard machine learning
is by picking a limited number of orthogonal dimensions in the data with high variance using [principle component analysis](http://en.wikipedia.org/wiki/Principal_component_analysis). Using neurons to do dimensionality reduction however is more akin to autoencoders (revived in
deep learning) in which there is less control of the form of the "bottleneck representations".

## Phase-locked loop

But... all this is nice theory from a computer science perspective. Neuroscientists of course don't care: they want to
explain actual biology. The next figure is about the vibrissal system: the neural circuitry around whiskers!

![Thalamus-Cortex interactions (image from Ahissar and Oram at Oxfordjournals)](/images/blog/thalamuscortex.gif)

The question at hand: Do neurons in the thalamus merely relay information or do they process information. For a
computer scientist this seems a silly question. However, what is meant with this is the following. A "relay function"
might actually improve the signal to noise ratio as in a repeater station, or optimize bandwidth, or other such
functions as long as the content of the signal is not adjusted. A "process function" would be basically everything
else... In the above study which mainly reiterates the findings of Groh et al. (2008) it is described how for the
whisker system a [phase-locked loop](http://en.wikipedia.org/wiki/Phase-locked_loop) is implemented, well-known by all
engineers in the world (since [Huygens](http://en.wikipedia.org/wiki/Christiaan_Huygens)).
By making sure that the deviations between input and output phase get minimized it naturally
follows that the frequencies of the input and output will be synchronized. Hence, the thalamus-cortex circuits will
oscillate on the same frequency as the physical "whisking".

Quite disappointing from a machine learning perspective... We had hopes on some abstract processing going on, such as
dimensionality reduction, and we are left with phase-locked loop... But, do not dispair! This is just a single modality.
Perhaps the thalamus fulfills widely different functions for different modalities.

Other studies such as that of coughing (see [3]), neither identify the thalamus with some generic function. This study
by the way is a bit sickening. A genetically altered herpes virus is used to trace signal pathways in the brains of
mice. The virus jumps from one neuron to the next through synapses as would a normal signal as well.

## Drivers versus modulators

A study by [Crosson][4] is broader in scope. First, it addresses the two ways in which neurons in the thalamus fire. If
the neuron is under a larger negative potential (polarized) compared to its surroundings, it emits bursts of spikes.
If, however, the neuron has a smaller negative potential (depolarized) compared to its environment, it linearly sends
its inputs to its outputs. The latter might be seen as a form of high-fidelity information transmission, while the
former does only convey some low-fidelity information. It might be related to the difference when someone is paying
attention. The two different forms are often called "burst" mode versus "tonic" mode. You might think, but if there
are bursts of spikes, it seems more information can be transmitted! The reason why this is not the case is because
bursts are quite regular, it could just have been called "oscillatory" mode as well. During sleep most neurons in the
thalamus are in burst mode.

The author addresses also the hypothesis of [Sherman and Guillery][1] in which cortex-thalamus-cortex connections are
suggested as "drivers" (sending over information), while cortex-cortex connections are "modulators" (determining the
weight, importance, or actual arrival of this information). This seems like the architecture as postulated by
Baars and implemented by Franklin, the [global workspace theory](http://en.wikipedia.org/wiki/Global_Workspace_Theory),
although the latter is cast in terms of "consciousness", which isn't the smartest way to objectively speak about and
study brain architectures. Global workspace theory adds to this architecture a sense of how modulation would be
implemented, namely by inhibation between competing cortex areas, enabling only a subset of cortex-thalamus-cortex
connections to be active at any time. Crosson postulates a function for the cortex-thalamus-cortex route that in my
opinion is not so different from this architecture, namely that the thalamus can prioritize and pay "attention" or give
priority to one part of the cortex above the other. The difference might exist in the nature in which such a
[winner-take-all](http://en.wikipedia.org/wiki/Winner-take-all_(computing)) is implemented. Is it through the thalamus
as central hub who integrate all votes from all cortical areas and then decide who's next on stage? Or is it through
inhibition from cortical areas to each other? This type of research cries on input from voting network models and
consensus theory from computer science.

## Consciousness

Note, that there is no reason to subscribe a conscious seat to the thalamus. Although the thalamus has to do with
attention and might enable the brain to modulate conscious processing, there are reasons to assume that (conscious)
experiences arises from a thin sheet of neurons underneath the neocortex, named the [claustrum](http://en.wikipedia.org/wiki/Claustrum).
Watch in this respect the below video featuring Koubeissi's experiment with an epileptic patient:

<iframe width="740" height="480" src="//www.youtube.com/embed/QBFD-GzNekE" frameborder="0" allowfullscreen></iframe>

## Sequences

In all cases, it must be ensured that a (majority) vote should be a temporary event. The same piece of cortex winning
all the time means neural death for the rest of the cortex. It
is indeed possible to solve it by having cortex regions vote for each other (not only for themselves). This is for
example proposed for
[winner-take-all networks in action selection](http://en.wikipedia.org/wiki/Winner-take-all_in_action_selection). It is
also possible to have infrastructure in place in which a winner "kills itself" through inhibition of return. In that
case activation of a cortical area would automatically diminish its own importance by inhibiting its own afferents
from the thalamus. This is the model postulated in the work on [visual saliency](http://www.scholarpedia.org/article/Saliency_map)
by Itti et al. It is very hard to imagine an infrastructure which only would implement inhibition of return. In my
opinion this would very likely be interwoven with the need of creating sequences of activation.

## Sensor fusion

What is also very interesting to note is that nobody speaks about thalamus-thalamus connections. This means that the
thalamus very likely does not play a role in *sensor fusion*.

## Core versus Matrix

There are two main groups of neurons in the thalamus projecting to the cortex. They can be distinghuished by the type
of proteins they express. The core neurons express parvalbumin and the matrix neurons express calbindin. In the
auditory system (see [6]), the core neurons are finely tuned with respect to frequency, while the matrix neurons are broadly
tuned and respond positively to acoustical transients. It seems the core neurons like pitch (content), while the
matrix neurons like rhythm (context).

## Layers

I don't feel science has progressed enough to unequivocally tell which layers are connected to which layers and how the
thalamus plays a role in it. Commonly accepted is the pathway L4 -> L2/3 -> L5. However, very recently (see [7]) it has been
uncovered that there are direct connections from the thalamus to L5 as well. The thalamus seems to active two layers
of the cortex in parallel.

# Literature

There are many other facets of the thalamus to talk about. For example [Adaptive Resonance Theory](http://en.wikipedia.org/wiki/Adaptive_resonance_theory)
has been used to describe the nature of the cortex-thalamus loops. However, if I write about this again, it will be
about a nice model that has temporal components as well as the ability to build up sequences. I haven't found
something with enough believable detail yet, so I'll have to be patient till more is figured out.

1. [Exploring the Thalamus (2001) Sherman and Guillery][1] a nice overview of all kind of matters around the thalamus, and - really nice! - only using a few abbreviations!
2. [Thalamic Relay or Cortico-Thalamic Processing? Old Question, New Answers (2013) by Ahissar and Oram][2], one of the most recent studies of higher-order nuclei.
3. [Sensorimotor Circuitry involved in the Higher Brain Control of Coughing (2013) Mazzone et al.][3]
4. [Thalamic Mechanisms in Language: A Reconsideration Based on Recent Findings and Concepts (2013) Crosson][4]
5. [The Thalamic Dynamic Core Theory of Conscious Experience (2011) Ward][5]
6. [Thalamocortical Mechanisms for Integrating Musical Tone and Rhythm (2013) Musacchia et al.][6]
7. [Deep Cortical Layers are Activated Directly by Thalamus (2013) Constantinople and Bruno][7]

[1]: http://www.amazon.com/Exploring-Thalamus-S-Murray-Sherman/dp/0123054605 "Exploring the Thalamus (2001) Sherman and Guillery"
[2]: http://cercor.oxfordjournals.org/content/early/2013/11/07/cercor.bht296.full "Thalamic Relay or Cortico-Thalamic Processing? Old Question, New Answers (2013) by Ahissar and Oram"
[3]: http://www.biomedcentral.com/content/pdf/1745-9974-9-7.pdf "Sensorimotor circuitry involved in the higher brain control of coughing"
[4]: http://www.ncbi.nlm.nih.gov/pmc/articles/PMC3514571/ "Thalamic Mechanisms in Language: A Reconsideration Based on Recent Findings and Concepts"
[5]: http://www.cogsys.ubc.ca/401/files/2014/01/Ward-2011-tdc.pdf "The Thalamic Dynamic Core Theory of Conscious Experience"
[6]: http://www.ncbi.nlm.nih.gov/pmc/articles/PMC4217521/ "Thalamocortical mechanisms for integrating musical tone and rhythm"
[7]: http://www.ncbi.nlm.nih.gov/pmc/articles/PMC4203320/ "Deep Cortical Layers are Activated Directly by Thalamus"
