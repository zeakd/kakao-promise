import Base from './base';
import Auth from './auth';
import API from './api';

/**
 * promised Kakao module.
 */
class Kakao extends Base {
  constructor (options = {}) {
    super (options);

    const appKey = options.appKey;
    if (appKey) {
      this.appkey = appKey;
      init();
    }
  }

  init(appKey = this.appKey) {
    this.Auth = new Auth({ 
      appKey: this.appKey,
      kakaoManager: this.kakaoManager,
    });

    this.API = new API({
      appKey: this.appKey,
      kakaoManager: this.kakaoManager,
    });
  }
}

export default Kakao;