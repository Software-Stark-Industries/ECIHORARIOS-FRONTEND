
var subjects = (function () {

    function redirectToSearchSubjectView(){
        if(window.localStorage.getItem('isLogged')===null){
            alert("No estás logueado");
        }else{
            window.location.href='searchSubject.html';
        }
    }

    let subjectsEnrolled = [];

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

        function removeSubject(subject){
            console.log("\n REMOVE SUBJECT LLAMADO MATERIAS INSCRITAS: ",subjectsEnrolled, "\n");
            
            //console.log("Entraron en eliminar materia: ",subject);
            //console.log("GENERAL: ",$("#table_enrolled > tbody")[0]);
            //const materias = $("#table_enrolled > tbody")[0];
            const materias = subjectsEnrolled.filter(function(item) {
                return item !== subject
            });
            //console.log("\n MATERIAS ACTUALIZADAS: ",materias, "\n");
            showSubjects();
            /*
            const materiasNuevas = subjectsEnrolled.map(materia => {
                console.log("Materia: ",materia);
                console.log("Materia comparacion: ",materia === subject);
                materia !== subject? materia: '';
            });
            console.log("MATERIAS NUEVAS: ",materiasNuevas);
            */
            //let size  = $("#table_enrolled > tbody")[0].childNodes.length-1;
            //console.log("Size: ",size);
            //console.log("Tamaño: ",$("#table_enrolled > tbody")[0].childNodes[size]);
            //let subjectToRemove = $("#table_enrolled > tbody")[0].childNodes[size];
            //$("#table_enrolled > tbody")[0].removeChild(subjectToRemove);
            //console.log($("#table_enrolled > tbody")[0].childNodes);

        }

        function showSubjects(){
            //$("#table_enrolled > tbody").empty();        
           
            subjectsEnrolled.forEach(materia => {
                $("#table_enrolled > tbody").append(
                    "<tr>" +                        
                    "<td>" + materia.id + "</td>"+    
                    "<td>" + materia.credits + "</td>"+    
                    "<td>"  + "</td>"+    
                    "</tr>"
                );
                //const size = document.getElementsByTagName("tbody")[1].childNodes.length-1;
                const nodos = document.getElementsByTagName("tbody")[1].childNodes;
                console.log("Longitud nodos: ",nodos.length);
                console.log("NODOS: ",nodos);
                for(let i=0;i<nodos.length; i++){        
                    var preinscribirButton = document.createElement("input");
                    preinscribirButton.type = "button";
                    preinscribirButton.value = "Eliminar";
                    preinscribirButton.name = "eliminar";
                    preinscribirButton.id = "eliminar";
                    preinscribirButton.addEventListener('click', e => {                    
                        removeSubject(subject);
                    });                
                preinscribirButton.className ="btn btn-danger";
                    console.log("ELEMENTO: ", document.getElementsByTagName("tbody")[1].childNodes[i]);
                    console.log("Lo que va a modificar: ", document.getElementsByTagName("tbody")[1].childNodes[i]);
                    document.getElementsByTagName("tbody")[1].childNodes[i].childNodes[2].appendChild(preinscribirButton);
                }
                    
                
                //console.log("NODES: ",document.getElementsByTagName("tbody")[1].childNodes);
                //document.getElementsByTagName("tbody")[1].childNodes[size].childNodes[2].appendChild(preinscribirButton);
            });

           
            //console.log(document.getElementsByTagName("tbody")[1].childNodes); //[childNodes.length-1]
            //const size = document.getElementsByTagName("tbody")[1].childNodes.length-1;
            //console.log("SIZE: ",size);
            //console.log("NODE ",document.getElementsByTagName("tbody")[1].childNodes[size]);
            //console.log("NODE HIJO ",document.getElementsByTagName("tbody")[1].childNodes[size].childNodes[2]);
            //document.getElementsByTagName("tbody")[1].childNodes[size].childNodes[2].appendChild(preinscribirButton);
        }

        function enrollSubject(subject){
            
            //console.log("VA A INSCRIBIR LA MATERIA: ",subject);            
            //console.log("validando: ", subjectsEnrolled.includes(subject));
            //console.log("MATERIAS: ",subjectsEnrolled);
            if(!subjectsEnrolled.includes(subject)){
                subjectsEnrolled.push(subject);
                
                showSubjects();
               
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
                //console.log("Preinscribieron una materia");
                //console.log("e: ",e);
                //console.log("MATERIA PREINSCRITA: ",subject.id);
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
            console.log("SUBJECT FROM BACK: ",listGroups);
            if (listGroups.length===0) {
                alert("No se encontraron grupos para esa materia");
            }
            else{
//                $("#table_subject > tbody").empty();                
                /*
                listGroups.map(function(g){
                    console.log("ESTE ES EL GROUP DE SUBJECT: "+g);
                    console.log("Dias: ",g.dias);
                    let buttons = [];
                    
                    for(let i=0;i<g.dias.length;i++){
                        const preinscribirButton = document.createElement('button');
                        //preinscribirButton.classList("btn btn-success");
                        preinscribirButton.setAttribute('id', i);
                        buttons.push(preinscribirButton);
                        $("#table_subject > tbody").append(
                            "<tr>" +                        
                            "<td>" + g.grupo + "</td>"+    
                            "<td>" + g.credits + "</td>"+    
                            "<td>" + preinscribirButton + "</td>"+    
                            "</tr>"
                        );
                    }                                                          
                                        
                    console.log("Lista de botones: ", buttons);
                });
                */
            }
        }

        function getSubject(){
            apiclient.getSubject($("#subject").val(),_table);
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
        addGroup:addGroup
    };
})();