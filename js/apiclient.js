var apiclient = (function () {

    let materiasPreinscritas = [];

    function postLogin(loginRequest){
        console.log("LOGIN REQUEST: ",loginRequest);
        console.log("TO JSON LOGIN: ",JSON.stringify(loginRequest));        
        var data = $.ajax({            
            //url: "https://backendservicioseci.herokuapp.com/login/",            
            url: "http://localhost:8080/login/",            
            type: "POST",
            data: JSON.stringify(loginRequest),
            contentType: "application/json",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",                
            },
            error: function (request){
                alert(request.responseText);
            }
        });
        return data;
        
    }

    function postRegister(registerRequest){
        console.log("REGISTER REQUEST: ",registerRequest);        
        var data = $.ajax({            
            //url: "https://backendservicioseci.herokuapp.com/login/register",            
            url: "http://localhost:8080/login/register",            
            type: "POST",
            data: JSON.stringify(registerRequest),
            contentType: "application/json",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",                
            },
            success: function(request){                                            
                console.log("request success: ",request);
            },
            error: function (request){
                alert(request.responseText);
            }
        });
        return data       
    }

    function addSubject(subject){
        var data = $.ajax({
            //url: "https://backendservicioseci.herokuapp.com/api/v1/subjects",            
            url: "http://localhost:8080/api/v1/subjects",
            type: "POST",
            data: JSON.stringify(subject),
            contentType: "application/json",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": 'Bearer ' + localStorage.getItem('token'),          
            },
            error: function (request){
                alert(request.responseText);
            }
        });
        return data;
    }

    function savePreinscription(subjectsEnrolled){
        console.log("\n A punto de mandar a back: ",subjectsEnrolled);
        
        var data = $.ajax({            
            //url: "https://backendservicioseci.herokuapp.com/api/v1/subjects/preinscription/"+localStorage.getItem('email'),            
            url: "http://localhost:8080/api/v1/subjects/preinscription/"+localStorage.getItem('email'),
            type: "POST",
            data: JSON.stringify(subjectsEnrolled),
            contentType: "application/json",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": 'Bearer ' + localStorage.getItem('token'),          
            },
            error: function (request){
                alert(request.responseText);
            }
        });
        return data;
        
    }

    function getPlan(){        
        console.log("EN API CLIENT PLAN PREINSCRITAS: ",materiasPreinscritas);
        return materiasPreinscritas;
    }

    function savePlan(subjectsEnrolled){
        console.log("\n A punto de mandar a back: ",subjectsEnrolled);
        materiasPreinscritas = subjectsEnrolled;        
        /*
        var data = $.ajax({
            //url: "https://eci-horarios-backend.herokuapp.com/api/v1/subjects",
            url: "http://localhost:8080/api/v1/subjects/plan/"+localStorage.getItem('email'),
            type: "POST",
            data: JSON.stringify(subjectsEnrolled),
            contentType: "application/json",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": 'Bearer ' + localStorage.getItem('token'),          
            },
            error: function (request){
                alert(request.responseText);
            }
        });
        return data;
        */
    }


    function makeInscription(subjectsEnrolled){
        console.log("\n A punto de mandar a back: ",subjectsEnrolled);
        materiasPreinscritas = subjectsEnrolled;        
        
        var data = $.ajax({            
            //url: "https://backendservicioseci.herokuapp.com//api/v1/subjects/inscription/"+localStorage.getItem('email'),            
            url: "http://localhost:8080/api/v1/subjects/inscription/"+localStorage.getItem('email'),
            type: "POST",
            data: JSON.stringify(subjectsEnrolled),
            contentType: "application/json",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": 'Bearer ' + localStorage.getItem('token'),          
            },
            error: function (request){
                alert(request.responseText);
            }
        });
        return data;
        
    }
    
    

    

    function addGroup(group,subjectId){
        console.log("En apiclient: ",group);
        var data = $.ajax({            
            //url: "https://backendservicioseci.herokuapp.com/api/v1/subjects/"+subjectId,            
            url: "http://localhost:8080/api/v1/subjects/"+subjectId,
            type: "POST",
            data: JSON.stringify(group),
            contentType: "application/json",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": 'Bearer ' + localStorage.getItem('token'),          
            },
            error: function (request){
                alert(request.responseText);
            }
        });
        return data;
    }

    function getSubject(idSubject,callback){
        console.log("Entrando en getSubject!: ",idSubject);
        var data = $.ajax({            
            //url: "https://backendservicioseci.herokuapp.com/api/v1/subjects/"+idSubject,          
            url: "http://localhost:8080/api/v1/subjects/"+idSubject,
            type: "GET",
            success : function (data, text) {
                callback(data);
            },
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": 'Bearer ' + localStorage.getItem('token'),          
            },
            error: function (request){
                alert("La clase no existe");
                window.location.href='searchSubject.html';
            }
        });
    }

    function getUser(idUser,callback){
        console.log("Entrando en getUSER!: ",idUser);
        var data = $.ajax({
            //url: "https://eci-horarios-backend.herokuapp.com/api/v1/subjects/"+idSubject,
            //url: "https://eci-horarios-backend.herokuapp.com/api/v1/subjects/preinscription/"+idUser,            
            //url: "https://backendservicioseci.herokuapp.com/api/v1/subjects/preinscription/"+idUser,                        
            url: "http://localhost:8080/api/v1/subjects/preinscription/"+idUser,
            type: "GET",
            success : function (data, text) {
                //console.log("DATA DEL SERVER USER: ",data);
                //callback(data);

            },
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": 'Bearer ' + localStorage.getItem('token'),          
            },
            error: function (request){
                alert("La clase no existe");
                window.location.href='searchSubject.html';
            }
        });

        return data;
    }


    return {
        postLogin:postLogin,
        postRegister:postRegister,
        getSubject:getSubject,
        addSubject:addSubject,
        addGroup:addGroup,
        savePreinscription:savePreinscription,
        getUser:getUser,
        savePlan:savePlan,
        getPlan:getPlan,
        makeInscription:makeInscription
    };

})();