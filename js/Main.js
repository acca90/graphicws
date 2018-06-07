/**
 * Gráfico1
 *
 * @author Matheus
 * @since 07/06/2018
 */
let Main = (function($){
    /**
     * Container principal do DOM
     * @type {*|HTMLElement}
     */
    let $cointainer = $('#container');
    /**
     * Inicialização do módulo
     */
    let init = function () {
        $('#graph1Link').on('click', function () {
            $cointainer.load('grafico1.html');
        });
        $('#graph2Link').on('click', function () {
            $cointainer.load('grafico2.html');
        });
    };
    /**
     * Métodos públicos
     */
    return {
        init: init
    };
})(jQuery);