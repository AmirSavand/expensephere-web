# Expensephere (Web)

![Deployment](https://github.com/AmirSavand/expensephere-web/workflows/Deployment/badge.svg?branch=production)
![Build](https://github.com/AmirSavand/expensephere-web/workflows/Build/badge.svg)
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

- [Angular](https://angular.io/)
- [Bootstrap](https://getbootstrap.com/)
- [FontAwesome](https://fontawesome.com/)

### Routes

Here are the app routes to follow:

```
/public/transaction/<id>
/public/invoice/<id>

/user/sign-in
/user/sign-up
/user/sign-out
/user/forgot-password
/user/settings

/dash/overview
/dash/calendar
/dash/statistics
/dash/pages

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
/dash/transaction/bulk-add
/dash/transaction/<id>

/dash/invoice/list
/dash/invoice/add
/dash/invoice/<id>

/dash/import
/dash/export
```

### Modals

Here are some modals that can be used instead of a page for that route:

- `ProfileFormModal` is used for creating and editing a profile.
- `WalletFormModal` is used for creating and editing a wallet.
- `CategoryFormModal` is used for creating and editing a category.
- `EventFormModal` is used for creating and editing an event.
- `TransactionFormModal` is used for creating and editing a transaction.


### Invoice Templates

Read about invoice templates, development and rules in
its [README file](src/app/public/invoice/shared/components/README.md).
