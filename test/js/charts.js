// CHARTS
var abscissa = new Array();
var abscissaTEMP = new Array();
var coordenada = new Array();
var coordenadaTEMP = new Array();
var searcher = 'DOING';
var offset = 0;
var graphObjects = 0;
var vectorDatabase = [];
var vectorEquipment = [];
var tsSTART;
var tsEND;
var lastHeight = new Array();
var i = 0;
var myLineChart = null;
var loaded = false;

$(document).ready(function () {
	// Remove modal of Chart Insertion
	$('body').on('hidden.bs.modal', '.modal', function () {
		document.getElementById('form-modal').remove();
	});

	//init_charts();
	coordenada.push(new Array());
	coordenada.push(new Array());
	coordenadaTEMP.push(new Array());
	coordenadaTEMP.push(new Array());

	search("binance");
	search("poloniex");
	
	
	
	

    var event = new EventSource("/test/synoptics/tools/getdata.php");

    event.addEventListener('open', function (e) { // A cada HTTP Request
        $("#dbmessage").text("");
        $('#dbmessage').css('visibility', 'hidden');
    }, false);

    event.addEventListener('error', function (e) {
        if (e.eventPhase == 2) { // EventSource.CLOSED
            $("#dbmessage").text("ERRO - Conexao Interrompida.");
            $('#dbmessage').css('visibility', 'visible');
            $("#dbmessagepopup").text("Falha de comunicação do serviço Apache2 no Webserver");
        }
    }, false);

    event.addEventListener('REP_CRYPTODB_DB_FAIL', function (e) {
        $("#dbmessage").text("Falha CRYPTODB Database");
        $('#dbmessage').css('visibility', 'visible');
        $("#dbmessagepopup").text("Falha de comunicação com o banco de dados 'cryptodb'");
    }, false);

    event.addEventListener('REP_CRYPTODB', function(e) {
		//var graph = document.getElementById("chart0").getContext('2d');
		//var graph = document.querySelector('#chart0').$chartjs.instance;
		//draw(e.data);
		var valor = JSON.parse(e.data);
		if (myLineChart != null) {
			//console.log(convertCoordinates("BTC-USDT", parseInt(valor['y'])));
			//console.log(dateFormat(new Date(parseInt(valor['x'])*1000), "dd/mm/yyyy HH:MM:ss"));
			addData(myLineChart, dateFormat(new Date(parseInt(valor['x'])*1000), "dd/mm/yyyy HH:MM:ss"), valor);
			removeData(myLineChart);
		}

			
		
	}, false);
})

