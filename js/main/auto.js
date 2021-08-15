function automatorsDisplayed(i) {
	if (player.materials[i].autosUnl.lt(1)) return [];
	else if (player.materials[i].autosUnl.lt(10)) return Array.from(Array(player.materials[i].autosUnl.toNumber()).keys(), x => new Decimal(x+1));
	else return [new Decimal(1), new Decimal(2), new Decimal(3), new Decimal(4), "...", player.materials[i].autosUnl.sub(3), player.materials[i].autosUnl.sub(2), player.materials[i].autosUnl.sub(1), player.materials[i].autosUnl];
}

function getAutoCostScalingData(i) {
	let start = new Decimal(100);
	if (hasUpg(31, i)) start = start.plus(50);
	if (hasUpg(71, i)) start = start.plus(player.materials[i].amt.max(1).log(1.25));
	if (hasUpg(63, i)) start = start.plus(50);
	if (hasUpg(64, i)) start = start.plus(getAutoAmt(new Decimal(1), i).max(1).log2().times(1.9));
	
	let exp = new Decimal(2);
	if (hasUpg(41, i)) exp = exp.sub(.25);
	
	let start2 = new Decimal(1e15);
	let exp2 = new Decimal(1.25);
	
	return [{start: start, exp: exp}, {start: start2, exp: exp2}];
}

function getAutoStartCost(i) {
	let start = Decimal.add(5, tmp.mtd[i]);
	if (hasUpg(24, i)) start = start.sub((i>0)?2:1);
	if (hasUpg(43, i)) start = start.sub(1);
	if ((tmp.mtd[i+1]=="...")?tmp.mtd[i+2]:tmp.mtd[i+1]) {
		let ni = (tmp.mtd[i+1]=="...")?(i+2):(i+1)
		if (hasUpg(56, ni) && ni<2) start = start.sub(1);
	}
	if ((tmp.mtd[i-1]=="...")?tmp.mtd[i-2]:tmp.mtd[i-1]) {
		let pi = (tmp.mtd[i-1]=="...")?(i-2):(i-1)
		if (hasUpg(83, pi)) start = start.sub(1);
	}
	return start;
}

function getAutomatorMatCostScaleFactor() {
	let f = new Decimal(1);
	if (player.radioactivity.ionCores.gte(27) && player.eclipse.times.gte(1) && tmp.ionEff6) f = f.sub(tmp.ionEff6);
	return f;
}

function getAutomatorCostScalingFactor(n=new Decimal(1), i) {
	let f = new Decimal(1);
	if (tmp.mtd[i]!=="...") if (tmp.mtd[i].gte(5)) {
		let scale = getAutomatorMatCostScaleFactor();
		f = Decimal.pow(scale.plus(.5), Decimal.pow(scale.plus(.5), tmp.mtd[i].sub(5).plus(tmp.mtd[i].gte(7)?Decimal.div(1.9449, tmp.mtd[i].sub(6).root(1.06)):0)));
	}
	if (hasMilestone(3)) f = f.sub(hasSuperMilestone(3)?.4:.25);
	return f;
}

function getAutomatorCost(b, d=new Decimal(1), n, i) { 
	b = b.times(getAutomatorCostScalingFactor(n, i));
	let data = tmp.ausd[i];
	if (b.gte(data[1].start)) b = Decimal.pow(data[1].start, b.log(data[1].start).pow(data[1].exp));
	if (b.gte(data[0].start)) b = b.pow(data[0].exp).div(data[0].start.pow(data[0].exp.sub(1)));
	return b.plus(1).pow(d.times(2)).times(Decimal.pow(tmp.ausc[i], d)).round();
}
function getAutomatorTarget(r, d=new Decimal(1), n, i) { 
	let data = tmp.ausd[i];
	let t = r.div(Decimal.pow(tmp.ausc[i], d)).root(d.times(2)).sub(1);
	if (t.gte(data[0].start)) t = t.times(data[0].start.pow(data[0].exp.sub(1))).root(data[0].exp);
	if (t.gte(data[1].start)) t = Decimal.pow(data[1].start, t.log(data[1].start).root(data[1].exp));
	t = t.div(getAutomatorCostScalingFactor(n, i));
	return t.plus(1).floor().max(0);
}

