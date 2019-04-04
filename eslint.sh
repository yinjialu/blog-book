#!/bin/bash

file=`git diff-index --cached HEAD --name-only --diff-filter ACMR | grep -v mockData | grep -v dep | egrep '(.js|.vue|.jsx)$'`

echo "$file"

if [ "$file" ];then
    ./node_modules/eslint/bin/eslint.js $file
else
    echo 'there is no js files to eslint check!'
fi
