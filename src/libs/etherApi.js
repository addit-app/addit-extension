import Web3 from 'web3'

const web3Provider = new Web3.providers.HttpProvider('http://localhost:8545')
// const web3Provider = new Web3.providers.HttpProvider('https://rinkeby.infura.io')
export const web3 = new Web3(web3Provider)

export function getBalance() {
  web3.eth.getBalance('0xD5869CCB1D01C0Dcb8Cb36638E0Bbce817882190')
    .then((resp) => {
      console.log(resp)
    }).catch((error) => {
      console.log(error)
    })
}

export function getAccounts() {
  return web3.eth.accounts
}

export default web3
