# TokenTint SEO & Growth Audit

Date: 2026-08-15
Scope: `website/` (Next.js 14 marketing site) + Chrome Web Store listing overlap
Author: Senior SEO Engineer review, TokenTint project

---

## 1. 项目技术分析

**框架 / 渲染模式**
- [website/package.json](website/package.json): Next.js `14.2.5`, React `18.3.1`, TypeScript `5.5.3`。
- App Router (`src/app/`)，全部页面默认 Server Components → SSR/RSC。
- 少数交互页 (`upgrade`, `success`, `Navigation`, `Footer`, `LanguageProvider`) 标 `'use client'`；SSR 输出的 HTML 是完整可爬取的（`curl` 实测 hero/features/pricing 全部内联在初始 HTML 中）。
- 结论：渲染模式对 SEO **利好**（不是纯 CSR）。核心问题不在渲染，在“内容 / 元数据 / 信息架构”。

**路由结构（实际存在）**

| Path | 类型 | SEO 目的 |
|---|---|---|
| `/` | 营销首页 | 品牌 + 全功能概览 |
| `/pricing` | 定价 | 商业转化，无搜索意图价值 |
| `/upgrade` | 支付表单 | 转化，不索引 |
| `/success` | 支付成功 | 不索引 |
| `/restore` | 找回激活码 | 老用户，不索引 |
| `/support` | FAQ | 品牌词、弱长尾 |
| `/privacy` `/terms` `/refunds` | 合规 | 不索引 |
| `/api/*` | Creem checkout / license / webhook | 不索引 |

**构建 / 部署**
- `next build`；[website/next.config.js](website/next.config.js) 只开了 `reactStrictMode`，**没有 `trailingSlash` / `headers` / `redirects` / `i18n`**。
- 未定义 `metadataBase`，未使用 App Router 的 `generateMetadata` 或 `app/sitemap.ts` / `app/robots.ts`。
- `website/public/` 目录不存在 → 没有任何 favicon、robots、sitemap、OG 图片、产品截图。
- 部署方目测为托管平台（`www.tokentint.xyz` 已生效，HTTP 200，Next 静态资源正常）。

**扩展**
- [extension/public/manifest.json](extension/public/manifest.json)：MV3，`activeTab` + `scripting` + `storage`，无 `<all_urls>`，权限干净。
- ASO 名称在 `_locales/en/messages.json`：`TokenTint – Color Picker & Design Tokens`。**这个命名已经比多数“Color Picker”插件更 ASO 合规**，Chrome Web Store title 已经带主关键词。真正的问题在网站端 title 没跟上。

---

## 2. 当前 SEO 状态（实测）

已从 `https://www.tokentint.xyz/` 拉取实际 SSR HTML，逐项核对。

