# ADR - Choix des technologies

## Statut
Proposé

## Contexte
Nous choisissons les technologies que nous allons utiliser pour implémenter le logiciel.

## Décision
Nous proposons d’implémenter un site web et non pas une application mobile vu que les utilisateurs principaux se serviront de l’application dans un contexte professionnel.

Nous avons choisi d’implémenter :
- Un **front-end en React**
- Un **back-end en NestJS** avec une API qui connectera le front au back
- **Docker** comme technologie de conteneurisation

Les raisons de ces choix sont les suivantes :

### Raisons techniques :
- Technologies modernes, scalables et performantes
- Maturité et stabilité des outils
- Utilisation de **TypeScript** pour sa simplicité, son typage fort, et la prévention de bugs liés au typage
- Bien que certains langages compilés soient plus performants, le compromis sur la performance est acceptable compte tenu de l’absence de fonctionnalités en temps réel

### Avantages spécifiques à NestJS :
- Architecture en **MVC**
- Création rapide d’API
- Support d’une **architecture Event-Driven**
- Intégration facile avec **TypeORM**, adapté à **PostgreSQL**
- Intégration facile avec **Redis** pour les jobs asynchrones

### Avantages spécifiques à React :
- Possibilité future d’une application mobile via **React Native**

### Base de données :
- Choix de **PostgreSQL** et des bases de données relationnelles
- Inutilité de la flexibilité des bases NoSQL dans notre cas
- SQL plus adapté pour les **requêtes statistiques**
- Stockage des objets métiers plus intuitif en tables relationnelles

### Conteneurisation :
- **Docker** est un standard de l’industrie
- Accès à de nombreuses images prédéfinies via Docker Hub
- **Docker Compose** pour une orchestration simple, idéale pour notre infrastructure basique

### Expérience développeur :
- Large communauté et documentation abondante
- Accès à des packages et librairies open-source
- Facilité de recrutement de développeurs supplémentaires si nécessaire

## Conséquences
- L’utilisation de packages open-source peut exposer notre application à des **failles de sécurité**
- Les choix technologiques nous rendent confiants pour démarrer le projet
- La stack choisie permet un **développement rapide**, tout en garantissant une **bonne expérience utilisateur** et une **bonne expérience développeur**
