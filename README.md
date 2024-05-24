# Showgify.js

### Table of Contents
1. [Description](#description)
2. [Setup Guide](#setup-guide)
    - [OS Instructions](#os-instructions)
    - [Running the Server](#running-the-server)
    - [Setting a URL](#setting-a-url)
3. [Weaknesses](#weaknesses)
4. [Next Steps](#next-steps)


## Description
Welcome to Showgify, a side project with the purpose of building a nicer home-space for developers around the world! The main goal of this project is make people able to use any old computer and convert it into a GIF display! This is like having a painting at home but in 2049. So, you know the drill, if you lookin' lonely, we can fix that!

<p align="center">
  <img src="docs/media/you_look_lonely.gif" alt="I can fix that"/>
</p>

How can this be easily achieved? Well, most people have a rusty old computer that they have no use for. Whereas this being a lightweight project with low requirements, having an HDMI display and a computer able to install `Node.js`and a general purpose browser to open up an `index.html` file will be enough to run the project. The idea is to need less hardware in the future. It's not difficult to think that using a full-size computer to show a GIF is much of an *overkill*.

Why did I start with this side-project? Some days ago (today being may 23) I visited my best friend's place. He'd introduced some power-ups in his set-up and told me that the next implementation he wanted to go for was a display for GIFs for his room. He obtained an old windows computer, but didn't know how to smoothly *showgify*. I considered this a great idea, so I thought on doing a tool to *showgify* in the easiest way possible, while learning some technologic features at the same time.

If you're reading this, I hope you like this side project and feel free to contribute yourlself! The main codebase was made within a day's work, so I'm well-aware that it could use some improvements, whether it's in code practices, architecture design or hardware and software setup!

## Setup Guide

First off, you must clone this repo
~~~
git clone https://github.com/nfragav/showgify.js.git
~~~

### OS Instructions

For your preferred OS, your just have to install node.js following [this guide](https://nodejs.org/en/download/package-manager).

### Running the Server

You just move to the `server/` folder at this repo

~~~
cd server
~~~

and then, you run the server

~~~
node index.js
~~~

As quick as that, you'll be serving the API in port `3000`.

Then, you open the `display/index.html` file. You'll be displaying the GIFs. The project comes with some GIF file examples, but you can add new ones at `display/gifs/`.

### Setting a URL

To lift in an easy way a URL, you can use Visual Studio Code's port forwarding feature for local services. You just [install Visual Studio Code](https://code.visualstudio.com/download) and follow [this guide](https://code.visualstudio.com/docs/editor/port-forwarding). Take into account that the `npx serve` command being used is the same as running this project's server.

All you need to *showgify* is installing into your computer `Node v22.0` and have a general purpose browser to manually show the `index.html` file at the `display/` folder. Also, if you're keen on controlling the display through a browser, installing `VSCode` will surely do it. Whereas, the instructions are the following, for each OS:

## Features and [API documentation](docs/api_documentation.md)

Given that for the moment this is a little project, the API documentation will be shown in [a file in this same repository](docs/api_documentation.md).

For the moment, this project consists in a single-direction slider of GIFs via an HTML file. The project includes a server that provides an API the following urls: `/next`, `/current`. With these functions, you can get the name of the current GIF file being displayed and command the server to slide to the next GIF, changing the file displayed at `display/index.html`.

## Weaknesses

The weaknesses that could be tackled to make this project better are the following:
- Needs a browser to open `display/index.html` file. It could possibly be solver by installing a low-demanding browser or adding a visual feature via `node`. Any solution must be reached without using `npm` or any package manager of node.
- Project could be achieved with less hardware than a computer.
- Security issues regarding URL haven't been addressed.
- It requires managing a URL, which can complicate things. Other technologies such as Bluetooth could achieve the same purpose.

## Next Steps
- Find a cheap board compatible with a decent size display to make the setup of the project.
- Create a `/previous` method to slide to the previous GIF of the list, at `display/gifs/` folder.