function init_charts() {
    if (console.log("run_charts  typeof [" + typeof Chart + "]"), "undefined" != typeof Chart) {
        if (console.log("init_charts"), Chart.defaults.global.legend = {
                enabled: !1
            }, $("#canvas_line").length) {
            new Chart(document.getElementById("canvas_line"), {
                type: "line",
                data: {
                    labels: ["January", "February", "March", "April", "May", "June", "July"],
                    datasets: [{
                        label: "My First dataset",
                        backgroundColor: "rgba(38, 185, 154, 0.31)",
                        borderColor: "rgba(38, 185, 154, 0.7)",
                        pointBorderColor: "rgba(38, 185, 154, 0.7)",
                        pointBackgroundColor: "rgba(38, 185, 154, 0.7)",
                        pointHoverBackgroundColor: "#fff",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointBorderWidth: 1,
                        data: [31, 74, 6, 39, 20, 85, 7]
                    }, {
                        label: "My Second dataset",
                        backgroundColor: "rgba(3, 88, 106, 0.3)",
                        borderColor: "rgba(3, 88, 106, 0.70)",
                        pointBorderColor: "rgba(3, 88, 106, 0.70)",
                        pointBackgroundColor: "rgba(3, 88, 106, 0.70)",
                        pointHoverBackgroundColor: "#fff",
                        pointHoverBorderColor: "rgba(151,187,205,1)",
                        pointBorderWidth: 1,
                        data: [82, 23, 66, 9, 99, 4, 2]
                    }]
                }
            })
        }
        if ($("#canvas_line1").length) {
            new Chart(document.getElementById("canvas_line1"), {
                type: "line",
                data: {
                    labels: ["January", "February", "March", "April", "May", "June", "July"],
                    datasets: [{
                        label: "My First dataset",
                        backgroundColor: "rgba(38, 185, 154, 0.31)",
                        borderColor: "rgba(38, 185, 154, 0.7)",
                        pointBorderColor: "rgba(38, 185, 154, 0.7)",
                        pointBackgroundColor: "rgba(38, 185, 154, 0.7)",
                        pointHoverBackgroundColor: "#fff",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointBorderWidth: 1,
                        data: [31, 74, 6, 39, 20, 85, 7]
                    }, {
                        label: "My Second dataset",
                        backgroundColor: "rgba(3, 88, 106, 0.3)",
                        borderColor: "rgba(3, 88, 106, 0.70)",
                        pointBorderColor: "rgba(3, 88, 106, 0.70)",
                        pointBackgroundColor: "rgba(3, 88, 106, 0.70)",
                        pointHoverBackgroundColor: "#fff",
                        pointHoverBorderColor: "rgba(151,187,205,1)",
                        pointBorderWidth: 1,
                        data: [82, 23, 66, 9, 99, 4, 2]
                    }]
                }
            })
        }
        if ($("#canvas_line2").length) {
            new Chart(document.getElementById("canvas_line2"), {
                type: "line",
                data: {
                    labels: ["January", "February", "March", "April", "May", "June", "July"],
                    datasets: [{
                        label: "My First dataset",
                        backgroundColor: "rgba(38, 185, 154, 0.31)",
                        borderColor: "rgba(38, 185, 154, 0.7)",
                        pointBorderColor: "rgba(38, 185, 154, 0.7)",
                        pointBackgroundColor: "rgba(38, 185, 154, 0.7)",
                        pointHoverBackgroundColor: "#fff",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointBorderWidth: 1,
                        data: [31, 74, 6, 39, 20, 85, 7]
                    }, {
                        label: "My Second dataset",
                        backgroundColor: "rgba(3, 88, 106, 0.3)",
                        borderColor: "rgba(3, 88, 106, 0.70)",
                        pointBorderColor: "rgba(3, 88, 106, 0.70)",
                        pointBackgroundColor: "rgba(3, 88, 106, 0.70)",
                        pointHoverBackgroundColor: "#fff",
                        pointHoverBorderColor: "rgba(151,187,205,1)",
                        pointBorderWidth: 1,
                        data: [82, 23, 66, 9, 99, 4, 2]
                    }]
                }
            })
        }
        if ($("#canvas_line3").length) {
            new Chart(document.getElementById("canvas_line3"), {
                type: "line",
                data: {
                    labels: ["January", "February", "March", "April", "May", "June", "July"],
                    datasets: [{
                        label: "My First dataset",
                        backgroundColor: "rgba(38, 185, 154, 0.31)",
                        borderColor: "rgba(38, 185, 154, 0.7)",
                        pointBorderColor: "rgba(38, 185, 154, 0.7)",
                        pointBackgroundColor: "rgba(38, 185, 154, 0.7)",
                        pointHoverBackgroundColor: "#fff",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointBorderWidth: 1,
                        data: [31, 74, 6, 39, 20, 85, 7]
                    }, {
                        label: "My Second dataset",
                        backgroundColor: "rgba(3, 88, 106, 0.3)",
                        borderColor: "rgba(3, 88, 106, 0.70)",
                        pointBorderColor: "rgba(3, 88, 106, 0.70)",
                        pointBackgroundColor: "rgba(3, 88, 106, 0.70)",
                        pointHoverBackgroundColor: "#fff",
                        pointHoverBorderColor: "rgba(151,187,205,1)",
                        pointBorderWidth: 1,
                        data: [82, 23, 66, 9, 99, 4, 2]
                    }]
                }
            })
        }
        if ($("#canvas_line4").length) {
            new Chart(document.getElementById("canvas_line4"), {
                type: "line",
                data: {
                    labels: ["January", "February", "March", "April", "May", "June", "July"],
                    datasets: [{
                        label: "My First dataset",
                        backgroundColor: "rgba(38, 185, 154, 0.31)",
                        borderColor: "rgba(38, 185, 154, 0.7)",
                        pointBorderColor: "rgba(38, 185, 154, 0.7)",
                        pointBackgroundColor: "rgba(38, 185, 154, 0.7)",
                        pointHoverBackgroundColor: "#fff",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointBorderWidth: 1,
                        data: [31, 74, 6, 39, 20, 85, 7]
                    }, {
                        label: "My Second dataset",
                        backgroundColor: "rgba(3, 88, 106, 0.3)",
                        borderColor: "rgba(3, 88, 106, 0.70)",
                        pointBorderColor: "rgba(3, 88, 106, 0.70)",
                        pointBackgroundColor: "rgba(3, 88, 106, 0.70)",
                        pointHoverBackgroundColor: "#fff",
                        pointHoverBorderColor: "rgba(151,187,205,1)",
                        pointBorderWidth: 1,
                        data: [82, 23, 66, 9, 99, 4, 2]
                    }]
                }
            })
        }
        if ($("#lineChart").length) {
            var f = document.getElementById("lineChart");
            new Chart(f, {
                type: "line",
                data: {
                    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
                    datasets: [{
                        label: "My First dataset",
                        backgroundColor: "rgba(38, 185, 154, 0.31)",
                        borderColor: "rgba(38, 185, 154, 0.7)",
                        pointBorderColor: "rgba(38, 185, 154, 0.7)",
                        pointBackgroundColor: "rgba(38, 185, 154, 0.7)",
                        pointHoverBackgroundColor: "#fff",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointBorderWidth: 1,
                        data: [31, 74, 6, 39, 20, 85, 7, 31, 74, 6, 39, 20]
                    }, {
                        label: "My Second dataset",
                        backgroundColor: "rgba(3, 88, 106, 0.3)",
                        borderColor: "rgba(3, 88, 106, 0.70)",
                        pointBorderColor: "rgba(3, 88, 106, 0.70)",
                        pointBackgroundColor: "rgba(3, 88, 106, 0.70)",
                        pointHoverBackgroundColor: "#fff",
                        pointHoverBorderColor: "rgba(151,187,205,1)",
                        pointBorderWidth: 1,
                        data: [82, 23, 66, 9, 99, 4, 2]
                    }]
                }
            })
        }
        if ($("#mybarChart").length) {
            var f = document.getElementById("mybarChart");
            new Chart(f, {
                type: "bar",
                data: {
                    labels: ["January", "February", "March", "April", "May", "June", "July"],
                    datasets: [{
                        label: "# of Votes",
                        backgroundColor: "#26B99A",
                        data: [51, 30, 40, 28, 92, 50, 45]
                    }, {
                        label: "# of Votes",
                        backgroundColor: "#03586A",
                        data: [41, 56, 25, 48, 72, 34, 12]
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: !0
                            }
                        }]
                    }
                }
            })
        }
        if ($("#canvasDoughnut").length) {
            var f = document.getElementById("canvasDoughnut"),
                i = {
                    labels: ["Dark Grey", "Purple Color", "Gray Color", "Green Color", "Blue Color"],
                    datasets: [{
                        data: [120, 50, 140, 180, 100],
                        backgroundColor: ["#455C73", "#9B59B6", "#BDC3C7", "#26B99A", "#3498DB"],
                        hoverBackgroundColor: ["#34495E", "#B370CF", "#CFD4D8", "#36CAAB", "#49A9EA"]
                    }]
                };
            new Chart(f, {
                type: "doughnut",
                tooltipFillColor: "rgba(51, 51, 51, 0.55)",
                data: i
            })
        }
        if ($("#canvasRadar").length) {
            var f = document.getElementById("canvasRadar"),
                i = {
                    labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
                    datasets: [{
                        label: "My First dataset",
                        backgroundColor: "rgba(3, 88, 106, 0.2)",
                        borderColor: "rgba(3, 88, 106, 0.80)",
                        pointBorderColor: "rgba(3, 88, 106, 0.80)",
                        pointBackgroundColor: "rgba(3, 88, 106, 0.80)",
                        pointHoverBackgroundColor: "#fff",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        data: [65, 59, 90, 81, 56, 55, 40]
                    }, {
                        label: "My Second dataset",
                        backgroundColor: "rgba(38, 185, 154, 0.2)",
                        borderColor: "rgba(38, 185, 154, 0.85)",
                        pointColor: "rgba(38, 185, 154, 0.85)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(151,187,205,1)",
                        data: [28, 48, 40, 19, 96, 27, 100]
                    }]
                };
            new Chart(f, {
                type: "radar",
                data: i
            })
        }
        if ($("#pieChart").length) {
            var f = document.getElementById("pieChart"),
                i = {
                    datasets: [{
                        data: [120, 50, 140, 180, 100],
                        backgroundColor: ["#455C73", "#9B59B6", "#BDC3C7", "#26B99A", "#3498DB"],
                        label: "My dataset"
                    }],
                    labels: ["Dark Gray", "Purple", "Gray", "Green", "Blue"]
                };
            new Chart(f, {
                data: i,
                type: "pie",
                otpions: {
                    legend: !1
                }
            })
        }
        if ($("#polarArea").length) {
            var f = document.getElementById("polarArea"),
                i = {
                    datasets: [{
                        data: [120, 50, 140, 180, 100],
                        backgroundColor: ["#455C73", "#9B59B6", "#BDC3C7", "#26B99A", "#3498DB"],
                        label: "My dataset"
                    }],
                    labels: ["Dark Gray", "Purple", "Gray", "Green", "Blue"]
                };
            new Chart(f, {
                data: i,
                type: "polarArea",
                options: {
                    scale: {
                        ticks: {
                            beginAtZero: !0
                        }
                    }
                }
            })
        }
    }
}

