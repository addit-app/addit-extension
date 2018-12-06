/* global chrome */
/**
 * Chrome API Wrapper
 */
// accountStore create new object occasionally
// import { accountStore } from '../stores/AccountStore'
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

export function version() {
  try {
    /* eslint-disable */
    chrome.storage.local.set({
      version: '0.0.1',
      debug: true,
    });
    /* eslint-enable */
  } catch (error) {
    localStorage.setItem('version', '0.0.1')
    localStorage.setItem('debug', true)
  }
}

export function isExtension() {
  try {
    if (typeof chrome.storage === 'object') {
      return true
    }
  } catch (error) {
    Log.error(error)
  }

  return false
}

// export function getStatus(accountStore = null) {
//   try {
//     if (isExtension()) {
//       /* eslint-disable */
//       chrome.storage.local.get('status', item => {
//         if (accountStore) {
//           if (item.status !== accountStore.status && JSON.stringify(item) !== '{}') {
//             accountStore.setStatus(item.status)
//           }
//         }
//       })
//       /* eslint-enable */
//     } else {
//       return localStorage.getItem('status') || 'unset'
//     }
//   } catch (error) {
//     throw error
//   }

//   // for test
//   return accountStore.status
// }

export function setStatus(status, accountStore = null) {
  if (accountStore !== null) {
    accountStore.setStatus(status)
  }

  try {
    if (isExtension()) {
      /* eslint-disable */
      chrome.storage.local.set({
        status,
      })
      /* eslint-enable */
    }
    // for test
    localStorage.setItem('status', status)
  } catch (error) {
    throw error
  }

  Log.info('chromeApi::accountStore.setStatus()', status)
  Log.info('chromeApi::accountStore', accountStore)
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
  } catch (error) {
    throw error
  }
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
    } catch (error) {
      Log.error(error)
    }
  } else {
    localStorage.setItem('keyPairs', JSON.stringify({ [accountName]: privateKeys }))
  }
}

// export function isLoggedIn(accountStore) {
//   if (['online', 'offline'].includes(getStatus(accountStore))) {
//     return true
//   }

//   return false
// }

export function isLoggedIn() {
  return true
}

export function isTabExist() {
  // wip
  return true
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
    } catch (error) {
      Log.error(error)
    }
  }

  localStorage.clear()
  sessionStorage.clear()
}

export default version
