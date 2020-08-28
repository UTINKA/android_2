<?php
	if(isset($_GET['getWalls']))
	{
		$wall = '';
		$walls = array();
		foreach (glob("../system/walls/*.jpg") as $filename) 
		{
			$wall = $wall.$filename."(:)";
		}
		foreach (glob("../system/walls/*.png") as $filename) 
		{
			$wall = $wall.$filename."(:)";
		}
		$wall = substr($wall, 0, -3);
		$walls = explode('(:)', $wall);
		exit(json_encode($walls));
	}
?>