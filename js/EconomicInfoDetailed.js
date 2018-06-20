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
                url: `https://markets.ft.com/research/webservices/companies/v1/financialperformance?symbols=pson:lse,mrkt&period=a&numHistorical=10&source=` + Main.source,
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
        console.log("response", response);
        var dados = response.data.eventDetails;

        
        /*for (var i=0;i<dados.length;i++) {
            
        }*/

        var trace1 = {
  
          x: ['2017-01-04', '2017-01-05', '2017-01-06', '2017-01-09', '2017-01-10', '2017-01-11', '2017-01-12', '2017-01-13', '2017-01-17', '2017-01-18', '2017-01-19', '2017-01-20', '2017-01-23', '2017-01-24', '2017-01-25', '2017-01-26', '2017-01-27', '2017-01-30', '2017-01-31', '2017-02-01', '2017-02-02', '2017-02-03', '2017-02-06', '2017-02-07', '2017-02-08', '2017-02-09', '2017-02-10', '2017-02-13', '2017-02-14', '2017-02-15'], 
          
          close: [116.019997, 116.610001, 117.910004, 118.989998, 119.110001, 119.75, 119.25, 119.040001, 120, 119.989998, 119.779999, 120, 120.080002, 119.970001, 121.879997, 121.940002, 121.949997, 121.629997, 121.349998, 128.75, 128.529999, 129.080002, 130.289993, 131.529999, 132.039993, 132.419998, 132.119995, 133.289993, 135.020004, 135.509995], 
          
          decreasing: {line: {color: '#7F7F7F'}}, 
          
          high: [116.510002, 116.860001, 118.160004, 119.43, 119.379997, 119.93, 119.300003, 119.620003, 120.239998, 120.5, 120.089996, 120.449997, 120.809998, 120.099998, 122.099998, 122.440002, 122.349998, 121.629997, 121.389999, 130.490005, 129.389999, 129.190002, 130.5, 132.089996, 132.220001, 132.449997, 132.940002, 133.820007, 135.089996, 136.270004], 
          
          increasing: {line: {color: '#17BECF'}}, 
          
          line: {color: 'rgba(31,119,180,1)'}, 
          
          low: [115.75, 115.809998, 116.470001, 117.940002, 118.300003, 118.599998, 118.209999, 118.809998, 118.220001, 119.709999, 119.370003, 119.730003, 119.769997, 119.5, 120.279999, 121.599998, 121.599998, 120.660004, 120.620003, 127.010002, 127.779999, 128.160004, 128.899994, 130.449997, 131.220001, 131.119995, 132.050003, 132.75, 133.25, 134.619995], 
          
          open: [115.849998, 115.919998, 116.779999, 117.949997, 118.769997, 118.739998, 118.900002, 119.110001, 118.339996, 120, 119.400002, 120.449997, 120, 119.550003, 120.419998, 121.669998, 122.139999, 120.93, 121.150002, 127.029999, 127.980003, 128.309998, 129.130005, 130.539993, 131.350006, 131.649994, 132.460007, 133.080002, 133.470001, 135.520004], 
          
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
            rangeslider: {
             visible: false
            }
          },
          yaxis: {
            autorange: true, 
            domain: [0, 1], 
            range: [114.609999778, 137.410004222], 
            type: 'linear'
          }
        };

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