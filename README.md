# Chatty Chatty

This is a repo for a friendly chatty chatty bot. One of my first completed full stack applications so there should be a few mistakes or inefficient coding!

## Important Notes

* This is a **duo-repo** setup, which means you have to install dependencies for each repo: *server* & *client.*
* I included a README.md for each repo (for serverless right now nothing), please follow the setup instructions OR you can setup from the root folder by running Setup steps

## Setup

`npm run setup:deps`

- Since this app uses Netlify Function, the .env variables should be declared in the client/.env since that is where the App.tsx sits

## Run locally (after proper installation)

`npm run dev`

## Build

`netlify link` & Choose the first option of GitHub

`npm run build`

## Deploy

`npm run deploy:dev`

OR

`npm run deploy:prod`

## Self-feedbacks (for learning purpose)

- State management is still a bit fuzzy after the [vid](https://www.youtube.com/watch?v=P95DuIBwnqw&ab_channel=JackHerrington). 
- It could be improved better but since the project is just an MVP & I follow build fast & break fast --> Maybe not worth re-doing but create a new project and avoid those same issues

## Licenses

* Responsive Voice: [License](https://responsivevoice.org/license/)
* Mozilla Public License : [License](https://www.mozilla.org/en-US/MPL/)
* HuggingFace APIs

## Tech/Tools used

* TS + ReactJS
* Vite
* tRPC
* Netlify functions
* React Query
* HuggingFace API Inference
