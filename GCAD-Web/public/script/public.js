var allDepartments = ["LSPD", "civillian", "SAHP", "LSCS", "communications"] //All departments accecible in the cad. DO NOT INCLUDE ADMIN HERE!!
var LEODeps = ["LSPD", "SAHP", "LSCS"] // COMMUNICATIONS/DISPATCH SHOULD NOT BE INCLUDED HERE!! WHEN INCLUDING NEW DEPARTMENTS HERE ALSO INCLUDE IT IN allDepartments above!!
socket.on("eror", (msg) => {
    alert(msg)
    console.error("ERROR server returned a status of 500 with following message: '"+msg+"'")
})
socket.on("refresh", () => {
    alert("The server requested all clients to refresh the page. Probably becuase of a server restart. This will now automaticly happen")
    window.location.reload()
})
function check(needDeps){
    if(typeof(needDeps) != "boolean"){
        console.error("needDeps was not type of boolean. Operation canceled")
        return;
    }
    socket.emit("check", localStorage.getItem("username"), localStorage.getItem("key"), needDeps)
}
socket.on("notAllowed", () => {
    window.location.href="index.html"
})
socket.on("disconnect", () =>{
    alert("Could not establish connection with the server")
})
socket.on("connect_failed", () => {
    alert("Could not establish connection with the server")
})
socket.on("connect_error", () => {
    alert("Could not establish connection with the server")
})
function checkCookie(){
    var cookieEnabled = navigator.cookieEnabled;
    if (!cookieEnabled){ 
        document.cookie = "testcookie";
        cookieEnabled = document.cookie.indexOf("testcookie")!=-1;
    }
    return cookieEnabled || showCookieFail();
}

function showCookieFail(){
    window.location.href="cookie disabled"
}
checkCookie();