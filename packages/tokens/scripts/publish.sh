#!/bin/bash

# remove the symlinks pointing to folders in `dist`
rm devdot
rm docs
rm products

# copy folders from dist to root for packing/publishing
cp -r ./dist/* .