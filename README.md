# heuristic-project
# ParQueen – Application Web de réservation de place de parking

Ce projet est une application web composée de trois services principaux :

- Backend : API REST développée avec NestJS
- Frontend : Interface utilisateur développée avec Vite
- Base de données : PostgreSQL

Le tout est orchestré à l’aide de Docker Compose pour simplifier le développement et le déploiement local.

## Prérequis

- Docker
- Docker Compose

## Installation et lancement

### 1. Cloner le dépôt

```bash
git clone https://github.com/Ris-Un-En-Commun/heuristic-project
cd heuristic-project
```


### 2.Lancer les services
```bash
docker compose up --build
```
Docker Compose va :

Créer un conteneur PostgreSQL

Builder et lancer l’API NestJS

Builder et lancer le frontend avec Vite

## Accès aux services
Frontend : http://localhost:80

Backend (API) : http://localhost:3000
