<?php

header('Content-Type: text/event-stream');
header('Cache-Control: no-cache'); // recommended to prevent caching of event data.

set_time_limit(0); //O Script roda sem PHP timeout
ini_set('display_errors', 1); 
ini_set('display_startup_errors', 1);

//Inicializar os arrays:
$DB_tabelas = array("poloniex", "binance");
$DB_tab_size = count($DB_tabelas);

$Resultado = array();
flush();
//Usado para debug de tempo das queries no DB
//$tempo3 = microtime(true);

while (1) {
	//Apenas para resultado array no ser codificado JSON vazio
	$tempo = microtime(true);
	$Resultado['Query_Time'] = $tempo;
	//Usado para debug de tempo das queries no DB
	//$Resultado['FOR Delta T'] = 'none';

	//Conex?o com o DB:
	$DBlink = mysqli_connect('eyw6324oty5fsovx.cbetxkdyhwsb.us-east-1.rds.amazonaws.com','qqbgvmmrk35qvqfx','vb7argbqz4hoo04k','oynp0ahrktjwwzaz');
	
	if (!$DBlink) {
		//Enviar o Server Sent Event = DB Failure:
		echo 'event: REP_CRYPTODB_DB_FAIL' . PHP_EOL;
		echo 'data: Server info: Sem conectividade com o DB.' . mysqli_connect_error() . PHP_EOL;
		echo PHP_EOL;
		ob_flush();
		flush();
	}
	else {
		//Iteracao de busca em todas tabelas do Banco de dados
		for ($i=0; $i < $DB_tab_size; $i++) {
			//A query de busca no Banco de dados
			$result = mysqli_query($DBlink, "SELECT ".$DB_tabelas[$i]."TIME, ".$DB_tabelas[$i]."USDT_BTClast FROM ".$DB_tabelas[$i]." WHERE ".$DB_tabelas[$i]."TIME = (select tick from ".$DB_tabelas[$i]."TS)");

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
				if ($row = mysqli_fetch_row($result)) {
					//Concatenar resultados obtidos na Query				
					//$Resultado['x'.(strval($x))] = $row[0];
					//$Resultado['y'.(strval($x))] = $row[1];
					//$x++;
					$Resultado['x'] = $row[0];
					$Resultado[$DB_tabelas[$i].'_y'] = $row[1];	
	
					//Enviar o Server Sent Event:
									
				}			
			}
		}
		$JSON_FORMATO = json_encode($Resultado);
		echo 'event: REP_CRYPTODB' . PHP_EOL;
		echo 'data:' . $JSON_FORMATO . PHP_EOL;
		echo PHP_EOL;
		ob_flush();
		flush();
		//Usado para debug de tempo das queries no DB
		//$tempo2 = microtime(true);
		//$Resultado['FOR Delta T'] = ($tempo2 - $tempo3);


		//Limpar array pra pr?xima rodada de busca
		$Resultado = array();
		

		//Usado para debug de tempo das queries no DB
		//$tempo3 = microtime(true);		
	}
	mysqli_close($DBlink);
	sleep(5);
}
?>
