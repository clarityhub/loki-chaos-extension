#!/bin/bash

cd "$(dirname "$0")"
set -e

zip -r ../build/chrome.zip ../build
