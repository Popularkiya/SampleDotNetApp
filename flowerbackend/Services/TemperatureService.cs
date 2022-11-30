using flowerbackend.Models;
using System.Collections.Generic;
using MongoDB.Driver;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;

namespace flowerbackend.Services
{
    public class TemperatureService
    {
        //database context
        private readonly IMongoCollection<Temperature> collection;

        public TemperatureService(IOptions<DatabaseSettings> dbSettings)
        {
            var mongoClient = new MongoClient(dbSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(dbSettings.Value.DatabaseName);
            collection = mongoDatabase.GetCollection<Temperature>(dbSettings.Value.TemperatureCollectionName);
        }

        public async Task<List<Temperature>> GetAsync() => await collection.Find(_ => true).ToListAsync();

        public async Task<Temperature?> GetAsync(string id) => await collection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(Temperature newBook) => await collection.InsertOneAsync(newBook);
    }
}
