const dateInput = document.querySelector('#date-input');
const timeInput = document.querySelector('#time-input');
const calculateButton = document.querySelector('#calculate-button');
const resetButton = document.querySelector('#reset-button');
const dialScene = document.querySelector('#dial-scene');
const orbitalDial = document.querySelector('.orbital-dial');
const hourGrid = document.querySelector('#hour-grid');

const dayPlateDate = '2026-08-01';
const hours = [
  { branch: '子', range: '23:00–00:59', pillar: '庚子', deity: '天刑', quality: '凶', clash: '冲马 · 煞南', action: '不取诉讼、赴任、动土、修造', angle: 0 },
  { branch: '丑', range: '01:00–02:59', pillar: '辛丑', deity: '朱雀', quality: '凶', clash: '冲羊 · 煞东', action: '诸事不宜', angle: 30 },
  { branch: '寅', range: '03:00–04:59', pillar: '壬寅', deity: '金匮', quality: '吉', clash: '冲猴 · 煞北', action: '订婚、嫁娶、入宅、安葬', angle: 60 },
  { branch: '卯', range: '05:00–06:59', pillar: '癸卯', deity: '天德', quality: '吉', clash: '冲鸡 · 煞西', action: '求财、见贵、订婚、嫁娶、开市', angle: 90 },
  { branch: '辰', range: '07:00–08:59', pillar: '甲辰', deity: '白虎', quality: '凶', clash: '冲狗 · 煞南', action: '不取祭祀、祈福、修造、动土', angle: 120 },
  { branch: '巳', range: '09:00–10:59', pillar: '乙巳', deity: '玉堂', quality: '吉', clash: '冲猪 · 煞东', action: '赴任、出行、修造、开业、安床', angle: 150 },
  { branch: '午', range: '11:00–12:59', pillar: '丙午', deity: '天牢', quality: '凶', clash: '冲鼠 · 煞北', action: '不取祭祀、祈福、赴任、出行', angle: 180 },
  { branch: '未', range: '13:00–14:59', pillar: '丁未', deity: '玄武', quality: '凶', clash: '冲牛 · 煞西', action: '不取赴任、动土、修造、出行', angle: 210 },
  { branch: '申', range: '15:00–16:59', pillar: '戊申', deity: '司命', quality: '吉', clash: '冲虎 · 煞南', action: '求财、出行、赴任、嫁娶、开市', angle: 240 },
  { branch: '酉', range: '17:00–18:59', pillar: '己酉', deity: '勾陈', quality: '凶', clash: '冲兔 · 煞东', action: '不取大事；先复核日时关系', angle: 270 },
  { branch: '戌', range: '19:00–20:59', pillar: '庚戌', deity: '青龙', quality: '吉', clash: '冲龙 · 煞北', action: '祈福、嫁娶、入宅、安床', angle: 300 },
  { branch: '亥', range: '21:00–22:59', pillar: '辛亥', deity: '明堂', quality: '吉', clash: '冲蛇 · 煞西', action: '求财、出行、祭祀、安床、开业', angle: 330 },
];

function getHourIndex(time) {
  const hour = Number(time.split(':')[0]);
  return Math.floor(((hour + 1) % 24) / 2);
}

function renderHours(selectedIndex) {
  hourGrid.innerHTML = '';
  hours.forEach((item, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `hour-row is-${item.quality === '吉' ? 'good' : 'bad'}${index === selectedIndex ? ' is-selected' : ''}`;
    button.dataset.hourIndex = index;
    button.setAttribute('aria-pressed', String(index === selectedIndex));
    button.innerHTML = `<span class="branch">${item.branch}</span><span class="hour-main"><b>${item.range} · ${item.pillar}</b><span>${item.clash}</span></span><span class="hour-status">${item.quality}</span><span class="hour-deity">${item.deity}</span>`;
    button.addEventListener('click', () => {
      const startHour = index === 0 ? 23 : index * 2 - 1;
      timeInput.value = `${String(startHour).padStart(2, '0')}:30`;
      updateSelectedHour();
    });
    hourGrid.appendChild(button);
  });
}

function updateDateState() {
  const note = document.querySelector('#date-state');
  const isVerifiedDate = dateInput.value === dayPlateDate;
  note.classList.toggle('is-warning', !isVerifiedDate);
  note.textContent = isVerifiedDate
    ? '本页已核定 2026 年 8 月 1 日丁未日通胜；择时按此日十二时辰显示。'
    : '当前页面仅录入 2026 年 8 月 1 日丁未日通胜。切换日期不会生成其他日期的专业日课。';
}

function updateSelectedHour() {
  const selectedIndex = getHourIndex(timeInput.value || '09:30');
  const selected = hours[selectedIndex];
  document.querySelector('#selected-time-caption').textContent = `${selected.branch}时 · ${selected.pillar} · ${selected.deity} · ${selected.quality}`;
  document.querySelector('#selected-hour-name').textContent = `${selected.branch}时 · ${selected.range}`;
  document.querySelector('#selected-pillar').textContent = selected.pillar;
  document.querySelector('#selected-deity').textContent = `${selected.deity} · ${selected.quality}`;
  document.querySelector('#selected-clash').textContent = selected.clash;
  document.querySelector('#selected-do').textContent = selected.action;
  document.querySelector('#dial-needle').style.transform = `translateX(-50%) translateZ(22px) rotate(${selected.angle}deg)`;
  renderHours(selectedIndex);
  updateDateState();
}

calculateButton.addEventListener('click', updateSelectedHour);
timeInput.addEventListener('change', updateSelectedHour);
dateInput.addEventListener('change', updateSelectedHour);
resetButton.addEventListener('click', () => {
  dateInput.value = dayPlateDate;
  timeInput.value = '09:30';
  updateSelectedHour();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

dialScene.addEventListener('pointermove', (event) => {
  const bounds = dialScene.getBoundingClientRect();
  const horizontal = ((event.clientX - bounds.left) / bounds.width - 0.5) * 18;
  const vertical = ((event.clientY - bounds.top) / bounds.height - 0.5) * 12;
  orbitalDial.style.transform = `rotateX(${56 - vertical}deg) rotateY(${horizontal}deg) rotateZ(-22deg)`;
});
dialScene.addEventListener('pointerleave', () => {
  orbitalDial.style.transform = 'rotateX(56deg) rotateZ(-22deg)';
});

updateSelectedHour();
