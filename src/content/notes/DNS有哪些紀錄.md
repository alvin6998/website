---
title: "DNS 有哪些紀錄？"
category: "dns"
updatedAt: 2026-07-18
---

上一篇我們介紹了 DNS 是什麼。

現在來看看 DNS 到底存了哪些資料吧！

---

## 什麼是 DNS 記錄？

DNS 記錄（DNS Record）可以想成網站的一張張資訊卡。

每張資訊卡都有不同的用途。

例如：

🏠 網站地址

📧 電子郵件

🔒 SSL 憑證

等等。

當有人查詢你的網域時，權威 DNS 就會依照這些資訊卡回答。

---

## A（Address）

A Record 負責記錄網站的 IPv4 位址。

例如：

```text
example.com
     ↓
104.21.xxx.xxx
```

當瀏覽器查詢網站時，最常取得的就是 A Record。

🤣

```text
瀏覽器：

「example.com」

DNS：

「104.21.xxx.xxx。」
```

---

## AAAA

跟 A Record 很像，但這次記錄的是 **IPv6** 位址。

```text
2606:4700:3037::6815:23b7
```


現在很多網站會同時提供 A 和 AAAA，讓支援 IPv6 的使用者可以走更新的網路協定連線。

---

## CNAME

CNAME 可以想成：

「綽號」。

例如：

```text
www.example.com
     ↓
example.com
```

當有人查 `www.example.com`，DNS 會先告訴你「這其實是 example.com 的綽號」，然後再繼續去查 `example.com` 真正的 IP。

⚠️ 小提醒：CNAME 有一個規定 —— 同一個名稱如果設了 CNAME，就**不能同時存在其他記錄**（例如不能又是 CNAME 又是 MX）。這也是為什麼根網域（像 `example.com` 本身）通常不能用 CNAME，只能用 A 記錄，是滿多人會踩到的雷。

---

## MX（Mail Exchange）

MX 記錄負責告訴大家：這個網域的信要送去哪台郵件伺服器。

```text
寄信
 ↓
MX
 ↓
Mail Server
```

🤣

郵差：

「信送去哪？」

MX：

「送去 mail.example.com，優先權 10 喔！」

前面的數字（例如 10）是**優先權**，數字越小代表優先權越高，可以設多筆做備援，主要的伺服器掛掉時，信件就會改送到優先權次高的伺服器。

---

## TXT

TXT 記錄可以存放任意文字，最常見的用途有：

```text
Google Site Verification

SPF

DKIM

DMARC
```

🤣

設定 Google 搜尋引擎收錄的時候，是不是要貼一段驗證碼？

Google 驗證：

「請把這段文字放進你的 TXT 記錄。」

你：

「好啦好啦，貼上去了！」

Google：

「驗證成功 ✅」

那個就是 TXT 記錄在做的事。

⚠️ 小提醒：一個網域可以有很多筆 TXT 記錄，但如果塞太多筆、或內容太長，可能會影響查詢效能，所以不是越多越好。

---

## NS（Name Server）

這個直接用本站的例子最好懂 🤣

```text
alvinhomelab.idv.tw
        ↓
daisy.ns.cloudflare.com
fred.ns.cloudflare.com
```

NS 記錄就是在告訴全世界：

「我的 DNS 在哪裡管理。」

當 Resolver 查到這筆記錄，就知道之後所有關於這個網域的問題，都應該去問 Cloudflare。

---

## SOA（Start of Authority）

SOA 記錄記載這個 DNS 區域（Zone）的基本管理資訊，每個 Zone 只會有一筆。

主要包含：

- **Serial**：序號，每次修改記錄都要遞增
- **Refresh**：多久檢查一次是否有更新
- **Retry**：檢查失敗後，多久重試一次

💡 Serial 其實滿重要的：如果忘記在修改後更新 Serial，次要 DNS 伺服器可能會以為資料沒變，就不會去同步最新的內容。

---

## CAA

CAA 記錄負責限制：哪些憑證機構（CA）可以幫這個網域簽發 SSL/TLS 憑證。

🤣

Let's Encrypt：

「我可以發憑證嗎？」

CAA：

「可以。」

或

「不行，這裡只認 DigiCert。」

這樣就能防止有心人士，跑去其他 CA 幫你的網域申請一張你根本沒同意的憑證。

---

## 🧪 Alvin 實驗室

自己動手試試看，用 `nslookup` 查查看不同的紀錄長什麼樣子！

```text
nslookup -type=A alvinhomelab.idv.tw

nslookup -type=AAAA alvinhomelab.idv.tw

nslookup -type=NS alvinhomelab.idv.tw

nslookup -type=MX alvinhomelab.idv.tw

nslookup -type=TXT alvinhomelab.idv.tw
```

試著比對一下，是不是跟這篇筆記講的一樣呢？尤其是 TXT，說不定會查到你自己之前設定驗證時貼上去的那一串 😆
