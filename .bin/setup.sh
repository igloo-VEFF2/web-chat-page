#!/bin/bash
# Made by Hreidar Olafur Arnarsson
# Sets up the environment by installing (and downloading) necessary components

# Exit script on error
set -e

# Installing npm for server
echo Installing npm on server...
(cd server; npm install --silent)

# Installing npm for client
echo Installing npm on client...
(cd client; npm install --silent)

echo Installation success!
