# FISHEYE

## I. Projet

Le projet est réalisé pour l'un des plus importants sites de photographie en freelance, disposant d'un vaste réseau de photographes.

L'objectif est de moderniser leur plateforme en ajoutant des fonctionnalités pour améliorer l'accessibilité. Ce projet est baptisé 'Fisheye'.

![Shape1](./assets/Img-Md/Vue%20générale.jpg)

_Figure 1 Vue générale_

Lorsqu'on accède au site, on atterrit sur la page d'accueil qui présente la liste des photographes avec leurs images, noms, localisations, slogans et tarifs par jour. En cliquant sur un photographe (son image ou son nom), on est dirigé vers la page dédiée au photographe. Cette page affiche un en-tête avec les informations du photographe ainsi qu'une galerie de ses travaux et d'autres fonctionnalités. Les détails de ces fonctionnalités seront explicités dans les châpitres suivantes.

## II. Page de photographe

## 1. Modal – Contact du photographe

![Shape2](./assets/Img-Md/Contacter%20un%20photographe%20-%20Modal%20-.jpg)

_Figure 2 Contacter un photographe - Modal -_

Dans la page du photographe, on trouve un bouton « Contactez-moi » positionné dans l'en-tête, permettant à l'utilisateur de contacter le photographe. Lorsqu'on clique sur ce bouton, un formulaire s'affiche, demandant à l'utilisateur de saisir ses informations pour envoyer son message au photographe. Cependant, si ces informations ne sont pas valides, un message d'erreur s'affichera sous chaque champ contenant une erreur.

## 2. Conditions de validation du formulaire

Tout champ possédant un attribut de type texte ou un champ textArea doit contenir au moins deux caractères.

Le champ destiné à l'adresse e-mail doit respecter un format spécifique correspondant à celui d'une adresse e-mail valide.

emailFormat = /^\w+([\.-]?\w+)\*@\w+([\.-]?\w+)\*(\.\w{2,3})+$/;

## 3. Média – Modal LightBox

![Shape3](./assets/Img-Md/Média%20-%20Like%20-%20LightBox.jpg)

_Figure 3 Média - Like - LightBox_

Dans la page du photographe, se trouve une galerie présentant ses travaux sous forme de médias. Chaque média peut être une image ou une vidéo, chacun d'eux possédant un titre et un compteur de likes. En cliquant sur le bouton de like, le nombre de likes sera incrémenté.

En sélectionnant un média, un modal lightbox s'ouvre. À l'intérieur, on trouve des boutons de navigation pour passer d'un média à l'autre, ainsi que le titre du média. Pour les vidéos, des boutons de contrôle sont disponibles pour lire, mettre en pause ou arrêter la vidéo, et également un bouton pour ajuster le son.

## 4. Options Tri et Like

![Shape4](./assets/Img-Md/Options%20Tri%20et%20Like.jpg)

_Figure 4 Options Tri et Like_

Parmi les fonctionnalités disponibles sur la plateforme, il y a l'option de tri permettant de classer les médias par popularité, par date ou par titre.

Une autre fonctionnalité est celle de "like" mentionnée précédemment, qui permet d'augmenter à la fois le compteur de likes du média sélectionné et le compteur de likes total, représentant la somme des likes de tous les médias.

## III. Accessibilité du site

## 1. Responsive design avec les Media Queries

Pour rendre la plateforme adaptable aux différentes tailles d'écran, j'ai implémenté trois conceptions réactives en utilisant des media queries.

Cette approche vise à garantir que la plateforme puisse s'adapter et fonctionner de manière optimale sur une variété de tailles d'écran, assurant ainsi une expérience utilisateur cohérente, quel que soit l'appareil utilisé pour y accéder.

- Ordinateur : plus de 1024px.
- Tablette : 768px – 1024px.
- Mobile : Moins de 767,98px.

## 2. Accessibilité Web / Numérique

L'objectif était de créer un site accessible à tous, y compris aux personnes en situation de handicap. Pour cela, j'ai utilisé plusieurs outils, comme :

- Un design simplifié,
- Des alternatives textuelles pour tout le contenu,
- Des descriptions détaillées pour chaque champ du site,
- La possibilité de naviguer via un clavier.

## IV. MVC

![Shape5](./assets/Img-Md/Architecture%20-%20MVC.jpg)

_Figure 5 L'architecture MVC_

Je fais usage de l'architecture MVC dans mon code.

C'est un modèle de conception logicielle qui met l'accent sur la séparation entre la logique métier, appelée modèle, et l'interface utilisateur, la vue. Ces deux parties interagissent entre elles via le contrôleur.

L'approche MVC contribue à une organisation plus efficace du code, à une meilleure lisibilité et simplifie la maintenance. Elle favorise la réutilisation du code, facilite la collaboration, et offre une évolutivité et une flexibilité considérables. Par exemple, une modification de l'aspect visuel n'impacte pas nécessairement le modèle ou le contrôleur. C'est pourquoi j'ai opté pour l'architecture MVC.

## V. La validité de mon code

![Shape6](./assets/Img-Md/La%20validité%20du%20code.jpg)

_Figure 6 La validité du code_

Pour assurer la qualité et la validité de mon code, j'ai impliqué plusieurs outils de détection d'erreurs : la librairie _ **ESLINT** _, l'outil d'audit d'accessibilité web _ **ACHECKER** _ et _ **ZOOM** _. J'ai également utilisé le lecteur d'écran, _ **SCREEN READER** _, pour garantir l'accessibilité du site aux utilisateurs malvoyants.