function DP001changeFUNC(){
	var ESCOLHA = $('#equip001').val();

	switch (ESCOLHA) {
		case 'dec024a':
		case 'dec024b':
		case 'dec024c':
		case 'dec025a':
		case 'dec025b':
		case 'dec025c':		
		case 'decpta':
			document.getElementById("datapoint001").options.length=0	//Limpar DIV DATAPOINT001 completamente
			document.getElementById("datapoint001").options[0]=new Option("Video Status", "VIDSTATUS", false, false);
			document.getElementById("datapoint001").options[1]=new Option("Temperature Level", "TEMPLVL", false, false);
			document.getElementById("datapoint001").options[2]=new Option("Audio 1 Status", "AUD1STATUS", false, false);
			document.getElementById("datapoint001").options[3]=new Option("Audio 2 Status", "AUD1STATUS", false, false);
			document.getElementById("datapoint001").options[4]=new Option("Audio 3 Status", "AUD3STATUS", false, false);
			document.getElementById("datapoint001").options[5]=new Option("Audio 4 Status", "AUD4STATUS", false, false);
			document.getElementById("datapoint001").options[6]=new Option("TS Input Status", "TSSTATUS", false, false);
			document.getElementById("datapoint001").options[7]=new Option("Video Buffer", "VIDBUFF", false, false);
			document.getElementById("datapoint001").options[8]=new Option("FAN 1 Status", "FAN1STATUS", false, false);
			document.getElementById("datapoint001").options[9]=new Option("FAN 2 Status", "FAN2STATUS", false, false);
			document.getElementById("datapoint001").options[10]=new Option("FAN 3 Status", "FAN3STATUS", false, false);
			document.getElementById("datapoint001").options[11]=new Option("FAN 4 Status", "FAN4STATUS", false, false);
			break;				
		case 'dec026a':
		case 'dec026b':
		case 'dec026c':
			document.getElementById("datapoint001").options.length=0	//Limpar DIV DATAPOINT001 completamente
			document.getElementById("datapoint001").options[0]=new Option("Video Status", "VIDSTATUS", false, false);
			document.getElementById("datapoint001").options[1]=new Option("Temperature Level", "TEMPLVL", false, false);
			document.getElementById("datapoint001").options[2]=new Option("Audio 1 Status", "AUD1STATUS", false, false);
			document.getElementById("datapoint001").options[3]=new Option("Audio 2 Status", "AUD1STATUS", false, false);
			document.getElementById("datapoint001").options[4]=new Option("Audio 3 Status", "AUD3STATUS", false, false);
			document.getElementById("datapoint001").options[5]=new Option("Audio 4 Status", "AUD4STATUS", false, false);
			document.getElementById("datapoint001").options[6]=new Option("TS Input Status", "TSSTATUS", false, false);
			document.getElementById("datapoint001").options[7]=new Option("Video Buffer", "VIDBUFF", false, false);
			break;
		case 'enc01':
		case 'enc02':
			document.getElementById("datapoint001").options.length=0	//Limpar DIV DATAPOINT001 completamente
			document.getElementById("datapoint001").options[0]=new Option("Video Status", "VIDSTATUS", false, false);
			document.getElementById("datapoint001").options[1]=new Option("Temperature Level", "TEMPLVL", false, false);
			document.getElementById("datapoint001").options[2]=new Option("Audio 1 Status", "AUD1STATUS", false, false);
			document.getElementById("datapoint001").options[3]=new Option("Audio 2 Status", "AUD1STATUS", false, false);
			document.getElementById("datapoint001").options[4]=new Option("Audio 3 Status", "AUD3STATUS", false, false);
			document.getElementById("datapoint001").options[5]=new Option("Audio 4 Status", "AUD4STATUS", false, false);
			document.getElementById("datapoint001").options[6]=new Option("TS Input Status", "TSSTATUS", false, false);
			document.getElementById("datapoint001").options[7]=new Option("FAN 1 Status", "FAN1STATUS", false, false);
			document.getElementById("datapoint001").options[8]=new Option("FAN 2 Status", "FAN2STATUS", false, false);
			document.getElementById("datapoint001").options[9]=new Option("FAN 3 Status", "FAN3STATUS", false, false);
			document.getElementById("datapoint001").options[10]=new Option("FAN 4 Status", "FAN4STATUS", false, false);
			document.getElementById("datapoint001").options[11]=new Option("FAN 5 Status", "FAN5STATUS", false, false);
			document.getElementById("datapoint001").options[12]=new Option("FAN 6 Status", "FAN6STATUS", false, false);
			document.getElementById("datapoint001").options[13]=new Option("FAN 7 Status", "FAN7STATUS", false, false);
			document.getElementById("datapoint001").options[14]=new Option("FAN 8 Status", "FAN8STATUS", false, false);
			document.getElementById("datapoint001").options[15]=new Option("PSU Status", "PSUSTATUS", false, false);
			break;			
		case 'irdber':
		case 'irdpta':
		case 'irdupk':	
			document.getElementById("datapoint001").options.length=0	//Limpar DIV DATAPOINT001 completamente
			document.getElementById("datapoint001").options[0]=new Option("Video Status", "VIDSTATUS", false, false);
			document.getElementById("datapoint001").options[1]=new Option("Temperature Level", "TEMPLVL", false, false);
			document.getElementById("datapoint001").options[2]=new Option("Audio 1 Status", "AUD1STATUS", false, false);			
			document.getElementById("datapoint001").options[3]=new Option("Audio 2 Status", "AUD2STATUS", false, false);
			document.getElementById("datapoint001").options[4]=new Option("Audio 3 Status", "AUD3STATUS", false, false);
			document.getElementById("datapoint001").options[5]=new Option("Audio 4 Status", "AUD4STATUS", false, false);
			document.getElementById("datapoint001").options[6]=new Option("TS Input Status", "TSSTATUS", false, false);
			document.getElementById("datapoint001").options[7]=new Option("Video Buffer", "VIDBUFF", false, false);
			document.getElementById("datapoint001").options[8]=new Option("C/N", "CN", false, false);
			document.getElementById("datapoint001").options[9]=new Option("Margin", "MARGIN", false, false);
			document.getElementById("datapoint001").options[10]=new Option("Signal Level", "SIGLVL", false, false);
			document.getElementById("datapoint001").options[11]=new Option("FAN 1 Status", "FAN1STATUS", false, false);
			document.getElementById("datapoint001").options[12]=new Option("FAN 2 Status", "FAN2STATUS", false, false);
			document.getElementById("datapoint001").options[13]=new Option("FAN 3 Status", "FAN3STATUS", false, false);
			document.getElementById("datapoint001").options[14]=new Option("FAN 4 Status", "FAN4STATUS", false, false);
			break;
		case 'mod01':
		case 'mod02':
			document.getElementById("datapoint001").options.length=0	//Limpar DIV DATAPOINT001 completamente
			document.getElementById("datapoint001").options[0]=new Option("RF Output Power (W)", "OPLVL", false, false);
			document.getElementById("datapoint001").options[1]=new Option("Bit Rate", "BITRATE", false, false);
			document.getElementById("datapoint001").options[2]=new Option("ASI Status", "ASISTATUS", false, false);
			document.getElementById("datapoint001").options[3]=new Option("TS Status", "TSSTATUS", false, false);
			document.getElementById("datapoint001").options[4]=new Option("Temperature Level", "TEMPLVL", false, false);
			document.getElementById("datapoint001").options[5]=new Option("PSU Voltage", "PSUVOLTAGE", false, false);
			break;
		case 'mod03':
			document.getElementById("datapoint001").options.length=0	//Limpar DIV DATAPOINT001 completamente
			document.getElementById("datapoint001").options[0]=new Option("IF Carrier", "IFC", false, false);
			document.getElementById("datapoint001").options[1]=new Option("RF Output Power (W)", "OPLVL", false, false);											
			break;
		case 'uc01':
		case 'uc02':
			document.getElementById("datapoint001").options.length=0	//Limpar DIV DATAPOINT001 completamente
			document.getElementById("datapoint001").options[0]=new Option("PSU Status", "PSUSTATUS", false, false);
			document.getElementById("datapoint001").options[1]=new Option("Temperature Level", "TEMPLVL", false, false);
			document.getElementById("datapoint001").options[2]=new Option("IF Input Status", "IFINSTATUS", false, false);
			document.getElementById("datapoint001").options[3]=new Option("RF Output Status", "RFOUTSTATUS", false, false);
			break;
		default:
			break; //faca nada
	}
	return 0;
}

