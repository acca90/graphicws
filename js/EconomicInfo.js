/**
 * EconomicInfo
 *
 * @author Leon
 * @since 07/06/2018
 */
var EconomicInfo = (function($){
    //https://markets.ft.com/research/webservices/economicdata/v1/events?startDate=2013-09-07&endDate=2014-09-07&numResults=10000&source=cadedd8a538bb6b4
    var init = function () {
        let url = 'https://markets.ft.com/research/webservices/economicdata/v1/events?startDate=2013-09-07&endDate=2014-09-07&numResults=400&source=cadedd8a538bb6b4';
        console.log("Teste");
        fetch(url) // Call the fetch function passing the url of the API as a parameter
            .then(function(response) {
                console.log(response.json());
                var data = [{
                    values: [19, 26, 55],
                    labels: ['Residential', 'Non-Residential', 'Utility'],
                    type: 'pie'
                }];
                Plotly.newPlot('graficEconomic', data);
            })
            .catch(function() {
                concole.log("Error");
            }
        );
    };

    /**
     * Métodos públicos
     */
    return {
        init: init
    };
})(jQuery);