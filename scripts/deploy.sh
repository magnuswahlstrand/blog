#!/bin/sh

# If a command fails then the deploy stops
set -e

printf "\033[0;32mDeploying updates to GitHub...\033[0m\n"

# Build the project.
npm run build

cp -R dist/* ../magnuswahlstrand.github.io/
cd ../magnuswahlstrand.github.io/

# Add changes to git.
git add .

# Commit changes.
msg="rebuilding site $(date)"
if [ -n "$*" ]; then
	msg="$*"
fi
git commit -m "$msg"

# Push source and build repos.
GIT_SSH_COMMAND='ssh -i ~/.ssh/id_rsa' git push
cd -