function updateEquipmentList() {
	var selected = $('#system').val();

	switch (selected) {
		case '3': // REFERÊNCIA
			deleteIfExists('addButton');
			deleteIfExists('equipment');
			deleteIfExists('equipmentLabel');
			addLabelElement("form-dynamic", "label", "equipmentLabel", '<span class="glyphicon glyphicon-hdd"></span> Equipamento', "equipment");
			addEquipmentElement("form-dynamic", "select", "equipment", "updateInfoList()");
			addPlusButton();
			document.getElementById("equipment").options.length=0	//Limpar DIV equipment completamente
			document.getElementById("equipment").options[0]=new Option("PG 01 (TEKTRONIX)", "pg01", false, false);
			document.getElementById("equipment").options[1]=new Option("PG 02 (TEKTRONIX)", "pg02", false, false);
			document.getElementById("equipment").options[2]=new Option("CHO 01 (TEKTRONIX)", "cho01", false, false);
			document.getElementById("equipment").options[3]=new Option("SPC 01 (SPECTRACOM)", "spc01", false, false);
			document.getElementById("equipment").options[4]=new Option("SPC 02 (SPECTRACOM)", "spc02", false, false);
			document.getElementById("equipment").options[5]=new Option("SPCHO 01 (SPECTRACOM)", "spcho01", false, false);
			updateInfoList();

			break;
		default:
			deleteIfExists('addButton');
			deleteIfExists('equipment');
			deleteIfExists('equipmentLabel');
			addPlusButton();

			break;
	}
}

function deleteIfExists(id) {
	var temp = document.getElementById(id);
	if (typeof(temp) != 'undefined' && temp != null) {
		temp.remove();
	}
}

function updateInfoList() {
	var selected = document.getElementById('equipment').value;
	var sel = document.getElementById('equipment');
	var button = document.getElementById('addButton');
	//button.setAttribute('onclick', 'addChart('+$('#system').val()+', '+selected+')');
	button.setAttribute('onclick', 'addChart('+$('#system').val()+', "'+selected+'", "'+sel.options[sel.selectedIndex].text+'")');
}

function addLabelElement(parentId, elementTag, elementId, html, to) {
	var p = document.getElementById(parentId);
	var newElement = document.createElement(elementTag);
	newElement.setAttribute('id', elementId);
	newElement.setAttribute('for', to);
	newElement.innerHTML = html;
	p.appendChild(newElement);
}

function addInfoElement(parentId, elementTag, elementId) {
	var p = document.getElementById(parentId);
	var newElement = document.createElement(elementTag);
	newElement.setAttribute('id', elementId);
	newElement.setAttribute('class', "form-control");
	p.appendChild(newElement);
}

function addEquipmentElement(parentId, elementTag, elementId, onChange) {
	var p = document.getElementById(parentId);
	var newElement = document.createElement(elementTag);
	newElement.setAttribute('id', elementId);
	newElement.setAttribute('onchange', onChange);
	newElement.setAttribute('class', "form-control");
	p.appendChild(newElement);
}

function search(exchange) {	
	/*abscissa = new Array();
	abscissaTEMP = new Array();
	coordenada = new Array();
	coordenadaTEMP = new Array();*/
	//tsSTART = (Date.now()-86400000);
	tsSTART = (Date.now()-3600000);
	//tsSTART = (Date.now()-100);
	tsEND = Date.now();
	//console.log("TIME: "+(tsEND-tsSTART)/1000);
	NProgress.configure({ parent: '#canvas0'});


	var p = document.getElementById("canvas0");
	if (p) {
		p.innerHTML = '<canvas id="chart0"></canvas>';
	}
	

	//console.log('Start Time: '+tsSTART);
	//console.log('End Time: '+tsEND);

	var address = '/test/tools/searchcharts.php?tsstart='+(tsSTART.toString())+'&tsend='+(tsEND.toString())+'&db=oynp0ahrktjwwzaz&dbtab='+exchange+'&tabtime='+exchange+'TIME&dbparam01='+exchange+'USDT_BTClast';

	console.log(address);

	var eventSource = new EventSource(address);

	eventSource.addEventListener('open', function(e) { // A cada HTTP Request
		$("#dbmessage").text("");
	}, false);

	eventSource.addEventListener('error', function(e) {
		if (e.eventPhase == 2) { // EventSource.CLOSED
			if (searcher = 'DONE') {
				$("#dbmessage").text("Client info - Loading...");
				// Cliente fecha a conexao, evitando repeticoes
				eventSource.close();
			} else {
				$("#dbmessage").text("Client info - Conexao Interrompida.");
				// Cliente fecha a conexao, evitando repeticoes
				eventSource.close();
			}
		}
	}, false);

	eventSource.addEventListener('REP_CRYPTODB_FAIL', function(e) {
		$("#dbmessage").text(e.data);
		console.log(e.data);
	}, false);

	eventSource.addEventListener('REP_CRYPTODB', function(e) {
		NProgress.set(i*1000/(tsEND-tsSTART));
		i++;
		draw(e.data);
	}, false);

	
	
	
}

function hiddenGraph(id) {
	var el = document.getElementById('hidden'+id);
	if (el.className == 'fa fa-chevron-up') {
		var graph = document.getElementById('chart'+id);
		var canvas = document.getElementById('canvas'+id);
		if (graph != null && canvas != null) {
			lastHeight[id] = graph.getAttribute('height');
			canvas.style.height='0px';
			graph.style.height='0px';
		}
		el.className = 'fa fa-chevron-down';
	} else if (el.className == 'fa fa-chevron-down') {
		var graph = document.getElementById('chart'+id);
		var canvas = document.getElementById('canvas'+id);
		if (graph != null && canvas != null) {
			graph.style.height=lastHeight[id]+'px';
			canvas.style.height=lastHeight[id]+'px';
		}
		el.className = 'fa fa-chevron-up';
	}
}

function resizeChart(id, mode) {
	switch(mode) {
		case 'single':
			var graphArea = document.getElementById('class'+id);
			graphArea.className = 'col-md12 col-sm-12 col-xs-12';

			break;
		case 'dual':
			var graphArea = document.getElementById('class'+id);
			graphArea.className = 'col-md6 col-sm-6 col-xs-6';

			break;
	}
}

