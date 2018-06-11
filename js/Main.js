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
            $cointainer.load('SegundoGrafico.html');
        });
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
        consulta: consulta
    };
})(jQuery);