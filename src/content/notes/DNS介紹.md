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

> 💡 小知識
>
> `.idv.tw` 是由 **TWNIC** 管理的第二層網域（Second-Level Domain）。
>
> 因此查詢 `alvinhomelab.idv.tw` 時，`.tw` 的權威 DNS 就能直接告訴 Resolver：
>
> 「這個網域交給 Cloudflare 管理。」

🤣 可以把它想成：

> 「請問 Alvin Homelab 在哪呢？」

Root：

> 「我不知道，但 .tw 我認識!」

.tw：

> 「是 Cloudflare 在管理。」

Cloudflare：

> 「鏘鏘！ 在我這裡喔。」

---

# 常見 DNS 記錄

每個網域都會有許多不同的 DNS 記錄，就像一張張資料卡。

| 紀錄 | 用途 |
|------|------|
| A | IPv4 位址 |
| AAAA | IPv6 位址 |
| CNAME | 網域別名 |
| MX | 電子郵件伺服器 |
| TXT | 驗證、SPF、DKIM 等資訊 |
| NS | 指定權威 DNS |
| SOA | DNS 區域基本資訊 |
| CAA | 限制哪些憑證機構可以簽發 SSL 憑證 |

🤣 如果把網站比喻成一家店：

- A和AAAA：店家地址
- MX：郵件收件地址
- TXT：貼在門口的公告
- NS：告訴大家「這個網域由誰管理」
- CNAME：店家的別名
- CAA：只有指定單位才能幫店家發證照

---

# 權威 DNS（Authoritative DNS）

每個網域都需要指定權威 DNS，它負責保存該網域真正的 DNS 記錄。

例如本站：

```text
alvinhomelab.idv.tw
```

目前使用：

```text
daisy.ns.cloudflare.com
fred.ns.cloudflare.com
```

因此，Cloudflare 負責回答全世界：

> 「alvinhomelab.idv.tw 的 DNS 紀錄是什麼？」

---

# DNS 代管

DNS 並不一定要由網域註冊商提供喔。

常見 DNS 代管服務包括：

- Cloudflare DNS
- Amazon Route 53
- Google Cloud DNS
- Azure DNS（Microsoft Azure 的 DNS 服務）
- 中華電信 HiNet Pro DNS
- 網域註冊商提供的 DNS
- 自架 BIND、PowerDNS 等

每一家都有不同特色，例如：

- Cloudflare：免費方案完整，適合個人網站。
- Route 53：適合 AWS 生態系。
- Azure DNS：適合 Microsoft Azure 雲端服務。
- HiNet Pro DNS：企業級 DNS 代管服務。

---

# 本站架構

本站目前採用：

```text
PowerWeb（網域註冊）
          │
Cloudflare（DNS）
          │
GitHub Pages（網站）
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