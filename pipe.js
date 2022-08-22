import { storageKeys } from '@/enums/storage-keys'
import storage from '@/services/localstorage.service'

export function convertCookieToArray(cookie: string) {
  return cookie.split(';')
}

export function findChaordicSessionInCookie(cookieToArray: string[]) {
  const regexToFinChaordicCookie = /chaordic_session=[^;]+/

  return cookieToArray.find((str) => str.match(regexToFinChaordicCookie))
}

export function removeValueBeforeSessionChaordic(chaordicSession: string) {
  const regexToExcludeValueBefore = new RegExp(/chaordic_se/)

  return chaordicSession?.replace(regexToExcludeValueBefore, '').trim() || ''
}

export function pipesToGetSessionId(cookie: string, ...cookieHelpers) {
  return cookieHelpers.reduce((res, helper) => {
    return helper(res)
  }, cookie)
}

export default function getSessionId() {
  const temporarySessionId = storage.get(storageKeys.TEMPORARY_SESSION)

  return temporarySessionId
    ? `ssion=${temporarySessionId}`
    : pipesToGetSessionId(
        document.cookie,
        convertCookieToArray,
        findChaordicSessionInCookie,
        removeValueBeforeSessionChaordic
      )
}

