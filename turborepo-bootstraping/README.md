### Turborepo File Structure

When you initialize a Turborepo project (e.g., using `npx create-turbo@latest`) and choose `npm` as your package manager, you typically get a monorepo with the following structure:

### **File Structure Breakdown**

```
my-turborepo/
├── apps/
│   ├── docs/
│   ├── web/
├── packages/
│   ├── eslint-config-custom/
│   ├── tsconfig/
│   ├── ui/
├── .gitignore
├── package.json
├── turbo.json
└── README.md

```

### **Folders and Their Purpose**

### 1. **`apps/`**

- This folder contains your main **applications** (e.g., `docs` and `web`).
- **`web/`**: Typically the frontend application (e.g., built with React or Next.js).
- **`docs/`**: A documentation site, often built with tools like Docusaurus.

**Why separate `apps`?**

- Applications in `apps` are self-contained and have specific purposes.
- It keeps the code modular and separates the apps logically, making them easier to maintain.

`web` and `docs` foder serves same purpose its like a website can have different pages web can be taken as for landing pages and docs can be take to write other things of the website or one can be used as userend website and one can be used for admin side purpose and packages is the shared folder from there all the pages can access similar or common thing they needed eg - define a kind of button and search box that will be access by whole website

### 2. **`packages/`**

- This folder contains **shared libraries or modules** used across your applications.
- Examples:
    - **`eslint-config-custom/`**: A shared ESLint configuration for consistent linting rules across the monorepo.
    - **`tsconfig/`**: Shared TypeScript configuration for consistency in type-checking.
    - **`ui/`**: A reusable UI components library for apps like `web` and `docs`.

**Why use `packages`?**

- Allows **code reuse** across multiple apps without duplicating logic.
- Encourages separation of concerns by isolating reusable components, utilities, or configurations.

### **Important Files**

### 1. **`turbo.json`**

- The **configuration file for Turborepo**.
- Defines the pipeline, caching behavior, and task orchestration.
- Example content:
    
    ```json
    {
      "pipeline": {
        "build": {
          "dependsOn": ["^build"],
          "outputs": ["dist/**"]
        },
        "lint": {},
        "test": {}
      }
    }
    ```
    
    - **`dependsOn`**: Defines task dependencies (e.g., build tasks for dependencies are run first).
    - **`outputs`**: Specifies what parts of the build are cached (e.g., `dist/**` folders).

### 2. **`package.json`**

- The root `package.json` contains:
    - **Shared dependencies**: Dependencies used across the whole monorepo.
    - **Scripts**: Monorepo-level scripts (e.g., `turbo run build`).
    - **Workspaces**: Lists all `apps` and `packages`.
    - Example:
        
        ```json
        {
          "name": "my-turborepo",
          "private": true,
          "workspaces": ["apps/*", "packages/*"],
          "devDependencies": {
            "turbo": "latest"
          }
        }
        ```
        

### 3. **`.gitignore`**

- Ensures files like `node_modules/`, build artifacts, and caches are not tracked by Git.

### Why `docs` and `web`?

- **`docs/`**: Useful for documentation or knowledge bases related to your project (e.g., technical docs for developers).
- **`web/`**: Represents the main web application or frontend of the project.
- You can rename these to whatever makes sense for your project (e.g., `admin`, `frontend`, etc.).

---

### How the Structure Works Together

- **Apps (`apps/`)** depend on shared code from **packages (`packages/`)**.
- Turborepo ensures that:
    - Shared packages are built before apps using them.
    - Changes are cached intelligently, so only what's necessary is rebuilt.