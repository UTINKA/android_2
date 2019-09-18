android.Apps.InitApp('Music', function() // Update Second
{
	var MPApp = $('.music_app');
	var obj = MPApp.find('.ma_player .ma_mp_controls .mp_pl_pu');
	if(android.Media.Audio[2].paused)
	{
		obj.find('i').text('play_arrow');
	}
	else 
	{
		obj.find('i').text('pause');
	}
}, function(key) // System Controls
{
	if(key == android.Controls.Back)
	{
		MPlayers(false);
	}
	else if(key == android.Controls.Home)
	{

	}
	else if(key == android.Controls.RecentApps)
	{

	}
}, function() // Open
{
	var MPApp = $('.music_app');
	var MPApp_Content = $('.music_app .ma_content');
	
	var img_url = 'url(' + android.location_device + 'system/priv_apps/Music/res/music.png)';
	$('.music_app .ma_player .img').css('background-image', img_url);
	$('.music_app .max_ma_player .img').css('background-image', img_url);
	
	MPApp.find('.ma_player .info').click(function(e)
	{
		MPlayers(true);
	});
	
	MPApp.find('.ma_player .ma_mp_controls .mp_pl_pu').click(function(e)
	{
		var obj = $(this);
		android.Media.play(android.Media.SYSTEM_AUDIO, 'system/media/ui/Effect_Tick.mp3');
		if(android.Media.Audio[2].paused)
		{
			obj.find('i').text('pause');
			android.Media.Audio[2].play();
		}
		else 
		{
			obj.find('i').text('play_arrow');
			android.Media.Audio[2].pause();
		}
		android.UI.setMediaDataPlayer(
			android.Media.Audio[2], 
			android.location_device + 'system/priv_apps/Music/res/music.png',
			"",
			MPApp.find('.ma_player .info label').text(),
			'rgb(204, 0, 72)'
		);
	});
	
	MPApp_Content.find('.content_load_music .load_music_button .form-group #file').change(function(e)
	{
		var file = e.currentTarget.files[0];
		var url = window.URL.createObjectURL(file);
		android.Media.play(android.Media.PLAYER_AUDIO, url);
		var name = file.name;
		name = name.substring(0,name.length-4);
		// Player in App
		MPApp.find('.ma_player .info label').html(name); // name
		MPApp.find('.ma_player .info text').html(""); // author
		MPApp.find('.ma_player').attr('state','true');
		// Max Player
		MPApp.find('.ma_player .ma_mp_controls .mp_pl_pu i').text('pause');
		MPApp.find('.max_ma_player .info label').html(name); // name
		MPApp.find('.max_ma_player .info text').html(""); // author
		//
		android.UI.setMediaDataPlayer(
			android.Media.Audio[2], 
			android.location_device + 'system/priv_apps/Music/res/music.png',
			"",
			name,
			'rgb(204, 0, 72)'
		);
		android.Media.Audio[2].loop = true;
	});
	
}, function() // Hided 
{
	
}, function() // Closed
{
	var MPApp = $('.music_app');
	MPApp.find('.ma_player .ma_mp_controls .mp_pl_pu').find('i').text('play_arrow');
	android.Media.Audio[2].pause();
	android.Media.Audio[2].loop = false;
	android.UI.removeMediaDataPlayer();
});

function MusicGNL(level) 
{
	var d = $.Deferred(); 
	//setTimeout(function(){}, 1000);
	d.resolve(level);
	return d.promise();
};



function MPlayers(state)
{
	var MPApp = $('.music_app');
	if(state == true)
	{
		MPApp.find('.mapp').attr('state','mplayer');
		MPApp.find('.max_ma_player').attr('state','true');
	}
	else 
	{
		MPApp.find('.mapp').attr('state','null');
		MPApp.find('.max_ma_player').attr('state','false');
	}
}