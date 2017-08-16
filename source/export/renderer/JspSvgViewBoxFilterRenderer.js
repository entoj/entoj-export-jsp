'use strict';

/**
 * Requirements
 * @ignore
 */
const JspFilterReplacementRenderer = require('./JspFilterReplacementRenderer.js').JspFilterReplacementRenderer;
const PathesConfiguration = require('entoj-system').model.configuration.PathesConfiguration;
const assertParameter = require('entoj-system').utils.assert.assertParameter;
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
     * @protected
     */
    getViewBoxes(configuration)
    {
        if (!this._viewBoxes)
        {
            const baseUrl = configuration.buildConfiguration.get('export.svgBasePath', configuration.moduleConfiguration.svgBasePath);
            const globPath = path.join(this._pathesConfiguration.sites, baseUrl, '/*.svg');
            const files = glob.sync(globPath);
            this._viewBoxes = {};
            for (const file of files)
            {
                const name = path.basename(file, '.svg');
                this._viewBoxes[name] = '0 0 0 0';
                const icon = fs.readFileSync(file, { encoding: 'utf8' });
                const viewbox = icon.match(/viewBox="([^"]*)"/i);
                if (viewbox && viewbox[1])
                {
                    this._viewBoxes[name] = viewbox[1];
                }
            }
        }
        return this._viewBoxes;
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

            const svgName = yield configuration.renderer.renderNode(filter.value, configuration);
            const viewBoxes = yield scope.getViewBoxes(configuration);

            result+= '<c:choose>';
            for (const name in viewBoxes)
            {
                result+= '<c:when test="${' + svgName + ' == \'' + name + '\'}">';
                if (scope.isSet(node, configuration))
                {
                    result+= '<c:set var="';
                    result+= yield configuration.renderer.renderNode(node.variable, configuration);
                    result+= '" value="' + viewBoxes[name] + '" />';
                }
                else
                {
                    result+= '<c:out value="' + viewBoxes[name] + '" />';
                }
                result+= '</c:when>';
            }
            result+= '</c:choose>';

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
