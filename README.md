### Overview

This is a subscription form made in React Hooks (client), and Express (api). The client is a form with ARIA componentes for the visually impared and it has all the validation needed to verify if the information is valid to send to the api. 

## Installation

Unfortunatelly, this is a sample application, and it is not ready to deploy with a single command. I would need to know if this would run a Windows, Linux or Mac. So, please, follow the installation process below. I promisse I made it as easy as possible.

First install the node_modules for the api running the following command:

```
npm i
```

Then access the folder client and install the node_modules for it as well:

```
cd client
npm i
```

## Running

After the installation is done, just go to the main folder. The same folder were this README file is located and run:
```
npm start
```

## Why

I decided to use React to make the form. React is mature and has many plugins and components to choose, also it is less heavy then other frameworks like Angular, for instance. I picked React Hook Form to validate the form, because it can be used with regular html form tags. Also, I didn't need to validate the data developing code to validate each input tag.