function getAutoAmt(n, l) {
	if (!tmp.aud[l] || !player.materials[l]) return new Decimal(0);
	let i = tmp.aud[l].findIndex(x => new Decimal(n).eq(x));
	if (i==-1) return new Decimal(0);
	return player.materials[l].autoData[i]||new Decimal(0)
}

function buyAuto(n, l, bulk=new Decimal(1)) {
	let i = tmp.aud[l].findIndex(x => new Decimal(n).eq(x));
	
	let r = n.gt(1)?getAutoAmt(tmp.aup[l][i], l):player.materials[l].amt;
	let b = getAutoAmt(n, l);
	let c = getAutomatorCost(b, n.sub(tmp.aup[l][i]), n, l);
	if (r.lt(c)) return;
	if (!hasUpg(21, l)) {
		if (n.gt(1)) {
			player.materials[l].autoData[tmp.aup[l][i].sub(1)] = player.materials[l].autoData[tmp.aup[l][i].sub(1)].sub(c).max(0);
		} else player.materials[l].amt = player.materials[l].amt.sub(c).max(0);
	}
	
	if (player.materials[l].autoData[i] === undefined && n.lt(9)) {
		resetAutoData(l, i);
		player.materials[l].autosUnl = player.materials[l].autosUnl.plus(1);
		if (player.materialsUnl.eq(tmp.mtd[l].plus(1)) && n.eq(5)) {
			player.materialsUnl = player.materialsUnl.plus(1);
			player.eclipse.bestResUnl = player.eclipse.bestResUnl.max(player.materialsUnl);
			resetMaterial(tmp.mtd[l].plus(1));
			if (hasSuperMilestone(4)) player.materials[l+1].upgs = Object.keys(UPGS).filter(x => parseInt(x)!==undefined).map(x => parseInt(x));
			else if (hasMilestone(4) || l>=4) player.materials[l+1].upgs = Object.keys(UPGS).filter(x => parseInt(x)!==undefined && parseInt(x)<80).map(x => parseInt(x));
			if (tmp.mtd[l].gte(8)) shiftMaterialData();
		}
	} else if ((player.materials[l].autoData[i]||new Decimal(0)).eq(0) && player.materials[l].autosUnl.eq(n)) {
		resetAutoData(l, i);
		player.materials[l].autosUnl = player.materials[l].autosUnl.plus(1);
		shiftAutoData(l);
	} else {
		let realBulk = getAutomatorTarget(r, n.sub(tmp.aup[l][i]), n, l).sub(b).min(bulk).floor().max(1);
		player.materials[l].autoData[i] = player.materials[l].autoData[i].plus(realBulk);
	}
}

function resetAutoData(l, i, full=false) {
	player.materials[l].autoData[i] = new Decimal(full?0:1);
	player.materials[l].autoTimers[i] = new Decimal(0);
	player.materials[l].autoSel[i] = !full;
}

function shiftAutoData(l, b=new Decimal(1)) {
	for (let i=0;i<player.materials[l].autoData.length;i++) {
		if (i<=4) continue;
		else {
			resetAutoData(l, i, b.gte(player.materials[l].autoData.length-i));
			if (b.lt(player.materials[l].autoData.length-i)) player.materials[l].autoData[i] = new Decimal(player.materials[l].autoData[i+b.toNumber()]);
		}
	}
	player.materials[l].autoData[4] = "...";
	updateTemp();
}

function doAutomation(i, l, diff) {
	if (tmp.aud[l]=="...") return;
	let n = tmp.aud[l][i];
	if (n=="...") return;
	let prev = tmp.aud[l][i-1];
	if (prev=="...") prev = tmp.aud[l][i-2];
	if (player.materials[l].autoTimers[i]===undefined) player.materials[l].autoTimers[i] = new Decimal(0);
	if (player.materials[l].autoData[i].lte(0)) return;
	if (!player.materials[l].autoSel[i]) return;
	if (n.gt(1)) {
		let power = n.sub(prev);
		player.materials[l].autoTimers[i] = player.materials[l].autoTimers[i].root(power).plus(getAutomationMult(prev.plus(1), n, l).times(diff)).pow(power);
		if (player.materials[l].autoTimers[i].gte(Decimal.div(1, player.materials[l].autoData[i]).toNumber())) {
			buyAuto(prev, l, Decimal.mul(player.materials[l].autoTimers[i], player.materials[l].autoData[i]).floor());
			player.materials[l].autoTimers[i] = new Decimal(0);
		}
	} else {
		player.materials[l].autoTimers[i] = player.materials[l].autoTimers[i].plus(getAutomationMult(n, n, l).times(diff));
		if (player.materials[l].autoTimers[i].gte(Decimal.div(1, player.materials[l].autoData[i]).toNumber())) {
			player.materials[l].amt = player.materials[l].amt.plus(Decimal.mul(player.materials[l].autoTimers[i], player.materials[l].autoData[i]).floor().times(tmp.mg[l]));
			player.materials[l].autoTimers[i] = new Decimal(0);
		}
	}
	
}

