## Get Started

```sh
npx create-app-starter my-app

# If you want to create a pure js/css/html app include `vanilla` as the 4th argument
npx create-app-starter my-app vanilla
```

or

```sh
git clone https://github.com/ItsLeeOwen/app-starter.git my-app

cd my-app

# If you want to create a pure js/css/html app include
# checkout the vanilla branch
git checkout vanilla

npm install
```

That's it.

## Code Splitting

Add additional packages to package.json's "webpack.entry" config.

```json
"webpack": {
  "entry": {
    "index.html": "./src/index.html",
    "index.js": "./src/index.js",

    "login.html": "./src/login.html",
    "login.js": "./src/login.js"
  }
}
```

## Environment Vars

To exclude variables from your github repo, such as public keys, but expose them to your javascript code when built, use .env. They will be accessible on `process.env`, such as `process.env.PUBLIC_KEY_EXAMPLE`.

In package.json's `webpack.env` section add a key/value pair where the key is the variable name that your code will reference on `process.env`, the other is a dollarsign prefixed name of the variable from our `.env` file.

Although these values are not committed to your github repo, they ARE transpiled into your clientside code, so don't use any private secrets or keys.

```json
"webpack": {
  "env": {
    "PUBLIC_KEY_EXAMPLE": "$PUBLIC_KEY_EXAMPLE"
  }
}
```

## Heroku Deployment

### Environment Variables

Any environment vars that you've added to .env, need to be added to `Dockerfile` and `docker-compose.yml` as build args for deployments.

```dockerfile
# dockerfile build arg example
ARG PUBLIC_KEY_EXAMPLE="default"
```

```yml
# docker-compose build arg example
- PUBLIC_KEY_EXAMPLE=$PUBLIC_KEY_EXAMPLE
```
