'use strict';

/**
 * Requirements
 * @ignore
 */
const JspFilterNodeRenderer = require('./JspFilterNodeRenderer.js').JspFilterNodeRenderer;
const co = require('co');


/**
 * Renders the |empty and |notempty filters
 */
class JspAssetUrlFilterRenderer extends JspFilterNodeRenderer
{
    /**
     * @inheritDoc
     */
    static get className()
    {
        return 'export.renderer/JspAssetUrlFilterRenderer';
    }


    /**
     * @type {Boolean|Array}
     */
    get filterName()
    {
        return ['assetUrl'];
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
            const baseUrl = configuration.buildConfiguration.get('export.assetsBaseUrl', configuration.jspModuleConfiguration.assetsBaseUrl);
            result+= '\'' + baseUrl + '\'.concat(';
            result+= yield configuration.renderer.renderNode(node.value, configuration);
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
module.exports.JspAssetUrlFilterRenderer = JspAssetUrlFilterRenderer;
