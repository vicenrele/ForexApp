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

    return exports;

})();