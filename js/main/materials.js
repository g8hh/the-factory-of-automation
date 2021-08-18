const MATERIAL_NAMES = ["steel", "gold", "diamond", "ruby", "sapphire", "emerald", "alexandrite", "pearl", "demantoid", "tsavorite", "spinel", "opal", "tanzanite", "aquamarine", "topaz", "iolite", "amethyst", "agate", "peridot", "citrine", "fluorite", "obsidian"];
const MATERIALS = MATERIAL_NAMES.reduce(function (acc,cur,i) {
	acc[cur] = {
		id: i,
		name: cur,
		title: capitalFirst(cur),
		img: "images/"+cur+".png",
	};
	return acc;
}, {})

function earlyMaterial(t) { return MATERIAL_NAMES.filter((x,i) => i<14).includes(t.toLowerCase()) }

function getMatIDFromTitle(t) { return new Decimal(MATERIAL_NAMES.includes(t.toLowerCase())?MATERIAL_NAMES.indexOf(t.toLowerCase()):t.split("").slice(1).map(x => x.replaceAll(',', '')).join("")) }
function matColFromTitle(t, b=1) { return getMaterialColor(getMatIDFromTitle(t), b) }

function getMaterialColor(m, b=1) {
	m = new Decimal(m||0);
	m = m.sub(m.div(16581375).floor().times(16581375)).toNumber();
	return "rgb("+Math.round(Math.abs(Math.sin(m))*b*255)+","+Math.round(Math.abs(Math.cos(m/2))*b*255)+","+Math.round(Math.abs(Math.sin(m*2+Math.PI))*b*255)+")"
}

function getMaterialName(i, p=0) {
	let x = tmp.mtd[i+p];
	if (x=="...") x = tmp.mtd[i+p-1];
	
	if (x===undefined) return "???";
	else if (MATERIAL_NAMES[x.toNumber()]) return MATERIALS[MATERIAL_NAMES[x.toNumber()]].title;
	else return "M"+formatWhole(x);
}

function materialsDisplayed() {
	if (player.materialsUnl.lt(1)) return [];
	else if (player.materialsUnl.lt(10)) return Array.from(Array(player.materialsUnl.toNumber()).keys(), x => new Decimal(x));
	else return [new Decimal(0), new Decimal(1), new Decimal(2), new Decimal(3), "...", player.materialsUnl.sub(4), player.materialsUnl.sub(3), player.materialsUnl.sub(2), player.materialsUnl.sub(1)];
}

function loadMaterials() {
	let mtd = materialsDisplayed();
	for (let i=0;i<mtd.length;i++) {
		if (mtd[i]==="...") continue;
		if (player.materials[i]===undefined) resetMaterial(i);
		player.materials[i].amt = new Decimal(player.materials[i].amt);
		player.materials[i].autosUnl = new Decimal(player.materials[i].autosUnl);
		if (player.materials[i].autoData.length>0) for (let n=0;n<player.materials[i].autoData.length;n++) player.materials[i].autoData[n] = new Decimal(player.materials[i].autoData[n]);
		if (player.materials[i].autoTimers.length>0) for (let n=0;n<player.materials[i].autoTimers.length;n++) player.materials[i].autoTimers[n] = new Decimal(player.materials[i].autoTimers[n]);
	}
}

function resetMaterial(x) {
	player.materials[x] = {
		amt: new Decimal(0),
		autosUnl: new Decimal(1),
		autoData: [],
		autoTimers: [],
		autoSel: [],
		upgs: [],
	}
}

function shiftMaterialData(b=new Decimal(1)) {
	updateTemp();
	for (let i=0;i<player.materials.length;i++) {
		if (i<=4) continue;
		else {
			resetMaterial(i);
			if (b.lt(player.materials.length-i)) {
				player.materials[i] = player.materials[i+b.toNumber()];
				player.materials[i].amt = new Decimal(player.materials[i].amt);
				player.materials[i].autosUnl = new Decimal(player.materials[i].autosUnl);
			}
		}
	}
	player.materials[4] = "...";
	updateTemp();

	if (!tmp.mtd.some(x => Decimal.eq(x||-1, getMatIDFromTitle(app.subtab)))) app.subtab = getMaterialName(tmp.mti+1);
	updateTemp();
}

