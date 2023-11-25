# Simple Guestbook Application

This project provides a simple guestbook using json for storing guestbook entries.

## Setting up the guestbook
1. If not installed, install JSON server with command: npm install -g json-server
2. Start the server: json-server --watch entrydb.json --port 3004
3. Run the guestbook application: npm start

## Setting up using Docker
1. Build the docker image: docker image build -t react-guestbook-image:latest .
2. Run the image: docker run  -p 3000:3000 -p 3004:3004 react-guestbook-image

## TODO
* Tests
* More detailed instructions for setting up
