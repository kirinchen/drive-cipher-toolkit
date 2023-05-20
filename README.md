# drive-cipher-toolkit

A web-based toolkit to document of google drive encryption & decrypt 

一個基於網頁的小工具，用於google drive加密/解密文件

![](https://hackmd.io/_uploads/BkWssvUrh.png)

## 專案開發/設定
* 步驟 1：安裝 Node.js 和 npm
React 需要 Node.js 環境來運行，所以首先需要安裝 Node.js。你可以從官方網站（https://nodejs.org）下載並安裝 Node.js。

安裝完 Node.js 之後，你也會同時獲得 npm（Node Package Manager）。npm 是一個用於安裝和管理 JavaScript 套件的工具，我們將在後續步驟中使用到它。


* 步驟 2: Checkout **https://github.com/kirinchen/drive-cipher-toolkit.git**
* 步驟 3: 在專案根目錄下 下指令 `npm install`
* 步驟 4: 在根目錄下創建 **.env** 內容如下
```json=
REACT_APP_GAPI_API_KEY={Google API Key}
REACT_APP_GAPI_OAUTH_CLIENT_ID={Google Auth Client ID}
REACT_APP_VERSION=0.1.0
```
> Google API Key & Google Auth Client ID 請參考 [瞭解驗證相關資訊和授權](https://developers.google.com/drive/api/guides/about-sdk?hl=zh-tw)

> 設定OAuth 同意畫面>範圍請設定以下權限 
```l=
'https://www.googleapis.com/auth/drive',
'https://www.googleapis.com/auth/drive.file',
'https://www.googleapis.com/auth/drive.readonly',
'https://www.googleapis.com/auth/drive.metadata.readonly',
'https://www.googleapis.com/auth/drive.appdata',
'https://www.googleapis.com/auth/drive.metadata',
'https://www.googleapis.com/auth/drive.photos.readonly'
```
* 步驟 5: 下指令 `npm start`
> 這將啟動一個本地開發服務器，並在瀏覽器中打開你的 React 項目。
 
![](https://hackmd.io/_uploads/HJpZetLSn.png)


## How To Use

* 點擊 -> ![](https://hackmd.io/_uploads/BJMUeK8Sn.png)
* Google 登入
* 輸入一個你google drive的檔案名稱(須完整)
![](https://hackmd.io/_uploads/rJ8ybYIB2.png)
* 加密你的文件
![](https://hackmd.io/_uploads/SJ4JmKUBh.png)
> A 輸入加密密碼
> B 點擊上傳覆蓋 

* 此時已經加密完成
![](https://hackmd.io/_uploads/rkiyOY8Hn.png)
* 要解密時下次下方輸入密碼就可以解密了
![](https://hackmd.io/_uploads/S1Yr_FLB3.png)





