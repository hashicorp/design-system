#!/bin/bash

# now that we have published, remove the folders that were copied over from `dist`
rm -rf devdot
rm -rf docs
rm -rf products

# manually recreate the symlinks so it looks like the folders in `dist` exist at the root
ln -s dist/devdot devdot
ln -s dist/docs docs
ln -s dist/products products