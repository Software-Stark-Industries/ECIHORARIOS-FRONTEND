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

    function getSubject(idSubject,callback){
        var data = $.ajax({
            url: "https://eci-horarios-backend.herokuapp.com/api/v1/subjects/"+idSubject,
            type: "GET",
            success : function (data, text) {
                callback(data);
            },
            error: function (request){
                alert("La clase no existe");
                window.location.href='searchSubject.html';
            }
        });
    }


    return {
        postLogin:postLogin,
        getSubject:getSubject
    };

})();