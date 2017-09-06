'use strict';

/**
 * Requirements
 * @ignore
 */
const JspFilterNodeRenderer = require('./JspFilterNodeRenderer.js').JspFilterNodeRenderer;
const ensureTrailingSlash = require('entoj-system').utils.urls.ensureTrailingSlash;
const co = require('co');


/**
 * Renders the |imageUrl filters
 *
 * This will use the first dataProperties config of the actual filter
 */
class JspImageUrlFilterRenderer extends JspFilterNodeRenderer
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
        return 'export.renderer/JspImageUrlFilterRenderer';
    }


    /**
     * @inheritDocs
     */
    static get injections()
    {
        // We are sharing the dataProperties config with the actual filter
        return { 'parameters': ['nunjucks.filter/ImageUrlFilter.dataProperties'] };
    }


    /**
     * @type {Boolean|Array}
     */
    get filterName()
    {
        return ['imageUrl'];
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
module.exports.JspImageUrlFilterRenderer = JspImageUrlFilterRenderer;
