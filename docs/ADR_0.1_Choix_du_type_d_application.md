
# ADR 0.1 - Choix du type d’application

## Statut  
Proposé

## Contexte  
Nous devons implémenter une application qui permet à ses utilisateurs de gérer la réservation de places d’un parking d’une entreprise. Ses principaux utilisateurs seront les employés de cette entreprise, notamment les membres du pôle RH, les managers, et les salariés.  
Notre but est de choisir le type d’application le mieux adapté aux besoins de nos utilisateurs.

## Décision  
Nous avons décidé d’implémenter un site web et non pas une application mobile en vue des contraintes suivantes:  

- Nos utilisateurs doivent se servir de l’application dans un contexte professionnel, plus précisément sur leurs PCs présents au bureau, à l’aide de leur adresse mail professionnelle.  
- La majorité des fonctionnalités ne serait pas forcément plus adaptée à une utilisation via mobile, donc pas d’avantage clair de fournir une application mobile d’un point de vue fonctionnel.  
- Adapter la plateforme web au mobile plus tard s’avère plus simple que de faire l’inverse. Si l’entreprise souhaiterait avoir une version mobile plus tard, l’équipe de développement pourra l’implémenter avec des technologies qui permettraient de réutiliser le code déjà existant.

## Conséquences  
- D’une part, nous ne pouvons pas envisager de fournir des fonctionnalités mieux adaptées à une application mobile durant notre phase initiale de développement, tel que des fonctionnalités demandant d’être présent dans le parking.  
- D’autre part, nous avons besoin de développer un serveur back-end qui implémente la logique métier, un fait indépendant du type de l’application utilisateur.  
- Nous n’aurions alors pas besoin d’avoir deux équipes de développement ayant chacune une expertise informatique différente de l’autre : l’une dans le développement des applications mobiles et l’autre dans le web. Cela nous permettra de réduire les coûts de développement de l’application.  
- Finalement, fournir un site web à nos clients nous permettra de déployer de nouvelles versions plus fréquemment et d’être sûr que tous les utilisateurs ont la dernière version de l’application. Cela nous permettra de fournir des fonctionnalités en continu à nos utilisateurs. Les retours de nos utilisateurs seront plus fréquents, ce qui nous aidera à leur fournir une application qui correspond à leurs attentes.
