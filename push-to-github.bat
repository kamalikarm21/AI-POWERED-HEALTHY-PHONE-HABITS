@echo off
REM push-to-github.bat — Run this once with your GitHub token
REM Usage: push-to-github.bat ghp_YOUR_TOKEN_HERE

set TOKEN=%1
set GIT=C:\Users\user\PortableGit\bin\git.exe

if "%TOKEN%"=="" (
  echo ERROR: Provide your GitHub token as argument
  echo Usage: push-to-github.bat ghp_YOUR_TOKEN_HERE
  exit /b 1
)

echo.
echo Pushing FocusAI to GitHub...
echo.

%GIT% config --global user.email "focusai@deploy.local"
%GIT% config --global user.name "FocusAI"
%GIT% config --global init.defaultBranch main

REM Init repo
%GIT% init
%GIT% remote remove origin 2>nul
%GIT% remote add origin https://kamalikarm21:%TOKEN%@github.com/kamalikarm21/AI-POWERED-HEALTHY-PHONE-HABITS.git

REM Stage everything except node_modules and dist
echo .env > .gitignore_temp
%GIT% add package.json index.html vite.config.js tailwind.config.js postcss.config.js netlify.toml vercel.json
%GIT% add src/ public/ README.md 2>nul
del .gitignore_temp

%GIT% commit -m "Deploy FocusAI – AI-Powered Healthy Phone Habits"

REM Force push to main
%GIT% push -f origin main

echo.
echo Source code pushed to main branch!
echo.

REM Now push dist to gh-pages
%GIT% checkout --orphan gh-pages
%GIT% rm -rf . 2>nul
xcopy dist\* . /E /Y /Q
%GIT% add .
%GIT% commit -m "Deploy built site to GitHub Pages"
%GIT% push -f origin gh-pages

echo.
echo ============================================================
echo DONE! Live URL: https://kamalikarm21.github.io/AI-POWERED-HEALTHY-PHONE-HABITS/
echo ============================================================
echo.

REM Go back to main
%GIT% checkout main
