import Cookies from 'js-cookie'

const TokenKey = 'hrsaas-ihrm-token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  const expirationDate = new Date();
  expirationDate.setTime(expirationDate.getTime() + 10 * 60 * 1000);
  return Cookies.set(TokenKey, token, { expires: expirationDate })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
