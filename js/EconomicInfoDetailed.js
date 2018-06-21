/**
 * EconomicInfo
 *
 * @author Leon
 * @since 07/06/2018
 */
var EconomicInfoDetailed = (function($){
    var init = function () {

        var dataIni, dataFim, pais;

        $('#buscarEconomicInfoDetailed').off('click').on('click', function () {
            company = $('#company').val();
        
            /*dataIni = '2018-01-01';
            dataFim = '2018-05-01';
            pais = 'BR';
*/
            //pais = new Array(); multiple=multiple .join(',')
            /*console.log("dataIni", dataIni);
            console.log("dataFim", dataFim);
            console.log("country", pais);*/

            //let source = '6c0f906945618c79';
            Main.consulta({
                //https://markets.ft.com/research/webservices/companies/v1/financialperformance?symbols=pson:lse,mrkt&period=a&numHistorical=10&source=6c0f906945618c79
                url: `https://markets.ft.com/research/webservices/companies/v1/financialperformance?symbols=${company}&period=a&numHistorical=15&source=` + Main.source,
                success: function ( response ) {
                    processaResposta(response);
                }
            })

        }); 
    };
    /**
     * Processa retorno do web service
     * @param response
     */
    var processaResposta = function ( response ) {
        //console.log("response", response);
        var dados = response.data.items[0].performanceAnnouncements.revenue.announcements.historical;
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
                //TODO why this piece of shit doesn't work?
                open.push(dados[reported.length-1].reported);
            }
            reported.push(dados[i].reported);
        }

/*        for (var i=0;i<dados.length;i++) {
            console.log(year[i]);
            console.log(high[i]);
            console.log(low[i]);
            console.log(reported[i]);
            console.log(open[i]);
        }*/

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
                range: ['2017-01-03 12:00', '2017-02-15 12:00'], 
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

        $('.panel-body').append('<div>hello</div>');

        Plotly.plot('graficEconomicDetailed', data, layout);
    };

    /**
     * Métodos públicos
     */
    return {
        init: init
    };
})(jQuery);

