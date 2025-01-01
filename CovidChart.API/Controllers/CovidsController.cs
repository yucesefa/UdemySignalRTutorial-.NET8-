﻿using CovidChart.API.Models;
using CovidChart.API.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CovidChart.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CovidsController : ControllerBase
    {
        private readonly CovidService _covidService;

        public CovidsController(CovidService covidService)
        {
            _covidService = covidService;
        }
        [HttpPost]
        public async Task<IActionResult> SaveCovid(Covid covid)
        {
            await _covidService.SaveCovid(covid);
            IQueryable<Covid> covidList = _covidService.GetList();
            return Ok(covidList);
        }
        [HttpGet]
        public async Task<IActionResult> InitializeCovid()
        {
            Random random = new Random();
            foreach (var item in Enumerable.Range(1, 10))
            {
                foreach (ECity item1 in Enum.GetValues(typeof(ECity)))
                {
                    var newCovid = new Covid { City = item1, Count = random.Next(100, 1000), CovidDate = DateTime.Now.AddDays(2) };
                    await _covidService.SaveCovid(newCovid);
                    System.Threading.Thread.Sleep(1000);
                }
            }
            return Ok("Covid 19 dataları veritabanına kaydedildi");
        }
    }
}
