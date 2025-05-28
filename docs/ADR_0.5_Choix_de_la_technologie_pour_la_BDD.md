# ADR 0.5 - Choix de la technologie pour la BDD

## Statut  
Proposé

## Contexte  
Pour rappel, nous devons implémenter un front-end pour nos utilisateurs, un back-end pour la logique métier et pour connecter le front-end à la Base de Données, et naturellement la BDD pour stocker nos données. Nous choisissons à présent la technologie qui nous permettra de stocker nos données et d’y accéder.

## Décision  
Nous avons choisi PostgreSQL et plus généralement une Base de Données relationnelle vu que nous n’aurions pas besoin de la flexibilité que les BDD non-relationnelles offrent.  
Ça nous semble intuitif de stocker nos objets métiers dans des tables relationnelles.  
Par ailleurs, SQL reste le langage le plus adapté à des requêtes statistiques, ce qui nous permettra d’implémenter plus facilement les fonctionnalités concernées.

## Conséquences  
- PostgreSQL apporte une structure à nos données que l’on juge nécessaire.  
- Facilement intégrable avec NestJS, son utilisation nous réduira le temps de configuration pour qu’on puisse mieux se concentrer sur le développement.

