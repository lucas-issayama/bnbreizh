# BnBreizh - Discover the Magic of Music in Brittany

BnBreizh is an application designed to help users explore and discover festivals in Brittany, France. This demo website provides an engaging and user-friendly platform to locate festivals on a map, view detailed information about each event, and enhance their cultural experience in one of France's most vibrant regions.

This project is base on Strapi Starter Next 14, Tailwind, Typescript and Strapi

https://github.com/strapi/nextjs-corporate-starter

https://strapi.io/starters/strapi-starter-next-js-corporate

You can check the demo site on https://bnbreizh.vercel.app

![demo-site](https://raw.githubusercontent.com/lucas-issayama/bnbreizh/main/demoBnBreizh.gif)

## Getting Started

1. Clone the repository locally:

```bash
  git clone https://github.com/lucas-issayama/bnbreizh.git
    or
  gh repo clone lucas-issayama/bnbreizh
```

2. Run `setup` command to setup frontend and backend dependencies:

```bash
  yarn setup
```

3. Next, navigate to your `/backend` directory and set up your `.env` file. You can use the `.env.example` file as reference:

```bash
HOST=localhost
PORT=1337
APP_KEYS="toBeModified1,toBeModified2"
API_TOKEN_SALT=tobemodified
ADMIN_JWT_SECRET=tobemodified
JWT_SECRET=tobemodified
TRANSFER_TOKEN_SALT=tobemodified
```

4. Start your project by running the following command:

```bash
  yarn build
  yarn develop
```

You will be prompted to create your first admin user.

![admin-user](https://user-images.githubusercontent.com/6153188/231865420-5f03a90f-b893-4057-9634-9632920a7d97.gif)

Great. You now have your project running. Let's add some data.

## Setting Up The Frontend

Next we need to switch to our `/frontend` directory and create our `.env` file and paste in the following.

```bash
NEXT_PUBLIC_STRAPI_API_TOKEN=your-public-token
NEXT_PUBLIC_PAGE_LIMIT=6
NEXT_PUBLIC_STRAPI_FORM_SUBMISSION_TOKEN=your-form-submission-token
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=mapbox-token
```

Before starting our Next JS app we need to go inside our Strapi Admin and create two tokens that we will be using for **form submission** and displaying our **content**.

Inside your Strapi Admin Panel navigate to Settings -> API Tokens and click on the `Create new API Token`.

![api-tokens](https://user-images.githubusercontent.com/6153188/231865572-cebc5538-374c-4050-91cd-c303fae25a3d.png)

Here are our Token Settings

NEXT_PUBLIC_STRAPI_API_TOKEN

Name: Public
Description: Public.
Token duration: Unlimited
Token type: Read-Only

NEXT_PUBLIC_STRAPI_FORM_SUBMISSION_TOKEN

Name: Public API Form Submit
Description: Form Submission.
Token duration: Unlimited
Token type: Custom

In Permissions lets give the following access.

| Content              | Permissions |
| -------------------- | :---------: |
| Lead-Form-Submission |   create    |

Add your tokens to your `.env` file.

Once your environment variables are set you can start your frontend application by running `yarn dev`.

You should now see your Next JS frontend.

![frontend](https://raw.githubusercontent.com/lucas-issayama/bnbreizh/main/firstPage.png)

## Start Both Projects Concurrently

We can also start both projects with one command using the `concurrently` package.

You can find the setting inside the `package.json` file inside the root folder.

```json
{
  "scripts": {
    "frontend": "yarn dev --prefix ../frontend/",
    "backend": "yarn dev --prefix ../backend/",
    "clear": "cd frontend && rm -rf .next && rm -rf cache",
    "setup:frontend": "cd frontend && yarn",
    "setup:backend": "cd backend && yarn",
    "setup": "yarn install && yarn setup:frontend && yarn setup:backend",
    "dev": "yarn clear && concurrently \"cd frontend && yarn dev\" \"cd backend && yarn develop\""
  },
  "dependencies": {
    "concurrently": "^7.6.0"
  }
}
```

Go to the root folder and install the package, `yarn`
You can start both apps by running `yarn dev`.
