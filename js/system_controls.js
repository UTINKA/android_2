/*var SskaActivateModule = false;

$('.mobile .model .m_display .controls').find('a').mouseup(function(e)
{
	var key = $(this).attr('key');
	if(key == 'back') key = 0;
	else if(key == 'home') key = 1;
	else if(key == 'recent_apps') key = 2;
	//
	var ActiveModule = android.Modules.getActiveModule();
	if(key == android.Controls.Back || key == android.Controls.Home || key == android.Controls.RecentApps)
	{
		SskaActivateModule = false;
	}
});*/

$('.mobile .model .m_display .controls').find('a').dblclick(function(e)
{
	var key = $(this).attr('key');
	if(key == 'back') key = 0;
	else if(key == 'home') key = 1;
	else if(key == 'recent_apps') key = 2;
	//
	var ActiveModule = android.Modules.getActiveModule();
	if(key == android.Controls.Back)
	{
		if(ActiveModule == false) 
		{
			android.Modules.ControlShowedModule(key);
		}
	}
	else if(key == android.Controls.Home)
	{
		if(ActiveModule == false) 
		{
			android.Modules.ControlShowedModule(key);
		}
	}
	else if(key == android.Controls.RecentApps)
	{
		if(ActiveModule == false) 
		{
			android.Modules.ControlShowedModule(key);
		}
	}
	return;
});

$('.mobile .model .m_display .controls').find('a').click(function(e)
{
	android.Media.play(android.Media.SYSTEM_AUDIO, 'system/media/ui/Effect_Tick.mp3');
	
	var key = $(this).attr('key');
	if(key == 'back') key = 0;
	else if(key == 'home') key = 1;
	else if(key == 'recent_apps') key = 2;
	//
	var ActiveModule = android.Modules.getActiveModule();
	if(key == android.Controls.Back || key == android.Controls.Home || key == android.Controls.RecentApps)
	{
		if(ActiveModule == true)
		{
			android.Modules.ControlsInModulesActive(key);
		}
		else if(ActiveModule == false)
		{
			android.Modules.HidedModule(android.Modules.ShowedModule);
			android.Apps.ControlsInApp(android.Apps.getCurrentAppName(), key);
		}
		
	}
	//
	if(key == android.Controls.Back)
	{
		if(ActiveModule == false)
		{
			if(android.Apps.showed_app == 'RecentApps')
			{
				$(".mobile .model .m_display .display_apps .app").each(function(e)
				{
					var obj = $(this);
					if(obj.attr('app_name') == android.Apps.last_showed_app)
					{
						var is_app = obj.attr('isapp');
						android.Controls.CloseRecentApps();
						if(is_app == 'true') android.Apps.openApp(obj.attr('app_name'), android.Apps.SYSAPP);	
						else if(is_app == 'false') android.Apps.openApp(obj.attr('app_name'), android.Apps.USERAPP);
						//
						$('.mobile .model .m_display .status_bar').css({
							'background': 'rgba(0, 0, 0, 0)',
							'backdrop-filter': 'blur(0px)'
						});
						$('.mobile .model .m_display .controls').css({
							'background': 'rgba(0, 0, 0, 0)',
							'backdrop-filter': 'blur(0px)'
						});
					}
				});
			}
		}
	}
	else if(key == android.Controls.Home)
	{
		if(ActiveModule == false)
		{
			$(".mobile .model .m_display .display_apps .app").each(function(e)
			{
				var obj = $(this);
				if(obj.attr('app_name') == android.Memory.prototype.getData('HomeApp','Launcher'))
				{
					var is_app = obj.attr('isapp');
					android.Controls.CloseRecentApps();
					if(is_app == 'true') android.Apps.openApp(obj.attr('app_name'), android.Apps.SYSAPP);	
					else if(is_app == 'false') android.Apps.openApp(obj.attr('app_name'), android.Apps.USERAPP);
					//
					$('.mobile .model .m_display .status_bar').css({
						'background': 'rgba(0, 0, 0, 0)',
						'backdrop-filter': 'blur(0px)'
					});
					$('.mobile .model .m_display .controls').css({
						'background': 'rgba(0, 0, 0, 0)',
						'backdrop-filter': 'blur(0px)'
					});
				}
			});
		}
	}
	else if(key == android.Controls.RecentApps)
	{
		if(ActiveModule != false)
		{
			android.Modules.LoadedModules[ActiveModule].Hided();
		}
		if(android.Apps.showed_app == 'RecentApps')
		{
			$(".mobile .model .m_display .display_apps .app").each(function(e)
			{
				var obj = $(this);
				if(obj.attr('app_name') == android.Apps.last_showed_app)
				{
					var is_app = obj.attr('isapp');
					android.Controls.CloseRecentApps();
					if(is_app == 'true') android.Apps.openApp(obj.attr('app_name'), android.Apps.SYSAPP);	
					else if(is_app == 'false') android.Apps.openApp(obj.attr('app_name'), android.Apps.USERAPP);
				}
			});
			$('.mobile .model .m_display .status_bar').css({
				'background': 'rgba(0, 0, 0, 0)',
				'backdrop-filter': 'blur(0px)'
			});
			$('.mobile .model .m_display .controls').css({
				'background': 'rgba(0, 0, 0, 0)',
				'backdrop-filter': 'blur(0px)'
			});
		}
		else 
		{
			android.Apps.last_showed_app = android.Apps.getCurrentAppName();
			android.Controls.OCRecentApps();
			var AppsCount = android.Apps.init_apps.length;
			if(AppsCount > 1)
			{
				$('.mobile .model .m_display .status_bar').css({
					'background': 'rgba(0, 0, 0, 0.3)',
					'backdrop-filter': 'blur(3px)'
				});
				$('.mobile .model .m_display .controls').css({
					'background': 'rgba(0, 0, 0, 0.3)',
					'backdrop-filter': 'blur(3px)'
				});
			}
				
		}
	}
	return;
});