function addChart (system, equipment, equipmentLabel) {
	switch(system) {
		case 2: // MAUÁ
			vectorDatabase[vectorDatabase.length] = "mauadb";
			equipmentLabel = 'MAUÁ';
			optionsHTML = '\
				<option value="0" selected="">Selecione o dado...</option>\
				<option value="gps01RSTATUS">GPS Right Module Status</option>\
				<option value="gps01RNSAT">GPS Right Module Locked Satellites</option>\
				<option value="gps01LSFTATUS">GPS Left Module Status</option>\
				<option value="gps01LNSAT">GPS Left Module Locked Satellites</option>';

			break;
		case 3: // REFERÊNCIAS
			switch(equipment) {
				case'pg01':
				case'pg02':
					vectorDatabase[vectorDatabase.length] = "dtvspdb";
					optionsHTML = '\
						<option value="0" selected="">Selecione o dado...</option>\
						<option value="'+equipment+'EXTREF">External GPS Status</option>\
						<option value="'+equipment+'TIMESTATUS">Time Source Selected</option>\
						<option value="'+equipment+'FAULT">Fault Status</option>\
						<option value="'+equipment+'MBTMP">Main Board Temperature</option>\
						<option value="'+equipment+'MBTMPSTATUS">Main Board Temperature Status</option>\
						<option value="'+equipment+'CPUTMP">CPU Temperature</option>\
						<option value="'+equipment+'CPUTMPSTATUS">CPU Temperature Status</option>\
						<option value="'+equipment+'MAINFAN">Main Fan RPM</option>\
						<option value="'+equipment+'MAINFANSTATUS">Main Fan Status</option>\
						<option value="'+equipment+'PS1FAN">PS1 Fan RPM</option>\
						<option value="'+equipment+'PS1FANSTATUS">PS1 Fan Status</option>\
						<option value="'+equipment+'PS2FAN">PS2 Fan RPM</option>\
						<option value="'+equipment+'PS2FANSTATUS">PS2 Fan Status</option>\
						<option value="'+equipment+'PS1STATUS">PS1 Status</option>\
						<option value="'+equipment+'PS2STATUS">PS2 Status</option>';
					break;
				case'cho01':
					vectorDatabase[vectorDatabase.length] = "dtvspdb";
					optionsHTML = '\
						<option value="0" selected="">Selecione o dado...</option>\
						<option value="'+equipment+'MBTMP">Main Board Temperature</option>\
						<option value="'+equipment+'MBTMPSTATUS">Main Board Temperature Status</option>\
						<option value="'+equipment+'PS1TMP">PS1 Temperature</option>\
						<option value="'+equipment+'PS1TMPSTATUS">PS1 Temperature Status</option>\
						<option value="'+equipment+'PS2TMP">PS2 Temperature</option>\
						<option value="'+equipment+'PS2TMPSTATUS">PS2 Temperature Status</option>\
						<option value="'+equipment+'BATSTATUS">Battery Status</option>\
						<option value="'+equipment+'PS1FANSTATUS">PS1 Fan Status</option>\
						<option value="'+equipment+'PS2FANSTATUS">PS2 Fan Status</option>\
						<option value="'+equipment+'PS1STATUS">PS1 Status</option>\
						<option value="'+equipment+'PS2STATUS">PS2 Status</option>\
						<option value="'+equipment+'OPERMODE">Operation Mode</option>\
						<option value="'+equipment+'SELSOURCE">Selected Source</option>\
						<option value="'+equipment+'AC1STATUS">AC1 Status</option>\
						<option value="'+equipment+'DC1STATUS">DC1 Status</option>\
						<option value="'+equipment+'AC2STATUS">AC2 Status</option>\
						<option value="'+equipment+'DC2STATUS">DC2 Status</option>\
						<option value="'+equipment+'FAULT">Fault Status</option>\
						<option value="'+equipment+'PRIM1STATUS">Primary 1 Status</option>\
						<option value="'+equipment+'PRIM2STATUS">Primary 2 Status</option>\
						<option value="'+equipment+'BKP1STATUS">Backup 1 Status</option>\
						<option value="'+equipment+'BKP2STATUS">Backup 2 Status</option1>';
					break;
				case'spc01':
				case'spc02':
					vectorDatabase[vectorDatabase.length] = "dtvspdb";
					optionsHTML = '\
						<option value="0" selected="">Selecione o dado...</option>\
						<option value="'+equipment+'HWSTATUS">Hardware Status</option>\
						<option value="'+equipment+'SYNCSOURCE">Sync Source</option>\
						<option value="'+equipment+'PPSOUTSTATUS">1PPS Out Status</option>\
						<option value="'+equipment+'10MOUTSTATUS">10MHz Out Status</option>\
						<option value="'+equipment+'FREQ">Frequency Accuracy</option>\
						<option value="'+equipment+'PHASE">Phase Accuracy</option>\
						<option value="'+equipment+'HOLD">Holdover</option>\
						<option value="'+equipment+'DCPWR">DC Power Status</option>\
						<option value="'+equipment+'ACPWR">AC Power Status</option>\
						<option value="'+equipment+'INTPPS">Internal 1PPS Status</option>\
						<option value="'+equipment+'INTOSC">Internal Oscillator Status</option>\
						<option value="'+equipment+'LOCKSTATUS">GPS Locked Status</option>\
						<option value="'+equipment+'NSAT">GPS Number of Satellites</option>\
						<option value="'+equipment+'ANTSTATUS">GPS Antenna Status</option>';
					break;
			}

			break;
		case 4: // TX IPL ROHDE
			vectorDatabase[vectorDatabase.length] = "txiplmaindb";
			equipmentLabel = 'TX IPL ROHDE';
			optionsHTML = '\
				<option value="0" selected="">Selecione o dado...</option>\
				<option value="mainSUMSTATUS">TX Status</option>\
				<option value="mainPFWD">Potência Direta</option>\
				<option value="mainPRFD">Potência Refletida</option>\
				<option value="mainMERA">MER Exciter A</option>\
				<option value="mainEXCASUM">Exciter A Status</option>\
				<option value="mainEXCAON">Exciter A EM USO</option>\
				<option value="mainBTSIN1A">Exciter A BTS 1</option>\
				<option value="mainBTSIN2A">Exciter A BTS 2</option>\
				<option value="mainSEAMLESSA">Exciter A Seamless</option>\
				<option value="mainACTTSA">Exciter A BTS EM USO</option>\
				<option value="mainEXTREFA">Exciter A External 10 MHz</option>\
				<option value="mainEXTPPSA">Exciter A External 1PPS</option>\
				<option value="mainINTGPSA">Exciter A Internal GPS</option>\
				<option value="mainINTGPSAANT">Exciter A Internal GPS Antena</option>\
				<option value="mainINTGPSASATV">Exciter A Internal GPS Satélites Visíveis</option>\
				<option value="mainINTGPSASATU">Exciter A Internal GPS Satélites Em Uso</option>\
				<option value="mainCURREFA">Exciter A Referência Utilizada</option>\
				<option value="mainMERB">MER Exciter B</option>\
				<option value="mainEXCBSUM">Exciter B Status</option>\
				<option value="mainEXCBON">Exciter B EM USO</option>\
				<option value="mainBTSIN1B">Exciter B BTS 1</option>\
				<option value="mainBTSIN2B">Exciter B BTS 2</option>\
				<option value="mainSEAMLESSB">Exciter B Seamless</option>\
				<option value="mainACTTSB">Exciter B BTS EM USO</option>\
				<option value="mainEXTREFB">Exciter B External 10 MHz</option>\
				<option value="mainEXTPPSB">Exciter B External 1PPS</option>\
				<option value="mainINTGPSB">Exciter B Internal GPS</option>\
				<option value="mainINTGPSBANT">Exciter B Internal GPS Antena</option>\
				<option value="mainINTGPSBSATV">Exciter B Internal GPS Satélites Visíveis</option>\
				<option value="mainINTGPSBSATU">Exciter B Internal GPS Satélites Em Uso</option>\
				<option value="mainCURREFB">Exciter B Referência Utilizada</option>';
			break;
		default:
			optionsHTML = '';
			break;
	}

	headerHTML = '\
		<div class="x_panel">\
			<div class="x_title">\
				<h2 style="width: 24%">'+equipmentLabel+'</h2>\
				<select class="dataSelect" id="dataSelect'+graphObjects+'">';

	footerHTML = '\
			</select>\
			<button class="searchButton" id="searchButton" onclick="search('+graphObjects+', \''+equipment+'\')">Buscar</button>\
			<ul class="nav navbar-right panel_toolbox">\
				<li><a class="collapse-link"><i id="hidden'+graphObjects+'" class="fa fa-chevron-up" onclick="hiddenGraph('+graphObjects+')"></i></a>\
				</li>\
				<li class="dropdown">\
					<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i class="fa fa-wrench"></i></a>\
					<ul id="ic-box" class="dropdown-menu" role="menu">\
						<li style="font-weight: bold;text-align: center;">Layout</li>\
						<div id="ic-list-single" onclick="resizeChart('+graphObjects+',\'single\')"></div>\
						<div id="ic-list-dual" onclick="resizeChart('+graphObjects+',\'dual\')"></div>\
					</ul>\
				</li>\
				<li><a class="close-link"><i class="fa fa-close" onclick="document.getElementById(\'class'+graphObjects+'\').remove();"></i></a>\
				</li>\
			</ul>  \
			<div id="divDateRange">         \
					<div id="reportRangeFrom">\
						De:\
						<input class="inputDatetimeFrom" id="inputDatetimeFrom'+graphObjects+'" type="text" name="datetimes'+graphObjects+'">\
					</div>\
					<div id="reportRangeTo">\
						Até:\
						<input class="inputDatetimeTo" id="inputDatetimeTo'+graphObjects+'" type="text" name="datetimestwo'+graphObjects+'">\
					</div>\
			</div>\
			<!--<div id="divFilter" class="filter">\
				<div id="reportrange" class="pull-right" style="background: #fff; cursor: pointer; padding: 5px 10px; border: 1px solid #ccc">\
				<i class="glyphicon glyphicon-calendar fa fa-calendar"></i>\
				<span>March 20, 2019 - April 18, 2019</span> <b class="caret"></b>\
				</div>\
			</div>-->\
			<div class="clearfix"></div>\
		</div>\
		<div class="x_content" id="canvas'+graphObjects+'">\
			<canvas id="chart'+graphObjects+'"></canvas>\
		</div>\
		<div class="legend" id="dataLegend">\
		</div>\
		</div>';

	var row = document.getElementById("row-1"); // UPDATE
	var divClass = document.createElement("div");
	divClass.setAttribute('class', 'col-md12 col-sm-12 col-xs-12');
	//divClass.setAttribute('class', 'col-md6 col-sm-6 col-xs-6');
	divClass.setAttribute('id', 'class'+graphObjects);
	divClass.innerHTML = headerHTML + optionsHTML + footerHTML;

	row.appendChild(divClass);

	updateDateChart(graphObjects, system);
	graphObjects+=1;

	abscissa = new Array();
	abscissaTEMP = new Array();
	coordenada = new Array();
}

