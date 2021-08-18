function getNextSupercharged(n) {
	let next = new Decimal(1/0);
	if (n==1) next = Decimal.pow(1e100, Decimal.pow(2, player.supercharger.amt.div(tmp.sbe||1).plus(1).log2().pow(2)).sub(1)).times('1e24400');
	else if (n==2) next = Decimal.pow(1e3, Decimal.pow(2, player.supercharger.amt2.div(tmp.sbe||1).plus(1).log2().pow(1.5)).sub(1)).times('1e980');
	else if (n==3) next = Decimal.pow(1e30, Decimal.pow(2, player.supercharger.amt3.div(tmp.sbe||1).plus(1).log2().pow(1.765)).sub(1)).times('1e66666');
	return next;
}

function getSupercharged(n) {
	if (!player.materials[0]) return new Decimal(0);
	if (n==1) {
		if (player.materials[0].amt.lt('1e24400')) return new Decimal(0);
		let amt = Decimal.pow(2, player.materials[0].amt.div('1e24400').max(1).log(1e100).plus(1).log2().sqrt()).sub(1);
		return amt.times(tmp.sbe||1).plus(1).floor();
	} else if (n==2) {
		if (!hasMilestone(8)) return new Decimal(0);
		if (!player.materials[0].autoData[0]) return new Decimal(0);
		if (player.materials[0].autoData[0].lt('1e980')) return new Decimal(0);
		let amt = Decimal.pow(2, player.materials[0].autoData[0].div('1e980').max(1).log(1e3).plus(1).log2().root(1.5)).sub(1);
		return amt.times(tmp.sbe||1).plus(1).floor();
	} else if (n==3) {
		if (!hasSuperMilestone(8)) return new Decimal(0);
		if (!player.materials[1]) return new Decimal(0);
		if (player.materials[1].amt.lt('1e66666')) return new Decimal(0);
		let amt = Decimal.pow(2, player.materials[1].amt.div('1e66666').max(1).log(1e30).plus(1).log2().root(1.765)).sub(1);
		return amt.times(tmp.sbe||1).plus(1).floor();
	} else return new Decimal(0);
}

function getSuperchargeEff() {
	let sup = player.supercharger.amt.plus(hasMilestone(8)?player.supercharger.amt2:0).plus(hasSuperMilestone(8)?player.supercharger.amt3:0);
	if (sup.gte(150)) sup = Decimal.pow(150, sup.log(150).root(1.1));
	
	let eff = Decimal.pow(hasSuperMilestone(6)?125:5, sup.root(1.5));
	if (hasMilestone(12)) eff = eff.pow(tmp.ionEff2||1);
	if (hasMilestone(10)) eff = eff.times(player.supercharger.batteries.plus(1).pow(hasSuperMilestone(10)?2:1));
	return eff;
}

function hasSuperMilestone(x) { return player.supercharger.selected.includes(x) && hasMilestone(x) }

function getTotalSuperchargeable() { 
	let tsc = hasSuperMilestone(7)?((hasSuperMilestone(15)?player.eclipse.bestResUnl:player.materialsUnl).sub(6).max(0).toNumber()+1):hasMilestone(7)?2:1 
	if (hasMilestone(9)) tsc++;
	return tsc;
}

function canSuperCharge() { return player.supercharger.selected.length<tmp.tsca && hasMilestone(6) }

function superCharge(x) {
	if (!hasMilestone(6)) return;
	if (!hasMilestone(x)) return;
	if (player.supercharger.selected.includes(x)) {
		player.supercharger.selected.splice(player.supercharger.selected.indexOf(x), 1);
		return;
	}
	if (!canSuperCharge()) return;
	player.supercharger.selected.push(x);
}

function getSuperBatteryEffect() {
	return hasMilestone(9) ? player.supercharger.batteries.plus(1).log10().cbrt().div(2).plus(1) : new Decimal(1);
}

function getSuperBatteryGain() {
	let base = player.supercharger.amt.plus(hasMilestone(8)?player.supercharger.amt2:0).plus(hasSuperMilestone(8)?player.supercharger.amt3:0)
	if (hasSuperMilestone(11)) base = base.pow(3.5);
	
	let gain = base.times(tmp.sbue);
	if (hasMilestone(11)) gain = gain.times(Decimal.pow(hasSuperMilestone(11)?100:5, player.materialsUnl.sub(hasSuperMilestone(11)?9:10).max(0)));
	if (hasMilestone(12)) gain = gain.times(tmp.ionEff3||1);
	if (hasSuperMilestone(14)) gain = gain.times(20);
	if (player.eclipse.times.gt(0) && tmp.ec) gain = gain.times(tmp.ec.powerEff3);
	return gain;
}

function getSBUpgCost(x) { 
	let u = x==1?player.supercharger.upg:player.supercharger["upg"+x];
	if (u.gte(5)) u = u.pow(1.5).div(Math.sqrt(5));
	return Decimal.pow(x==3?1e10:5, u.pow(x)).times(x==3?1e95:Decimal.pow(1e3, Math.pow(x, 1.4))); 
}

function getSBUpgTarg(x) {
	if (player.supercharger.batteries.lt(1)) return new Decimal(0);
	let t = player.supercharger.batteries.div(x==3?1e95:Decimal.pow(1e3, Math.pow(x, 1.4))).max(1).log(x==3?1e10:5).root(x);
	if (t.gte(5)) t = t.times(Math.sqrt(5)).root(1.5);
	return t.plus(1).floor();
}

