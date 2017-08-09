'use strict';

/**
 * Requirements
 */
const JspExportCommand = require(JSP_SOURCE + '/command/JspExportCommand.js').JspExportCommand;
const exportCommandSpec = require('entoj-system/test').command.ExportCommandShared;
const projectFixture = require('entoj-system/test').fixture.project;


/**
 * Spec
 */
describe(JspExportCommand.className, function()
{
    /**
     * Command Test
     */
    function prepareParameters()
    {
        const fixture = projectFixture.createDynamic();
        return [fixture.context];
    }

    exportCommandSpec(JspExportCommand, 'command/JspExportCommand', prepareParameters, { action: 'jsp' });
});
