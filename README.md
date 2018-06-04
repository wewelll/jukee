# Jukee

[![Greenkeeper badge](https://badges.greenkeeper.io/samuelbriole/jukee.svg)](https://greenkeeper.io/)

This is a basic setup for an React(16) + Phoenix(1.3)/Elixir(1.5) project, using webpack(3) and users with authentication.

## INSTALL PROJECT

```
mix deps.get
mix deps.compile
mix ecto.create
mix ecto.migrate
cd assets
yarn install
cd ..
```

## STARTING PROJECT WITH PIERRE

Start at the root of the project.

First install elixir (subset of erlang for web) and phoenix (framework for elixir)

```
brew update
brew install elixir
mix archive.install https://github.com/phoenixframework/archives/raw/master/phx_new.ez (installing phoenix)
```

Then compile the project
```
mix deps.get
mix deps.compile
```

Add frontend dependencies
```
cd assets
yarn install
cd ..
```

Get docker compose and set up the db by running : 
```
docker-compose up
```

Finally, you can start the project
```
mix ecto.create
mix ecto.migrate
mix phx.server
```

## STARTING PROJECT WITH SAMUEL

### Start the database
```
docker-compose up
```

#### Start server
```
mix phx.server
```

## SUPERUSER
After running `mix ecto.migrate` command you will have superuser:
```
username: amdin
password: 12345678
```

## SETUP
#### Redux logger
If you want to turn redux logger on just assign `true` to useReduxLogger in app/store/index.js
```javascript
...
const useReduxLogger = true;
...
```

## DEPLOYING TO HEROKU
[You should have installed heroku-cli](https://devcenter.heroku.com/articles/heroku-cli)

#### Create heroku application
```
heroku create --buildpack "https://github.com/HashNuke/heroku-buildpack-elixir.git"
```

#### Optional change app address 
```
heroku apps:rename appname
```

#### Adding phoenix buildpack
```
heroku buildpacks:add https://github.com/chernyshof/heroku-buildpack-phoenix-static.git
```

#### Add you address
in `config/prod.exs`
change in config, :appname, Appname.Repo, url line(if needed)
```elixir
url: [scheme: "https", host: "appnameaddress.herokuapp.com", port: 443],
```

#### Creating Environment Variables
```
heroku addons:create heroku-postgresql:hobby-dev
heroku config:set POOL_SIZE=18
```

#### Secret key
gen secret key
```
$ mix phx.gen.secret
xvafzY4y01jYuzLm3ecJqo008dVnU3CN4f+MamNd1Zue4pXvfvUjbiXT8akaIF53
```
##### now set key that you got in heroku
```
heroku config:set SECRET_KEY_BASE="xvafzY4y01jYuzLm3ecJqo008dVnU3CN4f+MamNd1Zue4pXvfvUjbiXT8akaIF53"
```

#### Guardian secret key
```
$ mix phx.gen.secret
xvafzY4y01jYuzLm3ecJqo008dVnU3CN4f+MamNd1Zue4pXvfvUjbiXT8akaIF53
```
##### now set key that you got in heroku
```
heroku config:set GUARDIAN_SECRET_KEY="xvafzY4y01jYuzLm3ecJqo008dVnU3CN4f+MamNd1Zue4pXvfvUjbiXT8akaIF53"
```

#### Deploy time!
```
git push heroku master
heroku run "POOL_SIZE=2 mix ecto.migrate"
```


## REQUIREMENTS
- [Elixir](http://elixir-lang.org/)/[Mix](http://elixir-lang.org/getting-started/mix-otp/introduction-to-mix.html)/[Phoenix](http://www.phoenixframework.org/) ([Installation guide](http://www.phoenixframework.org/docs/installation), [Phoenix1.3](https://gist.github.com/chrismccord/71ab10d433c98b714b75c886eff17357))
- [Node.js](https://nodejs.org/en/)/[yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/)
- A [PostgreSQL](https://www.postgresql.org/) server running on your machine.
- [Watchman](https://facebook.github.io/watchman/) file watching service

## USED PLUGINS AND TECHNOLOGIES
**Frontend**
* [React](https://github.com/facebook/react)
* [React hot reloader](https://github.com/gaearon/react-hot-loader) Tweak React components in real time.
* [Redux logger](https://github.com/evgenyrodionov/redux-logger)
* [React Router 4](https://github.com/ReactTraining/react-router) Declarative routing for React.
* [Babel](http://babeljs.io) For ES6 and ES7 magic.
* [Webpack 3](http://webpack.github.io) For bundling.
* [Webpack Dev Middleware](http://webpack.github.io/docs/webpack-dev-middleware.html)
* [Redux](https://github.com/reactjs/redux) Predictable state container for JavaScript apps.
* [Redux Dev Tools](https://github.com/gaearon/redux-devtools) DevTools for Redux with hot reloading, action replay, and customizable UI. Watch [Dan Abramov's talk](https://www.youtube.com/watch?v=xsSnOQynTHs)
* [Redux Saga](https://github.com/redux-saga/redux-saga) Middleware for Redux - used in async actions.
* [React Router Redux 5](https://github.com/reactjs/react-router-redux) Ruthlessly simple bindings to keep react-router and redux in sync.
* [ESLint](http://eslint.org) And many librarys for this.
* [Jest](https://facebook.github.io/jest/) JavaScript Testing framework.
* [Enzyme](http://airbnb.io/enzyme/) JavaScript Testing utilities for React.
* [Sass](http://sass-lang.com/) Css extenstion language.
* [PostCSS](http://postcss.org/) Tool for transforming css to javascript
* [husky](https://github.com/typicode/husky) Husky can prevent bad commit, push and more.
* [OpenBrowserPlugin](https://github.com/baldore/open-browser-webpack-plugin) Opens a new browser tab when Webpack loads.
and other stuff...

**Backend**
* [Elixir 1.5](http://elixir-lang.org/)
* [Phoenix 1.3](http://www.phoenixframework.org/)
* [Credo](https://github.com/rrrene/credo) Static code analysis tool for the Elixir language.
