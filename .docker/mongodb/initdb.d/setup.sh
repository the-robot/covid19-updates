#!/usr/bin/env bash
echo "\n\nCreating mongo users..."
mongo --authenticationDatabase admin --host localhost -u "$MONGO_INITDB_ROOT_USERNAME" -p "$MONGO_INITDB_ROOT_PASSWORD" "$MONGO_DATABASE" --eval "
db.createUser({
    user: $(_js_escape "$MONGO_NORMAL_USER"),
    pwd: $(_js_escape "$MONGO_NORMAL_PASSWORD"),
    roles: [
        { role: \"dbOwner\", db: $(_js_escape "$MONGO_DATABASE") }
    ]
});"
echo "Mongo users created.\n\n"