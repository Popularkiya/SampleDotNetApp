namespace flowerbackend.Models
{
    public class DatabaseSettings
    {
        public string ConnectionString { get; set; } = null!;

        public string DatabaseName { get; set; } = null!;

        public string TemperatureCollectionName { get; set; } = null!;
        public string HumidityCollectionName { get; set; } = null!;
        public string CarbonDioxideCollectionName { get; set; } = null!;
        public string UltravioletCollectionName { get; set; } = null!;
    }
}