| 项 | 状态 | 现实值 / 备注 |
|---|---|---|
| `<title>` | 弱 | `TokenTint - Pick colors. Ship tokens.` — 品牌 + slogan，**零关键词**，不含 "Chrome Extension / Color Picker / Design Tokens" |
| `meta description` | 弱 | `A Chrome Extension for color picking and design token management.` — 通用、无 USP、无 CTA、非用户会输入的语言 |
| `canonical` | 缺 | 未设置 |
| `robots.txt` | 缺 | `GET /robots.txt` → 404 |
| `sitemap.xml` | 缺 | `GET /sitemap.xml` → 404 |
| Open Graph | 全缺 | 无 `og:title` `og:description` `og:image` `og:url` `og:type` |
| Twitter Card | 全缺 | 无 `twitter:card` `twitter:image` |
| JSON-LD 结构化数据 | 缺 | 无 `SoftwareApplication` / `Product` / `Organization` / `FAQPage` schema |
| Heading 层级 | 破损 | 首页 `<h1>` 只有 slogan；`/pricing` `/privacy` `/terms` `/refunds` `/upgrade` `/success` `/restore` **全部以 `<h2>` 开头，缺 `<h1>`** |
| Semantic HTML | 基本合格 | 有 `<header> <nav> <main> <section> <footer>` |
| `<img alt>` | N/A | **整站没有一张图**（无产品截图、无 hero 图、无 OG 分享图） |
| Internal links | 稀薄 | Nav 3 条 + Footer 4 条 + Hero 2 CTA；无关键词锚文本 |
| URL 结构 | 短干净 | 但**只有 3 条营销 URL**（`/`, `/pricing`, `/support`）能被有效索引 |
| 移动端 | 合格 | `viewport` 正确，CSS 有 `@media (max-width: 768px)` 响应式 |
| `hreflang` | 缺 | 站点标榜 EN/zh-CN 双语，但**中文完全靠 client-side `LanguageProvider` + `localStorage` 切换**，SSR 始终输出英文。**中文页面对 Google 不存在** |
| `lang` 属性 | 半破 | `layout.tsx` 硬编码 `<html lang="en">`，客户端 mount 后才改；SSR 时永远是 `en` |
| favicon | 缺 | HTML 无 `<link rel="icon">` |
| 404 页 | 默认 | 未定制 `not-found.tsx` |

引用：SSR head 实测仅包含 `charset / viewport / stylesheet / preload / title / description / polyfills`。

---

## 3. Google 搜索可见性分析

**Google 目前能从站点读到什么**

从 SSR HTML 里，Google 只能明确抓到：
- 品牌名 “TokenTint”。
- 一句 slogan “Pick colors. Ship tokens.”。
- 一句通用描述 “A Chrome Extension for color picking and design token management.”。
- 首页 body 里的功能名（EyeDropper API / HEX/RGB/HSL / CSS Variables / Tailwind / W3C Tokens）。

**Google 目前**无法**可靠推断的东西**
- 主题实体：这是 “Chrome Extension”，还是 “网页应用”？title 里没写 Chrome Extension。
- 服务对象：Frontend Developer / UI Designer / Design System Engineer — 站上一次都没写。
- 解决什么问题：从网站取色 → 生成 palette → 导出 design token 的**全流程**。站上只是零散功能点，没有 use case 描述。
- 与 Tailwind、W3C Design Tokens、CSS Variables 的显式关联（body 里带过一次，但没有专门页面 / H1 / description 支撑）。

**Google 现在可能给你排的关键词（诚实估计）**
- `tokentint`（品牌词，第 1 位，无自然搜索量）。
- `pick colors ship tokens`（slogan，无搜索量）。
- 长尾意外命中：`chrome extension color picker design tokens` — 低权重，几乎进不了 top 20。
- 中文关键词：**基本零可见**，因为中文内容不在 SSR HTML 里。

**结论**：站点对 Google 是一个“品牌页”，不是“获客页”。搜索非品牌词进不来。

---

## 4. Keyword Strategy

不做泛词铺量，只挑“真的会安装 / 会付费”的意图。

### 一级（安装意图，商业价值最高）

| Keyword | Intent | 推荐落地页 | 备注 |
|---|---|---|---|
| `color picker chrome extension` | 装扩展 | `/color-picker-chrome-extension` | 商业头部词，竞对多但意图对，是主要战场 |
| `chrome extension color picker` | 装扩展 | 同上（同一页覆盖） | 语序变体 |
| `eyedropper extension chrome` / `eyedropper chrome extension` | 装扩展 | `/eyedropper-chrome-extension` | 与主战场略分开，因用户认知锚在 "eyedropper" 而非 "picker" |
| `website color picker` | 从网页取色 | `/website-color-picker` | "从网页" 意图强，转化好 |
| `pick colors from website` | 从网页取色 | 同上 | 长尾变体，放同一页 H2 / FAQ |

### 二级（工具意图，转化率更高、竞争更少）

