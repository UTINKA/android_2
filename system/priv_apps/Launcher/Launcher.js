
//	погода 
//	https://fcc-weather-api.glitch.me/api/current?lat=54.62921524047852&lon=39.73637390136719

/*if(navigator.geolocation) 
{
	navigator.geolocation.getCurrentPosition(function(position) 
	{
		var lat = position.coords.latitude;
		var long = position.coords.longitude;
		console.log(lat);
		console.log(long);
	});
}*/



var lat, long, temp = 0, locatInfo = '';

/*if (navigator.geolocation) 
{
	//navigator.geolocation.getCurrentPosition(function (position) 
	//{
		lat = 54.62921524047852;
		long = 39.73637390136719;

		var api = 'https://fcc-weather-api.glitch.me/api/current?lat=' + lat + '&lon=' + long + '';

		$.getJSON(api, function (res) 
		{
			var celsius = res.main.temp;
			var farenheit = (celsius * 1.8) + 32;

			var location = res.name;
			
			temp = Math.floor(celsius);
			locatInfo = location + '<img src="' + res.weather[0].icon + '">';
			//$('.weather-location').html(location);
			
			$('.weather-description').html(res.weather[0].description);
			$('.weatherType').attr('id', res.weather[0].main);
			$('.row2').on('click', function () 
			{
				if ($('.temp').html() == (Math.floor(celsius))) 
				{
					$('.temp').html(Math.floor(farenheit));
					$('.temp-type').html('°F');
				} 
				else 
				{
					$('.temp').html(Math.floor(celsius));
					$('.temp-type').html('°C');
				}
			});

		});
	//});
}*/

var 
	hp_menu_state = false,
	LauncherApp = undefined
;

$('.hp_menu_open').click(function(e)
{
	if(hp_menu_state == false)
	{
		$('.home_app .hp_box_menu').css({
			'top': '5px',
			'left': '5px',
			'right': '5px',
			'bottom': '5px',
			'border-radius': '5px',
			'z-index': '3'
		});
		$('.home_app .hp_box_menu').find('a').each(function(e)
		{
			var app = $(this);
			app.attr('hided','false');
		});
		hp_menu_state = true;
		android.Media.play(android.Media.SYSTEM_AUDIO, 'system/media/ui/Effect_Tick.mp3');
	}
});


