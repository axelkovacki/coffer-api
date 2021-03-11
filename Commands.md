docker exec mongodb mongo -u root -p 123456 --eval "db.adminCommand({setParameter: 1, internalQueryExecMaxBlockingSortBytes: 435544320})"
