# Alvin Homelab — 專案交接文件

> 給其他 AI / 未來的自己讀的技術交接文件。目的:不用重新解釋一次網站定位與架構,直接接續開發。

---

## 網站定位

- 網址:`alvinhomelab.idv.tw`
- **不是履歷網站**。不放自拍、詳細個人資料、履歷、求職內容。
- 定位:「一位熱愛技術的人整理知識與專案的地方」
- 風格:Dark theme only、Apple + GitHub + Cloudflare 融合、簡潔、不花俏、重可讀性

## 部署架構

- 靜態網站生成器:**Astro**
- 部署:GitHub Pages
- DNS / CDN:Cloudflare
- 未來規劃:Cloudflare Workers(Weather API、Status API、GitHub API 串接、Analytics)

---

## 資訊架構(Site Map)

```
/                  首頁(Featured Projects / Latest Notes / Open Source Picks 摘要)
/projects/         專案總覽
/notes/            Technical Notes(知識庫,非部落格)
/opensource/       Open Source Picks(推薦專案,非自己作品)
/homelab/          Homelab 介紹(尚未建立頁面)
/weather/          氣象研究(尚未建立頁面)
/sdr/              SDR / 業餘無線電(尚未建立頁面)
/about/            關於(極簡,無履歷)
```

導覽列目前只有:**專案 / 開源推薦 / 關於**(Homelab / Weather / SDR 尚未加入導覽,之後有內容再接)

---

## 專案資料夾結構

```
src/
├── layouts/
│   └── Layout.astro          共用版面,組合 Header + Nav + <slot/> + Footer
├── components/
│   ├── Header.astro          品牌區塊(Alvin Homelab + 藍色發光小圓點)
│   ├── Nav.astro             導覽列,依 Astro.url.pathname 自動 active
│   ├── Footer.astro          © 年份 / 開發狀態 / 技術棧說明
│   ├── SectionTitle.astro    統一各區塊標題(mono 字體)
│   ├── Button.astro          primary / ghost 兩種變體
│   ├── ProjectCard.astro     專案卡片:標題/說明/tech tags/狀態 badge/GitHub/Demo
│   ├── NoteCard.astro        筆記清單列(非卡片牆,像 changelog)
│   └── OpenSourceCard.astro  開源推薦卡片,虛線邊框 + 橘色「推薦專案・非本人作品」badge
├── content.config.ts         Content Collections schema(Astro v6 新路徑,用 glob loader)
├── content/
│   ├── projects/*.md         專案內容
│   ├── notes/*.md            筆記內容(目前只有 example 佔位)
│   └── opensource/*.md       開源推薦內容(目前只有 example 佔位)
├── styles/
│   └── global.css            色彩變數、字體變數
└── pages/
    ├── index.astro           首頁,讀取 projects collection 渲染 Featured Projects
    ├── projects.astro        專案列表頁,讀取 projects collection
    ├── notes.astro           佔位(建置中)
    ├── opensource.astro      佔位(建置中)
    └── about.astro           佔位(建置中)
```

---

## Content Collections Schema

> Astro v6 換了新版 API:檔案要放在 `src/content.config.ts`(不是 `src/content/config.ts`),且每個 collection 都要指定 `loader`(這裡用 `glob` loader 讀對應資料夾)。舊版 `type: 'content'` 寫法已被棄用。

```typescript
// src/content.config.ts

projects: {
  title: string
  description: string
  tech: string[]
  status: '開發中' | '完成'
  github?: string (url)
  demo?: string (url)
  updatedAt: date
}

notes: {
  title: string
  category: 'networking' | 'cloudflare' | 'dns' | 'linux' | 'sdr' | 'weather' | 'ai'
  updatedAt: date
}

opensource: {
  name: string
  author: string
  github: string (url)
  website?: string (url)
  license: string
  reason: string
}
```

---

## 設計代幣(Design Tokens)

```css
--bg: #0d1117;          背景(近黑深灰,GitHub dark 同色系)
--bg-card: #161b22;     卡片背景
--border: #30363d;      邊框
--text: #c9d1d9;        主文字
--text-dim: #8b949e;    次文字
--accent: #58a6ff;      強調色(藍)
--mono: JetBrains Mono / IBM Plex Mono   等寬字體(code/tag/數據)
--sans: Inter / Noto Sans TC              內文字體
```

狀態色:完成 `#3fb950`(綠) / 開發中 `#d29922`(黃/琥珀)

---

## 目前已有的真實內容

### Projects(2 個,皆為「完成」狀態)

1. **金融市場常識與專業倫理測驗系統**
   - 技術:Python
   - GitHub:https://github.com/alvin6998/Financial-Market-Common-Sense-and-Professional-Ethics-Test-System

2. **2048-1A2B-Game**
   - 技術:JavaScript
   - GitHub:https://github.com/alvin6998/2048-1a2b-game

### Notes / Open Source Picks

尚未填入真實內容,目前只有 schema 範例佔位檔(`example.md`),等待實際筆記/推薦專案。

---

## 待辦與下一步

- [ ] Open Source Picks 真實內容(需要:專案名稱、原作者、官方 GitHub、官方網站、License、推薦理由)
- [ ] Technical Notes 真實內容
- [ ] `/homelab/`、`/weather/`、`/sdr/` 三個分類頁面尚未建立(IA 已規劃但頁面未動工)
- [ ] Nav 加入 Homelab / Weather / SDR(等內容到位)
- [ ] `notes.astro`、`opensource.astro` 從「建置中」改為讀取對應 collection 渲染
- [ ] About 頁面實際文案(技術興趣 / 網站宗旨 / 聯絡方式 / GitHub,不寫履歷)
- [ ] 未來擴充:Current Lab Status 區塊(需要 Cloudflare Workers 串接內網監控資料,MVP 階段先跳過)

---

## 重要原則(不要違反)

1. **Open Source Picks 一定要視覺上明顯區隔於 Projects**——不只是文字聲明,`OpenSourceCard` 用虛線邊框 + 橘色 badge,`ProjectCard` 用實線邊框 + 綠/黃狀態點,兩者不能混用同一套視覺語言。
2. **首頁不放自我介紹段落**,內容以摘要牆形式呈現(Featured Projects / Latest Notes / Open Source Picks)。
3. **Technical Notes 走知識庫路線**,`NoteCard` 用清單列而非卡片牆,category 用 `z.enum` 鎖死避免打字錯誤造成分類混亂。
4. **不寫履歷內容**——About 頁面、Homelab 頁面都不能出現求職導向的文字(例如「應徵」「工作經驗」)。
