<?php
	if(isset($_GET['getMusic']))
	{
		$aList = null;
		foreach (glob("../system/data/Music/*.mp3") as $filename) 
		{
			$aList = $aList.$filename."(0)";
		}
		$aList = substr($aList, count($aList), count($aList)-4);
		echo $aList;
	}
?>