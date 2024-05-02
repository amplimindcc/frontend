# Installation

Download and install **nvm**

-   Windows: <a href="https://github.com/coreybutler/nvm-windows">nvm-windows</a>
-   Linux / Mac: <a href="https://github.com/nvm-sh/nvm">nvm-sh</a>

# Setup

-   `nvm install 21.7.1`

In project folder (/frontend):

-   `npm install`
-   `npm run dev`

# Testing

-   `npm test` to run all frontend tests

# Format using Prettier

-   single document: in VSCode CTRL + SHIFT + P -> Format Document -> choose prettier if prompted
-   whole project: while in frontend folder: `npx prettier . --write`

# Conventions

-   all TypeScript Interfaces should be commented with **JSDoc**
-   CSS should not be directly edited but compiled from **SCSS** instead
-   general styling that should apply to all pages and components belongs in **theme.scss**

# Further Reading

Frameworks

- AG Grid: <a href="https://www.ag-grid.com/react-data-grid/getting-started/">AG Grid React Docs</a>
- react-toastify: <a href="https://fkhadra.github.io/react-toastify/introduction/">react-toastify Docs and Playground</a>
- Milkdown: <a href="https://milkdown.dev/docs/recipes/react">Milkdown React Docs</a> | <a href="https://milkdown.dev/playground">Milkdown Playground</a>

Testing
- Library: <a href="https://testing-library.com/docs/">React Testing Library</a>
- Framework: <a href="https://vitest.dev/api/">Vitest</a>
