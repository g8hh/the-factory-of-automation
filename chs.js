/*

 @name    : 锅巴汉化 - Web汉化插件
 @author  : 麦子、JAR、小蓝、好阳光的小锅巴
 @version : V0.6.1 - 2019-07-09
 @website : http://www.g8hh.com

*/

//1.汉化杂项
var cnItems = {
    _OTHER_: [],

    //未分类：
    'Save': '保存',
    'Export': '导出',
    'Import': '导入',
    'Settings': '设置',
    'Achievements': '成就',
    'Statistics': '统计',
    'Changelog': '更新日志',
    'Hotkeys': '快捷键',
    'ALL': '全部',
    'Default': '默认',
    'AUTO': '自动',
    'default': '默认',
    "Options": "选项",
    "Steel": "钢",
    "Unused Contraptions.": "未使用的装置。",
    "Offline Prod": "离线生产",
    "Main": "首页",
    "Cost": "成本",
    "Autosave": "自动保存",
    "slower": "更慢",
    "Speed: {{format(tmp.app.spd)}}x": "速度: {{format(tmp.app.spd)}}x",
    "Steel": "钢",
    "Super Batteries, which are increasing Super Charge gain by": "超级电池，增加超级充电增益",
    "Super Batteries/sec.": "超级电池/秒。",
    "Super Charge": "超级充电",
    "The Base Super Charge effect is raised": "基础超级充电效果提升",
    "UPGRADES": "升级",
    "You can Supercharge your Milestones by using Milestone Charge!": "您可以使用里程碑充电来增强您的里程碑！",
    "x Global Automator Speed": "x 全局自动化速度",
    "No more spending": "没有更多的开支",
    "of Steel's A1": "钢 A1",
    "Gold": "黄金",
    "Ionic Cores": "离子核心",
    "Eclipsal Power, which": "日食力量，其中",
    "Automator costs in later Materials increase": "后期材料中的自动机成本增加",
    "and multiplies Super Battery gain & Ion chance by": "并将超级电池增益和离子几率乘以",
    "All Super Battery Upgrade effects are multiplied by": "所有超级电池升级效果乘以",
    "All Material effects are multiplied by their amount": "所有材料效果都乘以其数量",
    "log2(A2)x A1 speed": "log2(A2)x A1 速度",
    "Milestone Charge": "里程碑充电",
    "Multiply Super Battery gain by": "将超级电池增益乘以",
    "makes Milestones multiply Automator speed by": "使里程碑乘以 自动器 速度",
    "makes Steel multiply Material gain by": "使钢铁乘以材料增益",
    "Multiply Super Battery gain by {{formatWhether(tmp.sbue2.plus(4).times(tmp.sbueMult))}}": "将超级电池增益乘以 {{formatWhether(tmp.sbue2.plus(4).times(tmp.sbueMult))}}",
    "Req: {{format(ECLIPSE_REQ)}} Steel": "需要: {{format(ECLIPSE_REQ)}} 钢",
    "Req: {{format(tmp.radResetReq)}} Super Batteries": "需要: {{format(tmp.radResetReq)}} 超级电池",
    "Reset all previous progress to increase the Eclipsal Lifespan by {{formatTime(tmp.ec.gain)}}": "重置所有先前的进度以将 日食 寿命增加 {{formatTime(tmp.ec.gain)}}",
    "Reset all Supercharger progress to gain an Ion Core": "重置所有超级充电进度以获得离子核心",
    "Post-100 scale 25% weaker": "Post-100比例 减弱25％",
    "Post-100 scale 50 later": "Post-100比例 50以后",
    "log2(A1)x Steel gain": "log2(A1)x 钢 增益",
    "Diamond": "钻石",
    "Citrine": "黄水晶",
    "Apparatus": "仪器",
    "Agate": "玛瑙",
    "Radioactivity": "放射性",
    "Reduce auto costs": "降低自动成本",
    "Ruby": "红宝石",
    "Supercharger": "超级充电",
    "Milestones": "里程碑",
    "Peridot": "橄榄石",
    "Ions": "离子",
    "Fluorite": "萤石",
    "Eclipse": "日食",
    "Each Automator gets a multiplier equal to its amount": "每个 自动器 获得一个等于其数量的乘数",
    "Anything that speeds up A2 also speeds up A1": "任何加速A2的东西也会加速A1",
    "log2(Steel)^4)x Gold gain, and reduce Gold's auto costs & Gold's A1 & A2 are 25x faster": "log2(钢)^4)x 黄金增益，并降低黄金的自动成本 & 黄金的 A1 和 A2 速度提高 25 倍",
    "log2(log2(Steel))x Steel gain, and A1 & A2 speed": "log2(log2(钢))x 钢增益，以及 A1 和 A2 速度",
    "log2(Steel))x Diamond gain & its A2 speed": "log2(钢))x 钻石增益及其 A2 速度",
    "log1.25(log1.25(A1))x Steel gain, and A1 & A2 speed": "log1.25(log1.25(A1))x 钢增益，以及 A1 和 A2 速度",
    "& improve Ionic Boost strength by": "并改进 离子 提升强度",
    "& Resource gain": "& 资源收益",
    "Auto Final A-Purchaser": "自动最终A购买者",
    "Auto-Final S": "自动最终 S",
    "Auto-Ionic Core Buyer": "自动离子核心购买器",
    "Auto-Material Clicker": "自动材料点击器",
    "Auto-Super Battery Upgrader": "自动超级电池升级器",
    "Auto-Upgrader": "自动升级器",
    "Reach 10 Eclipsal Power (SUPERCHARGED": "达到 10 日食能量（超级充电",
    "Reach 1e1,000 of Steel's A1 (SUPERCHARGED": "达到 1e1,000 钢 A1 (超级充电",
    "Super Batteries": "超级电池",
    "Upgrader": "升级器",
    "\t\t\t\tYou have": "\t\t\t\你有",
    "\t\t\t\t\tYour Super Energy is generating": "\t\t\t\t\t你的超级能量产生",
    "\t\t\t\t\tYou have": "\t\t\t\t\t你有",
    "\t\t\t\t\tEclipsal Speed": "\t\t\t\t\t日食速度",
    "\t\t\t\t\tEclipsal Lifespan": "\t\t\t\t\t日食寿命",
    "\t\t\t\t\t\t\t\tReq": "\t\t\t\t\t\t\t\t需要",
    ", which produce Ions": ", 产生离子",
    "： \"Each Automator gets a multiplier based on its amount (log10(x)+1)\" is raised": "： \"每个 自动器 得到一个基于其数量的乘数 (log10(x)+1)\" 被提升",
    "\"Each Automator gets a multiplier based on its amount (log10(x)+1)\" is raised": "\"每个 自动器 得到一个基于其数量的乘数 (log10(x)+1)\" 被提升",
    "Post-100 scale log1.25(Steel) later": "Post-100 缩放 log1.25（钢）之后",
    "Post-100 scale log2(A1)*1.9 later": "Post-100 缩放 log2(A1)*1.9 之后",
    "Add to both previous upgrade mults by {{formatWhether(tmp.sbueMult.div(4))}}": "添加到所有以前的升级乘数 {{formatWhether(tmp.sbueMult.div(4))}}",
    "Add to the previous upgrade mult by {{formatWhether(tmp.sbue3.plus(1.5).times(tmp.sbueMult))}}": "添加到前一个升级乘数 {{formatWhether(tmp.sbue3.plus(1.5).times(tmp.sbueMult))}}",
    "log10(Steel)x Gold gain": "log10(钢)x 黄金增益",
    "log2(A1)x Gold gain": "log2(A1)x 黄金增益",
    "log2(log2(Gold))x Gold gain, and A1 & A2 speed": "log2(log2(黄金))x 黄金增益, 和 A1 & A2 速度",
    "Post-100 scale log1.25(Gold) later": "Post-100 缩放 log1.25(黄金) 之后",
    "The above upgrade also applies to Steel, and anything that speeds up A2 also speeds up A1": "上述升级也适用于 钢，任何加速 A2 的东西也会加速 A1",
    "Reduce Steel's auto costs": "降低钢的自动成本",
    "Mult to Gold gain also multiplies Steel gain": "乘以黄金收益也乘以钢的收益",
    "sqrt(log2(Gold effect)*50)x Gold gain": "sqrt(log2(黄金效果)*50)x 黄金增益",
    "The Gold effect's tetration exponent is increased by 0.03 for every autobuyer unlocked (caps at +0.3": "每解锁一个自动购买者，黄金效应的 tetration 指数就会增加 0.03（上限为 +0.3",
    "log10(Gold)x Diamond gain": "log10(黄金)x 钻石增益",
    "log2(Gold)^4)x Diamond gain, and reduce Diamond's auto costs & Diamond's A1 & A2 are 25x faster": "log2(黄金)^4)x 钻石增益，并降低钻石的自动成本和钻石的 A1 和 A2 快 25 倍",
    "x Gold gain (log2(x)": "x 黄金增益 (log2(x)",
    "Reach 1e800 Steel (INCOMPLETE": "达到 1e800 钢铁（未完成",
    "INCOMPLETE": "未完成",
    "奖励: The first 7 rows of upgrades are always unlocked.": "奖励：前7行升级始终解锁。",
    "奖励: ((M+1)^2)x global automator speed.": "奖励: ((M+1)^2)x 全局自动器速度.",
    "log2(A1)x Diamond gain": "log2(A1)x 钻石增益",
    "Post-100 scale log1.25(Diamond) later": "Post-100 缩放 log1.25(钻石) 之后",
    "log2(log2(Diamond))x Diamond gain, and A1 & A2 speed": "log2(log2(钻石))x 钻石增益, 和 A1 & A2 速度",
    "Post-100 scale log1.25(Diamond) later": "Post-100 缩放 log1.25(钻石) 之后",
    "sqrt(log2(Diamond effect)*50)x Diamond gain": "sqrt(log2(钻石效果)*50)x 钻石增益",
    "The Diamond effect's tetration exponent is increased by 0.03 for every autobuyer unlocked (caps at +0.3": "每解锁一个自动购买者，钻石效应的四分法指数就会增加 0.03（上限为 +0.3",
    "Mult to Diamond gain also multiplies Gold gain": "乘以到钻石收益也乘以黄金收益",
    "log2(Diamond)^4)x Ruby gain, and reduce Ruby's auto costs & Ruby's A1 & A2 are 25x faster": "log2(钻石)^4)x 红宝石 增益，并降低 红宝石 的自动成本 & 红宝石 的 A1 和 A2 快 25 倍",
    "log10(Diamond)x Ruby gain": "log10(钻石)x 红宝石增益",
    "log2(A1)x Ruby gain": "log2(A1)x 红宝石增益",
    "log2(log2(Ruby))x Ruby gain, and A1 & A2 speed": "log2(log2(红宝石))x 红宝石增益, 和 A1 & A2 速度",
    "4x Ruby gain": "4x 红宝石增益",
    "成本: {{formatWhole(getSBUpgCost(1))}} Super Batteries": "成本: {{formatWhole(getSBUpgCost(1))}} 超级电池",
    "Mult to Ruby gain also multiplies Diamond gain": "乘以红宝石增益也乘以钻石增益",
    "Post-100 scale log1.25(Ruby) later": "Post-100 缩放 log1.25(红宝石) 之后",
    "sqrt(log2(Ruby effect)*50)x Ruby gain": "sqrt(log2(红宝石效果)*50)x 红宝石增益",
    "The Ruby effect's tetration exponent is increased by 0.03 for every autobuyer unlocked (caps at +0.3": "每解锁一个自动购买者，红宝石效应的四分法指数增加 0.03（上限为 +0.3",
    "x Diamond gain (log2(x)": "x 钻石增益 (log2(x)",
    "log2(Gold))x Ruby gain & its A2 speed": "log2(黄金))x 红宝石增益 & 它的 A2 速度",
    "log5(Gold)x A1 速度": "log5(黄金)x A1 速度",
    "COMPLETE": "完成",
    "SUPERCHARGED": "增压",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",

    //树游戏
    'Loading...': '加载中...',
    'ALWAYS': '一直',
    'HARD RESET': '硬重置',
    'Export to clipboard': '导出到剪切板',
    'INCOMPLETE': '不完整',
    'HIDDEN': '隐藏',
    'AUTOMATION': '自动',
    'NEVER': '从不',
    'ON': '打开',
    'OFF': '关闭',
    'SHOWN': '显示',
    'Play Again': '再次游戏',
    'Keep Going': '继续',
    'The Modding Tree Discord': '模型树Discord',
    'You have': '你有',
    'It took you {{formatTime(player.timePlayed)}} to beat the game.': '花费了 {{formatTime(player.timePlayed)}} 时间去通关游戏.',
    'Congratulations! You have reached the end and beaten this game, but for now...': '恭喜你！ 您已经结束并通关了本游戏，但就目前而言...',
    'Main Prestige Tree server': '主声望树服务器',
    'Reach {{formatWhole(ENDGAME)}} to beat the game!': '达到 {{formatWhole(ENDGAME)}} 去通关游戏!',
    'Loading... (If this takes too long it means there was a serious error!)←': '正在加载...（如果时间太长，则表示存在严重错误！）←',
    'Main\n\t\t\t\tPrestige Tree server': '主\n\t\t\t\t声望树服务器',
    'The Modding Tree\n\t\t\t\t\t\t\tDiscord': '模型树\n\t\t\t\t\t\t\tDiscord',
    'Please check the Discord to see if there are new content updates!': '请检查 Discord 以查看是否有新的内容更新！',
    'aqua': '水色',
    'AUTOMATION, INCOMPLETE': '自动化，不完整',
    'LAST, AUTO, INCOMPLETE': '最后，自动，不完整',
    'NONE': '无',
    'P: Reset for': 'P: 重置获得',
    'PATREON': 'PATREON',
    'DISCORD': 'DISCORD',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',

}


