# 🧩 Indicaciones

1. **Instalar Volta (si no lo tienen):**  
   - Si tienen Chocolatey (opción más sencilla):  
     ```bash
     choco install volta -y
     ```
   - También pueden ver otras opciones en [https://volta.sh](https://volta.sh)

2. **Clonar el repositorio y entrar al proyecto:**
   ```bash
   git clone <url-del-repo>
   cd AMC_TecWeb
   ```

3. Instalar dependencias
    ```bash
    npm install
    ```

4. Y ejectuar cuando quieran
    ```bash
    npm start
    ```

⚠️ Importante

Asegúrense de estar dentro de la carpeta del proyecto antes de usar ng.
De otra forma, su sistema podría tomar el Angular global que tengan instalado y causar errores.

En este proyecto se usa Angular CLI 15 local, ya incluido en node_modules.

Si necesitan usar comandos como generar componentes, utilicen el ng local:

npx ng g c nombre-del-componente

---

# AMCTecWeb

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.11.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
