function getRadResetReq() { 
	let c = player.radioactivity.ionCores
	if (c.gte(16)) c = Decimal.pow(1.15, c).plus(6.642)
	return Decimal.pow(1e13, c.times(c.div(4).max(1).root(5))).times(1e48) 
}
function getRadResetTarg() {
	let x = player.supercharger.batteries.div(1e48).max(1).log(1e13)
	if (x.gte(4)) x = x.root(1.2).times(1.25992)
	if (x.gte(16)) x = x.sub(6.642).log(1.15)
	return x.plus(1).floor()
}

function ionCoreReset(bulk=new Decimal(1)) {
	let req = getRadResetReq();
	let targ = getRadResetTarg();
	if (player.supercharger.batteries.lt(req) || targ.lte(player.radioactivity.ionCores)) return;
	if (!hasMilestone(17)) player.supercharger = {
		amt: new Decimal(0),
		amt2: new Decimal(0),
		amt3: new Decimal(0),
		selected: player.supercharger.selected,
		batteries: new Decimal(0),
		upg: new Decimal(0),
		upg2: new Decimal(0),
		upg3: new Decimal(0),
		auto: player.supercharger.auto,
		auto2: player.supercharger.auto2,
		auto3: player.supercharger.auto3,
		autoTimers: [],
		autoTimers2: [],
		autoTimers3: [],
	}

	targ = targ.min(bulk.plus(player.radioactivity.ionCores));
	player.radioactivity.ionCores = player.radioactivity.ionCores.max(targ);
}

function getIonCoreEff() {
	if (player.radioactivity.ionCores.lt(1)) return new Decimal(1);
	let cores = player.radioactivity.ionCores;
	if (cores.gte(12)) cores = cores.times(cores.pow(2).times(cores.max(13).div(1728)));
	
	cores = cores.sub(1).max(0).pow(2).plus(1);
	return cores.max(1).log(1.5).plus(1).root(1.5);
}

function getIonChanceMult() {
	let mult = new Decimal(1);
	if (hasSuperMilestone(12)) mult = mult.times(3);
	if (hasSuperMilestone(14)) mult = mult.times(20);
	if (player.eclipse.times.gt(0) && tmp.ec) mult = mult.times(tmp.ec.powerEff3);
	return mult;
}