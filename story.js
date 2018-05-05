#!/usr/local/bin/node

// config
const storyName = process.argv[2];
const story = require(`./${storyName}`);

console.log(story);
