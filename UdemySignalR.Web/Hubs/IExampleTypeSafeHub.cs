using UdemySignalR.Web.Models;

namespace UdemySignalR.Web.Hubs
{
    public interface IExampleTypeSafeHub
    {
        Task ReceiveMessageForAllClient(string message);
        Task ReceiveTypedMessageForAllClient(Product product);
        Task ReceiveMessageForCallerClient(string message);
        Task ReceiveMessageForOthersClient(string message);
        Task ReceiveMessageForIndividualClient(string message);
        Task ReceiveConnectedClientCountAllClient(int clientCount);

        Task ReceiveMessageForGroupClients(string message);

        
        
    }
}
