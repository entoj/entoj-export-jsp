'use strict';

/**
 * Requirements
 * @ignore
 */
const JspFilterNodeRenderer = require('./JspFilterNodeRenderer.js').JspFilterNodeRenderer;
const ensureTrailingSlash = require('entoj-system').utils.urls.ensureTrailingSlash;
const co = require('co');


/**
 * Renders the |linkUrl filters
 *
 * This will use the first dataProperties config of the actual filter
 */
class JspLinkUrlFilterRenderer extends JspFilterNodeRenderer
{
    /**
     * @inheritDocs
     */
    constructor(dataProperties)
    {
        super();

        // Assign options
        this._dataProperties = dataProperties || [];
    }


    /**
     * @inheritDoc
     */
    static get className()
    {
        return 'export.renderer/JspLinkUrlFilterRenderer';
    }


    /**
     * @inheritDocs
     */
    static get injections()
    {
        // We are sharing the dataProperties config with the actual filter
        return { 'parameters': ['nunjucks.filter/LinkUrlFilter.dataProperties'] };
    }


    /**
     * @type {Boolean|Array}
     */
    get filterName()
    {
        return ['linkUrl'];
    }


    /**
     * @type {Array}
     */
    get dataProperties()
    {
        return this._dataProperties;
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
            const baseUrl = configuration.moduleConfiguration.imageBaseUrl;
            result+= 'pageContext.request.contextPath.concat(\'' + ensureTrailingSlash(baseUrl) + '\').concat(';
            result+= yield configuration.renderer.renderNode(node.value, configuration);
            if (scope.dataProperties.length)
            {
                result+= '.' + scope.dataProperties[0];
            }
            result+= ')';
            return result;
        });
        return promise;
    }
}


/**
 * Exports
 * @ignore
 */
module.exports.JspLinkUrlFilterRenderer = JspLinkUrlFilterRenderer;
