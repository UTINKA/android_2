class AndroidBase
{
	constructor()
	{
		//
		this.UpdateSystemTimer = undefined;
		this.XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
		this.location_device = window.location.href.substring(0, window.location.href.length);
		// Classes
		this.Folders = undefined;
		this.Media = undefined;
		this.UI = undefined;
		this.Apps = undefined;
		this.Controls = undefined;
		this.Notifications = undefined;
		// Configurations
		this.Wall = undefined;
		this.RecentAppsView = true;
		//
		this.boot_animation_startup = undefined;
		this.boot_animation_shutdown = undefined;
		// Phone information
		this.PhoneTimeInStarted = undefined;
		//
		this.PhoneLocked = true;
		this.PhoneUnLocked = false;
		this.PhoneState = undefined;
		// Audio & Media
		this.AudioVolume = [0.8,0.5,0.8];
		
		// Geolocation
		//this.Geolocation = [null,null];
		
		
		// Log
		this.LOG_INFO = 0;
		this.LOG_WARNING = 1;
		this.LOG_ERROR = 2;
	}
	SysControls = class
	{
		constructor(android)
		{
			this.a = android;
			this.Back = 0;
			this.Home = 1;
			this.RecentApps = 2;
			this.ScrollApps = 10;
			this.CurrentScrollApps = 0;
		}
		OCRecentApps()
		{
			var androidRAView = this.a.RecentAppsView;
			android.Controls.CurrentScrollApps = 0;
			var state = $(".mobile .model .m_display .display_apps .recent_apps").attr('state');
			if(state == 'false')
			{
				$(".mobile .model .m_display .display_apps .recent_apps").attr('state','true');
				var MouseMoveState = $(".mobile .model .m_display .display_apps .recent_apps").attr('mms');
				if(MouseMoveState == undefined || MouseMoveState == null)
				{
					/*$(".mobile .model .m_display .display_apps .recent_apps").mousemove(function(e) 
					{
						var pageCoords = "PG( " + e.pageX + ", " + e.pageY + " )";
						var clientCoords = "CL( " + e.clientX + ", " + e.clientY + " )";
						console.log(pageCoords);
						console.log(clientCoords);
					});*/
					$(".mobile .model .m_display .display_apps .recent_apps")
					$(".mobile .model .m_display .display_apps .recent_apps").attr('mms','true');
				}
				
				var zIApp = 1;
				var currentApp = android.Apps.getCurrentAppName();
				$(".mobile .model .m_display .display_apps .app").each(function(e)
				{
					var obj = $(this);
					var AppsCount = android.Apps.init_apps.length;
					obj.attr('state','hided');
					/*var ostate = obj.attr('hided');
					if(ostate == 'false')
					{*/
						if(obj.attr('app_name') == android.Memory.prototype.getData('HomeApp','Launcher'))
						{
							obj.attr('app_count', '1');
							obj.find('.rc .app_info_up').attr('state','false');
							obj.find('app_content').css({
								'background': 'url('+ android.UI.getCurrentWall() +')',
								'background-position-x': 'center',
								'background-position-y': 'top',
								'background-size': 'cover',
								'background-repeat': 'no-repeat',
								'background-color': '#000000'
							});
						}
						zIApp++;
						obj.attr('rs_state','true');
						if(currentApp == obj.attr('app_name'))
						{
							var nAppsCount = 1;
							obj.attr('app_count', '2');
							$(".mobile .model .m_display .display_apps .app").each(function(e)
							{
								if($(this).attr('app_name') != android.Memory.prototype.getData('HomeApp','Launcher'))
								{
									nAppsCount++;
									$(this).attr('app_count', nAppsCount);
								}
							});
						}
						var AppCount = parseInt(obj.attr('app_count'));
						//
						if(currentApp == obj.attr('app_name'))
						{
							obj.css('z-index', '0');
							if(androidRAView == true)
							{
								obj.css('transform','scale(0.7) translateX(0px) perspective(1000px) rotate3d(180,0,0,10deg)');
							}
							else obj.css('transform','scale(0.7) translateX(0px)');
						}
						else if(currentApp != obj.attr('app_name'))
						{
							obj.css('z-index', AppCount);
							if(androidRAView == true)
							{
								obj.css('transform','scale(0.7) translateX('+ ( (((AppsCount*100)+(zIApp*10)-AppCount)/AppCount)+0 ) + 'px) perspective(1000px) rotate3d(180,0,0,10deg)');
							}
							else obj.css('transform','scale(0.7) translateX('+ ( (((AppsCount*100)+(zIApp*10)-AppCount)/AppCount)+0 ) + 'px)');
						}
						//
						//
						var isloaded = obj.find('.rc').attr('state');
						if(isloaded == 'false')
						{
							obj.find('.rc').click(function(e)
							{
								android.Media.play(android.Media.SYSTEM_AUDIO, 'system/media/ui/Effect_Tick.mp3');
								//console.log(obj.attr('app_name') + ' clicked!');
								android.Controls.CloseRecentApps();
								android.Apps.openApp(obj.attr('app_name'), android.Apps.SYSAPP);
							});
							obj.find('.rc').attr('state','true');
						}
					//}
				});
				android.Apps.showed_app = "RecentApps";
				$(".mobile .model .m_display .display_apps").css('background', 'rgba(0, 0, 0, 0)');
			}
			else if(state == "true")
			{
				$(".mobile .model .m_display .display_apps .recent_apps").attr('state','false');
				$(".mobile .model .m_display .display_apps .app").each(function(e)
				{
					var obj = $(this);
					obj.attr('state','hided');
					
					if(obj.attr('app_name') == android.Memory.prototype.getData('HomeApp','Launcher'))
					{
						obj.find('app_content').css({
							'background': 'unset',
							'background-position-x': 'unset',
							'background-position-y': 'unset',
							'background-size': 'unset',
							'background-repeat': 'unset',
							'background-color': 'unset'
						});
					}
					
					/*var ostate = obj.attr('hided');
					if(ostate == 'false')
					{*/
						obj.attr('rs_state','false');
						obj.css({
							'transform': 'scale(1) translateX(0px)',
							'z-index':'unset'
						});
					//}
				});
			}
		}
		CloseRecentApps()
		{
			var state = $(".mobile .model .m_display .display_apps .recent_apps").attr('state');
			if(state == "true")
			{
				$(".mobile .model .m_display .display_apps .recent_apps").attr('state','false');
				$(".mobile .model .m_display .display_apps .app").each(function(e)
				{
					var obj = $(this);
					obj.attr('state','hided');
					
					if(obj.attr('app_name') == android.Memory.prototype.getData('HomeApp','Launcher'))
					{
						obj.find('app_content').css({
							'background': 'unset',
							'background-position-x': 'unset',
							'background-position-y': 'unset',
							'background-size': 'unset',
							'background-repeat': 'unset',
							'background-color': 'unset'
						});
					}
					
					/*var ostate = obj.attr('hided');
					if(ostate == 'false')
					{*/
						obj.attr('rs_state','false');
						obj.css('transform','scale(1) translateX(0px)');
					//}
				});
			}
		}
	}
	Timers(state, callback)
	{
		if(state == true)
		{
			this.UpdateSystemTimer = setTimeout(callback, 1000);
		}
		else if(state == false)
		{
			clearTimeout(this.UpdateSystemTimer);
		}
	}
	Log(string, log_level)
	{
		var return_str = '';
		if(log_level == this.LOG_INFO) 
		{
			return_str = '[LOG_INFO] ' + string;
			return console.log(return_str);
		}
		else if(log_level == this.LOG_WARNING) 
		{
			return_str = '[LOG_WARNING] ' + string;
			return console.warn(return_str);
		}
		else if(log_level == this.LOG_ERROR) 
		{
			return_str = '[LOG_WARNING] ' + string;
			return console.error(return_str);
		}
		else return 'null log level [' + log_level+ ']';
	}
	
	DateTime = class
	{
		nowDate() // дата
		{
			return new Date; 
		} 
		getDay() // день недели
		{
			return this.nowDate().getDay(); 
		} 
		getDayOfWeek() // число дня в месяце
		{
			return this.nowDate().getDate(); 
		} 
		getMonth() // номер месяца
		{
			return this.nowDate().getMonth(); 
		} 
		getMonthName(Month, Case = 'I') // номер месяца
		{
			/* Case
			I - именительный
			R - родительный
			*/
			if(Case == 'I')
			{
				switch(Month)
				{
					case 0: return 'Январь';
					case 1: return 'Февраль';
					case 2: return 'Март';
					case 3: return 'Апрель';
					case 4: return 'Май';
					case 5: return 'Июнь';
					case 6: return 'Июль';
					case 7: return 'Август';
					case 8: return 'Сентябрь';
					case 9: return 'Октябрь';
					case 10: return 'Ноябрь';
					case 11: return 'Декабрь';
				}
			}
			else if(Case == 'R')
			{
				switch(Month)
				{
					case 0: return 'Января';
					case 1: return 'Февраля';
					case 2: return 'Марта';
					case 3: return 'Апреля';
					case 4: return 'Мая'; 
					case 5: return 'Июня';
					case 6: return 'Июля';
					case 7: return 'Августа';
					case 8: return 'Сентября';
					case 9: return 'Октября';
					case 10: return 'Ноября';
					case 11: return 'Декабря';
				}
			}
		} 
		getFullYear() // год
		{
			return this.nowDate().getFullYear(); 
		}
		getHours()
		{
			return this.nowDate().getHours();
		}
		getMinutes()
		{
			return this.nowDate().getMinutes();
		}
		getSeconds()
		{
			return this.nowDate().getSeconds();
		}
		getStartedPhone()
		{
			if(android.PhoneTimeInStarted != undefined) return new Date(android.PhoneTimeInStarted);
			else return android.PhoneTimeInStarted;
		}
	}
	Numbers = class
	{
		Percent(num,out) // процент между 2 числами
		{ 
			return ((num / out) * 100); 
		}
		RandomInt(min, max)
		{
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}
	}
	Data = class
	{
		DataToObject(data)
		{
			return eval(data);
		}
	}
	/*Geo()
	{
		var glat, glong;
		if(navigator.geolocation) 
		{
			navigator.geolocation.getCurrentPosition(function(position) 
			{
				glat = position.coords.latitude;
				glong = position.coords.longitude;
				console.log(glat);
				console.log(glong);
				var geolocations = [glat,glong];
				return geolocations;
			});
		}
	}*/
	Memory = class
	{
		setData(key, value)
		{
			return localStorage.setItem(key, value);
		}
		getData(key, not_value = null)
		{
			if(localStorage.getItem(key) != null && localStorage.getItem(key) != '') return localStorage.getItem(key);
			else if(localStorage.getItem(key) == null || localStorage.getItem(key) == '')
			{
				if(not_value != null)
				{
					localStorage.setItem(key, not_value);
					return localStorage.getItem(key);
				}
				else return false;
			}
			else return false;
		}
		removeData(key)
		{
			return localStorage.removeItem(key);
		}
	}
	async GetData(url, method = 'GET', dataType = 'text') 
	{ 
		return await this.ResponseGetData(url, method, dataType); 
	}
	ResponseGetData(url, method, dataType) 
	{
		return new Promise(resolve => 
		{
			var xhr = new this.XHR();
			xhr.open(method, url, true);
			xhr.responseType = dataType;
			xhr.onload = function(e) 
			{
				if(this.status == 200) resolve(this.response);
				else 
				{
					android.Log('[' + this.status + ']: ' + this.response, this.LOG_ERROR);
				}
			};
			xhr.send();
		});
	}
	UserData = class
	{
		constructor()
		{
			this.MusicFolder = android.location_device + 'php/data.php?getMusic=1';
		}
	}
	Interface = class
	{
		constructor(android, display)
		{
			this.a = android;
			this.display = display;
			this.MediaDataPlayer = [];
		}
		setMediaDataPlayer(audio, img_url, audio_author, audio_name, background_color, controls = false)
		{
			this.MediaDataPlayer = [audio];
			$('.mobile .model .m_display .lock_screen center').fadeOut(100, function(e)
			{
				$('.mobile .model .m_display .lock_screen .ls_media_data').fadeIn(100, function(e)
				{
					$('.mobile .model .m_display .lock_screen').css({
						'background': background_color,
						'background-repeat': 'no-repeat',
						'background-position': 'center',
						'background-size': '80%',
						'background-position-y': 'calc(100% * 2 / 2 - 100px)',
						'background-image': 'url('+img_url+')'
					});
					$('.mobile .model .m_display .lock_screen .ls_media_data').css('opacity','1');
					$('.mobile .model .m_display .lock_screen .ls_media_data').find('label').html(audio_name);
					$('.mobile .model .m_display .lock_screen .ls_media_data').find('text').html(audio_author);
					$('.mobile .model .m_display .lock_screen .ls_media_data .lsmd_buttons').find('.play_pause').click(function(e)
					{
						var obj = $(this);
						if(audio.paused)
						{
							obj.find('i').text('pause');
							audio.play();
						}
						else 
						{
							obj.find('i').text('play_arrow');
							audio.pause();
						}
					});
					if(controls == false)
					{
						$('.mobile .model .m_display .lock_screen .ls_media_data .lsmd_buttons').find('.back').css('display','none');
						$('.mobile .model .m_display .lock_screen .ls_media_data .lsmd_buttons').find('.next').css('display','none');
					}
					else if(controls == true)
					{
						$('.mobile .model .m_display .lock_screen .ls_media_data .lsmd_buttons').find('.back').css('display','inline-block');
						$('.mobile .model .m_display .lock_screen .ls_media_data .lsmd_buttons').find('.next').css('display','inline-block');
					}
					if(audio.paused) $('.mobile .model .m_display .lock_screen .ls_media_data .lsmd_buttons').find('.play_pause').find('i').text('play_arrow');
					else $('.mobile .model .m_display .lock_screen .ls_media_data .lsmd_buttons').find('.play_pause').find('i').text('pause');
				});
			});
		}
		removeMediaDataPlayer()
		{
			this.MediaDataPlayer = [];
			$('.mobile .model .m_display .lock_screen center').fadeIn(100, function(e)
			{
				$('.mobile .model .m_display .lock_screen .ls_media_data').fadeOut(100, function(e)
				{
					$('.mobile .model .m_display .lock_screen').css({
						'background': 'rgba(0, 0, 0, 0.5)',
						'background-repeat': 'unset',
						'background-position': 'unset',
						'background-size': 'unset',
						'background-position-y': 'unset',
						'background-image': 'unset'
					});
					$('.mobile .model .m_display .lock_screen .ls_media_data').css('opacity','1');
					$('.mobile .model .m_display .lock_screen .ls_media_data').find('label').html('');
					$('.mobile .model .m_display .lock_screen .ls_media_data').find('text').html('');
				});
			});
		}
		
		setStateRecentAppsView(state)
		{
			this.a.RecentAppsView = state;
		}
		setWall(url)
		{
			this.a.Wall = url;
			// Global BG
			this.display.css({
				'background': 'url('+ this.a.Wall +')',
				'background-position-x': 'center',
				'background-position-y': 'top',
				'background-size': 'cover',
				'background-repeat': 'no-repeat',
				'background-color': '#000000'
			});
			// Notifications BG
			$('.mobile .model .m_display .notifications_display .n_background').css({
				'background': 'url('+ this.a.Wall +')',
				'background-position-x': 'center',
				'background-position-y': 'top',
				'background-size': 'cover',
				'background-repeat': 'no-repeat',
				'background-color': '#000000'
			});
			// RecentApps BG
			$('.mobile .model .m_display .display_apps .recent_apps .bg').css({
				'background': 'url('+ this.a.Wall +')',
				'background-position-x': 'center',
				'background-position-y': 'top',
				'background-size': 'cover',
				'background-repeat': 'no-repeat',
				'background-color': 'rgba(0, 0, 0, 0)'
			});
			//
			this.a.Memory.prototype.setData('Wall', url);
		}
		getCurrentWall()
		{
			return this.a.Memory.prototype.getData('Wall','system/walls/0.jpg');
		}
		getWalls()
		{
			return 'not walls';
		}
		reload_ripple()
		{
			ReloadRippleEffect();
		}
	}
	Audio = class
	{
		constructor(android)
		{
			this.a = android;
			//
			this.SYSTEM_AUDIO = 0;
			this.NOTYFI_AUDIO = 1;
			this.PLAYER_AUDIO = 2;
			//
			this.Audio = [undefined,undefined,undefined]
			this.src = ['','',''];
			this.volume = this.a.AudioVolume;
			//
			this.AudioObject = [
				$('.mobile .Sounds .SystemAudio'),
				$('.mobile .Sounds .NotyfiAudio'),
				$('.mobile .Sounds .AudioPlayer')
			];
		}
		init(audio)
		{
			this.src[audio] = '';
			this.Audio[audio] = this.AudioObject[audio][0];
			this.Audio[audio].src = this.src[audio];
			this.Audio[audio].load();
			this.Audio[audio].pause();
			this.Audio[audio].currentTime = 0;
			this.Audio[audio].volume = this.volume[audio];
			//
			this.Audio[audio].addEventListener('ended', event => 
			{
				this.Audio[audio].pause();
				this.Audio[audio].currentTime = 0;
				this.Audio[audio].src = '';
			});
			this.Audio[audio].addEventListener('timeupdate', event => 
			{
				this.Audio[audio].volume = this.volume[audio];
				this.a.Memory.prototype.setData('AudioVolume', this.volume[0]+',' + this.volume[1] + ',' + this.volume[2]);
			});
			this.Audio[audio].addEventListener('durationchange', event => 
			{
				this.Audio[audio].volume = this.volume[audio];
				this.a.Memory.prototype.setData('AudioVolume', this.volume[0]+',' + this.volume[1] + ',' + this.volume[2]);
			});
		}
		play(audio, src)
		{
			this.src[audio] = src;
			if(this.Audio[audio].paused == false) 
			{
				this.Audio[audio].pause();
				this.Audio[audio].currentTime = 0;
			}
			this.Audio[audio].src = this.src[audio];
			this.Audio[audio].load();
			this.Audio[audio].volume = this.volume[audio];
			this.Audio[audio].play();
		}
	}
	NotificationsBase = class
	{
		constructor(android)
		{
			this.a = android;
			this.notifications_all = [];
			this.count = 0;
			this.sound = 'system/media/notifications/Iapetus.mp3';
		}
		Build(app)
		{
			this.a.Media.play(android.Media.NOTYFI_AUDIO, this.sound);
			return app.NotificationsApp;
		}
	}
	AndroidApps = class
	{
		constructor()
		{
			this.SYSAPP = 'priv_apps';
			this.USERAPP = 'apps';
			//
			this.recent_appc = 0;
			this.recent_apps = [];
			//
			this.showed_app = undefined;
			this.last_showed_app = undefined;
			//
			this.audio_using_app = undefined;
			//
			this.priv_apps = [];
			this.hided_priv_apps = [];
			//
			this.user_apps = [];
			this.hided_user_apps = [];
			//
			this.all_apps = [];
			this.init_apps = [];
		}
		getRecentApps()
		{
			return this.recent_apps;
		}
		getCurrentAppName()
		{
			return $('.mobile .model .m_display .display_apps').attr('showed');
		}
		openApp(app_name, is_app = 'apps')
		{
			var app_open_now = true;
			var apps = $('.mobile .model .m_display .display_apps');
			apps.find('.app').each(function(e)
			{
				var appn = $(this).attr('app_name');
				if(appn == '') $(this).remove();
				if(appn != app_name)
				{
					$(this).attr('state', 'hided');
				}
				else if(appn == app_name)
				{
					$(this).attr('state', 'showed');
					app_open_now = false;
				}
			});
			if(app_open_now == true)
			{
				apps.append('\
				<div class="app" app_name="' + app_name + '" state="hided" hided="false" app_count="null">\
					<div class="rc" state="false">\
						<div class="app_info_up">\
							<img src="">\
							<label></label>\
						</div>\
					</div>\
					<style></style>\
					<app_content></app_content>\
				</div>');
				apps.find('.app[app_name=' + app_name + '] app_content').fadeOut(0);
				apps.find('.app[app_name=' + app_name + ']').attr('app_count', this.init_apps.length+1);
				if(is_app == 'priv_apps')
				{
					android.GetData(android.location_device + 'system/priv_apps/' + app_name + '/' + app_name + '.txt').then(result => 
					{
						var data = android.Data.prototype.DataToObject(result);
						console.log(data);
						if(data.color != undefined && data.color != '')
						{
							$('.mobile .model .m_display .display_apps').css('background', data.color);
							if(data.color != 'transparent')
							{
								$('.mobile .model .m_display .up_block .upb_info_block, .mobile .model .m_display .up_block .upb_info_notify_min').css('background', data.color);
							}
							else if(data.color == 'transparent')
							{
								$('.mobile .model .m_display .up_block .upb_info_block, .mobile .model .m_display .up_block .upb_info_notify_min').css('background', '#0062cb');
							}
							apps.find('.app[app_name=' + app_name + '] app_content').fadeIn(600);
						}
						if(data.hided == 'false') 
						{
							this.recent_appc = this.recent_appc + 1;
							this.recent_apps.push(app_name);
						}
						//
						$.get(android.location_device + 'system/priv_apps/' + app_name + '/' + app_name + '.html', function(html)
						{
							apps.find('.app[app_name=' + app_name + ']').find('app_content').append(html).parent().attr('state','showed');
							//
							apps.find('.app[app_name=' + app_name + ']')
							.append('<script type="text/javascript" src="system/priv_apps/' + app_name + '/' + app_name + '.js"></script>');
							//
							apps.find('.app[app_name=' + app_name + ']').find('style')
							.load(android.location_device + 'system/priv_apps/' + app_name + '/' + app_name + '.css');
							//apps.find('.app[app_name=' + app_name + ']').fadeIn(1000);
							apps.find('.app[app_name=' + app_name + ']').attr('hided', data.hided);
							
							apps.find('.app[app_name=' + app_name + ']').find('.rc .app_info_up label').html(data.app_name);
							apps.find('.app[app_name=' + app_name + ']').find('.rc .app_info_up img').attr('src', android.location_device + 'system/priv_apps/' + app_name + '/' + app_name + '.png');
						});	
					});
				}
				else if(is_app == 'apps')
				{
					android.GetData(android.location_device + 'system/apps/' + app_name + '/' + app_name + '.txt').then(result => 
					{
						var data = android.Data.prototype.DataToObject(result);
						console.log(data);
						if(data.color != undefined && data.color != '')
						{
							$('.mobile .model .m_display .display_apps').css('background', data.color);
							if(data.color != 'transparent')
							{
								$('.mobile .model .m_display .up_block .upb_info_block, .mobile .model .m_display .up_block .upb_info_notify_min').css('background', data.color);
							}
							else if(data.color == 'transparent')
							{
								$('.mobile .model .m_display .up_block .upb_info_block, .mobile .model .m_display .up_block .upb_info_notify_min').css('background', '#0062cb');
							}
							apps.find('.app[app_name=' + app_name + '] app_content').fadeIn(600);
						}
						if(data.hided == 'false') 
						{
							this.recent_appc = this.recent_appc + 1;
							this.recent_apps.push(app_name);
						}
						//
						$.get(android.location_device + 'system/apps/' + app_name + '/' + app_name + '.html', function(html)
						{
							apps.find('.app[app_name=' + app_name + ']').find('app_content').append(html).parent().attr('state','showed');
							//
							apps.find('.app[app_name=' + app_name + ']')
							.append('<script type="text/javascript" src="system/apps/' + app_name + '/' + app_name + '.js"></script>');
							//
							apps.find('.app[app_name=' + app_name + ']').find('style')
							.load(android.location_device + 'system/apps/' + app_name + '/' + app_name + '.css');
							//apps.find('.app[app_name=' + app_name + ']').fadeIn(1000);
							apps.find('.app[app_name=' + app_name + ']').attr('hided', data.hided);
							
							apps.find('.app[app_name=' + app_name + ']').find('.rc .app_info_up label').html(data.app_name);
							apps.find('.app[app_name=' + app_name + ']').find('.rc .app_info_up img').attr('src', android.location_device + 'system/apps/' + app_name + '/' + app_name + '.png');
						});	
					});
				}
			}
			else if(app_open_now == false)
			{
				if(is_app == 'priv_apps')
				{
					android.GetData(android.location_device + 'system/priv_apps/' + app_name + '/' + app_name + '.txt').then(result => 
					{
						var data = android.Data.prototype.DataToObject(result);
						if(data.color != undefined && data.color != '')
						{
							$('.mobile .model .m_display .display_apps').css('background', data.color);
							if(data.color != 'transparent')
							{
								$('.mobile .model .m_display .up_block .upb_info_block, .mobile .model .m_display .up_block .upb_info_notify_min').css('background', data.color);
							}
							else if(data.color == 'transparent')
							{
								$('.mobile .model .m_display .up_block .upb_info_block, .mobile .model .m_display .up_block .upb_info_notify_min').css('background', '#0062cb');
							}
							//apps.find('.app[app_name=' + app_name + ']').fadeIn(500);
						}	
					});
				}
				else if(is_app == 'apps')
				{
					android.GetData(android.location_device + 'system/apps/' + app_name + '/' + app_name + '.txt').then(result => 
					{
						var data = android.Data.prototype.DataToObject(result);
						if(data.color != undefined && data.color != '')
						{
							$('.mobile .model .m_display .display_apps').css('background', data.color);
							if(data.color != 'transparent')
							{
								$('.mobile .model .m_display .up_block .upb_info_block, .mobile .model .m_display .up_block .upb_info_notify_min').css('background', data.color);
							}
							else if(data.color == 'transparent')
							{
								$('.mobile .model .m_display .up_block .upb_info_block, .mobile .model .m_display .up_block .upb_info_notify_min').css('background', '#0062cb');
							}
							//apps.find('.app[app_name=' + app_name + ']').fadeIn(500);
						}	
					});
				}
			}
			if(this.last_showed_app == undefined) this.last_showed_app = app_name;
			if(this.last_showed_app == '' || this.last_showed_app != this.showed_app) 
			{
				this.last_showed_app = this.showed_app;
				this.HidedApp(this.last_showed_app);
			}
			this.showed_app = app_name;
			apps.attr('showed', this.showed_app);
		}
		InitApp(app_name, callback_Update, callback_SystemControls, callback_OpenApp, callback_HidedApp, callback_ClosedApp)
		{
			var check_app = 0;
			while(check_app < this.init_apps.length)
			{
				var app = this.init_apps[check_app];
				if(app.app_name == app_name)
				{
					var index = this.init_apps.indexOf(app);
					this.init_apps.splice(index, 1);
				}
				check_app++;
			}
			var app = class
			{
				constructor(app_name)
				{
					this.app_name = app_name;
					this.UpdateCallBack = callback_Update;
					this.SystemControlsCallBack = callback_SystemControls;
					this.AppOpen = callback_OpenApp;
					this.AppHided = callback_HidedApp;
					this.AppClosed = callback_ClosedApp;
					this.NotificationsApp = [];
				}
			}
			app = new app(app_name, callback_Update, callback_SystemControls, callback_OpenApp, callback_HidedApp, callback_ClosedApp);
			this.init_apps.push(app);
			app.AppOpen();
			return app;
		}
		ControlsInApp(current_app_name, key = '')
		{
			var cApp = 0;
			while(cApp < this.init_apps.length)
			{
				if(this.init_apps[cApp].app_name == current_app_name)
				{
					return this.init_apps[cApp].SystemControlsCallBack(key);
				}
				cApp++;
			}
			
		}
		OpenedApp(app_name)
		{
			var cApp = 0;
			while(cApp < this.init_apps.length)
			{
				if(this.init_apps[cApp].app_name == app_name)
				{
					return this.init_apps[cApp].AppOpen();
				}
				cApp++;
			}
		}
		HidedApp(app_name)
		{
			var cApp = 0;
			while(cApp < this.init_apps.length)
			{
				if(this.init_apps[cApp].app_name == app_name)
				{
					return this.init_apps[cApp].AppHided();
				}
				cApp++;
			}
		}
		ClosedApp(app_name)
		{
			var cApp = 0;
			while(cApp < this.init_apps.length)
			{
				if(this.init_apps[cApp].app_name == app_name)
				{
					return this.init_apps[cApp].AppClosed();
				}
				cApp++;
			}
		}
		UpdateInApps(app_name = '')
		{
			if(app_name != '')
			{
				var cApp = 0;
				while(cApp < this.init_apps.length)
				{
					if(this.init_apps[cApp].app_name == app_name)
					{
						return this.init_apps[cApp].UpdateCallBack(this.init_apps[cApp]);
					}
					cApp++;
				}
			}
			else if(app_name == '')
			{
				var cApp = 0;
				while(cApp < this.init_apps.length)
				{
					this.init_apps[cApp].UpdateCallBack(this.init_apps[cApp]);
					cApp++;
				}
				return;
			}
		}
		getCurrentApp()
		{
			var app_name = $('.mobile .model .m_display .display_apps').attr('showed');
			var cApp = 0;
			while(cApp < this.init_apps.length)
			{
				if(this.init_apps[cApp].app_name == app_name)
				{
					return this.init_apps[cApp];
				}
				cApp++;
			}
			return null;
		}
		getThisApp(app)
		{
			var app_name = app.app_name;
			var cApp = 0;
			while(cApp < this.init_apps.length)
			{
				if(this.init_apps[cApp].app_name == app_name)
				{
					return this.init_apps[cApp];
				}
				cApp++;
			}
			return null;
		}
		getApps()
		{
			var CHApp = 0;
			var cApp = 0;
			var resultApps = [];
			while(cApp < this.all_apps.length)
			{
				resultApps.push(this.all_apps[cApp]);
				cApp++;
			}
			while(CHApp < resultApps.length)
			{
				var CEApp = 0;
				while(CEApp < this.hided_priv_apps.length) 
				{
					if(this.hided_priv_apps[CEApp].hided == "true" && this.hided_priv_apps[CEApp].app_name == resultApps[CHApp])
					{
						var index = resultApps.indexOf(resultApps[CHApp]);
						resultApps.splice(index, 1);
					}
					CEApp++;
				}
				CHApp++;
			}
			return resultApps;
		}
		getRecentApps()
		{
			var cApp = 0;
			var resultApps = [];
			while(cApp < this.init_apps.length)
			{
				resultApps.push(this.init_apps[cApp]);
				cApp++;
			}
			var CHApp = 0;
			while(CHApp < resultApps.length)
			{
				var CEApp = 0;
				while(CEApp < this.hided_priv_apps.length) 
				{
					if(resultApps[CHApp] != undefined && resultApps[CHApp] != null)
					{
						if(this.hided_priv_apps[CEApp].hided == "true" && this.hided_priv_apps[CEApp].app_name == resultApps[CHApp].app_name)
						{
							var index = resultApps.indexOf(resultApps[CHApp]);
							resultApps.splice(index, 1);
						}
					}
					CEApp++;
				}
				CHApp++;
			}
			return resultApps;
		}
		closeApp(app)
		{
			var cApp = 0;
			var resultApps = [];
			while(cApp < this.init_apps.length)
			{
				resultApps.push(this.init_apps[cApp]);
				cApp++;
			}
			var CHApp = 0;
			while(CHApp < resultApps.length)
			{
				if(resultApps[CHApp] != undefined && resultApps[CHApp] != null && resultApps[CHApp].app_name == app)
				{
					this.ClosedApp(resultApps[CHApp].app_name);
					// remove app
					$(".mobile .model .m_display .display_apps .app").each(function(e)
					{
						var obj = $(this);
						var app_name = obj.attr('app_name');
						if(app_name == app)
						{
							obj.fadeOut(500, function(e)
							{
								$(this).remove();
							});
						}
					});
					var index = resultApps.indexOf(resultApps[CHApp]);
					resultApps.splice(index, 1);
				}
				CHApp++;
			}
			this.init_apps = resultApps;
		}
		clearAllApps()
		{
			var Apps = 0;
			while(Apps < this.all_apps.length)
			{
				var cApps = 0;
				var cAppName = this.all_apps[Apps];
				while(cApps < this.init_apps.length)
				{
					if(cAppName == this.init_apps[cApps].app_name)
					{
						if(android.Memory.prototype.getData('HomeApp','Launcher') != this.init_apps[cApps].app_name)
						{
							this.closeApp(this.init_apps[cApps].app_name);
						}
					}
					cApps++;
				}
				Apps++;
			}
		}
	}
}
let android = new AndroidBase();
android.Controls = new android.SysControls(android);
android.Folders = new android.UserData();

