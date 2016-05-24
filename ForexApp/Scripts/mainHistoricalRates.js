$(window).on('ready', function () {

    //Max date is today
    $('[type="date"]').prop('max', function () {
        return new Date().toJSON().split('T')[0];
    });

    //Default value is today
    $('[type="date"]').prop('value', function () {
        return new Date().toJSON().split('T')[0];
    });

    //Close info modal
    $('button#infoHistoricalModal').on('click', function () {
        $('#info-historicalModal').foundation('reveal', 'close');
    });

    $('#rangeDateRates').on('click', function () {
        var values = ForexData.getHistoricalRateFirstDay('EUR', $('#rate').val(), $('#yearRate').val());

        if (values.length === 12) {

            var arrayData = [ {
                name: 'Ask',
                data: [values[0].closeAsk, values[1].closeAsk, values[2].closeAsk, values[3].closeAsk, values[4].closeAsk, values[5].closeAsk,
                    values[6].closeAsk, values[7].closeAsk, values[8].closeAsk, values[9].closeAsk, values[10].closeAsk, values[11].closeAsk]
            }, {
                name: 'Bid',
                data: [values[0].closeBid, values[1].closeBid, values[2].closeBid, values[3].closeBid, values[4].closeBid, values[5].closeBid,
                    values[6].closeBid, values[7].closeBid, values[8].closeBid, values[9].closeBid, values[10].closeBid, values[11].closeBid]
            }, {
                name: 'Spread',
                data: [values[0].closeAsk - values[0].closeBid, values[1].closeAsk - values[1].closeBid, values[2].closeAsk - values[2].closeBid,
                    values[3].closeAsk - values[3].closeBid, values[4].closeAsk - values[4].closeBid, values[5].closeAsk - values[5].closeBid,
                    values[6].closeAsk - values[6].closeBid, values[7].closeAsk - values[7].closeBid, values[8].closeAsk - values[8].closeBid,
                    values[9].closeAsk - values[9].closeBid, values[10].closeAsk - values[10].closeBid, values[11].closeAsk - values[11].closeBid]
            }];

            var categories = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

            var optionsColumnsChart = {
                chartType: 'column',
                titleText: 'Histórico comparativo de divisas',
                subtitle: 'Valores a día 1 de cada mes. Año: ' + $('#yearRate').val(),
                catego: categories,
                yAxisTitle: $('#rate').val(),
            };

            UseForexCharts.addChart('#column3DChart', arrayData, optionsColumnsChart);


            var optionsLineChart = {
                chartType: 'line',
                titleText: 'Histórico comparativo de divisas',
                subtitle: 'Valores a día 1 de cada mes. Año: ' + $('#yearRate').val(),
                catego: categories,
                yAxisTitle: $('#rate').val(),
            };

            UseForexCharts.addChart('#lineChart', arrayData, optionsLineChart);
        }
        else {
            $('#info-modal').foundation('reveal', 'open');
            $('#infoMessage').text('Se ha producido un error con la API que proporciona los datos. Por favor, inténtelo de nuevo más tarde.');
        }
    });


    $('#dateRates').on('click', function () {
        var values = ForexData.getHistoricalRatesByDate('EUR', $('#dateRate').val());

        if (values.length === 17) {
            var arrayData = [{
                name: 'Ask',
                data: [values[0].closeAsk, values[1].closeAsk, values[2].closeAsk, values[3].closeAsk, values[4].closeAsk, values[5].closeAsk,
                    values[6].closeAsk, values[7].closeAsk]
            }, {
                name: 'Bid',
                data: [values[0].closeBid, values[1].closeBid, values[2].closeBid, values[3].closeBid, values[4].closeBid, values[5].closeBid,
                    values[6].closeBid, values[7].closeBid]
            }, {
                name: 'Spread',
                data: [values[0].closeAsk - values[0].closeBid, values[1].closeAsk - values[1].closeBid, values[2].closeAsk - values[2].closeBid,
                    values[3].closeAsk - values[3].closeBid, values[4].closeAsk - values[4].closeBid, values[5].closeAsk - values[5].closeBid,
                    values[6].closeAsk - values[6].closeBid, values[7].closeAsk - values[7].closeBid]
            }];

            var currencies = ForexData.getCurrencies(),
                categories = Object.keys(currencies),
                someCategories = [],
                restCatgories = [];

            for (var i = 0; i < 8 ; i++) {
                someCategories.push(categories[i]);
            }
            
            var optionsColumnsChart = {
                chartType: 'column',
                titleText: 'Histórico de cambio cruzado de divisas',
                subtitle: 'Día en concreto: ' + ForexData.convertDateToEUFormat($('#dateRate').val()),
                catego: someCategories,
                yAxisTitle: 'EUR',
            };

            UseForexCharts.addChart('#column3DChart', arrayData, optionsColumnsChart);


            var arrayData2 = [{
                name: 'Ask',
                data: [values[8].closeAsk, values[9].closeAsk, values[10].closeAsk, values[11].closeAsk,
                    values[12].closeAsk, values[13].closeAsk, values[14].closeAsk, values[15].closeAsk, values[16].closeAsk]
            }, {
                name: 'Bid',
                data: [values[8].closeBid, values[9].closeBid, values[10].closeBid, values[11].closeBid,
                    values[12].closeBid, values[13].closeBid, values[14].closeBid, values[15].closeBid, values[16].closeBid]
            }, {
                name: 'Spread',
                data: [values[8].closeAsk - values[8].closeBid, values[9].closeAsk - values[9].closeBid, values[10].closeAsk - values[10].closeBid,
                    values[11].closeAsk - values[11].closeBid, values[12].closeAsk - values[12].closeBid, values[13].closeAsk - values[13].closeBid,
                    values[14].closeAsk - values[14].closeBid, values[15].closeAsk - values[15].closeBid, values[16].closeAsk - values[16].closeBid]
            }];

            for (var n = 8; n < 18 ; n++) {
                restCatgories.push(categories[n]);
            }

            var optionsColumnsChart2 = {
                chartType: 'column',
                titleText: 'Histórico de cambio cruzado de divisas',
                subtitle: 'Día en concreto: ' + ForexData.convertDateToEUFormat($('#dateRate').val()),
                catego: restCatgories,
                yAxisTitle: 'EUR',
            };

            UseForexCharts.addChart('#lineChart', arrayData2, optionsColumnsChart2);
        }
        else {
            $('#info-historicalModal').foundation('reveal', 'open');
            $('#infoHistoricalMessage').text('Se ha producido un error con la API que proporciona los datos. Por favor, inténtelo de nuevo más tarde.');
        }

    });
});