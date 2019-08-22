# Fretly test server

Before starting the server, make sure mongo db has been started. Run the following command to start the server:

```bash
npm start
```

By default, the server is listening **port 3100**.

## API endpoints

Routes can be found wihtin the `./routes/users.routes.js` file.

```
/users
```

| Method | Description |
|---|---|
|**GET**| returns the list of currently saved users |
|**POST**| add a new user. required field: { email: String, password: String: company_type: transporteur\|chargeur } |
|**DELETE**| clear the users database| 

```
/users/:userId
```

| Method | Description |
|---|---|
|**GET**| retrieves a particular user |
|**PUT**| updates user |