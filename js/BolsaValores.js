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
        $('#buscar').off('click').on('click', function () {
            execSearch();
        });
        $('#nomeAcao').off('keyup').on('keyup', function (e) {
            if (e.keyCode === 13) {
                execSearch();
            }
        });
    };
    /**
     * Executa busca
     */
    var execSearch = function () {
        var nomeAcao = $('#nomeAcao').val();
        if (nomeAcao != null) {
            Plotly.purge('grafico');
            buscar(nomeAcao);
        } else {
            Main.msgError("Informe uma ação para buscar sua localização");
        }
    };
    /**
     * Busca dados da ação
     * @param acao
     */
    var buscar = function ( acao ) {
        Main.consulta({
            url: 'https://markets.ft.com/research/webservices/companies/v1/issuelist?symbols='+acao+'&source=' + Main.source,
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
            title: 'Países que comercializam ações da empresa',
            geo: {
                countrycolor: 'rgb(255, 255, 255)',
                showland: true,
                landcolor: 'rgb(117, 117, 117)',
                subunitcolor: 'rgb(255, 255, 255)',
                projection: {
                    showframe: false,
                    showcoastlines: true,
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
            "colorscale": [
                [0.4, 'rgb(242,240,247)'],
                [0.5, 'rgb(218,218,235)'],
                [0.6, 'rgb(188,189,220)'],
                [0.7, 'rgb(158,154,200)'],
                [0.8, 'rgb(117,107,177)'],
                [1, 'rgb(84,39,143)']
            ],
        }], layout, {showLink: false});
    };
    /**
     * Métodos públicos
     */
    return {
        init: init
    };
})(jQuery);


