'use strict';

/**
 * Requirements
 * @ignore
 */
const JspFilterNodeRenderer = require('./JspFilterNodeRenderer.js').JspFilterNodeRenderer;
const ensureTrailingSlash = require('entoj-system').utils.urls.ensureTrailingSlash;
const co = require('co');


/**
 * Renders the |svgUrl filters
 */
class JspSvgUrlFilterRenderer extends JspFilterNodeRenderer
{
    /**
     * @inheritDoc
     */
    static get className()
    {
        return 'export.renderer/JspSvgUrlFilterRenderer';
    }


    /**
     * @type {Boolean|Array}
     */
    get filterName()
    {
        return ['svgUrl'];
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
        const promise = co(function*()
        {
            let result = '';
            const baseUrl = configuration.buildConfiguration.get('export.svgBaseUrl', configuration.moduleConfiguration.svgBaseUrl);
            result+= 'pageContext.request.contextPath.concat(\'' + ensureTrailingSlash(baseUrl) + '\').concat(';
            result+= yield configuration.renderer.renderNode(node.value, configuration);
            result+= ').concat(\'.svg#icon\')';
            return result;
        });
        return promise;
    }
}


/**
 * Exports
 * @ignore
 */
module.exports.JspSvgUrlFilterRenderer = JspSvgUrlFilterRenderer;
