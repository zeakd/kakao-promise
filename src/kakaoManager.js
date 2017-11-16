import loadJs from 'load-js'
import clonedeep from 'lodash.clonedeep'

import isKakao from './utils/isKakao'

const KAKAO_DEFAULT_VERSION = '1.17.1';

class KakaoManager {
  constructor ({ loadVersion, Kakao, appKey, clone }) {
    if (Kakao && loadVersion) throw new Error('kakao-promise: parameters Kakao and loadVersion cannot specified at the same time');

    // deep clone kakao module flag
    this.clone = clone;

    // appKey. 
    this.appKey = appKey;

    // created with Kakao option
    if (Kakao) {
      this.setKakao(Kakao);

    //created with loadVersion option
    } else {    
      // target module version to load asynchronusly
      this.loadVersion = loadVersion || KAKAO_DEFAULT_VERSION;
      
      // meaningless
      this.version = this.loadVersion;

      // start to load.
      this._promise = this.getKakao({ cleanup: true });
    }
  }

  /**
   * ducktype check if Kakao module is initialized.
   */
  isInitialized () {
    return this.Kakao && this.Kakao.Auth;
  }

  /**
   * should not run initialize when it is already initailized or have no appKey.
   */
  shouldInitialize () {
    return this.appKey && (!this.isInitialized() || this.appKey !== this.getAppKey());
  }

  /**
   * synchronously initialize Kakao module
   * @param {string} appKey - Kakao appKey
   * @param {object} options 
   * @param {boolean} options.cleanup - cleanup before init
   */
  initSync (...args) {
    let appKey;
    let options;

    // console.log(args, this.appKey)
    // initSync(options)
    if (typeof args[0] === 'object') {
      appKey = this.appKey;
      options = args[0];
    } else {
      appKey = args[0] || this.appKey;
      options = args[1] || { cleanup: false };
    }

    const {
      cleanup,
    } = options;

    // console.log(appKey, options);
    if (!this.Kakao) throw new Error('kakao-promise: Kakao module is not loaded');

    console.log('initialize kakao');

    if (cleanup) this.cleanup();
    console.log(appKey, options);
    this.Kakao.init(appKey);

    // clone if it need.
    this.Kakao = this.clone && this.loadVersion ? clonedeep(window.Kakao) : this.Kakao;
    
    // update version info
    this.version = this.Kakao.VERSION;

    return this;
  }


  /** 
   * asynchronous initialize. 
   * init after load kakao module
   */
  init (...args) {
    const promise = this._promise ? this._promise : this.loadKakao();

    return promise.then(Kakao => {
      this.initSync(...args);
      return Kakao;
    });
  }

  /**
   * Kakao cleanup.
   * @param {string} moduleName 
   */
  cleanup (moduleName) {
    if (!this.Kakao) return;

    if (moduleName) {
      return this.Kakao[moduleName].cleanup();
    }
    
    return this.Kakao.cleanup();
  }

  /** 
   * load Kakao module 
   */
  loadKakao() {
    /** TODO: non-browser environment support  */

    /** 
     * if it already have Kakao instance, resolve it, or load from web.
     */
    if (this.Kakao) {
      console.log('cached', this.Kakao);
      return Promise.resolve(this.Kakao);
    }

    console.log('from web')
    if (!this.loadVersion) throw new Error(`kakao-promise: loadVersion must be specified`);

    const kakaoUrl = `https://developers.kakao.com/sdk/js/kakao-${this.loadVersion}.js`

    return loadJs({ url: kakaoUrl, async: true })
      .then(() => {  
        this.Kakao = window.Kakao;
        this.version = this.Kakao.VERSION;

        return this.Kakao;
      })
      .catch(() => {
        throw new Error(`kakao-promise: fail to fetch KaKao instance from ${kakaoUrl}`)
      });
  }

  getKakao({ cleanup = false } = {}) {    
    // try to use cached promise.
    if (this._promise) return this._promise;

    // use initialized module. 
    if (this.shouldInitialize()) {
      return this.init({ cleanup });
    }

    // use non-initialized module
    return this.loadKakao();
  }

  setKakao(Kakao, { cleanup = false } = {}) {
    if (!isKakao(Kakao)) throw Error('kakao-promise: input of setKakao is not a kakao module');
    
    this.Kakao = Kakao;
    this.version = this.Kakao.VERSION;

    // // init target module if not initialized.
    if (this.shouldInitialize()) return this.initSync({ cleanup });
  }

  getAppKey() {
    return this.Kakao && this.Kakao.Auth && this.Kakao.Auth.getAppKey();
  }
}

export default KakaoManager