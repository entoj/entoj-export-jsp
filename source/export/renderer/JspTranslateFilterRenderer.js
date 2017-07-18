'use strict';

/**
 * Requirements
 * @ignore
 */
const JspFilterReplacementRenderer = require('./JspFilterReplacementRenderer.js').JspFilterReplacementRenderer;
const co = require('co');


/**
 *
 */
class JspTranslateFilterRenderer extends JspFilterReplacementRenderer
{
    /**
     * @inheritDoc
     */
    static get className()
    {
        return 'export.renderer/JspTranslateFilterRenderer';
    }


    /**
     * @type {Boolean|Array}
     */
    get filterName()
    {
        return ['translate'];
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
            let key = '';
            const filter = node.find('FilterNode', { name: scope.filterName });
            if (!filter)
            {
                throw new Error('Could not locate translate filter in ' + node.type);
            }
            if (filter.arguments &&
                filter.arguments.length)
            {
                key = yield configuration.renderer.renderNode(filter.arguments[0].value, configuration);
            }
            else
            {
                key = yield configuration.renderer.renderNode(filter.value, configuration);
            }
            result+= '<fmt:message';
            if (scope.isSet(node, configuration))
            {
                result+= ' var="';
                result+= yield configuration.renderer.renderNode(node.variable, configuration);
                result+= '"';
            }
            result+= ' key="${ ' + key + ' }"';
            result+= ' />';

            return result;
        });
        return promise;
    }
}


/**
 * Exports
 * @ignore
 */
module.exports.JspTranslateFilterRenderer = JspTranslateFilterRenderer;
