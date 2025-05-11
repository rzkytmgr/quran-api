
![vercel](https://img.shields.io/website?url=https%3A%2F%2Fstaticquran.vercel.app%2F&up_color=black&down_color=red&label=vercel&labelColor=black) ![build](https://img.shields.io/github/actions/workflow/status/rzkytmgr/quran-api/vercel-release.yml?branch=master&logoColor=black&labelColor=black&color=black) ![node v](https://img.shields.io/badge/node%20%5Ev20-000) ![pnpm v](https://img.shields.io/badge/pnpm%20%5Ev10-000) ![express v](https://img.shields.io/badge/express%20v4.x-000) ![typescript v](https://img.shields.io/badge/typescript%20%5Ev5.8-000)

> *Demo: [staticquran.vercel.app](https://staticquran.vercel.app)*  

Static quran Restful API built under NodeJS runtime using Javascript/Typescript programming language and Express as web framework. This project using JSON file as static database to store all of quran surah and ayah. Other than that this project support multi-language as well. Currently this project only support **English** and **Bahasa Indonesia**. Feel free to contribute if you want to add more languages, don't forget read the [Contribution](#contribution) section.

Static quran Restful API also **supports murottal audio up to 30 reciters**.  Audio feature are equipped with audio per-ayah. The audio files fetched from third-party service, out of my control. You can read more the details of all of the data on [Data Source](#data-source) section. This API was created to make it easier for developers who want to develop something that requires the Quran.

#### Table of Contents

- [Installation](#installation)
- [How to Use](#how-to-use)
	- [Get all reciters](#get-all-reciters---apiv1reciters)
	- [Get one reciter by ID](#get-one-reciter-by-id---apiv1reciterreciter)
	- [Get all surah metadata](#get-all-surah-metadata---apiv1surah)
	- [Get one surah with ayah](#get-one-surah-with-ayah---apiv1surahsurahsequence)
	- [Get spesifc ayah in a surah](#get-spesifc-ayah-in-a-surah---apiv1surahsurahsequenceayahayahsequence)
	- [Get spesific ayah in quran](#get-spesific-ayah-in-quran---apiv1ayahayahquransequence)
	- [Get random ayah](#get-random-ayah---apiv1ayahrandom)
- [Data Source](#data-source)
- [Contribution](#contribution)
- [Support](#support)

## Installation
This section will guide you to install the app. 

> [!IMPORTANT]
>  Before we start to install the app, make sure you have installed `node >= v20` and `pnpm >= 10`. You can use [nvm](https://github.com/nvm-sh/nvm) to install node in your host. After that you can follow install command below,
```bash
# clone the repository
git clone https://github.com/rzkytmgr/quran-api && cd quran-api
```
```bash
# install dependencies
pnpm install
```
```bash
# run the app
pnpm build
pnpm start
```
Or, you can install the app using vercel service. Just one click away on button below to deploy the app,

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frzkytmgr%2Fquran-api%2Ftree%2Frelease%2Fvercel)

## How to Use
Here we are using live demo link to test the endpoints on the API. Here's the demo link we'll use *[staticquran.vercel.app](https://staticquran.vercel.app)*.
> [!TIP]  
> If you want to change the language, you can add `?lang=en|id` query parameter in the endpoint, default value is `en`. same with you want to change recitation audio, you can simply add `?reciter={reciterId}` query parameter in the endpoint. You can see below list of allowed reciters id. Here an example how to change the language and change the recitation audio.
> 
> **GET** [/api/v1/surah/70?lang=id&reciter=29](https://staticquran.vercel.app/api/v1/surah/70?lang=id&reciter=29) - this endpoint will return surah Al-Ma'arij with **Bahasa Indonesia** translation and **Audio Recitation Syaikh Ahmed ibn Ali Al Ajamy**.
---
#### Get all reciters - [/api/v1/reciters](https://staticquran.vercel.app/api/v1/reciters)
```bash
GET /api/v1/reciters
```
**Response**
```json
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
🔝 [Back to top](#table-of-contents)

---
#### Get one reciter by ID - [/api/v1/reciter/:reciter](https://staticquran.vercel.app/api/v1/reciter/25)
```bash
GET /api/v1/reciter/25
```

**Response**
```json
{
	"success": true,
	"message": "Reciter retrieved successfully",
	"data": {
		"id": 25,
		"name": "Yasser Ad-Dosari"
	}
}
```
🔝 [Back to top](#table-of-contents)

---
#### Get all surah metadata - [/api/v1/surah](https://staticquran.vercel.app/api/v1/surah)
```bash
GET /api/v1/surah
```
**Response**
```json
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
🔝 [Back to top](#table-of-contents)

---
#### Get one surah with ayah - [/api/v1/surah/:surahSequence](https://staticquran.vercel.app/api/v1/surah/114)
```bash
GET /api/v1/surah/114
```
**Response**
```json
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
🔝 [Back to top](#table-of-contents)

---
#### Get spesifc ayah in a surah - [/api/v1/surah/:surahSequence/ayah/:ayahSequence](https://staticquran.vercel.app/api/v1/surah/114/ayah/1)
```bash
GET /api/v1/surah/114/ayah/1
```
**Response**
```json
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
	"ayah":{
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
🔝 [Back to top](#table-of-contents)

---
#### Get spesific ayah in quran - [/api/v1/ayah/:ayahQuranSequence](https://staticquran.vercel.app/api/v1/ayah/6231)
```bash
GET /api/v1/ayah/6231
```
**Response**
```json
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
🔝 [Back to top](#table-of-contents)

---
#### Get random ayah - [/api/v1/ayah/random](https://staticquran.vercel.app/api/v1/ayah/random)
```bash
GET /api/v1/ayah/random
```
**Response**
```json
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
🔝 [Back to top](#table-of-contents)

---
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
> [!TIP]  
> Small tips when you trying to do a commit on this repository. There is a commit message format you must follow. See the message format below,
> 
> Format,
>  `activity(scope): message here`
>  
>  Example,
>  `fix(surah): surah translation is not appear for surah an-nas ayah 2`
>  
>  Allowed activity value in commit message,
>  `feat` 
>  `fix`
>  `chore`
>  `docs`
>  `style`
>  `refactor`
>  `test`
>  `perf`
>  `ci`

##  Support

You support means a lot to me. i use the support money to learn and explore other technologies.

<a href="https://paypal.me/rzkytmgr" target="_blank"><img src="https://bbkingmuseum.org/wp-content/uploads/2023/09/paypal-1024x261.png" height="50"></a>

<a href="https://ko-fi.com/stack0" target="_blank"><img src="https://storage.ko-fi.com/cdn/brandasset/v2/support_me_on_kofi_dark.png" height="40"></a>

<a href="https://trakteer.id/stack0" target="_blank"><img id="wse-buttons-preview" src="https://edge-cdn.trakteer.id/images/embed/trbtn-red-1.png?v=24-01-2025" height="40" style="border:0px;height:40px;" alt="Trakteer Saya"></a>

---
<sub>Made with ❤️ by <a href="https://instagram.com/rzkytmgr">Rizky Aulia Tumangger</a> - Copyright All Rights Reserved © 2025</sub>