$(document).ready(function () {

    const connection = new signalR.HubConnectionBuilder().withUrl("/exampletypesafehub").configureLogging(signalR.LogLevel.Information).build();
    // ilk bağlantı(protokol) rest mimarisi ile istek atılır.=>get/post/put
    //ardındaki süreç web socket ile bğlantı sağlanr
    //signalr desteklemiyorsa Server-Sent Events ya da Long Polling ile çift taraflı bağlantı sağlanır
    const broadcastMessageToAllClientHubMethodCall = "BroadcastMessageToAllClient";
    const receiveMessageForAllClientMethodCall = "ReceiveMessageForAllClient";

    const broadcastMessageToCallerClient = "BroadcastMessageToCallerClient";
    const receiveMessageForCallerClient = "ReceiveMessageForCallerClient";

    const broadcastMessageToOtherClient = "BroadcastMessageToOtherClient";
    const receiveMessageForOthersClient = "ReceiveMessageForOthersClient";

    const broadcastMessageToIndividualClient = "BroadcastMessageToIndividualClient";
    const receiveMessageForIndividualClient = "ReceiveMessageForIndividualClient";

    const receiveConnectedClientCountAllClient = "ReceiveConnectedClientCountAllClient"


    function start() {
        connection.start().then(() => {
            console.log("Hub ile Bağlantı Kuruldu!");
            $("#connectionId").html(`Connection Id:${connection.connectionId}`);
        });
    }
    try {
        start(); // ilk bağnatuı kurulamadığında düşecek
    }
    catch {
        setTimeout(() => start(), 5000) //5 saniye sonra tekrardan start metoduna döncek 
    }


    const span_client_count = $("#span-connected-client-count");
    connection.on(receiveConnectedClientCountAllClient, (count) => {
        span_client_count.text(count);
        console.log("connected client count", count);
    })


    //subscribe
    connection.on(receiveMessageForAllClientMethodCall, (message) => {
        console.log("Gelen Mesaj", message);
    })
    connection.on(receiveMessageForCallerClient, (message) => {
        console.log("(Caller)Gelen Mesaj", message);
    })
    connection.on(receiveMessageForOthersClient, (message) => {
        console.log("(Other)Gelen Mesaj", message);
    })
    connection.on(receiveMessageForIndividualClient, (message) => {
        console.log("(Individual)Gelen Mesaj", message);
    })

    connection.on(receiveConnectedClientCountAllClient, (count) => {
        console.log("Gelen Mesaj", message);
    })

    $("#btn-send-message-all-client").click(function () {
        const message = "sasaasassasa";
        connection.invoke(broadcastMessageToAllClientHubMethodCall, message).catch(err => console.error("hata", err));
        console.log("mesaj gönderildi");
    })
    $("#btn-send-message-caller-client").click(function () {
        const message = "sasaasassasa";
        connection.invoke(broadcastMessageToCallerClient, message).catch(err => console.error("hata", err));
        console.log("mesaj gönderildi");
    })
    $("#btn-send-message-other-client").click(function () {
        const message = "(other)sasaasassasa";
        connection.invoke(broadcastMessageToOtherClient, message).catch(err => console.error("hata", err));
        console.log("mesaj gönderildi");
    })
    $("#btn-send-message-individual-client").click(function () {
        const message = "hello mike";
        const connectionId = $("#text-connectionId").val();
        connection.invoke(broadcastMessageToIndividualClient, connectionId, message).catch(err => console.error("hata", err));
        console.log("mesaj gönderildi");

    })

})