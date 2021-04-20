var apiclient = (function () {

    function postLogin(loginRequest){
        var data = $.ajax({
            url: "https://eci-horarios-backend.herokuapp.com/api/v1/login",
            type: "POST",
            data: JSON.stringify(loginRequest),
            contentType: "application/json"
        });
        return data;
    }

    return {
        postLogin:postLogin,
    };

})();