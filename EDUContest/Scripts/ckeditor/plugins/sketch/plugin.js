/*
* A Sketch plugin for CKEditor.
*
* Uses Sketch ( http://intridea.github.io/sketch.js/ ) to create canvases upon which visitors can draw 
* in a CKEditor-dialog.
* 
* Author: Erick Benites
* License: GPL, LGPL and MPL
*/
(function() {
'use strict';

var pluginName = 'sketch',
	pluginCmd = 'sketchDialog',
	runningId = 0;

CKEDITOR.plugins.add( pluginName, {
	
	init: function ( editor ) {
		
		var pluginPath = this.path;
		
		//sketch library
		CKEDITOR.scriptLoader.load( [this.path+'sketch.js'] );
		
		var fileref=document.createElement("link");
		fileref.setAttribute("rel", "stylesheet");
		fileref.setAttribute("type", "text/css");
		fileref.setAttribute("href", this.path+'style.css');
		document.getElementsByTagName("head")[0].appendChild(fileref);
		
		//kolorpicker
		CKEDITOR.scriptLoader.load( [this.path+'jquery.kolorpicker.js'] );
				
		var fileref=document.createElement("link");
		fileref.setAttribute("rel", "stylesheet");
		fileref.setAttribute("type", "text/css");
		fileref.setAttribute("href", this.path+'style/kolorpicker.css');
		document.getElementsByTagName("head")[0].appendChild(fileref);
				
		// add button
		editor.ui.addButton( pluginName, {
			label : 'Insertar dibujo',
			command : pluginCmd,
			toolbar: 'insert',
			icon: this.path + 'icon.png'
		});
		
		// register dialog-command
		editor.addCommand( pluginCmd, new CKEDITOR.dialogCommand(pluginCmd));
		
		// add dialog for handling 
		CKEDITOR.dialog.add( pluginCmd, function( editor )
		{
			var currId = "sketch-block-" + (runningId++);
			
			return {
				title : 'Dibujo a mano alzada',
				resizable : CKEDITOR.DIALOG_RESIZE_NONE,
				minWidth : 740,
				minHeight : 480,
				contents : [
					{
					// Definition of the Settings dialog window tab (page) 
					// Even though there is only one tab it should be named
						id : 'general',
						label : 'Settings',
						elements :
						[
							{
								type : 'html',
								html : '<div class="panel-tools"></div>' +
									   '<canvas id="'+currId+'" width="720" height="405"></canvas>'
							}
						]
					}
				],
				onShow : function(event) {
					
					var dialEl = jQuery(CKEDITOR.document.getById(currId).$);
					
					if(!dialEl.hasClass('sketch-block')){
						
						dialEl.addClass('sketch-block');
						
						// Panel Color
						
						jQuery('.panel-tools', dialEl.parent()).append('<div class="panel-color"></div>');
						
						jQuery('.panel-color', dialEl.parent()).append('<h2>Color</h2>');
						
//						jQuery.each(['#000', '#fff', '#ccc', '#f00', '#0f0', '#00f', '#ff0', '#0ff', '#f0f', '#f60', '#630', '#900', '#9c0', '#090', '#fc0', '#36f', '#60f', '#90f', '#009', '#f09'], function() {
//							jQuery('.panel-color', dialEl.parent()).append("<a href='#"+currId+"' data-color='" + this + "' style='background: " + this + ";'></a> ");
//					    });
//						// En lugar de definir algunos  colores usamos el plugin kolorpicker
						jQuery('.panel-color', dialEl.parent()).append('<input type="text" value="#000000" class="kolorPicker">');
						
						// Panel Tamaño
						
						jQuery('.panel-tools', dialEl.parent()).append('<div class="panel-size"></div>');
						
						jQuery('.panel-size', dialEl.parent()).append('<h2>Tama&ntilde;o</h2>');
						
					    jQuery.each([3, 5, 10, 15], function() {
					    	jQuery('.panel-size', dialEl.parent()).append("<a href='#"+currId+"' data-size='" + this + "'>" + this + "</a> ");
					    });

					    // Panel Dimensión
					    
					    jQuery('.panel-tools', dialEl.parent()).append('<div class="panel-dimension"></div>');
						
						jQuery('.panel-dimension', dialEl.parent()).append('<h2>Dimensi&oacute;n</h2><select></select>');
						
					    jQuery.each(['720x405', '640x360', '480x270', '320x180', '120x120'], function() {
					    	jQuery('.panel-dimension select', dialEl.parent()).append('<option value="'+this+'">'+this+'</option>');
					    });
					    
					    jQuery('.panel-dimension select', dialEl.parent()).change(function(){
				    		
				    		var myCanvas = document.getElementById(currId);
							var ctx = myCanvas.getContext('2d');
							ctx.canvas.width = jQuery(this).val().split('x')[0];
							ctx.canvas.height = jQuery(this).val().split('x')[1];
				    		dialEl.sketch().redraw();
				    		
						});
					    
						// Panel Borrador
						
						jQuery('.panel-tools', dialEl.parent()).append('<div class="panel-eraser"></div>');
						
						jQuery('.panel-eraser', dialEl.parent()).append('<h2>Borrar</h2>');
						
						jQuery('.panel-eraser', dialEl.parent()).append('<a class="clear" href="javascript:void(0)"><img src="'+pluginPath+'trash.png"/></a>');
						
						jQuery('.panel-eraser', dialEl.parent()).append('<a class="eraser" href="javascript:void(0)"><img src="'+pluginPath+'eraser.png"/></a>');
						
						jQuery('.panel-eraser a.clear', dialEl.parent()).click(function(){
							
							if(window.confirm('¿Realmente desea borrar todo el gráfico?')){
								
								dialEl.sketch().actions = []; // this line empties the actions. 
								var myCanvas = document.getElementById(currId);
								var ctx = myCanvas.getContext('2d');
	
								ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
							
							}
							
						});
						
						jQuery('.panel-eraser a.eraser', dialEl.parent()).click(function(){
							
							dialEl.sketch().set('color', '#fff');
							
						});
						
						// Start KolorPicker
						kolorpicker(currId);
						
						// Start Sketch
						dialEl.sketch({defaultSize: 3});
						
					}
					
				},
				onOk : function() {
					
					var dialEl = jQuery(CKEDITOR.document.getById(currId).$); 
					
					var dataImage = dialEl.data('sketch').el.toDataURL("image/png"); //dialEl.sketch()
					
					var image = editor.document.createElement( 'img' );
					image.setAttribute('src', dataImage);
					
					editor.insertElement( image );
					
					// Se puede generar una imgen con /ckeditor/generate.jsp
					
				},
				onCancel : function() {
					
				}
			};
		} );
		
	}

});
})();
