# 观时 · 每日择日与择时

一个中文 3D 择日页面。输入任意公历日期，即可在浏览器本地换算干支、农历、建除、十二神、黄黑道、二十八星宿、宜忌、冲煞、旬空、诸神方位与十二时辰择时；默认展示 2026 年 8 月 1 日丁未日，便于与课程实盘对照。

正式站点：[https://qq919927036-glitch.github.io/guanshi-dayplate/](https://qq919927036-glitch.github.io/guanshi-dayplate/)

## 预览

直接在浏览器打开 `index.html`，或在本目录运行：

```sh
python3 -m http.server 4173
```

然后访问 `http://localhost:4173`。

## 文件说明

- `index.html`：日课仪表盘、SEO、日期校准与数据分区
- `styles.css`：3D 罗盘视觉、数据布局与响应式样式
- `script.js`：逐日历法换算、十二时辰、太阳时/太阴时、方位与互动

页面使用固定版本的 [lunar-javascript](https://github.com/6tail/lunar-javascript) 浏览器构建来换算日课基础数据；日课判断顺序按本项目课程资料呈现。太阳时、太阴时按课程速查口诀标示。择日资料仅供传统文化研究与课程使用，不替代法律、医疗、投资或安全决策。

## 公开与收录

网站已加入面向搜索引擎的元数据、结构化数据、`robots.txt` 与 `sitemap.xml`，并通过 GitHub Pages 公开上线。Google Search Console 的验证与提交步骤见 [DEPLOYMENT.md](DEPLOYMENT.md)。
