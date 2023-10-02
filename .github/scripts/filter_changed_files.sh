#!/bin/bash
# Copyright (c) HashiCorp, Inc.
# SPDX-License-Identifier: MPL-2.0


set -euo pipefail

trigger_ci=false

# If we are on main we want to always run the tests
if [[ $GITHUB_REF_NAME == "main" ]]; then
	trigger_ci=true
	echo "On main, running CI: $trigger_ci"
	echo "trigger-ci=$trigger_ci" >>"$GITHUB_OUTPUT"
	exit 0
fi

# ensure something was passed in (this is not meant to be that robust)
if [ $# -eq 0 ]; then
	echo "No parameters, triggering CI: $trigger_ci"
	echo "trigger-ci=$trigger_ci" >>"$GITHUB_OUTPUT"
	exit 0
fi

# Using `git merge-base` ensures that we're always comparing against the correct branch point. 
#For example, given the commits:
#
# A---B---C---D---W---X---Y---Z # origin/main
#             \---E---F         # feature/branch
#
# ... `git merge-base origin/main` would return commit `D`
# `...HEAD` specifies from the common ancestor to the latest commit on the current branch (HEAD)..
files_to_check=$(git diff --name-only "$(git merge-base origin/main HEAD~)"...HEAD)

# Loop through the changed files and find directories/files that trigger need for tests
for file_to_check in $files_to_check; do
	file_is_included=false
	# $@ is the array that is passed in to the script
	for dir in "$@"; do
		if [[ $file_to_check == "$dir"* ]]; then
			file_is_included=true
			break
		fi
	done
	# if we get a match we can note that and exit without looping over other files
	if [ "$file_is_included" = "true" ]; then
		trigger_ci=true
		echo "Impacted files detected in $dir - triggered ci: $trigger_ci"
		echo "trigger-ci=$trigger_ci" >>"$GITHUB_OUTPUT"
		exit 0
	fi
done

echo "trigger-ci=$trigger_ci" >>"$GITHUB_OUTPUT"