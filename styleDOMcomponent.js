/*
	styleDOMComponent
	(c)2009 Created by Mattia Accornero
	Requires jQuery 1.4.1 or higher
	
	styleDOMComponent can style your selects, radios and checkboxes.
	It makes a copy of the select using div, ul, li and a tags.
	A tag is used also in checkbox and radio components.
	Virtual styled components keep real component classes.
	
	USE:
		$.styleDOMcomponent();
		
	ADVANCED USE (plugin work only in #test area):
		//js
			$.styleDOMcomponent({
				activityArea: "#test"
			});
		//html
			<!-- plugin doesn't work here -->
			<select id="mysel" name="mysel">
				<option>voce 1</option>
				<option>voce 2</option>
			</select>
			<div id="test">
				<!-- plugin works here -->
				<select id="mysel2" name="mysel2">
					<option>voce 1</option>
					<option>voce 2</option>
				</select>
			</div>

*/

(function($){	
	$.extend({
		styleDOMcomponent: function(options) { 
            var defaults = {
				enable_select_style:	true,					//enable style on select components
				enable_radio_style:		true,					//enable style on select components
				enable_checkbox_style:	true,					//enable style on select components
				activityArea:			"",						//working area (selector)
															//select classes
				actualItemClass:		"actualItem",			//item selected class (out of list)
				itemListClass:			"itemList",				//item list class
				selectedItemClass:		"selectedItem",			//item selected evidence class (in list)
				virtualSelectClass:		"custom_select",				//select class
				itemClass:				"item",					//item class (no selected)
															//radio classes
				virtualRadioClass:		"custom_radio",				//radio class
				radioSelectedClass:		"active",				//selected radio class
															//checkbox classes
				virtualCheckboxClass:	"custom_checkbox",			//checkbox class
				checkboxSelectedClass:	"active"				//selected checkbox class
			};
			
            var options = $.extend(defaults, options);
			
			if(options.enable_select_style){
				$selects = $(options.activityArea+" select");
				$.each($selects, function(i, obj){
					var $select = $(obj);
					var timestamp = new Date();
					timestamp = timestamp.getTime();
					var $styledSelect;
					var $divFirst = $("<div></div>").attr("id", "styledSelect"+timestamp);
					$divFirst.attr("class", $select.attr("class"));
					$divFirst.addClass(options.virtualSelectClass);
					var $fakea = $("<a></a>").attr("href","#item");
					var $divSecond = $("<div></div>").addClass(options.actualItemClass).append($fakea.clone());
					var $ul = $("<ul></ul>").addClass(options.itemListClass);
					var $li = $("<li></li>");
					$styledSelect = $divFirst.append($divSecond).append($ul);
					$select.children().each(function(k, item){
						if(k==0 && $select.find(["selected='selected'"]).length==0){
							$styledSelect.find("."+options.actualItemClass+" a").html($(item).text());
						}
						$templi = $li.clone();
						if($(item).attr("selected")){
							$templi.addClass(options.selectedItemClass);
							$styledSelect.find("."+options.actualItemClass+" a").html($(item).text());
						}
						$styledSelect.find("."+options.itemListClass).append($templi.addClass(options.itemClass).append($fakea.clone().append($(item).text())));
					});
					$styledSelect = $styledSelect.insertAfter($select);
					$("#styledSelect"+timestamp+" ."+options.actualItemClass+" a").click(function(){
						$("[id^='styledSelect']:not(#"+$(this).parents("[id^='styledSelect']").attr("id")+")").css("z-index", "0");
						$("[id^='styledSelect']:not(#"+$(this).parents("[id^='styledSelect']").attr("id")+") ul").hide();
						$("#"+$(this).parents("[id^='styledSelect']").attr("id")).css("z-index", "10");
						$("#"+$(this).parents("[id^='styledSelect']").attr("id")+" ."+options.itemListClass).toggle();
						$(this).blur();
						return false;
					});
					$("#styledSelect"+timestamp+" ."+options.itemListClass+" a").click(function(){
						$("#"+$(this).parents("[id^='styledSelect']").attr("id")+" ."+options.actualItemClass+" a").text($(this).text());
						$(this).parent().removeClass(options.selectedItemClass);
						$(this).parent().siblings().removeClass(options.selectedItemClass);
						$(this).parent().addClass(options.selectedItemClass);
						$("#"+$(this).parents("[id^='styledSelect']").attr("id")+" ."+options.itemListClass).hide();
						$(this).blur();
						var actualvalue = $(this).text();
						$select.find("option").each(function(j, item){
							if($(item).text()==actualvalue){
								$(item).attr("selected", true);
								$select.change();
							}
						});
						return false;
					});
					$select.hide();
				});
			}
			
			if(options.enable_radio_style){
				$radios = $(options.activityArea+" input[type='radio']");
				$.each($radios, function(i, obj){
					var $radio = $(obj);
					var timestamp = new Date();
					timestamp = timestamp.getTime();
					var $styledRadio;
					var $fakea = $("<a></a>").attr("id", "styledRadio"+$radio.attr("name")+timestamp).attr("href","#radio");
					$fakea.attr("class", $radio.attr("class"));
					$fakea.addClass(options.virtualRadioClass);
					if($radio.attr("checked")){
						$fakea.addClass(options.radioSelectedClass);
					}
					$styledRadio = $fakea.insertAfter($radio);
					$radio.hide();
				});
				
				$("[id^='styledRadio']").click(function(){
					$(this).blur();
					$(this).prev().click();
					return false;
				});
				$("input:radio").click(function(){
					$("[id^='styledRadio"+$(this).attr("name")+"']").each(function(i, elem){
						$(elem).toggleClass(options.radioSelectedClass);
					});
				});
			}
			
			if(options.enable_checkbox_style){
				$checkboxes = $(options.activityArea+" input[type='checkbox']");
				$.each($checkboxes, function(i, obj){
					var $checkbox = $(obj);
					var timestamp = new Date();
					timestamp = timestamp.getTime();
					var $styledCheckbox;
					var $fakea = $("<a></a>").attr("id", "styledCheckbox"+timestamp).attr("href","#checkbox");
					$fakea.attr("class", $checkbox.attr("class"));
					$fakea.addClass(options.virtualCheckboxClass);
					if($checkbox.attr("checked")){
						$fakea.addClass(options.checkboxSelectedClass);
					}
					$styledCheckbox = $fakea.insertAfter($checkbox);
					$checkbox.hide();
				});
				$("[id^='styledCheckbox']").click(function(){
					$(this).blur();
					$(this).prev().click();
					return false;
				});
				$("input:checkbox").click(function(){
					$(this).next().toggleClass(options.checkboxSelectedClass);
				});
			}
			
        }
    }); 
})(jQuery);