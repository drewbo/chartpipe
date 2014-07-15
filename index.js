#!/usr/bin/env node

var fs = require('fs'),
    GitHubApi = require('github'),
    github = new GitHubApi({
        version: '3.0.0',
        protocol: 'https'
    }),
    rw = require('rw'),
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
    console.log('usage: chartpipe file.csv');
    console.log('usage: chartpipe --type=groupedbars file.csv');
    console.log('usage: chartpipe --type=histogram file.csv');
    console.log('usage: chartpipe --type=linechart file.csv')
    console.log('available charts: ' + typenames);
    return;
}

var type = argv.type || 'groupedbars';

if (charts.indexOf(type + '.html') === -1) {
    throw new Error('chart type ' + type + ' not found, choices: ' + typenames);
}

var input = argv._.length ?
    fs.readFileSync(argv._[0], 'utf8') :
    rw.readFileSync('/dev/stdin', 'utf8');

var indexhtml = fs.readFileSync(__dirname + '/templates/' + type + '.html', 'utf8');

github.gists.create({
    description: '/dev/chartpipe',
    public: true,
    files: {
        'data.csv': { content: input },
        'index.html': { content: indexhtml }
    }
}, function (err, res) {
    if (err) {
        console.error('Unable to create Gist:' + JSON.stringify(res));
    } else {
        open('http://bl.ocks.org/' + res.id);
    }
});
