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

    const broadCastStreamDataToAllClient = "BroadCastStreamDataToAllClient";
    const receiveMessageAsStreamForAllClient = "ReceiveMessageAsStreamForAllClient";

    const broadCastStreamProductToAllClient = "BroadCastStreamProductToAllClient";
    const receiveProductAsStreamForAllClient = "ReceiveProductAsStreamForAllClient";

    //subscribe
    connection.on(receiveMessageAsStreamForAllClient, (name) => {
        $("#streamBox").append(`<p>${name}</>`)
    })

    connection.on(receiveProductAsStreamForAllClient, (product) => {
        $("#streamBox").append(`<p>${product.id}-${product.name}-${product.price}</>`)
    })

    //onclick

    $("#btn_FromClient_ToHub").click(function () {
        const names = $("#txt_stream").val();
        const nameAsChunk = names.split(";");
        const subject = new signalR.Subject();

        connection.send(broadCastStreamDataToAllClient, subject).catch(err => console.error(err))

        nameAsChunk.forEach(name => {
            subject.next(name)
        });

        subject.complete();
    })



    $("#btn_FromClient_ToHub2").click(function () {

        const productList = [
            {id:1,name:"pen 1",price:100},
            {id:2,name:"pen 2",price:200},
            {id:3,name:"pen 3",price:300}
        ]

        const subject = new signalR.Subject();

        connection.send(broadCastStreamProductToAllClient, subject).catch(err => console.error(err))

        productList.forEach(product => {
            subject.next(product)
        });

        subject.complete();
    })





    start();

});