function LoadMenuApps()
{
	var menu_box = $('.home_app .hp_box_menu');
	//
	var apps = android.Apps.getApps();
	apps.forEach(function(item, i)
	{
		GetNextLevel(item).then(function(data)
		{
			//console.log('[all_app] ' + data + ')');
			// User Apps
			var user_apps = android.Apps.user_apps;
			if(user_apps.length > 0)
			{				
				user_apps.forEach(function(uaData, uaI)
				{
					if(data == uaData)
					{
						GetNextLevel(uaData).then(function(uanData)
						{
							var app = uanData;
							android.GetData(android.location_device + 'system/apps/' + app + '/' + app + '.txt').then(result => 
							{
								//console.log('[user_apps] ' + app);
								//
								var data = android.Data.prototype.DataToObject(result);
								var name = data.app_name;	
								var dname = name;
								dname = dname.replace(" ","");
								//
								menu_box.append('\
								<a data="' + dname + '" app_name="' + name + '" app="apps">\
									<img src="' + android.location_device +'system/apps/' + dname + '/' + dname + '.png">\
									<label>' + name + '</label>\
								</a>');
								//
								menu_box.find('a[data=' + dname + ']').click(function(e)
								{
									android.Media.play(android.Media.SYSTEM_AUDIO, 'system/media/ui/Effect_Tick.mp3');
									HomeAppCloseMenu();
									android.Apps.openApp(app, android.Apps.USERAPP);
									/*var obj = $(this);
									var NewOpen = true;
									$(".mobile .model .m_display .display_apps .app").each(function(e)
									{
										var obja = $(this);
										if(obja.attr('app_name') != obj.attr('data'))
										{
											android.Media.play(android.Media.SYSTEM_AUDIO, 'system/media/ui/Effect_Tick.mp3');
											HomeAppCloseMenu();
											return OpenApp(obj, app, android.Apps.USERAPP);
										}
										else
										{
											android.Media.play(android.Media.SYSTEM_AUDIO, 'system/media/ui/Effect_Tick.mp3');
											HomeAppCloseMenu();
											return android.Apps.openApp(app, android.Apps.USERAPP);
										}
									});*/
								});
							});
						});
					}
				});
			}
			// Priv App
			var priv_apps = android.Apps.priv_apps;
			if(priv_apps.length > 0)
			{
				priv_apps.forEach(function(paData, paI)
				{
					if(data == paData)
					{
						GetNextLevel(paData).then(function(panData)
						{
							var app = panData;
							android.GetData(android.location_device + 'system/priv_apps/' + app + '/' + app + '.txt').then(result => 
							{
								//console.log('[priv_apps] ' + app);
								//
								var data = android.Data.prototype.DataToObject(result);
								console.log(data)
								var name = data.app_name;
								var dname = name;
								dname = dname.replace(" ","");
								//					
								menu_box.append('\
									<a data="' + app + '" app_name="' + name + '" app="priv_apps">\
										<img src="' + android.location_device +'system/priv_apps/' + app + '/' + app + '.png">\
										<label>' + name + '</label>\
									</a>');
								menu_box.find('a[data=' + app + ']').click(function(e)
								{
									android.Media.play(android.Media.SYSTEM_AUDIO, 'system/media/ui/Effect_Tick.mp3');
									HomeAppCloseMenu();
									android.Apps.openApp(app, android.Apps.SYSAPP);
									/*var obj = $(this);
									var NewOpen = true;
									$(".mobile .model .m_display .display_apps .app").each(function(e)
									{
										var obja = $(this);
										if(obja.attr('app_name') != obj.attr('data'))
										{
											android.Media.play(android.Media.SYSTEM_AUDIO, 'system/media/ui/Effect_Tick.mp3');
											HomeAppCloseMenu();
											return OpenApp(obj, app, android.Apps.SYSAPP);
										}
										else
										{
											android.Media.play(android.Media.SYSTEM_AUDIO, 'system/media/ui/Effect_Tick.mp3');
											HomeAppCloseMenu();
											return android.Apps.openApp(app, android.Apps.SYSAPP);
										}
									});*/
								});
							});
						});
					}
				});
			}
		});
	});

	function OpenApp(obj, AppName,IsApp)
	{
		var strAppDir = undefined;
		if(IsApp == android.Apps.SYSAPP) strAppDir = 'priv_apps';
		else if(IsApp == android.Apps.USERAPP) strAppDir = 'apps';
		android.GetData(android.location_device + 'system/' + strAppDir + '/' + AppName + '/' + AppName + '.txt').then(result => 
		{
			var AppColor = undefined;
			var data = android.Data.prototype.DataToObject(result);
			if(data.color != undefined && data.color != '')
			{
				if(data.color != 'transparent')
				{
					AppColor = data.color;
				}
			}
			var pTop = obj.position().top;
			var pLeft = obj.position().left;
			$('.mobile .model .m_display .display_apps .loader_apps').css('transition','0.5s');
			$('.mobile .model .m_display .display_apps .loader_apps .box img').attr('src', obj.find('img').attr('src'));
			$('.mobile .model .m_display .display_apps .loader_apps').css({
				'background': AppColor,
				'width': '50px',
				'height': '50px',
				'top': 'calc(30px + ' + pTop + 'px)',
				'left': 'calc(17px + ' + pLeft + 'px)',
				'transform': 'scale(0.5)',
				'border-radius': '50%',
				'display': 'block'
			});
			$('.mobile .model .m_display .display_apps .loader_apps .box').css({
				'width': '100%',
				'margin': 'unset'
			});
			// Opening App
			setTimeout(function()
			{
				$('.mobile .model .m_display .display_apps .loader_apps').css({
					'width': '100%',
					'height': '100%',
					'top': '0',
					'left': '0',
					'right': '0',
					'bottom': '0',
					'transform': 'scale(1)',
					'border-radius': '0%',
					'display': 'block'
				});
				$('.mobile .model .m_display .display_apps .loader_apps .box').css({
					'width': '100px',
					'margin': 'calc(100% / 2 + 55px) auto'
				});
				setTimeout(function()
				{
					$('.mobile .model .m_display .display_apps .loader_apps').css('transition','0s');
					android.Media.play(android.Media.SYSTEM_AUDIO, 'system/media/ui/Effect_Tick.mp3');
					HomeAppCloseMenu();
					android.Apps.openApp(AppName, IsApp);
				}, 500);
			}, 100);
		});
	}

	function GetNextLevel(level) 
	{
		var d = $.Deferred(); 
		/*setTimeout(function()
		{
			
		}, 1000);*/
		d.resolve(level);
		return d.promise();
	};
}
LoadMenuApps();



