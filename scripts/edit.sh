#!/bin/zsh

value=$1
if [ -z "$value" ]; then
	value=1
fi
editor=vim
$editor ../source/_posts/*(.om[$value])
