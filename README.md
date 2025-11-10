<p align="center">
	<p align="center">Quran API</p>
</p>

<p align="center">
  <img alt="GitHub Tag" src="https://img.shields.io/github/v/tag/rzkytmgr/quran-api?logoColor=f2f5f4&label=quran-api&labelColor=0bd09f&color=f2f5f4">
  <img src="https://img.shields.io/website?url=https%3A%2F%2Fstaticquran.vercel.app%2F&label=vercel">
  <br>
  <img src="https://img.shields.io/github/actions/workflow/status/rzkytmgr/quran-api/matrix-testing.yml">
  <img alt="GitHub Actions Workflow Status" src="https://img.shields.io/github/actions/workflow/status/rzkytmgr/quran-api/vercel-release.yml?label=release">
  <img src="https://img.shields.io/github/license/rzkytmgr/quran-api">
</p>

<hr>

Static Quran RESTful API is a fast and multilingual Node.js project (built with JavaScript/TypeScript and Express) that provides complete Quran data in JSON format — including surahs, ayahs, and translations (currently in English and Indonesian). It also supports murottal audio from up to 30 reciters, with per-ayah playback fetched from third-party sources. Designed for speed and flexibility, this API helps developers easily integrate Quran data and audio into their applications.

<details open>
  <summary><b>Table of Contents</b></summary>
  <ul>
    <li>
      <a href="#installation">Installation</a>
    </li>
    <li>
      <a href="#usage">Usage</a>
		<ol type="1">
			<li>
				<a href="#1--get-all-reciters---200-ok-try-it">Get All Reciters</a>
			</li>
			<li>
				<a href="#2--get-one-spesific-reciter---200-ok-try-it">Get One Spesific Reciter Details</a>
			</li>
			<li>
				<a href="#3--get-all-surah-metadata---200-ok-try-it">Get All Quran Surah Metadata</a>
			</li>
			<li>
				<a href="#4--get-one-surah-with-ayah---200-ok-try-it">Get One Spesific Surah with Including Ayah</a>
			</li>
			<li>
				<a href="#5--get-spesific-ayah-in-a-surah---200-ok-try-it">Get One Spesific Ayah in a Surah</a>
			</li>
			<li>
				<a href="#6--get-spesific-ayah-in-quran---200-ok-try-it">Get Spesific Ayah in Quran</a>
			</li>
			<li>
				<a href="#7--get-one-random-quran-ayah---200-ok-try-it">Get Random Quran Ayah</a>
			</li>
		</ol>
    </li>
    <li>
      <a href="#data-source">Data Source</a>
    </li>
    <li>
      <a href="#contribution">Contribution</a>
    </li>
  </ul>
</details>

<hr>

## Installation

Clone the repository to your local machine
```bash
git clone https://github.com/rzkytmgr/quran-api && cd quran-api
```
Build the docker image then run the container
```bash
docker build -t quran-api .
```
```bash
docker run --name quran-api -p 3001:3001 quran-api
```
Or if you prefer deploy it to vercel directly, you can click vercel deploy button below,  
<br>
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frzkytmgr%2Fquran-api%2Ftree%2Frelease%2Fvercel)


