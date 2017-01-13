``` 
 __          __  _    _____ _____  ______   _____                                          _     
 \ \        / / | |  |_   _|  __ \|  ____| / ____|                                        | |    
  \ \  /\  / /__| |__  | | | |  | | |__   | |     ___  _ __ ___  _ __ ___   __ _ _ __   __| |___ 
   \ \/  \/ / _ \ '_ \ | | | |  | |  __|  | |    / _ \| '_ ` _ \| '_ ` _ \ / _` | '_ \ / _` / __|
    \  /\  /  __/ |_) || |_| |__| | |____ | |___| (_) | | | | | | | | | | | (_| | | | | (_| \__ \
     \/  \/ \___|_.__/_____|_____/|______(_)_____\___/|_| |_| |_|_| |_| |_|\__,_|_| |_|\__,_|___/                                                                                                                                                                                                                                                                                                                                                                  
```                                                                                                                                                 

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/jsrun/core.system.settings/master/LICENSE)

WebIDE command and shortcut management module, following the Cloud 9 standard
 
## Usage

```js
webide.commands.addCommand({
    name: "copy",
    bind: {mac: "Command-C", win: "Ctrl-C"},
    event: "webide.tabs.foced().copy()",
});

webide.navbar.addItem("Edit/Copy", {
    command: "copy",
    divide: true
}, 200);

webide.commands.addCommand({
    name: "save",
    bind: {mac: "Command-S", win: "Ctrl-S"},
    route: {method: "PUT", pattern: "/save", middleware: [multipart()]},
    exec: (req, res) => {
        webide.file.save(req, res);
    }
});
```

## License

  MIT
  
  Copyright (C) 2016 André Ferreira

  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.