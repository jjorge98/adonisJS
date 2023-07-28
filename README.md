<p align='center'>
  <img src="adonislogo.svg" height='150'
</p>

## AdonisJS Simple API

<a href="https://adonisjs.com">AdonisJS</a> API. This project was a study of the framework and a back-end for an Angular project.

## Technologies

<p>- <a href="https://nodejs.org/en">Node.js</a></p>
<p>- <a href="https://adonisjs.com">AdonisJS</a></p>
<p>- <a href="https://www.sqlite.org/index.html">SQLite</a></p>

## How to run

### Clone project

In a terminal, paste the following command:

```
git clone https://github.com/jjorge98/adonisJS
```

### Install dependencies

Go to the folder installed

```
cd adonisJS
```

Install Node.js dependencies in the local node_modules folder

```
npm install
```

### Adjust .env

In your File Explorer, go to the project folder and duplicate .env.example and rename one of them to .env

In the terminal(still need to be in the project folder), paste the following command:

```
node ace generate:key
```

Open .env in a code editor (Notepad, Notepad++, VS Code) and replace APP_KEY with generated key

### Setup database

In the terminal, run the following command:

```
node ace migration:run
```

If the error "SQLITE_CANTOPEN: unable to open database file" appear, create folder "tmp" in the root of the project and run migration again. If you want to create the folder by terminal, in the project folder run

```
mkdir tmp
```

### Execute project

In the terminal, run the following command at the project folder:

```
node ace serve
```
