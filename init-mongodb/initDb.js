//sanity check
print("################################################INITIALIZING DATABASE########################################")

// Create DB and collection
db = new Mongo().getDB("FlowerDatabase");
db.createCollection("Temperature", { capped: false });
db.createCollection("Humidity", { capped: false });
db.createCollection("Ultraviolet", { capped: false });
db.createCollection("CarbonDioxide", { capped: false });