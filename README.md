# Expensephere (Web)

![Build and Deploy](https://github.com/AmirSavand/expensephere-web/workflows/Build%20and%20Deploy/badge.svg?branch=production)
![Code Quality](https://github.com/AmirSavand/expensephere-web/workflows/Code%20Quality/badge.svg)

Web app for Expensephere.

## Development

Install dependencies.

```bash
> npm install
```

Run the server.

```bash
> npm run serve
> npm run serve-stag
> npm run serve-prod
```

Build the app.

```bash
> npm run build
> npm run build-staging
> npm run build-prodduction
```

Check code quality.

```bash
> npm run lint
```

## Source Code

Here's what the project is build with:

- [angular.io](https://angular.io/)
- [getbootstrap.com](https://getbootstrap.com/)
- [ngx-bootstrap](https://valor-software.com/ngx-bootstrap)
- [fontawesome.com](https://fontawesome.com/)

### Routes

Here are the app routes to follow:

```
/user/sign-in
/user/sign-up
/user/sign-out
/user/forgot-password
/user/settings

/dash/overview
/dash/calendar
/dash/statistics

/dash/profile/list
/dash/profile/<id>

/dash/wallet/list
/dash/wallet/add
/dash/wallet/<id>

/dash/category/list
/dash/category/<id>

/dash/event/list
/dash/event/<id>

/dash/transaction/list
/dash/transaction/<id>
```

### Modals

Here are some modals that can be used instead of a page for that route:

- `ProfileFormModal` is used for creating and editing a profile.
- `WalletFormModal` is used for creating and editing a wallet.
- `CategoryFormModal` is used for creating and editing a category.
- `EventFormModal` is used for creating and editing an event.
- `TransactionFormModal` is used for creating and editing a transaction.