function HomeAppCloseMenu()
{
	if(hp_menu_state == true)
	{
		$('.home_app .hp_box_menu').css({
			'z-index': '1',
			'top': 'calc(91% - -10px)',
			'left': 'calc(46% - -10px)',
			'right': 'calc(46% - -10px)',
			'bottom': 'calc(3% - -10px)',
			'border-radius': '50%'
		});
		$('.home_app .hp_box_menu').find('a').each(function(e)
		{
			var app = $(this);
			app.attr('hided','true');
		});
		hp_menu_state = false;
	}
}

android.Apps.InitApp('Launcher', function(app) // Update Second
{
	//LauncherApp = android.Notifications.Build(android.Apps.getThisApp(app));
	LauncherApp = android.Apps.getThisApp(app);
	// Date
	var Day = android.DateTime.prototype.getDayOfWeek();
	var MonthName = android.DateTime.prototype.getMonthName(android.DateTime.prototype.getMonth(),'R');
	var Year = android.DateTime.prototype.getFullYear();
	// Time
	var Hours = android.DateTime.prototype.getHours();
	if(Hours < 10) Hours = '0' + Hours;
	var Minutes = android.DateTime.prototype.getMinutes();
	if(Minutes < 10) Minutes = '0' + Minutes;
	var Seconds = android.DateTime.prototype.getSeconds();
	if(Seconds < 10) Seconds = '0' + Seconds;
	
	
	var HeadText = $('.hp_head').find('center').find('label');
	var DFW = Day + ' ' + MonthName + ' | ' + temp + '°C';
	HeadText.text(DFW);
	$('.hp_head').find('center').find('text').html(locatInfo)
	
	$(".mobile .model .m_display .display_apps .app").each(function(e)
	{
		var obj = $(this);
		if(obj.attr('app_name') == android.Memory.prototype.getData('HomeApp','Launcher'))
		{
			obj.find('app_content').css({
				'background': 'url('+ android.UI.getCurrentWall() +')',
				'background-position-x': 'center',
				'background-position-y': 'top',
				'background-size': 'cover',
				'background-repeat': 'no-repeat',
				'background-color': '#000000'
			});
		}
	});
	
}, function(key) // System Controls
{
	if(key == android.Controls.Back)
	{
		HomeAppCloseMenu();
	}
	else if(key == android.Controls.Home)
	{
		HomeAppCloseMenu();
	}
	else if(key == android.Controls.RecentApps)
	{

	}
}, function() // Open 
{
	
}, function() // Hided 
{
	
}, function() // Closed  
{
	
}, function(Screen) // Screen
{
	if(Screen.IsLocked == false) // UnLocked
	{
		$(".mobile .model .m_display .display_apps .app").each(function(e)
		{
			var obj = $(this);
			if(obj.attr('app_name') == android.Memory.prototype.getData('HomeApp','Launcher'))
			{
				obj.find('.home_app').css('transform','scale(1)');
			}
		});
	}
	else // Locked
	{
		$(".mobile .model .m_display .display_apps .app").each(function(e)
		{
			var obj = $(this);
			if(obj.attr('app_name') == android.Memory.prototype.getData('HomeApp','Launcher'))
			{
				obj.find('.home_app').css('transform','scale(5)');
			}
		});
	}
});

