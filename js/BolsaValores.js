/**
 * Gráfico1
 *
 * @author Matheus
 * @since 07/06/2018
 */
var BolsaValores = (function($) {
    /**
     * Array com bolsas de valores localizadas
     */
    var arrayBolsas = [];
    var arrayValores = [];
    /**
     * Inicialização do módulo
     */
    var init = function () {
        Main.consulta({
            url: 'https://markets.ft.com/research/webservices/companies/v1/issuelist?symbols='+Main.symbols+'&source=' + Main.source,
            success: function ( response ) {
                processaResposta(response);
                run()
            }
        })
    };
    /**
     * Processa retorno do web service
     * @param response
     */
    var processaResposta = function ( response ) {
        var empresas = response.data.items;
        arrayValores = [];
        arrayBolsas = [];
        for (var i=0;i<empresas.length;i++) {
            try {
                geraTrace(empresas[i]);
            } catch (e) {
                console.log(e);
            }
        }
        sort();
        contaPaises();
        run();
    };
    /**
     * Gera trace da empresa pesquisada
     * @param empresa Empresa
     */
    var geraTrace = function ( empresa ) {
        for (var i=0;i<empresa.issues.length;i++) {
            arrayBolsas.push(empresa.issues[i].countryCode);
        }
    };
    /**
     * Ordena array
     */
    var sort = function () {
        arrayBolsas = arrayBolsas.sort();
    };
    /**
     * Conta quantidade de países
     */
    var contaPaises = function () {
        var i=0;
        var tempArrayBolsas = [];
        var ref = "";
        var conta;
        while (true) {
            if (i == arrayBolsas.length) {
                arrayBolsas = tempArrayBolsas;
                tempArrayBolsas.push(Main.isoCountries[ref]);
                arrayValores.push(conta);
                break;
            }
            if (ref == "") {
                ref = arrayBolsas[i];
                conta = 1;
            } else if (ref != arrayBolsas[i]) {
                tempArrayBolsas.push(Main.isoCountries[ref]);
                arrayValores.push(conta);
                ref = arrayBolsas[i];
                conta = 1;
            } else {
                conta++;
            }
            i++;
        }
    };
    /**
     * Roda o gráfico com base no response
     */
    var run = function ( response ) {
        var layout = {
            title: 'Pure alcohol consumption among adults (age 15+) in 2010',
            geo: {
                projection: {
                    showframe: false,
                    showcoastlines: false,
                    type: 'robinson'
                }
            }
        };

        Plotly.plot('grafico', [{
            "type": "choropleth",
            "locationmode": "country names",
            "locations": arrayBolsas,
            "z": arrayValores,
            "text": arrayBolsas,
            "autocolorscale": true
        }], layout, {showLink: false});
    };
    /**
     * Métodos públicos
     */
    return {
        init: init
    };
})(jQuery);


