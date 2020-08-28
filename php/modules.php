<?php
	if(isset($_GET['getModules']))
	{
		$dir = "../js/modules/";
		$modules = array();

		if($handle = opendir($dir))
		{
			$find;
			while($entry = readdir($handle))
			{
				if($entry != '.' and $entry != '..') 
				{
					$find = $find.$entry.',';
				}
			}
			closedir($handle);
			
			$find = substr($find, 0, -1);
			$modules = explode(',',$find);
			
			exit(json_encode($modules));
		}
	}
?>