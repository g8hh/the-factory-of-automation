var player;
var tmp = {};
var intervals = {};
var current_version = 0.3;
var current_version_display = "0.3";
var gameID = "theAutoClickGame";
var tab = "Main";
var subtab = "Steel";
var tabData = {
	allTabs: ["Options", "Main", "Milestones", "Supercharger", "Radioactivity", "Eclipse", "Apparatus"],
	tabUnlocks: {
		Options() { return true },
		Main() { return true },
		Milestones() { return player.materialsUnl.gte(3)||hasMilestone(15) },
		Supercharger() { return hasMilestone(6) },
		Radioactivity() { return hasMilestone(12) },
		Eclipse() { return (player.materials[0]?player.materials[0].amt.gte(ECLIPSE_REQ.sqrt()):false) || player.eclipse.times.gt(0) },
		Apparatus() { return player.eclipse.times.gt(0) },
	},
	materialTabs: [],
}

function updateTabData() {
	tabData.materialTabs = [];
	
	for (let i=0;i<tmp.mtd.length;i++) {
		if (tmp.mtd[i]=="...") {
			tabData.materialTabs.push("...");
			continue;
		};
		let name = getMaterialName(i);
		tabData.materialTabs.push(name);
	}
}

function loadGame() {
	let get = localStorage.getItem(gameID)
	if (get) player = JSON.parse(atob(get));
	else player = getStartPlayer();
	
	fixPlayer();
	updateTemp();
	updateTemp();
	updateTemp();
	updateTemp();
	updateTemp();
	
	updateTabData();
	loadVue();
	
	if (!player.offProd) player.currTime = new Date().getTime();
	intervals.game = setInterval(function() { gameLoop((new Date().getTime()-player.currTime)/1000) }, 50)
	intervals.save = setInterval(function() { if (player.autosave) save(); }, 2500)
}

function save() {
	localStorage.setItem(gameID, btoa(JSON.stringify(player)));
}

function importSave() {
	let data = prompt("Paste save data: ")
	if (data===undefined||data===null||data=="") return;
	try {
		player = JSON.parse(atob(data));
		save()
		window.location.reload();
	} catch(e) {
		console.log("Import failed!");
		console.error(e);
		return;
	}
}

function exportSave() {
	let data = btoa(JSON.stringify(player))
	const a = document.createElement('a');
	a.setAttribute('href', 'data:text/plain;charset=utf-8,' + data);
	a.setAttribute('download', "theautoclicker.txt");
	a.setAttribute('id', 'downloadSave');

	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
}

function toggleAutosave() { player.autosave = !player.autosave }

function toggleOfflineProd() { player.offProd = !player.offProd }

function hardReset() {
	if (!confirm("Are you sure you want to reset everything???")) return;
	player = getStartPlayer();
	save();
	window.location.reload();
}

function gameLoop(diff) {
	player.currTime = new Date().getTime()
	updateTemp();
	updateTabData();
	
	for (let m=0;m<player.materials.length;m++) if (player.materials[m]!="...") for (let i=0;i<player.materials[m].autoData.length;i++) doAutomation(i, m, diff);
	if (hasMilestone(6)) {
		if (hasMilestone(9)) player.supercharger.batteries = player.supercharger.batteries.plus(tmp.sbg.times(diff));
		
		player.supercharger.amt = player.supercharger.amt.max(getSupercharged(1));
		if (hasMilestone(8)) player.supercharger.amt2 = player.supercharger.amt2.max(getSupercharged(2));
		if (hasSuperMilestone(8)) player.supercharger.amt3 = player.supercharger.amt3.max(getSupercharged(3));
	}
	if (hasMilestone(12)) {
		let mag = tmp.radsis.times(tmp.radc).times(tmp.radc.max(Math.random())).times(diff);
		player.radioactivity.ions = player.radioactivity.ions.plus(mag)
	}
	if (hasMilestone(14)) {
		for (let k=1;k<=3;k++) {
			let adn = (k==1)?"auto":("auto"+k);
			for (let i=0;i<player.supercharger[adn].length;i++) doSBAutomation(k, i, diff);
		}
	}
	if (player.eclipse.times.gt(0)) {
		if (player.eclipse.lifespan.gt(0)) {
			player.eclipse.lifespan = player.eclipse.lifespan.times(Decimal.pow(eclipseSpeedDiv(softcapEclipseLS(player.eclipse.lifespan)), diff));
			player.eclipse.power = player.eclipse.power.plus(getEclipseSpeed().times(diff));
		}
		apparatusTick(diff);
	}
}