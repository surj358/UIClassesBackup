
var socket = io("http://localhost:8081");

socket.on("receivemsg", (data) => {
    addMsgToBlock(data, 'receive');
});


var sendMessage = () => {
    var msg = $("#userMsg").val();
    socket.emit("userSendMsg", msg);
    $("#userMsg").val('');
    addMsgToBlock(msg, 'send');
}

var addMsgToBlock = (msg, type) => {
    
    var divTag = $("<div/>").text(msg);
    if (type == 'send') {
        divTag.addClass("sendMsg");
    } else {
        divTag.addClass("receiveMsg");
    }
    $(".msgblock").append(divTag);
    
}