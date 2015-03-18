#!/usr/bin/env node

var fs = require('fs'),
    GitHubApi = require('github'),
    github = new GitHubApi({
        version: '3.0.0',
        protocol: 'https'
    }),
    dsv = require('dsv'),
    rw = require('rw'),
    argv = require('minimist')(process.argv.slice(2), {
        boolean: ['help', 'print-url']
    }),
    open = require('open');

var charts = fs.readdirSync(__dirname + '/templates/');
var typenames = charts.map(function(c) {
    return c.replace(/\.html$/, '');
}).join(',');

if (argv.help) {
<<<<<<< HEAD
    console.log('usage: chartpipe < data');
    console.log('usage: process | chartpipe');
    console.log('usage: chartpipe file.csv');
    console.log('usage: chartpipe --type=groupedbars file.csv');
    console.log('usage: chartpipe --type=histogram file.csv');
    console.log('usage: chartpipe --type=linechart file.csv')
    console.log('usage: chartpipe --type=stackedbars file.csv')
=======
    console.log('input:');
    console.log('  chartpipe < data');
    console.log('  process | chartpipe');
    console.log('  chartpipe file.csv');
    console.log('');
    console.log('arguments:');
    console.log('  --type=CHARTTYPE');
    console.log('  --format=INPUTFORMAT');
    console.log('  --print-url (instead of opening)');
    console.log('');
    console.log('examples:');
    console.log('  chartpipe --type=groupedbars file.csv');
    console.log('  chartpipe --type=histogram file.csv');
    console.log('  chartpipe --type=line --print-url file.csv')
    console.log('  chartpipe --format=tsv file.tsv')
    console.log('');
>>>>>>> 86c817dcca71b49e1994395d13052c169c31b2b5
    console.log('available charts: ' + typenames);
    console.log('input formats: csv, tsv (default: csv)');
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

if (argv.format === 'tsv') input = dsv.csv.format(dsv.tsv.parse(input));

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
        var url = 'http://bl.ocks.org/' + res.id;
        if (argv['print-url']) {
            console.log(url);
        } else {
            open(url);
        }
    }
});
