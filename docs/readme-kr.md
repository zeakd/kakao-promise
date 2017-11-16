# kakao-promise
> Simple promise wrapper for Kakao sdk with high usability

Promise save your life. 
Kakao js sdk의 jquery style callback에서 벗어나고자 만들었습니다. 최대한 Kakao module과 비슷하되, 비동기 요청만 Promise로 만들고자합니다.

## Install
npm을 사용하고 있다면,
``` bash
$ npm install kakao-promise
```

yarn 을 쓰고있다면, 
``` bash
$ yarn add kakao-promise
```

## Usage
kakao-promise는 사용자로 부터 직접 kakao js sdk를 받아 kakao-promise객체를 리턴합니다.

### Basic
``` js
import KakaoPromise from 'kakao-promise';
// or 
const KakaoPromise = require('kakao-promise');

const appKey = 'YOUR APP KEY';

const kp = new KakaoPromise({ 
  Kakao: window.Kakao 
  appKey,
});

kp.Auth.login()
.then((data) => console.log(data)); // Kakao login 성공
.catch((error) => console.error(error)); // Kakao login 실패
```

### async load kakao module
kakao-promise가 직접 cdn에서 sdk를 가져오도록 할수도 있습니다.

``` js
const kp = new KakaoPromise({
  loadVersion: '1.17.1'
  appKey,
})
```

### Submodule 
전체를 import하지 않고 필요한 특정 모듈만 가져올 수 있습니다. 또한 이들은 서로다른 버전의 kakao sdk를 사용 가능합니다. 
하지만 서로 다른 버전의 카카오 모듈을 쓰더라도 accessToken과 refreshToken은 공유한다는 점에 유의하세요.

``` js
import { Auth, API } from 'kakao-promise';

const appKey = 'YOUR APP KEY';

const auth = new Auth({
  Kakao: window.Kakao,
  appKey,
});

const api = new API({
  loadVersion: '1.17.1'
  appKey,
});

auth.login()
  .then(() => api.request({ url: '/v1/user/me' }))
  .then((res) => { alert(JSON.stringify(res)); })
  .catch((err) => { alert(JSON.stringify(err)); })
```

### dynamic init
Auth, API 모듈등은 appKey가 꼭 필요하지만, appKey가 필요없는 메소드도 존재합니다. 따라서 init은 선택적으로 가능합니다. 다만, kakao module을 cdn에서 가져올 경우가 있기 때문에 async init과 sync init 두가지가 존재합니다.

``` js
const kp = new KakaoPromise({ Kakao: window.Kakao });
kp.initSync(appKey);
// kp.Auth !== undefined;

// init 또한 동작한다. 단 init은 비동기 적으로 promise를 리턴한다. 
kp.init(appKey);
// kp.Auth === undefined;

// cdn에서 가져올 경우 async init만 가능하다.
const kp = new KakaoPromise({ loadVersion: '1.17.1' });
kp.init(appKey);
```

## API
### cosnt kp = new KaKaoPromise(options);
kakao promise 객체를 리턴하며 이 객체는 Kakao sdk 와 동일한 Submodule(AUTH, API 등)을 가지고 있습니다. 

#### options.Kakao
사용자로부터 Kakao sdk 루트 객체(window.Kakao)를 받습니다. commonjs를 통한 Kakao객체또한 가능합니다. options.loadVersion과 동시에 지정할 수 없습니다. 이미 init된 Kakao객체를 넣을 경우 appKey를 지정하지 않아도 됩니다.

#### options.loadVersion
cdn으로부터 kakao sdk를 가져옵니다. [카카오 sdk](https://developers.kakao.com/docs/sdk)에서 사용가능한 버전을 확인해주세요. options.Kakao와 동시에 지정할 수 없습니다.

#### options.appKey
appKey를 넣어 kakao-promise 생성과 동시에 객체를 init합니다. options.Kakao는 즉시 init되며, options.loadVersion는 비동기적으로 init됩니다.

### const auth = new KakaoPromise.Auth(options);
> [Kakao.Auth sdk](https://developers.kakao.com/docs/js-reference#kakao_auth)

Kakao.Auth의 Promise wrapping 객체를 리턴합니다. 

#### options
KakaoPromise의 options와 동일합니다. 

### auth.login(settings)
> [Kakao.Auth.login sdk](https://developers.kakao.com/docs/js-reference#kakao_auth_login(settings))

promise객체를 리턴하며 sdk와는 다르게 success, fail, always를 지원하지 않습니다. 다른 settings는 동일합니다.

### auth.logout()
> [Kakao.Auth.logout sdk](https://developers.kakao.com/docs/js-reference#kakao_auth_logout())

promise객체를 리턴하며 sdk와는 다르게 callback을 지원하지 않습니다.

### auth.getStatus()
> [Kakao.Auth.getStatus sdk](https://developers.kakao.com/docs/js-reference#kakao_auth_getstatus(callback))

promise객체를 리턴하며 sdk와는 다르게 callback을 지원하지 않습니다.

### 그 외 auth method
- getAccessToken
- getRefreshToken
- setAccessToken
- setRefreshToken
- getAppKey
- cleanup

sdk의 사용법과 동일합니다. 다만 loadVersion을 통해 비동기적으로 불러올 경우 모듈이 모두 로드된 후에만 정상적으로 동작합니다.
### const link = new KakaoPromise.Link(options);
준비중입니다.


### const api = new KakaoPromise.API(options);
> [Kakao.API sdk](https://developers.kakao.com/docs/js-reference#kakao_api)

Kakao.API의 Promise wrapping 객체를 리턴합니다. 

### api.request(settings)
> [Kakao.API.request sdk](https://developers.kakao.com/docs/js-reference#kakao_api_request(settings)) 

promise객체를 리턴하며 sdk와는 다르게 success, fail, always를 지원하지 않습니다. 다른 settings는 동일합니다.

### 그외 api method

- cleanup

sdk의 사용법과 동일합니다. 다만 loadVersion을 통해 비동기적으로 불러올 경우 모듈이 모두 로드된 후에만 정상적으로 동작합니다.

### const navi = new KakaoPromise.Navi(options);

준비중입니다.

### const story = new KakaoPromise.Story(options);

준비중입니다. 