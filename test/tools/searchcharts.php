<?php
header("Content-Type: text/event-stream");
header('Cache-Control: no-cache'); // recommended to prevent caching of event data.
error_reporting(-1);

set_time_limit(0); //O Script roda sem PHP timeout
ini_set('display_errors', 1); 
ini_set('display_startup_errors', 1);

$tsSTART = ($_GET['tsstart'])/1000; //JAVASCRIPT operando timestamp em ms. Database opera timestamp em s.
$tsEND = ($_GET['tsend'])/1000; //JAVASCRIPT operando timestamp em ms. Database opera timestamp em s.
$tsINC = 1000;

// temp config
$tsTEMPSTART = $tsSTART;
$tsTEMPEND = $tsEND;

$DB = $_GET['db'];
$DBTAB = $_GET['dbtab'];
$TABTIME = $_GET['tabtime'];
$DBPARAM01 = $_GET['dbparam01'];

$Resultado = array();

//Conexão com o DB:
$DBlink = mysqli_connect('eyw6324oty5fsovx.cbetxkdyhwsb.us-east-1.rds.amazonaws.com','qqbgvmmrk35qvqfx','vb7argbqz4hoo04k',$DB);

if (!$DBlink) {
	//Enviar o Server Sent Event = DB Failure:
	echo 'event: REP_CRYPTODB_FAIL' . PHP_EOL;
	echo 'data: Server info: Sem conectividade com o DB.' . mysqli_connect_error() . PHP_EOL;
	echo PHP_EOL;
	ob_flush();
	flush();
	
}else {	
	while ($tsTEMPEND <= $tsEND) {
		//echo 'TS START: '.$tsTEMPSTART.' TS END: '.$tsTEMPEND;
		//A query de busca no Banco de dados
		if ($tsTEMPEND == $tsEND) {
			//echo "SELECT ".$TABTIME.", ".$DBPARAM01." FROM ".$DBTAB." WHERE ".$TABTIME." BETWEEN ".$tsTEMPSTART." AND ".$tsTEMPEND." ORDER BY ".$TABTIME." ASC;";
			$result = mysqli_query($DBlink, "SELECT ".$TABTIME.", ".$DBPARAM01." FROM ".$DBTAB." WHERE ".$TABTIME." BETWEEN ".$tsTEMPSTART." AND ".$tsTEMPEND." ORDER BY ".$TABTIME." ASC;");
		} else {
			$result = mysqli_query($DBlink, "SELECT ".$TABTIME.", ".$DBPARAM01." FROM ".$DBTAB." WHERE ".$TABTIME." BETWEEN ".$tsTEMPSTART." AND ".$tsTEMPEND." ORDER BY ".$TABTIME." ASC LIMIT 1;");
		}
		
		if (!$result) {
			//Falha na execucao da Query
			//Enviar o Server Sent Event = DB Failure:
			echo 'event: REP_CRYPTODB_FAIL' . PHP_EOL;
			echo 'data: Server info: Falha na query ao DB' . PHP_EOL;
			echo PHP_EOL;
			ob_flush();
			flush();
		
		} else {
			//Coletar resultados obtidos da Query
			//$x = 0;
			while ($row = mysqli_fetch_row($result)) {
				//Concatenar resultados obtidos na Query				
				//$Resultado['x'.(strval($x))] = $row[0];
				//$Resultado['y'.(strval($x))] = $row[1];
				//$x++;
				//print_r($row);		
				$Resultado['exchange'] = $DBTAB;		
				$Resultado['x'] = $row[0];
				$Resultado['y'] = $row[1];

				//Enviar o Server Sent Event:
				$JSON_FORMATO = json_encode($Resultado);
				echo 'event: REP_CRYPTODB' . PHP_EOL;
				echo 'data:' . $JSON_FORMATO . PHP_EOL;
				echo PHP_EOL;
				//ob_flush();
				flush();				
			}			
		}
		$tsTEMPSTART = $tsTEMPEND;
		$tsTEMPEND = $tsTEMPEND + $tsINC;
	}
}

$Resultado['exchange'] = $DBTAB;
$Resultado['x'] = 'FIM';
$Resultado['y'] = 'FIM';	

//Enviar o Server Sent Event:
$JSON_FORMATO = json_encode($Resultado);
echo 'event: REP_CRYPTODB' . PHP_EOL;
echo 'data:' . $JSON_FORMATO . PHP_EOL;
echo PHP_EOL;
//ob_flush();
flush();
mysqli_close($DBlink);

?>