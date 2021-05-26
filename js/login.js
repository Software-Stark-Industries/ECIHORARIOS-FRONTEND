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
                console.log("RETORNO DEL SERVIDOR DE LOGIN: ",data);                
                localStorage.setItem("idUser",data.user.id);
                localStorage.setItem("email",data.user.email);
                localStorage.setItem("name",data.user.name);
                localStorage.setItem("creditos",data.user.creditos);
                localStorage.setItem("isLogged",true);
                localStorage.setItem("isAdmin",data.user.admin);
                localStorage.setItem('token', JSON.stringify(data.accessToken));                
                localStorage.setItem('user', JSON.stringify(data.user));
                alert("Ingreso al sistema con éxito.");
                window.location.href='index.html';
        });
    }

    function doRegister() {
        var email = $("#email").val();
        var passw = $("#password").val();
        var name = $("#name").val();
        var user = {name: name, email: email, password: passw};
        apiclient.postRegister(user)
            .then(function(data, textStatus, request) {
                console.log("RETORNO DEL SERVIDOR DE REGISTER: ",data);
                if(data === "USER_CREATED"){
                    alert("Usuario creado con éxito!");
                    window.location.href='login.html';
                }else{
                    console.log("no esta registrado.")
                }
        });
    }

    function logout() {
        localStorage.removeItem("idUser");
        localStorage.removeItem("username");
        localStorage.removeItem("isLogged");
        localStorage.removeItem("isAdmin");
        localStorage.removeItem("idUser");
        localStorage.removeItem("email");
        localStorage.removeItem("name");
        localStorage.removeItem("creditos");
        localStorage.removeItem("isLogged");
        localStorage.removeItem("isAdmin");
        localStorage.removeItem('token');                
        localStorage.removeItem('user');
        localStorage.removeItem('planPreinscripcion');
        
        alert("Logout exitoso");
        window.location.href='index.html';
    }

    return {
        doLogin:doLogin,
        doRegister:doRegister,
        redirectToLogin:redirectToLogin,
        logout:logout
    };
})();