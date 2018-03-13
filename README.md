### What
This is a simple npm CLI tool to quickly add local `./node_modules/.bin` to environment PATH variable for **current session only**. 

This package installs 3 scripts to your npm's global packages directory that it gets by running `npm bin -g`. Scripts are made for Windows CMD / PowerShell (`usemodules.cmd` / `usemodules.ps1`) and unix Bash (`usemodules.sh`). Each script checks whether local `./node_modules/.bin` exists and then adds it to the current sessions PATH variable. The change is __not__ persistent and will be valid for _current session only_.

In windows while calling `usemodules` in CMD it will prioritize `.cmd` files while PowerShell will opt fpr `.ps1` files. For unix systems `.sh` script is installed without extension so it would be available by just it's name.

Tested in Windows 10 Pro, Windows Linux Subsystem (Ubuntu flavor), Ubuntu 16.04, OSX High Sierra 10.13.3

### Why
Having to work with many small projects I often had a need to test out npm script commands, so the choice was either to add `./node_modules/.bin/` before each executable or create a npm script and call `npm run ***`, both of these solutions got a bit cumbersome so I made this little package to make my life easier.

### Usage
In Windows CMD/PowerShell just call `usemodules`, in OSX/Linux Bash you have to execute it in __current scope__: `. usemodules`, calling `source usemodules` will also work, but it's obviously longer to type.

CMD
```
Microsoft Windows [Version 10.0.16299.192]
(c) 2017 Microsoft Corporation. All rights reserved.

C:\Dev\MyProject>usemodules
C:\Dev\MyProject\node_modules\.bin >> PATH

C:\Dev\MyProject>
```

PowerShell
```
Windows PowerShell
Copyright (C) Microsoft Corporation. All rights reserved.

PS C:\Dev\MyProject> which gulp
which : The term 'which' is not recognized as the name of a cmdlet, function, script file, or operable program. Check
the spelling of the name, or if a path was included, verify that the path is correct and try again.
At line:1 char:1
+ which gulp
+ ~~~~~
    + CategoryInfo          : ObjectNotFound: (which:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

PS C:\Dev\MyProject> usemodules
C:\Dev\MyProject\node_modules\.bin >> PATH
PS C:\Dev\MyProject> which gulp
C:\Dev\MyProject\node_modules\.bin\gulp.CMD
PS C:\Dev\MyProject>
```

OSX/Linux 
```
Last login: Mon Mar 12 15:30:06 on ttys002

user@WORKSTATION:~/dev/MyProject$ istanbul
istanbul: command not found
user@WORKSTATION:~/dev/MyProject$ . usemodules
~/dev/MyProject/node_modules/.bin >> PATH
user@WORKSTATION:~/dev/MyProject$ istanbul
Need a command to run
Try "istanbul help" for usage
user@WORKSTATION:~/dev/MyProject$
```