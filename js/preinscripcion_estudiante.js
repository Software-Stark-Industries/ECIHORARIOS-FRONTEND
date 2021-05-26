
var subjects = (function () {

    function redirectToSearchSubjectView(){
        if(window.localStorage.getItem('isLogged')===null){
            alert("No estás logueado");
        }else{
            window.location.href='searchSubject.html';
        }
    }

    
    
    window.onload = async function(){        
        let user = await apiclient.getUser(localStorage.getItem('email'));        
        let subjectsPre = user.preinscription;    
        console.log("SUBJECTSPRE: ",subjectsPre);   
        subjectsPre.forEach(subjectPre => {
            enrollSubject(subjectPre);    
        });
        //enrollSubject(subjectsPre);
        //showSubjects(subjectsPre);
    };

    let subjectsEnrolled = [];
    let creditosDisponibles = document.getElementById("creditos");
    let creditosPreinscripcion = localStorage.getItem("creditos");
    getPreinscriptionCredits();

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

        function _map(list){
            var mapList = null;
            return mapList = list.map(function(group){                
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

        function removeSubject(subject){
            console.log("\n REMOVE SUBJECT LLAMADO MATERIAS INSCRITAS: ",subjectsEnrolled, "\n");            
            const materias = subjectsEnrolled.filter(function(item) {                
                return item !== subject
            });
            creditosPreinscripcion+=subject.credits;
            subjectsEnrolled = materias;
            getPreinscriptionCredits();            
            showSubjects(subjectsEnrolled);
        }

        function showSubjects(subjectsEnrolled){
            $("#table_enrolled > tbody").empty();                                         
            subjectsEnrolled.forEach(materia => {                
                $("#table_enrolled > tbody").append(
                    "<tr>" +                        
                    "<td>" + materia.id + "</td>"+    
                    "<td>" + materia.credits + "</td>"+    
                    "<td>"  + "</td>"+    
                    "</tr>"
                );                
                
                const nodos = document.getElementsByTagName("tbody")[1].childNodes;                                
                let botonesEliminar = [];
                for(let i=0;i<nodos.length; i++){                       
                    var preinscribirButton = document.createElement("input");
                    preinscribirButton.type = "button";
                    preinscribirButton.value = "Eliminar";
                    preinscribirButton.name = "eliminar";
                    preinscribirButton.id = "eliminar"+i;
                    preinscribirButton.className ="btn btn-danger";
                    preinscribirButton.addEventListener('click', e => {                          
                        removeSubject(materia);
                    });                
                                                                    
                    let buttons = document.getElementsByTagName("tbody")[1].childNodes[i].childNodes[2].children.length;                    
                    if(document.getElementsByTagName("tbody")[1].childNodes[i].nodeName==="TR" && buttons<1){                        
                        document.getElementsByTagName("tbody")[1].childNodes[i].childNodes[2].appendChild(preinscribirButton)
                        botonesEliminar.push(preinscribirButton);
                    }                                                   
                }                                 
            });                       
        }

        function enrollSubject(subject){
            alert(`Has preinscrito ${subject.id} con éxito.`);
            console.log("VA A INSCRIBIR LA MATERIA: ",subject);                        
            console.log("MATERIAS: ",subjectsEnrolled);

            if(!subjectsEnrolled.includes(subject)){                
                if(creditosPreinscripcion-subject.credits>=0){
                    subjectsEnrolled.push(subject);
                    creditosPreinscripcion -= subject.credits;
                    getPreinscriptionCredits();
                    showSubjects(subjectsEnrolled);                    
                }else{
                    alert("Has superado tus creditos de preinscripción.");
                }                               
            }                        
            //document.getElementsByTagName("tbody")[1].children.item(preinscribirButton);
        }

        function _table(subject){
            $("#table_subject > tbody").empty();                          
            var preinscribirButton = document.createElement("input");
            preinscribirButton.type = "button";
            preinscribirButton.value = "Preinscribir";
            preinscribirButton.name = "preinscribir";
            preinscribirButton.id = "preinscribir";
            preinscribirButton.addEventListener('click', e => {                                
                enrollSubject(subject);
            });
            
            preinscribirButton.className ="btn btn-success";
            
            $("#table_subject > tbody").append(
                "<tr>" +                        
                "<td>" + subject.id + "</td>"+    
                "<td>" + subject.credits + "</td>"+    
                "<td>"  + "</td>"+    
                "</tr>"
            );
            
            const size = document.getElementsByTagName("tbody")[0].childNodes.length-1;            
            document.getElementsByTagName("tbody")[0].childNodes[size].childNodes[2].appendChild(preinscribirButton);
            
            var listGroups = _map(subject.groups);
            //console.log("SUBJECT FROM BACK: ",listGroups);
            if (listGroups.length===0) {
                alert("No se encontraron grupos para esa materia");
            }            
        }

        function getSubject(){
            apiclient.getSubject($("#subject").val().toUpperCase(),_table);
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

    function savePreinscription(){
        console.log("Guardando preinscripción");
        console.log("Las materias que vamos a guardar son: ",subjectsEnrolled);                
        apiclient.savePreinscription(subjectsEnrolled).then(function(data, textStatus, request) {
            alert("¡Materias guardadas éxitosamente!");  
            window.location.href='index.html';
        });
    }


    function getPreinscriptionCredits(){        
        creditosDisponibles.innerHTML =`Creditos disponibles: ${creditosPreinscripcion}`;
    }

    function getUser(){
        console.log("VA A PEDIR EL USUARIO en Preinscripcion: ",localStorage.getItem('idUser'));
        apiclient.getUser(localStorage.getItem('email'),_table);
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
        //console.log("Dias de curso: ",diasCurso);

 
        
        //console.log("groupsInputDias: ",groupsInputDias);

        var group = {            
            room: groupInputRoom,
            professor:groupInputProfessor,
            capacity:groupInputCapacity,
            hourOfInit:groupInputHInicio,
            hourOfEnd:groupInputHFin,
            dias:diasCurso        
        };
        //console.log("GROUP: ",group);
        
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
        savePreinscription:savePreinscription,
        getUser:getUser
    };
})();