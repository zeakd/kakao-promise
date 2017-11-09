import Base from './base';
import Auth from './auth';
import API from './api';

/**
 * promised Kakao module.
 */
class Kakao extends Base {
  constructor (options) {
    super (options);

    this.Auth = new Auth({ Kakao });
    this.Auth.getKakao = this.getKakao;

    this.API = new API({ Kakao });
    this.API.getKakao = this.getKakao;
  }
}

export default Kakao;