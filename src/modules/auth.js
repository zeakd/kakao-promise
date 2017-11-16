import Base from './base';

/**
 * promised kakao auth module
 */
class Auth extends Base {
  constructor (options) {
    if (!options.appKey) throw new Error('kakao-promise/Auth: appKey is required');
    
    super (options);
  }

  /**
   * Promised Kakao.Auth.login();
   * @param {object} settings
   */
  login ({
    persistAccessToken = true,
    persistRefreshToken = false,
    throughTalk = true,
  } = {}) {
    return this.getKakao().then(Kakao =>
      new Promise((resolve, reject) => {
        Kakao.Auth.login({
          success: resolve,
          fail: reject,
          persistAccessToken,
          persistRefreshToken,
          throughTalk,
        });
      }))
  }
  
  /**
   * Promised Kakao.Auth.logout();
   * @param {object} settings
   */
  logout() {
    return this.getKakao().then(Kakao => 
      new Promise((resolve, reject) => {
        Kakao.Auth.logout({
          callback: resolve,
        })
      })
    )
  }

  /**
   * Promised Kakao.Auth.getStatus();
   * @param {object} settings
   */
  getStatus() {
    return this.getKakao().then(Kakao => 
      new Promise((resolve, reject) => {
        Kakao.Auth.getStatus(resolve);
      })
    )
  }  

  getAccessToken() {
    const _Kakao = this.kakaoManager.Kakao;
    return _Kakao && _Kakao.Auth && _Kakao.Auth.getAccessToken();
  }

  getRefreshToken() {
    const _Kakao = this.kakaoManager.Kakao;
    return _Kakao && _Kakao.Auth && _Kakao.Auth.getRefreshToken();
  }

  setAccessToken(token, persist) {
    const _Kakao = this.kakaoManager.Kakao;
    return _Kakao && _Kakao.Auth && _Kakao.Auth.setAccessToken(token, persist);
  }

  setRefreshToken(token, persist) {
    const _Kakao = this.kakaoManager.Kakao;
    return _Kakao && _Kakao.Auth && _Kakao.Auth.setRefreshToken(token, persist);
  }

  getAppKey() {
    const _Kakao = this.kakaoManager.Kakao;
    return _Kakao && _Kakao.Auth && _Kakao.Auth.getAppKey();
  }

  cleanup() {
    return this.kakaoModule.cleanup('Auth');
  }
}

export default Auth;