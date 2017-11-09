# kakao-promise
Simple promise wrapper for Kakao sdk with high usability

## API

### Kakao module
``` js
import Kakao from 'kakao-promise';

// kakao-promise load kakao module asynchronously
const kakao = Kakao({
  version: '1.17.1'
  appKey,
})

// or you can choose Kakao module manually.
const kakao = Kakao({
  Kakao: window.Kakao,
})

kakao.Auth.login()
.then((data) => console.log(data)); // Kakao login success
.catch((error) => console.error(error)); // Kakao login fail

kakao.Auth.logout().then();
```



### Submodule 
``` js
import { Auth, API } from 'kakao-promise';

const auth = new Auth({
  Kakao
})

const api = new API({
  version: '1.17.1'
})
```
