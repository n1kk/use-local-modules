#!/usr/bin/env bash
if [ -d "$(pwd)/node_modules/.bin" ]; then
    echo "$(pwd)/node_modules/.bin >> PATH"
    export PATH="$PATH:$(pwd)/node_modules/.bin"
else
    echo "Could not find /node_modules/.bin/ relative to directory $(pwd)"
fi


