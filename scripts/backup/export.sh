#!/bin/bash

# Récupération des arguments en ligne de commande
CONTAINER_NAME=$1
EXPORT_FILE=$2

# Vérification des arguments
if [ -z "$CONTAINER_NAME" ] || [ -z "$EXPORT_FILE" ]; then
  echo "Usage: ./export.sh <container_name> <export_file>"
  exit 1
fi

# Export des données
docker exec -i $CONTAINER_NAME mysqldump -udatabases -pdatabases user-databases --no-tablespaces > "${EXPORT_FILE}_user.sql"
docker exec -i $CONTAINER_NAME mysqldump -udatabases -pdatabases event-databases --no-tablespaces > "${EXPORT_FILE}_event.sql"
docker exec -i $CONTAINER_NAME mysqldump -udatabases -pdatabases payment-databases --no-tablespaces > "${EXPORT_FILE}_payment.sql"

echo "Export terminé avec succès : $EXPORT_FILE"