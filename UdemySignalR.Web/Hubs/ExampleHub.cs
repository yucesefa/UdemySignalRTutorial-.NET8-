using Microsoft.AspNetCore.SignalR;

namespace UdemySignalR.Web.Hubs
{
    public class ExampleHub:Hub
    {
        public async Task BroadcastMessageAllClient(string message)
        {
            //ui tarafından tetiklenecek metod çağrılacak ve javascriptteki bir metodu tetikleyecek
            await Clients.All.SendAsync("ReceiveMessageForAllClient",message);
        }
    }
}
