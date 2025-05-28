
# ADR 0.2 - Composition de l’infrastructure

## Statut  
Proposé

## Contexte  
Nous avions précédemment choisi d’implémenter un site web.  
Nous faisons à présent face au choix des composants de l’infrastructure qui feront tourner notre application.

## Décision  
Nous avons choisi d’implémenter un front-end dynamique et non pas statique, ce qui sera plus adapté aux fonctionnalités demandées.

Ce front-end sera connecté à un back-end qui contiendra la logique métier, l’appliquant ainsi aux entrées des utilisateurs sur le front-end.

Vu que nous aurions besoin de sauvegarder les données utilisateurs et l’historique des réservations de manière centralisée, nous avons décidé d’utiliser une Base de Données hébergée sur un serveur. Elle sera ainsi indépendante de notre serveur back-end. Cela présente plusieurs avantages, notamment:  

- Sécurité contre les failles qui pourraient atteindre le serveur back-end  
- Accessibilité directe des outils de gestion ou d’analyse de données  

## Conséquences  
L’avantage que cette architecture d’infrastructure présente est la modularité, la séparation des responsabilités entre ses différents composants, et une protection des composants contre les pannes des uns des autres.  
Cependant, nous aurions besoin d’un membre de l’équipe de développement qui peut implémenter et maintenir une telle infrastructure.
