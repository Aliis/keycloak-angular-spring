# Project

This project is built with Angular (v 8), Keycloak (v 8.0.2) and Spring Boot (v 1.5.6) using Keycloak token authentication and cookie/session based authentication in backend (Spring Security).

## Frontend development server

Run 'npm install' to install package dependencies.
Run 'ng serve' for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Backend development server

Backend main method is located in KeyCloakTutorial class.

## Keycloak

Navigate to keycloak/bin and run standalone -Djboss.socket.binding.port-offset=100
Server settings can be imported from keycloak/realm-export.json.
