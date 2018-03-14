### What
This is a simple npm CLI tool to quickly add local `./node_modules/.bin` to environment PATH variable for **current session only**. 

This package installs 3 scripts to your npm's global packages directory that it gets by running `npm bin -g`. Scripts are made for Windows CMD / PowerShell (`usemodules.cmd` / `usemodules.ps1`) and unix Bash (`usemodules.sh`). Each script checks whether local `./node_modules/.bin` exists and then adds it to the current sessions PATH variable. The change is __not__ persistent and will be valid for _current session only_.

In windows while calling `usemodules` in CMD it will prioritize `.cmd` files while PowerShell will opt for `.ps1` files. For unix systems `.sh` script is installed without extension so it would be available by just it's name.

Tested with Nodejs v4.0.0 and NPM v2.14.2 in Windows 10 Pro, Windows Linux Subsystem (Ubuntu flavor), Ubuntu 16.04, OSX High Sierra 10.13.3. 

### Why
I know there's npx and yarn, but I needed something that worked with old node v4 and didn't conflict with npm scripts and wouldn't install packages if they were missing. I just needed a quick env setup to play with commands and then paste them into npm scripts.

### Usage
Windows CMD/PowerShell
```text
usemodules
```
OSX/Linux Bash
```text
. usemodules
```
You have to execute it in __current scope__: `. usemodules`, calling `source usemodules` will also work, but it's obviously longer to type.

##### -g argument
```text
-g : Prioritize global
```

Default behaviour is to prepend directory to global PATH to look there before global bin folder, passing `-g` argument will append directory to global PATH instead, this will prioritize global packages over local.

Output of the command will show you whether ir prepended or appended:
```text
user@WORKSTATION:~/dev/MyProject$ . usemodules
~/dev/MyProject/node_modules/.bin : >PATH

user@WORKSTATION:~/dev/MyProject$ . usemodules -g
~/dev/MyProject/node_modules/.bin : PATH<
```


###### Examples

CMD
```text
Microsoft Windows [Version 10.0.16299.192]
(c) 2017 Microsoft Corporation. All rights reserved.

C:\Dev\MyProject>gulp -v
'gulp' is not recognized as an internal or external command,
operable program or batch file.

C:\Dev\MyProject>usemodules
C:\Dev\MyProject\node_modules\.bin : >PATH

C:\Dev\MyProject>gulp -v
[14:25:32] CLI version 2.0.1
[14:25:32] Local version 4.0.0-alpha.3
```

PowerShell
```text
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
C:\Dev\MyProject\node_modules\.bin : >PATH
PS C:\Dev\MyProject> which gulp
C:\Dev\MyProject\node_modules\.bin\gulp.CMD
```

OSX/Linux 
```text
Last login: Mon Mar 12 15:30:06 on ttys002

user@WORKSTATION:~/dev/MyProject$ istanbul
istanbul: command not found
user@WORKSTATION:~/dev/MyProject$ . usemodules
~/dev/MyProject/node_modules/.bin : >PATH
user@WORKSTATION:~/dev/MyProject$ istanbul
Need a command to run
Try "istanbul help" for usage   
```