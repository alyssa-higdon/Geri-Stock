# Geri-Stock

## Instructions
1) git clone https://github.com/alyssa-higdon/Geri-Stock
2) npm install

## To run
1) go into the Backend folder
2) run ```npm run dev```

3) go into the frontend folder
4) run ```npm start```


## Prettier ESLint Installation
1) In VS Code, add the extention Prettier ESLint
2) In terminal, go to your root directory and run ```npm install eslint-config-prettier eslint-plugin-prettier prettier --save-dev```
3) To ensure that one only pushes lint free code to git hub:
     - from your root directory, go to ```.git/hooks/pre-commit```.sample
     - replace the contents of the file with the contents of ```pre-commit.txt``` in the root of this gitHub
     - rename ```pre-commit.sample``` to ```pre-commit```

## Style Guides
1) ESLint and Prettier
2) lowerCamelCase
3) Same-line curly braces
4) Double quotes
