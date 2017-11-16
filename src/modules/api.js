import Base from './base';

class API extends Base {
  constructor(options) {
    if (!options.appKey) throw new Error('kakao-promise/Auth: appKey is required');
    
    super(options);
  }

  /**
   * Promised Kakao.API.request();
   * @param {object} settings
   */
  request({
    // shade callback settings
    success,
    fail,
    always,
    ...restSettings
  }) {
    return this.getKakao().then(Kakao =>{
      return new Promise((resolve, reject) => {
        Kakao.API.request({
          ...restSettings,
          success: resolve,
          fail: reject,
        })
      })
    })
  }

  /**
   * Promised Kakao.API.cleanup();
   * @param {object} settings
   */
  cleanup () {
    return this.kakaoManager.cleanup('API');
  }

}

export default API;