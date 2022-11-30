using flowerbackend.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace flowerbackend.Services
{
    public class UltravioletService
    {
        //database context
        private readonly IMongoCollection<Ultraviolet> collection;

        public UltravioletService(IOptions<DatabaseSettings> dbSettings)
        {
            var mongoClient = new MongoClient(dbSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(dbSettings.Value.DatabaseName);
            collection = mongoDatabase.GetCollection<Ultraviolet>(dbSettings.Value.UltravioletCollectionName);
        }

        public async Task<List<Ultraviolet>> GetAsync() => await collection.Find(_ => true).ToListAsync();

        public async Task<Ultraviolet?> GetAsync(string id) => await collection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(Ultraviolet newBook) => await collection.InsertOneAsync(newBook);
    }
}
