---
title: "DNS介紹"
category: "networking"
updatedAt: 2026-08-30
---
# DNS

今天我們要來介紹 DNS

**DNS（Domain Name System）**，中文名稱：網域名稱系統

## 一、什麼是 DNS

簡單來講就是域名和 IP 地址相互對映

例如輸入 `google.com` 會經過這些事情：

```
google.com → DNS → 142.250.66.78
```

如果是：

```
142.250.66.78 → DNS → google.com
```

就是所謂的 **DNS 反解**

## 二、為什麼需要 DNS

因為電腦真正的溝通是靠 IP 位址，但 IP 位址對人類來說是很難記的，所以才用「好記的名字」（Domain name）對應到 IP 位址，方便人類訪問網際網路

## 三、常見的 DNS 紀錄類型（Resource record）

| 紀錄類型 | 說明 |
|---|---|
| 主機紀錄（A record） | **重要紀錄**，將主機域名對映到 IPv4 位址上 |
| 別名紀錄（CNAME record） | 域名的別名（就是指向另一個域名） |
| IPv6 紀錄（AAAA record） | 與 A record 對應，將主機域名對映到 IPv6 位址上 |
| 郵件交換紀錄（MX record） | 指定郵件伺服器 |
| 指標紀錄（PTR record） | 將 IP 地址反向對映到主機域名 |
| 名稱伺服器紀錄（NS record） | **重要紀錄**，指定該域名的權威伺服器 |
| 文字紀錄（TXT record） | 存放人類可讀筆記的地方，機器可讀資料也可以 |

## 四、查詢流程

DNS 查詢其實有兩種：**遞迴**和**迭代**

我們客戶端一般都是採用遞迴查詢，DNS 伺服器之間則採用迭代查詢

- **遞迴查詢（Recursive Query）**：客戶端向公共 DNS 進行查詢請求，公共 DNS 代替客戶端從根域名 → 頂級域名 → 權威伺服器，之後回傳 IP 給客戶端並快取
- **迭代查詢（Iterative Query）**：公共 DNS 逐步地去詢問根域名、頂級域名、權威伺服器，每一層都只會告訴你「答案」或「我不知道，你去問誰」，直到得到答案為止

下方為示範遞迴查詢：

```
客戶端 → Recursive Resolver（公共DNS伺服器） → Root Server（根域名伺服器） → TLD Server（頂級域名伺服器） → Authoritative Server（權威伺服器）
```

當你查 `google.com` 時實際發生的階層式查詢：

```
客戶端 → Recursive Resolver → Root Server → TLD Server（.com） → Authoritative Server（google.com的權威伺服器） → 拿到IP後一路傳回來
```

## 五、DNS 使用什麼協定

- 預設使用 **UDP Port 53**
- 如果回答超過 512 位元組，並且客戶端和伺服端都支援 DNS 擴充機制（**EDNS**），可能會用更大的 UDP 封包
- 當然也會用到 **TCP 封包**，例如：區域傳輸、連 EDNS 都裝不下的情況

## 六、加密 DNS

### DNS over TLS（DoT）

- 使用 TLS 對整個 DNS 查詢連線進行加密並打包，防止被竊聽或竄改（中間人攻擊）
- 使用 **TCP Port 853**
- 支援**機會加密**和**金鑰固定加密**，但沒有強制伺服器或客戶端認證

### DNS over HTTPS（DoH）

- 使用 HTTP 或 HTTP/2（HTTPS）協定傳送 DNS 查詢連線並進行加密（使用 TLS 加密）
- 使用 **TCP Port 443**
- 由於使用 Port 443 會跟正常的網路流量一樣，難以透過連接埠封鎖

## 七、DNS 劫持和汙染

- **DNS 劫持**：伺服器遭到入侵或被控制，並竄改回應，使客戶端導向錯誤 IP 位址
- **DNS 汙染**：伺服器沒有被入侵，而是在真正的 DNS 回答前，搶先偽造 DNS 回應，使客戶端取得錯誤的 DNS 資訊和 IP 地址

## 八、DNS 放大攻擊（DNS Amplification Attack）

是 DDoS 攻擊的一種，攻擊者傳送小型查詢指令來獲取龐大的回應資料（以小博大），並將龐大的回應導向受害者，導致服務阻斷

## 九、參考資料

- [域名系統 - 維基百科](https://zh.wikipedia.org/zh-tw/%E5%9F%9F%E5%90%8D%E7%B3%BB%E7%BB%9F)
- [RFC 7858](https://datatracker.ietf.org/doc/html/rfc7858)
- [DNS over TLS 與 DNS over HTTPS｜保護 DNS - Cloudflare](https://www.cloudflare.com/zh-tw/learning/dns/dns-over-tls/)
- [DNS 放大攻擊](https://www.cloudflare.com/zh-tw/learning/ddos/dns-amplification-ddos-attack/)
- [DNS over TLS - 維基百科](https://zh.wikipedia.org/wiki/DNS_over_TLS)
- [DNS over HTTPS - 維基百科](https://zh.wikipedia.org/wiki/DNS_over_HTTPS)