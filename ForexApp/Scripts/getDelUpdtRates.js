
var GetDelPutRates = (function () {
        
    var exports = {};

    exports.initialize = function () {
        //Reset grids cache
        $('#RatesNotesList div[data-role="wrapper"]').html('<table id="grids"></table>');

        var optionsRequest = {
            ApiURL: 'api/RatesNoteApi',
            typeRequest: 'GET',
            typeOfData: 'json',
            contentTypeString: 'application/json'
        };

        ManageNotes.setLoadImage('.reveal-modal #loadImgListRates');

       /**
        * GET List of notes
        *
        */
        ManageNotes.AJAXRequest('', optionsRequest, this.beforeGetCallback, this.successGetCallback, this.errorGetCallback);
    };



    exports.beforeGetCallback = function () {
        //ManageNotes.setLoadImage('.reveal-modal #loadImgListRates');
    };

    exports.successGetCallback = function (data) {
        ManageNotes.deleteLoadImage('.reveal-modal #loadImgListRates');

        grid = null;
        grid = $('#grids').grid({
            dataSource: data,
            responsive: true,
            columns: [
                { field: 'RatesNoteID', title: 'ID', width: 32 },
                { field: 'Rate', title: 'Divisa' },
                { field: 'Bid', title: 'Bid', sortable: true },
                { field: 'Ask', title: 'Ask', sortable: true },
                { field: 'Spread', title: 'Spread', sortable: true },
                { field: 'Hour', title: 'Hora' },
                { field: 'NoteTitleRate', title: 'Título', editor: true, events: { 'change': this.Edit } },
                { field: 'NoteRate', title: 'Nota', editor: true, events: { 'change': this.Edit } },
                { width: 30, tmpl: '<img title="Eliminar" src="' + ManageNotes.getURL() + '/Content/img/eliminar.png">', align: 'center', events: { 'click': DeleteRate } }
            ],
            pager: { limit: 10 }
        });


        //Responsive web design grids
        if (Modernizr.mq('only screen and (max-width: 410px)')) {
            for (var i = 0; i < 4 ; i++) {
                $("#grids th:last-child, #grids td:last-child").remove();
            }
        }
        if (Modernizr.mq('only screen and (max-width: 470px)')) {
            for (var i = 0; i < 3 ; i++) {
                $("#grids th:last-child, #grids td:last-child").remove();
            }
        }
        if (Modernizr.mq('only screen and (max-width: 800px)')) {
            for (var i = 0; i < 2 ; i++) {
                $("#grids th:last-child, #grids td:last-child").remove();
            }
        }

        $('th div[data-role="display"]').next().empty();

        var editor = function ($container, currentValue) {
            $container.append("<input type=\"text\" value=\"" + currentValue + "\"/>");
        };
        var eliminar = function (e) {
            if (confirm('¿Estás seguro de querer eliminar este elemento?')) {
                var optionsDelRequest = {
                    ApiURL: 'api/RatesNoteApi/' + e.data.record.RatesNoteID.toString(),
                    typeRequest: 'DELETE',
                    typeOfData: 'json',
                    contentTypeString: 'application/json'
                };
                ManageNotes.setLoadImage('.reveal-modal #loadImgListRates');
                ManageNotes.AJAXRequest(e.data.record.RatesNoteID.toString(), optionsDelRequest, this.beforeGetCallback, this.successDeleteCallback, this.errorGetCallback);
                grid.removeRow(e.data.id);
            }
        };
    };

    exports.errorGetCallback = function (data) {
        ManageNotes.deleteLoadImage('.reveal-modal #loadImgListRates');
    };


    exports.successDeleteCallback = function (data) {
        ManageNotes.deleteLoadImage('.reveal-modal #loadImgListRates');
        alert(data);
    };

   /**
    * EDIT rows (PUT)
    */
    exports.Edit = function (e) {
        if (e.data.record.NoteTitleRate.toString().length > 20) {
            alert('El máximo de caracteres es 20.');
        }
        else {
            var RatesNote = {
                    RatesNoteID: e.data.record.RatesNoteID,
                    NoteTitleRate: e.data.record.NoteTitleRate.toString(),
                    NoteRate: e.data.record.NoteRate.toString(),
                    Rate: e.data.record.Rate.toString(),
                    Bid: e.data.record.Bid.toString(),
                    Ask: e.data.record.Ask.toString(),
                    Spread: e.data.record.Spread.toString(),
                    Hour: e.data.record.Hour.toString()
            };
            var optionsPutRequest = {
                ApiURL: 'api/RatesNoteApi',
                typeRequest: 'PUT',
                typeOfData: 'json',
                contentTypeString: 'application/json'
            };
            ManageNotes.setLoadImage('.reveal-modal #loadImgListRates');
            ManageNotes.AJAXRequest(JSON.stringify(RatesNote), optionsPutRequest, this.beforeGetCallback, this.successPutCallback, this.errorGetCallback);
        }
    };

    exports.successPutCallback = function (data) {
        ManageNotes.deleteLoadImage('.reveal-modal #loadImgListRates');
        alert(data);
    };


    return exports;

})();

var grid;

/**
 * DELETE rows
 */
function DeleteRate(e) {
    if (confirm('¿Estás seguro de querer eliminar este elemento?')) {
        var optionsDelRequest = {
            ApiURL: 'api/RatesNoteApi/' + e.data.record.RatesNoteID.toString(),
            typeRequest: 'DELETE',
            typeOfData: 'json',
            contentTypeString: 'application/json'
        };
        ManageNotes.setLoadImage('.reveal-modal #loadImgListRates');
        ManageNotes.AJAXRequest(e.data.record.RatesNoteID.toString(), optionsDelRequest, GetDelPutRates.beforeGetCallback, GetDelPutRates.successDeleteCallback, GetDelPutRates.errorGetCallback);
        grid.removeRow(e.data.id);
    }
};