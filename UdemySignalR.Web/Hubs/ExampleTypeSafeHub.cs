using Microsoft.AspNetCore.SignalR;
using UdemySignalR.Web.Models;

namespace UdemySignalR.Web.Hubs
{
    public class ExampleTypeSafeHub:Hub<IExampleTypeSafeHub>
    {
        private static int connectedClientCount = 0;
        public async Task BroadcastMessageToAllClient(string message)
        {
            await Clients.All.ReceiveMessageForAllClient(message);

        }
        public async Task BroadcastTypedMessageToAllClient(Product product)
        {
            await Clients.All.ReceiveTypedMessageForAllClient(product);

        }
        public async Task BroadcastMessageToCallerClient(string message)
        {

            await Clients.Caller.ReceiveMessageForCallerClient(message);

        }
        public async Task BroadcastMessageToOtherClient(string message)
        {

            await Clients.Others.ReceiveMessageForOthersClient(message);

        }

        public async Task BroadcastMessageToIndividualClient( string connectionId ,string message)
        {

            await Clients.Client(connectionId).ReceiveMessageForIndividualClient(message);

        }

        public async Task BroadCastMessageToGroupClients(string groupName,string message)
        {
            await Clients.Group(groupName).ReceiveMessageForGroupClients(message);
        }
        public async Task AddGroup(string groupName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);

            await Clients.Caller.ReceiveMessageForCallerClient($"{groupName} Grubuna Eklendin");

            //await Clients.Others.ReceiveMessageForOthersClient($"Kullanıcı({Context.ConnectionId}) {groupName} dahil oldu");

            await Clients.Group(groupName).ReceiveMessageForGroupClients($"Kullanıcı({Context.ConnectionId}) {groupName} dahil oldu");
        }
        public async Task RemoveGroup(string groupName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);

            await Clients.Caller.ReceiveMessageForCallerClient($"{groupName} grubundan çıktınız");

            //await Clients.Others.ReceiveMessageForOthersClient($"Kullanıcı({Context.ConnectionId}) {groupName} grubundan çıktı");

            await Clients.Group(groupName).ReceiveMessageForGroupClients($"Kullanıcı({Context.ConnectionId}) {groupName} grubundan çıktı");
        }


        public async Task BroadCastStreamDataToAllClient(IAsyncEnumerable<string> nameAsChunks)
        {
           await foreach (var name in nameAsChunks)
            {
                await Task.Delay(1000);
                await Clients.All.ReceiveMessageAsStreamForAllClient(name);
                //js tarafında async olarak veri göndercek receive metodu aldıkca client'ları bilgilendiricek
            }

        }

        public async Task BroadCastStreamProductToAllClient(IAsyncEnumerable<Product> productAsChunks)
        {
            await foreach (var product in productAsChunks)
            {
                await Task.Delay(1000);
                await Clients.All.ReceiveProductAsStreamForAllClient(product);
                //js tarafında async olarak veri göndercek receive metodu aldıkca client'ları bilgilendiricek
            }

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
