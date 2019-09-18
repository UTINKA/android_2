String.prototype.replaceAt = function(index, replacement) {
  return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

$(document).ready(function() 
{
	var 
		off_screen = $('.mobile .model .m_display .off_screen'),
		bootanimation = $('.mobile .model .m_display .bootanimation'),
		mcontrols = $('.mobile .model .m_display .controls'),
		mlock_screen = $('.mobile .model .m_display .lock_screen'),
		app = $('.mobile .model .m_display .display_apps'),
		statsB = $('.mobile .model .m_display .status_bar'),
		notifiDis = $('.mobile .model .m_display .notifications_display'),
		mpower = [$('.mobile .model .m_right .m_power'), undefined, false]
	;

	notifiDis.fadeOut(0);
	
	/*app.swipe(
	{
		swipe:function(event, direction, distance, duration, fingerCount, fingerData) 
		{
			if(direction == 'down')
			{
				notifiDis.fadeIn(500);
			}
		},
		threshold:250
	});*/
	app.find('recent_apps').scroll(function()
	{
		alert('Элемент foo был прокручен... скроллирован... ну как там это называется то?!');
	});
	
	/*notifiDis.swipe(
	{
		swipe:function(event, direction, distance, duration, fingerCount, fingerData) 
		{
			if(direction == 'up')
			{
				notifiDis.fadeOut(500);
			}
		},
		threshold:250
	});*/

	var 
		ls_lock_icon = false
	;
	// RecentApps
	app.find('.recent_apps .buttons_down').find('.clear_all_apps').click(function(e)
	{
		var obj = $(this);
		obj.attr('state','true');
		android.Media.play(android.Media.SYSTEM_AUDIO, 'system/media/ui/Effect_Tick.mp3');
		setTimeout(function()
		{
			android.Apps.clearAllApps();
			setTimeout(function()
			{
				obj.find('i').text('done');
				obj.attr('state','false');
				setTimeout(function()
				{
					android.Controls.CloseRecentApps();
					android.Apps.openApp(android.Memory.prototype.getData('HomeApp','Launcher'), android.Apps.SYSAPP);
					obj.find('i').text('close');
				}, 1500);
			}, 2000);
		}, 500);
	});
	app.find('.recent_apps').on('mousewheel', function(e) 
	{
		var state_scroll = e.deltaY;
		var pl = android.Controls.ScrollApps;
		if(state_scroll == -1) // right (scroll down)
		{
			console.log('RA Srcoll [Right] ' + e.deltaFactor);

			android.Controls.CurrentScrollApps = parseInt(android.Controls.CurrentScrollApps - pl);
		}
		else if(state_scroll == 1) // left (scroll up)
		{
			console.log('RA Srcoll [Left] ' + e.deltaFactor);
			
			android.Controls.CurrentScrollApps = parseInt(android.Controls.CurrentScrollApps + pl);
		}
		var zIApp = 1;
		$(".mobile .model .m_display .display_apps .app").each(function(e)
		{
			var obj = $(this);
			zIApp++;
			var AppsCount = android.Apps.init_apps.length;
			var AppCount = parseInt(obj.attr('app_count'));
			var count = android.Controls.CurrentScrollApps;
			var AppIndex = parseInt(obj.css('z-index'));
			
			if(count > -140)
			{
				obj.css('transform','scale(0.7) translateX('+ ( (((AppsCount*100)+(zIApp*10)-AppCount)/AppCount)+ count) + 'px) perspective(1000px) rotate3d(180,0,0,10deg)');
			}
			else if(count < -140)
			{
				
			}
		});
	});

	// global
	$('body').mousemove(function(e)
	{
		var mouseX = e.clientX;
		var mouseY = e.clientY;
		if(ls_lock_icon == true)
		{
			var move = (mouseY-40)
			mlock_screen.css('opacity', move/600);
			mlock_screen.find('center').css('transform', 'scale(' + move/600 + ')');
			if(move <= 310)
			{
				mlock_screen.find('center').css('transform','scale(0)');
				mlock_screen.fadeOut(50);
				ls_lock_icon = false, android.PhoneUnLocked = true;
				//
				mcontrols.css('bottom','0');
				app.find('.app').each(function(e)
				{
					$(this).css('bottom','40px');
				});
				//
				android.Media.play(android.Media.SYSTEM_AUDIO, 'system/media/ui/UnLock.mp3');
			}
			else if(move >= 549) 
			{
				//if(ls_lock_icon == true) ls_lock_icon = false;
				move = 550, android.PhoneUnLocked = false;
				mlock_screen.find('center').css('transform','scale(1)');
				mlock_screen.css('opacity','1');
			}
		}
	});

	// boot
	bootanimation[0].addEventListener("ended", function()
	{
		if(bootanimation[0].currentTime == bootanimation[0].duration)
		{
			bootanimation[0].pause();
			bootanimation[0].currentTime = 0;
			if(android.PhoneState == false) 
			{
				android.Memory.prototype.setData('PhoneState', true);
				android.PhoneState = true;
				//
				android.PhoneLocked = false;
				android.PhoneUnLocked = false;
			}
			else if(android.PhoneState == true) 
			{
				android.Memory.prototype.setData('PhoneState', false);
				android.PhoneState = false;
				off_screen.fadeIn(300);
			}
			//
			android.PhoneTimeInStarted = android.DateTime.prototype.nowDate();
			android.Memory.prototype.setData('PhoneTimeInStarted', android.PhoneTimeInStarted);
			//
			bootanimation.fadeOut(300);
			mlock_screen.fadeIn(0);
			mcontrols.css('bottom','-40px');
			app.find('.app').each(function(e)
			{
				$(this).css('bottom','0');
			});
		}
	}, true);

	// mobile model controls
	mpower[0].mousedown(function(e)
	{
		mpower[2] = true;
		if(android.PhoneState == false) 
		{
			mpower[1] = setTimeout(function()
			{
				if(mpower[2] == true)
				{
					bootanimation.fadeIn(0, function()
					{
						mlock_screen.fadeOut(0);
						off_screen.fadeOut(0);
						bootanimation.css('display','unset');
						bootanimation[0].play();
					});
				}
			}, 2500);
		}
		/*else if(android.PhoneState == true)
		{
			mpower[1] = setTimeout(function()
			{
				if(mpower[2] == true)
				{
					off_screen.fadeOut(0);
					bootanimation.fadeIn(0);
					android.PhoneLocked = true;
					android.PhoneUnLocked = false;
					bootanimation[0].play();
				}
			}, 4000);
		}*/
	});
	mpower[0].mouseup(function(e)
	{
		mpower[2] = false;
		clearTimeout(mpower[1]);
		if(android.PhoneState == true)
		{
			mpower[1] = setTimeout(function()
			{
				if(mpower[2] == true)
				{
					off_screen.fadeOut(0);
					bootanimation.fadeIn(0);
					android.PhoneLocked = true;
					android.PhoneUnLocked = false;
					bootanimation[0].play();
				}
			}, 4000);
			// unlock phone
			bootanimation.fadeOut(0);
			if(android.PhoneLocked == true)
			{
				off_screen.fadeOut(300, function()
				{
					mlock_screen.fadeIn(0);
					android.PhoneLocked = false;
					android.PhoneUnLocked = false;
					mcontrols.css('bottom','-40px');
					app.find('.app').each(function(e)
					{
						$(this).css('bottom','0');
					});
				});
			}
			else if(android.PhoneLocked == false)
			{
				off_screen.fadeIn(100, function()
				{
					if(android.PhoneUnLocked == true) android.Media.play(android.Media.SYSTEM_AUDIO, 'system/media/ui/Lock.mp3');
					android.PhoneLocked = true;
					android.PhoneUnLocked = false;
					mcontrols.css('bottom','-40px');
					app.find('.app').each(function(e)
					{
						$(this).css('bottom','0');
					});
					//
					mlock_screen.fadeIn(0, function()
					{
						mlock_screen.css('opacity', 1);
						mlock_screen.find('center').css('transform','scale(1)');
					});
				});
			}
		}
	});

	// lock_screen
	function lkdblscreen_lock()
	{
		if(android.PhoneState == true)
		{
			// unlock phone
			bootanimation.fadeOut(0);
			if(android.PhoneLocked == true)
			{
				off_screen.fadeOut(300, function()
				{
					mlock_screen.fadeIn(0);
					android.PhoneLocked = false;
					android.PhoneUnLocked = false;
					mcontrols.css('bottom','-40px');
					app.find('.app').each(function(e)
					{
						$(this).css('bottom','0');
					});
				});
			}
			else if(android.PhoneLocked == false)
			{
				off_screen.fadeIn(100, function()
				{
					if(android.PhoneUnLocked == true) android.Media.play(android.Media.SYSTEM_AUDIO, 'system/media/ui/Lock.mp3');
					android.PhoneLocked = true;
					android.PhoneUnLocked = false;
					mcontrols.css('bottom','-40px');
					app.find('.app').each(function(e)
					{
						$(this).css('bottom','0');
					});
					//
					mlock_screen.fadeIn(0, function()
					{
						mlock_screen.css('opacity', 1);
						mlock_screen.find('center').css('transform','scale(1)');
					});
				});
			}
		}
	}
	off_screen.dblclick(lkdblscreen_lock);
	mlock_screen.dblclick(lkdblscreen_lock);

	mlock_screen.mouseup(function(e)
	{
		if(ls_lock_icon == true) ls_lock_icon = false;
	});

	mlock_screen.find('.ls_controls').find('.ls_lock_icon').mousedown(function(e)
	{
		ls_lock_icon = true;
	});
});














