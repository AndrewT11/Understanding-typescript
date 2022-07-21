- Webpack Intro

`npm install --save-dev webpack webpack-cli webpack-dev-server typescript ts-loader`

The problem we have with our current setup is we have a bunch of HTTP requests. (app.js, project-input.js, project-list.js)
All the files are relatively small, but there are a lot of requests.

What's the problem?
Look at the waterfall on the right of the network tab. Every HTTP request that needs to be made takes time. Download file, base overhead duration that it must take. The white box in front of graphs is the time it takes for browser to setup request and send it.

- downloading may be relatively fast, setting up request, doing the server work that serves the file, that takes time.
- deploying a website with many requests will introduce latency and slow down project because of the HTTP requests made
- we need to reduce those requests

What is webpack?

- a tool that will help bundle files together.
- build orchestration tool. Reduces HTTP request by bundling code.
- write code, split up across multiple files, webpack takes those files and bundles them
- can optimize code and add more build steps/tools (help with CSS files and so on)

A "normal" setup

- multiple .ts files & imports (http requests)
- Unoptimized code (not as small as possible)
- "External" development server needed

Webpack

- Code bundles, less import required
- optimized (minified) code, less code to download
- more build steps can be added easily
