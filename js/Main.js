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
     * Métodos públicos
     */
    return {
        init: init
    };
})(jQuery);