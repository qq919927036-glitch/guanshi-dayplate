# 观时 · 每日择日与择时

一个中文 3D 日课页面。打开即按北京时间展示当日日课；可点选今日、明日、后日、大后日，查看本周七日速览或整个月历，并输入任意公历日期。

页面按课程主序组织判断：先过黄道日与黄道时，再以天元乌兔的太阳时、太阴时加分，继而用建除与二十八宿筛选，最后按事项、主事生肖、门向／坐向、冲刑破害与主要凶煞复核。支持婚嫁、入宅、开工、开业、签约、考试文书、远行、安葬等事项；衣色按本次所取神方转五行色，而非固定按日干套色。

正式站点：[https://qq919927036-glitch.github.io/guanshi-dayplate/](https://qq919927036-glitch.github.io/guanshi-dayplate/)

## 预览

直接在浏览器打开 `index.html`，或在本目录运行：

```sh
python3 -m http.server 4173
```

然后访问 `http://localhost:4173`。

## 文件说明

- `index.html`：空间日课球、课程判断主序、人物／朝向复核、周览、月历与 SEO
- `styles.css`：Apple 风格玻璃操作层、实体日课面板、3D 时序球与响应式样式
- `script.js`：逐日历法换算、课程判断层、事项／生肖／坐向联动、方位转衣色、周月筛选与十二时辰

页面使用固定版本的 [lunar-javascript](https://github.com/6tail/lunar-javascript) 浏览器构建来换算日课基础数据；日课判断顺序按本项目课程资料呈现。太阳时、太阴时按课程速查口诀标示。

## 公开与收录

网站已加入面向搜索引擎的元数据、结构化数据、`robots.txt` 与 `sitemap.xml`，并通过 GitHub Pages 公开上线。Google Search Console 的验证与提交步骤见 [DEPLOYMENT.md](DEPLOYMENT.md)。
