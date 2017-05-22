/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	
	config.language = 'es';
	// config.uiColor = '#AADC6E';
	
    config.extraPlugins = 'confighelper,embed,sketch';
	
    config.removePlugins = 'wordcount,elementspath';
    config.resize_enabled = false;
	config.allowedContent = true;	// allow all html tags and attributes

	// config.removeButtons = 'Underline,Subscript,Superscript';

	// Set the most common block elements.
	// config.format_tags = 'p;h1;h2;h3;pre';

	// Simplify the dialog windows.
    config.removeDialogTabs = 'image:advanced;link:advanced;table:advanced';
	
	// config.height = '480px';
	
	//config.scayt_sLang = 'es_ES'; // Corrector ortografico scayt 
	//config.scayt_autoStartup = false;
	
	//	http://docs.ckeditor.com/#!/guide/dev_file_browse_upload
	//config.filebrowserUploadUrl = path + '/ckeditor/upload?_token='+$('meta[name="csrf-token"]').attr('content');
	
};

// http://sdk.ckeditor.com/samples/devtools.html
CKEDITOR.on('dialogDefinition', function (ev) {
    // Take the dialog name and its definition from the event data.
    var dialogName = ev.data.name;
    var dialogDefinition = ev.data.definition;

    // Check if the definition is from the dialog window you are interested in (the "Link" dialog window).
    if (dialogName == 'link') {
        var informationTab = dialogDefinition.getContents('target');
        var targetField = informationTab.get('linkTargetType');
        targetField['default'] = '_blank';

        var infoTab = dialogDefinition.getContents('info');
        infoTab.get('linkType').style = 'display: none';
        //infoTab.get('protocol').style = 'display: none';
        //infoTab.remove('protocol');
        //infoTab.remove('linkType');

        //dialogDefinition.removeContents('target');
        //dialogDefinition.removeContents('advanced');

    }

    if (dialogName == 'image') {
        var informationTab = dialogDefinition.getContents('Link');
        var targetField = informationTab.get('cmbTarget');
        targetField['default'] = '_blank';

        var infoTab = dialogDefinition.getContents('info');
        infoTab.remove('txtBorder');
        infoTab.remove('txtHSpace');
        infoTab.remove('txtVSpace');
        infoTab.remove('cmbAlign');
        infoTab.remove('txtAlt');

        //dialogDefinition.removeContents('Link');
        //dialogDefinition.removeContents('advanced');
    }

    if (dialogName == 'table') {
        var infoTab = dialogDefinition.getContents('info');
        infoTab.remove('txtSummary');

        //dialogDefinition.removeContents('Link');
        //dialogDefinition.removeContents('advanced');
    }
});