'use strict';

/**
 * Requirements
 * @ignore
 */
const JspFilterReplacementRenderer = require('./JspFilterReplacementRenderer.js').JspFilterReplacementRenderer;
const GlobalConfiguration = require('entoj-system').model.configuration.GlobalConfiguration;
const assertParameter = require('entoj-system').utils.assert.assertParameter;
const VinylFile = require('vinyl');
const co = require('co');
const trimEnd = require('lodash.trimend');
const trim = require('lodash.trim');


/**
 * Renders the |mediaQuery filter
 */
class JspMediaQueryFilterRenderer extends JspFilterReplacementRenderer
{
    /**
     * @inheritDoc
     */
    constructor(globalConfiguration)
    {
        super();

        // Check params
        assertParameter(this, 'globalConfiguration', globalConfiguration, true, GlobalConfiguration);

        // Assign options
        this._globalConfiguration = globalConfiguration;
        this._dataVariableName = '__mediaQueries';
    }


    /**
     * @inheritDoc
     */
    static get className()
    {
        return 'export.renderer/JspMediaQueryFilterRenderer';
    }


    /**
     * @inheritDoc
     */
    static get injections()
    {
        return { 'parameters': [GlobalConfiguration] };
    }


    /**
     * @inheritDoc
     */
    get filterName()
    {
        return ['mediaQuery'];
    }


    /**
     * @type {model.configuration.GlobalConfiguration}
     */
    get globalConfiguration()
    {
        return this._globalConfiguration;
    }


    /**
     * @type {String}
     */
    get dataVariableName()
    {
        return this._dataVariableName;
    }


    /**
     * @inheritDoc
     */
    createAdditionalFiles(configuration, stage)
    {
        // Only on prepare stage
        if (stage !== 'prepare')
        {
            return Promise.resolve([]);
        }

        // Get data
        const mediaQueries = this.globalConfiguration.get('mediaQueries');

        let result = '';
        result+= '<%@ page contentType="text/html; charset=UTF-8" session="false" %>';
        result+= '<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>';
        result+= '<c:if test="${ empty ' + this.dataVariableName + '}">';
        result+= '<c:set var="' + this.dataVariableName + '" value=\'${' + JSON.stringify(mediaQueries) + '}\' scope="request" />';
        result+= '</c:if>';
        const file = new VinylFile(
            {
                path: trimEnd(configuration.renderTemplate(false, configuration.moduleConfiguration.globalFilePathTemplate), '/') + '/mediaQueries.jsp',
                contents: new Buffer(result)
            });
        return Promise.resolve([file]);
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
                throw new Error('Could not locate mediaQuery filter in ' + node.type);
            }

            // Load map
            result+= '<jsp:include page="/' + trim(configuration.renderTemplate(false, configuration.moduleConfiguration.globalIncludePathTemplate), '/') + '/mediaQueries.jsp" />';

            // Set?
            if (scope.isSet(node, configuration))
            {
                result+= '<c:set var="';
                result+= yield configuration.renderer.renderNode(node.variable, configuration);
                result+= '" value="';
            }

            result+= '${ ' + scope.dataVariableName + '[';
            result+= yield configuration.renderer.renderNode(filter.value, configuration);
            result+= '] }';

            // Set?
            if (scope.isSet(node, configuration))
            {
                result+= '" />';
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
module.exports.JspMediaQueryFilterRenderer = JspMediaQueryFilterRenderer;