function addPlusButton() {
	var div = document.getElementById("form-dynamic");
	var button = document.createElement("button");
	button.setAttribute('id','addButton');
	button.setAttribute('data-dismiss','modal');
	button.setAttribute('class','btn btn-default btn-success pull-right');	
	button.setAttribute('onclick', 'addChart('+$('#system').val()+', null, null)');	
	button.innerHTML = '<span class="glyphicon glyphicon-plus"></span> Adicionar';
	div.appendChild(button);	
}

// Create Modal for Chart Insertion
function createFormModal () {
	var p = document.getElementById("modal-body");
	p.innerHTML = '						\
	<form role="form" id="form-modal">\
		<div class="form-group" id="form-dynamic">\
			<label for="system"><span class="glyphicon glyphicon-globe"></span> Sistema</label>\
			<select class="form-control" id="system" onchange="updateEquipmentList()">\
				<option value="0" selected="">Selecione...</option>\
				<!--<option value="1">SAT SP</option>-->\
				<option value="2">MAUÁ</option>\
				<option value="3">REFERÊNCIAS</option>\
				<option value="4">TX IPL ROHDE</option>\
			</select>\
		</div>\
	</form>';
}

function updateDateChart(datetimes, system) {
	var daysDb;
	if (system == 4) { // System Date to TX IPL ROHDE
		daysDb = 30
	} else {
		daysDb = 7
	}

	$('input[name="datetimes'+datetimes+'"]').daterangepicker({
		singleDatePicker: true,
		timePicker: true,
		timePicker24Hour: true,
		timePickerSeconds: true,

		startDate: moment().startOf('hour').subtract(1, 'hour'),

		minDate: moment().subtract(daysDb, 'day'),
		maxDate: moment(),
		locale: {
			format: 'DD/MM/YYYY HH:mm:ss',
			applyLabel: "Ok",
			cancelLabel: "Cancelar",
			fromLabel: "De",
			monthNames: [
				"Janeiro",
				"Fevereiro",
				"Março",
				"Abril",
				"Maio",
				"Junho",
				"Julho",
				"Agosto",
				"Setembro",
				"Outubro",
				"Novembro",
				"Dezembro"],
			daysOfWeek: [
				"Dom",
				"Seg",
				"Ter",
				"Qua",
				"Qui",
				"Sex",
				"Sáb"]
	}
	});
	
	$('input[name="datetimestwo'+datetimes+'"]').daterangepicker({
		singleDatePicker: true,
		timePicker: true,
		timePicker24Hour: true,
		timePickerSeconds: true,

		startDate: moment().startOf('hour'),
		minDate: moment().subtract(daysDb, 'day'),
		maxDate: moment(),
		locale: {
			format: 'DD/MM/YYYY HH:mm:ss',
			applyLabel: "Ok",
			cancelLabel: "Cancelar",
			fromLabel: "De",
			monthNames: [
				"Janeiro",
				"Fevereiro",
				"Março",
				"Abril",
				"Maio",
				"Junho",
				"Julho",
				"Agosto",
				"Setembro",
				"Outubro",
				"Novembro",
				"Dezembro"],
			daysOfWeek: [
				"Dom",
				"Seg",
				"Ter",
				"Qua",
				"Qui",
				"Sex",
				"Sáb"]
		}
		});
}

function addData(chart, label, data) {
    chart.data.labels.push(label);

	chart.data.datasets[0].data.push(convertCoordinates("BTC-USDT", parseInt(data['poloniex_y'])));

	chart.data.datasets[1].data.push(convertCoordinates("BTC-USDT", parseInt(data['binance_y'])));
	

    chart.update();
}

function removeData(chart) {
    chart.data.labels.splice(0, 1);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.splice(0, 1);
    });
    chart.update();
}


