const Caver = require('caver-js')

const caver = new Caver('http://54.95.238.82:8551')

// const web3Provider = new Web3.providers.HttpProvider('http://54.95.238.82:8551')
// export const web3 = new Web3(web3Provider)

export function getBalance() {
  caver.klay.getBalance('0x2E88af6935eFCd82bb28b63B6d80ddFE0D691eFB')
    .then((resp) => {
      console.log(resp)
    }).catch((error) => {
      console.log(error)
    })
}

export function getAccounts() {
  return caver.klay.accounts
}

export default caver
