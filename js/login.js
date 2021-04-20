
var login = (function () {

    function redirectToLogin(){
        if(window.localStorage.getItem('isLogged')==="true"){
            alert("Ya estás logueado");
        }else{
            window.location.href='login.html';
        }
    }

    function doLogin() {
        var email = document.getElementById("email");
        var passw = document.getElementById("password");
        var user = {email: email, password: passw};
        apiclient.postLogin(user)
            .then(function(data, textStatus, request) {
                console.log(data);
                localStorage.setItem("idUser",data.id);
                localStorage.setItem("username",data.email);
                localStorage.setItem("isLogged",true);
                localStorage.setItem("isAdmin",data.admin);
                window.location.href='index.html';
            }).catch( (e) => {
                alert("Credenciales invalidas");
        });
    }

    function logout() {
        localStorage.removeItem("idUser");
        localStorage.removeItem("username");
        localStorage.removeItem("isLogged");
        localStorage.removeItem("isAdmin");
        alert("Logout exitoso");
    }

    return {
        doLogin:doLogin,
        redirectToLogin:redirectToLogin,
        logout:logout
    };
})();