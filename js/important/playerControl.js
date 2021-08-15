function getStartPlayer() {
	let p = {
		currTime: new Date().getTime(),
		offProd: true,
		autosave: true,
		materialsUnl: new Decimal(1),
		materials: [],
		milestones: [],
		supercharger: {
			amt: new Decimal(0),
			amt2: new Decimal(0),
			amt3: new Decimal(0),
			selected: [],
			batteries: new Decimal(0),
			upg: new Decimal(0),
			upg2: new Decimal(0),
			upg3: new Decimal(0),
			auto: [],
			auto2: [],
			auto3: [],
			autoTimers: [],
			autoTimers2: [],
			autoTimers3: [],
		},
		radioactivity: {
			ionCores: new Decimal(0),
			ions: new Decimal(0),
		},
		eclipse: {
			times: new Decimal(0),
			lifespan: new Decimal(0),
			total: new Decimal(0),
			power: new Decimal(0),
			bestResUnl: new Decimal(0),
			upgs: [],
		},
		apparatus: {
			total: new Decimal(0),
			unused: new Decimal(0),
			rowsUnl: new Decimal(0),
			speedUpgs: new Decimal(0),
			data: [],
		},
		version: current_version,
	};
	return p;
}

function fixPlayer() {	
	let start = getStartPlayer();
	fixPlayerObj(player, start);
	
	doVersionControl();
	
	loadMaterials();
	loadSuperAuto();
}

function fixPlayerObj(obj, start) {
	for (let x in start) {
		if (obj[x] === undefined) obj[x] = start[x]
		else if (typeof start[x] == "object" && !(start[x] instanceof Decimal)) fixPlayerObj(obj[x], start[x])
		else if (start[x] instanceof Decimal) obj[x] = new Decimal(obj[x])
	}
}

function doVersionControl() {
	
	player.version = current_version;
}

function showTab(t) {
	app.tab = t; 
	updateTemp();
}