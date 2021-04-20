
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

        function _map(list){
            var mapList = null;
            return mapList = list.map(function(group){
                return {
                    salon:group.room,
                    profesor:group.professor,
                    cupos:group.capacity,
                    hInicio:group.hourOfInit,
                    hFin:group.hourOfEnd,
                };
            });
        }

        function _table(subject){
            var listGroups = _map(subject.groups);
            if (listGroups.length===0) {
                alert("No se encontraron grupos para esa materia");
            }
            else{
                $("#table_subject > tbody").empty();
                listGroups.map(function(g){
                    console.log(g);
                    $("#table_subject > tbody").append(
                        "<tr>" +
                        "<td>" + g.salon+ "</td>"+
                        "<td>" + g.profesor+ "</td>"+
                        "<td>" + g.cupos + "</td>"+
                        "<td>" + g.hInicio + "</td>"+
                        "<td>" + g.hFin + "</td>"+
                        "</tr>"
                    );
                });
            }
        }

        function getSubject(){
            apiclient.getSubject($("#subject").val(),_table);
        }

    function addSubject(){
        var subjectInputId = $("#subjectInputId").val();
        var subjectInputNombre = $("#subjectInputName").val();
        var subjectInputDescription = $("#subjectInputDescription").val();
        var subjectInputProgram = $("#subjectInputProgram").val();
        var subject = {id: subjectInputId,
            nombre: subjectInputNombre,
            description:subjectInputDescription,
            program:subjectInputProgram
        };
        apiclient.addSubject(subject).then(function(data, textStatus, request) {
            alert("Materia añadida exitosamente");
        });
    }

    function addGroup(){
        var groupSubjectInputId = $("#subjectInputId").val();
        var groupInputRoom = $("#subjectInputName").val();
        var groupInputProfessor = $("#subjectInputDescription").val();
        var subjectInputProgram = $("#subjectInputProgram").val();
        var subject = {id: subjectInputId,
            nombre: subjectInputNombre,
            description:subjectInputDescription,
            program:subjectInputProgram
        };
        apiclient.addSubject(subject).then(function(data, textStatus, request) {
            alert("Materia añadida exitosamente");
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