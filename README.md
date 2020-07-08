# OpenExpenses (Web)

Web app for OpenExpenses.

## Development

Install dependencies.

```bash
> npm install
```

Run the server.

```bash
> npm run serve
> npm run serve-prod
```

Code quality.

```bash
> npm run lint
```

## Source Code

Here are the list of technologies used:

- angular
- bootstrap
- ngx-bootstrap
- fontawesome

### Routes

Here are the app routes to follow:

```
/user/sign-in
/user/sign-up
/user/sign-out
/user/forgot-password
/user/settings

/profile/list
/profile/new

/profile/:id/wallet/list
/profile/:id/wallet/new
/profile/:id/wallet/:id/dashboard

/profile/:id/wallet/:id/transaction
/profile/:id/wallet/:id/transaction/:id

/profile/:id/wallet/:id/event
/profile/:id/wallet/:id/event/:id

/profile/:id/wallet/:id/category
/profile/:id/wallet/:id/category/:id
```

### Modals

Here are the modals that are not a page but a modal only:

- `TransactionFormModal` is used for creating and editing a transaction.