function draw (data) {
	if ($("#chart0").length) {
		var graph = document.getElementById("chart0").getContext('2d');
		var valor = JSON.parse(data);
		//console.log(valor['exchange']);
		
		if (myLineChart == null) {
			abscissa.push(valor['x']*1000);					
			
		}

		if (valor['exchange'] == 'poloniex') {
			coordenada[0].push(valor['y']);
		} else if (valor['exchange'] == 'binance') {
			
			coordenada[1].push(valor['y']);
		}

		if (valor['x'] == 'FIM') {
			console.log(coordenada[0]);
			console.log(coordenada[1]);
			offset = 0;
			//Para remover as marcações FIM:FIM
			abscissa.pop();
			if (valor['exchange'] == 'poloniex') {
				coordenada[0].pop();
			} else if (valor['exchange'] == 'binance') {
				coordenada[1].pop();
			}

			//Transformar Array abscissa de string to Number
			for (var x in abscissa) {				
				abscissa[x] = parseInt((abscissa[x])); //JAVASCRIPT operando timestamp em ms. Database opera timestamp em s.
				abscissaTEMP[x] = dateFormat(new Date(abscissa[x]), "dd/mm/yyyy HH:MM:ss");
			}	
			//Transformar Array coordenada de string to Number
			if (valor['exchange'] == 'poloniex') {
				for (var y in coordenada[0]) {
					coordenada[0][y] = parseInt(coordenada[0][y]);
					coordenadaTEMP[0][y] = convertCoordinates("BTC-USDT", coordenada[0][y]);					
				}
			} else if (valor['exchange'] == 'binance') {
				for (var y in coordenada[1]) {
					coordenada[1][y] = parseInt(coordenada[1][y]);
					coordenadaTEMP[1][y] = convertCoordinates("BTC-USDT", coordenada[1][y]);					
				}
			}

			var zoom = true;
			if ((tsEND-tsSTART)/1000 > 600) {
				zoom = false;
			}

			if (myLineChart == null) {
				if (valor['exchange'] == 'poloniex') {
					console.log("herer1");
					myLineChart = new Chart(graph, {
						type: "line",
						data: {
							labels: abscissaTEMP,
							yLabels: yLabelsFill("BTC-USDT"),
							datasets: [{
								label: "Poloniex",
								fill: false,
								steppedLine: true,
								backgroundColor: "rgba(138, 185, 154, 0.31)",
								borderColor: "rgba(30, 0, 255, 1)",
								pointBorderColor: "rgba(30, 0, 255, 1)",
								pointBackgroundColor: "rgba(30, 0, 255, 1)",
								pointHoverBackgroundColor: "#fff",
								pointHoverBorderColor: "rgba(220,220,220,1)",
								pointBorderWidth: 0.5,
								data: coordenadaTEMP[0]
							}]
						},
						options: {
							tooltips: {
								mode: 'index'
							 },
							scales: {
								yAxes: [{
									type: 'linear',
									position: 'left',
									display: true,
									scaleLabel: {
										display: true,
										labelString: "BTC_USDT"
									},
									ticks: {
										reverse: false
									}
								}]
							},
					
							// Container for zoom options
							zoom: {
								// Boolean to enable zooming
								enabled: zoom,		
								drag: false,				
								// Zooming directions. Remove the appropriate direction to disable 
								// Eg. 'y' would only allow zooming in the y direction
								mode: 'x',
								sensitivity: 0.01,
								speed: 100
							}
						}
						
					});
				} else if (valor['exchange'] == 'binance') {
					console.log("herer4");
					myLineChart = new Chart(graph, {
						type: "line",
						data: {
							labels: abscissaTEMP,
							yLabels: yLabelsFill("BTC-USDT"),
							datasets: [{
								label: "Binance",
								fill: false,
								steppedLine: true,
								backgroundColor: "rgba(38, 185, 154, 0.31)",
								borderColor: "rgba(38, 185, 154, 0.7)",
								pointBorderColor: "rgba(38, 185, 154, 0.7)",
								pointBackgroundColor: "rgba(38, 185, 154, 0.7)",
								pointHoverBackgroundColor: "#fff",
								pointHoverBorderColor: "rgba(220,220,220,1)",
								pointBorderWidth: 0.5,
								data: coordenadaTEMP[1]
							}]
						},
						options: {
							tooltips: {
								mode: 'index'
							 },
							scales: {
								yAxes: [{
									type: 'linear',
									position: 'left',
									display: true,
									scaleLabel: {
										display: true,
										labelString: "BTC_USDT"
									},
									ticks: {
										reverse: false
									}
								}]
							},
					
							// Container for zoom options
							zoom: {
								// Boolean to enable zooming
								enabled: zoom,		
								drag: false,				
								// Zooming directions. Remove the appropriate direction to disable 
								// Eg. 'y' would only allow zooming in the y direction
								mode: 'x',
								sensitivity: 0.01,
								speed: 100
							}
						}
						
					});
				}
				
			} else {
				
				if (valor['exchange'] == 'poloniex') {
					console.log("herer");
					myLineChart.data.datasets.push({
						label: "Poloniex",
						fill: false,
						steppedLine: true,
						backgroundColor: "rgba(138, 185, 154, 0.31)",
						borderColor: "rgba(30, 0, 255, 1)",
						pointBorderColor: "rgba(30, 0, 255, 1)",
						pointBackgroundColor: "rgba(30, 0, 255, 1)",
						pointHoverBackgroundColor: "#fff",
						pointHoverBorderColor: "rgba(220,220,220,1)",
						pointBorderWidth: 0.5,
						data: coordenadaTEMP[0]
					});
				} else if (valor['exchange'] == 'binance') {
					console.log("herer2");
					myLineChart.data.datasets.push({
						label: "Binance",
						fill: false,
						steppedLine: true,
						backgroundColor: "rgba(38, 185, 154, 0.31)",
						borderColor: "rgba(38, 185, 154, 0.7)",
						pointBorderColor: "rgba(38, 185, 154, 0.7)",
						pointBackgroundColor: "rgba(38, 185, 154, 0.7)",
						pointHoverBackgroundColor: "#fff",
						pointHoverBorderColor: "rgba(220,220,220,1)",
						pointBorderWidth: 0.5,
						data: coordenadaTEMP[1]
					});
				}				
			
				
			}
			myLineChart.update();	
			NProgress.done(true);
			//var d = new Date();
			//console.log(d.toLocaleString());
			console.log("loaded");
		}
	}
}

function graphType(dataSelected) {
	switch (dataSelected) {
		case'Potência Direta':
			return Array('linear','Potência (kW)',true);
		case'Potência Refletida':
			return Array('linear','Potência (W)',true);
		case'MER Exciter A':
		case'MER Exciter B':
			return Array('linear','MER (dB)',true);
		case'Exciter A Internal GPS Satélites Visíveis':
		case'Exciter B Internal GPS Satélites Visíveis':
		case'Exciter A Internal GPS Satélites Em Uso':
		case'Exciter B Internal GPS Satélites Em Uso':
		case'GPS Right Module Locked Satellites':
		case'GPS Left Module Locked Satellites':
		case'GPS Number of Satellites':
			return Array('linear','Número de Satélites',true);
		case'Main Board Temperature':
		case'CPU Temperature':
			return Array('linear','Temperatura (°C)',true);
		case'Main Fan RPM':
		case'PS1 Fan RPM':
		case'PS2 Fan RPM':
			return Array('linear','RPM',true);
		default:
			return Array('category','Status',true);
	}
}

