import {
  Api,
  JsonRpc,
  // RpcError,
  JsSignatureProvider,
} from 'eosjs'
import EosApi from 'eosjs-api'
import ecc from 'eosjs-ecc'
import Log from './debugLog'

// const httpEndpoint = 'https://api.eosnewyork.io'  // default, null for cold-storage
// const httpEndpoint = 'https://jungle2.cryptolions.io'
const httpEndpoint = 'https://api.jungle.alohaeos.com'
// const contractAccount = 'eosadditapps'

const eosOption = {
  verbose: false, // API logging
  httpEndpoint,
  // logger: { // Default logging functions
  //   log: config.verbose ? console.log : null,
  //   error: config.verbose ? console.error : null,
  // },
  fetchConfiguration: {},
}
export const eosApi = EosApi(eosOption)

export function eosJs(privateKey) {
  const rpc = new JsonRpc(httpEndpoint)
  const signatureProvider = new JsSignatureProvider([privateKey])
  return new Api({
    rpc,
    signatureProvider,
    textDecoder: new TextDecoder(),
    textEncoder: new TextEncoder(),
  })
}

export function privToPub(privateKey) {
  try {
    const pubKey = ecc.privateToPublic(privateKey)
    return pubKey
  } catch (error) {
    Log.error('eosJsApi::privToPub()', error)
  }

  return false
}

export async function getAccountsByPubKey(publicKey) {
  let result = false

  await eosApi.getKeyAccounts(publicKey).then((resp) => {
    result = resp.account_names
  }).catch((error) => {
    Log.error('eosJsApi::getAccountByPrivKey()', error)
  })

  return result
}

// export function getAccountInfo(account) {
//   let data = ''

//   try {
//     eos.getAccount(account).then((resp) => {
//       data = resp
//     })
//   } catch (error) {
//     console.log(error)
//   }

//   console.log('LOG::eosJsApi::getAccountInfo()', data)
//   return data
// }

export default eosApi
