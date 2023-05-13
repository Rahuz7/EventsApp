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
docker exec -i $CONTAINER_NAME mysqldump -udatabases -pdatabases databases --no-tablespaces > "$EXPORT_FILE"

echo "Export terminé avec succès : $EXPORT_FILE"