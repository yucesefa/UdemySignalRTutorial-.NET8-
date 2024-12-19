using Microsoft.AspNetCore.SignalR;

namespace UdemySignalR.Web.Hubs
{
    public class ExampleTypeSafeHub:Hub<IExampleTypeSafeHub>
    {
        private static int connectedClientCount = 0;
        public async Task BroadcastMessageToAllClient(string message)
        {
            await Clients.All.ReceiveMessageForAllClient(message);

        }
        public async Task BroadcastMessageToCallerClient(string message)
        {

            await Clients.Caller.ReceiveMessageForCallerClient(message);

        }
        public async Task BroadcastMessageToOtherClient(string message)
        {

            await Clients.Others.ReceiveMessageForOthersClient(message);

        }
        public async override Task OnConnectedAsync()
        {
            connectedClientCount++;
            await Clients.All.ReceiveConnectedClientCountAllClient(connectedClientCount);
            await base.OnConnectedAsync();
        }
        public async override Task OnDisconnectedAsync(Exception? exception)
        {
            connectedClientCount--;
            await Clients.All.ReceiveConnectedClientCountAllClient(connectedClientCount);
            await base.OnDisconnectedAsync(exception);
        }
       
    }
}
