---
title: "DNS基本介紹"
category: "dns"
updatedAt: 2026-07-18
---

DNS（Domain Name System，網域名稱系統）是網際網路的重要基礎設施，負責將人類容易記憶的網域名稱轉換成電腦能理解的 IP 位址。

例如：

```text
www.google.com
        ↓
142.250.xxx.xxx
```

如果沒有 DNS，我們每天上網就必須記住每個網站的 IP 位址，而不是輸入網域名稱。

## DNS 的運作流程

當你在瀏覽器輸入：

```text
https://alvinhomelab.idv.tw
```

大致會經過以下流程：

```text
使用者
    │
    ▼
瀏覽器
    │
    ▼
DNS Resolver（ISP、Cloudflare、Google DNS...）
    │
    ▼
Root DNS
    │
    ▼
.tw
    │
    ▼
idv.tw
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

## 常見 DNS 紀錄

| 紀錄 | 用途 |
|------|------|
| A | IPv4 位址 |
| AAAA | IPv6 位址 |
| CNAME | 網域別名 |
| MX | 電子郵件伺服器 |
| TXT | 驗證、SPF、DKIM 等 |
| NS | 指定權威 DNS |
| SOA | DNS 區域基本資訊 |
| CAA | 限制可簽發 SSL 憑證的 CA |

## 權威 DNS（Authoritative DNS）

每個網域都需要指定權威 DNS。

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

## DNS 代管

DNS 並不一定要由網域註冊商提供。

常見 DNS 代管服務包括：

- Cloudflare DNS
- Amazon Route 53
- Google Cloud DNS
- Azure DNS  *Azure是微軟推出的公有雲端運算平台*
- 中華電信 HiNet Pro DNS
- 網域註冊商提供的 DNS
- 自架 BIND、PowerDNS 等

## 本站架構

本站目前採用：

```text
Dynadot（網域註冊）
          │
Cloudflare（DNS）
          │
GitHub Pages（網站）
```

Cloudflare 負責 DNS 與 HTTPS，GitHub Pages 則作為網站的來源（Origin）。

## 總結

DNS 是網際網路的重要基礎設施，它讓使用者可以透過容易記憶的網域名稱存取網站，而不需要記住 IP 位址。

不論是個人網站、企業網站，或大型雲端服務，都需要可靠的 DNS 系統才能正常運作。