# WhatScheduler by **DreadedHippy**
![GitHub last commit](https://img.shields.io/github/last-commit/DreadedHippy/WhatScheduler_backend?color=%23ffbb00&logo=Github&logoColor=%23ffbb00&style=for-the-badge)

##### This is a simple NodeJS program to automate sending and replying to whatsapp messages using *node-cron*,*qrcode-terminal* and *whatsapp-web* NPM packages. I hope to implement scheduled job-postings using Puppeteer. Buckle up for that 😉

#### My motivation behind this project:
Over the long period of time I've been using whatsapp (3+ Years), there were moments when I forgot
to send messages such as birthday messages or messages requesting permission from someone and I thought: I've been coding since 2019, why don't I just *automate* it? Here we are 😅

#### How to Install and run:
*Disclaimer: This was made with Node.js v18.12.1*
- Clone the repository
- Run these commands in the terminal: `npm i` and then `npm run start`
- You're all set

#### Using the project:
When you authenticate for the first time, you are required to login by scanning the QR code using *Whatsapp* installed on your phone.
***Note*: This is the default configuration, you can check out more authentication methods with the *whatsapp-web.js* package at [Whatsapp-Web website]('https://wwebjs.dev/guide/')**

After the first authentication, a folder named '.wwebjs_auth' will be created in the pwd, which will store session information. Basically, you only have to login *once*.

By default, while the program is running, it sends the message `Hello, this is a scheduled message(position *int*)!` every 30 minutes. This was done using with the help of *node-cron* package,
**More information at [node-cron repo page]('https://github.com/node-cron/node-cron')**


#### Errors and solutions:
| Error | Possible cause | Solution |
|----|------|--------|
| Could not find expected browser (chrome) locally. Run `npm install` to download the correct Chromium revision (982053).| The program is unable to detect a browser usable by the puppeteer package dependency of whatsapp-web.js package| Run the command `node ./node_modules/whatsapp-web.js/node_modules/puppeteer/install.js`|

#### License:
MIT License

Copyright (c) 2022 Onotioese Izormen

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.