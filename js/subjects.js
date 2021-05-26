
var subjects = (function () {

    function redirectToSearchSubjectView(){
        if(window.localStorage.getItem('isLogged')===null){
            alert("No estás logueado");
        }else{
            window.location.href='searchSubject.html';
        }
    }

    function redirectToAdminView(){
        if(window.localStorage.getItem('isLogged')===null){
            alert("No estás logueado");
        }else{
            if(window.localStorage.getItem('isAdmin')==="false"){
                alert("Necesitas ser administrador para acceder a esta funcion")
            } else{
                window.location.href='addSubject.html';
            }
        }
    }

    function redirectToAdminRegister(){
        if(window.localStorage.getItem('isLogged')===null){
            alert("No estás logueado");
        }else{
            if(window.localStorage.getItem('isAdmin')==="false"){
                alert("Necesitas ser administrador para acceder a esta funcion")
            } else{
                window.location.href='registro.html';
            }
        }
    }

    function redirectToPreinscription(){
        if(window.localStorage.getItem('isLogged')===null){
            alert("No estás logueado");
        }else{            
            window.location.href='preinciscipcion_estudiante.html';            
        }
    }

    function redirectToInscription(){
        if(window.localStorage.getItem('isLogged')===null){
            alert("No estás logueado");
        }else{            
            window.location.href='planear_horario.html';            
        }
    }

        function _map(list){
            var mapList = null;
            return mapList = list.map(function(group){
                console.log("GROUP FROM BACK: ",group);
                return {
                    grupo:group.id,
                    salon:group.room,
                    profesor:group.professor,
                    cupos:group.capacity,
                    hInicio:group.hourOfInit,
                    hFin:group.hourOfEnd,
                    dias:group.dias
                };
            });
        }

        function _table(subject){
            var listGroups = _map(subject.groups);
            console.log("SUBJECT FROM BACK: ",listGroups);
            if (listGroups.length===0) {
                alert("No se encontraron grupos para esa materia");
            }
            else{
                $("#table_subject > tbody").empty();                
                listGroups.map(function(g){
                    console.log("ESTE ES EL GROUP DE SUBJECT: "+g);
                    console.log("Dias: ",g.dias);
                    for(let i=0;i<g.dias.length;i++){
                        $("#table_subject > tbody").append(
                            "<tr>" +                        
                            "<td>" + g.grupo+ "</td>"+
                            "<td>" + g.salon+ "</td>"+
                            "<td>" + g.profesor+ "</td>"+
                            "<td>" + g.cupos + "</td>"+
                            "<td>" + g.hInicio + "</td>"+
                            "<td>" + g.hFin + "</td>"+
                            "<td>" + g.dias[i] + "</td>"+
                            "</tr>"
                        );
                    }                                                          
                                        
                });
            }
        }

        function getSubject(){
            apiclient.getSubject($("#subject").val().toUpperCase(),_table);
        }

        function getUser(){
            console.log("VA A PEDIR EL USUARIO EN SUBJECTS: ",localStorage.getItem('idUser'));
            apiclient.getUser(localStorage.getItem('email'),_table);
        }

    function addSubject(){
        var subjectInputId = $("#subjectInputId").val();
        var subjectInputNombre = $("#subjectInputName").val();
        var subjectInputDescription = $("#subjectInputDescription").val();
        var subjectInputProgram = $("#subjectInputProgram")[0].value;
        var subjectInputCredits = $("#subjectInputCredits")[0].value;        
        var subject = {id: subjectInputId,
            nombre: subjectInputNombre,
            description:subjectInputDescription,
            program:subjectInputProgram,
            credits:subjectInputCredits
        };
        apiclient.addSubject(subject).then(function(data, textStatus, request) {
            alert("Materia añadida exitosamente");
        });
    }

    function addGroup(){
        var subjectInputGroupId = $("#subjectInputGroupId").val();
        var groupInputRoom = $("#groupInputRoom").val();
        var groupInputProfessor = $("#groupInputProfessor").val();
        var groupInputCapacity = $("#groupInputCapacity").val();
        var groupInputHInicio = $("#groupInputHInicio").val();
        var groupInputHFin = $("#groupInputHFin").val();        
        var groupsInputDias = $("#groupInputDias");
        var opcional = groupsInputDias[0];        
        var listaDias = [];        

        const lunes = $("#lunes")[0];                
        const martes = $("#martes")[0];        
        const miercoles = $("#miercoles")[0];
        const jueves = $("#jueves")[0];
        const viernes = $("#viernes")[0];
        const sabado = $("#sabado")[0];

        listaDias.push(lunes);
        listaDias.push(martes);
        listaDias.push(miercoles);
        listaDias.push(jueves);
        listaDias.push(viernes);
        listaDias.push(sabado);
        //console.log("Lista dias: ",listaDias);
        var diasCurso = [];
        listaDias.forEach(dia => {
            const checked =  dia.checked;
            if(checked) diasCurso.push(dia.value);
        });
        console.log("Dias de curso: ",diasCurso);

 
        
        //console.log("groupsInputDias: ",groupsInputDias);

        var group = {            
            room: groupInputRoom,
            professor:groupInputProfessor,
            capacity:groupInputCapacity,
            hourOfInit:groupInputHInicio,
            hourOfEnd:groupInputHFin,
            dias:diasCurso        
        };
        console.log("GROUP: ",group);
        
        apiclient.addGroup(group,subjectInputGroupId).then(function(data, textStatus, request) {
            alert("Grupo añadido exitosamente");
        });
        
    }


    return {
        redirectToSearchSubjectView:redirectToSearchSubjectView,
        getSubject:getSubject,
        redirectToAdminView:redirectToAdminView,
        addSubject:addSubject,
        addGroup:addGroup,
        getUser:getUser,
        redirectToPreinscription:redirectToPreinscription,
        redirectToInscription:redirectToInscription,
        redirectToAdminRegister:redirectToAdminRegister
    };
})();