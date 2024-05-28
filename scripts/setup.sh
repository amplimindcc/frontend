#!/bin/bash

# Get the path to the .git folder
GIT_DIR=$(git rev-parse --git-dir)

# Define the .gitexclude file path
GIT_EXCLUDE_FILE="$GIT_DIR/info/exclude"

# Add CSS files to the .gitexclude file
echo "*.css" >> "$GIT_EXCLUDE_FILE"

echo "Local .gitexclude file has been updated to exclude CSS files."
