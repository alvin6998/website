---
title: "DNS 基本介紹"
category: "dns"
updatedAt: 2026-07-18
---

# DNS 是什麼？🤔

DNS（Domain Name System，網域名稱系統）是網際網路的重要基礎設施，負責將人類容易記憶的網域名稱，轉換成電腦能理解的 IP 位址。

例如：

```text
www.google.com
        ↓
142.250.xxx.xxx
```

如果沒有 DNS，我們每天上網就必須記住每個網站的 IP 位址，而不是輸入網域名稱。

可以把 DNS 想成網際網路的「電話簿」📖，只要輸入網站名稱，它就會幫你找到真正的位址。

---

# 為什麼需要 DNS？

電腦與電腦之間，其實只認得 IP 位址。

但 IP 位址對人類來說，實在很難記。

想像一下：

```text
你想找 Google

但你要背的是

142.250.xxx.xxx

而不是

google.com
```

有了 DNS，我們只需要記住好記的名字，剩下的翻譯工作，都交給 DNS 系統來處理。

---

# DNS 的運作流程

假設今天你在瀏覽器輸入：

```text
https://alvinhomelab.idv.tw
```

電腦並不知道網站在哪裡，它會開始一路詢問：

```text
你
 │
 ▼
DNS Resolver
 │
 ▼
Root DNS
 │
 ▼
.tw
 │
 ▼
Cloudflare Authoritative DNS
 │
 ▼
取得網站 IP
 │
 ▼
開始連線網站
```

🤣 可以把它想成：

> 「請問 Alvin Homelab 在哪呢？」

Root：

> 「我不知道，但 .tw 我認識!」

.tw：

> 「是 Cloudflare 在管理。」

Cloudflare：

> 「鏘鏘！ 在我這裡喔。」

---

# Root、TLD、權威 DNS

DNS 的架構其實是一層一層往下委派的：

- **Root DNS**：整個 DNS 系統的最頂層，知道每個頂級網域（TLD）該去問誰
- **TLD（Top-Level Domain）**：例如 `.tw`、`.com`、`.idv.tw`，知道這個網域是交給哪個單位管理
- **權威 DNS（Authoritative DNS）**：真正保存該網域 DNS 記錄的伺服器，負責回答最終答案

> 💡 小知識
>
> `.idv.tw` 是由 **TWNIC** 管理的第二層網域（Second-Level Domain）。
>
> 因此查詢 `alvinhomelab.idv.tw` 時，`.tw` 的權威 DNS 就能直接告訴 Resolver：
>
> 「這個網域交給 Cloudflare 管理。」

這一層一層往下問的方式，就是為什麼 DNS 查詢有時候會經過好幾個環節，才能拿到最終答案。

---

# 本站實際架構

本站目前採用：

```text
PowerWeb（網域註冊）
          │
Cloudflare（DNS）
          │
GitHub Pages（網站）
```

實際負責回答 DNS 查詢的權威伺服器是：

```text
daisy.ns.cloudflare.com
fred.ns.cloudflare.com
```

Cloudflare 負責 DNS、HTTPS 與 CDN，而 GitHub Pages 則作為網站的來源（Origin）。

---

# 總結

DNS 是網際網路不可或缺的一部分。

沒有 DNS，我們每天可能要背一大堆 IP 位址才能上網。

有了 DNS，只需要記住：

```
google.com
youtube.com
github.com
alvinhomelab.idv.tw 😆
```

剩下的事情，就交給 DNS 幫你完成吧！

---

常見的 DNS 記錄有哪些呢？

下一篇我們一起來認識！
