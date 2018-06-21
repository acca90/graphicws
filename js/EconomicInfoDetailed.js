/**
 * EconomicInfo
 *
 * @author Leon
 * @since 07/06/2018
 */
var EconomicInfoDetailed = (function($){
    var init = function () {;
        $('#buscarEconomicInfoDetailed').off('click').on('click', function () {
            company = $('#companyPerformance').val();
            if (company != null) {
                Plotly.purge('graficEconomicDetailed');
                $('#dataOne').remove();
                $('#dataTwo').remove();
                $('#dataThreeA').remove();
                $('#dataThreeB').remove();

                Main.consulta({
                    url: `https://markets.ft.com/research/webservices/companies/v1/financialperformance?symbols=${company}&period=a&numHistorical=15&source=` + Main.source,
                    success: function ( response ) {
                        processaResposta(response);
                    }
                });
            } else {
                Main.msgError("Informe uma ação");
            }
        });
    };
    /**
     * Processa retorno do web service
     * @param response
     */
    var processaResposta = function ( response ) {
        //console.log("response", response);
        var announcements = response.data.items[0];
        var dados = announcements.performanceAnnouncements.revenue.announcements.historical;
        //console.log(dados);

        var year = [];
        var high = [];
        var low = [];
        var reported = [];
        var open = [];

        for (var i=0;i<dados.length;i++) {
            year.push(`${dados[i].year}`);
            high.push(dados[i].high);
            low.push(dados[i].low);
            if(i == 0) {
                open.push(dados[i].reported - ((dados[i].reported * dados[i].percentChange) / 100));
            } else {
                open.push(dados[reported.length-1].reported);
            }
            reported.push(dados[i].reported);
        }

        var trace1 = {
            x: year, 
            close: reported,
            decreasing: {line: {color: '#7F7F7F'}}, 
            high: high,
            increasing: {line: {color: '#17BECF'}}, 
            line: {color: 'rgba(31,119,180,1)'}, 
            low: low,
            open: open,

            type: 'candlestick', 
            xaxis: 'x', 
            yaxis: 'y'
        };

        var data = [trace1];

        var layout = {
            dragmode: 'zoom', 
            margin: {
                r: 10, 
                t: 25, 
                b: 40, 
                l: 60
            }, 
            showlegend: false, 
            xaxis: {
                autorange: true, 
                domain: [0, 1], 
                range: ['2001-01-03 12:00', '2017-02-15 12:00'], 
                rangeslider: {
                    visible: false
                },
                title: 'Date', 
                type: 'date'
            }, 
            yaxis: {
                autorange: true, 
                domain: [0, 1], 
                range: [114.609999778, 137.410004222], 
                type: 'linear'
            }
        };


        var name = announcements.basic.name;
        var currency = announcements.basic.currency;
        var exchange = announcements.basic.exchange;
        var forecast = (announcements.performanceAnnouncements.revenue.announcements.forecast[0].consensus).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        var forecastb = (announcements.performanceAnnouncements.revenue.announcements.forecast[1].consensus).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

        Plotly.plot('graficEconomicDetailed', data, layout);

        $('.panel-body').append(`<div id="dataOne">${name} on ${exchange} with ${currency} as currency.</div>`);
        $('.panel-body').append(`<div id="dataTwo">${announcements.performanceAnnouncements.revenue.smartText}.</div>`);
        $('.panel-body').append(`<div id="dataThreeA">A previsão para 2018 é de ${forecastb}.</div>`);
        $('.panel-body').append(`<div id="dataThreeB">A previsão para 2019 é de ${forecast}.</div>`);
        
    };

    /**
     * Métodos públicos
     */
    return {
        init: init
    };
})(jQuery);