/*

"data": {
    "items": [
      {
        "symbolInput": "pson:lse",
        "basic": {
          "symbol": "PSON:LSE",
          "name": "Pearson",
          "exchange": "London Stock Exchange",
          "exhangeCode": "LSE",
          "bridgeExchangeCode": "GBL",
          "currency": "GBp"
        },
        "performanceAnnouncements": {
          "revTTM": 4513000000.0,
          "lastYearEarnings": 401000000.0,
          "revenue": {
            "smartText": " Pearson plc had revenues for the full year 2017 of 4.51bn. This was 0.86% below the prior year's results.",
            "avgPercentChange": "1.121149",
            "announcements": {
              "forecast": [
                {
                  "currencyCode": "GBP",
                  "consensus": 4185668700.0,
                  "high": 4761000000.0,
                  "low": 3651000000.0,
                  "numAnalysts": 17.0,
                  "quarter": 0,
                  "year": 2019
                },
                {
                  "currencyCode": "GBP",
                  "consensus": 4204659800.0000005,
                  "high": 4714000000.0,
                  "low": 3672314000.0,
                  "numAnalysts": 16.0,
                  "quarter": 0,
                  "year": 2018
                }
              ],
              "historical": [
                {
                  "announceDate": "2018-02-23T07:01:00",
                  "currencyCode": "GBP",
                  "consensus": 4571862900.0,
                  "high": 4735000000.0,
                  "low": 4303000000.0,
                  "reported": 4513000000.0,
                  "numAnalysts": 17.0,
                  "quarter": 0,
                  "year": 2017,
                  "percentChange": -0.85677
                },
                {
                  "announceDate": "2017-02-24T09:43:00",
                  "currencyCode": "GBP",
                  "consensus": 4429349500.0,
                  "high": 4670000000.0,
                  "low": 3969000000.0,
                  "reported": 4552000000.0,
                  "numAnalysts": 18.0,
                  "quarter": 0,
                  "year": 2016,
                  "percentChange": 1.88004
                },
                {
                  "announceDate": "2016-02-26T08:50:00",
                  "currencyCode": "GBP",
                  "consensus": 4885301400.0,
                  "high": 4972000000.0,
                  "low": 4765034000.0,
                  "reported": 4468000000.0,
                  "numAnalysts": 20.0,
                  "quarter": 0,
                  "year": 2015,
                  "percentChange": -8.32991
                },
                {
                  "announceDate": "2015-02-27T12:46:00",
                  "currencyCode": "GBP",
                  "consensus": 4891509900.0,
                  "high": 5057562000.0,
                  "low": 4816000000.0,
                  "reported": 4874000000.0,
                  "numAnalysts": 18.0,
                  "quarter": 0,
                  "year": 2014,
                  "percentChange": -3.84691
                },
                {
                  "announceDate": "2014-02-28T07:02:00",
                  "currencyCode": "GBP",
                  "consensus": 5796822500.0,
                  "high": 6288000000.0,
                  "low": 5262000000.0,
                  "reported": 5069000000.0,
                  "numAnalysts": 16.0,
                  "quarter": 0,
                  "year": 2013,
                  "percentChange": -17.06479
                },
                {
                  "announceDate": "2013-02-25T07:00:00",
                  "currencyCode": "GBP",
                  "consensus": 6197825800.0,
                  "high": 6480000000.0,
                  "low": 6059000000.0,
                  "reported": 6112000000.0,
                  "numAnalysts": 16.0,
                  "quarter": 0,
                  "year": 2012,
                  "percentChange": 4.26476
                },
                {
                  "announceDate": "2012-02-27T07:00:00",
                  "currencyCode": "GBP",
                  "consensus": 5938506100.0,
                  "high": 6113450000.0,
                  "low": 5785779000.0,
                  "reported": 5862000000.0,
                  "numAnalysts": 15.0,
                  "quarter": 0,
                  "year": 2011,
                  "percentChange": 3.51404
                },
                {
                  "announceDate": "2011-02-28T07:00:00",
                  "currencyCode": "GBP",
                  "consensus": 5794831500.0,
                  "high": 5968950000.0,
                  "low": 5625000000.0,
                  "reported": 5663000000.0,
                  "numAnalysts": 13.0,
                  "quarter": 0,
                  "year": 2010,
                  "percentChange": 0.69346
                },
                {
                  "announceDate": "2010-03-01T07:00:00",
                  "currencyCode": "GBP",
                  "consensus": 5486275200.0,
                  "high": 5579000000.0,
                  "low": 5356000000.0,
                  "reported": 5624000000.0,
                  "numAnalysts": 10.0,
                  "quarter": 0,
                  "year": 2009,
                  "percentChange": 16.89877
                },
                {
                  "announceDate": "2009-03-02T07:00:00",
                  "currencyCode": "GBP",
                  "consensus": 4762357700.0,
                  "high": 4867000000.0,
                  "low": 4660303600.0,
                  "reported": 4811000000.0,
                  "numAnalysts": 7.0,
                  "quarter": 0,
                  "year": 2008,
                  "percentChange": 14.0588
                }
              ]
            }
          },
          "earnings": {
            "smartText": " Pearson plc had revenues for the full year 2017 of 4.51bn. This was 0.86% below the prior year's results.",
            "avgPercentChange": "9.014015",
            "announcements": {
              "forecast": [
                {
                  "currencyCode": "GBX",
                  "consensus": 56.783,
                  "high": 70.2,
                  "low": 44.1,
                  "numAnalysts": 19.0,
                  "quarter": 0,
                  "year": 2019
                },
                {
                  "currencyCode": "GBX",
                  "consensus": 50.329,
                  "high": 60.0,
                  "low": 43.1,
                  "numAnalysts": 18.0,
                  "quarter": 0,
                  "year": 2018
                }
              ],
              "historical": [
                {
                  "announceDate": "2018-02-23T07:01:00",
                  "currencyCode": "GBX",
                  "consensus": 51.771,
                  "high": 54.8,
                  "low": 47.0,
                  "reported": 54.1,
                  "numAnalysts": 18.0,
                  "quarter": 0,
                  "year": 2017,
                  "percentChange": -7.9932
                },
                {
                  "announceDate": "2017-02-24T09:43:00",
                  "currencyCode": "GBX",
                  "consensus": 56.621,
                  "high": 57.23,
                  "low": 55.5,
                  "reported": 58.8,
                  "numAnalysts": 17.0,
                  "quarter": 0,
                  "year": 2016,
                  "percentChange": -16.35846
                },
                {
                  "announceDate": "2016-02-26T08:50:00",
                  "currencyCode": "GBX",
                  "consensus": 69.249,
                  "high": 70.01,
                  "low": 68.35,
                  "reported": 70.3,
                  "numAnalysts": 21.0,
                  "quarter": 0,
                  "year": 2015,
                  "percentChange": 5.3973
                },
                {
                  "announceDate": "2015-02-27T12:46:00",
                  "currencyCode": "GBX",
                  "consensus": 65.08,
                  "high": 66.5,
                  "low": 60.197,
                  "reported": 66.7,
                  "numAnalysts": 19.0,
                  "quarter": 0,
                  "year": 2014,
                  "percentChange": -4.85021
                },
                {
                  "announceDate": "2014-02-28T07:02:00",
                  "currencyCode": "GBX",
                  "consensus": 71.19,
                  "high": 82.7,
                  "low": 69.501,
                  "reported": 70.1,
                  "numAnalysts": 18.0,
                  "quarter": 0,
                  "year": 2013,
                  "percentChange": -16.74584
                },
                {
                  "announceDate": "2013-02-25T07:00:00",
                  "currencyCode": "GBX",
                  "consensus": 84.007,
                  "high": 86.7,
                  "low": 82.076,
                  "reported": 84.2,
                  "numAnalysts": 18.0,
                  "quarter": 0,
                  "year": 2012,
                  "percentChange": -2.65896
                },
                {
                  "announceDate": "2012-02-27T07:00:00",
                  "currencyCode": "GBX",
                  "consensus": 84.034,
                  "high": 86.2,
                  "low": 77.509,
                  "reported": 86.5,
                  "numAnalysts": 16.0,
                  "quarter": 0,
                  "year": 2011,
                  "percentChange": 82.87526
                },
                {
                  "announceDate": "2009-03-02T07:00:00",
                  "currencyCode": "GBX",
                  "reported": 47.3,
                  "quarter": 0,
                  "year": 2008,
                  "percentChange": 9.24292
                },
                {
                  "announceDate": "2008-03-03T07:01:00",
                  "currencyCode": "GBX",
                  "consensus": 44.81,
                  "high": 45.4,
                  "low": 44.22,
                  "reported": 43.298,
                  "numAnalysts": 2.0,
                  "quarter": 0,
                  "year": 2007,
                  "percentChange": -22.40502
                },
                {
                  "announceDate": "2007-02-26T07:00:00",
                  "currencyCode": "GBX",
                  "consensus": 38.906,
                  "high": 39.98,
                  "low": 37.88,
                  "reported": 55.8,
                  "numAnalysts": 5.0,
                  "quarter": 0,
                  "year": 2006,
                  "percentChange": 63.63636
                }
              ]
            }
          }
        }
      },
      {
        "symbolInput": "mrkt",
        "partialError": "No symbol match found"
      }
    ]
  },
  "timeGenerated": "2018-06-20T02:15:44"
}

*/