| Keyword | Intent | 推荐落地页 | 备注 |
|---|---|---|---|
| `extract colors from website` | 提取整页配色 | `/extract-colors-from-website` | Pro 卖点核心，页面直连 "Extract Page Colors" 功能 |
| `website color palette generator` | 生成 palette | `/website-color-palette-generator` | 强意图，能带 Pro |
| `css variables generator` | 生成 CSS 变量 | `/css-variables-generator` | 前端开发者刚需，Free 卖点 |
| `tailwind color generator` | 生成 Tailwind 配色 | `/tailwind-color-generator` | Frontend / Tailwind 用户，高转化 |
| `tailwind config from website` | 场景长尾 | 同上页 FAQ 展开 | 差异化 vs 同类竞品 |
| `design token generator` | 生成 W3C Design Tokens | `/design-token-generator` | Design System 用户，客单价最高 |
| `w3c design tokens export` | 导出 W3C 格式 | 同上 | 精准长尾 |

### 三级（品牌 / 信任类，被动接住已进入漏斗的用户）

| Keyword | Intent | 落地页 |
|---|---|---|
| `tokentint pro` / `tokentint pricing` | 品牌 + 定价 | `/pricing`（现有） |
| `tokentint vs colorzilla` | 对比 | `/tokentint-vs-colorzilla`（后续，可延后） |

**主动放弃的词（写下来避免以后犹豫）**
- 泛 `color tool / palette maker / hex to rgb` — 这些是在线取色器意图，我们不是在线工具，转化差。
- `color picker online` — 想找 web app，不是想装扩展。
- `figma color plugin` — 走错生态。
- `graphic designer color palette` — 目标用户不对，我们的转化在开发者。

---

## 5. 页面架构建议

**当前**只有 `/`, `/pricing`, `/support` 是营销可用页，其余全是合规 / 交易页。**建议新增 6 个 SEO 落地页 + 1 个工具目录**：

| 新增 URL | Target Keyword | Search Intent | Conversion Goal | 内容锚点 |
|---|---|---|---|---|
| `/color-picker-chrome-extension` | color picker chrome extension | 装扩展 | 点 "Add to Chrome" | 3 张截图 + Free vs Pro + 与 ColorZilla / Eye Dropper 差异化 |
| `/eyedropper-chrome-extension` | eyedropper extension chrome | 装扩展 | Add to Chrome | 强调 EyeDropper API 原生集成、多格式复制、20 色历史 |
| `/website-color-picker` | website color picker / pick colors from website | 从网页取色 | Add to Chrome | 场景化：从任意 URL 抓取颜色，一次性 HEX/RGB/HSL |
| `/tailwind-color-generator` | tailwind color generator | 生成 Tailwind 配色 | Add to Chrome → Pro | 演示导出 `tailwind.config` 片段 |
| `/css-variables-generator` | css variables generator | 生成 CSS 变量 | Add to Chrome | Free 版即可用，走安装漏斗 |
| `/design-token-generator` | design token generator / w3c design tokens | 生成 W3C tokens | Add to Chrome → Pro | 面向 Design System Engineer，最有客单价的页 |
| `/tools/` (目录索引) | — | 内链枢纽 | 均衡分发权重 | 罗列上面 6 个落地页 + short description |

**首页 `/` 的改造目标**：不承担长尾关键词，只承担品牌 + 主关键词 `color picker chrome extension` + `design tokens`。改 title / meta / H1，其他关键词全部下沉到子页。

**`/pricing` 保持商业页**：不硬塞 SEO 关键词，但补 `SoftwareApplication` + `Offer` JSON-LD，把 $15 lifetime 的定价 signal 送给 Google。

**不建议现在做的页**
- `/blog/*` 系列文章 — 你已经明确不要博客铺量，我同意，先把上面 6 个高意图页做扎实。
- `/tokentint-vs-*` 对比页 — 有价值，但优先级低于自身落地页，放 Phase 2。

