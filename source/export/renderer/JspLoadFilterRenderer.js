'use strict';

/**
 * Requirements
 * @ignore
 */
const JspFilterReplacementRenderer = require('./JspFilterReplacementRenderer.js').JspFilterReplacementRenderer;


/**
 * Renders the |load filter
 */
class JspLoadFilterRenderer extends JspFilterReplacementRenderer
{
    /**
     * @inheritDoc
     */
    static get className()
    {
        return 'export.renderer/JspLoadFilterRenderer';
    }


    /**
     * @type {Boolean|Array}
     */
    get filterName()
    {
        return ['load'];
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
        return Promise.resolve('');
    }
}


/**
 * Exports
 * @ignore
 */
module.exports.JspLoadFilterRenderer = JspLoadFilterRenderer;
