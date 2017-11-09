const KAKAO_DEFAULT_VERSION = '1.17.1';

/**
 * Kakao module base.
 */
class Base {
  constructor ({ 
    Kakao, 
    version = KAKAO_DEFAULT_VERSION, 
    appKey 
  } = {}) {
    if (!appKey) throw new Error('Kakao module: appKey is required');
    this.appKey = appKey;

    this.Kakao = Kakao;
    this.version = (Kakao && Kakao.VERSION) || version;    
  }

  getKakao() {
    let promise;
    
    /** 
     * if it already have Kakao instance, resolve it, or load from web.
     */
    if (this.Kakao) {
      // console.log('cached', this.Kakao);
      promise = Promise.resolve(this.Kakao);
    } else {
      // console.log('from web')
      const kakaoUrl = `https://developers.kakao.com/sdk/js/kakao-${this.version}.js`
      promise = loadJs({
        url: kakaoUrl,
        async: true,
      })
      .then(() => {
        /** TODO: non-browser env support  */
        // console.log('here')
        this.Kakao = window.Kakao;
        return this.Kakao;
      })
      .catch(() => {
        throw new Error(`fail to fetch KaKao instance from ${kakaoUrl}`)
      });
    }

    /**
     * Kakao instance should be initialized to use Auth module. 
     */
    return promise.then(Kakao => {
      // console.log('init', Kakao)
      if (!Kakao.Auth) {
        if (!this.appKey) throw new Error("Kakao Auth: appKey is required");
        Kakao.init(this.appKey);     
      }
      return Kakao;
    })
  }

  setKakao(Kakao) {
    if (Kakao.VERSION && Kakao.init) return this.Kakao = Kakao;
    return false;
  }
  
  /**
   * Promised Kakao.init()
   * @param {string} appKey 
   */
  init (appKey) {
    return this.getKakao().then(Kakao => {
      Kakao.init(appkey);
      return Kakao;
    })
  }
}

export default Base;