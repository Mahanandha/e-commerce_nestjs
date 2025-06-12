### E-commerce

## Nest.js backend

# Project setup

```bash
 npm install
```

## Compile and run the project

````bash
# development
 npm start

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
````

## Deployment

## api request

# for register and login

first register then check login
@register
post method http://localhost:3000/auth/register

same json for both register and login
{
"email": "kiran@gh.com",
"password": "password123"
}

@login
post method http://localhost:3000/auth/login

# for mail

post method http://localhost:3000/mail/send
json:
{
"to": "mahanandhanait@gmail.com",
"subject": "Test Email from E-Commerce_nestjs_backend",
"html": "<h1>This is a test with attachments</h1>",
"attachments": [
{
"filename": "testimage",
"path": "C:/Users/DELL/OneDrive/Pictures/Screenshots/Screenshot 2025-06-12 114204.png"
},
{
"filename": "report.pdf",
"path": "C:/Users/DELL/Downloads/Shift change forms/OpSite-Logistics-Handover_Fillable.pdf"
}
]
}

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```
