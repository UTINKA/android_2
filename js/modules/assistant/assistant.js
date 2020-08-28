var //			 timer,    used ?,   actived ?, history
	assistant = [undefined,undefined,false,[""]],
	assistant_moduleid = null
;

assistant_moduleid = android.Modules.InitModule('Assistant', android.Controls.Home, 1, function() // Update Second
{
	console.log('Asist Update 1 sec');
}, function(key) // System Controls
{
	if(key == android.Controls.Back)
	{
		console.log('Asist Back');
		$('.mobile .model .m_display .display_apps .assistent').attr('state','false');
		android.Modules.LoadedModules[assistant_moduleid].IsActive = false;
	}
	else if(key == android.Controls.Home)
	{
		console.log('Asist Home');
	}
	else if(key == android.Controls.RecentApps)
	{
		console.log('Asist RecentApps');
	}
}, function() // Showed
{
	clearTimeout(assistant[0]);
	assistant[0] = setTimeout(function()
	{
		$('.mobile .model .m_display .display_apps .assistent').attr('state','true');
		android.Modules.LoadedModules[assistant_moduleid].IsActive = true;
	}, 300);
	
}, function() // Hided 
{
	$('.mobile .model .m_display .display_apps .assistent').attr('state','false');
	android.Modules.LoadedModules[assistant_moduleid].IsActive = false;
});

// main screen
$('.mobile .model .m_display .display_apps').append('\
	<div class="assistent" state="false">\
		<div class="content_main">доделать</div>\
		<div class="down_color"></div>\
	</div>\
');
// home button
$('.mobile .model .m_display .controls .home').append('\
	<div class="assist_blue"></div>\
	<div class="assist_red"></div>\
	<div class="assist_yellow"></div>\
	<div class="assist_green"></div>\
');

$('.mobile .model .m_display .display_apps .assistent').click(function(e)
{
	android.Modules.LoadedModules[assistant_moduleid].Hided();
});
