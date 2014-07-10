#!/usr/bin/env node

var concat = require('concat-stream'),
    fs = require('fs'),
    GitHubApi = require('github'),
    github = new GitHubApi({
        version: '3.0.0',
        protocol: 'https'
    }),
    argv = require('minimist')(process.argv.slice(2), {
        boolean: 'help'
    }),
    open = require('open');

var charts = fs.readdirSync(__dirname + '/templates/');
var typenames = charts.map(function(c) {
    return c.replace(/\.html$/, '');
}).join(',');

if (argv.help) {
    console.log('usage: chartpipe < data');
    console.log('usage: process | chartpipe');
    console.log('available charts: ' + typenames);
}

var type = argv.type || 'groupedbars';

if (charts.indexOf(type + '.html') === -1) {
    throw new Error('chart type ' + type + ' not found, choices: ' + typenames);
}

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
                content: fs.readFileSync(__dirname + '/templates/' + type + '.html', 'utf8')
            }
        }
    }, function (err, res) {
        if (err) {
            console.error('Unable to create Gist:' + JSON.stringify(res));
        } else {
            open('http://bl.ocks.org/' + res.id);
        }
    });
}));
