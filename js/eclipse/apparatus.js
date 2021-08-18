function addContraptions(x) { 
    player.apparatus.total = player.apparatus.total.plus(x);
    player.apparatus.unused = player.apparatus.unused.plus(x);
}

function getApparatusSpeed() {
    return player.apparatus.speedUpgs.pow(2).max(0)
}

function adjustApparatus(v, x) {
    if (x>0) {
        if (player.apparatus.unused.gte(x)) {
            if (v=="rowsUnl" && player.apparatus.rowsUnl.toNumber()>=Object.keys(apparatus_row_data).length) return;
            player.apparatus.unused = player.apparatus.unused.sub(x).max(0)
            player.apparatus[v] = player.apparatus[v].plus(x)
        }
    } else {
        x = -x;
        if (player.apparatus[v].gte(x)) {
            player.apparatus[v] = player.apparatus[v].sub(x).max(0)
            player.apparatus.unused = player.apparatus.unused.plus(x)
        }
    }
}

const apparatus_row_data = {
    1: [
        {
            id: "a1",
            title: "Auto-Material Clicker",
            time: new Decimal(1),
        },
    ],
    2: [
        {
            id: "a2",
            title: "Auto Final A-Purchaser",
            time: new Decimal(5),
        },
    ],
    3: [
        {
            id: "a3",
            title: "Auto-Upgrader",
            time: new Decimal(20),
        }
    ],
    4: [
        {
            id: "a4",
            title: "Auto-Super Battery Upgrader",
            time: new Decimal(10),
        }
    ],
    5: [
        {
            id: "a5",
            title: "Auto-Ionic Core Buyer",
            time: new Decimal(120),
        }
    ],
    6: [
        {
            id: "a6",
            title: "Auto-Final S<sub>A</sub> Upgrader",
            time: new Decimal(75),
        },
    ],
}

function triggerApparatus(id, bulk) {
    if (id=="a1") {
        let mat = player.materials.filter(x => x=="..."||Decimal.lte(x.autoData[0]||0, 0));
        let mi = player.materials.map((x,i) => i).filter(i => player.materials[i]=="..."||Decimal.lte(player.materials[i].autoData[0]||0, 0));
        for (let m=0;m<mi.length;m++) {
            let i = mi[m];
            if (player.materials[i]!="..."&&player.materials[i].amt) player.materials[i].amt = Decimal.add(player.materials[i].amt||0, (tmp.mg[i]||new Decimal(0)).times(bulk));
        }
    }
    if (id=="a2") for (let m=0;m<player.materials.length;m++) {
        if (!tmp.aud[m] || player.materials[m]=="...") continue;
        let n = tmp.aud[m][tmp.aud[m].length-1];
        let i = tmp.aud[m].length-1
        let r = n.gt(1)?getAutoAmt(tmp.aup[m][i], m):player.materials[m].amt;
        let c = getAutomatorCost(getAutoAmt(n, m), n.sub(tmp.aup[m][i]), n, m);
        if (r.lt(c) && i>0) buyAuto(n.sub(1), m, bulk); 
        else buyAuto(n, m, bulk);
    }
    if (id=="a3") for (let m=0;m<player.materials.length;m++) if (player.materials[m]!="..." && tmp.mtd[m]!==undefined) {
        let bought = 0;
        for (let r=1;r<=UPGS.rows;r++) for (let c=1;c<=UPGS.cols;c++) if (UPGS[r*10+c]!==undefined && !hasUpg(r*10+c, m) && (UPGS[r*10+c].unlocked(m)||(r<=7&&hasMilestone(1))||hasSuperMilestone(1)) && ((tmp.mtd[m].gt(0)?UPGS[r*10+c].layered:UPGS[r*10+c].right)||(!UPGS[r*10+c].right&&!UPGS[r*10+c].layered))) {
            if (buyUpg(r*10+c, m)) bought++;
            if (bulk.lte(bought)) break;
        }
    }
    if (id=="a4") for (let i=1;i<=3;i++) buySBUpg(i, bulk);
    if (id=="a5") ionCoreReset(bulk);
    if (id=="a6") for (let x=1;x<=3;x++) for (let l=0;l<tmp.sbuad;l++) buySBAuto(x, l, bulk);
}

function apparatusTick(diff) {
    for (let r=1;r<=Math.min(player.apparatus.rowsUnl.toNumber(), Object.keys(apparatus_row_data).length);r++) {
        for (let p in (apparatus_row_data[r]||[])) {
            let data = apparatus_row_data[r][p]
            player.apparatus.data[data.id] = (player.apparatus.data[data.id]||new Decimal(0)).plus(tmp.app.spd.times(diff))
            if (player.apparatus.data[data.id].gte(data.time)) {
                let bulk = player.apparatus.data[data.id].div(data.time).floor();
                triggerApparatus(data.id, bulk);
                player.apparatus.data[data.id] = new Decimal(0);
            }
        }
    }
}