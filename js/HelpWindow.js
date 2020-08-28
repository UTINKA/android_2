$(document).ready(function() 
{
	$('.HelpWindow p button').click(function(e)
	{
		android.Memory.prototype.setData('HelpWindow','1');
		$('.HelpWindow p').fadeOut(500);
		$('.HelpWindow').fadeOut(1000);
	});
	
	if(android.Memory.prototype.getData('HelpWindow','0') != null && android.Memory.prototype.getData('HelpWindow','0') != '')
	{
		var hw = parseInt(android.Memory.prototype.getData('HelpWindow'));
		if(hw == 0)
		{
			$('.HelpWindow').fadeIn(0);
		} 
		else if(hw == 1)
		{
			$('.HelpWindow').fadeOut(0);
		}
	}
});

