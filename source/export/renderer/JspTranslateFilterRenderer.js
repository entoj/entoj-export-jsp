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
            const filter = node.find('FilterNode', { name: scope.filterName });
            /* istanbul ignore next */
            if (!filter)
            {
                /* istanbul ignore next */
                throw new Error('Could not locate translate filter in ' + node.type);
            }
            const key = yield configuration.renderer.renderNode(filter.value, configuration);
            result+= '<fmt:message';
            if (scope.isSet(node, configuration))
            {
                result+= ' var="';
                result+= yield configuration.renderer.renderNode(node.variable, configuration);
                result+= '"';
            }
            result+= ' key="${ ' + key + ' }"';
            if (filter.arguments &&
                filter.arguments.length)
            {
                result+= ' >';
                for (const arg of filter.arguments)
                {
                    result+= '<fmt:param value="${ ';
                    result+= yield configuration.renderer.renderNode(arg.value, configuration);
                    result+= ' }"/>';
                }
                result+= '</fmt:message>';
            }
            else
            {
                result+= ' />';
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
module.exports.JspTranslateFilterRenderer = JspTranslateFilterRenderer;