//需处理的前缀
var cnPrefix = {
    "(-": "(-",
    "(+": "(+",
    "(": "(",
    "-": "-",
    "+": "+",
    " ": " ",
    ": ": "： ",
    "\n": "",
    "                   ": "",
    "                  ": "",
    "                 ": "",
    "                ": "",
    "               ": "",
    "              ": "",
    "             ": "",
    "            ": "",
    "           ": "",
    "          ": "",
    "         ": "",
    "        ": "",
    "       ": "",
    "      ": "",
    "     ": "",
    "    ": "",
    "   ": "",
    "  ": "",
    " ": "",
    //树游戏
    "Show Milestones: ": "显示里程碑：",
    "Autosave: ": "自动保存: ",
    "Offline Prod: ": "离线生产: ",
    "Completed Challenges: ": "完成的挑战: ",
    "High-Quality Tree: ": "高质量树贴图: ",
    "Offline Time: ": "离线时间: ",
    "Theme: ": "主题: ",
    "Anti-Epilepsy Mode: ": "抗癫痫模式：",
    "In-line Exponent: ": "直列指数：",
    "Single-Tab Mode: ": "单标签模式：",
    "Time Played: ": "已玩时长：",
    "Currently: ": "当前: ",
    "Cost: ": "成本: ",
    "Ionic Boost": "离子加速",
    "Machines: ": "机器: ",
    "Reward: ": "奖励: ",
    "Tetrate the Gold effect by ": "tetration 黄金效应 ",
    "Each Automator gets a multiplier based on its amount ": "每个 自动器 都会根据其数量获得一个乘数",
    "x Steel gain ": "x 钢增益 ",
    "Tetrate the Ruby effect by ": "Tetrate 红宝石效果 ",
    "Tetrate the Diamond effect by ": "Tetrate 钻石效果 ",
    "x Gold gain (log2(x)^^": "x 黄金增益 (log2(x)^^",
    "Unlock Ruby (": "解锁红宝石 (",
    "Unlock Alexandrite (": "解锁 紫翠玉（",
    "Unlock Emerald (": "解锁 翡翠（",
    "Unlock Iolite (": "解锁 堇青石（",
    "Unlock Ruby (": "解锁 红宝石（",
    "Unlock Tsavorite (": "解锁 沙弗莱石（",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
}

