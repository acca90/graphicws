/**
 * EconomicInfo
 *
 * @author Leon
 * @since 07/06/2018
 */
var EconomicInfo = (function($){
    var init = function () {

        var dataIni, dataFim, pais;

        $('#buscarEconomicInfo').off('click').on('click', function () {
            dataIni = $('#dataInicial').val();
            dataFim = $('#dataFinal').val();
            pais = $('#country').val();
        
            /*dataIni = '2018-01-01';
            dataFim = '2018-05-01';
            pais = 'BR';
*/
            //pais = new Array(); multiple=multiple .join(',')
            /*console.log("dataIni", dataIni);
            console.log("dataFim", dataFim);
            console.log("country", pais);*/

            //let source = '6c0f906945618c79';
            var country;
            Main.consulta({
                url: `https://markets.ft.com/research/webservices/economicdata/v1/events?startDate=${dataIni}&endDate=${dataFim}&countryCodes=${pais}&numResults=500&source=` + Main.source,
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
        var dados = response.data.eventDetails;

        var low=0, medium=0, high=0;
        for (var i=0;i<dados.length;i++) {
            try {
                if(dados[i].impact === 'low') {
                    low++;
                } else if(dados[i].impact === 'medium') {
                    medium++;
                } else if(dados[i].impact === 'high') {
                    high++;
                }
            } catch (e) {
                console.log(e);
            }
        }

        var data = [{
            values: [low, medium, high],
            labels: ['Low', 'Medium', 'High'],
            type: 'pie'
        }];
        Plotly.newPlot('graficEconomic', data);
    };

    var color = function () {
        return ('#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6));
    };

    /**
     * Métodos públicos
     */
    return {
        init: init
    };
})(jQuery);