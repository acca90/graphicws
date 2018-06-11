/**
 * Gráfico1
 *
 * @author Matheus
 * @since 07/06/2018
 */
var Companies = (function($){
    /**
     * Inicialização do módulo
     */
    var init = function () {
        TESTER = document.getElementById('tester');
        Plotly.plot(
            TESTER, [
                {
                    x: [1, 2, 3, 4, 5],
                    y: [1, 2, 4, 8, 16]
                }
            ],
            {
                margin: { t: 0 }
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