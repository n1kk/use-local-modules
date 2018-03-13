@echo off
IF EXIST "%cd%\node_modules\.bin\" ( GOTO :setpath ) ELSE ( GOTO :notfound )
echo Something went horribly wrong, if/else didn't work. Are we in a parallel universe?
goto :eof

:setpath
set PATH=%PATH%;%cd%\node_modules\.bin
echo %cd%\node_modules\.bin ^>^> PATH
goto :eof

:notfound
echo Could not find \node_modules\.bin\ relative to directory %cd%
goto :eof

