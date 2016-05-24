var UseForexCharts = (function () {

    var exports = {};


    exports.addChart = function (id, arrayData, options) {
        $(id).highcharts({
            chart: {
                type: options.chartType,
                options3d: {
                    enabled: true,
                    alpha: 15,
                    beta: 15,
                    viewDistance: 25,
                    depth: 40
                }
            },
            title: {
                text: options.titleText,
                x: -20 //center
            },
            subtitle: {
                text: options.subtitle,
                x: -20
            },
            xAxis: {
                categories: options.catego
            },
            yAxis: {
                title: {
                    text: options.yAxisTitle
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }],
                labels: {
                    format: '{value:.4f}'
                }
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true
                    },
                    enableMouseTracking: true
                }
            },
            tooltip: {
                valueSuffix: ''
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            series: arrayData,


        }, function (chart) { $('text[text-anchor="end"]').empty(); });
    };

    exports.addGauge = function (id, value, options) {
        var gaugeOptions = {

            chart: {
                type: 'solidgauge'
            },

            title: null,

            pane: {
                //center: ['50%', '85%'],
                size: '80%',
                startAngle: -90,
                endAngle: 90,
                background: {
                    backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
                    innerRadius: '60%',
                    outerRadius: '100%',
                    shape: 'arc'
                }
            },

            tooltip: {
                enabled: false
            },

            // the value axis
            yAxis: {
                stops: [
                    [0.3, '#DF5353'], // red
                    [0.6, 'orange'], //orange
                    [1.2, '#DDDF0D'], // yellow
                    [2.4, '#55BF3B'] // green
                ],
                lineWidth: 0,
                minorTickInterval: null,
                tickPixelInterval: 400,
                tickWidth: 0,
                title: {
                    y: -80
                },
                labels: {
                    y: 16
                }
            },

            plotOptions: {
                solidgauge: {
                    dataLabels: {
                        y: -45,
                        borderWidth: 0,
                        useHTML: true
                    }
                }
            }
        };


        $(id).highcharts(Highcharts.merge(gaugeOptions, {
            yAxis: {
                min: options.min,
                max: options.max,
                title: {
                    text: options.rateConverted
                }
            },

            series: [{
                name: options.rateConverted,
                data: [value],
                dataLabels: {
                    format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                        ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y:.4f}</span><br/>' +
                           '<span style="font-size:24px;color:silver">' + options.currencySymbol + '</span></div>'
                }
            }]

        }));
        $('text[text-anchor="end"]').empty();
    };

    return exports;

})();