# Installation

<details>
<summary>Windows</summary>

Download and install **nvm**
-   <a href="https://github.com/coreybutler/nvm-windows">nvm-windows</a>

Download and Install **chocolatey**
-   In Admin Powershell:
```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```
-   After the install is finished log out

Download and Install **Docker**
-   <a href="https://desktop.docker.com/win/main/amd64/Docker%20Desktop%20Installer.exe">Docker Desktop</a>

Download and Install **act**
-   In Admin Powershell navigate to your project folder (**/frontend**):
-   `choco install act-cli`
</details>

<details>
<summary>Linux</summary>

Download and Install **nvm**
-   <a href="https://github.com/nvm-sh/nvm">nvm-sh</a>

Download and Install **act**
-   `curl https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash`

</details>

<details>
<summary>Mac</summary>

Download and install **nvm**
-   <a href="https://github.com/nvm-sh/nvm">nvm-sh</a>

Download and Install **Docker**
-   <a href="https://docs.docker.com/desktop/install/mac-install/">Docker Desktop</a>

Download and Install **act**
-   `brew install act`

</details>

# Setup

-   `nvm install 21.7.1`

In project folder (/frontend):

-   `npm install`
-   Make sure Docker is running
-   `act`
-   Select medium
-   `npm run dev`

# Testing

-   `npm test` to run all frontend tests
-   `act --job 'test` to trigger the test workflow locally

# Format using Prettier

-   single document: in VSCode CTRL + SHIFT + P -> Format Document -> choose prettier if prompted
-   whole project: while in frontend folder: `npx prettier . --write`

# Conventions

-   all TypeScript Interfaces should be commented with **JSDoc**
-   CSS should not be directly edited but compiled from **SCSS** instead
-   general styling that should apply to all pages and components should always be in **theme.scss**

# Further Reading

Frameworks

- AG Grid: <a href="https://www.ag-grid.com/react-data-grid/getting-started/">AG Grid React Docs</a>
- react-toastify: <a href="https://fkhadra.github.io/react-toastify/introduction/">react-toastify Docs and Playground</a>
- Milkdown: <a href="https://milkdown.dev/docs/recipes/react">Milkdown React Docs</a> | <a href="https://milkdown.dev/playground">Milkdown Playground</a>

Testing
- Library: <a href="https://testing-library.com/docs/">React Testing Library</a>
- Framework: <a href="https://vitest.dev/api/">Vitest</a>
