# Omnistack Tindev Backend

Hosted at [https://omnistack-tindev-backend.herokuapp.com/](https://omnistack-tindev-backend.herokuapp.com/).

## Endpoints

### GET on /

Returns a message:

```json
{
  "message": "John is a man of focus... are you, my friend, a man of focus?"
}
```

### POST on /developers

Creates a new Developer. Body must be a JSON like so:

```json
{
  "username": "brunodrugowick"
}
```

`username` must be a valid GitHub account.

Returns:

```json
{
  "likes": [],
  "dislikes": [],
  "_id": "5d4a4ed6958c434ddf3c6b29",
  "name": "Bruno Drugowick Muniz",
  "user": "brunodrugowick",
  "bio": "I love helping people to understand and deal with technology. If I can build something in the process, even better!",
  "avatar": "https://avatars1.githubusercontent.com/u/7481200?v=4",
  "createdAt": "2019-08-07T04:08:54.803Z",
  "updatedAt": "2019-08-07T04:08:54.803Z",
  "__v": 2
}
```

The HTTP Status Code can be:

- `201` when creating a new user.
- `200` when the user already exists.

### GET on /developers

Must include a `user` on the request header with a valid user id (_id on MongoDB).

Returns all users, except for:

- The user requesting the operation;
- The already liked users by the user requesting the operation;
- The already disliked users bu the user requesting the operation;

### POST on /developers/:devId/likes

Must include a `user` on the request header with a valid user id (_id on MongoDB).

Likes the user specified on `devId`.

### POST on /developers/:devId/dislikes

Must include a `user` on the request header with a valid user id (_id on MongoDB).

Dislikes the user specified on `devId`.

## Environment Variables for the application to work properly

For development, I recommend the use of `dotenv` package, then you can have those env vars set on a .env file. For production, please, make sure to use at least the required env vars below:

- Optional. `PORT=<port>`. Specifies the port for the application to run, like `3000` for example. Defaults to `3333` if not present.
- Required. `DB=<connection url>`. Specifies the MongoDB connection URL.

## Developing

Rename `.env.example` to `.env`. Set the proper values for each environment variable.
Use `yarn dev` to run `nodemon` dev dependency that starts the application and monitors file changes.
