﻿namespace UdemySignalR.Web.Hubs
{
    public interface IExampleTypeSafeHub
    {
        Task ReceiveMessageForAllClient(string message);
    }
}
