var apiclient = (function () {

    function postLogin(loginRequest){
        var data = $.ajax({
            url: "https://eci-horarios-backend.herokuapp.com/api/v1/login",
            type: "POST",
            data: JSON.stringify(loginRequest),
            contentType: "application/json",
            error: function (request){
                alert(request.responseText);
            }
        });
        return data;
    }

    function addSubject(subject){
        var data = $.ajax({
            //url: "https://eci-horarios-backend.herokuapp.com/api/v1/subjects",
            url: "http://localhost:8080/api/v1/subjects",
            type: "POST",
            data: JSON.stringify(subject),
            contentType: "application/json",
            error: function (request){
                alert(request.responseText);
            }
        });
        return data;
    }

    function addGroup(group,subjectId){
        console.log("En apiclient: ",group);
        var data = $.ajax({
            //url: "https://eci-horarios-backend.herokuapp.com/api/v1/subjects/"+subjectId,
            url: "http://localhost:8080/api/v1/subjects/"+subjectId,
            type: "POST",
            data: JSON.stringify(group),
            contentType: "application/json",
            error: function (request){
                alert(request.responseText);
            }
        });
        return data;
    }

    function getSubject(idSubject,callback){
        console.log("Entrando en getSubject!: ",idSubject);
        var data = $.ajax({
            //url: "https://eci-horarios-backend.herokuapp.com/api/v1/subjects/"+idSubject,
            url: "http://localhost:8080/api/v1/subjects/"+idSubject,
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
        getSubject:getSubject,
        addSubject:addSubject,
        addGroup:addGroup
    };

})();