# Geri-Stock

## Instructions
1) git clone https://github.com/alyssa-higdon/Geri-Stock
2) If you don't already have npm, install npm at this website ```https://nodejs.org/en/download/```
3) ```npm install```
4) ```npm install crypto-js```
4) ```npm install jest```
5) ```npm config set legacy-peer-deps true```
6)  ```npm install```

## To run
1) Go into the Backend folder
2) Run ```npm run dev```

3) Go into the frontend folder
4) Run ```npm start```


## Prettier ESLint Installation
1) In VS Code, add the extention Prettier ESLint
2) In terminal, go to your root directory and run ```npm install eslint-config-prettier eslint-plugin-prettier prettier --save-dev```
3) To ensure that one only pushes lint free code to git hub:
     - From your root directory, go to ```.git/hooks/pre-commit```.sample
     - Replace the contents of the file with the contents of ```pre-commit.txt``` in the root of this GitHub
     - Rename ```pre-commit.sample``` to ```pre-commit```
4) To run eslint, run ```npm run lint``` in terminal

## Style Guides
1) ESLint and Prettier
2) lowerCamelCase
3) Same-line curly braces
4) Double quotes
