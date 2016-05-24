var ManageNotes = (function () {

    var exports = {};

    exports.getURL = function () {
        var pathArray = location.href.split('/')
        protocol = pathArray[0],
        host = pathArray[2],
        url = protocol + '//' + host;

        return url;
    };

    exports.cleanInputs = function () {
        $('.reveal-modal input[type=text], .reveal-modal textarea').val('');
    };

    exports.setLoadImage = function (id) {
        $(id).html('<img src="' + this.getURL() + '/Content/img/loading.gif">');
    };

    exports.deleteLoadImage = function (id) {
        $(id).css('display', 'none');
    };

    exports.AJAXRequest = function (dataToSend, optionsRequest, beforeSendCallback, succesCallback, errorCallback) {

        $.ajax({
            async: false,
            url: optionsRequest.ApiURL,
            data: dataToSend,
            type: optionsRequest.typeRequest,
            dataType: optionsRequest.typeOfData,
            contentType: optionsRequest.contentTypeString,
            beforeSend: beforeSendCallback,
            success: succesCallback,
            error: errorCallback
        });
    };

    return exports;

})();