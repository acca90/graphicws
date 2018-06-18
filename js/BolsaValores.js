/**
 * Gráfico1
 *
 * @author Matheus
 * @since 07/06/2018
 */
var BolsaValores = (function($){
    /**
     * Inicialização do módulo
     */
    var init = function () {
        Main.consulta({
            url: 'https://markets.ft.com/research/webservices/companies/v1/officers?symbols=pson:lse,mrkt&source=' + Main.source,
            success: function ( response ) {
                run()
                //$('#receive').html(JSON.stringify(response));
            }
        })
    };
    /**
     * Roda o gráfico com base no response
     */
    var run = function ( response ) {

        Plotly.d3.csv('https://raw.githubusercontent.com/plotly/datasets/master/2010_alcohol_consumption_by_country.csv', function(err, rows) {

            function unpack(rows, key) {
                return rows.map(function(row) { return row[key]; });
            }

            var data = [{
                type: 'choropleth',
                locationmode: 'country names',
                locations: unpack(rows, 'location'),
                z: unpack(rows, 'alcohol'),
                text: unpack(rows, 'location'),
                autocolorscale: true
            }];

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

            Plotly.plot(document.getElementById('grafico'), [{
                "type": "choropleth",
                "locationmode": "country names",
                "locations": ["Brazil","China","Uruguay","Japan"],
                "z": ["17.5", "11.5","27.1","1.1"],
                "text": ["Brazil", "China","Uruguay","Japan"],
                "autocolorscale": true
            }], layout, {showLink: false});
        });

        // TODO https://markets.ft.com/research/webservices/companies/v1/docs

        /**
         Plotly.d3.csv('https://raw.githubusercontent.com/plotly/datasets/master/2014_world_gdp_with_codes.csv', function(err, rows){
            function unpack(rows, key) {
                return rows.map(function(row) { return row[key]; });
            }

            var data = [{
                type: 'choropleth',
                locations: unpack(rows, 'CODE'),
                z: unpack(rows, 'GDP (BILLIONS)'),
                text: unpack(rows, 'COUNTRY'),
                colorscale: [
                    [0,'rgb(5, 10, 172)'],[0.35,'rgb(40, 60, 190)'],
                    [0.5,'rgb(70, 100, 245)'], [0.6,'rgb(90, 120, 245)'],
                    [0.7,'rgb(106, 137, 247)'],[1,'rgb(220, 220, 220)']],
                autocolorscale: false,
                reversescale: true,
                marker: {
                    line: {
                        color: 'rgb(180,180,180)',
                        width: 0.5
                    }
                },
                tick0: 0,
                zmin: 0,
                dtick: 1000,
                colorbar: {
                    autotic: false,
                    tickprefix: '$',
                    title: 'GDP'
                    Billions 'US$'
                }
            }];

            var layout = {
                title: '2014 Global GDP
                Source:  'CIA World Factbook',
                geo:{
                    showframe: false,
                    showcoastlines: false,
                    projection:{
                    type: 'mercator'
                }
            }
        };
            Plotly.plot(myDiv, data, layout, {showLink: false});
        });
         */
    };
    /**
     * Métodos públicos
     */
    return {
        init: init
    };
})(jQuery);


