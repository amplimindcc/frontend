# Installation

Download and install nvm

-   Windows: <a href="https://github.com/coreybutler/nvm-windows">nvm-windows</a>
-   Linux / Mac: <a href="https://github.com/nvm-sh/nvm">nvm-sh</a>

# Setup

-   `nvm install 21.7.1`

In project folder (/frontend):
-   `npm install`
-   `npm run dev`

# Format using Prettier

-   single document: in VSCode CTRL + SHIFT + P -> Format Document -> choose prettier if prompted
-   whole project: while in frontend folder: `npx prettier . --write`

# Conventions

-   all TypeScript Interfaces should be commented with JSDoc
-   CSS should not be directly edited but compiled from SCSS instead
-   general styling that should apply to all pages and components belongs in theme.scss