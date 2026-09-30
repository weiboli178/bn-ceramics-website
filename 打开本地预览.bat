@echo off
setlocal
cd /d "%~dp0"
set "PATH=C:\Users\YS\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin;%PATH%"
call node_modules\.bin\vite.cmd --host 127.0.0.1 --port 4173 --open
