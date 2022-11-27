//sanity check
print("################################################INITIALIZING DATABASE########################################")

// Create user
dbAdmin = db.getSiblingDB("admin");
dbAdmin.createUser({
  user: "root",
  pwd: "student",
  roles: [{ role: "userAdminAnyDatabase", db: "admin" }],
});

// Authenticate user
dbAdmin.auth({
  user: "root",
  pwd: "student",
  digestPassword: true,
});

// Create DB and collection
db = new Mongo().getDB("SI_175237");
db.createCollection("Temperature", { capped: false });
db.createCollection("Humidity", { capped: false });
db.createCollection("Ultraviolet", { capped: false });
db.createCollection("CarbonDioxide", { capped: false });