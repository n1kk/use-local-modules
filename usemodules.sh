#!/usr/bin/env bash
if [ -d "$(pwd)/node_modules/.bin" ]; then
    if [ "$1" == "-g" ]; then
        export PATH="$PATH:$(pwd)/node_modules/.bin"
        echo "$(pwd)/node_modules/.bin : PATH<"
    else
        export PATH="$(pwd)/node_modules/.bin:$PATH"
        echo "$(pwd)/node_modules/.bin : >PATH"
    fi
else
    echo "Could not find /node_modules/.bin/ relative to directory $(pwd)"
fi