function UpdateSystem(UI)
{
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

	
	// status_bar
	var status_b = $('.mobile .model .m_display .status_bar');
	status_b.find('.sb .time').text(Hours + ':' + Minutes);
	// notifications panel up
	$('.mobile .model .m_display .up_block .upb_info_block left #up_in_time_upb').text(Hours + ':' + Minutes);
	
	// lock_sreen time date
	var ls_td = $('.mobile .model .m_display .lock_screen center');
	ls_td.find('label').text(Hours + ':' + Minutes);
	ls_td.find('text').text(Day + ' ' + MonthName + ' ' + Year);
	
	//App
	android.Apps.UpdateInApps();
	// MDP
	var Audio = android.UI.MediaDataPlayer[0];
	if(Audio != null && Audio != undefined)
	{
		if(Audio.paused) $('.mobile .model .m_display .lock_screen .ls_media_data .lsmd_buttons').find('.play_pause').find('i').text('play_arrow');
		else $('.mobile .model .m_display .lock_screen .ls_media_data .lsmd_buttons').find('.play_pause').find('i').text('pause');
	}
	
	android.Timers(true, UpdateSystem);
}



$(document).ready(function() 
{
	android.Apps = new android.AndroidApps();
	
	android.Apps.user_apps = [];
	//
	var appsAllA = android.Data.prototype.DataToObject('["Launcher","Music","Settings"]');
	var usallapp = 0;
	android.Apps.priv_apps = appsAllA;
	while(usallapp < appsAllA.length)
	{
		android.Apps.all_apps.push(appsAllA[usallapp]);
		usallapp++;
	}
	// Hideh Priv Apps 
	var appsHidePA = android.Data.prototype.DataToObject('[{"app_name":"Launcher","color":"transparent","hided":"true"}]');
	usallapp = 0;
	while(usallapp < appsHidePA.length)
	{
		android.Apps.hided_priv_apps.push(android.Data.prototype.DataToObject(appsHidePA[usallapp]));
		usallapp++;
	}
	//
	//
	// Start Home App
	android.Apps.openApp(android.Memory.prototype.getData('HomeApp','Launcher'),android.Apps.SYSAPP);
	// 
	android.UI = new android.Interface(android, $('.mobile .model .m_display'));
	var AUI = android.UI;
	android.UI.setWall(android.Memory.prototype.getData('Wall','system/walls/0.jpg'));
	//
	var Avolume = android.Memory.prototype.getData('AudioVolume','1,1,0.5').split(',');
	android.AudioVolume = Avolume;
	android.Media = new android.Audio(android);
	android.Media.init(0);
	android.Media.init(1);
	android.Media.init(2);
	//
	android.Notifications = new android.NotificationsBase(android);
	//
	android.Timers(true, UpdateSystem(AUI));
	//
	android.UI.reload_ripple();
});

if(android.Memory.prototype.getData('PhoneState') != null && android.Memory.prototype.getData('PhoneState') == 'true')
{
	android.PhoneState = true;
	$('.mobile .model .m_display .bootanimation').fadeOut(0);
}
else 
{
	android.PhoneState = false;
	$('.mobile .model .m_display .bootanimation').fadeIn(0);
}

if(android.Memory.prototype.getData('PhoneTimeInStarted') != null && android.Memory.prototype.getData('PhoneTimeInStarted') != '')
{
	android.PhoneTimeInStarted = android.Memory.prototype.getData('PhoneTimeInStarted');
}
else android.PhoneTimeInStarted = undefined;
















