$('.mobile .model .m_display .controls').find('a').click(function(e)
{
	android.Media.play(android.Media.SYSTEM_AUDIO, 'system/media/ui/Effect_Tick.mp3');
	
	var key = $(this).attr('key');
	if(key == 'back') key = 0;
	else if(key == 'home') key = 1;
	else if(key == 'recent_apps') key = 2;
	//
	android.Apps.ControlsInApp(android.Apps.getCurrentAppName(), key);
	if(key == android.Controls.Back)
	{
		if(android.Apps.showed_app == 'RecentApps')
		{
			android.Controls.CloseRecentApps();
			android.Apps.openApp(android.Apps.last_showed_app, android.Apps.SYSAPP);
		}
	}
	else if(key == android.Controls.Home)
	{
		android.Controls.CloseRecentApps();
		android.Apps.openApp(android.Memory.prototype.getData('HomeApp','Launcher'), android.Apps.SYSAPP);
	}
	else if(key == android.Controls.RecentApps)
	{
		if(android.Apps.showed_app == 'RecentApps')
		{
			android.Controls.CloseRecentApps();
			android.Apps.openApp(android.Apps.last_showed_app, android.Apps.SYSAPP);
		}
		else 
		{
			android.Apps.last_showed_app = android.Apps.getCurrentAppName();
			android.Controls.OCRecentApps();
		}
	}
});