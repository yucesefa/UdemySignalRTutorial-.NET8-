using CovidChart.API.Hubs;
using CovidChart.API.Models;
using Microsoft.AspNetCore.SignalR;

namespace CovidChart.API.Services
{
    public class CovidService
    {
        private readonly AppDbContext _context;
        private readonly IHubContext<CovidHub> _hubContext;
        public CovidService(AppDbContext context, IHubContext<CovidHub> hubContext)
        {
            _context = context;
            _hubContext = hubContext;
        }
        public IQueryable<Covid> GetList()
        {
            return _context.Covids.AsQueryable();
        }
        public async Task SaveCovid(Covid covid)
        {
            await _context.AddAsync(covid);
            await _context.SaveChangesAsync();
            await _hubContext.Clients.All.SendAsync("ReceiveCovidList", "data");
        }
    }
}
