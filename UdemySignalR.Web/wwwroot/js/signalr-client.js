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

    const receiveConnectedClientCountAllClient = "ReceiveConnectedClientCountAllClient";


    const broadCastMessageToGroupClients = "BroadCastMessageToGroupClients";
    const receiveMessageForGroupClients = "ReceiveMessageForGroupClients";

    const receiveTypedMessageForAllClient = "ReceiveTypedMessageForAllClient";
    const broadcastTypedMessageToAllClient = "BroadcastTypedMessageToAllClient";

    const groupA = "GroupA";
    const groupB = "GroupB";
    let currentGroupList = []; 



    $(document).ready(function () {
        const connection = new signalR.HubConnectionBuilder().withUrl("/exampletypesafehub").configureLogging(signalR.LogLevel.Information).build();
        async function start() {
            try {
                await connection.start().then(() => {
                    console.log("Hub ile Bağlantı Kuruldu!");
                    $("#connectionId").html(`Connection Id:${connection.connectionId}`);
                });
            }
            catch (err) {
                console.error("hub ile bağlantı kurulamadı", err);
                setTimeout(() => start(), 5000) //5 saniye sonra tekrardan start metoduna döncek 
            }
        }
        connection.onclose(async () => {
            await start();
        })
        start();

    });


    function refreshGroupList() {
        $("#groupList").empty();
        currentGroupList.forEach(x => {
            $("#groupList").append(`<p>${x}</p>`)
        })
    }
    $("#btn-groupA-add").click(function () {
        if (currentGroupList.includes(groupA)) return;

        connection.invoke("AddGroup", groupA).then(() => {
            currentGroupList.push(groupA);
            refreshGroupList();
        })
    })
    $("#btn-groupA-remove").click(function () {
        if (!currentGroupList.includes(groupA)) return;
        connection.invoke("RemoveGroup", groupA).then(() => {
            currentGroupList = currentGroupList.filter(x => x === !groupA);
            refreshGroupList();
        })
    })

    $("#btn-groupB-add").click(function () {
        if (currentGroupList.includes(groupB)) return;
        connection.invoke("AddGroup", groupB).then(() => {
            currentGroupList.push(groupB);
            refreshGroupList();
        })
    })

    $("#btn-groupB-remove").click(function () {
        if (!currentGroupList.includes(groupB)) return;
        connection.invoke("RemoveGroup", groupB).then(() => {
            currentGroupList = currentGroupList.filter(x => x === !groupB);
            refreshGroupList();
        })
    })


    $("#btn-groupA-send-message").click(function () {
        const message = "Grup A Mesaj";
        connection.invoke(broadCastMessageToGroupClients, groupA, message).catch(err => console.error("hata", err));
        console.log("mesaj gönderildi");
    })
    $("#btn-groupB-send-message").click(function () {
        const message = "Grup B Mesaj";
        connection.invoke(broadCastMessageToGroupClients, groupB, message).catch(err => console.error("hata", err));
        console.log("mesaj gönderildi");
    })
    connection.on(receiveMessageForGroupClients, (message) => {
        console.log("Gelen Mesaj", message);
    })



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
    connection.on(receiveTypedMessageForAllClient, (product) => {
        console.log("Gelen Mesaj", product);
    })

    //click
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
    $("#btn-send-typed-message-all-client").click(function () {
        const product = { id: 1, name: "pen 1", price: 200 };
        connection.invoke(broadcastTypedMessageToAllClient, product).catch(err => console.error("hata", err));
        console.log("ürün gönderildi");

    });
})