//需处理的后缀
var cnPostfix = {
    ":": "：",
    "：": "：",
    ": ": "： ",
    "： ": "： ",
    "/s)": "/s)",
    "/s": "/s",
    ")": ")",
    "%": "%",
    "                   ": "",
    "                  ": "",
    "                 ": "",
    "                ": "",
    "               ": "",
    "              ": "",
    "             ": "",
    "            ": "",
    "           ": "",
    "          ": "",
    "         ": "",
    "        ": "",
    "       ": "",
    "      ": "",
    "     ": "",
    "    ": "",
    "   ": "",
    "  ": "",
    " ": " ",
    "\n": "",
    "\n\t\t\t\t\t\t\t": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
}

//需排除的，正则匹配
var cnExcludeWhole = [
    /^(\d+)$/,
    /^([\d\.]+)e(\d+)$/,
    /^([\d\.]+)e([\d\.,]+)x$/,
    /^e([\d\.,]+)x$/,
    /^A([\d\.,]+): ([\d\.]+)e([\d\.,]+)$/,
    /^([\d\.]+)e([\d\.,]+) A([\d\.,]+)$/,
    /^([\d\.]+)$/,
    /^([\d\.,]+)$/,
    /^([\d\.,]+)x$/,
    /^([\d\.]+)e([\d\.,]+)$/,
    /^[\u4E00-\u9FA5]+$/
];
var cnExcludePostfix = [
]

