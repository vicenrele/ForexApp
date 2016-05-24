
var GetDelPutNotes = (function () {

    var exports = {};

    exports.initialize = function () {

        //Reset grids cache
        $('#IndividualNotesList div[data-role="wrapper"]').html('<table id="gridsNotes"></table>');

        var optionsRequest = {
            ApiURL: 'api/IndividualNoteApi',
            typeRequest: 'GET',
            typeOfData: 'json',
            contentTypeString: 'application/json'
        };
        /**
         * GET List of notes
         *
         */
        ManageNotes.setLoadImage('.reveal-modal #loadImg');
        ManageNotes.AJAXRequest('', optionsRequest, this.beforeGetCallback, this.successGetCallback, this.errorGetCallback);
    };
       
    exports.beforeGetCallback = function() {
        //ManageNotes.setLoadImage('.reveal-modal #loadImg');
    };

    exports.successGetCallback = function (data) {
        ManageNotes.deleteLoadImage('.reveal-modal #loadImg');

        gridNotes = null;
        gridNotes = $('#gridsNotes').grid({
            dataSource: data,
            responsive: true,
            columns: [
                { field: 'IndividualNoteID', title: 'ID', width: 32 },
                { field: 'NoteTitle', title: 'Título', sortable: true, editor: true, events: { 'change': this.Edit }},
                { field: 'Note', title: 'Nota', editor: true, events: { 'change': this.Edit } },
                { width: 50, tmpl: '<img title="Eliminar" src="' + ManageNotes.getURL() + '/Content/img/eliminar.png">', align: 'center', events: { 'click': DeleteNote } }
            ],
            pager: { limit: 10 }
        });

        $('th div[data-role="display"]').next().empty();

        var editor = function ($container, currentValue) {
            $container.append("<input type=\"text\" value=\"" + currentValue + "\"/>");                             
        };

    };

    exports.errorGetCallback = function (data) {
        ManageNotes.deleteLoadImage('.reveal-modal #loadImg');
    };

    /**
    * EDIT rows (PUT)
    */
    exports.Edit = function(e) {
        if (e.data.record.NoteTitle.toString().length > 20) {
            alert('El máximo de caracteres es 20.');
        }
        else {
            var IndividualNote = {
                    IndividualNoteID: e.data.record.IndividualNoteID,
                    NoteTitle: e.data.record.NoteTitle.toString(),
                    Note: e.data.record.Note.toString()
            };
            var optionsPutRequest = {
                ApiURL: 'api/IndividualNoteApi',
                typeRequest: 'PUT',
                typeOfData: 'json',
                contentTypeString: 'application/json'
            };
            ManageNotes.setLoadImage('.reveal-modal #loadImg');
            ManageNotes.AJAXRequest(JSON.stringify(IndividualNote), optionsPutRequest, this.beforeGetCallback, this.successPutCallback, this.errorGetCallback);
        }
    };

    exports.successPutCallback = function(data) {
        ManageNotes.deleteLoadImage('.reveal-modal #loadImg');
        alert(data);
    };


    exports.successDeleteCallback = function(data) {
        ManageNotes.deleteLoadImage('.reveal-modal #loadImg');
        alert(data);
    };

    return exports;

})();

var gridNotes;

/**
 * DELETE rows
 */
function DeleteNote(e) {
    if (confirm('¿Estás seguro de querer eliminar este elemento?')) {
        var optionsDelRequest = {
            ApiURL: 'api/IndividualNoteApi/' + e.data.record.IndividualNoteID.toString(),
            typeRequest: 'DELETE',
            typeOfData: 'json',
            contentTypeString: 'application/json'
        };
        ManageNotes.setLoadImage('.reveal-modal #loadImg');
        ManageNotes.AJAXRequest(e.data.record.IndividualNoteID.toString(), optionsDelRequest, GetDelPutNotes.beforeGetCallback, GetDelPutNotes.successDeleteCallback, GetDelPutNotes.errorGetCallback);
        gridNotes.removeRow(e.data.id);
    }
};