$(window).on('ready', function () {
    
    //Close info modal
    $('button#infoSendNote').on('click', function () {
        $('#info-modalNote').foundation('reveal', 'close');
    });

    /**
     * SET Notes
     *
     */
    $("#IndividualNote form").validate();
    $("#IndividualNote form").on('submit', function (e) {
        e.preventDefault();
        $(this).removeData("validator").removeData("unobtrusiveValidation");//remove the form validation
        $.validator.unobtrusive.parse($(this));//add the form validation

        if ($(this).valid()) {
            var optionsRequest = {
                ApiURL: 'api/IndividualNoteApi',
                typeRequest: 'POST',
                typeOfData: 'json',
                contentTypeString: 'application/json'
            };

            var IndividualNote = {
                NoteTitle: $('#NoteTitle').val(),
                Note: $('#Note').val()
            };
            ManageNotes.setLoadImage('.reveal-modal #loadImgNote');
            ManageNotes.AJAXRequest(JSON.stringify(IndividualNote), optionsRequest, beforeSendCallback, successCallback, errorCallback);
        }

        function beforeSendCallback() {            
            $('.reveal-modal #sendNote').prop('disabled', true);
        }

        function successCallback(data) {
            ManageNotes.deleteLoadImage('.reveal-modal #loadImgNote');
            $('.reveal-modal #sendNote').prop('disabled', false);
            ManageNotes.cleanInputs();
            $('#info-modalNote').foundation('reveal', 'open');
            $('#infoNoteMessage').text(data);            
        }

        function errorCallback(data) {
            ManageNotes.deleteLoadImage('.reveal-modal #loadImgNote');
            $('.reveal-modal #sendNote').prop('disabled', false);
            ManageNotes.cleanInputs();
            $('#info-modalNote').foundation('reveal', 'open');
            $('#infoNoteMessage').text(data);
        }
    });


});