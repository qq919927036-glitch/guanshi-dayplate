const dateInput = document.querySelector('#date-input');
const timeInput = document.querySelector('#time-input');
const previousDayButton = document.querySelector('#previous-day');
const nextDayButton = document.querySelector('#next-day');
const todayButton = document.querySelector('#today-button');
const topButton = document.querySelector('#top-button');
const dialScene = document.querySelector('#dial-scene');
const orbitalDial = document.querySelector('.orbital-dial');
const hourGrid = document.querySelector('#hour-grid');

const BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
const OPPOSITE_BRANCH = { 子: '午', 丑: '未', 寅: '申', 卯: '酉', 辰: '戌', 巳: '亥', 午: '子', 未: '丑', 申: '寅', 酉: '卯', 戌: '辰', 亥: '巳' };
const HOUR_RANGES = ['23:00–00:59', '01:00–02:59', '03:00–04:59', '05:00–06:59', '07:00–08:59', '09:00–10:59', '11:00–12:59', '13:00–14:59', '15:00–16:59', '17:00–18:59', '19:00–20:59', '21:00–22:59'];
const HOUR_STARTS = [23, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21];
const CHINESE_MONTHS = ['正月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '冬月', '腊月'];
const STEM_COLORS = {
  甲: { name: '青、绿色为主', note: '甲木日取木色，青绿为主；黑蓝可作辅助。', swatch: 'linear-gradient(135deg,#2e7d5a 0 48%,#213d51 50% 100%)' },
  乙: { name: '青、绿色为主', note: '乙木日取木色，青绿为主；黑蓝可作辅助。', swatch: 'linear-gradient(135deg,#2e7d5a 0 48%,#213d51 50% 100%)' },
  丙: { name: '红、紫色为主', note: '丙火日取火色，红紫为主；青绿可作辅助。', swatch: 'linear-gradient(135deg,#b94e46 0 48%,#69446f 50% 100%)' },
  丁: { name: '红、紫色为主', note: '丁火日取火色，红紫为主；青绿可作辅助。', swatch: 'linear-gradient(135deg,#b94e46 0 48%,#69446f 50% 100%)' },
  戊: { name: '黄、咖色为主', note: '戊土日取土色，黄咖为主；红色可作辅助。', swatch: 'linear-gradient(135deg,#cba454 0 48%,#7e5232 50% 100%)' },
  己: { name: '黄、咖色为主', note: '己土日取土色，黄咖为主；红色可作辅助。', swatch: 'linear-gradient(135deg,#cba454 0 48%,#7e5232 50% 100%)' },
  庚: { name: '白、金色为主', note: '庚金日取金色，白金为主；黄咖可作辅助。', swatch: 'linear-gradient(135deg,#e7e2d1 0 48%,#b89c5a 50% 100%)' },
  辛: { name: '白、金色为主', note: '辛金日取金色，白金为主；黄咖可作辅助。', swatch: 'linear-gradient(135deg,#e7e2d1 0 48%,#b89c5a 50% 100%)' },
  壬: { name: '黑、蓝色为主', note: '壬水日取水色，黑蓝为主；白金可作辅助。', swatch: 'linear-gradient(135deg,#162c48 0 48%,#3d6f9a 50% 100%)' },
  癸: { name: '黑、蓝色为主', note: '癸水日取水色，黑蓝为主；白金可作辅助。', swatch: 'linear-gradient(135deg,#162c48 0 48%,#3d6f9a 50% 100%)' },
};
const SUN_TIME = { 甲: ['未'], 己: ['未'], 丁: ['申'], 壬: ['申'], 乙: ['申'], 庚: ['申'], 丙: ['辰'], 辛: ['辰'], 戊: ['卯'], 癸: ['卯'] };
const MOON_TIME = { 甲: ['丑', '戌'], 己: ['丑', '戌'], 丙: ['丑', '戌'], 辛: ['丑', '戌'], 乙: ['巳'], 庚: ['巳'], 丁: ['寅', '亥'], 壬: ['寅', '亥'], 戊: ['午'], 癸: ['午'] };
const OFFICER_GUIDANCE = {
  建: '建日宜立事、拜访、上官赴任；动土修造仍须过星宿与神煞。',
  除: '除日宜除旧、清理、求医；重大喜庆事不以此为首选。',
  满: '满日宜丰收、纳财、宴请；诉讼、安葬、修造不取。',
  平: '平日宜日常用事、修补；重大开创之事不作首选。',
  定: '定日宜定约、安床、交易；诉讼、出行需再审。',
  执: '执日宜执行、祭祀、订约；搬迁、开市不取。',
  破: '破日主破败，婚嫁、开业、入宅、安葬不取。',
  危: '危日主险，登高、远行、重大动土慎用。',
  成: '成日宜成事、开业、婚嫁、入宅；官讼不取。',
  收: '收日宜收纳、交易、捕捉；开业、安葬不取。',
  开: '开日宜开市、出行、求财、就职；安葬不取。',
  闭: '闭日宜闭藏、修整；开业、出行、嫁娶不取。',
};
const DAY_DEITY_GUIDANCE = {
  青龙: '青龙黄道，利有攸往、求事与见贵。', 明堂: '明堂黄道，利拜见、文书、会面与正事。', 金匮: '金匮黄道，利守财、私密筹划与婚姻类事务。', 天德: '天德黄道，出行、求事、正经办事可取。', 玉堂: '玉堂黄道，利文书、喜庆、拜会与求财。', 司命: '司命黄道，白天正事可取，暗昧之事不取。',
  天刑: '天刑黑道，普通谋事不取，尤其慎诉讼与口舌。', 朱雀: '朱雀黑道，易起口舌、争执、官非，私事避用。', 白虎: '白虎黑道，出行、车动、动刀动工均须慎用。', 天牢: '天牢黑道，主拘束限制，普通人普通事不取。', 玄武: '玄武黑道，正经事可酌情；暗昧、博彩、背后事不取。', 勾陈: '勾陈黑道，合作、纠纷、分合易缠，尽量避用。',
};

let currentData = null;

function isoFromParts(year, month, day) {
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function parseIso(iso) {
  const [year, month, day] = iso.split('-').map(Number);
  return { year, month, day };
}

function shiftIso(iso, amount) {
  const { year, month, day } = parseIso(iso);
  const next = new Date(Date.UTC(year, month - 1, day + amount));
  return isoFromParts(next.getUTCFullYear(), next.getUTCMonth() + 1, next.getUTCDate());
}

function todayIso() {
  const formatter = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit' });
  const parts = Object.fromEntries(formatter.formatToParts(new Date()).filter(({ type }) => type !== 'literal').map(({ type, value }) => [type, value]));
  return `${parts.year}-${parts.month}-${parts.day}`;
}

function getHourIndex(time) {
  const hour = Number((time || '09:30').split(':')[0]);
  return Math.floor(((hour + 1) % 24) / 2);
}

function isGood(value) {
  return value === '吉';
}

function officerQuality(officer) {
  if (['成', '开', '定', '满'].includes(officer)) return '吉';
  if (['破', '危', '闭'].includes(officer)) return '凶';
  return '平';
}

function safeList(value) {
  return Array.isArray(value) ? value.filter(Boolean) : [];
}

function xunVirtual(xunKong) {
  return [...xunKong].map((branch) => OPPOSITE_BRANCH[branch]).join('');
}

function tianYuanTimes(dayStem) {
  return { sun: SUN_TIME[dayStem] || [], moon: MOON_TIME[dayStem] || [] };
}

function getDayData(iso) {
  if (typeof Solar === 'undefined') throw new Error('历法引擎未加载。请检查网络连接后重试。');
  const { year, month, day } = parseIso(iso);
  const solar = Solar.fromYmd(year, month, day);
  const lunar = solar.getLunar();
  const dayPillar = lunar.getDayInGanZhi();
  const dayStem = dayPillar.charAt(0);
  const deityLuck = lunar.getDayTianShenLuck();
  const deity = lunar.getDayTianShen();
  const officer = lunar.getZhiXing();
  const xiuLuck = lunar.getXiuLuck();
  const xiu = `${lunar.getXiu()}${lunar.getZheng()}${lunar.getAnimal()}`;
  const xunKong = lunar.getDayXunKong();
  const wutu = tianYuanTimes(dayStem);
  const xun = lunar.getDayXun();
  const wealth = `${lunar.getDayPositionCai()}（${lunar.getDayPositionCaiDesc()}）`;
  const joy = `${lunar.getDayPositionXi()}（${lunar.getDayPositionXiDesc()}）`;
  const yangGui = `${lunar.getDayPositionYangGui()}（${lunar.getDayPositionYangGuiDesc()}）`;
  const solarTerm = lunar.getJieQi() || (lunar.getPrevJieQi(true)?.getName() || '节气间');
  const data = {
    iso, year, month, day, solar, lunar, dayPillar, dayStem, dayBranch, deity, deityLuck, officer, officerLuck: officerQuality(officer), xiu, xiuLuck,
    xun, xunKong, virtual: xunVirtual(xunKong), wutu, wealth, joy, yangGui, solarTerm,
    yi: safeList(lunar.getDayYi()), ji: safeList(lunar.getDayJi()), jiShen: safeList(lunar.getDayJiShen()), xiongSha: safeList(lunar.getDayXiongSha()),
    dayChongDesc: lunar.getDayChongDesc(), dayChongZodiac: lunar.getDayChongShengXiao(), daySha: lunar.getDaySha(),
    tai: lunar.getDayPositionTai(), color: STEM_COLORS[dayStem] || STEM_COLORS.戊,
    lunarLabel: `农历${lunar.getMonthInChinese()}月${lunar.getDayInChinese()}`,
    fullPillars: `${lunar.getYearInGanZhi()}年 · ${lunar.getMonthInGanZhi()}月 · ${dayPillar}日`,
    weekday: `星期${solar.getWeekInChinese()}`,
  };
  data.hours = BRANCHES.map((branch, index) => {
    // The course treats the displayed 子时 as part of the selected civil date; use 00:30 for its time pillar.
    const calculationHour = index === 0 ? 0 : HOUR_STARTS[index];
    const hourLunar = Solar.fromYmdHms(year, month, day, calculationHour, 30, 0).getLunar();
    const timeDeity = hourLunar.getTimeTianShen();
    const timeLuck = hourLunar.getTimeTianShenLuck();
    const yi = safeList(hourLunar.getTimeYi());
    const ji = safeList(hourLunar.getTimeJi());
    const markers = [];
    if (wutu.sun.includes(branch)) markers.push('太阳时');
    if (wutu.moon.includes(branch)) markers.push('太阴时');
    return {
      branch, index, angle: index * 30, range: HOUR_RANGES[index], pillar: hourLunar.getTimeInGanZhi(), deity: timeDeity, quality: timeLuck,
      clash: `冲${hourLunar.getTimeChongShengXiao()} · 煞${hourLunar.getTimeSha()}`,
      yi, ji, markers,
    };
  });
  return data;
}

function dateHeroLabel(data) {
  const numericMonth = CHINESE_MONTHS[data.month - 1] || `${data.month}月`;
  return { month: numericMonth, day: data.lunar.getDayInChinese() };
}

function directVerdict(data) {
  const layers = [isGood(data.deityLuck), data.officerLuck === '吉', isGood(data.xiuLuck)].filter(Boolean).length;
  const tail = data.deityLuck === '吉'
    ? `日值${data.deity}黄道；${data.officer}日、${data.xiu}(${data.xiuLuck})需合并判断。`
    : `日值${data.deity}黑道；${data.officer}日、${data.xiu}(${data.xiuLuck})不可替代黄道筛选。`;
  if (layers >= 3) return `${tail} 三家同吉，可作为重要事项的候选日；仍要避开当事人相冲与不利方位。`;
  if (layers === 2) return `${tail} 三家中两吉，可按具体事项配合黄道吉时使用；先避冲煞。`;
  if (layers === 1) return `${tail} 基础条件不齐，不列为婚嫁、安葬、入宅、破土等重大用事首选。`;
  return `${tail} 三家均不占优，重大用事改期；若事情不可移，至少选黄道吉时并回避冲煞。`;
}

function guidance(data) {
  const base = DAY_DEITY_GUIDANCE[data.deity] || `${data.deity}为当日值神，按黄黑道先作初筛。`;
  const officer = OFFICER_GUIDANCE[data.officer] || `${data.officer}日按事项再行复核。`;
  return `${base} ${officer}`;
}

function renderTags(element, items, emptyLabel) {
  element.innerHTML = '';
  (items.length ? items.slice(0, 6) : [emptyLabel]).forEach((item) => {
    const tag = document.createElement('span');
    tag.textContent = item;
    element.appendChild(tag);
  });
}

function setText(selector, value) {
  document.querySelector(selector).textContent = value;
}

function renderDateStrip(iso) {
  const strip = document.querySelector('#date-strip');
  strip.innerHTML = '';
  [-2, -1, 0, 1, 2].forEach((offset) => {
    const nextIso = shiftIso(iso, offset);
    const data = getDayData(nextIso);
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `date-pip${offset === 0 ? ' is-current' : ''}`;
    button.dataset.date = nextIso;
    button.setAttribute('aria-label', `选择 ${nextIso}`);
    button.innerHTML = `<span>${String(data.month).padStart(2, '0')}.${String(data.day).padStart(2, '0')}</span><b>${data.dayPillar}</b>`;
    button.addEventListener('click', () => {
      dateInput.value = nextIso;
      updateDay();
    });
    strip.appendChild(button);
  });
}

function renderHours(selectedIndex) {
  hourGrid.innerHTML = '';
  currentData.hours.forEach((item, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `hour-row is-${isGood(item.quality) ? 'good' : 'bad'}${index === selectedIndex ? ' is-selected' : ''}`;
    button.setAttribute('aria-pressed', String(index === selectedIndex));
    button.innerHTML = `<span class="branch">${item.branch}</span><span class="hour-main"><b>${item.range} · ${item.pillar}</b><span>${item.clash}</span></span><span class="hour-status">${item.quality}</span><span class="hour-deity">${item.deity}${item.markers.length ? ` <b class="wutu-marker">· ${item.markers.join(' / ')}</b>` : ''}</span>`;
    button.addEventListener('click', () => {
      timeInput.value = `${String(HOUR_STARTS[index]).padStart(2, '0')}:30`;
      updateSelectedHour();
    });
    hourGrid.appendChild(button);
  });
}

function renderDay(data) {
  const hero = dateHeroLabel(data);
  const yellow = isGood(data.deityLuck);
  const badge = document.querySelector('#day-badge');
  const systems = [yellow, data.officerLuck === '吉', isGood(data.xiuLuck)].filter(Boolean).length;
  document.title = `观时｜${data.iso} ${data.dayPillar}日择日与择时`;
  setText('#header-date', `${data.iso.replaceAll('-', ' · ')} · ${data.dayPillar}日课`);
  setText('#hero-month', hero.month);
  setText('#hero-day', data.lunar.getDayInChinese());
  setText('#hero-summary', `${data.lunarLabel}，${data.weekday}。${data.fullPillars}；日值${data.deity}${yellow ? '黄道' : '黑道'}，建除${data.officer}日，二十八宿${data.xiu}（${data.xiuLuck}）。`);
  setText('#dial-pillar', data.dayPillar);
  setText('#dial-deity', `${data.deity} · ${yellow ? '黄道' : '黑道'}`);
  setText('#dial-lunar', data.lunarLabel);
  setText('#day-deity', data.deity);
  badge.className = `fortune-badge ${yellow ? 'is-good' : ''}`;
  badge.textContent = `${yellow ? '黄道' : '黑道'} · ${data.deityLuck}`;
  setText('#direct-verdict', directVerdict(data));
  setText('#system-count', `三家 ${systems} 吉 · ${3 - systems} 非吉`);
  setText('#zhi-xing', `${data.officer}日`);
  setText('#zhi-xing-note', OFFICER_GUIDANCE[data.officer] || '依月令起建，逐日轮转。');
  setText('#xiu', data.xiu);
  setText('#xiu-note', `星宿${data.xiuLuck}；演禽宜忌作第二层复核。`);
  setText('#na-yin', data.lunar.getDayNaYin());
  setText('#xun-kong', `${data.xun} · 空亡${data.xunKong}`);
  setText('#wutu-time', `太阳${data.wutu.sun.join('')} · 太阴${data.wutu.moon.join('')}`);
  setText('#four-pillars', data.fullPillars);
  setText('#day-clash', `冲${data.dayChongZodiac} · 煞${data.daySha}`);
  setText('#solar-term', data.solarTerm);
  setText('#tai-position', data.tai || '胎神方位待核');
  renderTags(document.querySelector('#yi-tags'), data.yi, '当日无宜项');
  renderTags(document.querySelector('#ji-tags'), data.ji, '当日无忌项');
  setText('#wealth-direction', data.wealth);
  setText('#joy-direction', data.joy);
  setText('#yang-gui-direction', data.yangGui);
  setText('#sha-direction', `煞${data.daySha}`);
  setText('#wear-colors', data.color.name);
  setText('#color-note', data.color.note);
  document.querySelector('.swatch').style.background = data.color.swatch;
  setText('#spirit-copy', `吉神：${data.jiShen.slice(0, 6).join('、') || '未列'}。凶煞：${data.xiongSha.slice(0, 6).join('、') || '未列'}。`);
  setText('#day-guidance', guidance(data));
  setText('#route-lead', `日冲${data.dayChongDesc}，煞${data.daySha}方。属${data.dayChongZodiac}者不以此日为用事日；用事主向不取${data.daySha}方。`);
  const isYangDay = '甲丙戊庚壬'.includes(data.dayStem);
  const solo = [...data.xunKong].find((branch) => '子寅辰午申戌'.includes(branch) === isYangDay) || data.xunKong.charAt(0);
  const virtual = OPPOSITE_BRANCH[solo];
  setText('#void-left', `${isYangDay ? '阳' : '阴'}孤 · ${solo}`);
  setText('#void-right', `${isYangDay ? '阳' : '阴'}虚 · ${virtual}`);
  setText('#route-note', `${data.xun}空亡${data.xunKong}，对应虚位${data.virtual}。竞争、谈判、销售、博弈可取“背${solo}面${virtual}”；合作、共事不套用孤虚法。`);
  setText('#engine-state', `已按 ${data.iso} 本地换算：${data.fullPillars} · ${data.deity}${yellow ? '黄道' : '黑道'} · ${data.xiu}。`);
  document.querySelector('#engine-state').className = 'console-note';
  renderDateStrip(data.iso);
}

function updateSelectedHour() {
  if (!currentData) return;
  const selectedIndex = getHourIndex(timeInput.value);
  const selected = currentData.hours[selectedIndex];
  const markers = selected.markers.length ? ` · ${selected.markers.join(' / ')}` : '';
  setText('#selected-time-caption', `${selected.branch}时 · ${selected.pillar} · ${selected.deity} · ${selected.quality}${markers}`);
  setText('#selected-hour-name', `${selected.branch}时 · ${selected.range}${markers}`);
  setText('#selected-pillar', selected.pillar);
  setText('#selected-deity', `${selected.deity} · ${selected.quality}`);
  setText('#selected-clash', selected.clash);
  setText('#selected-do', selected.yi.slice(0, 4).join('、') || (isGood(selected.quality) ? '黄道吉时，按事项复核' : '黑道时，非必要不取'));
  document.querySelector('#dial-needle').style.transform = `translateX(-50%) translateZ(23px) rotate(${selected.angle}deg)`;
  renderHours(selectedIndex);
}

function updateDay() {
  try {
    currentData = getDayData(dateInput.value);
    renderDay(currentData);
    updateSelectedHour();
    const url = new URL(window.location.href);
    url.searchParams.set('date', currentData.iso);
    window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
  } catch (error) {
    currentData = null;
    const note = document.querySelector('#engine-state');
    note.textContent = error.message;
    note.className = 'console-note is-error';
    document.querySelector('#direct-verdict').textContent = '日课引擎未就绪，暂不生成未经核定的日课结果。';
  }
}

function initialDate() {
  const requested = new URLSearchParams(window.location.search).get('date');
  return /^\d{4}-\d{2}-\d{2}$/.test(requested || '') ? requested : dateInput.value;
}

previousDayButton.addEventListener('click', () => { dateInput.value = shiftIso(dateInput.value, -1); updateDay(); });
nextDayButton.addEventListener('click', () => { dateInput.value = shiftIso(dateInput.value, 1); updateDay(); });
todayButton.addEventListener('click', () => { dateInput.value = todayIso(); updateDay(); });
dateInput.addEventListener('change', updateDay);
timeInput.addEventListener('change', updateSelectedHour);
topButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

dialScene.addEventListener('pointermove', (event) => {
  const bounds = dialScene.getBoundingClientRect();
  const horizontal = ((event.clientX - bounds.left) / bounds.width - 0.5) * 16;
  const vertical = ((event.clientY - bounds.top) / bounds.height - 0.5) * 11;
  orbitalDial.style.transform = `rotateX(${58 - vertical}deg) rotateY(${horizontal}deg) rotateZ(-23deg)`;
});
dialScene.addEventListener('pointerleave', () => { orbitalDial.style.transform = 'rotateX(58deg) rotateZ(-23deg)'; });

dateInput.value = initialDate();
updateDay();
