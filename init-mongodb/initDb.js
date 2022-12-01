//sanity check
print("################################################INITIALIZING DATABASE########################################")

// Create DB and collection
db = db.getSiblingDB('SI_175237')

db.createUser({
  user: 'root',
  pwd: 'student',
  roles: [
    {
      role: 'readWrite',
      db: 'SI_175237',
    },
  ],
});

db.createCollection('Temperature', { capped: false });
db.createCollection('Humidity', { capped: false });
db.createCollection('Ultraviolet', { capped: false });
db.createCollection('CarbonDioxide', { capped: false });

print("################################################END OF THE INITIALIZATION########################################")
