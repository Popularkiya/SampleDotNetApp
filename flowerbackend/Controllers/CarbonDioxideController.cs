using flowerbackend.Models;
using flowerbackend.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace flowerbackend.Controllers
{
    [Route("api/carbondioxide")]
    [ApiController]
    public class CarbonDioxideController : ControllerBase
    {
        private readonly CarbonDioxideService carbonDioxideService;

        public CarbonDioxideController(CarbonDioxideService tempService)
        {
            carbonDioxideService = tempService;
        }

        [HttpGet]
        public async Task<List<CarbonDioxide>> Get() => await carbonDioxideService.GetAsync();

        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<CarbonDioxide>> Get(string id)
        {
            var temp = await carbonDioxideService.GetAsync(id);

            if (temp is null)
            {
                return NotFound();
            }

            return temp;
        }

        [HttpPost]
        public async Task<IActionResult> Post(CarbonDioxide newTemp)
        {
            await carbonDioxideService.CreateAsync(newTemp);
            return CreatedAtAction(nameof(Get), new { id = newTemp.Id }, newTemp);
        }
    }
}
