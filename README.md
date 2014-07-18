# chartpipe

Does what it says on the tin.

![Imgur](http://i.imgur.com/ElpdZco.gif)

Current expectation is a a grouped bar chart: rows are groups, columns are attributes, first column is labels.

Other data layouts and chart types are welcome: please contribute!

## install

    npm install -g chartpipe

## usage

```sh
$ commandthatoutputscsv | chartpipe
```

## examples

* [histogram type](http://bl.ocks.org/anonymous/90e80fd9fcb804ce2469)
* [grouped bars type](http://bl.ocks.org/anonymous/2fa1e2f1907471fdb49b)
* [line chart](http://bl.ocks.org/anonymous/21c511a8646eac688e27)

## arguments

```
--help: show help
--type=groupedbars
--type=histogram
--type=line
```