---

## 6. 转化漏斗分析

```
Google Search
   │  P1: 站点长尾覆盖 ≈ 0（title/description 无关键词，只有 3 个营销页，无 sitemap）
   ▼
Landing Page (www.tokentint.xyz)
   │  P2: 页面无产品截图 / 无 use case / 无社会证明 / OG 缺失 → 首屏说服力弱
   ▼
Chrome Web Store click
   │  P3: 首页 & pricing 都有 "Add to Chrome"，链接正确 ✓
   ▼
Install
   │  P4: 装完没有 onboarding 回站钩子 → 用户流失，不知道有 Pro
   ▼
Pro Upgrade ($15)
      P5: pricing → upgrade → Creem 流程干净 ✓
```

**当前最大阻塞点（按影响权重排）**

1. **P1 站点根本没有 SEO 进口**（决定性问题）
   Google 搜索非品牌词，站点完全接不到流量。修 title / meta / sitemap / robots + 上 6 个落地页可解一半。

2. **P2 落地页说服力弱**（决定性问题）
   零截图、零 GIF、零 use case、零 social proof（用户数 / 评分 / 引用）。装扩展是一个 “视觉决定”，用户没看到产品长什么样就不会点 Add to Chrome。

3. **P4 安装后没有回流钩子**（Pro 升级瓶颈）
   扩展装完，用户不知道 `/upgrade` 存在。**建议在扩展内的 "Upgrade to Pro" 按钮直连 `https://www.tokentint.xyz/upgrade?src=ext`**，并追踪 `src` 参数。这一步不做，Pro 转化几乎完全依赖用户主动搜索。

4. **中文 SEO 完全无效**（中国 / 台湾 / 华人开发者获客通道断）
   `LanguageProvider` 是 client-only 的，SSR 只出英文。Google 索引不到中文页。如果不打算认真做中文 SEO，就把中文 toggle 保留但**不要指望它带流量**；如果要做，必须走 `/zh` 路由 + SSR 语言分支 + `hreflang`。

5. **P5 Creem 结账已合格，不动。**

---

## 7. 优先级 / 执行顺序 / 不建议做的事

### 优先级排序（P0 → P3）

**P0（本周就做，纯技术，收益立竿见影）**
1. 改首页 `<title>` / `<meta description>`，从 slogan 换成 keyword-rich：
   - Title: `TokenTint — Color Picker Chrome Extension for Design Tokens`
   - Description: `Pick colors from any website, save palettes, and export CSS variables, Tailwind config, or W3C design tokens. Free Chrome extension for frontend developers and designers.`
2. 补全 `layout.tsx` metadata：`metadataBase`, `canonical`, `openGraph`, `twitter`, `alternates`, `icons`。
3. 新增 `app/robots.ts` + `app/sitemap.ts`（Next.js 14 App Router 官方方式），把 8 个真实 URL 全部列出。
4. 首页 + `/pricing` 加 `<h1>`（`/pricing` 现在没有 H1）。所有子页把 `<h2>` → `<h1>` 修正。
5. 补 favicon + OG 分享图（1200×630）+ 至少 3 张扩展截图（PNG/WebP，带 alt）。
6. 首页 body 补 4–6 行 use case 文案："for frontend developers / UI designers / design systems / Tailwind users"，让 Google + 用户都能明白服务对象。

**P1（2 周内做，内容驱动）**
7. 上线 6 个 SEO 落地页（第 5 节列表），每页硬要求：
   - 精确 1 个 `<h1>` = target keyword 的自然表述。
   - 1 张主截图 + 1 张 GIF（可用扩展 store screenshots 复用）。
   - Free vs Pro 差异摘要 + 双 CTA（Add to Chrome / Upgrade to Pro）。
   - FAQ 3–5 条，附 `FAQPage` JSON-LD。
   - 每页互相 3 条内链，锚文本用关键词。
