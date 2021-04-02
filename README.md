<p align="center">
<img alt="node-current" src="https://img.shields.io/node/v/jest">
    <img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/rzkytmgr/Quran-API">
    <a href="https://github.com/rzkytmgr/Quran-API/blob/master/LICENSE">
    	<img alt="GitHub" src="https://img.shields.io/github/license/rzkytmgr/Quran-API">
    </a>
    <br>
    <a href="https://github.com/rzkytmgr/Quran-API/issues">
    	<img alt="GitHub issues" src="https://img.shields.io/github/issues/rzkytmgr/Quran-API">
	</a>
    <a href="https://github.com/rzkytmgr/Quran-API/pulls">
    	<img alt="GitHub pull requests" src="https://img.shields.io/github/issues-pr/rzkytmgr/Quran-API">
	</a>
    <br>
    <a href="https://quran-endpoint.vercel.app/">
    <img alt="Website" src="https://img.shields.io/website?label=vercel&down_message=offline&up_message=online&url=https%3A%2F%2Fquran-endpoint.vercel.app%2F">
    </a>
    <a href="https://quran-endpoint.herokuapp.com/">
    <img alt="Website" src="https://img.shields.io/website?label=heroku&down_message=offline&up_message=online&url=https%3A%2F%2Fquran-endpoint.herokuapp.com%2F">
    </a>
</p>


<hr />

This project is made for developers who want to develop Islamic applications. besides that this project also aims to be a charity for developers who develop applications with this API, especially me and the developers from the data sources that I get.

## Content

- [Introduction](#introduction)

- [Installation](#installation)

- [Usage/Endpoint](#usageendpoint)
- [Data Resources](#data-resources)



### Introduction

This API was created to make it easier for developers to develop Islamic applications. There are several different recitations so that developers can create dynamic audio. The data used in the development of this API is taken from several different [sources](#data-resources), both from existing APIs and from scraping results.

This API was created using the [Express Web Application Framework](https://expressjs.com/) and several additional libraries that you can see in the `package.json` file.

**File Structure :**

```
Quran-API
├── __test__/
├── data/
│	├── imam.json
│	└── quran.json
├── server/
|	├── app.js
|	├── controller.js
|	├── middleware.js
|	└── routes.js
├── static/
├── util/
├── package.json
└── package-lock.json

```



[⬆️ Back to Top](#content)



### Installation

There are several different ways to do the installation, you can use whichever you like

- **Localhost**

  ```bash
  # clone the repository
  > git clone https://github.com/rzkytmgr/Quran-API.git quran-api
  
  # change directory
  > cd quran-api
  
  # install all packages from package.json
  > npm install
  
  # now, you can start it
  > npm start
  ```

  

- **Heroku Deploy**

  you can do it with just one click. But you must have a [Heroku](http://heroku.com/) account.

  [![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/rzkytmgr/Quran-API)
  
  
  
- **Vercel Deploy**

  click the deploy button below. Register your own [vercel](https://vercel.com) account

  [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Frzkytmgr%2FQuran-API)



**Note :** if you have problems with installation, feel free to create an issue.

[⬆️ Back to Top](#content)



### Usage/Endpoint

Some of these API endpoints that you can access, start the application on your local computer or for a demo, you can go to the following link [Qur'an Endpoint](http://quran-endpoint.herokuapp.com/)

- **/imam/:id**

  Displays list of imam

  *params* :

  `[Optional] id : Spesific imam id`

  *query* :

  -

  *example* :

  ```bash
  # display all imam
  > curl -v -H "Content-Type: application/json" \
  > http://quran-endpoint.herokuapp.com/imam
  
  # display spesific imam
  > curl -v -H "Content-Type: application/json" \
  > http://quran-endpoint.herokuapp.com/imam/2
  ```

- **/quran/:surah/:ayah?imamId=**

  Display list of surah in qur'an

  *params* :

  `[Optional] surah : spesific surah in qur'an` 

  `[Optional] Ayah : Spesific Ayah in qur'an surah`

  *query* :

  `[Optional] imamId : Spesific imam id, get it from /imam`

  *example :*

  ```bash
  # show all qur'an surah (without ayah)
  > curl -v -H "Content-Type: application/json" \
  > http://quran-endpoint.herokuapp.com/quran
  
  # show spesific qur'an surah (with ayah)
  > curl -v -H "Content-Type: application/json" \
  > http://quran-endpoint.herokuapp.com/quran/12
  
  # show spesific ayah in a surah
  > curl -v -H "Content-Type: application/json" \
  > http://quran-endpoint.herokuapp.com/quran/12/4
  
  # note :
  #	you can add the ?imamId= query wherever you want,
  # e.g :
  #	/quran?imamId=2
  #	/quran/12?imamId=10
  #	/quran/12/4?imamId=6
  ```

  

  **Note :** if you have problems with Usage/Endpoint, feel free to create an issue.



[⬆️ Back to Top](#content)



### Data Resources

all the data in this api is obtained from several sources below

- [Kemenag RI](https://quran.kemenag.go.id/)
- [quran/quran.com-api](https://github.com/quran/quran.com-api)
- [sutanlab/quran-api](https://github.com/sutanlab/quran-api)
- [islamic-network/api.alquran.cloud](https://github.com/islamic-network)
- [quranicaudio.com](https://quranicaudio.com/about)
- [everyayah.com](https://everyayah.com/)



[⬆️ Back to Top](#content)



Thank you,

[**@rzkytmgr**](https://github.com/rzkytmgr)