//Funcao yLabels fill
function yLabelsFill(dataSelected) {
	switch (dataSelected) {
		case'TX Status':
		case'Exciter A Status':
		case'Exciter B Status':
		case'Exciter A BTS 1':
		case'Exciter A BTS 2':
		case'Exciter B BTS 1':
		case'Exciter B BTS 2':
		case'Exciter A External 10 MHz':
		case'Exciter B External 10 MHz':
		case'Exciter A External 1PPS':
		case'Exciter B External 1PPS':
		case'Exciter A Internal GPS':
		case'Exciter B Internal GPS':
			return ['Fault','Off','Ok','Undefined','Warning'];
		case'Exciter A EM USO':
		case'Exciter B EM USO':
			return ['Em Uso','Stand By'];
		case'Exciter A Seamless':
		case'Exciter B Seamless':
			return ['Possible','Not Possible'];
		case'Exciter A BTS EM USO':
		case'Exciter B BTS EM USO':
			return ['BTS 1',' BTS 2'];
		case'Exciter A Referência Utilizada':
		case'Exciter B Referência Utilizada':
			return ['Manual','External 5MHz','External 10MHz','External 1PPS','Internal GPS'];
		case'Exciter A Internal GPS Antena':
		case'Exciter B Internal GPS Antena':
			return ['Undefined','Initializing','Don\'t Know','Ok','Short','Open','Not Monitored'];
		case'GPS Right Module Status':
		case'GPS Left Module Status':
			return ['Alarm','Ok','Warning','Disabled'];
		case'External GPS Status':
			return ['External Ref OK', 'External Ref Fail'];
		case'Time Source Selected':
			return ['GPS', 'Internal', 'GPS Fault'];
		case'Fault Status':
		case'Main Fan Status':
		case'PS1 Fan Status':
		case'PS2 Fan Status':
		case'PS1 Status':
		case'PS2 Status':
		case'AC1 Status':
		case'AC2 Status':
		case'DC1 Status':
		case'DC2 Status':
		case'Battery Status':
			return ['OK', 'Alarm'];
		case'Main Board Temperature Status':
		case'CPU Temperature Status':
		case'Main Fan Status':
		case'PS1 Temperature Status':
		case'PS2 Temperature Status':
			return ['OK', 'High Temp'];
		case'Operation Mode':
			return ['Auto', 'Manual'];
		case'Selected Source':
			return ['Primary', 'Backup'];
		case'Primary 1 Status':
		case'Primary 2 Status':
		case'Backup 1 Status':
		case'Backup 2 Status':
			return ['Channel No Errors', 'Channel Error Detected', 'Channel Error', 'Channel Off'];
		case'Hardware Status':
			return['Alarm', 'Ok', 'Warning'];
		case'Sync Source':
			return['None', 'GNSS Source', 'External 1PPS'];
		case'1PPS Out Status':
		case'10MHz Out Status':
			return['Ok', 'Alarm', 'Squelched', 'Disabled'];
		case'Frequency Accuracy':
		case'Phase Accuracy':
		case'DC Power Status':
		case'AC Power Status':
		case'Internal 1PPS Status':
		case'Internal Oscillator Status':
			return['Alarm', 'Ok'];
		case'Holdover':
			return['Warming Up', 'Tracking Search', 'Locked', 'Holdover', 'Forced Holdover'];
		case'GPS Locked Status':
			return['GNSS Source Not Locked', 'GNSS Source Locked'];
		case'GPS Antenna Status':
			return['GNSS Antenna Ok', 'GNSS Antenna Shorted', 'No GNSS Antenna'];
		default:
			return coordenada;
	}
}

function convertCoordinates(dataSelected, coordinate) {
	switch (dataSelected) {
		case'TX Status':
		case'Exciter A Status':
		case'Exciter B Status':
		case'Exciter A BTS 1':
		case'Exciter A BTS 2':
		case'Exciter B BTS 1':
		case'Exciter B BTS 2':
		case'Exciter A External 10 MHz':
		case'Exciter B External 10 MHz':
		case'Exciter A External 1PPS':
		case'Exciter B External 1PPS':
		case'Exciter A Internal GPS':
		case'Exciter B Internal GPS':
			if (coordinate == 1) return 'Undefined';
			if (coordinate == 2) return 'Off';
			if (coordinate == 3) return 'Fault';
			if (coordinate == 4) return 'Warning';
			if (coordinate == 5) return 'Ok';
			break;
		case'Potência Direta':
			return parseFloat(coordinate/1000000);
		case'Potência Refletida':
			return parseFloat(coordinate/1000);
		case'MER Exciter A':
		case'MER Exciter B':
			return parseFloat(coordinate/10);
		case'Exciter A EM USO':
		case'Exciter B EM USO':
			if (coordinate == 1) return 'Em Uso';
			if (coordinate == 2) return 'Stand By';
			break;
		case'Exciter A Seamless':
		case'Exciter B Seamless':
			if (coordinate == 1) return 'Possible';
			if (coordinate == 2) return 'Not Possible';
			break;
		case'Exciter A BTS EM USO':
		case'Exciter B BTS EM USO':
			if (coordinate == 2) return 'BTS 1';
			if (coordinate == 3) return 'BTS 2';
			break;
		case'Exciter A Referência Utilizada':
		case'Exciter B Referência Utilizada':
			if (coordinate == 1) return 'Manual';
			if (coordinate == 2) return 'External 5MHz';
			if (coordinate == 3) return 'External 10MHz';
			if (coordinate == 4) return 'External 1PPS';
			if (coordinate == 5) return 'Internal GPS';
			break;
		case'Exciter A Internal GPS Antena':
		case'Exciter B Internal GPS Antena':
			if (coordinate == 1) return 'Undefined';
			if (coordinate == 2) return 'Initializing';
			if (coordinate == 3) return 'Don\'t Know';
			if (coordinate == 4) return 'Ok';
			if (coordinate == 5) return 'Short';
			if (coordinate == 6) return 'Open';
			if (coordinate == 7) return 'Not Monitored';
			break;
		case'GPS Right Module Status':
		case'GPS Left Module Status':
			if (coordinate == 0) return 'Alarm';
			if (coordinate == 1) return 'Ok';
			if (coordinate == 2) return 'Warning';
			if (coordinate == 3) return 'Disabled';
			break;
		case'External GPS Status':
			if (coordinate == 0) return 'External Ref OK';
			if (coordinate == 1) return 'External Ref Fail';
			break;
		case'Time Source Selected':
			if (coordinate == 0) return 'GPS';
			if (coordinate == 1) return 'Internal';
			if (coordinate == 2) return 'GPS Fault';
			break;
		case'Fault Status':
		case'Main Fan Status':
		case'PS1 Fan Status':
		case'PS2 Fan Status':
		case'PS1 Status':
		case'PS2 Status':
			if (coordinate == 0) return 'OK';
			if (coordinate == 1) return 'Alarm';
			break;
		case'Main Board Temperature Status':
		case'CPU Temperature Status':
		case'Main Fan Status':
			if (coordinate == 0) return 'OK';
			if (coordinate == 1) return 'High Temp';
			break;
		case'Hardware Status':
			if (coordinate == 0) return 'Alarm';
			if (coordinate == 1) return 'Ok';
			if (coordinate == 2) return 'Warning';
			break;
		case'Sync Source':
			if (coordinate == 0) return 'None';
			if (coordinate == 1) return 'GNSS Source';
			if (coordinate == 2) return 'External 1PPS';
			break;
		case'1PPS Out Status':
		case'10MHz Out Status':
			if (coordinate == 0) return 'Ok';
			if (coordinate == 1) return 'Alarm';
			if (coordinate == 2) return 'Squelched';
			if (coordinate == 3) return 'Disabled';
			break;
		case'Frequency Accuracy':
		case'Phase Accuracy':
		case'DC Power Status':
		case'AC Power Status':
		case'Internal 1PPS Status':
		case'Internal Oscillator Status':
			if (coordinate == 0) return 'Alarm';
			if (coordinate == 1) return 'Ok';
			break;
		case'Holdover':
			if (coordinate == 0) return 'Warming Up';
			if (coordinate == 1) return 'Tracking Search';
			if (coordinate == 2) return 'Locked';
			if (coordinate == 3) return 'Holdover';
			if (coordinate == 4) return 'Forced Holdover';
			break;
		case'GPS Locked Status':
			if (coordinate == 0) return 'GNSS Source Not Locked';
			if (coordinate == 1) return 'GNSS Source Locked';
			break;
		case'GPS Antenna Status':
			if (coordinate == 0) return 'GNSS Antenna Ok';
			if (coordinate == 1) return 'GNSS Antenna Shorted';
			if (coordinate == 2) return 'No GNSS Antenna';
			break;
		default:
			return coordinate;
	}
}