8. 首页加 `SoftwareApplication` JSON-LD（`applicationCategory: DeveloperApplication`, `operatingSystem: Chrome`, `offers: $0 free + $15 lifetime`）。
9. 扩展内 "Upgrade to Pro" 按钮改成 `https://www.tokentint.xyz/upgrade?src=ext-popup`，为后续埋点做准备（暂不引入分析工具，仅保留 URL 参数）。
10. Google Search Console 提交 sitemap；Bing Webmaster 同步。

**P2（1 个月内做，长尾放大）**
11. 加英文 `/tools/` 索引页做内链枢纽。
12. Chrome Web Store description **保持**当前版本（[docs/STORE_LISTING_COPY.md](docs/STORE_LISTING_COPY.md) 已经写得很好，别为了 SEO 塞关键词，会触发商店审核）。
13. 提交到高信任外链：Product Hunt、Awesome Chrome Extensions、Awesome Design Tokens、Reddit r/webdev + r/tailwindcss（真诚介绍，不刷）。这是**唯一**建议做的外链动作。

**P3（观察期，2 个月后再评估）**
14. 中文 SEO：如果 GSC 数据显示中文品牌搜索 > 0，才动手改成 `/zh/*` 路由 + `hreflang` + SSR 语言分支。否则不投入。
15. 对比页 `/tokentint-vs-colorzilla` 之类，只在 GSC 里看到用户已经在搜 "colorzilla alternative" 时才写。

### 不建议做的事（明确写下来，避免走弯路）

- ❌ **不要发博客文章刷流量**（"10 best color pickers of 2026" 那种）。用户不要，Google 也在压 AI/低质长文的权重。
- ❌ **不要 keyword stuffing**：不要把 "color picker chrome extension eyedropper hex rgb hsl tailwind" 一口气堆进 title 或 meta。Google 会截断 + 认定 spam。当前 title 关键词密度是 0，改后目标是每个词 1 次，自然通顺。
- ❌ **不要为了 SEO 加占位文案** —— 例如给 `/privacy` `/terms` 塞产品关键词。合规页保持纯净。
- ✅ **官网分析必须保持显式事件和最小数据范围**。当前官网使用 Mixpanel 的 `web_` 事件，不启用 Autocapture 或 Session Replay；扩展仍不发送产品使用分析。新增分析能力时必须同步更新隐私政策和数据地图。
- ❌ **不要伪造 hreflang** ——目前中文页不真的存在，加 hreflang 会被 Google 判为 misconfig。要做就 SSR 出中文页，再加。
- ❌ **不要在 Chrome Web Store 描述里堆关键词**。当前 `_locales/en/messages.json` 的 title `TokenTint – Color Picker & Design Tokens` 已经够用，商店会因为 keyword stuffing 拒审。
- ❌ **不要拆太多页面** —— 6 个落地页 + `/tools` 索引就够，别一口气上 20 个空壳页，会稀释权重。

### 快速自检清单（Audit 完成后回看）

- [ ] 首页 title 里出现 "Color Picker" + "Chrome Extension" + "Design Tokens"。
- [ ] `curl https://www.tokentint.xyz/robots.txt` 返回 200 且指向 sitemap。
- [ ] `curl https://www.tokentint.xyz/sitemap.xml` 返回 200 且包含 6 个新落地页。
- [ ] 首页 HTML 里能 grep 到 `og:image` 和 `SoftwareApplication`。
- [ ] 每个落地页有唯一 `<h1>` 与 target keyword 一致。
- [ ] 扩展 popup 里 "Upgrade to Pro" 跳到 `?src=ext-popup`。
- [ ] Google Search Console 已提交 sitemap 且没有 coverage error。

---

**Audit 完成。等待下一步指令。**
建议下一步先做 P0（title / meta / robots / sitemap / OG / JSON-LD / H1 修正），一次改完再进 P1 落地页内容。






