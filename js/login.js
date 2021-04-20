
var login = (function () {

    function redirectToLogin(){
        if(window.localStorage.getItem('isLogged')==="true"){
            alert("Ya estás logueado");
        }else{
            window.location.href='login.html';
        }
    }

    function doLogin() {
        var email = $("#email").val();
        var passw = $("#password").val();
        var user = {email: email, password: passw};
        apiclient.postLogin(user)
            .then(function(data, textStatus, request) {
                localStorage.setItem("idUser",data.id);
                localStorage.setItem("username",data.email);
                localStorage.setItem("isLogged",true);
                window.location.href='index.html';
            }).catch( (e) => {
                alert("Credenciales invalidas");
        });
    }

    function logout() {
        localStorage.removeItem("idUser");
        localStorage.removeItem("username");
        localStorage.removeItem("isLogged");
        alert("Logout exitoso");
    }

    return {
        doLogin:doLogin,
        redirectToLogin:redirectToLogin,
        logout:logout
    };
})();