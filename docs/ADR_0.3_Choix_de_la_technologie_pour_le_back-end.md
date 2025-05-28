
# ADR 0.3 - Choix de la technologie pour le back-end

## Statut  
Proposé

## Contexte  
Nous devons à présent choisir les technologies qu’on utilisera pour implémenter les différents composants de notre application. Pour rappel, nous devons implémenter un front-end pour nos utilisateurs, un back-end pour la logique métier et pour connecter le front-end à la Base de Données, et naturellement la BDD pour stocker nos données. Nous commencerons par le back-end.

## Décision  
Nous avons choisi d’implémenter le back-end et son API en NestJS.

Nous avons choisi cette technologie pour les raisons suivantes :  
- D’un point de vue technique, elle est moderne, scalable, et performante.  
- Elle a atteint une maturité et une stabilité que l’on souhaite avoir dans nos outils.  
- Nous avons choisi Typescript comme langage principalement pour sa simplicité de développement, mais aussi parce qu’il est fortement typé, nous protégeant ainsi de tous les bugs liés au typage.  
- Bien qu’il existe plusieurs langages compilés plus performants que le Typescript, nous avons décidé qu’un minimum de performance pouvait être sacrifié pour gagner du temps durant le développement. Vu que notre application ne propose pas de fonctionnalités en temps réel, la performance d'exécution du langage ne sera pas un enjeu majeur du projet.  
- NestJS présente plusieurs fonctionnalités que nous recherchons :  
  - Architecture en MVC  
  - Possibilité d’implémenter rapidement une API  
  - Une architecture Event-Driven  
  - Facilité d’intégration avec TypeORM qui est lui-même adapté à Postgresql  
  - Facilité d’intégration avec Redis pour toute logique de Jobs asynchrones  

## Conséquences  
- Le choix d’utiliser des librairies et packages open-source peut exposer notre application à des failles de sécurité.  
- Ces choix de technologies nous laissent assez confiants pour nous lancer dans ce projet pour tous les avantages mentionnés dans la partie “Décision”.  
- Les stacks techniques permettent de développer rapidement en gardant une bonne expérience utilisateur et une bonne expérience développeur.
