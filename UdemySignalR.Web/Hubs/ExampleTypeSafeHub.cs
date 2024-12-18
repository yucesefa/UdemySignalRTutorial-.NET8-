using Microsoft.AspNetCore.SignalR;

namespace UdemySignalR.Web.Hubs
{
    public class ExampleTypeSafeHub:Hub<IExampleTypeSafeHub>
    {
        public async Task BroadcastMessageAllClient(string message)
        {
            await Clients.All.ReceiveMessageForAllClient(message);

        }
    }
}
