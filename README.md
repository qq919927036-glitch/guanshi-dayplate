# 观时 · 每日择日与择时

一个中文 3D 择日页面。打开即按北京时间展示当日日课；可点选今日、明日、后日、大后日，查看本周七日速览或整个月历，并输入任意公历日期。页面会在浏览器本地换算干支、农历、建除、十二神、黄黑道、二十八星宿、宜忌、冲煞、旬空、诸神方位、穿衣用色与十二时辰择时。

正式站点：[https://qq919927036-glitch.github.io/guanshi-dayplate/](https://qq919927036-glitch.github.io/guanshi-dayplate/)

## 预览

直接在浏览器打开 `index.html`，或在本目录运行：

```sh
python3 -m http.server 4173
```

然后访问 `http://localhost:4173`。

## 文件说明

- `index.html`：每日开屏、周览、月历、事项择日、SEO 与日课分区
- `styles.css`：玉石鎏金观象台视觉、3D 罗盘、数据布局与响应式样式
- `script.js`：逐日历法换算、七日与整月筛选、十二时辰、乌兔太阳时/太阴时、方位与互动

页面使用固定版本的 [lunar-javascript](https://github.com/6tail/lunar-javascript) 浏览器构建来换算日课基础数据；日课判断顺序按本项目课程资料呈现。太阳时、太阴时按课程速查口诀标示。

## 公开与收录

网站已加入面向搜索引擎的元数据、结构化数据、`robots.txt` 与 `sitemap.xml`，并通过 GitHub Pages 公开上线。Google Search Console 的验证与提交步骤见 [DEPLOYMENT.md](DEPLOYMENT.md)。