//正则替换，带数字的固定格式句子
//纯数字：(\d+)
//逗号：([\d\.,]+)
//小数点：([\d\.]+)
//原样输出的字段：(.+)
//换行加空格：\n(.+)
var cnRegReplace = new Map([
    [/^Next Ionic Boost: (.+) Ionic Cores$/, '下一个离子加速：$1 芯离子'],
    [/^You have (.+) points$/, '你有 $1 点数'],
    [/^Next at (.+) points$/, '下一个在 $1 点数'],
    [/^Reach (.+) Steel \(SUPERCHARGED$/, '达到 $1 钢 \(超级充电'],
    [/^Reach (.+) Super Batteries \(SUPERCHARGED$/, '达到 $1 超级电池 \(超级充电'],
    [/^e([\d\.,]+) Steel$/, 'e$1 钢'],
	[/^A([\d\.]+): ([\d\.]+)$/, 'A$1：$2'],
	[/^([\d\.,]+)x A([\d\.,]+) speed$/, '$1x A$2 速度'],
	[/^([\d\.,]+) A([\d\.]+)$/, '$1 A$2'],
	[/^([\d\.,]+) Diamond$/, '$1 钻石'],
	[/^([\d\.,]+) Ruby$/, '$1 红宝石'],
	[/^([\d\.,]+) Gold$/, '$1 黄金'],
	[/^([\d\.,]+) Steel$/, '$1 钢'],
	[/^([\d\.,]+)x Diamond gain$/, '$1x 钻石增益'],
	[/^([\d\.,]+)x Steel gain$/, '$1x 钢增益'],
	[/^([\d\.,]+)x Ruby gain$/, '$1x 红宝石增益'],
	[/^([\d\.,]+)x Gold gain$/, '$1x 黄金增益'],
	[/^([\d\.]+)e([\d\.,]+) Gold$/, '$1e$2 黄金'],
	[/^([\d\.]+)e([\d\.,]+) Ruby$/, '$1e$2 红宝石'],
	[/^([\d\.]+)e([\d\.,]+) Steel$/, '$1e$2 钢'],
	[/^([\d\.]+)e([\d\.,]+) Diamond$/, '$1e$2 钻石'],
	[/^log5\(Steel\)x A1 speed$/, 'log5\(钢\)x A1 速度'],
	[/^(.+)x A1 speed$/, '$1x A1 速度'],
	[/^(.+)x Steel gain$/, '$1x 钢增益'],
	[/^([\d\.]+)x Steel gain$/, '$1x 钢 增益'],
	[/^([\d\.]+)\/sec$/, '$1\/秒'],
    [/^requires ([\d\.]+) more research points$/, '需要$1个研究点'],
    [/^(\d+) Royal points$/, '$1 皇家点数'],
    [/^A(\d+): (.+)$/, 'A$1: $2'],
    [/^Cost: (\d+) RP$/, '成本：$1 皇家点数'],
    [/^Usages: (\d+)\/$/, '用途：$1\/'],
    [/^workers: (\d+)\/$/, '工人：$1\/'],

]);