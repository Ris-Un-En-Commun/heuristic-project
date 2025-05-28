# ADR 0.6 - Conteneurisation des composants

## Statut  
Proposé

## Contexte  
Nos composants seront chacun implémentés à l’aide d’une technologie ayant des dépendances différentes. Nous souhaitons pouvoir déployer notre application sans avoir à gérer les dépendances sur différents systèmes d’exploitation, avec un minimum de configuration.

## Décision  
Docker reste le standard de l’industrie en termes de conteneurisation.  
Présentant beaucoup d’images prédéfinies sur Docker Hub, c’est un choix parfait vu nos besoins limités en DevOps au début du projet.  
Il fournit Docker Compose comme orchestrateur, simple et efficace pour notre infrastructure basique.

## Conséquences  
- Il suffira d’avoir Docker installé sur une machine pour pouvoir lancer notre application.  
- Par ailleurs, Docker peut présenter des pertes de performance qui pourront être contraignantes de façon inattendue.

