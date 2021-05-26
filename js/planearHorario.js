
var plans = (function () {

    function redirectToSearchSubjectView(){
        if(window.localStorage.getItem('isLogged')===null){
            alert("No estás logueado");
        }else{
            window.location.href='searchSubject.html';
        }
    }

    window.onload = async function(){
        //console.log("Mientras carga...");
        let user = await apiclient.getUser(localStorage.getItem('email'));
        //console.log("USER EN PRE: ",user);
        let subjectsPre = user.preinscription;
        console.log("Materias preinscritas: ",subjectsPre);
        showSubjectsPre(subjectsPre);
    };

    function showSubjectsPre(subjectsPre){
        //console.log("VA A MANTENER: ",subjectsPre);
        $("#subjects_section").empty();   
        subjectsPre.forEach(materia => {
            //console.log("\n MATERIA: ",materia.id+" \n ");
            var opt = document.createElement('option');
            opt.value = materia.id;
            opt.innerHTML = materia.id;                                    
            $("#subjectPreOptions")[0].append(opt);
        });                                 
    }
    

    let materiasOpcion = [];
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
                //console.log("GROUP FROM BACK: ",group);
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
            //console.log("\n MATERIAS ACTUALIZADAS: ",materias, "\n");
            showSubjects();
        }

        function showSubjects(){
            $("#table_enrolled > tbody").empty();                   
           //console.log("\n En show subjects: ",subjectsEnrolled);           
            subjectsEnrolled.forEach(materia => {
                //console.log("MATERIA: ",materia);
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
                        //console.log("ENTRA EN ELIMINAR MATERIA BOTON: ",e);
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
            
            console.log("VA A INSCRIBIR LA MATERIA: ",subject);                        
            console.log("MATERIAS: ",subjectsEnrolled);

            if(!subjectsEnrolled.includes(subject)){                
                if(creditosPreinscripcion-subject.credits>=4){
                    subjectsEnrolled.push(subject);
                    creditosPreinscripcion -= subject.credits;
                    getPreinscriptionCredits();
                    showSubjects();
                }else{
                    alert("Has superado tus creditos de preinscripción.");
                }
                
               
            }
            
            
            //document.getElementsByTagName("tbody")[1].children.item(preinscribirButton);
        }

        function _table(subject){
            $("#table_subject > tbody").empty();              
            var listGroups = _map(subject.groups);
            //console.log("SUBJECT FROM BACK: ",listGroups);
            if (listGroups.length===0) {
                alert("No se encontraron grupos para esa materia");
            }
            else{
                let band=true;
                $("#table_subject > tbody").empty();
                let contador=0;       

                listGroups.map(function(g){                    
                    //console.log("Dias: ",g.dias);
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
                            "<td>" + "</td>"+
                            "</tr>"
                        );
                        //console.log("NOMBRE GRUPO: ",subject);                        
                        var preinscribirButton = document.createElement("input");
                        preinscribirButton.type = "button";
                        //preinscribirButton.value = "preinscribir";
                        preinscribirButton.value = "preinscribir";
                        preinscribirButton.name = g.grupo;
                        preinscribirButton.id = "preinscribir"+contador;
                        preinscribirButton.className ="btn btn-success";
                        preinscribirButton.addEventListener('click', e => {  
                            //console.log("\n ENTRA EN SELECCIONAR GRUPO BOTON: ",e);
                            updateSubject(subject, e.target.name);
                        });                

                        //console.log("CONTADOR: ",contador);
                        let size = document.getElementsByTagName("tbody")[0].childNodes[contador].childNodes.length;
                        let buttons = document.getElementsByTagName("tbody")[0].childNodes[contador].childNodes[size-1].children.length;                    
                        //console.log("BUTTONS: ",buttons);
                        //console.log("LLEGANDO: ",document.getElementsByTagName("tbody")[0].childNodes[contador]);
                        if(band && buttons<1){                                                                                
                            document.getElementsByTagName("tbody")[0].childNodes[contador].childNodes[size-1].appendChild(preinscribirButton);                                                    
                            band=false;
                            //botonesEliminar.push(preinscribirButton);
                        }  
                        contador++;    
                    }
                    band=true;                                                      
                                        
                });
            }           
        }

        function savePlan(){
            console.log("ENTRANDO EN SAVEPLAN: ");
            console.log("MATERIAS QUE VA A GUARDAR: ",materiasOpcion);
            apiclient.savePlan(materiasOpcion);            
            localStorage.setItem('planPreinscripcion',JSON.stringify(materiasOpcion));
            alert("Plan de horario guardado con éxito.");
            window.location.href='mis_planes.html';
            //apiclient.savePlan(materiasOpcion);
        };

        /*
        SIGUE GUARDAR LAS MATERIAS QUE SE SELECCIONAN EN UNA LISTA Y VALIDAR QUE NO SE CRUCEN
        CON ESO CUANDO SE GUARDEN LAS OPCIONES SE GUARDAN LAS MATERIAS SELECCIONADAS Y LISTO        


        PONER LAS MATERIAS QUE YA SE TIENEN PREINSCRITAS EN LA SONA DE PREINSCRIPCION
         */

        function updateSubject(subject, grupo){
            console.log("UPDATING SUBJECT: ",subject," grupo: ",grupo);
            let tablePlan = $("#table_plan > tbody")[0];
            //console.log("\n tablePlan: ",tablePlan);
            var listGroups = _map(subject.groups);
            
            const semana = {'lunes':1,'martes':2,'miercoles':3,'jueves':4,'viernes':5,'sabado':6};
            listGroups.forEach(group => {
                
                group['subject'] = subject.id;
                if(group.grupo == grupo){
                    
                    if(materiasOpcion.length<1){
                        materiasOpcion.push(group);                        
                        alert(`Se preinscribió el grupo: ${group.subject} - ${group.grupo}`);
                        showPreSubject(subject,group,semana);                        
                    }else{
                        let ocupado = false;                        
                        materiasOpcion.forEach(curso => {
                            //console.log("\n CURSO PREINSCRITO: ",curso);
                            //Comparamos que no este inscribiendo una materia que ya preinscribio
                            if(curso.subject === group.subject){
                                //console.log("YA TIENES INSCRITA ESTA MATERIA WASHON\n ");
                                ocupado=true;
                                alert(`YA ASIGNASTE LA MATERIA ${group.subject} EN TU HORARIO`);
                                
                            }else{
                                //console.log("SON MATERIAS DIFERENTES ASÍ QUE OK \n");
                                //console.log("curso.hInicio: ",curso.hInicio, " group.hInicio: ",group.hInicio);
                                if(curso.hInicio === group.hInicio){
                                    alert(`${curso.subject}-${curso.grupo} SE CRUZA CON ${group.subject}-${group.grupo}`);
                                    ocupado=true;
                                    //console.log("LAS HORAS SON IGUALES HAY CRUCE DE MATERIAS");
                                }                                                                
                            }
                        });
                        if(!ocupado){
                            //console.log("LAS HORAS SON DIFERENTES VA A GUARDAR: ");
                            materiasOpcion.push(group);
                            console.log("GRUPOS PREINSCRITOS: ",materiasOpcion);                                                                           
                            alert(`Se preinscribió el grupo: ${group.subject} - ${group.grupo}`);
                            showPreSubject(subject,group,semana);                            
                        }                                                                                                                                
                    }                                                        
                }
            });            
        }

        function showPreSubject(subject,group,semana){
            //REVISAR ESTA PARTE PORQUED DEBEMOS INSCRIBIR EN BASE A LAS MATERIAS QUE INSCRIBAMOS EN LA LISTA
            //ESTO NOS SIRVE PARA PODER HACER LA INSCRIPCIÓN AUTOMATICA
            let size = document.getElementsByTagName("tbody")[1].childNodes.length;                                    
            for(let i=0; i<size;i++){                                                                                
                if(document.getElementsByTagName("tbody")[1].childNodes[i].nodeName==="TR"){                    
                    let hora = document.getElementsByTagName("tbody")[1].childNodes[i].children[0].innerText;                                
                    if(hora == group.hInicio){
                        for(let j=0;j<group.dias.length;j++){                            
                            for(let k=0;k<group.dias.length;k++){                                
                                document.getElementsByTagName("tbody")[1].childNodes[i].children[semana[group.dias[j]]].innerText= `${subject.id} - ${group.grupo} \n ${group.salon}`;
                            }  
                        }                                                                                
                    }
                }                                                
            }
        }


        function getSubject(){            
            let materia = $("#subjectPreOptions").val().toUpperCase();
            console.log("VA A ENTRAR EN GETSUBJEfCT PRE: ",materia);            
            if(materia !== "SELECCIONAR")
                apiclient.getSubject($("#subjectPreOptions").val().toUpperCase(),_table);
        }
    
    function getPreinscriptionCredits(){        
        //creditosDisponibles.innerHTML =`Creditos disponibles: ${creditosPreinscripcion}`;
    }

    function getUser(){
        console.log("VA A PEDIR EL USUARIO en planearHorario: ",localStorage.getItem('idUser'));
        apiclient.getUser(localStorage.getItem('email'),_table);
    }


    return {
        redirectToSearchSubjectView:redirectToSearchSubjectView,
        getSubject:getSubject,
        redirectToAdminView:redirectToAdminView,                        
        getUser:getUser,
        savePlan:savePlan
    };
})();