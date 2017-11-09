import Base from './base';

/**
 * promised kakao auth module
 */
class Auth extends Base {
  constructor (options) {
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
    return this.Kakao && this.Kakao.Auth && this.Kakao.Auth.getAccessToken();
  }

  getRefreshToken() {
    return this.Kakao && this.Kakao.Auth && this.Kakao.Auth.getRefreshToken();
  }

  setAccessToken(token, persist) {
    return this.Kakao && this.Kakao.Auth && this.Kakao.Auth.setAccessToken(token, persist);
  }

  setRefreshToken(token, persist) {
    return this.Kakao && this.Kakao.Auth && this.Kakao.Auth.setAccessToken(token, persist);
  }

  getAppKey() {
    return this.Kakao && this.Kakao.Auth && this.Kakao.Auth.getAppKey();
  }

  cleanup() {
    return this.Kakao && this.KakaoAuth && this.Kakao.Auth.cleanup();
  }
}