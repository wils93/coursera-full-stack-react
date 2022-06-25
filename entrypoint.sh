#!/bin/bash

if [ ! -d "node_modules" ]; then
    if [ -f "package-lock.json" ]; then
        npm install
    else
        yarn install
    fi
fi

echo "Happy Hacking!"

tail -f /dev/null