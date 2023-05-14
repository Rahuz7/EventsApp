#!/bin/bash

# Récupération des arguments en ligne de commande
CONTAINER_NAME=$1
IMPORT_FILE=$2

# Vérification des arguments
if [ -z "$CONTAINER_NAME" ] || [ -z "$IMPORT_FILE" ]; then
  echo "Usage: ./import.sh <container_name> <import_file>"
  exit 1
fi

# Import des données
docker exec -i $CONTAINER_NAME mysql --user=databases --password=databases   user-databases < "${IMPORT_FILE}_user.sql"
docker exec -i $CONTAINER_NAME mysql --user=databases --password=databases   event-databases < "${IMPORT_FILE}_event.sql"
docker exec -i $CONTAINER_NAME mysql --user=databases --password=databases   payment-databases < "${IMPORT_FILE}_payment.sql"
echo "Import terminé avec succès : $IMPORT_FILE"