function getSBUpgEff() { return Decimal.pow(tmp.sbue2.plus(tmp.sbue3).plus(4).times(tmp.sbueMult), player.supercharger.upg) }

function buySBUpg(x, bulk=new Decimal(1)) {
	if (x==3 && !hasSuperMilestone(13)) return;
	if (x==2 && !hasSuperMilestone(10)) return;
	let cost = getSBUpgCost(x);
	if (player.supercharger.batteries.lt(cost)) return;
	if (bulk.gt(1)) {
		let t = getSBUpgTarg(x);
		let b = t.sub(x==1?player.supercharger.upg:player.supercharger["upg"+x]).floor().max(1).min(bulk);
		if (x==1) player.supercharger.upg = player.supercharger.upg.plus(b);
		else player.supercharger["upg"+x] = player.supercharger["upg"+x].plus(b);
	} else {
		player.supercharger.batteries = player.supercharger.batteries.sub(cost);
		if (x==1) player.supercharger.upg = player.supercharger.upg.plus(1);
		else player.supercharger["upg"+x] = player.supercharger["upg"+x].plus(1);
	}
}

function sbAutoDisplayed() {
	let au = new Decimal(hasMilestone(14)?1:0);
	if (au.lt(1)) return [];
	else if (au.lt(10)) return Array.from(Array(au.toNumber()).keys(), x => new Decimal(x+1));
	else return [new Decimal(1), new Decimal(2), new Decimal(3), new Decimal(4), "...", au.sub(3), au.sub(2), au.sub(1), au];
}

function getSBAutoCost(x, t) {
	let u = (x==1?player.supercharger.auto[t]:player.supercharger["auto"+x][t])||new Decimal(0);
	if (u.gte(5)) u = u.pow(1.5).div(Math.sqrt(5));
	return Decimal.pow(x==3?1e8:1e4, u.pow(x)).times(Decimal.pow(1e120, Math.pow(x, 1.4))); 
}

function getSBAutoTarg(x, l) {
	let t = player.supercharger.batteries.div(Decimal.pow(1e120, Math.pow(x, 1.4))).max(1).log(x==3?1e8:1e4).root(x);
	if (t.gte(5)) t = t.times(Math.sqrt(5)).root(1.5);
	return t.plus(1).floor();
}

function buySBAuto(x, t, bulk=new Decimal(1)) {
	if (x==3 && !hasSuperMilestone(13)) return;
	if (x==2 && !hasSuperMilestone(10)) return;
	let cost = getSBAutoCost(x, t);
	let targ = getSBAutoTarg(x, t).min((((x==1)?player.supercharger.auto[t]:player.supercharger["auto"+x][t])||new Decimal(0)).plus(bulk));
	let l = tmp.sbuad[t];
	if ((l.eq(1)?player.supercharger.batteries:(player.supercharger.auto[(tmp.sbuad[i-1]=='...'||!tmp.sbuad[i-1])?(i-2):(i-1)])).lt(cost)) return;
	if (x==1) player.supercharger.auto[t] = Decimal.max(player.supercharger.auto[t]||0, targ);
	else player.supercharger["auto"+x][t] = Decimal.max(player.supercharger["auto"+x][t]||0, targ);
}

function doSBAutomation(k, i, diff) {
	let n = tmp.sbuad[i];
	if (n=="...") return;
	let prev = tmp.sbuad[i-1];
	if (prev=="...") prev = tmp.sbuad[i-2];
	let adn = (k==1)?"auto":("auto"+k);
	let atn = (k==1)?"autoTimers":("autoTimers"+k);
	if (player.supercharger[adn][i]===undefined) player.supercharger[adn][i] = new Decimal(0);
	if (player.supercharger[atn][i]===undefined) player.supercharger[atn][i] = new Decimal(0);
	if (player.supercharger[adn][i].lte(0)) return;
	if (n.gt(1)) {
		let power = n.sub(prev);
		player.supercharger[atn][i] = player.supercharger[atn][i].root(power).plus(diff).pow(power);
		if (player.supercharger[atn][i].gte(Decimal.div(1, player.supercharger[adn][i]).toNumber())) {
			buyAuto(prev, l, Decimal.mul(player.supercharger[atn][i], player.supercharger[adn][i]).floor());
			player.supercharger[atn][i] = new Decimal(0);
		}
	} else {
		player.supercharger[atn][i] = player.supercharger[atn][i].plus(diff);
		if (player.supercharger[atn][i].gte(Decimal.div(1, player.supercharger[adn][i]).toNumber())) {
			buySBUpg(k, Decimal.mul(player.supercharger[atn][i], player.supercharger[adn][i]).floor());
			player.supercharger[atn][i] = new Decimal(0);
		}
	}
	
}

function loadSuperAuto() {
	for (let k=1;k<=3;k++) {
		let adn = (k==1)?"auto":("auto"+k);
		let atn = (k==1)?"autoTimers":("autoTimers"+k);
		for (let i=0;i<player.supercharger[adn].length;i++) player.supercharger[adn][i] = new Decimal(player.supercharger[adn][i]);
		for (let i=0;i<player.supercharger[atn].length;i++) player.supercharger[atn][i] = new Decimal(player.supercharger[atn][i]);
	}
}