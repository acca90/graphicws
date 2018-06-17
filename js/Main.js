/**
 * Gráfico1
 *
 * @author Matheus
 * @since 07/06/2018
 */
var Main = (function($){
    /**
     * Container principal do DOM
     * @type {*|HTMLElement}
     */
    var $cointainer = $('#container');
    /**
     * Inicialização do módulo
     */
    var init = function () {
        $('#graph1Link').on('click', function () {
            $cointainer.load('companies.html');
        });
        $('#graph2Link').on('click', function () {
            $cointainer.load('HistoricoTrimestral.html');
        });
        $('#graph3Link').on('click', function () {
            $cointainer.load('economicInfo.html');
        });
    };
    /**
     * Converte Json to CSV
     * @param objArray
     * @returns {string}
     */
    var parseCsv = function (objArray ) {
        var array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
        var str = '';
        for (var i = 0; i < array.length; i++) {
            var line = '';
            for (var index in array[i]) {
                if (line !== '') line += ','
                line += array[i][index];
            }
            str += line + '\r\n';
        }
        return str;
    };
    /**
     * Consulta Ajax;
     */
    var consulta = function ( param ) {
        cleanError();
        $.ajax({
            url: param.url,
            method: 'get',
            success: param.success,
            error: defaultError
        })
    };
    /**
     * Default Error
     */
    var defaultError = function () {
        $('#errorBand').show();
        $('#errorMsg').html("Falha ao consultar Web Service");
    };
    /**
     * Default Error
     */
    var msgError = function ( msg ) {
        $('#errorBand').show();
        $('#errorMsg').html(msg);
    };
    /**
     * Clean error
     */
    var cleanError = function () {
        $('#errorBand').hide();
        $('#errorMsg').html("");
    };
    /**
     * Métodos públicos
     */
    return {
        init: init,
        consulta: consulta,
        parseCsv: parseCsv,
        msgError: msgError,
        source: 'cadedd8a538bb6b4'
    };
})(jQuery);