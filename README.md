#styleDOMComponent

![Google Analytics Tracker](http://macco.me/res/data/imgs/plugin_styledom.jpg "Google Analytics Tracker")

© 2009 Created by [Mattia Accornero](http://macco.me/ "Personal website") for Kora

===
Requires jQuery 1.4.1 or higher


###Usage:

####Normal use:
`$.styleDOMcomponent();`

####Advance use:
JS:

	$.styleDOMcomponent({
		activityArea: "#test"
	});

HTML:

	<!-- plugin doesn't work here -->
	<select id="mysel" name="mysel">
		<option>voice 1</option>
		<option>voice 2</option>
	</select>
	<div id="test">
		<!-- plugin works here -->
		<select id="mysel2" name="mysel2">
			<option>voice 1</option>
			<option>voice 2</option>
		</select>
	</div>	


