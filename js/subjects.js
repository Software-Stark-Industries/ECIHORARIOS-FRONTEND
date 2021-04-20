
var subjects = (function () {

    function redirectToSearchSubjectView(){
        if(!window.localStorage.getItem('isLogged')==="true"){
            alert("No estás logueado");
            window.location.href='index.html';
        }else{
            window.location.href='searchSubject.html';
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


    return {
        redirectToSearchSubjectView:redirectToSearchSubjectView,
        getSubject:getSubject
    };
})();