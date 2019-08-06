# Omnistack Tindev Backend

Hosted at [https://omnistack-tindev-backend.herokuapp.com/](https://omnistack-tindev-backend.herokuapp.com/).

## Endpoints

### GET on /
Returns a quote:
```json
{
  "message": "John is a man of focus... are you, my friend, a man of focus?"
}
```

### POST on /devs
Creates a new Developer. Body must be a JSON like so:
```json

```

## Environment Variables for the application to work properly
For development, I recommend the use of `dotenv` package, then you can have those env vars set on a .env file. For production, please, make sure to use at least the required env vars below:

- Optional. `PORT=<port>`. Specifies the port for the application to run, like `3000` for example. Defaults to `3333` if not present.
- Required. `DB=<connection url>`. Specifies the MongoDB connection URL.

## Developing
Rename `.env.example` to `.env`. Set the proper values for each environment variable.
Use `yarn dev` to run `nodemon` dev dependency that starts the application and monitors file changes.
