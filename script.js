const dateInput = document.querySelector('#date-input');
const timeInput = document.querySelector('#time-input');
const previousDayButton = document.querySelector('#previous-day');
const nextDayButton = document.querySelector('#next-day');
const previousMonthButton = document.querySelector('#previous-month');
const nextMonthButton = document.querySelector('#next-month');
const todayButton = document.querySelector('#today-button');
const topButton = document.querySelector('#top-button');
const dialScene = document.querySelector('#dial-scene');
const orbitalDial = document.querySelector('.orbital-dial');
const hourGrid = document.querySelector('#hour-grid');
const useCaseSelect = document.querySelector('#usecase-select');
const zodiacSelect = document.querySelector('#zodiac-select');
const directionSelect = document.querySelector('#direction-select');

const BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
const OPPOSITE_BRANCH = { 子: '午', 丑: '未', 寅: '申', 卯: '酉', 辰: '戌', 巳: '亥', 午: '子', 未: '丑', 申: '寅', 酉: '卯', 戌: '辰', 亥: '巳' };
const HOUR_RANGES = ['23:00–00:59', '01:00–02:59', '03:00–04:59', '05:00–06:59', '07:00–08:59', '09:00–10:59', '11:00–12:59', '13:00–14:59', '15:00–16:59', '17:00–18:59', '19:00–20:59', '21:00–22:59'];
const HOUR_STARTS = [23, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21];
const CHINESE_MONTHS = ['正月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '冬月', '腊月'];
const ELEMENT_COLORS = {
  木: { name: '青、绿色', note: '取木行色，外套以青绿为主。', swatch: 'linear-gradient(135deg,#c9f5d5 0%,#3e9d6c 48%,#123829 100%)' },
  火: { name: '红、紫色', note: '取火行色，外套以红紫为主。', swatch: 'linear-gradient(135deg,#ffd4cd 0%,#d96164 48%,#452346 100%)' },
  土: { name: '黄、棕色', note: '取土行色，外套以黄棕为主。', swatch: 'linear-gradient(135deg,#fff0bf 0%,#d6a256 48%,#5a3c24 100%)' },
  金: { name: '白、银、金色', note: '取金行色，外套以白、银或浅金为主。', swatch: 'linear-gradient(135deg,#ffffff 0%,#dfe4ed 40%,#d1ac64 100%)' },
  水: { name: '黑、蓝黑色', note: '取水行色，外套以黑蓝为主。', swatch: 'linear-gradient(135deg,#c9dcff 0%,#476ebd 42%,#10172d 100%)' },
};
const SUN_TIME = { 甲: ['未'], 己: ['未'], 丁: ['申'], 壬: ['申'], 乙: ['申'], 庚: ['申'], 丙: ['辰'], 辛: ['辰'], 戊: ['卯'], 癸: ['卯'] };
const MOON_TIME = { 甲: ['丑', '戌'], 己: ['丑', '戌'], 丙: ['丑', '戌'], 辛: ['丑', '戌'], 乙: ['巳'], 庚: ['巳'], 丁: ['寅', '亥'], 壬: ['寅', '亥'], 戊: ['午'], 癸: ['午'] };
const OFFICER_GUIDANCE = {
  建: '建日：宜立事、拜访、上官赴任；动土修造再过星宿与神煞。', 除: '除日：宜除旧、清理、求医；喜庆大事不作首选。', 满: '满日：宜纳财、宴请、丰收；诉讼、安葬、修造不取。', 平: '平日：宜日常用事、修补；重大开创事不作首选。', 定: '定日：宜定约、安床、交易；诉讼、出行再审。', 执: '执日：宜执行、祭祀、订约；搬迁、开市不取。', 破: '破日：主破败，婚嫁、开业、入宅、安葬不取。', 危: '危日：主险，登高、远行、重大动土慎用。', 成: '成日：宜成事、开业、婚嫁、入宅；官讼不取。', 收: '收日：宜收纳、交易、捕捉；开业、安葬不取。', 开: '开日：宜开市、出行、求财、就职；安葬不取。', 闭: '闭日：宜闭藏、修整；开业、出行、嫁娶不取。',
};
const DAY_DEITY_GUIDANCE = {
  青龙: '青龙黄道：利有攸往、求事、见贵。', 明堂: '明堂黄道：利拜见、文书、会面、正事。', 金匮: '金匮黄道：利守财、筹划、婚姻类事务。', 天德: '天德黄道：出行、求事、正经办事可取。', 玉堂: '玉堂黄道：利文书、喜庆、拜会、求财。', 司命: '司命黄道：白天正事可取。',
  天刑: '天刑黑道：普通谋事不取，慎诉讼与口舌。', 朱雀: '朱雀黑道：易起口舌、争执、官非。', 白虎: '白虎黑道：车动、动刀、动工均慎用。', 天牢: '天牢黑道：主拘束限制，普通用事不取。', 玄武: '玄武黑道：正经事可酌情，暗昧之事不取。', 勾陈: '勾陈黑道：合作、纠纷、分合易缠，尽量避用。',
};
const USE_CASES = [
  { id: '婚嫁', label: '婚嫁／领证', terms: ['嫁娶', '纳采', '订盟', '会亲友'], avoid: ['安葬', '破土'], colorSource: '喜神' },
  { id: '入宅', label: '入宅／安床', terms: ['入宅', '移徙', '安床'], avoid: ['安葬', '破土'], colorSource: '福神' },
  { id: '开工', label: '开工／修造', terms: ['修造', '动土', '竖柱', '上梁'], avoid: ['安葬'], colorSource: '财神', construction: true },
  { id: '开业', label: '开业／开市', terms: ['开市', '交易', '立券', '纳财'], avoid: ['安葬', '破土'], colorSource: '财神' },
  { id: '签约', label: '签约／拜访', terms: ['交易', '立券', '纳财', '订盟'], avoid: ['词讼'], colorSource: '阳贵' },
  { id: '考试', label: '考试／文书', terms: ['祈福', '求嗣', '赴任'], avoid: ['词讼'], colorSource: '文昌' },
  { id: '远行', label: '远行／赴任', terms: ['出行', '赴任', '祈福'], avoid: ['安葬'], colorSource: '喜神' },
  { id: '安葬', label: '安葬／立碑', terms: ['安葬', '破土', '修坟'], avoid: ['嫁娶'], colorSource: '福神', construction: true },
];

const ZODIACS = [{ label: '不填生肖', value: '' }, { label: '鼠 · 子', value: '子' }, { label: '牛 · 丑', value: '丑' }, { label: '虎 · 寅', value: '寅' }, { label: '兔 · 卯', value: '卯' }, { label: '龙 · 辰', value: '辰' }, { label: '蛇 · 巳', value: '巳' }, { label: '马 · 午', value: '午' }, { label: '羊 · 未', value: '未' }, { label: '猴 · 申', value: '申' }, { label: '鸡 · 酉', value: '酉' }, { label: '狗 · 戌', value: '戌' }, { label: '猪 · 亥', value: '亥' }];
const BRANCH_ZODIAC = { 子: '鼠', 丑: '牛', 寅: '虎', 卯: '兔', 辰: '龙', 巳: '蛇', 午: '马', 未: '羊', 申: '猴', 酉: '鸡', 戌: '狗', 亥: '猪' };
const DIRECTIONS = [{ label: '不填门向／坐向', value: '', branches: [] }, { label: '坎 · 正北', value: '坎', branches: ['子'] }, { label: '艮 · 东北', value: '艮', branches: ['丑', '寅'] }, { label: '震 · 正东', value: '震', branches: ['卯'] }, { label: '巽 · 东南', value: '巽', branches: ['辰', '巳'] }, { label: '离 · 正南', value: '离', branches: ['午'] }, { label: '坤 · 西南', value: '坤', branches: ['未', '申'] }, { label: '兑 · 正西', value: '兑', branches: ['酉'] }, { label: '乾 · 西北', value: '乾', branches: ['戌', '亥'] }];
const CLASHES = { 子: '午', 丑: '未', 寅: '申', 卯: '酉', 辰: '戌', 巳: '亥', 午: '子', 未: '丑', 申: '寅', 酉: '卯', 戌: '辰', 亥: '巳' };
const HARMS = { 子: '未', 丑: '午', 寅: '巳', 卯: '辰', 辰: '卯', 巳: '寅', 午: '丑', 未: '子', 申: '亥', 酉: '戌', 戌: '酉', 亥: '申' };
const BREAKS = { 子: '酉', 丑: '辰', 寅: '亥', 卯: '午', 辰: '丑', 巳: '申', 午: '卯', 未: '戌', 申: '巳', 酉: '子', 戌: '未', 亥: '寅' };
const PUNISHMENTS = { 子: ['卯'], 丑: ['未', '戌'], 寅: ['巳', '申'], 卯: ['子'], 辰: ['辰'], 巳: ['寅', '申'], 午: ['午'], 未: ['丑', '戌'], 申: ['寅', '巳'], 酉: ['酉'], 戌: ['丑', '未'], 亥: ['亥'] };
const POSITION_ELEMENT = { 北: '水', 东北: '土', 东: '木', 东南: '木', 南: '火', 西南: '土', 西: '金', 西北: '金', 坎: '水', 艮: '土', 震: '木', 巽: '木', 离: '火', 坤: '土', 兑: '金', 乾: '金' };
const WENCHANG = { 甲: '巳', 乙: '午', 丙: '申', 丁: '酉', 戊: '申', 己: '酉', 庚: '亥', 辛: '子', 壬: '寅', 癸: '卯' };
const SAN_SHA = { '申子辰': '南', '寅午戌': '北', '亥卯未': '西', '巳酉丑': '东' };
const YANG_GONG = { 1: [13], 2: [11], 3: [9], 4: [7], 5: [5], 6: [3], 7: [1, 29], 8: [27], 9: [25], 10: [23], 11: [21], 12: [19] };
const TIAN_DE = { 1: '丁', 2: '申', 3: '壬', 4: '辛', 5: '亥', 6: '甲', 7: '癸', 8: '寅', 9: '丙', 10: '乙', 11: '巳', 12: '庚' };
const YUE_DE = { 1: '丙', 2: '甲', 3: '壬', 4: '庚', 5: '丙', 6: '甲', 7: '壬', 8: '庚', 9: '丙', 10: '甲', 11: '壬', 12: '庚' };
const TIAN_YI = { 甲: ['丑', '未'], 戊: ['丑', '未'], 庚: ['丑', '未'], 乙: ['子', '申'], 己: ['子', '申'], 丙: ['亥', '酉'], 丁: ['亥', '酉'], 壬: ['卯', '巳'], 癸: ['卯', '巳'], 辛: ['寅', '午'] };
const DU_TIAN = { '甲己': ['戊辰', '己巳'], '乙庚': ['戊寅', '己卯'], '丙辛': ['戊戌', '己亥'], '丁壬': ['戊申', '己酉'], '戊癸': ['戊午', '己未'] };

let currentData = null;
let selectedUseCase = '婚嫁';
let calendarCursor = null;
let selectedZodiac = '';
let selectedDirection = '';

function isoFromParts(year, month, day) { return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`; }
function normalizedIso(year, month, day) { const date = new Date(Date.UTC(year, month - 1, day)); return isoFromParts(date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate()); }
function parseIso(iso) { const [year, month, day] = iso.split('-').map(Number); return { year, month, day }; }
function shiftIso(iso, amount) { const { year, month, day } = parseIso(iso); const next = new Date(Date.UTC(year, month - 1, day + amount)); return isoFromParts(next.getUTCFullYear(), next.getUTCMonth() + 1, next.getUTCDate()); }
function todayIso() { const formatter = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit' }); const parts = Object.fromEntries(formatter.formatToParts(new Date()).filter(({ type }) => type !== 'literal').map(({ type, value }) => [type, value])); return `${parts.year}-${parts.month}-${parts.day}`; }
function getHourIndex(time) { const hour = Number((time || '09:30').split(':')[0]); return Math.floor(((hour + 1) % 24) / 2); }
function isGood(value) { return value === '吉'; }
function officerQuality(officer) { if (['成', '开', '定', '满'].includes(officer)) return '吉'; if (['破', '危', '闭'].includes(officer)) return '凶'; return '平'; }
function safeList(value) { return Array.isArray(value) ? value.filter(Boolean) : []; }
function xunVirtual(xunKong) { return [...xunKong].map((branch) => OPPOSITE_BRANCH[branch]).join(''); }
function tianYuanTimes(dayStem) { return { sun: SUN_TIME[dayStem] || [], moon: MOON_TIME[dayStem] || [] }; }
function systemScore(data) { return [isGood(data.deityLuck), data.officerLuck === '吉', isGood(data.xiuLuck)].filter(Boolean).length; }
function isYellowDay(data) { return isGood(data.deityLuck); }
function setText(selector, value) { const node = document.querySelector(selector); if (node) node.textContent = value; }
function setCursorToData(data) { calendarCursor = { year: data.year, month: data.month }; }
function getCase() { return USE_CASES.find(({ id }) => id === selectedUseCase) || USE_CASES[0]; }
function matchingItems(items, terms) { return items.filter((item) => terms.some((term) => item.includes(term))); }
function branchRelation(dayBranch, targetBranch) {
  if (!targetBranch) return { type: '未填', label: '未填' };
  if (CLASHES[dayBranch] === targetBranch) return { type: '冲', label: `日支${dayBranch}冲${targetBranch}` };
  if ((PUNISHMENTS[dayBranch] || []).includes(targetBranch)) return { type: '刑', label: `日支${dayBranch}刑${targetBranch}` };
  if (HARMS[dayBranch] === targetBranch) return { type: '害', label: `日支${dayBranch}害${targetBranch}` };
  if (BREAKS[dayBranch] === targetBranch) return { type: '破', label: `日支${dayBranch}破${targetBranch}` };
  return { type: '合格', label: `日支${dayBranch}不冲${targetBranch}` };
}
function elementForPosition(position) {
  const normalized = String(position || '').replace(/[（(].*/, '');
  return Object.entries(POSITION_ELEMENT).find(([key]) => normalized.includes(key))?.[1] || '土';
}
function annualSanSha(yearBranch) { return Object.entries(SAN_SHA).find(([branches]) => branches.includes(yearBranch))?.[1] || '—'; }

function getDayData(iso) {
  if (typeof Solar === 'undefined') throw new Error('历法引擎未加载。请检查网络连接后重试。');
  const { year, month, day } = parseIso(iso);
  const solar = Solar.fromYmd(year, month, day);
  const lunar = solar.getLunar();
  const dayPillar = lunar.getDayInGanZhi();
  const dayStem = dayPillar.charAt(0);
  const dayBranch = dayPillar.charAt(1);
  const yearPillar = lunar.getYearInGanZhi();
  const yearBranch = yearPillar.charAt(1);
  const lunarMonthNumber = Math.abs(lunar.getMonth());
  const lunarDayNumber = lunar.getDay();
  const tianDePosition = TIAN_DE[lunarMonthNumber];
  const yueDePosition = YUE_DE[lunarMonthNumber];
  const duTianValues = Object.entries(DU_TIAN).find(([stems]) => stems.includes(yearPillar.charAt(0)))?.[1] || [];
  const deityLuck = lunar.getDayTianShenLuck();
  const deity = lunar.getDayTianShen();
  const officer = lunar.getZhiXing();
  const xiuLuck = lunar.getXiuLuck();
  const xiu = `${lunar.getXiu()}${lunar.getZheng()}${lunar.getAnimal()}`;
  const xunKong = lunar.getDayXunKong();
  const data = {
    iso, year, month, day, solar, lunar, dayPillar, dayStem, dayBranch, yearPillar, yearBranch, deity, deityLuck, officer, officerLuck: officerQuality(officer), xiu, xiuLuck,
    xun: lunar.getDayXun(), xunKong, virtual: xunVirtual(xunKong), wutu: tianYuanTimes(dayStem),
    wealth: `${lunar.getDayPositionCai()}（${lunar.getDayPositionCaiDesc()}）`, joy: `${lunar.getDayPositionXi()}（${lunar.getDayPositionXiDesc()}）`, yangGui: `${lunar.getDayPositionYangGui()}（${lunar.getDayPositionYangGuiDesc()}）`, yinGui: `${lunar.getDayPositionYinGui()}（${lunar.getDayPositionYinGuiDesc()}）`, fu: `${lunar.getDayPositionFu()}（${lunar.getDayPositionFuDesc()}）`,
    solarTerm: lunar.getJieQi() || (lunar.getPrevJieQi(true)?.getName() || '节气间'), yi: safeList(lunar.getDayYi()), ji: safeList(lunar.getDayJi()), jiShen: safeList(lunar.getDayJiShen()), xiongSha: safeList(lunar.getDayXiongSha()),
    dayChongDesc: lunar.getDayChongDesc(), dayChongZodiac: lunar.getDayChongShengXiao(), daySha: lunar.getDaySha(), tai: lunar.getDayPositionTai(),
    lunarMonthNumber, lunarDayNumber, yangGong: (YANG_GONG[lunarMonthNumber] || []).includes(lunarDayNumber), sanSha: annualSanSha(yearBranch),
    tianDePosition, yueDePosition, hasTianDe: dayPillar.includes(tianDePosition), hasYueDe: dayPillar.includes(yueDePosition), hasTianYi: (TIAN_YI[dayStem] || []).includes(dayBranch), hasWenChang: WENCHANG[dayStem] === dayBranch, duTian: duTianValues.includes(dayPillar),
    lunarLabel: `农历${lunar.getMonthInChinese()}月${lunar.getDayInChinese()}`, fullPillars: `${yearPillar}年 · ${lunar.getMonthInGanZhi()}月 · ${dayPillar}日`, weekday: `星期${solar.getWeekInChinese()}`,
  };
  data.hours = BRANCHES.map((branch, index) => {
    const calculationHour = index === 0 ? 0 : HOUR_STARTS[index];
    const hourLunar = Solar.fromYmdHms(year, month, day, calculationHour, 30, 0).getLunar();
    const markers = [];
    if (data.wutu.sun.includes(branch)) markers.push('太阳时');
    if (data.wutu.moon.includes(branch)) markers.push('太阴时');
    return { branch, index, angle: index * 30, range: HOUR_RANGES[index], pillar: hourLunar.getTimeInGanZhi(), deity: hourLunar.getTimeTianShen(), quality: hourLunar.getTimeTianShenLuck(), clash: `冲${hourLunar.getTimeChongShengXiao()} · 煞${hourLunar.getTimeSha()}`, yi: safeList(hourLunar.getTimeYi()), ji: safeList(hourLunar.getTimeJi()), markers };
  });
  return data;
}

function directVerdict(data) {
  const score = systemScore(data);
  const base = `日值${data.deity}${isYellowDay(data) ? '黄道' : '黑道'}；建除为${data.officer}日；演禽为${data.xiu}${data.xiuLuck}宿。`;
  if (data.yangGong) return `${base} 农历${data.lunar.getMonthInChinese()}月${data.lunar.getDayInChinese()}为杨公忌日，大事不取。`;
  if (score === 3) return `${base} 黄道、建除、演禽三项皆吉，可进入事项、生肖、主向与吉时复核。`;
  if (score === 2) return `${base} 三项两吉，可作候选；先避冲刑与该事项的大忌，再取黄道吉时。`;
  if (score === 1) return `${base} 三项未齐，婚嫁、入宅、开工、安葬不列为首选。`;
  return `${base} 三项不占优，重大用事改取他日；日期无法调整时，只保留黄道吉时。`;
}

function renderTags(element, items, emptyLabel) {
  element.innerHTML = '';
  (items.length ? items.slice(0, 7) : [emptyLabel]).forEach((item) => { const tag = document.createElement('span'); tag.textContent = item; element.appendChild(tag); });
}

function renderQuickDays() {
  const root = document.querySelector('#quick-days');
  root.innerHTML = '';
  ['今日', '明日', '后日', '大后日'].forEach((label, offset) => {
    const iso = shiftIso(todayIso(), offset);
    const data = getDayData(iso);
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `quick-day${iso === currentData.iso ? ' is-current' : ''}`;
    button.innerHTML = `<span>${label}</span><b>${data.dayPillar}</b><small>${String(data.month).padStart(2, '0')}.${String(data.day).padStart(2, '0')} · ${isYellowDay(data) ? '黄道' : '黑道'}</small>`;
    button.addEventListener('click', () => { dateInput.value = iso; updateDay(); });
    root.appendChild(button);
  });
}

function weekStart(iso) {
  const { year, month, day } = parseIso(iso);
  const weekday = new Date(Date.UTC(year, month - 1, day)).getUTCDay();
  return shiftIso(iso, weekday === 0 ? -6 : 1 - weekday);
}

function renderWeek() {
  const root = document.querySelector('#week-strip');
  const start = weekStart(currentData.iso);
  const end = shiftIso(start, 6);
  setText('#week-range', `${start.slice(5).replace('-', '.')} — ${end.slice(5).replace('-', '.')}`);
  root.innerHTML = '';
  ['周一', '周二', '周三', '周四', '周五', '周六', '周日'].forEach((label, index) => {
    const iso = shiftIso(start, index);
    const data = getDayData(iso);
    const score = systemScore(data);
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `week-day is-${isYellowDay(data) ? 'yellow' : 'black'}${iso === currentData.iso ? ' is-selected' : ''}`;
    button.innerHTML = `<span class="week-label">${label}</span><span class="week-date">${data.day}</span><span class="week-pill">${data.dayPillar}</span><span class="week-status">${data.deity}${isYellowDay(data) ? ' · 黄道' : ' · 黑道'}</span><span class="week-score">三家 ${score} 吉</span>`;
    button.addEventListener('click', () => { dateInput.value = iso; updateDay(); document.querySelector('#top').scrollIntoView({ behavior: 'smooth' }); });
    root.appendChild(button);
  });
}

function renderMonth() {
  if (!calendarCursor) setCursorToData(currentData);
  const root = document.querySelector('#month-calendar');
  const { year, month } = calendarCursor;
  const first = new Date(Date.UTC(year, month - 1, 1));
  const leading = (first.getUTCDay() + 6) % 7;
  const days = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const previousDays = new Date(Date.UTC(year, month - 1, 0)).getUTCDate();
  const totalCells = Math.ceil((leading + days) / 7) * 7;
  let yellowCount = 0;
  let threeCount = 0;
  root.innerHTML = '';
  for (let cell = 0; cell < totalCells; cell += 1) {
    const offset = cell - leading;
    const inMonth = offset >= 0 && offset < days;
    const iso = normalizedIso(year, month, offset + 1);
    const data = getDayData(iso);
    const score = systemScore(data);
    if (inMonth && isYellowDay(data)) yellowCount += 1;
    if (inMonth && score === 3) threeCount += 1;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `month-day is-${isYellowDay(data) ? 'yellow' : 'black'}${iso === currentData.iso ? ' is-selected' : ''}${inMonth ? '' : ' is-outside'}`;
    button.innerHTML = `<span class="month-date">${data.day}</span><span class="month-pillar">${data.dayPillar}</span><span class="month-signal">${isYellowDay(data) ? '黄' : '黑'} · ${score}</span>`;
    button.setAttribute('aria-label', `选择 ${iso} ${data.dayPillar}日`);
    button.addEventListener('click', () => { dateInput.value = iso; updateDay(); });
    root.appendChild(button);
  }
  setText('#month-label', `${year} 年 ${month} 月`);
  setText('#month-yellow-count', yellowCount);
  setText('#month-three-count', threeCount);
}

function fillSelect(select, items, selectedValue) {
  if (!select) return;
  select.innerHTML = '';
  items.forEach(({ label, value }) => { const option = document.createElement('option'); option.value = value; option.textContent = label; option.selected = value === selectedValue; select.appendChild(option); });
}

function renderUseCaseTabs() {
  fillSelect(useCaseSelect, USE_CASES.map(({ id, label }) => ({ value: id, label })), selectedUseCase);
  fillSelect(zodiacSelect, ZODIACS, selectedZodiac);
  fillSelect(directionSelect, DIRECTIONS, selectedDirection);
}

function branchElement(branch) {
  if ('寅卯'.includes(branch)) return '木';
  if ('巳午'.includes(branch)) return '火';
  if ('申酉'.includes(branch)) return '金';
  if ('亥子'.includes(branch)) return '水';
  return '土';
}

function renderClothingRecommendation(data, useCase) {
  let sourceName = useCase.colorSource;
  let sourcePosition = '';
  if (sourceName === '喜神') sourcePosition = data.joy;
  if (sourceName === '财神') sourcePosition = data.wealth;
  if (sourceName === '福神') sourcePosition = data.fu;
  if (sourceName === '阳贵') sourcePosition = data.yangGui;
  if (sourceName === '文昌') sourcePosition = WENCHANG[data.dayStem];
  const element = sourceName === '文昌' ? branchElement(sourcePosition) : elementForPosition(sourcePosition);
  const color = ELEMENT_COLORS[element];
  setText('#wear-colors', color.name);
  setText('#color-note', `${useCase.label}取${sourceName}${sourcePosition ? `（${sourcePosition}）` : ''}，转${element}行色。`);
  setText('#wear-reason', color.note);
  const swatch = document.querySelector('.swatch');
  if (swatch) swatch.style.background = color.swatch;
}

function renderProfileCheck(data, useCase) {
  const zodiacRelation = branchRelation(data.dayBranch, selectedZodiac);
  const zodiacName = selectedZodiac ? `${BRANCH_ZODIAC[selectedZodiac]} · ${selectedZodiac}` : '';
  setText('#profile-relation', selectedZodiac ? `${zodiacRelation.label}（${zodiacRelation.type}）` : '未填生肖');
  setText('#profile-relation-note', selectedZodiac ? (zodiacRelation.type === '合格' ? `主事生肖为${zodiacName}，当天日支不冲；仍按事项复核。` : `主事生肖为${zodiacName}，${zodiacRelation.type}为课程优先避项。`) : '填写主事生肖后，先核对日支冲刑破害。');
  const direction = DIRECTIONS.find(({ value }) => value === selectedDirection);
  const directionRelations = direction?.branches.map((branch) => branchRelation(data.dayBranch, branch)) || [];
  const directionConflict = directionRelations.find(({ type }) => type === '冲');
  setText('#direction-relation', direction ? (directionConflict ? `日支${data.dayBranch}冲${direction.value}向` : `${direction.value}向未被日支冲`) : '未填主向');
  let directionNote = direction ? `主向取${direction.label}；日支不冲主向。` : '填写门向或坐向后，核对日支是否相冲。';
  if (directionConflict) directionNote = `日支${data.dayBranch}冲${direction.value}向，搬家、开业、动工不取该日为主用。`;
  if (useCase.construction && direction?.label.includes(data.sanSha)) directionNote += ` ${data.yearPillar}年三煞在${data.sanSha}，动土修造避该方。`;
  setText('#direction-relation-note', directionNote);
}

function renderUseCaseVerdict() {
  const useCase = getCase();
  const dayMatches = matchingItems(currentData.yi, useCase.terms);
  const dayAvoids = matchingItems(currentData.ji, useCase.avoid);
  const candidateHours = currentData.hours.filter((hour) => isGood(hour.quality) && matchingItems(hour.yi, useCase.terms).length);
  const fallbackHours = currentData.hours.filter((hour) => isGood(hour.quality));
  const bestHours = candidateHours.length ? candidateHours : fallbackHours;
  const timeText = bestHours.slice(0, 3).map((hour) => `${hour.branch}时`).join('、') || '当日未取到黄道时';
  const dayGate = isYellowDay(currentData) ? `${currentData.deity}黄道` : `${currentData.deity}黑道`;
  const yiText = dayMatches.length ? `通胜列宜：${dayMatches.join('、')}。` : `通胜未将${useCase.label}列为主宜。`;
  const jiText = dayAvoids.length ? `本日所忌含${dayAvoids.join('、')}。` : '';
  setText('#usecase-label', `${useCase.label} · ${dayGate} · ${currentData.officer}日`);
  const yangGongText = currentData.yangGong ? '本日为杨公忌日，重大用事不取。' : '';
  const duTianText = useCase.construction && currentData.duTian ? '本日犯戊己都天，动土、修造、安葬不取。' : '';
  const specialistText = useCase.id === '签约' && currentData.hasTianYi ? '日支临天乙贵人，利见客户、求助、签约。' : useCase.id === '考试' && currentData.hasWenChang ? '日支临文昌，利考试、文书、写作与面试。' : '';
  setText('#usecase-verdict', `${yiText}${jiText}${yangGongText}${duTianText}${specialistText} ${DAY_DEITY_GUIDANCE[currentData.deity] || ''}`);
  setText('#usecase-timing', `择时：${timeText}优先；行动落在时辰中段，并逐项复核时冲与时忌。`);
  renderProfileCheck(currentData, useCase);
  renderClothingRecommendation(currentData, useCase);
}

function renderHours(selectedIndex) {
  const useCase = getCase();
  hourGrid.innerHTML = '';
  currentData.hours.forEach((item, index) => {
    const matched = matchingItems(item.yi, useCase.terms).length > 0;
    const action = item.yi.slice(0, 3).join('、') || '时宜未列';
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `hour-row is-${isGood(item.quality) ? 'good' : 'bad'}${index === selectedIndex ? ' is-selected' : ''}${matched ? ' is-preferred' : ''}`;
    button.setAttribute('aria-pressed', String(index === selectedIndex));
    button.innerHTML = `<span class="branch">${item.branch}</span><span class="hour-main"><b>${item.range} · ${item.pillar}</b><span>${item.clash}</span><small class="hour-action">时宜：${action}</small></span><span class="hour-status">${item.quality}</span><span class="hour-deity">${item.deity}${item.markers.length ? ` <b class="wutu-marker">· ${item.markers.join(' / ')}</b>` : ''}</span>`;
    button.addEventListener('click', () => { timeInput.value = `${String(HOUR_STARTS[index]).padStart(2, '0')}:30`; updateSelectedHour(); });
    hourGrid.appendChild(button);
  });
}

function renderCourseGates(data) {
  const yellow = isYellowDay(data);
  const sunMoon = `太阳${data.wutu.sun.join('') || '—'} · 太阴${data.wutu.moon.join('') || '—'}`;
  const filter = `建除${data.officerLuck} · 演禽${data.xiuLuck}`;
  const warnings = [data.yangGong ? '杨公忌' : '', data.duTian ? '戊己都天' : '', data.xiongSha.slice(0, 2).join('、')].filter(Boolean).join('；') || '未见课程主忌';
  setText('#gate-huangdao', `${data.deity}${yellow ? '黄道' : '黑道'} · ${data.deityLuck}`);
  setText('#gate-huangdao-note', yellow ? '第一关可过；再用黄道时落到具体时刻。' : '第一关未过；大事改取黄道日，定期不改时只保黄道时。');
  setText('#gate-wutu', sunMoon);
  setText('#gate-wutu-note', '太阳、太阴只在前三关合格后加分，不单独定吉。');
  setText('#gate-filter', filter);
  setText('#gate-filter-note', `${data.officer}日；${data.xiu}${data.xiuLuck}宿，按事项取舍。`);
  setText('#gate-avoid', warnings);
  const blessings = [data.hasTianDe ? '天德' : '', data.hasYueDe ? '月德' : '', data.hasTianYi ? '天乙' : '', data.hasWenChang ? '文昌' : ''].filter(Boolean).join('、');
  setText('#gate-avoid-note', `日冲${data.dayChongZodiac}、煞${data.daySha}；${blessings ? `吉神见${blessings}。` : '再审主事生肖与主向。'}`);
}

function renderDay(data) {
  const heroMonth = CHINESE_MONTHS[data.month - 1] || `${data.month}月`;
  const yellow = isYellowDay(data);
  const score = systemScore(data);
  const badge = document.querySelector('#day-badge');
  document.title = `观时｜${data.iso} ${data.dayPillar}日择日与择时`;
  setText('#header-date', `${data.iso.replaceAll('-', ' · ')} · ${data.dayPillar}日课`);
  setText('#hero-month', heroMonth); setText('#hero-day', data.lunar.getDayInChinese());
  setText('#hero-summary', `${data.lunarLabel}，${data.weekday}。${data.fullPillars}；日值${data.deity}${yellow ? '黄道' : '黑道'}，建除${data.officer}日，二十八宿${data.xiu}（${data.xiuLuck}）。`);
  setText('#hero-ganzhi', data.fullPillars); setText('#hero-quality', `${yellow ? '黄道' : '黑道'} · 三家 ${score} 吉`);
  setText('#observatory-weekday', data.weekday); setText('#observatory-pillar', data.dayPillar); setText('#observatory-deity', `${data.deity}${yellow ? ' · 黄道' : ' · 黑道'}`); setText('#observatory-officer', `${data.officer}日`); setText('#observatory-xiu', data.xiu); setText('#observatory-clash', `冲${data.dayChongZodiac}`);
  setText('#dial-pillar', data.dayPillar); setText('#dial-deity', `${data.deity} · ${yellow ? '黄道' : '黑道'}`); setText('#dial-lunar', data.lunarLabel); setText('#day-deity', data.deity);
  badge.className = `fortune-badge ${yellow ? 'is-good' : ''}`; badge.textContent = `${yellow ? '黄道' : '黑道'} · ${data.deityLuck}`;
  setText('#direct-verdict', directVerdict(data)); setText('#system-count', `三家 ${score} 吉 · ${3 - score} 非吉`);
  setText('#zhi-xing', `${data.officer}日`); setText('#xiu', data.xiu); setText('#xiu-note', `${OFFICER_GUIDANCE[data.officer] || ''} 星宿${data.xiuLuck}，演禽按事项复核。`); setText('#na-yin', data.lunar.getDayNaYin()); setText('#xun-kong', `${data.xun} · 空亡${data.xunKong}`); setText('#wutu-time', `太阳${data.wutu.sun.join('')} · 太阴${data.wutu.moon.join('')}`);
  setText('#four-pillars', data.fullPillars); setText('#day-clash', `冲${data.dayChongZodiac} · 煞${data.daySha}`); setText('#solar-term', data.solarTerm); setText('#tai-position', data.tai || '胎神方位待核');
  renderTags(document.querySelector('#yi-tags'), data.yi, '当日无宜项'); renderTags(document.querySelector('#ji-tags'), data.ji, '当日无忌项');
  setText('#wealth-direction', data.wealth); setText('#joy-direction', data.joy); setText('#yang-gui-direction', data.yangGui); setText('#yin-gui-direction', data.yinGui); setText('#fu-direction', data.fu); setText('#sha-direction', `煞${data.daySha}`);
  setText('#spirit-copy', `吉神：${data.jiShen.slice(0, 6).join('、') || '未列'}。凶煞：${data.xiongSha.slice(0, 6).join('、') || '未列'}。`);
  const dayBlessings = [data.hasTianDe ? '天德' : '', data.hasYueDe ? '月德' : '', data.hasTianYi ? '天乙贵人' : '', data.hasWenChang ? '文昌' : ''].filter(Boolean).join('、');
  setText('#day-shensha', data.yangGong ? '杨公忌日' : data.duTian ? '戊己都天' : dayBlessings || data.xiongSha.slice(0, 2).join('、') || '未列');
  setText('#spirit-copy', `${dayBlessings ? `吉神：${dayBlessings}。` : ''}凶煞：${data.xiongSha.slice(0, 6).join('、') || '未列'}。`);
  setText('#route-lead', `日冲${data.dayChongDesc}，煞${data.daySha}方。属${data.dayChongZodiac}者不取此日为主用事日；用事主向不取${data.daySha}方。${data.sanSha !== '—' ? ` ${data.yearPillar}年三煞在${data.sanSha}。` : ''}`);
  const isYangDay = '甲丙戊庚壬'.includes(data.dayStem);
  const solo = [...data.xunKong].find((branch) => '子寅辰午申戌'.includes(branch) === isYangDay) || data.xunKong.charAt(0);
  const virtual = OPPOSITE_BRANCH[solo];
  setText('#void-left', `${isYangDay ? '阳' : '阴'}孤 · ${solo}`); setText('#void-right', `${isYangDay ? '阳' : '阴'}虚 · ${virtual}`); setText('#route-note', `${data.xun}空亡${data.xunKong}，对应虚位${data.virtual}。竞争、谈判、销售、博弈可取“背${solo}面${virtual}”；合作不用孤虚法。`);
  setText('#engine-state', `已核定 ${data.iso}：${data.fullPillars} · ${data.deity}${yellow ? '黄道' : '黑道'} · ${data.xiu}。`);
  document.querySelector('#engine-state').className = 'engine-state';
  renderCourseGates(data);
}

function updateSelectedHour() {
  if (!currentData) return;
  const selectedIndex = getHourIndex(timeInput.value);
  const selected = currentData.hours[selectedIndex];
  const markers = selected.markers.length ? ` · ${selected.markers.join(' / ')}` : '';
  setText('#selected-time-caption', `${selected.branch}时 · ${selected.pillar} · ${selected.deity} · ${selected.quality}${markers}`); setText('#selected-hour-name', `${selected.branch}时 · ${selected.range}${markers}`); setText('#selected-pillar', selected.pillar); setText('#selected-deity', `${selected.deity} · ${selected.quality}`); setText('#selected-clash', selected.clash); setText('#selected-do', selected.yi.slice(0, 4).join('、') || (isGood(selected.quality) ? '黄道时，按事复核' : '黑道时，不取主用事')); setText('#selected-avoid', selected.ji.slice(0, 4).join('、') || '时忌未列'); document.querySelector('#dial-needle').style.transform = `translateX(-50%) translateZ(23px) rotate(${selected.angle}deg)`; renderHours(selectedIndex);
}

function updatePeriodViews() { renderQuickDays(); renderWeek(); renderMonth(); renderUseCaseTabs(); renderUseCaseVerdict(); }
function updateDay({ preserveMonth = false } = {}) {
  try {
    currentData = getDayData(dateInput.value);
    if (!preserveMonth) setCursorToData(currentData);
    renderDay(currentData); updatePeriodViews(); updateSelectedHour();
    const url = new URL(window.location.href); url.searchParams.set('date', currentData.iso); window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
  } catch (error) { currentData = null; const note = document.querySelector('#engine-state'); note.textContent = error.message; note.className = 'engine-state is-error'; setText('#direct-verdict', '日课引擎未就绪，暂不生成日时结论。'); }
}

function initialDate() { const requested = new URLSearchParams(window.location.search).get('date'); return /^\d{4}-\d{2}-\d{2}$/.test(requested || '') ? requested : todayIso(); }

previousDayButton.addEventListener('click', () => { dateInput.value = shiftIso(dateInput.value, -1); updateDay(); });
nextDayButton.addEventListener('click', () => { dateInput.value = shiftIso(dateInput.value, 1); updateDay(); });
todayButton.addEventListener('click', () => { dateInput.value = todayIso(); updateDay(); });
previousMonthButton.addEventListener('click', () => { const next = new Date(Date.UTC(calendarCursor.year, calendarCursor.month - 2, 1)); calendarCursor = { year: next.getUTCFullYear(), month: next.getUTCMonth() + 1 }; renderMonth(); });
nextMonthButton.addEventListener('click', () => { const next = new Date(Date.UTC(calendarCursor.year, calendarCursor.month, 1)); calendarCursor = { year: next.getUTCFullYear(), month: next.getUTCMonth() + 1 }; renderMonth(); });
dateInput.addEventListener('change', () => updateDay()); timeInput.addEventListener('change', updateSelectedHour); topButton.addEventListener('click', () => { dateInput.value = todayIso(); updateDay(); window.scrollTo({ top: 0, behavior: 'smooth' }); });
useCaseSelect?.addEventListener('change', () => { selectedUseCase = useCaseSelect.value; renderUseCaseVerdict(); renderHours(getHourIndex(timeInput.value)); });
zodiacSelect?.addEventListener('change', () => { selectedZodiac = zodiacSelect.value; renderProfileCheck(currentData, getCase()); });
directionSelect?.addEventListener('change', () => { selectedDirection = directionSelect.value; renderProfileCheck(currentData, getCase()); });
dialScene.addEventListener('pointermove', (event) => { const bounds = dialScene.getBoundingClientRect(); const horizontal = ((event.clientX - bounds.left) / bounds.width - 0.5) * 16; const vertical = ((event.clientY - bounds.top) / bounds.height - 0.5) * 11; orbitalDial.style.transform = `rotateX(${58 - vertical}deg) rotateY(${horizontal}deg) rotateZ(-23deg)`; });
dialScene.addEventListener('pointerleave', () => { orbitalDial.style.transform = 'rotateX(58deg) rotateZ(-23deg)'; });

dateInput.value = initialDate();
updateDay();
