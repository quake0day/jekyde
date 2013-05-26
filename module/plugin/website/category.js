
var fs = require('fs');
var paging = require('../../utility/paging');
var swig = require('../../converter/swig');

jekyde.extend.website(function(site, envs){
    var outputs = [];
    var link, html;
    if (fs.existsSync(envs.tdir + '/layout/categories.html')) {
        link = site.category_dir + '/index.html';
        html = swig('categories', {site: site});
        outputs.push([link, html]);
    }
    function generate(layout) {
        var categories = site.categories;
        var base, results, data;
        for (var k in categories) {
            base = site.baseurl + site.category_dir + '/' + k.toLowerCase() + '/';
            results = paging(base, categories[k]);
            for (var i = 0; i < results.length; i++){
                data = results[i];
                data.site = site;
                link = data.paginator.current_url.slice(site.baseurl.length) + 'index.html';
                html = swig(layout, data);
                outputs.push([link, html]);
            }
        };
    }
    if (fs.existsSync(envs.tdir + '/layout/category.html')) {
        generate('category');
    } else {
        generate('index');
    }
    return outputs;
});
