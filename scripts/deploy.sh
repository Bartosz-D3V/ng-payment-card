#!/usr/bin/env bash

GIT_DEPLOY_REPO=${GIT_DEPLOY_REPO:-$(node -p -e "require('./package.json').repository.url")}

cd documentation

rm -f .git
git init

git config user.name "Travis CI"
git config user.email "github@travis-ci.org"

git add . --force
git commit -m "Deploy to GitHub Pages"

git push --force "https://${GH_REF}" master:gh-pages
