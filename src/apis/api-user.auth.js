import BaseRepository from '../repositories/BaseRepository';

const request = new BaseRepository();

const authApi = {

  login({ email, password }) {
    const data = {
      email,
      password,
      client_id: window.app.clientId,
      client_secret: window.app.clientSecret,
    };
    return request.post('api/v1/signin', data);
  },
  forgotPassword(email) {
    return request.post('api/v1/forgot-password', {
      email,
    });
  },
  verifyToken(token) {
    return request.get('api/v1/reset-password', {
      token,
    });
  },
  resetPassword(data) {
    return request.post('api/v1/reset-password', data);
  },

  myProfile() {
    return request.get('api/v1/my-profile');
  },
};

export default authApi;
