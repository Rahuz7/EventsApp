
# Projet EVFRANCE

Ce projet de billetterie est une application destinée à la vente de billets d'événements. Il permet aux utilisateurs de parcourir les événements disponibles, d'acheter des billets et de gérer leurs réservations.




## Prerequis

Assurez-vous d'avoir les éléments suivants installés sur votre système :

 - Git
 - Docker

## Installation

#### 1 - Clonez le projet en utilisant la commande suivante :

```bash
git clone https://github.com/Rahuz7/EventsApp.git
```

#### 2 - Donnez les permissions d'exécution au script launch.sh :

```bash
chmod +x launch.sh
```

#### 3 - Exécutez le script pour construire et démarrer les conteneurs Docker :

```bash
./launch.sh

```

#### 4 - Attendez que les images Docker soient construites et que les conteneurs soient démarrés.

 La durée peut varier en fonction de la vitesse de votre connexion Internet.

#### 5 - Une fois l'installation terminée, vous pouvez accéder à l'application en ouvrant votre navigateur et en visitant l'URL suivante :

```bash
http://localhost:8000

```
## Fonctionnalités annexes

#### Export de la base de données :

Utilisez le script export.sh pour effectuer une sauvegarde de la base de données. Assurez-vous d'avoir les droits d'exécution sur le script.

```bash
./scripts/backup/export.sh db nom_fichier
```
#### Import de la base de données  :

Utilisez le script import.sh pour importer une base de données sauvegardée précédemment. Assurez-vous d'avoir les droits d'exécution sur le script.

```bash
./scripts/backup/import.sh db nom_fichier
```
## Roadmap

- Ajouts de tests (Unitaire, Fonctionnel, Intégration, Securité & Performance)

- Module d'authentification 2FA


