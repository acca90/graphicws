/**
 * Gráfico1
 *
 * @author Matheus
 * @since 07/06/2018
 */
var HistoricoTrimestral = (function($){
    var data = [];
    /**
     * Init
     */
    var init = function () {
        Plotly.newPlot('grafico', data);
        $('#buscar').off('click').on('click', function () {
            buscarAcao();
        });
        $('#nomeAcao').off('keyup').on('keyup', function (e) {
            if (e.keyCode === 13) {
                buscarAcao();
            }
        });
        $('#limpar').off('click').on('click', function () {
            $('#nomeAcao').val('');
            data = [];
            Plotly.newPlot('grafico', data);
        });
    };
    /**
     * Executa busca
     */
    var buscarAcao = function () {
        $('#detalhes').html("");
        var nomeAcao = $('#nomeAcao').val();
        if (nomeAcao != null) {
            incluirAcao(nomeAcao);
        } else {
            Main.msgError("Informe uma ação para consultar histórico");
        }
        $('#nomeAcao').val('');
    };
    /**
     * Inicialização do módulo
     */
    var incluirAcao = function ( acao ) {
        Plotly.purge('grafico');
        Main.consulta({
            url: 'https://markets.ft.com/research/webservices/companies/v1/financialperformance?symbols='+acao+'&period=a&numHistorical=400&source=' + Main.source,
            success: function ( response ) {
                try {
                    processaResposta(response);
                    run();
                } catch (e) {
                    Main.msgError("Não foi possível montar o gráfico");
                    console.error(e);
                }
            }
        })
    };
    /**
     * Processa resposta vinda do webservice
     * @param response
     */
    var processaResposta = function ( response ) {
        var empresas = response.data.items;
        var dataArray = [];
        for (var i=0;i<empresas.length;i++) {
            try {
                data.push(geraTrace(empresas[i],i))
            } catch (e) {
            }
        }
    };
    /**
     * Gera trace de dados para empresa
     * @param empresa Empresa
     * @param index índice
     */
    var geraTrace = function ( empresa, index ) {
        return {
            type: "scatter",
            mode: "lines",
            name: empresa.basic.name,
            x: getX(empresa.performanceAnnouncements.revenue.announcements),
            y: getY(empresa.performanceAnnouncements.revenue.announcements),
            line: {
                color: getCor(data.length)
            }
        }
    };
    /**
     * Busca o valor de X para o gráfico
     * @param announcements
     */
    var getX = function ( announcements ) {
        var x = [];
        for (var i=0;i<announcements.historical.length;i++) {
            x.push(trimestre(announcements.historical[i]))
        }
        console.log(x);
        return x;
    };
    /**
     * Gera data de trimestre
     * @param historico
     */
    var trimestre = function ( historico ) {
        var trimeste = parseInt(historico.quarter)*3;
        if (trimeste < 10 && trimeste > 0) {
            trimeste = "0"+trimeste
        } else if (trimeste < 1)
            trimeste = "01";

        return historico.year + "-" + trimeste + "-01";
    };
    /**
     * Busca o valor de Y para o gráfico
     * @param announcements
     */
    var getY = function ( announcements ) {
        var y = [];
        for (var i=0;i<announcements.historical.length;i++) {
            y.push(announcements.historical[i].reported)
        }
        return y;
    };
    /**
     * Retorna uma cor da paleta
     * @param index
     */
    var getCor = function ( index ) {
        var paleta = [
            '#E87E04',
            '#9A12B3',
            '#E43A45',
            '#4B77BE',
            '#26C281',
            '#796799'
        ];
        return paleta[index];
    };
    /**
     * Roda o gráfico com base no response
     */
    var run = function () {
        Plotly.newPlot('grafico', data);
    };
    /**
     * Métodos públicos
     */
    return {
        init: init
    };
})(jQuery);


