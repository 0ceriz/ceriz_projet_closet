# Database local setup

## Objectif

Ce document explique comment lancer PostgreSQL en local avec Docker, initialiser la base de données du projet, puis vérifier que tout fonctionne.

---

## Fichiers concernés

- `docker-compose.local.yml`
- `.env`
- `backend/db/init.sql`
- `backend/db/seed.sql`

---

## Commandes

### Docker

#### Lancer PostgreSQL en local

Depuis la racine du projet :

```sh
docker compose -f docker-compose.local.yml up -d
```

#### Voir les conteneurs en cours

```sh
docker ps
```

#### Voir les logs du conteneur PostgreSQL

```sh
docker compose -f docker-compose.local.yml logs -f
```

ou

```sh
docker logs -f crz_project_db
```

#### Arrêter le conteneur

```sh
docker compose -f docker-compose.local.yml down
```

#### Supprimer aussi le volume de données

Cette commande supprime aussi les données PostgreSQL stockées dans le volume Docker.

```sh
docker compose -f docker-compose.local.yml down -v
```

#### Rejouer init.sql et seed.sql

Les scripts présents dans /docker-entrypoint-initdb.d/ ne sont exécutés qu'au premier démarrage, lorsque le volume de données est vide.

📝 Si init.sql ou seed.sql sont modifiés, il faut repartir de zéro :

```sh
docker compose -f docker-compose.local.yml down -v
docker compose -f docker-compose.local.yml up -d
```

#### Entrer dans le conteneur

```sh
docker exec -it crz_project_db sh
```

#### Se connecter à PostgreSQL dans le conteneur

📝 Adapter `user` et `crz_project`

```sh
docker exec -it crz_project_db psql -U user -d crz_project
```

### PostgreSQL

#### Afficher les tables

```sql
\dt
```

#### Décrire une table

```sql
\d clothing_item
```

#### Voir les données d'une table

```sql
SELECT * FROM app_user;
SELECT * FROM closet;
SELECT * FROM clothing_category;
SELECT * FROM clothing_item;
SELECT * FROM outfit_item;
```

#### Quitter psql

```sql
\q
```

### Tester la connexion depuis le backend

Depuis le dossier backend :

```sh
npx ts-node src/db/db_test.ts
```

Résultat attendu :

```sh
✅ Environment variables loaded successfully
✅ Connected to the database successfully!
🕒 Database time: 2026-05-05T10:11:30.793Z
✅ PostgreSQL connection pool closed
✅ Connection test complete
```
