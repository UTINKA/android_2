var 
	sab_head = $('.settings_app_header'),
	sab = $('.settings_app'),
	sab_obj,
	sab_page = 'null',
	sab_scroll
;

sab.find('.s_content').find('.s_block').click(function(e)
{
	var obj = $(this);
	if(sab_page == 'null')
	{
		sab_page = obj.find('label').text();
		//
		sab_scroll = sab.scrollTop();
		sab.scrollTop(0);
		sab_head.css({
			'top': '-40px',
			'color': '#007cff'
		});
		
		sab.css({
			'overflow-y': 'hidden',
			'top': '-40px',
			'height': '100%'
		});
		sab.find('.s_content').css('width', '100%');
		//
		obj.attr('state','opened');
		sab.find('.s_content').find('.s_block').each(function()
		{
			if($(this).attr('state') != 'opened')
			{
				$(this).css('z-index','1');
			} 
		});
		//
		obj.css({
			'z-index': '4',
			'position': 'absolute',
			'top': '0',
			'left': '0',
			'right': '0',
			'margin': '0',
			'height': '40px',
			'border-radius': '0'
		});
		sab.find('.s_content').find('.s_block_open').css({
			'display': 'block',
			'height': 'auto'
		});
		// update opened page
		sab.find('.s_content').find('.s_block_open').html('\
		<div class="mdl-loader-1">\
			<svg class="mdll1">\
				<circle class="path" cx="27" cy="27" r="20" fill="none" stroke-width="4" stroke-miterlimit="10"></circle>\
			</svg>\
		</div>');
		//
		if(obj.attr('page') != 'null' || obj.attr('page') != '')
		{
			android.GetData(android.location_device + 'system/priv_apps/Settings/pages/' + obj.attr('page') +'.html').then(result => 
			{
				sab.find('.s_content').find('.s_block_open').html(result);
				sab.find('.s_content').find('.s_block_open').css('overflow-y','auto');
			});
		}
		sab_obj = obj;
	}
	else if(sab_page != 'null')
	{
		sab_head.css({
			'top': '0px',
			'color': '#ffffff'
		});
		sab.css({
			'overflow-y': 'auto',
			'top': '0',
			'height': 'calc(100% - 40px)'
		});
		sab.find('.s_content').css('width', '100%');
		//
		obj.attr('state','null');
		sab.find('.s_content').find('.s_block').each(function()
		{
			if($(this).attr('state') != 'opened')
			{
				$(this).css('z-index','3');
			} 
		});
		//
		obj.css({
			'position': 'relative',
			'top': 'unset',
			'left': 'unset',
			'right': 'unset',
			'margin': '5px',
			'height': '40px',
			'border-radius': '2px',
			'z-index': '3'
		});
		sab.find('.s_content').find('.s_block_open').css({
			'height': '0',
			'display': 'none'
		});
		//
		sab.scrollTop(sab_scroll);
		sab_page = 'null';
		sab.find('.s_content').find('.s_block_open').html('');
	}
	android.Media.play(android.Media.SYSTEM_AUDIO, 'system/media/ui/Effect_Tick.mp3');
});


android.Apps.InitApp('Settings', function() // Update Second
{
	
}, function(key) // System Controls
{
	if(key == android.Controls.Back)
	{
		if(sab_page != 'null')
		{
			sab_head.css({
				'top': '0px',
				'color': '#ffffff'
			});
			sab.css({
				'overflow-y': 'auto',
				'top': '0',
				'height': 'calc(100% - 40px)'
			});
			sab.find('.s_content').css('width', '100%');
			//
			sab_obj.attr('state','null');
			sab.find('.s_content').find('.s_block').each(function()
			{
				if($(this).attr('state') != 'opened')
				{
					$(this).css('z-index','3');
				} 
			});
			//
			sab_obj.css({
				'position': 'relative',
				'top': 'unset',
				'left': 'unset',
				'right': 'unset',
				'margin': '5px',
				'height': '40px',
				'border-radius': '2px',
				'z-index': '3'
			});
			sab.find('.s_content').find('.s_block_open').css({
				'height': '0',
				'display': 'none'
			});
			//
			sab.scrollTop(sab_scroll);
			sab_page = 'null';
			sab.find('.s_content').find('.s_block_open').html('');
		}
	}
	else if(key == android.Controls.Home)
	{

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
	
});

