/* global chrome */
/**
 * Chrome API Wrapper
 */
import Log from './debugLog'

export const sample = {
  version: '0.0.x',
  keyPairs: {
    accountname1: [
      '5JCJxqB6********',
    ],
    accountname2: [
      '5JCJxqB6********',
      '5KsfkDq1********',
    ],
  },
  authenticate: {
    password: 'sample-password',
    passphrase: 'sample-passphrase',
  },
  status: 'online', // online, offline, locked, unset
}

export function isExtension() {
  try {
    if (typeof chrome.storage === 'object') {
      return true
    }
  } catch (err) {
    Log.error('chromeApi::isExtension()', err)
  }

  return false
}

/**
 * TODO: Wrapping up for Multiple Browser Storage
 * Get browser storage data
 */
// async function _getStorageValue(item = null) {
//   const local = chrome.storage.local

//   local.get([item], (result) => {
//     _storageData = result[item]
//   })
//   await _storageData

//   return _storageData
// }

export function getPassword(storeObj = null) {
  try {
    if (isExtension()) {
      /* eslint-disable */
      chrome.storage.local.get('authentication', item => {
        if (storeObj) {
          if (item.password !== storeObj.password && JSON.stringify(item) !== '{}') {
            storeObj.setStatus(item.password)
            const passwordObj = {
              password,
            }
            localStorage.setItem('authenticate', JSON.stringify(passwordObj))
          }
        }
      })
      /* eslint-enable */
    } else {
      storeObj.setPassword(JSON.parse(localStorage.getItem('authenticate')).password)
      Log.info('chromeApi::getPassword()', JSON.parse(localStorage.getItem('authenticate')).password)
    }
  } catch (err) {
    Log.error('chromeApi::getPassword()', err)
  }
}

export function setPassword(password) {
  try {
    if (isExtension()) {
      /* eslint-disable */
      chrome.storage.local.set({
        authenticate: {
          password,
        },
      })
      /* eslint-enable */
    } else {
      const passwordObj = {
        password,
      }
      localStorage.setItem('authenticate', JSON.stringify(passwordObj))
    }
  } catch (err) {
    Log.error('chromeApi::setPassword()', err)
  }
}

export function getStatus(storeObj = null) {
  try {
    if (isExtension()) {
      /* eslint-disable */
      chrome.storage.local.get('status', item => {
        if (storeObj) {
          if (item.status !== storeObj.status && JSON.stringify(item) !== '{}') {
            storeObj.setStatus(item.status)
            localStorage.setItem('status', item.status)
          }
        }
      })
      /* eslint-enable */
    } else {
      storeObj.setStatus(localStorage.getItem('status'))
    }
  } catch (err) {
    Log.error('chromeApi::getStatus()', err)
  }
}

export function setStatus(status) {
  localStorage.setItem('status', status)

  try {
    if (isExtension()) {
      /* eslint-disable */
      chrome.storage.local.set({
        status,
      })
      /* eslint-enable */
    }
  } catch (err) {
    Log.error('chromeApi::setStatus()', err)
  }
}

/**
 * Set account and private keys
 *
 * @param {string} accountName
 * @param {array} privateKeys
 */
// TODO: Encrypt Key Pairs
export function setKeyPairs(accountName, privateKeys) {
  let pairs = []
  if (isExtension()) {
    try {
      /* eslint-disable */
      chrome.storage.local.get('keyPairs', items => {
        pairs = items.keyPairs
      })

      pairs = {
        ...pairs,
        [accountName]: privateKeys
      }

      chrome.storage.local.set({
        keyPairs: pairs,
      })
      /* eslint-enable */
    } catch (err) {
      Log.error('chromeApi::setKeyPairs()', err)
    }
  } else {
    localStorage.setItem('keyPairs', JSON.stringify({ [accountName]: privateKeys }))
  }
}

export function newWindow() {
  window.open(window.location.href, 'OWDIN Wallet', 'directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=yes,width=380,height=800')
}

export function resetExtension() {
  if (isExtension()) {
    try {
      /* eslint-disable */
      chrome.storage.local.clear()
      /* eslint-enable */
    } catch (err) {
      Log.error('chromeApi::resetExtension()', err)
    }
  }

  localStorage.clear()
  sessionStorage.clear()
}

export default isExtension
