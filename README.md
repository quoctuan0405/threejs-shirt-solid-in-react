# ThreeJS shirt Solid in React

You can see the project [here](https://quoctuan0405.github.io/threejs-shirt-solid-in-react/).

## Why I build this project?

I built this project as an example of how to render a React component inside a Solid project using the monorepo approach.

## How to run this project?

Since I use PNPM Workspace, you'll have to install PNPM:

```bash
npm install -g pnpm
```

Next, install dependencies:

```bash
pnpm install
```

If you encounter the following error in a Window machine:

```bash
pnpm : File C:\Users\Admin\AppData\Roaming\npm\pnpm.ps1 cannot be loaded because running scripts is disabled on this system. For more information, see 
about_Execution_Policies at https:/go.microsoft.com/fwlink/?LinkID=135170.
At line:1 char:1
+ pnpm i
+ ~~~~
    + CategoryInfo          : SecurityError: (:) [], PSSecurityException  
    + FullyQualifiedErrorId : UnauthorizedAcces
```
...you can add `npx` before the `pnpm` command like this:

```bash
npx pnpm install
```

Now you can run the project:

```bash
pnpm run dev
# or
npx pnpm run dev
```