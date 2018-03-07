'use strict';

/**
 * Requirements
 * @ignore
 */
const JspFilterReplacementRenderer = require('./JspFilterReplacementRenderer.js').JspFilterReplacementRenderer;
const PathesConfiguration = require('entoj-system').model.configuration.PathesConfiguration;
const assertParameter = require('entoj-system').utils.assert.assertParameter;
const VinylFile = require('vinyl');
const co = require('co');
const glob = require('glob');
const path = require('path');
const fs = require('fs');


/**
 * Renders |svgViewBox filters
 */
class JspSvgViewBoxFilterRenderer extends JspFilterReplacementRenderer
{
    /**
     * @inheritDocs
     */
    constructor(pathesConfiguration)
    {
        super();

        // Check params
        assertParameter(this, 'pathesConfiguration', pathesConfiguration, true, PathesConfiguration);

        // Assign options
        this._pathesConfiguration = pathesConfiguration;
        this._dataVariableName = '__viewBoxes';
    }


    /**
     * @inheritDoc
     */
    static get injections()
    {
        return { 'parameters': [PathesConfiguration] };
    }


    /**
     * @inheritDoc
     */
    static get className()
    {
        return 'export.renderer/JspSvgViewBoxFilterRenderer';
    }


    /**
     * @type {Boolean|Array}
     */
    get filterName()
    {
        return ['svgViewBox'];
    }


    /**
     * @type {model.configuration.PathesConfiguration}
     */
    get pathesConfiguration()
    {
        return this._pathesConfiguration;
    }


    /**
     * @type {String}
     */
    get dataVariableName()
    {
        return this._dataVariableName;
    }


    /**
     * @inheritDocs
     */
    createAdditionalFiles(configuration)
    {
        // Get data
        const viewBoxes = {};
        const basePath = configuration.moduleConfiguration.svgBasePath;
        const globPath = path.join(this.pathesConfiguration.sites, basePath, '/*.svg');
        const files = glob.sync(globPath);
        for (const file of files)
        {
            const name = path.basename(file, '.svg');
            viewBoxes[name] = '0 0 0 0';
            const icon = fs.readFileSync(file, { encoding: 'utf8' });
            const viewbox = icon.match(/viewBox="([^"]*)"/i);
            if (viewbox && viewbox[1])
            {
                viewBoxes[name] = viewbox[1];
            }
        }

        // Generate map
        let result = '';
        result+= '<%@ page contentType="text/html; charset=UTF-8" session="false" %>';
        result+= '<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>';
        result+= '<c:if test="${ empty ' + this.dataVariableName + ' }">';
        result+= '<c:set var="' + this.dataVariableName + '" value=\'${ ' + JSON.stringify(viewBoxes) + ' }\' scope="request" />';
        result+= '</c:if>';
        const file = new VinylFile(
            {
                path: configuration.renderTemplate(false, configuration.moduleConfiguration.basePathTemplate) + '/helper/svgViewBoxes.jsp',
                contents: new Buffer(result)
            });
        return Promise.resolve([file]);
    }


    /**
     * @return {Promise<String>}
     */
    render(node, configuration)
    {
        if (!node || !configuration)
        {
            return Promise.resolve('');
        }
        const scope = this;
        const promise = co(function*()
        {
            let result = '';
            const filter = node.find('FilterNode', { name: scope.filterName });
            if (!filter)
            {
                throw new Error('Could not locate svgViewBox filter in ' + node.type);
            }

            // Load map
            result+= '<jsp:include page="/' + configuration.renderTemplate(false, configuration.moduleConfiguration.basePathTemplate) + '/helper/svgViewBoxes.jsp" />';

            // Set?
            if (scope.isSet(node, configuration))
            {
                result+= '<c:set var="';
                result+= yield configuration.renderer.renderNode(node.variable, configuration);
                result+= '" value="';
            }

            result+= '${ ' + scope.dataVariableName + '[';
            result+= yield configuration.renderer.renderNode(filter.value, configuration);
            result+= '] }';

            // Set?
            if (scope.isSet(node, configuration))
            {
                result+= '" />';
            }

            return result;
        });
        return promise;
    }
}


/**
 * Exports
 * @ignore
 */
module.exports.JspSvgViewBoxFilterRenderer = JspSvgViewBoxFilterRenderer;
