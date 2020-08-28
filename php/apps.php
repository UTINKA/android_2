<?php
	if(isset($_GET['getApps']))
	{
		$dir = "../system/apps/";
		$apps = array();

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
			$apps = explode(',',$find);
			
			exit(json_encode($apps));
		}
	}
	// priv_apps
	if(isset($_GET['getPApps']))
	{
		$dir = "../system/priv_apps/";
		$apps = array();

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
			$apps = explode(',',$find);
			
			exit(json_encode($apps));
		}
	}
	else if(isset($_GET['getPAppsHided']))
	{
		$dir = "../system/priv_apps/";
		$apps = array();

		if($handle = opendir($dir))
		{
			$hidedapps;
			while($entry = readdir($handle))
			{
				if($entry != '.' and $entry != '..') 
				{
					$fp = fopen($dir.$entry.'/'.$entry.'.txt', "r");
					if($fp) 
					{
						$data = '';
						while(!feof($fp))
						{
							$data = $data.fgets($fp, 99999);
						}
						$hidedapps = $hidedapps.$data.'(:)';
					}
					fclose($fp);
				}
			}
			closedir($handle);
			
			$hidedapps = substr($hidedapps, 0, -3);
			$apps = explode('(:)', $hidedapps);
			
			exit(json_encode($apps));
		}
	}
?>