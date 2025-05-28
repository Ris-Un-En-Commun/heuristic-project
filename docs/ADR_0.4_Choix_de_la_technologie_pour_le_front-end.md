# ADR 0.4 - Choix de la technologie pour le front-end

## Statut  
Proposé

## Contexte  
Pour rappel, nous devons implémenter un front-end pour nos utilisateurs, un back-end pour la logique métier et pour connecter le front-end à la Base de Données, et naturellement la BDD pour stocker nos données. Nous choisissons à présent la technologie d’implémentation du front-end.

## Décision  
Nous avons choisi d’implémenter le front-end en React à l’aide de Typescript.  
Pour prendre connaissance des avantages présentés par Typescript, voir ADR 0.3.

- React nous permettra d’avoir l’option d’implémenter une application mobile en React Native si on le souhaite plus tard.  
- Comme NestJS, c’est un framework mature dont la communauté ne cesse d’augmenter.  
- Il est assez performant pour nos besoins ; les composants UI que nous voulons implémenter restent relativement simples dans leur fonctionnement.  
- React est aussi adapté à tous les navigateurs majeurs du marché actuel, ce qui limitera les problèmes de compatibilité.  
- React fait aussi partie des frameworks front qui sont les plus utilisés aujourd’hui, ce qui nous facilitera le recrutement de développeurs additionnels si besoin.

## Conséquences  
- Le choix d’utiliser des librairies et packages open-source peut exposer notre application à des failles de sécurité.  
- React, adoré par beaucoup de développeurs front, nous permettra de développer rapidement en gardant une bonne expérience utilisateur et une bonne expérience développeur.

