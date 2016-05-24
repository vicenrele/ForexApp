var ForexData = (function () {

    var exports = {};

    var currencies = {
        'USD': 'Dólar estadounidense',
        'GBP': 'Libra esterlina',
        'AUD': 'Dólar australiano',
        'CAD': 'Dólar canadiense',
        'SGD': 'Dólar singapurense',
        'CHF': 'Franco suizo',
        'JPY': 'Yen japonés',
        'PLN': 'Zioty polaco',
        'HKD': 'Dólar de Hong Kong',
        'ZAR': 'Rand Sudafricano',
        'TRY': 'Lira Turca',
        'CZK': 'Corona Checa',
        'NZD': 'Dólar Neozelandés',
        'DKK': 'Corona Danesa',
        'HUF': 'Florín Húngaro',
        'NOK': 'Corona Noruega',
        'SEK': 'Corona Sueca'
    };

    /* URL API desglosada
	 *
	 */
    var STARTURL = 'https://api-fxtrade.oanda.com/v1/candles?instrument=',
        ENDURL = '&dailyAlignment=0&alignmentTimezone=Europe%2FMadrid';

    exports.getCurrencies = function () {
        return currencies;
    };


    exports.initializeRates = function (granularity) {
        for (rateName in currencies) {
            this.getForexRates('EUR', rateName, granularity);
        };
        $('#forexTable').css('visibility', 'visible');
    };


    /* 
	 * 
	 */
    exports.getForexRates = function (RATE_1, RATE_2, GRANULARITY) {
        var self = this;
        $.ajax({
            async: false,
            type: 'GET',
            url: STARTURL + RATE_1 + '_' + RATE_2 + '&count=1&granularity=' + GRANULARITY + ENDURL,
            dataType: 'json',
            success: function (data) {
                self.buildTable(RATE_2, data);
            }
        });
    };


    /* 
	 * 
	 *
	 * @param 
	 * 
	 */
    exports.buildTable = function (rate, data) {

        var row = '<tr id="particularRate">',
            dataToManage = data.candles[0],
            spread = dataToManage.closeAsk - dataToManage.closeBid,
            self = this;


        row += '<td class="has-tip" id="' + rate + '">' + rate + '</td>',
        row += '<td>' + dataToManage.closeBid + '</td>',
        row += '<td>' + dataToManage.closeAsk + '</td>',
        row += '<td>' + spread.toFixed(6) + '</td>';
        if (Modernizr.mq('only screen and (min-width: 460px)')) {
            row += '<td>' + this.manageHour(dataToManage.time) + '</td>';
            row += '<td><img id="' + rate + '" title="Comparar con día 1 del mes" class="dayOne" src="' + ManageNotes.getURL() + '/Content/img/day1.png"/></td>';
        }
        //row += '<td>' + dataToManage.lowBid + '</td>',
        row += '</tr>';

        $('#rates').append(row);

        //To compare a rate with day one of month
        $('img#' + rate).on('click', function () {
            var dataRowToCompare = $(this).parent().siblings();
            self.setRowWithFirstDayCompare('EUR', dataRowToCompare);
        });

        //To set data rates per row
        $('td#' + rate).on('click', function () {
            var dataRow = $(this).siblings();
            self.setRowInRateModalNote(dataRow);
        });
        Currencies.putFlag(rate);
        Currencies.putTooltip(rate, currencies);
    };



    exports.setRowInRateModalNote = function (data) {
        $('#rate-notes').foundation('reveal', 'open');
        var rate = data['context'].textContent;
        $('#rateTable #Rate').html('<img src="' + ManageNotes.getURL() + '/Content/img/banderas/' + rate.toLowerCase().trim() + '.png"> ' + rate);
        $('#rateTable #Bid').text(data[0].textContent);
        $('#rateTable #Ask').text(data[1].textContent);
        $('#rateTable #Spread').text(data[2].textContent);
        $('#rateTable #Hour').text(data[3].textContent);
        $('#rateTable input#NoteTitle').val('[' + this.getTodayDate() + '] ');
    };



    exports.setRowWithFirstDayCompare = function (RATE_1, data) {

        $('#rates-compare').foundation('reveal', 'open');
        $('#tableCompare').html('<tr><td id="Rate"></td><td id="Bid"></td><td id="Ask"></td><td id="Spread"></td><td id="Hour"></td></tr>');
            
        var rate = data['context'].id;
        $('#tableCompare #Rate').html('<img src="' + ManageNotes.getURL() + '/Content/img/banderas/' + rate.toLowerCase().trim() + '.png"> ' + rate);
        $('#tableCompare #Bid').text(data[1].textContent);
        $('#tableCompare #Ask').text(data[2].textContent);
        $('#tableCompare #Spread').text(data[3].textContent);
        $('#tableCompare #Hour').text(data[4].textContent);

        var dataResponse = [],
            today = new Date(),
            mm = today.getMonth() + 1,
            yyyy = today.getFullYear(),
            date = yyyy + '-' + mm + '-' + '01';

        $.ajax({
            async: false,
            type: 'get',
            url: STARTURL + RATE_1 + '_' + rate + '&start=' + date + '&count=1',
            datatype: 'json',
            success: function (datas) {
                dataResponse.push(datas.candles[0]);
            }
        });

        var row = '<tr id="firstday">',
            dataToManage = dataResponse[0],
            spread = dataToManage.closeAsk - dataToManage.closeBid;

        row += '<td>Día 1</td>',
        row += '<td>' + dataToManage.closeBid + '</td>',
        row += '<td>' + dataToManage.closeAsk + '</td>',
        row += '<td>' + spread.toFixed(6) + '</td>';
        if (Modernizr.mq('only screen and (min-width: 460px)')) {
            row += '<td>' + this.manageHour(dataToManage.time) + '</td>';            
        }
        row += '</tr>';

        $('#tableCompare').append(row);
    };


    exports.getTodayDate = function () {
        var today = new Date(),
            dd = today.getDate(),
            mm = today.getMonth() + 1, //January is 0!
            yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }

        return dd + '/' + mm + '/' + yyyy;
    };


    exports.manageHour = function (time) {
        var timeClear = time.substring(0, time.indexOf('.')),
            onlyHour = timeClear.substring(11, 20),
            trueHourInt = parseInt(onlyHour.substring(0, 2)) + 2;

        return trueHourInt.toString() + onlyHour.substring(2, 8);
    };


    exports.equiTable = function (granularity) {
        switch (granularity) {
            case 'S5': return 5000;
            case 'S10': return 10000;
            case 'S30': return 30000;
            case 'M1': return 60000;
            case 'M2': return 2 * 60000;
            case 'M3': return 3 * 60000;
            case 'M4': return 4 * 60000;
            case 'M5': return 300000;
            case 'M10': return 600000;
            case 'M15': return 900000;
            case 'M30': return 2 * 900000;
            case 'H1': return 3600000;
            case 'H2': return 7200000;
            case 'H4': return 14400000;
            case 'H6': return 21600000;
            case 'H8': return 28800000;
            case 'H12': return 43200000;
            default: return 30000;
        }
    };



    exports.convertDateToEUFormat = function (inputFormat) {
        function pad(s) { return (s < 10) ? '0' + s : s; }
        var d = new Date(inputFormat);

        return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/');
    };


    exports.getHistoricalRatesByDate = function (RATE_1, DATE) {
        var dataResponse = [],
            date = DATE.toString();

        for (rate in currencies) {

            $.ajax({
                async: false,
                type: 'GET',
                url: STARTURL + RATE_1 + '_' + rate + '&start=' + date + '&count=1',
                dataType: 'json',
                success: function (data) {
                    dataResponse.push(data.candles[0]);                    
                }
            });
        }

        if (dataResponse.length === 17) {
            return dataResponse;
        }
    };


    exports.getHistoricalRateFirstDay = function (RATE_1, RATE_2, YEAR) {
        var dataResponse = [],
            month, day, date;
            
        for (var i = 1; i <= 12 ; i++) {
            day = i.toString();
            if (day.length === 1) {
                day = '0' + day;
            }

            date = YEAR + '-' + day + '-01';
            $.ajax({
                async: false,
                type: 'GET',
                url: STARTURL + RATE_1 + '_' + RATE_2 + '&start=' + date + '&count=1',
                dataType: 'json',
                success: function (data) {
                    dataResponse.push(data.candles[0]);
                },
                error: function (error) {
                    console.log('error', error);
                }
            });
        }

        if (dataResponse.length === 12) {
            return dataResponse;
        }
    };


    return exports;

})();



var Currencies = (function () {

    var CURRENCIES_URL = 'https://openexchangerates.org/api/currencies.json';

        //HISTORICAL_USD_URL = 'https://openexchangerates.org/api/historical/',
        //OPENEXCH_APIKEY = 'a78d1f5890f0490d8cb6f876db352ddf',
        //HISTORICAL_USD_ENDURL = '.json?app_id=' + OPENEXCH_APIKEY + '&base=USD';

    var FIXER_API_URL = 'http://api.fixer.io/';


    var exports = {};


    exports.getCurrencies = function (callback) {
        var self = this;
        $.ajax({
            type: 'GET',
            url: CURRENCIES_URL,
            dataType: 'json',
            success: function (data) {
                callback(data);
            }
        });
    };


    exports.putFlag = function (rate) {
        var url = ManageNotes.getURL();
        $('#' + rate).html('<img src="' + url + '/Content/img/banderas/' + rate.toLowerCase() + '.png"> ' + rate);
    };

    exports.putTooltip = function (rate, objCurrencies) {
        var objCurrencies
        $('td#' + rate).attr('title', objCurrencies[rate]);
    };

    return exports;

})();
