using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace flowerbackend.Models
{
    public class Temperature
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("Value")]
        public double Value { get; set; }
    }
}
