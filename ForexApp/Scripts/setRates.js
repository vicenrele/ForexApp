$(window).on('ready', function () {

    //Close info modal
    $('button#infoSendRate').on('click', function () {
        $('#info-modalRate').foundation('reveal', 'close');
    });

    

    /**
     * SET Rate Notes
     *
     */
    $("#RatesNote form").validate();
    $("#RatesNote form").on('submit', function (e) {
        e.preventDefault();
        $(this).removeData("validator").removeData("unobtrusiveValidation");//remove the form validation
        $.validator.unobtrusive.parse($(this));//add the form validation

        if ($(this).valid()) {
            var optionsRequest = {
                ApiURL: 'api/RatesNoteApi',
                typeRequest: 'POST',
                typeOfData: 'json',
                contentTypeString: 'application/json'
            };

            var RatesNote = {
                Rate: $('#Rate').text().trim(),
                Bid: $('#Bid').text(),
                Ask: $('#Ask').text(),
                Spread: $('#Spread').text(),
                Hour: $('#Hour').text(),
                NoteTitleRate: $('#NoteTitleRate').val(),
                NoteRate: '[' + ForexData.getTodayDate() + '] '+ $('#NoteRate').val()
            };
            ManageNotes.setLoadImage('.reveal-modal #loadImgRate');
            ManageNotes.AJAXRequest(JSON.stringify(RatesNote), optionsRequest, beforeSendCallback, successCallback, errorCallback);
        }

        function beforeSendCallback() {
            $('.reveal-modal #sendRateNote').prop('disabled', true);
        }

        function successCallback(data) {
            ManageNotes.deleteLoadImage('.reveal-modal #loadImgRate');
            $('.reveal-modal #sendRateNote').prop('disabled', false);
            ManageNotes.cleanInputs();
            $('#info-modalRate').foundation('reveal', 'open');
            $('#infoRateMessage').text(data);
        }

        function errorCallback(data) {
            ManageNotes.deleteLoadImage('.reveal-modal #loadImgRate');
            $('.reveal-modal #sendRateNote').prop('disabled', false);
            ManageNotes.cleanInputs();
            $('#info-modalRate').foundation('reveal', 'open');
            $('#infoRateMessage').text(JSON.parse(data.responseText).Message);
        }
    });
});