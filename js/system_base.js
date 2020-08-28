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
		this.Modules = undefined;
		this.Controls = undefined;
		this.Notifications = undefined;
		// Configurations
		this.Wall = undefined;
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
		this.AudioVolume = [1,1,0.5];
		
		// System Info
		this.RealCores = navigator.hardwareConcurrency;
		this.MaxAppsOpened = undefined;
		
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
			android.Controls.CurrentScrollApps = 0;
			//
			var state = $(".mobile .model .m_display .display_apps .recent_apps").attr('state');
			if(state == 'false')
			{
				$(".mobile .model .m_display .display_apps .recent_apps").attr('state','true');
				var MouseMoveState = $(".mobile .model .m_display .display_apps .recent_apps").attr('mms');
				if(MouseMoveState == undefined || MouseMoveState == null)
				{
					$(".mobile .model .m_display .display_apps .recent_apps")
					$(".mobile .model .m_display .display_apps .recent_apps").attr('mms','true');
				}
				
				var filtApps = 1;
				var AppsCountTra = 1;
				var AppsCount = android.Apps.init_apps.length;
				var currentApp = android.Apps.getCurrentAppName();
				//
				var objNextTransform = '';
				var numberPattern = /-?\d+\.?\d*/g;
				//
				$(".mobile .model .m_display .display_apps .app").each(function(e)
				{
					var obj = $(this);
					obj.attr('state','hided');
					if(obj.attr('app_name') == currentApp)
					{
						obj.css('z-index',(AppsCount+2));
					}
					else if(obj.attr('app_name') != currentApp) obj.css('z-index', '1');
					//
					if(obj.attr('app_name') == android.Memory.prototype.getData('HomeApp','Launcher')) // Home App
					{
						//
						obj.attr('app_count', filtApps);
						obj.attr('rs_state','true');
						obj.find('.rc .app_info_up').attr('state','false');
						obj.find('app_content').css({
							'background': 'url('+ android.UI.getCurrentWall() +')',
							'background-position-x': 'center',
							'background-position-y': 'top',
							'background-size': 'cover',
							'background-repeat': 'no-repeat',
							'background-color': '#000000'
						});
						// Set position
						obj.attr('lr','-75');
						obj.attr('ud','0');
						if(AppsCount == 1) 
						{
							obj.css('transform','scale(0.6) translateX(0%) translateY(0%)');
						}
						else if(AppsCount > 1) 
						{
							obj.css('transform','scale(0.3) translateX(-75%) translateY(0%)');
						}
						//
						objNextTransform = 'matrix(0.3, 0, 0, 0.3, -75, 0)';
						objNextTransform = objNextTransform.match(numberPattern); // scaleX[0],skewY[1],skewX[2],scaleY[3],translateX[4],translateY[5]
						AppsCountTra++; 
					}
					else if(obj.attr('app_name') != android.Memory.prototype.getData('HomeApp','Launcher')) // Not Home App
					{
						//
						obj.attr('rs_state','true');
						obj.attr('app_count', filtApps);
						// Set position
						var translateX = String(objNextTransform[4]);
						var translateY = String(objNextTransform[5]);
						//
						if(AppsCountTra > 2)
						{
							translateY = (parseInt(translateY)+120);
							AppsCountTra = 1;
						}
						//
						if(translateX == '-75') // Left
						{
							translateX = '75';// Set to Right
							obj.attr('lr',translateX);
							obj.attr('ud',translateY);
							//
							objNextTransform = 'matrix(0.3, 0, 0, 0.3, ' + translateX + ', ' + translateY + ')';
							obj.css('transform','scale(0.3) translateX(' + translateX + '%) translateY(' + translateY + '%)');
							AppsCountTra = 3; 
						}
						else if(translateX == '75') // Right
						{
							translateX = '-75';// Set to Left
							obj.attr('lr',translateX);
							obj.attr('ud',translateY);
							//
							objNextTransform = 'matrix(0.3, 0, 0, 0.3, ' + translateX + ', ' + translateY + ')';
							obj.css('transform','scale(0.3) translateX(' + translateX + '%) translateY(' + translateY + '%)');
							AppsCountTra = 1; 
						}
						// save next position
						objNextTransform = objNextTransform.match(numberPattern); // scaleX[0],skewY[1],skewX[2],scaleY[3],translateX[4],translateY[5]
						obj.attr('trX', obj.attr('lr'));
						obj.attr('trY', obj.attr('ud'));
					}
					
					var IsAppLoaded = obj.find('.rc').attr('state');
					if(IsAppLoaded == 'false')
					{
						// Add Clicks App
						obj.find('.rc').click(function(e)
						{
							var oapp = $(this);
							android.Media.play(android.Media.SYSTEM_AUDIO, 'system/media/ui/Effect_Tick.mp3');
							//console.log(obj.attr('app_name') + ' clicked!');
							android.Controls.CloseRecentApps();
							var is_app = obj.attr('isapp');
							if(is_app == 'true')
							{
								android.Apps.openApp(obj.attr('app_name'), android.Apps.SYSAPP);	
							}
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
						});
						obj.find('.rc').attr('state','true');
					}
					//
					var MoveList = 0;
					$('.mobile .model .m_display .display_apps .recent_apps').bind('mousewheel',function(e, delta)
					{
						if(android.Apps.init_apps.length < 2) return;
						if (delta > 0) MoveList++;
						else MoveList--;
						// Update
						$('.mobile .model .m_display .display_apps .app').each(function(e)
						{ 
							var obj = $(this);
							var objTransMove = String(obj.css('transform'));
							objTransMove = objTransMove.match(numberPattern); // scaleX[0],skewY[1],skewX[2],scaleY[3],translateX[4],translateY[5]
							//
							var MoveTranslateX = obj.attr('lr');
							var MoveTranslateY = parseInt(objTransMove[5]);
							var appUD = parseInt(obj.attr('ud'));
							//	
							MoveTranslateY = (((MoveList * 20) + delta) + appUD);
							//
							obj.css('transform','scale(0.3) translateX(' + MoveTranslateX + '%) translateY(' + MoveTranslateY + '%)');
							obj.attr('trX', MoveTranslateX);
							obj.attr('trY', MoveTranslateY);
						});
					});
					//
					filtApps++;
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
					obj.attr('rs_state','false');
					obj.css({
						'transform': 'scale(1) translateX(0px)',
						'z-index':'unset'
					});
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
					obj.attr('rs_state','false');
					obj.css('transform','scale(1) translateX(0px)');
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
	
	Sleep(milliseconds)
	{
		const date = Date.now();
		let currentDate = null;
		do {
			currentDate = Date.now();
		} while (currentDate - date < milliseconds);
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
			this.MediaDataPlayer = undefined;
		}
		setMediaDataPlayer(audio, img_url, audio_author, audio_name, background_color, controls = false)
		{
			if(this.MediaDataPlayer != undefined)
			{
				//audio.pause();
				this.MediaDataPlayer = undefined;
			}
			this.MediaDataPlayer = audio;
			// to global
			var MediaElement = this.MediaDataPlayer;
			//
			$('.mobile .model .m_display .lock_screen center').fadeOut(100, function(e)
			{
				$('.mobile .model .m_display .lock_screen .ls_media_data').fadeIn(100, function(e)
				{
					// Bg Image
					$('.mobile .model .m_display .lock_screen .ls_media_data_BGImage').css({
						'background': background_color,
						'background-repeat': 'no-repeat',
						'background-position': 'center',
						'background-size': '200%',
						'background-position-y': 'calc(0%)',
						'background-image': 'url(' + img_url + ')'
					});
					// Image 
					$('.mobile .model .m_display .lock_screen .ls_media_data_Image').css({
						'background': 'rgba(255, 255, 255, 0)',
						'background-repeat': 'no-repeat',
						'background-position': 'center',
						'background-size': 'contain',
						'background-image': 'url(' + img_url + ')'
					});
					$('.mobile .model .m_display .lock_screen .ls_media_data').css('opacity','1');
					$('.mobile .model .m_display .lock_screen .ls_media_data').find('label').html(audio_name);
					$('.mobile .model .m_display .lock_screen .ls_media_data').find('text').html(audio_author);
					var CreatedClicks = $('.mobile .model .m_display .lock_screen .ls_media_data .lsmd_buttons').attr('mcl');
					if(CreatedClicks == 'null')
					{
						$('.mobile .model .m_display .lock_screen .ls_media_data .lsmd_buttons').find('.play_pause').click(function(e)
						{
							var obj = $(this);
							if(android.UI.MediaDataPlayer != undefined)
							{
								if(android.UI.MediaDataPlayer.paused)
								{
									obj.find('i').text('pause');
									android.UI.MediaDataPlayer.play();
								}
								else 
								{
									obj.find('i').text('play_arrow');
									android.UI.MediaDataPlayer.pause();
								}
							}
						});
						$('.mobile .model .m_display .lock_screen .ls_media_data .lsmd_buttons').attr('mcl','set');
					}
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
				});
			});
		}
		removeMediaDataPlayer()
		{
			this.MediaDataPlayer = undefined;
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
					$('.mobile .model .m_display .lock_screen .ls_media_data_BGImage').css('background','unset');
					$('.mobile .model .m_display .lock_screen .ls_media_data_Image').css('background','unset');
				});
			});
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
			return this.a.Memory.prototype.getData('Wall', 'system/walls/0.jpg');
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
			var AClass = this.a;
			var VolTS, VolumeMin = 0.2;
			var LastVolume = undefined;
			//
			if(AClass.Media.volume[2] > 0)
			{
				if(AClass.Media.volume[2] >= VolumeMin) 
				{
					LastVolume = android.Media.volume[2];
					//
					var volToMin = 1.0;
					while(volToMin != VolumeMin)
					{
						android.Sleep(20);
						volToMin = volToMin-0.1;
						if(volToMin < VolumeMin) volToMin = VolumeMin;
						android.Media.volume[2] = volToMin;
					}
					AClass.Media.play(AClass.Media.NOTYFI_AUDIO, AClass.Notifications.sound);
					clearTimeout(VolTS);
					VolTS = setTimeout(function() 
					{
						var volToLast = LastVolume;
						while(volToMin != volToLast)
						{
							android.Sleep(20);
							volToMin = volToMin+0.1;
							if(volToMin > volToLast) volToMin = volToLast;
							android.Media.volume[2] = volToMin;
						}
						clearTimeout(VolTS);
					}, 180);
				}
			}
			return app.NotificationsApp;
		}
	}
	AndroidModules = class
	{
		constructor()
		{
			this.AllModules = [];
			this.LoadedModules = [];
			this.ShowedModule = undefined;
			this.ClicksCount = 0;
		}
		getAllModules()
		{
			return this.AllModules;
		}
		getLoadedModules()
		{
			return this.LoadedModules;
		}
		InitModule(module, ActivateControl, ClicksC = 1, callback_Update, callback_SystemControls, callback_Showed, callback_Hided)
		{
			var NewModule = class
			{
				constructor(module, ActivateControl, ClicksC)
				{
					this.module = module;
					this.UpdateCallBack = callback_Update;
					this.SystemControlsCallBack = callback_SystemControls;
					this.Showed = callback_Showed;
					this.Hided = callback_Hided;
					this.IsActive = false; // активен в данный момент модуль или нет 
					this.Activate = ActivateControl; 
					this.ClicksInActivate = ClicksC; // количество кликов для активации (beta)
				}
			}
			NewModule = new NewModule(module, ActivateControl, ClicksC, callback_Update, callback_SystemControls, callback_Showed, callback_Hided);
			this.LoadedModules.push(NewModule);
			console.log('Module Inited: ' + module);
			return this.LoadedModules.length-1;
		}
		ControlShowedModule(key = '')
		{
			var cMod = 0;
			this.ClicksCount++;
			while(cMod < this.LoadedModules.length)
			{
				if(this.LoadedModules[cMod].IsActive == false)
				{
					if(this.LoadedModules[cMod].Activate == key)
					{
						if(this.LoadedModules[cMod].ClicksInActivate == this.ClicksCount)
						{
							this.ClicksCount = 0;
							this.ShowedModule = this.LoadedModules[cMod].module;
							this.LoadedModules[cMod].Showed();
							return true;
						}
						else if(this.LoadedModules[cMod].ClicksInActivate != this.ClicksCount)
						{
							if(this.ClicksCount > this.LoadedModules[cMod].ClicksInActivate) 
							{
								this.ClicksCount = 0;
							}
							return false;
						}
					}
				}
				cMod++;
			}
			return false;
		}
		ControlsInModulesActive(key = '', call = true)
		{
			var cMod = 0;
			while(cMod < this.LoadedModules.length)
			{
				if(this.LoadedModules[cMod].IsActive == true)
				{
					if(call == true) this.LoadedModules[cMod].SystemControlsCallBack(key);
					return true;
				}
				cMod++;
			}
			return false;
		}
		getActiveModule()
		{
			var cMod = 0;
			while(cMod < this.LoadedModules.length)
			{
				if(this.LoadedModules[cMod].IsActive == true)
				{
					if(this.LoadedModules[cMod].module == this.ShowedModule)
					{
						return cMod;
					}
				}
				cMod++;
			}
			return false;
		}
		ShowedModule(module) // показать модуль если есть возможность ?(null)
		{
			var cMod = 0;
			while(cMod < this.LoadedModules.length)
			{
				if(this.LoadedModules[cMod].module == module)
				{
					this.ShowedModule = module;
					this.LoadedModules[cMod].IsActive = true;
					return this.LoadedModules[cMod].Showed();
				}
				cMod++;
			}
		}
		HidedModule(module) // скрыть модуль если есть возможность ?(null)
		{
			var cMod = 0;
			while(cMod < this.LoadedModules.length)
			{
				if(this.LoadedModules[cMod].module == module)
				{
					this.ShowedModule = undefined;
					this.LoadedModules[cMod].IsActive = false;
					return this.LoadedModules[cMod].Hided();
				}
				cMod++;
			}
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
				var is_app_value;
				if(is_app == 'priv_apps') is_app_value = 'true';
				else if(is_app == 'apps') is_app_value = 'false';
				//
				var Loader_Apps = $('.mobile .model .m_display .display_apps .loader_apps');
				Loader_Apps.find('.box img').attr('src', android.location_device + 'system/' + is_app + '/' + app_name + '/' + app_name + '.png');
				if(app_name != android.Memory.prototype.getData('HomeApp','Launcher'))
				{
					//Loader_Apps.fadeIn(0);
				}
				//
				apps.append('\
				<div class="app" app_name="' + app_name + '" isapp="' + is_app_value + '" state="hided" hided="false" app_count="null">\
					<div class="rc" state="false">\
						<div class="app_info_up">\
							<img src="">\
						</div>\
						<!--div class="app_info_down">\
							<label>0 Mb.</label>\
						</div-->\
					</div>\
					<style></style>\
					<app_content></app_content>\
				</div>');
				apps.find('.app[app_name=' + app_name + '] app_content').fadeOut(0);
				apps.find('.app[app_name=' + app_name + ']').attr('app_count', this.init_apps.length+1);
				// Remover App
				if(app_name != android.Memory.prototype.getData('HomeApp','Launcher'))
				{
					var objNextTransform = '';
					var numberPattern = /-?\d+\.?\d*/g;
					var currTrasnform = '';
					var startTransform = '';
					//
					var MouseIsMoved = false;
					var AppBlockRemove = apps.find('.app[app_name=' + app_name + ']');
					AppBlockRemove.find('.rc').mousedown(function(e)
					{
						currTrasnform = String($(this).parent().css('transform'));
						startTransform = currTrasnform;
						//MouseIsMoved = true;
						$(this).parent().css('transition','0s');
					});
					AppBlockRemove.find('.rc').mouseup(function(e)
					{
						//MouseIsMoved = false;
						var objTransform = startTransform.match(numberPattern); // scaleX[0],skewY[1],skewX[2],scaleY[3], translateX[4],translateY[5]
						//
						var TranslateX = parseInt(objTransform[4]);
						var TranslateY = parseInt(objTransform[5]);
						$(this).parent().css('transform','scale(0.3) translateX(' + TranslateX + '%) translateY(' + TranslateY + '%)');
						$(this).parent().css('opacity','1');
						$(this).parent().css('transition','0.5s');
					});
					
					AppBlockRemove.find('.rc').mousemove(function(e) 
					{
						if(MouseIsMoved == false) return;
						//
						var obj = $(this).parent();
						var moveX = (e.pageX - (320 / 2) - (92/2));
						if(moveX < 60 || moveX > 90)
						{
							if(moveX < 60)
							{
								if(moveX == 59) obj.css('opacity','0.9');
								else if(moveX == 58) obj.css('opacity','0.8');
								else if(moveX == 57) obj.css('opacity','0.7');
								else if(moveX == 56) obj.css('opacity','0.6');
								else if(moveX == 55) obj.css('opacity','0.5');
								else if(moveX == 54) obj.css('opacity','0.4');
								else if(moveX == 53) obj.css('opacity','0.3');
								else if(moveX == 52) obj.css('opacity','0.2');
								else if(moveX == 51) obj.css('opacity','0.1');
								else if(moveX < 50) 
								{
									obj.css('opacity','0');
									android.Apps.closeApp(obj.attr('app_name'));
									android.Controls.CloseRecentApps();
									android.Apps.openApp(android.Memory.prototype.getData('HomeApp','Launcher'), android.Apps.SYSAPP);
									$('.mobile .model .m_display .status_bar').css({
										'background': 'rgba(0, 0, 0, 0)',
										'backdrop-filter': 'blur(0px)'
									});
									$('.mobile .model .m_display .controls').css({
										'background': 'rgba(0, 0, 0, 0)',
										'backdrop-filter': 'blur(0px)'
									});
								}
							}
							else if(moveX > 90)
							{
								if(moveX == 91) obj.css('opacity','0.9');
								else if(moveX == 92) obj.css('opacity','0.8');
								else if(moveX == 93) obj.css('opacity','0.7');
								else if(moveX == 94) obj.css('opacity','0.6');
								else if(moveX == 95) obj.css('opacity','0.5');
								else if(moveX == 96) obj.css('opacity','0.4');
								else if(moveX == 97) obj.css('opacity','0.3');
								else if(moveX == 98) obj.css('opacity','0.2');
								else if(moveX == 99) obj.css('opacity','0.1');
								else if(moveX > 100) 
								{
									obj.css('opacity','0');
									android.Apps.closeApp(obj.attr('app_name'));
									android.Controls.CloseRecentApps();
									android.Apps.openApp(android.Memory.prototype.getData('HomeApp','Launcher'), android.Apps.SYSAPP);
									$('.mobile .model .m_display .status_bar').css({
										'background': 'rgba(0, 0, 0, 0)',
										'backdrop-filter': 'blur(0px)'
									});
									$('.mobile .model .m_display .controls').css({
										'background': 'rgba(0, 0, 0, 0)',
										'backdrop-filter': 'blur(0px)'
									});
								}
							}
						}
						else if(moveX > 60 || moveX < 90)
						{
							obj.css('opacity','1');
						}
						var TranslateY = obj.attr('trY');
						obj.css('transform','scale(0.3) translateX(' + moveX + '%) translateY(' + TranslateY + '%)');
					});
				}
				//
				if(is_app == 'priv_apps')
				{
					android.GetData(android.location_device + 'system/priv_apps/' + app_name + '/' + app_name + '.txt').then(result => 
					{
						var data = android.Data.prototype.DataToObject(result);
						console.log(data);
						if(data.color != undefined && data.color != '')
						{
							if(app_name != android.Memory.prototype.getData('HomeApp','Launcher'))
							{
								$('.mobile .model .m_display .display_apps .app[app_name=' + app_name + '] app_content').css('background', data.color);
								$('.mobile .model .m_display .display_apps').css('background', 'rgba(0, 0, 0, 0)');
							}
							if(data.color != 'transparent')
							{
								$('.mobile .model .m_display .up_block .upb_info_block, .mobile .model .m_display .up_block .upb_info_notify_min').css('background', data.color);
								Loader_Apps.css('background', data.color);
							}
							else if(data.color == 'transparent')
							{
								$('.mobile .model .m_display .up_block .upb_info_block, .mobile .model .m_display .up_block .upb_info_notify_min').css('background', '#0062cb');
								Loader_Apps.css('background','transparent');
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
							
							//apps.find('.app[app_name=' + app_name + ']').find('.rc .app_info_up label').html(data.app_name);
							apps.find('.app[app_name=' + app_name + ']').find('.rc .app_info_up img').attr('src', android.location_device + 'system/priv_apps/' + app_name + '/' + app_name + '.png');
							// App Memory
							//apps.find('.app[app_name=' + app_name + ']').find('.rc .app_info_down label').html('' + android.Numbers.prototype.RandomInt(app_name.length*100/2, ((app_name.length*1000/2)+(app_name.length*100/2))) + 'Mb');
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
							if(app_name != android.Memory.prototype.getData('HomeApp','Launcher'))
							{
								$('.mobile .model .m_display .display_apps .app[app_name=' + app_name + '] app_content').css('background', data.color);
								$('.mobile .model .m_display .display_apps').css('background', 'rgba(0, 0, 0, 0)');
							}
							if(data.color != 'transparent')
							{
								$('.mobile .model .m_display .up_block .upb_info_block, .mobile .model .m_display .up_block .upb_info_notify_min').css('background', data.color);
								Loader_Apps.css('background', data.color);
							}
							else if(data.color == 'transparent')
							{
								$('.mobile .model .m_display .up_block .upb_info_block, .mobile .model .m_display .up_block .upb_info_notify_min').css('background', '#0062cb');
								Loader_Apps.css('background','transparent');
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
							
							//apps.find('.app[app_name=' + app_name + ']').find('.rc .app_info_up label').html(data.app_name);
							apps.find('.app[app_name=' + app_name + ']').find('.rc .app_info_up img').attr('src', android.location_device + 'system/apps/' + app_name + '/' + app_name + '.png');
							// App Memory
							//apps.find('.app[app_name=' + app_name + ']').find('.rc .app_info_down label').html('' + android.Numbers.prototype.RandomInt(app_name.length*100/2, ((app_name.length*1000/2)+(app_name.length*100/2))) + 'Mb');
						});	
					});
				}
				var SleepTLA = setTimeout(function()
				{
					clearTimeout(SleepTLA);
					Loader_Apps.fadeOut(500);
				}, 500);
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
							if(app_name != android.Memory.prototype.getData('HomeApp','Launcher'))
							{
								$('.mobile .model .m_display .display_apps .app[app_name=' + app_name + '] app_content').css('background', data.color);
								$('.mobile .model .m_display .display_apps').css('background', 'rgba(0, 0, 0, 0)');
							}
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
							if(app_name != android.Memory.prototype.getData('HomeApp','Launcher'))
							{
								$('.mobile .model .m_display .display_apps .app[app_name=' + app_name + '] app_content').css('background', data.color);
								$('.mobile .model .m_display .display_apps').css('background', 'rgba(0, 0, 0, 0)');
							}
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
		InitApp(app_name, callback_Update, callback_SystemControls, callback_OpenApp, callback_HidedApp, callback_ClosedApp, callback_UnLockedScreen)
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
					this.UnLockedScreen = callback_UnLockedScreen;
					this.NotificationsApp = [];
				}
			}
			app = new app(app_name, callback_Update, callback_SystemControls, callback_OpenApp, callback_HidedApp, callback_ClosedApp, callback_UnLockedScreen);
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
		UnLokedScreenIsApp(current_app_name, LockedState)
		{
			var cApp = 0;
			while(cApp < this.init_apps.length)
			{
				if(this.init_apps[cApp].app_name == current_app_name)
				{
					var Screen = class
					{
						constructor()
						{
							this.IsLocked = undefined;
						}
					}
					Screen.IsLocked = LockedState;
					return this.init_apps[cApp].UnLockedScreen(Screen);
				}
				cApp++;
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

function UpdateSystem()
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
	
	// lock_screen media elements 
	if(android.UI.MediaDataPlayer != undefined)
	{
		if(android.UI.MediaDataPlayer.paused) 
		{
			$('.mobile .model .m_display .lock_screen .ls_media_data .lsmd_buttons').find('.play_pause').find('i').text('play_arrow');
		}
		else
		{
			$('.mobile .model .m_display .lock_screen .ls_media_data .lsmd_buttons').find('.play_pause').find('i').text('pause');
		}
	}
					
	//App
	android.Apps.UpdateInApps();
	
	// System Mem in real cores
	var Cores = android.RealCores;
	var MemoryInCores = parseInt((1024*Cores)/600);
	android.MaxAppsOpened = MemoryInCores;
	//console.log(android.MaxAppsOpened);
	
	
	android.Timers(true, UpdateSystem);
}



$(document).ready(function() 
{
	android.Apps = new android.AndroidApps();
	android.Modules = new android.AndroidModules();
	// 
	// если нужна динамика удаляем код ниже
	android.GetData(android.location_device).then(result => 
	{
		var res = android.Data.prototype.DataToObject('["LoadMusic"]');
		if(res != "")
		{
			android.Apps.user_apps = res;
			var usallapp = 0;
			while(usallapp < android.Apps.user_apps.length)
			{
				android.Apps.all_apps.push(android.Apps.user_apps[usallapp]);
				usallapp++;
			}
		}
	});
	//
	android.GetData(android.location_device).then(result => 
	{
		var res = android.Data.prototype.DataToObject('["AppStore", "Launcher", "Settings"]');
		if(res != "")
		{
			android.Apps.priv_apps = res;
			var usallapp = 0;
			while(usallapp < android.Apps.priv_apps.length)
			{
				android.Apps.all_apps.push(android.Apps.priv_apps[usallapp]);
				usallapp++;
			}
		}
	});
	// Hideh Priv Apps 
	android.GetData(android.location_device).then(result => 
	{
		var result = android.Data.prototype.DataToObject('[\
			{app_name: "App Store", color: "#006c4a", hided: "false"},\
			{app_name: "Launcher", color: "transparent", hided: "true"},\
			{app_name: "Настройки", color: "#0063cc", hided: "false"}\
		]');
		var usallapp = 0;
		while(usallapp < result.length)
		{
			android.Apps.hided_priv_apps.push(android.Data.prototype.DataToObject(result[usallapp]));
			usallapp++;
		}
	});
	/*
		Внимание! Не работает на github'e!
		Код ниже выполняет динамическую загрузку приложений и модулей
		Код выше этого комментария удаляйте если будете использовать динамическую загрузку
	*/
	/*android.GetData(android.location_device + 'php/apps.php?getApps').then(result => 
	{
		var res = android.Data.prototype.DataToObject(result);
		if(res != "")
		{
			android.Apps.user_apps = res;
			var usallapp = 0;
			while(usallapp < android.Apps.user_apps.length)
			{
				android.Apps.all_apps.push(android.Apps.user_apps[usallapp]);
				usallapp++;
			}
		}
	});
	//
	android.GetData(android.location_device + 'php/apps.php?getPApps').then(result => 
	{
		var res = android.Data.prototype.DataToObject(result);
		if(res != "")
		{
			android.Apps.priv_apps = res;
			var usallapp = 0;
			while(usallapp < android.Apps.priv_apps.length)
			{
				android.Apps.all_apps.push(android.Apps.priv_apps[usallapp]);
				usallapp++;
			}
		}
	});
	// Hideh Priv Apps 
	android.GetData(android.location_device + 'php/apps.php?getPAppsHided').then(result => 
	{
		var result = android.Data.prototype.DataToObject(result);
		var usallapp = 0;
		while(usallapp < result.length)
		{
			android.Apps.hided_priv_apps.push(android.Data.prototype.DataToObject(result[usallapp]));
			usallapp++;
		}
	});
	// Load Modules
	android.GetData(android.location_device + 'php/modules.php?getModules').then(result => 
	{
		var result = android.Data.prototype.DataToObject(result);
		var allmod = 0;
		while(allmod < result.length)
		{
			android.Modules.AllModules.push(result[allmod]);
			console.log('Module Loaded: ' + result[allmod]);
			//
			$('body').append('<script type="text/javascript" src="js/modules/' + result[allmod] + '/' + result[allmod] + '.js"></script>');
			$('body').append('<link rel="stylesheet" href="js/modules/' + result[allmod] + '/style.css" type="text/css">');
			allmod++;
		}
	});*/
	//
	//
	// Start Home App
	android.Apps.openApp(android.Memory.prototype.getData('HomeApp','Launcher'),android.Apps.SYSAPP);
	// 
	android.UI = new android.Interface(android, $('.mobile .model .m_display'));
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
	android.Timers(true, UpdateSystem);
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