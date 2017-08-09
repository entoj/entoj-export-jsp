'use strict';

// Requirements
const Renderer = require('entoj-system').export.Renderer;


/**
 * @memberOf export
 * @extends export.Renderer
 */
class JspRenderer extends Renderer
{
    /**
     * @inheritDocs
     */
    static get className()
    {
        return 'export/JspRenderer';
    }


    /**
     * @inheritDocs
     */
    renderPreface(configuration)
    {
        let result = '';
        result+= '<%@ page contentType="text/html; charset=UTF-8" session="false" %>';
        result+= '<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>';
        result+= '<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>';
        return Promise.resolve(result);
    }


    /**
     * @inheritDocs
     */
    static get injections()
    {
        return { 'parameters': ['export/JspRenderer.nodeRenderers', 'export/JspRenderer.options'] };
    }
}


// Exports
module.exports.JspRenderer = JspRenderer;
