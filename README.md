[![build status](https://secure.travis-ci.org/apeace/burst.png)](http://travis-ci.org/apeace/burst)
# Burst

Simple command-line file sharing for developers on the same network.

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

Next time around, there is no need to use `burst into`, because it's saved
in a config file.

````bash
$ burst to cam ./important_file.txt
````

## Setup

You need a Redis server to use Burst. IPs are exchanged through pub-sub and
files are sent via sockets. No other configuration is necessary&mdash;just a
vanilla Redis server.

If you don't have a Redis server in the office already, you're probably not
cool enough to use burst.

## Commands

````bash
# connect to given redis server
burst into 10.0.0.123:6379

# transfer files on the given port
burst on 4567

# let the OS find an open port to transfer on
burst on random

# accept files sent to the given name
burst as andrew

# send a file to the given name
burst to andrew ./path/to/file
````

## Magic Ponies

Let me tell you a story.

Once upon a time, the boss said he was going to send an important file
to everyone in the office. Gregg and Nancy wanted to see the file. So Gregg
hopped on his Macbook Air and Nancy grabbed her Ubuntu netbook, and they
both fired up the terminal:

````bash
$ burst as everyone

````

Gregg quickly pounded into iTerm. Nancy did the same in her GNOME-Terminal:

````bash
$ burst as everyone

````

And they waited.

The clock struck 2:15 and, right on queue, the boss returned from his lunch
break. He wrote into his own terminal:

````bash
$ burst to everyone /var/www/pony_identities.sql
````

And like pony magic, our heros' terminals came to life! They began to
download the important file:

````bash
$ burst as everyone
[===>      ] 0.2/1.9mb (10%) pony_identities.sql
````

As soon as the progress bar showed 100%, Gregg and Nancy `^C`ed and
began using their favorite command-line tools to parse their new files.

Meanwhile, the boss was waiting for the rest of the office to get the file:

````bash
$ burst to everyone /var/www/pony_identities.sql
[====>     ] 3/10 (30%)
````

When *his* progress bar showed 100%, *he `^C`ed too*, and went back
to his important work.

So you see, there really was no moon landing.

## License

Copyright (c) 2011 Andrew Peace

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