function getMainMaterialEff(l) {
	if (l==0) return new Decimal(1);
	let power = tmp.mtd[l].sub((tmp.mtd[l-1]=="...")?tmp.mtd[l-2]:tmp.mtd[l-1]);
	let eff = player.materials[l].amt.max(1).log2().max(1);
	
	if (hasUpg(16, l) && tmp.tet[l]) eff = eff.tetrate(tmp.tet[l]);
	if (player.radioactivity.ionCores.gte(11) && tmp.ionEff5) eff = eff.times(player.materials[l].amt.pow(tmp.ionEff5).max(1).pow(power.sub(6).max(1)));
	
	if (power.gte(3)) power = power.pow(2).div(3);
	return eff.pow(power.pow(1.5));
}

function getTetrationExp(l) {
	let exp = new Decimal(1.5);
	if (hasUpg(75, l)) exp = exp.plus(player.materials[l].autosUnl.sub(1).max(0).times(.03).min(.3));
	if (hasSuperMilestone(18)) exp = exp.plus(.05);
	return exp;
}

function getAmtGain(l) {
	let gain = new Decimal(1);
	if (hasUpg(12, l)) gain = gain.times(4);
	if (hasUpg(22, l)) gain = gain.times(3);
	if (hasUpg(42, l)) gain = gain.times(getAutoAmt(new Decimal(1), l).max(1).log(2).max(1));
	if (hasUpg(51, l)) gain = gain.times(10);
	if (hasUpg(61, l)) gain = gain.times(player.materials[l].amt.max(1).log2().max(1).log2().max(1));
	
	if (hasUpg(14, l)) gain = gain.times(Decimal.pow(2, player.materials[l].autosUnl.sub(1)));
	if (hasUpg(33, l)) gain = gain.times(Decimal.pow(1.3, player.materials[l].upgs.length));
	if (hasUpg(73, l)) gain = gain.times(player.materials[l].amt.max(1).log(1.25).max(1).log(1.25).max(1));
	if (l>0) if (hasUpg(83, (tmp.mtd[l-1]=="..."?(l-2):(l-1)))) gain = gain.times(player.materials[tmp.mtd[l-1]=="..."?(l-2):(l-1)].amt.max(1).log2().max(1).pow(4));
	if (l>1) if (hasUpg(93, (tmp.mtd[l-2]=="..."?(l-3):(l-2)))) gain = gain.times(player.materials[tmp.mtd[l-2]=="..."?(l-3):(l-2)].amt.max(1).log2().max(1));
	
	if (hasUpg(15, l) && tmp.mtd[l-1]) gain = gain.times(player.materials[(tmp.mtd[l-1]=="...")?(l-2):(l-1)].amt.max(1).log10().max(1));
	if (((tmp.mtd[l+1]=="...")?tmp.mtd[l+2]:tmp.mtd[l+1]) && tmp.mg) {
		let el = (tmp.mtd[l+1]=="...")?(l+2):(l+1)
		if (hasUpg(55, el) && tmp.mg[el]) gain = gain.times(tmp.mg[el].max(1).pow(el-l));
	}
	if (l>0 && tmp.mmm[l] && hasUpg(65, l)) gain = gain.times(tmp.mmm[l].max(1).log2().times(50).max(1).sqrt());
	if (hasSuperMilestone(9) && tmp.sup) gain = gain.times(tmp.sup.max(1));
	if (player.eclipse.times.gt(0) && tmp.ec) gain = gain.times(tmp.ec.powerEff2);
	
	if (tmp.mtd[l+1]!==undefined){
		if (tmp.mtd[l+1]=="...") gain = gain.times(getMainMaterialEff(l+2));
		else gain = gain.times(getMainMaterialEff(l+1));
	}
	return gain.round();
}