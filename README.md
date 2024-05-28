# Installation

<details>
<summary>Windows</summary>

Download and install **nvm**

-   <a href="https://github.com/coreybutler/nvm-windows">nvm-windows</a>

Run **setup** script

-   In Admin Powershell navigate to your project folder (**/frontend**):

-   `powershell -ExecutionPolicy Bypass -File .\scripts\setup.ps1`


Download and Install **chocolatey**

-   In admin powershell:

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

Navigate to your **frontend** folder, then run the setup script

-   `chmod +x ./scripts/setup.sh`
-   `bash ./scripts/setup.sh`

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

# Translation

<details>
<summary>Installation/Configuration</summary>

-   For VSCode use **i18n Ally** extension
    -   **/frontend** folder has to be opened folder to apply pre-configured settings for **i18n Ally**

</details>

<details>
<summary>Using translation</summary>

1. Import translation via `import { useTranslation } from 'react-i18next';`
2. Inside component declaration define translation function: `const { t } = useTranslation({NAMESPACE/S});`
    1. replace `{NAMESPACE/S}` with e.g. `'main'` for single namespace use
    2. replace `{NAMESPACE/S}` with e.g. `['main', 'admin']` for multiple namespace use
3. Replace hard-coded string with `t({KEY})` (using only one namespace) | `t('{KEY}', { ns: '{NAMESPACE}'})` (using more than one namespaces)
    1. replace `{KEY}` with corresponding key defined in namespace files.
    2. if you are using more than one namespaces in one component:
        1. For the first namespace inside of the array (see **Point 2.2.**) you don't have to add the namespace. E.g. `t('buttonOK')` is enough.
        2. If you want to use other namespace than the first, you have to add the namespace. E.g. `t('buttonOK', { ns: 'admin' })`
4. For using parametric translations, add the parameter as option (beside `ns`, if used). E.g. `t('userMessage', { ns: 'admin', id: userID })`

</details>

<details>
<summary>Manage translations</summary>

<blockquote>
<details>
<summary>If namespace already existing</summary>

1.  Go to **i18n ally** extension inside VS Code --> On "Tree" submenu click on **+** for creating a new key.
2.  Insert a key name.
3.  Insert a translation for english language.
    1.  For parametric translations: Replace parameter with following pattern: `{{PARAMETER}}`. E.g. `User with ID {{id}}.`
    2.  See **Using translation** --> **Point 4** how to use parametric translations.
4.  Select the file you want to store the key-value.

</details>

<details>
<summary>If you want to add a new namespace</summary>

1.  Create one new file per language folder. Name the files like you want to name the namespace.
2.  Inside file `i18n.ts`, import the created files and add the imports to `resources`.
3.  After that continue with **If namespace already existing**.

</details>
</blockquote>

</details>

# Testing

-   `npm test` to run all frontend tests
-   `act --job 'test'` to trigger the test workflow locally
-   `act pull_request` to simulate all workflows triggered by pull request locally

# Format using Prettier

-   single document: in VSCode CTRL + SHIFT + P -> Format Document -> choose prettier if prompted
-   whole project: while in frontend folder: `npx prettier . --write`

# Conventions

-   all TypeScript Interfaces should be commented with **JSDoc**
-   CSS should not be directly edited but compiled from **SCSS** instead
-   general styling that should apply to all pages and components should always be in **theme.scss**

# Further Reading

Frameworks

-   AG Grid: <a href="https://www.ag-grid.com/react-data-grid/getting-started/">AG Grid React Docs</a>
-   react-toastify: <a href="https://fkhadra.github.io/react-toastify/introduction/">react-toastify Docs and Playground</a>
-   Milkdown: <a href="https://milkdown.dev/docs/recipes/react">Milkdown React Docs</a> | <a href="https://milkdown.dev/playground">Milkdown Playground</a>
-   i18next: <a href="https://react.i18next.com/">react-i18next</a> | <a href="https://i18next.com/">i18next</a>
