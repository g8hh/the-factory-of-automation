function updateTemp() {
	updateTempGeneral();
	updateTempMilestones();
	updateTempSupercharger();
	updateTempRadioactivity();
	updateTempEclipse();
	updateTempApparatus();
}

function updateTempRadioactivity() {
	tmp.radc = Decimal.mul(getIonChanceMult().times(0.001), player.radioactivity.ionCores.pow(1.1)).min(hasMilestone(16)?1/0:1);
	tmp.radst = Decimal.div(1e6, player.radioactivity.ionCores.max(1));
	tmp.radsis = player.materials[0]?player.materials[0].amt.max(1).log10().sub(tmp.radst).max(0):new Decimal(0);
	tmp.radResetReq = getRadResetReq();
	tmp.ionCoreEff = getIonCoreEff();
	tmp.ionEff = player.radioactivity.ions.floor().plus(1).log2().times(tmp.ionCoreEff.times(3)).plus(1);
	tmp.ionEff2 = player.radioactivity.ions.floor().plus(1).log(1e10).times(tmp.ionCoreEff).plus(1).sqrt();
	tmp.ionEff3 = player.radioactivity.ions.floor().plus(1).pow(tmp.ionCoreEff.div(1.2));
	tmp.ionEff4 = player.radioactivity.ionCores.gte(6)?player.radioactivity.ions.floor().plus(1).log(1e50).times(tmp.ionCoreEff).plus(1).root(Decimal.div(2.75, player.radioactivity.ionCores.sub(5).max(1).pow(1.25)).plus(1)):new Decimal(1);
	tmp.ionEff5 = player.radioactivity.ionCores.gte(11)?Decimal.sub(1, Decimal.div(1, player.radioactivity.ions.floor().plus(1).log10().times(tmp.ionCoreEff).plus(1).log10().div(5).plus(1))):new Decimal(0)
	tmp.ionEff6 = (player.radioactivity.ionCores.gte(27)&&player.eclipse.times.gte(1))?Decimal.sub(1, Decimal.div(1, player.radioactivity.ions.plus(1).log10().times(tmp.ionCoreEff).plus(1).log10().div(30).plus(1).sqrt())):new Decimal(0);
}

function updateTempSupercharger() {
	tmp.sbuad = sbAutoDisplayed();
	tmp.sbueMult = (player.radioactivity.ionCores.gte(6)&&tmp.ionEff4)?tmp.ionEff4:new Decimal(1);
	tmp.sbue3 = Decimal.mul(tmp.sbueMult.times(0.25), hasSuperMilestone(13)?player.supercharger.upg3:0);
	tmp.sbue2 = Decimal.mul(tmp.sbue3.plus(1.5).times(tmp.sbueMult), hasSuperMilestone(10)?player.supercharger.upg2:0);
	tmp.sbue = getSBUpgEff();
	tmp.sbg = getSuperBatteryGain();
	tmp.sbe = getSuperBatteryEffect();
	tmp.sup = getSuperchargeEff();
	tmp.tsca = getTotalSuperchargeable();
}

function updateTempMilestones() {
	if (!tmp.mil) tmp.mil = [];
	for (let i=1;i<=MILESTONES_AMT;i++) {
		if (player.milestones.includes(i) || MILESTONES[i].unl()) {
			tmp.mil[i] = i;
			if (!player.milestones.includes(i)) player.milestones.push(i);
		}
	}
}

function updateTempGeneral() {
	tmp.mtd = materialsDisplayed();
	tmp.tab = app?app.subtab:subtab;
	tmp.mta = ((app?app.tab:tab)!="Main")?(app?app.tab:tab):tmp.tab;
	tmp.mti = tmp.mtd.findIndex((x,i) => tmp.mta==getMaterialName(i));
	tmp.mtpi = Math.max(tmp.mtd.findIndex(x => x=="..."?false:x.eq((tmp.mtd[tmp.mti-1]=="...")?tmp.mtd[tmp.mti-2]:tmp.mtd[tmp.mti-1])), 0);
	tmp.mtni = Math.max(tmp.mtd.findIndex(x => x=="..."?false:x.eq((tmp.mtd[tmp.mti+1]=="...")?tmp.mtd[tmp.mti+2]:tmp.mtd[tmp.mti+1])), 0);
	tmp.mtn2i = Math.max(tmp.mtd.findIndex(x => x=="..."?false:x.eq((tmp.mtd[tmp.mti+2]=="...")?tmp.mtd[tmp.mti+3]:tmp.mtd[tmp.mti+2])), 0);
	tmp.aud = Array.from(tmp.mtd, (x,i) => (x=="..."?"...":automatorsDisplayed(i)));
	if (!tmp.ausc) tmp.ausc = [];
	if (!tmp.ausd) tmp.ausd = [];
	if (!tmp.mg) tmp.mg = [];
	if (!tmp.aum) tmp.aum = [];
	if (!tmp.aup) tmp.aup = [];
	if (!tmp.tet) tmp.tet = [];
	if (!tmp.mmm) tmp.mmm = [];
	for (let m=tmp.aud.length-1;m>=0;m--) {
		if (tmp.aud[m]=="...") continue;
		tmp.ausc[m] = getAutoStartCost(m);
		tmp.ausd[m] = getAutoCostScalingData(m);
		tmp.mg[m] = getAmtGain(m);
		tmp.tet[m] = getTetrationExp(m);
		tmp.mmm[m] = getMainMaterialEff(m);
		if (!tmp.aum[m]) tmp.aum[m] = [];
		if (!tmp.aup[m]) tmp.aup[m] = [];
		for (let i=0;i<tmp.aud[m].length;i++) {
			if (tmp.aud[m][i]!="...") {
				tmp.aum[m][i] = getAutomationMult(i==0?tmp.aud[m][i]:(tmp.aud[m][i-1]=="..."?tmp.aud[m][i-2].plus(1):tmp.aud[m][i-1].plus(1)), tmp.aud[m][i], m);
				tmp.aup[m][i] = i>0?(tmp.aud[m][i-1]=='...'?tmp.aud[m][i-2]:tmp.aud[m][i-1]):new Decimal(0);
			}
		}
	}
}

function updateTempEclipse() {
	if (!tmp.ec) tmp.ec = {};
	tmp.ec.gain = getEclipseGain();
	tmp.ec.speed = getEclipseSpeed();
	tmp.ec.powerEff = getEclipsePowerEff();
	tmp.ec.powerEff2 = getEclipsePowerEff2();
	tmp.ec.powerEff3 = getEclipsePowerEff3();
}

function updateTempApparatus() {
	if (!tmp.app) tmp.app = {};
	tmp.app.spd = getApparatusSpeed();
}