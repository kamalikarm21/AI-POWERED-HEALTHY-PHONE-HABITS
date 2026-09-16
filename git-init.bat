@echo off
set GIT=C:\Users\user\PortableGit\bin\git.exe
%GIT% config --global user.email "focusai@deploy.local"
%GIT% config --global user.name "FocusAI Deploy"
%GIT% config --global init.defaultBranch main
%GIT% init
%GIT% add .
%GIT% commit -m "Deploy FocusAI – AI-Powered Healthy Phone Habits"
%GIT% status
echo INIT_DONE
