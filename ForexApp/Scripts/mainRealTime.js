$(window).on('ready', function () {
    var url = ManageNotes.getURL();

    $('#eur').html('<img src="' + url + '/Content/img/banderas/eur.png"> EUR');
    $('#eur').attr('title', 'Euro');

    if (Modernizr.mq('only screen and (min-width: 460px)')) {
        $('tr#particularRate').append('<th>Hora</th>');
        $('tr#particularRate').append('<th>Día 1</th>');
    }

    ForexData.initializeRates('S5');

    $('#refresh').on('click', function () {
        $('#rates').empty();
        ForexData.initializeRates($('#granularity').val());
    });


    var idSetInterval;
    $('#autoRefresh').on('click', function () {
        window.clearInterval(idSetInterval);
        idSetInterval = window.setInterval(function () {
            $('#rates').empty();
            ForexData.initializeRates($('#granularity').val());

        }, ForexData.equiTable($('#granularity').val()));
    });

    //Create Notes
    $('a#createNotes').on('click', function () {
        $('#first-modal-note').foundation('reveal', 'open');        
    });

    //Notes List
    $('#myNotes').on('click', function (e) {
        $('#list-notes').foundation('reveal', 'open');
        GetDelPutNotes.initialize();
    });

    //Rates List
    $('#ratesList').on('click', function (e) {
        $('#list-rates').foundation('reveal', 'open');
        GetDelPutRates.initialize();
    });

});