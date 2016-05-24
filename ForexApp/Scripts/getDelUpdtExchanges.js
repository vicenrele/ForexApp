
var GetDelPutExchanges = (function () {

    var exports = {};

    exports.initialize = function () {
        //Reset grids cache
        $('#ExchangeList div[data-role="wrapper"]').html('<table id="gridsExchange"></table>');

        var optionsRequest = {
            ApiURL: 'api/ExchangeApi',
            typeRequest: 'GET',
            typeOfData: 'json',
            contentTypeString: 'application/json'
        };

        ManageNotes.setLoadImage('.reveal-modal #loadImgListExchange');

        /**
         * GET List of notes
         *
         */
        ManageNotes.AJAXRequest('', optionsRequest, this.beforeGetCallback, this.successGetCallback, this.errorGetCallback);
    };

    exports.successGetCallback = function (data) {
        ManageNotes.deleteLoadImage('.reveal-modal #loadImgListExchange');

        gridsExchange = null;
        gridsExchange = $('#gridsExchange').grid({
            dataSource: data,
            responsive: true,
            columns: [
                { field: 'ExchangeID', title: 'ID', width: 32 },
                { field: 'NumberToConvert', title: 'Cantidad', sortable: true },
                { field: 'Rate1', title: 'Convertir', sortable: true },
                { field: 'Rate2', title: 'Convertir en', sortable: true },                
                { field: 'Result', title: 'Resultado' },
                { field: 'Fecha', title: 'Fecha', sortable: true },
                { width: 30, tmpl: '<img title="Eliminar" src="' + ManageNotes.getURL() + '/Content/img/eliminar.png">', align: 'center', events: { 'click': DeleteExchange } }
            ],
            pager: { limit: 10 }
        });


        //Responsive web design grids
        if (Modernizr.mq('only screen and (max-width: 410px)')) {
            $("#gridsExchange th:first-child, #gridsExchange td:first-child").remove();
            for (var i = 0; i < 2 ; i++) {
                $("#gridsExchange th:last-child, #gridsExchange td:last-child").remove();
            }
        }
        if (Modernizr.mq('only screen and (max-width: 635px)')) {
            $("#gridsExchange th:first-child, #gridsExchange td:first-child").remove();
            $("#gridsExchange th:last-child, #gridsExchange td:last-child").remove();
        }

        $('th div[data-role="display"]').next().empty();

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
                gridsExchange.removeRow(e.data.id);
            }
        };
    };

    exports.errorGetCallback = function (data) {
        ManageNotes.deleteLoadImage('.reveal-modal #loadImgListExchange');
    };


    exports.successDeleteCallback = function (data) {
        ManageNotes.deleteLoadImage('.reveal-modal #loadImgListExchange');
        alert(data);
    };


    exports.successPutCallback = function (data) {
        ManageNotes.deleteLoadImage('.reveal-modal #loadImgListExchange');
        alert(data);
    };

    return exports;

})();

var gridsExchange;

/**
 * DELETE rows
 */
function DeleteExchange(e) {
    if (confirm('¿Estás seguro de querer eliminar este elemento?')) {
        var optionsDelRequest = {
            ApiURL: 'api/ExchangeApi/' + e.data.record.ExchangeID.toString(),
            typeRequest: 'DELETE',
            typeOfData: 'json',
            contentTypeString: 'application/json'
        };
        ManageNotes.setLoadImage('.reveal-modal #loadImgListExchange');
        ManageNotes.AJAXRequest(e.data.record.ExchangeID.toString(), optionsDelRequest, GetDelPutExchanges.beforeGetCallback, GetDelPutExchanges.successDeleteCallback, GetDelPutExchanges.errorGetCallback);
        gridsExchange.removeRow(e.data.id);
    }
};