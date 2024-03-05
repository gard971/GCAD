var allDepartments = ["LSPD", "civillian", "SAHP", "LSCS", "communications"] //All departments accecible in the cad. DO NOT INCLUDE ADMIN HERE!!
var LEODeps = ["LSPD", "SAHP", "LSCS"] // COMMUNICATIONS/DISPATCH SHOULD NOT BE INCLUDED HERE!! WHEN INCLUDING NEW DEPARTMENTS HERE ALSO INCLUDE IT IN allDepartments above!!
socket.on("eror", (msg) => {
    alert(msg)
    console.error("ERROR server returned a status of 500 with following message: '"+msg+"'")
})
socket.on("refresh", () => {
    window.location.reload()
})
function check(needDeps){
    if(typeof(needDeps) != "boolean"){
        console.error("needDeps was not type of boolean. Operation canceled")
        return;
    }
    var username = getCookie("username")
    var key = getCookie("key")
    if(username && key){
      socket.emit("check", username, key, needDeps)
    } else{
        window.location.href="index.html"
    }
}
socket.on("notAllowed", () => {
    console.log(document.URL.includes("index.html") || !document.URL.includes(".html"))
    if(!document.URL.includes("index.html") && document.URL.includes(".html")){
        window.location.href="index.html"
    }
})
socket.on("disconnect", () =>{
    document.getElementById("ErrorNoCon").hidden = false
})
socket.on("connect_failed", () => {
    document.getElementById("ErrorNoCon").hidden = false
})
socket.on("connect_error", () => {
    document.getElementById("ErrorNoCon").hidden = false
})
function checkCookieEnabled(){
    var cookieEnabled = navigator.cookieEnabled;
    if (!cookieEnabled){ 
        document.cookie = "testcookie";
        cookieEnabled = document.cookie.indexOf("testcookie")!=-1;
    } else{
        var expires = new Date()
        expires.set
        expires.setHours(expires.getHours()+1)
        expires=`expires=${expires.toUTCString()}`
        setCookie("test", "abc")
    }
    console.log(cookieEnabled)
    return cookieEnabled || showCookieFail();
}

function showCookieFail(){
    window.location.href="NoCookie.html"
}checkCookieEnabled();
function setCookie(cname, cvalue, exdays){
    const d = new Date()
    if(exdays){
      d.setTime(d.getTime()+ (exdays*24*60*60*1000))
      let expires = `expires=${d.toUTCString()}`
      console.log(d.toUTCString())
      document.cookie = `${cname}=${cvalue};${expires};path=/`
    }
    else{
        document.cookie = `${cname}=${cvalue};path=/`
    }
    return true
}
function getCookie(cname){
    var name=`${cname}=`
    var decodedCookie = decodeURIComponent(document.cookie)
    var ca = decodedCookie.split(";")
    for(var i = 0; i<ca.length;i++){
        var c = ca[i]
        while(c.charAt(0) == " "){
            c = c.substring(1);
        }
        if(c.indexOf(name) == 0){
            return c.substring(name.length, c.length)
        }
    }
    return false
}