// See https://aka.ms/new-console-template for more information
using Microsoft.AspNetCore.SignalR.Client;
using SignalRClientConsoleApp;

Console.WriteLine("SignalR Console Client");

var connection = new HubConnectionBuilder().WithUrl("https://localhost:7160/exampleTypeSafeHub").Build();
connection.StartAsync().ContinueWith((result) =>
{
    Console.WriteLine(result.IsCompletedSuccessfully ? "Connected" : "Connection Failed!");
});

connection.On<Product>(methodName: "ReceiveTypedMessageForAllClient", handler: (product) =>
{
    Console.WriteLine($"Received Message:{product.Id}-{product.Name}-{product.Price}");

});
Console.ReadKey();