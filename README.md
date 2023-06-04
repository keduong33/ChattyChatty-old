# Chatty Chatty

This is a friendly chatty

## Installation

Use NodeJS version 20 if possible

`nvm use 20`

Install the dependencies

`npm install`

### Environment variables setup

Create an .env in the root and supply `API_KEY` from OpenAI

```typescript
VITE_API_KEY=YOUR_API_KEY
```

### Secret files

Create `responsiveVoiceAPI.js` in /src/server/api

Download the JS file from: https://code.responsivevoice.org/responsivevoice.js?key=KEY

Copy that in and read the [docs](https://responsivevoice.org/api/)

## Usage

### Dev (Local)

Have to run 2 commands (1 for server, 1 for ui)

`npm run dev:server`

`npm run dev:ui`

*Build*

`npm run build`

## Licenses

* DeepSpeech: [License](https://github.com/mozilla/DeepSpeech/blob/master/LICENSE)
* Responsive Voice: [License](https://responsivevoice.org/license/)
* Mozilla Public License : [License](https://www.mozilla.org/en-US/MPL/)
