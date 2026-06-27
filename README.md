# 🎯 Agiles TP Grupo 10 — Ahorcado

[![CI/CD](https://github.com/David1889/Agiles_TP_10/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/David1889/Agiles_TP_10/actions/workflows/ci-cd.yml)
[![Quality Gate](https://sonarcloud.io/api/project_badges/measure?project=David1889_Agiles_TP_10&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=David1889_Agiles_TP_10)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=David1889_Agiles_TP_10&metric=coverage)](https://sonarcloud.io/summary/new_code?id=David1889_Agiles_TP_10)

Juego del Ahorcado desarrollado con **TypeScript + Vite**, aplicando **ATDD** con Cucumber (Playwright BDD) y **TDD** con Vitest.

---

## 📋 Pipeline CI/CD

| Fase | Herramienta | Descripción |
|---|---|---|
| **Unit Tests** | [Vitest](https://vitest.dev/) | Tests unitarios del dominio (`src/domain/Ahorcado.ts`) |
| **ATDD Tests** | [Playwright BDD](https://playwright.dev/) + Cucumber | Tests de aceptación con escenarios Gherkin |
| **Análisis estático** | [SonarCloud](https://sonarcloud.io/) | Calidad de código, coverage, code smells, bugs |
| **Deploy** | SSH + nginx | Despliegue automático en VPS al pasar todos los checks |

### Cómo correr los tests localmente

```bash
# Tests unitarios
npm run test

# Tests con cobertura
npm run coverage

# Tests de aceptación (Cucumber / Playwright BDD)
npm run at
```

---

## 🧪 Escenarios de ATDD (Gherkin)

| Feature | Archivo |
|---|---|
| Iniciar partida | [`features/iniciar-partida.feature`](features/iniciar-partida.feature) |
| Acertar letra | [`features/acertar-letra.feature`](features/acertar-letra.feature) |
| Fallar letra | [`features/fallar-letra.feature`](features/fallar-letra.feature) |

---

## 🚀 Deploy

El deploy se dispara automáticamente al hacer push a `main` si todos los tests y el análisis de SonarCloud pasan.

- **Servidor:** VPS con nginx
- **URL:** [http://151.242.242.146](http://151.242.242.146)

---

## 📊 Badges

Los badges de arriba se actualizan automáticamente con cada ejecución del pipeline.
