import KakaoManager from '../kakaoManager'

/**
 * Kakao module base.
 */
class Base {
  constructor ({ 
    Kakao, 
    loadVersion, 
    appKey,

    kakaoManager,
    clone = true
  } = {}) {
    const cleanup = !!this.appKey;

    if (kakaoManager) {
      this.kakaoManager = kakaoManager;
    } else {
      this.kakaoManager = new KakaoManager({ Kakao, loadVersion, clone, appKey, cleanup });
    }

    // appKey
    this.appKey = appKey;
  }

  /**
   * get Kakao module
   */
  getKakao() {
    return this.kakaoManager.getKakao();
  }

  /**
   * manually set Kakao module
   * @param {object} Kakao
   * @param {object}
   */
  setKakao(...args) {
    return this.kakaoManager.setKakao(...args);
  }

  /**
   * synchronously initialize Kakao module
   * @param {string} appKey - Kakao appKey
   * @param {object} options 
   * @param {boolean} options.cleanup - cleanup before init
   */
  initSync(...args) {
    return this.kakaoManager.initSync(...args);
  }

  /**
   * asynchronous initialize. 
   * init after load kakao module
   * @param {*} args 
   * @return {promise}
   */
  init(...args) {
    return this.kakaoManager.init(...args);
  }

  /**
   * return raw Kakao module
   * @return {object} Kakao module
   */
  raw() {
    return this.kakaoManager.Kakao;
  }

  /**
   * kakao module version
   * @return {string} version
   */
  version() {
    return this.kakaoManager.Kakao && this.kakaoManager.Kakao.VERSION;
  }
}

export default Base;