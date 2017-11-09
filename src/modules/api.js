import Base from './base';

class API extends Base {
  constructor(options) {
    super(options);
  }

  /**
   * Promised Kakao.Auth.request();
   * @param {object} settings
   */
  request({
    url,
    data,
    files,
  }) {
    return this.getKakao().then(Kakao => 
      new Promise((resolve, reject) => {
        this.Kakao.API.request({
          url,
          data,
          files,
          success: resolve,
          fail: reject,
        })
      })
    )
  }

  /**
   * Promised Kakao.Auth.cleanup();
   * @param {object} settings
   */
  cleanup () {
    return this.Kakao && this.Kakao.API && this.Kakao.API.cleanup();
  }

}