
small-project-boilerplate
=========================

(Complete) The basic scaffolding for any simple web project that uses es6, typescript, scss, and gulp

* * *

First Steps
-----------

1.  Navigate to the root folder where you want your project to reside.
    
2.  Run `git clone https://github.com/WilliamRADFunk/small-project-boilerplate.git`
    
3.  Run `npm install`. If failure, see Common Gotchas section below.
    
4.  Change the name `small-project-boilerplate` to the name of your choice in the `package.json` file (multiple locations in this file), the title in the `index.html` file, the `gulpfile.babel.js` file, and the `README.md` file.
    

* * *

Classes
-------

Detailed [documentation](docs/README.md)

* * *

Available Command Line Options
------------------------------

`npm run build` will build your project, depositing all finished files in the created `dist/` folder.  
  

`npm run start` will build the application, and launch it in the browser. Simply navigate to `http://localhost:8080`.  
  

`npm run lint` will search the scss and typescript files for common style issues and alert you of any it finds.  
  

`npm run readme` will update the docs folder with all off the typedoc-friendly commenting you've made in you typescript files.  
  

`npm run test` won't work. It isn't implemented yet.  
  

New to Gulp
-----------

\-\- Make sure to install Gulp at the global level, as this is a necessary step to make the boilerplate's scripts run.  
  

`npm install -g gulp`

* * *

Common Gotchas
--------------

--Might get a failure to fully install when running `npm install`  
  

Try running `npm install --ignore-scripts`  
  

\-\- Might get the error  
"Error: ENOENT: no such file or directory, scandir 'your-path/small-project-boilerplate\\node_modules\\node-sass\\vendor'"  
  

To remedy this, simply run `npm rebuild node-sass`  
  

\-\- If you're running the `npm run readme` command, and your classes are not all present.  
  

Make sure you aren't importing a capitalized version of the name (ie. `import { Doug } from './Doug'` when it should in fact be `import { Doug } from './doug'`) assuming of course you've name the file with standard camelCase.

## Index

### External modules

* ["index"](modules/_index_.md)
* ["ts/example"](modules/_ts_example_.md)
* ["ts/init"](modules/_ts_init_.md)

---

