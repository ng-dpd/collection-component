var fs = require('fs'),
    path = require('path'),
    template, oneLinedTemplate, directive;

template = fs.readFileSync(path.resolve('src/collection-component.html'));
oneLinedTemplate = template.toString().split(/\s*\n\s*/).join('');

directive = fs.readFileSync(path.resolve('src/collection-component.js')).toString();
directive = directive.replace(
    /templateUrl\s*\:\s*? 'collection\-component\.html\'/, 'template: \'' +
    oneLinedTemplate +'\'');

fs.writeFileSync(path.resolve('collection-component.js'), directive);
