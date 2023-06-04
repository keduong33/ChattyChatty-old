## Installation

`npm install`

### Environment variables setup

Create an .env in the server repo and supply `API_KEY` from OpenAI

`cp .env.sample .env`

### Secret files

> Currently you don't have to because I already include the script inside the `index.html`

Create `responsiveVoiceAPI.js` in /src/server/api

Download the JS file from: https://code.responsivevoice.org/responsivevoice.js?key=KEY

Copy that in and read the [docs](https://responsivevoice.org/api/)

## Usage

### Run Locally

`npm run dev`

### Build

`npm run build`
