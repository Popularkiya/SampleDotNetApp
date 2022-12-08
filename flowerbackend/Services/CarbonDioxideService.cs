using flowerbackend.Data;
using flowerbackend.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace flowerbackend.Services
{
    public class CarbonDioxideService
    {
        //database context
        private readonly IMongoCollection<CarbonDioxide> collection;

        public CarbonDioxideService(IOptions<DatabaseSettings> dbSettings)
        {
            var mongoClient = new MongoClient(dbSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(dbSettings.Value.DatabaseName);
            collection = mongoDatabase.GetCollection<CarbonDioxide>(dbSettings.Value.CarbonDioxideCollectionName);
        }

        public async Task<List<CarbonDioxide>> GetAsync() => await collection.Find(_ => true).ToListAsync();

        public async Task<CarbonDioxide?> GetAsync(string id) => await collection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(CarbonDioxide newBook) {
            newBook.Timestamp = DateTime.Now.ToString("MM/dd/yy H:mm:ss");
            if (newBook.Value >= 0.06) { newBook.Status = Constants.HIGH; }
            else if (newBook.Value <= 0.04) { newBook.Status = Constants.LOW; }
            else { newBook.Status = Constants.OK; }
            await collection.InsertOneAsync(newBook);
        }
    }
}