## Usage
### Demo Host
> [https://staticquran.vercel.app](https://staticquran.vercel.app)
### Endpoints
##### 1- Get All Reciters - 200 OK [`Try it`](https://staticquran.vercel.app/api/v1/reciters)
```bash
GET /api/v1/reciters
```
```javascript
HTTP/1.1 200
Content-Type: application/json

{
	"success": true,
	"message": "Reciter retrieved successfully",
	"data": [
		{
			"id": 1,
			"name": "Abdul Basit 'Abd us-Samad"
		},
		{	
			"id": 2,
			"name": "Abdullah Ibn Ali Basfar"
		},
		...
	]
}
```
##### 2- Get One Spesific Reciter - 200 OK [`Try it`](https://staticquran.vercel.app/api/v1/reciter/25)
```bash
GET /api/v1/reciter/:reciter
```
```javascript
HTTP/1.1 200
Content-Type: application/json

{
	"success": true,
	"message": "Reciter retrieved successfully",
	"data": {
		"id": 25,
		"name": "Yasser Ad-Dosari"
	}
}
```
##### 3- Get All Surah Metadata - 200 OK [`Try it`](https://staticquran.vercel.app/api/v1/surah)
```bash
GET /api/v1/surah
```
```javascript
HTTP/1.1 200
Content-Type: application/json

{
	"success": true,
	"message": "Data Retrieved Successfully",
	"data": [
		{
			"sequence": 1,
			"ayahCount": 7,
			"type": {
				"arabic": "مكة",
				"latin": "Meccan"
			},
			"name": {
				"arabic": {
					"long": "سُورَةُ ٱلْفَاتِحَةِ",
					"short": "الفاتحة"
				},
				"latin": {
					"long": "Sura Al-Faatiha",
					"short": "Al-Faatiha"
				}
			},
			"translation": "The Opening",
			"tafsir": null,
			"preBismillah": {
				"text": "﻿بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
				"translation": "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
				"transliteration": "Bismillaahir Rahmaanir Raheem"
			},
			"recitation": {
			"audio": "https://download.quranicaudio.com/quran/yasser_ad-dussary/001.mp3"
			}
		},
		...
}
```
##### 4- Get One Surah with Ayah - 200 OK [`Try it`](https://staticquran.vercel.app/api/v1/surah/114)
```bash
GET /api/v1/surah/:surahSequence
```
```javascript
HTTP/1.1 200
Content-Type: application/json

{
	"success": true,
	"message": "Data Retrieved Successfully",
	"data": {
		"sequence":  114,
		"ayahCount":  6,
		"type":  {
			"arabic":  "مكة",
			"latin":  "Meccan"
		},
		"name":  {
			"arabic":  {
				"long":  "سورة الناس",
				"short":  "الناس"
			},
		"latin":  {
			"long":  "Sura An-Naas",
			"short":  "An-Naas"
		}
	},
	"translation":  "Mankind",
	"tafsir":  null,
	"preBismillah":  {
		"text":  "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
		"translation":  "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
		"transliteration":  "Bismillaahir Rahmaanir Raheem"
	},
	"recitation":  {
		"audio":  "https://download.quranicaudio.com/quran/yasser_ad-dussary/114.mp3"
	},
	"ayah":  [
		{
			"sequence":  {
				"quran":  6231,
				"surah":  1
			},
			"juz":  30,
			"manzil":  7,
			"page":  604,
			"ruku":  556,
			"hizb":  240,
			"sajda":  false,
			"text":  "قُلْ أَعُوذُ بِرَبِّ النَّاسِ",
			"transliteration":  "Qul a'uzu birabbin naas",
			"translation":  "Say, \"I seek refuge in the Lord of mankind,",
			"tafsir":  null,
			"recitation":  {
				"audio":  "https://everyayah.com/data/Yasser_Ad-Dussary_128kbps/114001.mp3"
			}
		},
		...
	]
}
```
##### 5- Get Spesific Ayah In A Surah - 200 OK [`Try it`](https://staticquran.vercel.app/api/v1/surah/114/ayah/1)
```bash
GET /api/v1/surah/:surahSequence/ayah/:ayahSequence
```
```javascript
HTTP/1.1 200
Content-Type: application/json

{
	"success": true,
	"message": "Data Retrieved Successfully",
	"data": {
		"sequence":  {
			"quran":  6231,
			"surah":  1
		},
		"juz":  30,
		"manzil":  7,
		"page":  604,
		"ruku":  556,
		"hizb":  240,
		"sajda":  false,
		"text":  "قُلْ أَعُوذُ بِرَبِّ النَّاسِ",
		"transliteration":  "Qul a'uzu birabbin naas",
		"translation":  "Say, \"I seek refuge in the Lord of mankind,",
		"tafsir":  null,
		"recitation":  {
			"audio":  "https://everyayah.com/data/Yasser_Ad-Dussary_128kbps/114001.mp3"
		}
	}
}
```
##### 6- Get Spesific Ayah in Quran - 200 OK [`Try it`](https://staticquran.vercel.app/api/v1/ayah/6231)
```bash
GET /api/v1/ayah/:ayahSequence
```
```javascript
HTTP/1.1 200
Content-Type: application/json

{
	"success": true,
	"message": "Data Retrieved Successfully",
	"data": {
		"sequence":  {
			"quran":  6231,
			"surah":  1
		},
		"juz":  30,
		"manzil":  7,
		"page":  604,
		"ruku":  556,
		"hizb":  240,
		"sajda":  false,
		"text":  "قُلْ أَعُوذُ بِرَبِّ النَّاسِ",
		"transliteration":  "Qul a'uzu birabbin naas",
		"translation":  "Say, \"I seek refuge in the Lord of mankind,",
		"tafsir":  null,
		"recitation":  {
			"audio":  "https://everyayah.com/data/Yasser_Ad-Dussary_128kbps/114001.mp3"
		}
	}
}
```
##### 7- Get One Random Quran Ayah - 200 OK [`Try it`](https://staticquran.vercel.app/api/v1/ayah/random)
```bash
GET /api/v1/ayah/random
```
```javascript
HTTP/1.1 200
Content-Type: application/json

{
	"success": true,
	"message": "Data Retrieved Successfully",
	"data": {
		"sequence":  {
			"quran":  5858,
			"surah":  10
		},
		"juz":  30,
		"manzil":  7,
		"page":  588,
		"ruku":  525,
		"hizb":  235,
		"sajda":  false,
		"text":  "وَيْلٌ يَوْمَئِذٍ لِّلْمُكَذِّبِينَ",
		"surah":  83,
		"transliteration":  "Wailuny yawma'izil lil mukazzibeen",
		"translation":  "Woe, that Day, to the deniers,",
		"tafsir":  null,
		"recitation":  {
			"audio":  "https://everyayah.com/data/Yasser_Ad-Dussary_128kbps/083010.mp3"
		}
	}
}
```
## Data Source
Based on crawler codes you can see the data source,
1. [Kementrian Agama (Ministry of Religious Affairs Indonesia)](https://quran.kemenag.go.id/)
2. [Al-Qur'an Cloud Platform](http://alquran.cloud/)
3. [Every Ayah - Verse by verce quran mp3 project](https://everyayah.com/)
4. [Quranicaudio - Largest quran recitation collection](https://quranicaudio.com/)
5. [gadingnst/quran-api](https://github.com/gadingnst/quran-api)

Thank you for all of services above, cause of them this project can released. May Allah bless them.

## Contribution
Feel free to contribute create issue or create PRs on this repository.

---
<sub>Made with ❤️ by <a href="https://instagram.com/rzkytmgr">Rizky Aulia Tumangger</a> - Copyright All Rights Reserved © 2025</sub>