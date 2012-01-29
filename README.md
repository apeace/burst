# Burst

Simple command-line file sharing for developers sharing the same network.

## Install

````bash
$ npm install burst -g
````

## Example

Andrew wants to send Cam a file. He connects to the office's Redis server
and bursts the file to Cam:

````bash
$ burst into 10.0.0.123:6379
$ burst to cam ./funny_picture.jpg
````

Cam wants to receive the file, so he connects to Redis and accepts:

````bash
$ burst into 10.0.0.123:6379
$ burst as cam
[===========>] 1.0/1.0mb (100%) funny_picture.jpg
^C
```

## Setup

You need a Redis server to use Burst. IPs are exchanged through pub-sub and
files are sent via sockets. No other configuration is necessary--just a
vanilla Redis server.

If you don't have a Redis server in the office already, you're probably not
cool enough to use burst.

## Commands

````bash
# connect to given redis server
burst into 10.0.0.123:6379

# transfer files on the given port
burst on 4567

# accept files sent to the given name
burst as andrew

# send a file to the given name
bust to andrew ./path/to/file
````

