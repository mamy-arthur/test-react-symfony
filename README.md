# TEST REACT SYMFONY

# Installation du projet
Ce document décrit le lancement de l'application en local:
- **Api**: Fait à partir de **Symfony 6.4**.
- **Front**: Fait à partir de **reactjs 19.0**.
- **Environnement Docker**: L'environnement fait à l'aide de **Docker-compose**.
---
## Outils requis en local
Pour pouvoir lancer l'application il faut 2 outils d'installer en local:
- **Docker**: Pour l'environnement.
- **Git**: Pour pouvoir clôner le projet.

## Manipulation à faire la racine du projet

A la racine du projet, à partir du fichier **.env.dist**, créez un fichier **.env** et modifiez les variables **NODE_ENV** et **API_ENV** en **development** et **dev** respectivement.

## Manipulation à faire sur la partie API.

- Dans le dossier **/api**, à partir du fichier **.env.dist**, créez un fichier **.env** modifier le contenu pour correspondre au configuration voulu.
- Dans la configuration de la base de donnée en local, le host pour la base est `dilypse_mongodb` et le `db_user` et le `db_password` sont définis dans le fichier `docker-compose.yml` mais peuvent être changer.
- Génerez des nouveaux **APP_SECRET** et **JWT_PASSPHRASE**.

## Manipulation à faire sur la partie FRONT

Dans le dossier **/front**, à partir du fichier **.env.dist**, créez un fichier **.env** et modifiez la variable **VITE_APP_URL** à ce que vous avez defini, par exemple [http://test-react-symfony.local](http://test-react-symfony.local).

## Lancement du projet

Pour construire les images faites:
```
docker compose build
```
Pour construire et lancer les containers, faites:
```
docker compose up -d
```
Quand les containers sont `up` entrez dans le container `php` et lancez la commande suivante:
```
chmod 777 -R var/
```
pour donner la permission en écriture au dossier `var/`

Si les fixtures n'ont pas été lancer, lancez les manuellements dans le container `php` avec la commande:
```
bin/console doctrine:mongodb:fixtures:load
```
