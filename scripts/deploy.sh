#!/bin/bash

cd ..
rake generate
rake push_source
rake deploy
