$(document).ready(function () {

    const connection = new signalR.HubConnectionBuilder().withUrl("/examplehub").configureLogging(signalR.LogLevel.Information).build();
    // ilk bağlantı(protokol) rest mimarisi ile istek atılır.=>get/post/put
    //ardındaki süreç web socket ile bğlantı sağlanr
    //signalr desteklemiyorsa Server-Sent Events ya da Long Polling ile çift taraflı bağlantı sağlanır

    function start() {
        connection.start().then(() => console.log("Hub ile Bağlantı Kuruldu!"));
    }
    try {
        start(); // ilk bağnatuı kurulamadığında düşecek
    }
    catch {
        setTimeout(() => start(),5000) //5 saniye sonra tekrardan start metoduna döncek 
    }
})