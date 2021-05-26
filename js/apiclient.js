var apiclient = (function () {

    let materiasPreinscritas = [];

    function postLogin(loginRequest){
        console.log("LOGIN REQUEST: ",loginRequest);
        console.log("TO JSON LOGIN: ",JSON.stringify(loginRequest));
        /*
        axios.post('http://localhost:8080/login/', loginRequest).then(function (response) {
          console.log("ENTRO CORRECTAMENTE PARECE: ",response);
          localStorage.setItem('isLogged',true);localStorage.setItem('token', JSON.stringify(response.data.accessToken));localStorage.setItem('token', JSON.stringify(response.data.accessToken));localStorage.setItem('user', JSON.stringify(response.data.user));localStorage.setItem('mailLogged', JSON.stringify(response.data.user.email));localStorage.setItem('nameLogged', JSON.stringify(response.data.user.name));localStorage.setItem('lastnameLogged', JSON.stringify(response.data.user.lastname));
          //document.location.href = "/map";
        }).catch(function (error) {console.log("ERROR: ",error)});
        "Authorization": 'Bearer ' + localStorage.getItem('token'),
        */
        var data = $.ajax({
            //url: "https://eci-horarios-backend.herokuapp.com/api/v1/login",
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
            //url: "https://eci-horarios-backend.herokuapp.com/api/v1/login",
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
        /*
        axios.post('http://localhost:8080/login/register', registerRequest)
        .then(function (response) {
          console.log("ENTRO CORRECTAMENTE PARECE: ",response);
          console.log("RESPONSE DATA: ",response.data);
          localStorage.setItem('isLogged',true);
          localStorage.setItem('token', JSON.stringify(response.data.accessToken));          
          localStorage.setItem('user', JSON.stringify(response.data.user));
          localStorage.setItem('mailLogged', JSON.stringify(response.data.user.email));
          localStorage.setItem('nameLogged', JSON.stringify(response.data.user.name));
          localStorage.setItem('lastnameLogged', JSON.stringify(response.data.user.lastname));
          //document.location.href = "/map";
        }).catch(function (error) {console.log("ERROR: ",error)});
       */
    }

    function addSubject(subject){
        var data = $.ajax({
            //url: "https://eci-horarios-backend.herokuapp.com/api/v1/subjects",
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
            //url: "https://eci-horarios-backend.herokuapp.com/api/v1/subjects",
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
        //System.out.println("EN API CLIENT PLAN PREINSCRITAS: ",materiasPreinscritas);
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
            //url: "https://eci-horarios-backend.herokuapp.com/api/v1/subjects",
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
            //url: "https://eci-horarios-backend.herokuapp.com/api/v1/subjects/"+subjectId,
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
            //url: "https://eci-horarios-backend.herokuapp.com/api/v1/subjects/"+idSubject,
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