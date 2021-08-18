const ECLIPSE_REQ = new Decimal("1e20750000");

function getEclipseGain() {
    let amt = player.materials[0]?player.materials[0].amt:new Decimal(0)
    let gain = amt.max(1).log(ECLIPSE_REQ).pow(2);
    if (gain.gte(8.64e6)) gain = Decimal.pow(8.64e6, gain.log(8.64e6).sqrt().plus(1).div(2))
    if (gain.lt(1)) gain = new Decimal(0);
    return gain;
}

function eclipseReset(force=false) {
    if (!force) {
        if (player.materials[0]?player.materials[0].amt.lt(ECLIPSE_REQ):true) return;
        if (player.eclipse.times.lt(10)) if (!confirm("Are you sure you want to do this reset???")) return;
        player.eclipse.times = player.eclipse.times.plus(1);
        player.eclipse.lifespan = player.eclipse.lifespan.plus(tmp.ec.gain);
        player.eclipse.total = player.eclipse.total.plus(tmp.ec.gain);
        addContraptions(Decimal.div(5, player.apparatus.total.plus(1).log10().plus(1)).floor());
    }
    player.materialsUnl = new Decimal(1);
    player.materials = [];
    if (!hasMilestone(15)) player.milestones = [];
    player.supercharger = {
        amt: new Decimal(0),
        amt2: new Decimal(0),
        amt3: new Decimal(0),
        selected: hasSuperMilestone(15)?player.supercharger.selected:[],
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
    }
    player.radioactivity = {
        ionCores: new Decimal(0),
        ions: new Decimal(0),
    }

    app.subtab = "Steel"

    loadMaterials();
    updateTemp();
    updateTemp();
}

function softcapEclipseLS(ls) {
    if (ls.gte(2.5)) ls = ls.div(2.5).sqrt().plus(1.5);
    if (hasMilestone(18) && tmp.app && ls.gte(1)) ls = ls.root(tmp.app.spd.plus(1).log10().plus(1).sqrt());
    return ls;
}
function getEclipseSpeed() { 
    let l = softcapEclipseLS(player.eclipse.lifespan);
    return player.eclipse.lifespan.times(eclipseSpeedDiv(l).log(Math.E)).times(-1) 
}
function eclipseSpeedDiv(l) { return Decimal.pow(eclipseSpeedDivBase(), l) }
function eclipseSpeedDivBase() {
    let base = new Decimal(.9);
    if (hasMilestone(18) && tmp.app) base = base.root(tmp.app.spd.plus(1).log10().plus(1).sqrt());
    return base;
}

function getEclipsePowerEff() { return player.eclipse.power.plus(1).pow(8+2*player.milestones.length).pow(hasSuperMilestone(17)?20:1) }

function getEclipsePowerEff2() {
    let a = player.materials[0]?player.materials[0].amt:new Decimal(0);
    let b = player.eclipse.power;
    if (b.gte(1.5e6)) b = b.log2().pow(5).div(2.4234);
    return Decimal.pow(10, a.plus(1).log10().times(b).cbrt());
}

function getEclipsePowerEff3() { 
    let eff = player.eclipse.power.plus(1).pow(3) 
    if (eff.gte(1e4)) eff = Decimal.pow(1e4, eff.log(1e4).sqrt())
    return eff;
}