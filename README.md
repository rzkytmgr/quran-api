<p align="center">
	<p align="center">Quran API</p>
</p>

<p align="center">
  <img alt="GitHub Tag" src="https://img.shields.io/github/v/tag/rzkytmgr/quran-api?logoColor=f2f5f4&label=quran-api&labelColor=0bd09f&color=f2f5f4">
  <img src="https://img.shields.io/website?url=https%3A%2F%2Fstaticquran.vercel.app%2F&label=vercel">
  <br>
  <img src="https://img.shields.io/github/actions/workflow/status/rzkytmgr/quran-api/matrix-testing.yml">
  <img alt="GitHub Actions Workflow Status" src="https://img.shields.io/github/actions/workflow/status/rzkytmgr/quran-api/vercel-release.yml?label=release">
  <img src="https://img.shields.io/github/actions/workflow/status/rzkytmgr/quran-api/codeql-analysis.yml?label=codeql">
  <img src="https://img.shields.io/github/license/rzkytmgr/quran-api">
</p>

<hr>

Quran API is a fast and multilingual RESTful API built with Node.js, TypeScript, and Express that provides complete Quran data in JSON format including surahs, ayahs, and translations (currently in English and Indonesian). It ships with a built-in scraper that crawls several Quran sources into static, ready-to-serve JSON datasets, so every request is answered straight from local data with no upstream calls.

Designed for speed and flexibility, the API supports murottal audio from 32 reciters with per-surah and per-ayah playback links, returned alongside ayah metadata such as juz, page, ruku, hizb, and sajda positions. Because the responses are served from pre-aggregated static datasets, it is lightweight enough to run anywhere from a Docker container to a serverless deployment.

## Data Source

The datasets in `data/` are produced by the bundled crawler (`scraper/`), which pulls from: [Kemenag - Ministry of Religious Affairs Indonesia](https://quran.kemenag.go.id/) for translations and transliteration, [Al-Qur'an Cloud](http://alquran.cloud/) for metadata and ayah content, [Every Ayah](https://everyayah.com/) for per-ayah murottal audio, and [Quranicaudio](https://quranicaudio.com/) for per-surah recitations. Many thanks to all of these services, without which this project would not be possible — may Allah bless them.

## Contribution

Contributions are always welcome. Feel free to open an issue to report a bug, discuss an idea, or ask a question, and pull requests that fix or improve this API are just as appreciated.

---

<sub>Released under the [MIT License](?tab=MIT-1-ov-file) © 2020-2026 Rizky Aulia Tumangger 🍞</sub>