function getAutomationMult(s, e, l) {
	let mult = new Decimal(1);
	let power = e.sub(s).plus(1);
	
	if (s.lte(1) && e.gte(1)) {
		if (tmp.mtd[l].gt(0)) mult = mult.times(tmp.mtd[l].plus(1));
		if (hasUpg(11, l)) mult = mult.times(5);
		if (hasUpg(32, l)) mult = mult.times(getAutoAmt(new Decimal(2), l).max(1).log2().max(1));
		if (hasUpg(52, l)) mult = mult.times(10);
		if (hasUpg(13, l)) mult = mult.times(15);
		if (hasUpg(25, l) && tmp.mtd[l-1]) mult = mult.times(player.materials[(tmp.mtd[l-1]=="...")?(l-2):(l-1)].amt.max(1).log(5).max(1));
		if (hasUpg(56, l) && l>=2) mult = mult.times(100);
		if (hasUpg(92, l)) mult = mult.times(1e9);
	};
	if (s.lte(2) && e.gte(1)) {
		if (hasUpg(61, l)) mult = mult.times(player.materials[l].amt.max(1).log2().max(1).log2().max(1).pow(power));
		if (hasUpg(73, l)) mult = mult.times(player.materials[l].amt.max(1).log(1.25).max(1).log(1.25).max(1).pow(power));
	}
	if ((hasUpg(53, l)||hasUpg(45, l))?(s.lte(2)&&e.gte(1)):(s.lte(2) && e.gte(2))) {
		if (hasUpg(23, l)) mult = mult.times(Decimal.pow(3, power));
		if (hasUpg(44, l)) mult = mult.times(Decimal.pow(4, power));
		if (l>0) if (hasUpg(83, (tmp.mtd[l-1]=="..."?(l-2):(l-1)))) mult = mult.times(Decimal.pow(25, power));
		if (hasUpg(91, l)) mult = mult.times(Decimal.pow(1e4, power));
		if (l>1) if (hasUpg(93, (tmp.mtd[l-2]=="..."?(l-3):(l-2)))) mult = mult.times(player.materials[tmp.mtd[l-2]=="..."?(l-3):(l-2)].amt.max(1).log2().max(1));
	}
	
	if (hasUpg(81, l)) mult = mult.times(getAutoAmt(e, l).max(1).pow(power.times(hasMilestone(5) ? player.materialsUnl.sub(tmp.mtd[l]).max(0).plus(1).log(hasSuperMilestone(5)?1.75:2).plus(1) : 1)));
	if (hasUpg(35, l)) {
		mult = mult.times(getAutoAmt(e, l).max(1).log10().plus(1).pow(power));
		if (s.lte(1) && e.gte(1) && hasUpg(45, l)) mult = mult.times(Decimal.max(getAutoAmt(e.plus(1), l)||0, 1).log10().plus(1).pow(power));
	}
	if (l==0 && tmp.mtd[l+1]) if (hasUpg(45, l+1)) mult = mult.times(getAutoAmt(e, l).max(1).log10().plus(1).pow(power.times(hasMilestone(12)?(tmp.ionEff||1):1)));
	if (hasMilestone(2)) mult = mult.times(Decimal.pow(player.milestones.length+1, power.times(hasSuperMilestone(2)?3:2)).max(1));
	if (hasMilestone(6) && tmp.sup) mult = mult.times(tmp.sup.pow(power));
	if (player.eclipse.times.gt(0) && tmp.ec) mult = mult.times(tmp.ec.powerEff.pow(power));
	
	if ((hasMilestone(13) && l<=3) && s.lte(1) && e.gte(1)) mult = mult.pow(player.materials[l].autosUnl.sub(hasSuperMilestone(13)?0:1).max(1));
	if (hasSuperMilestone(16)) mult = mult.pow(1.05);

	return mult;
}