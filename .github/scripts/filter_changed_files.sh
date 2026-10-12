#!/bin/bash
# Copyright IBM Corp. 2021, 2026
# SPDX-License-Identifier: MPL-2.0


set -euo pipefail

trigger_ci=false

# Paths that affect the whole workspace (toolchain/dependency configuration,
# lockfiles, patches, and this script itself). A change to any of these should
# trigger every workflow that calls this script, without each workflow having
# to repeat them in its own argument list.
global_trigger_paths=(
	"package.json"
	"pnpm-lock.yaml"
	"pnpm-workspace.yaml"
	".npmrc"
	".nvmrc"
	".tool-versions"
	"patches"
	".github/scripts/filter_changed_files.sh"
)

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

# combine the workflow-specific paths (passed in as arguments) with the
# global trigger paths defined above
trigger_paths=("$@" "${global_trigger_paths[@]}")

# Using `git merge-base` ensures that we're always comparing against the correct branch point.
# For example, given the commits:
#
# A---B---C---D---W---X---Y---Z # origin/main
#             \---E---F         # feature/branch
#
# ... `git merge-base origin/main HEAD` would return commit `D`
files_to_check=$(git diff --name-only "$(git merge-base origin/main HEAD)"...HEAD)

# Loop through the changed files and find directories/files that trigger need for tests
for file_to_check in $files_to_check; do
	file_is_included=false
	# check each trigger path for a match against the changed file
	for path in "${trigger_paths[@]}"; do
		# strip any trailing slash so callers can pass directories as either
		# "packages/components" or "packages/components/"
		path="${path%/}"
		# match either the exact file/path, or the path as a directory
		# (i.e. followed by a "/"), so "packages/tokens" does not
		# accidentally match "packages/tokens-old"
		if [[ $file_to_check == "$path" || $file_to_check == "$path/"* ]]; then
			file_is_included=true
			break
		fi
	done
	# if we get a match we can note that and exit without looping over other files
	if [ "$file_is_included" = "true" ]; then
		trigger_ci=true
		echo "Impacted file detected: $file_to_check (matched $path) - triggered ci: $trigger_ci"
		echo "trigger-ci=$trigger_ci" >>"$GITHUB_OUTPUT"
		exit 0
	fi
done

echo "trigger-ci=$trigger_ci" >>"$GITHUB_OUTPUT"
