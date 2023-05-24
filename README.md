# Chatty Chatty

This is a friendly chatty

## Installation

Use NodeJS version 20 if possible

`nvm use 20`

Install the dependencies 

`npm install`

Create an src/Dialogue/commons/secrets.ts and supply `API_KEY` from OpenAI

```typescript
export function getAPIKEY() {
    return "API_KEY HERE";
  }
```

## Usage

Dev

`npm run dev`

Build

`npm run build`
