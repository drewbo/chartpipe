#!/usr/bin/env node

var concat = require('concat-stream'),
    fs = require('fs'),
    GitHubApi = require('github'),
    github = new GitHubApi({
        version: '3.0.0',
        protocol: 'https'
    }),
    open = require('open');

console.log('Waiting for input...');

process.stdin.pipe(concat(function(data) {
    github.gists.create({
        description: '/dev/chartpipe',
        public: true,
        files: {
            'data.csv': {
                content: data.toString()
            },
            'index.html': {
                content: fs.readFileSync(__dirname + '/templates/groupedbars.html', 'utf8')
            }
        }
    }, function (err, res) {
        if (err) {
            console.error('Unable to create Gist:' + JSON.stringify(res));
        } else {
            open('https://bl.ocks.org/d/' + res.id);
        }
    });
}));
