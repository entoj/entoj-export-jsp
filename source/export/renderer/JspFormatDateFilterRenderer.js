'use strict';

/**
 * Requirements
 * @ignore
 */
const JspFilterReplacementRenderer = require('./JspFilterReplacementRenderer.js').JspFilterReplacementRenderer;
const GlobalConfiguration = require('entoj-system').model.configuration.GlobalConfiguration;
const assertParameter = require('entoj-system').utils.assert.assertParameter;
const trimQuotes = require('entoj-system').utils.string.trimQuotes;
const co = require('co');


/**
 * Renders the |formatDate filter
 */
class JspFormatDateFilterRenderer extends JspFilterReplacementRenderer
{
    /**
     * @inheritDocs
     */
    constructor(globalConfiguration)
    {
        super();

        // Check params
        assertParameter(this, 'globalConfiguration', globalConfiguration, true, GlobalConfiguration);

        // Assign options
        this._globalConfiguration = globalConfiguration;
    }


    /**
     * @inheritDoc
     */
    static get className()
    {
        return 'export.renderer/JspFormatDateFilterRenderer';
    }


    /**
     * @inheritDocs
     */
    static get injections()
    {
        return { 'parameters': [GlobalConfiguration] };
    }


    /**
     * @type {Boolean|Array}
     */
    get filterName()
    {
        return ['formatDate', 'date'];
    }


    /**
     * @type {model.configuration.GlobalConfiguration}
     */
    get globalConfiguration()
    {
        return this._globalConfiguration;
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
                throw new Error('Could not locate markup filter in ' + node.type);
            }
            let format = scope.globalConfiguration.get('formats.date');
            if (filter.arguments &&
                filter.arguments.length)
            {
                format = yield configuration.renderer.renderNode(filter.arguments[0].value, configuration);
            }
            if (scope.isSet(node, configuration))
            {
                result+= '<c:set var="';
                result+= yield configuration.renderer.renderNode(node.variable, configuration);
                result+= '">';
            }
            result+= '<fmt:formatDate';
            result+= ' value="${ ';
            result+= yield configuration.renderer.renderNode(filter.value, configuration);
            result+= '.time }"';
            result+= ' type="date" pattern="' + trimQuotes(format) + '"';
            result+= ' />';
            if (scope.isSet(node, configuration))
            {
                result+= '</c:set>';
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
module.exports.JspFormatDateFilterRenderer = JspFormatDateFilterRenderer;
