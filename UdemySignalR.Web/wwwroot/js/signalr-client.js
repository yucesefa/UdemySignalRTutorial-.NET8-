$(document).ready(function () {

    const connection = new signalR.HubConnectionBuilder().withUrl("/exampletypesafehub").configureLogging(signalR.LogLevel.Information).build();
    // ilk bağlantı(protokol) rest mimarisi ile istek atılır.=>get/post/put
    //ardındaki süreç web socket ile bğlantı sağlanr
    //signalr desteklemiyorsa Server-Sent Events ya da Long Polling ile çift taraflı bağlantı sağlanır
    const broadcastMessageToAllClientHubMethodCall = "BroadcastMessageToAllClient";
    const receiveMessageForAllClientMethodCall = "ReceiveMessageForAllClient";

    const broadcastMessageToCallerClient = "BroadcastMessageToCallerClient";
    const receiveMessageForCallerClient = "ReceiveMessageForCallerClient";

    const receiveConnectedClientCountAllClient = "ReceiveConnectedClientCountAllClient"


    function start() {
        connection.start().then(() => console.log("Hub ile Bağlantı Kuruldu!"));
    }
    try {
        start(); // ilk bağnatuı kurulamadığında düşecek
    }
    catch {
        setTimeout(() => start(), 5000) //5 saniye sonra tekrardan start metoduna döncek 
    }
    connection.on(receiveMessageForAllClientMethodCall, (message) => {
        console.log("Gelen Mesaj", message);
    })
    connection.on(receiveMessageForCallerClient, (message) => {
        console.log("(Caller)Gelen Mesaj", message);
    })

    var span_client_count = $("#span-connected-client-count");
    connection.on(receiveConnectedClientCountAllClient, (count) => {
        span_client_count.text(count);
        console.log("connected client count", count);
    })

    connection.on(receiveConnectedClientCountAllClient, (count) => {
        console.log("Gelen Mesaj", message);
    })
    $("#btn-send-message-all-client").click(function () {
        const message = "sasaasassasa";

        connection.invoke(broadcastMessageToAllClientHubMethodCall, message).catch(err => console.error("hata", err));
    })
    $("#btn-send-message-caller-client").click(function () {
        const message = "sasaasassasa";

        connection.invoke(broadcastMessageToCallerClient, message).catch(err => console.error("hata", err));
    })

   
})