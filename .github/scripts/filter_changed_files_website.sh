#!/bin/bash

trigger_ci=false

# If we are on main we want to always run the tests
if [[ $GITHUB_REF_NAME == "main" ]]; then
	trigger_ci=true
	echo "On main, running CI: $trigger_ci"
	echo "trigger-ci=$trigger_ci" >>"$GITHUB_OUTPUT"
	exit 0
fi

# Get the list of changed files
files_to_check=$(git diff --name-only origin/main)

# Define the directories to check
included_directories=("website" "packages/flight-icons/catalog.json")

# Loop through the changed files and find directories/files that trigger need for tests
for file_to_check in $files_to_check; do
	file_is_included=false
	for dir in "${included_directories[@]}"; do
		if [[ $file_to_check == "$dir"* ]]; then
			file_is_included=true
			break
		fi
	done
	# if we get a match we can note that and exit without looping over other files
	if [ "$file_is_included" = "true" ]; then
		trigger_ci=true
		echo "Website (or related) files changed - triggered ci: $trigger_ci"
		echo "trigger-ci=$trigger_ci" >>"$GITHUB_OUTPUT"
		exit 0
	fi
done

echo "trigger-ci=$trigger_ci" >>"$GITHUB_OUTPUT"