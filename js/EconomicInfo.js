/**
 * EconomicInfo
 *
 * @author Leon
 * @since 07/06/2018
 */
var EconomicInfo = (function($){
    var init = function () {
        let source = '6c0f906945618c79';
        let country;
        Main.consulta({
            url: 'https://markets.ft.com/research/webservices/economicdata/v1/events?startDate=2018-06-01&endDate=2018-06-18&countryCodes=BR&numResults=500&source=' + source,
            success: function ( response ) {
                processaResposta(response);
            }
        })
    };
    /**
     * Processa retorno do web service
     * @param response
     */
    var processaResposta = function ( response ) {
        console.log("response", response);

        var data = [{
            values: [19, 26, 55],
            labels: ['Residential', 'Non-Residential', 'Utility'],
            type: 'pie'
        }];
        Plotly.newPlot('graficEconomic', data);
    };


    /**
     * Métodos públicos
     */
    return {
        init: init
    };
})(jQuery);