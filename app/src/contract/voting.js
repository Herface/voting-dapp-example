import web3 from "../utils/web3"
import contract from "@truffle/contract"
import TokenVoting from '../../../build/contracts/TokenVoting'

const voting = contract(TokenVoting);

voting.setProvider(web3.currentProvider);


export async function getVoter(){
    let c = await voting.deployed();
    let accounts =  await web3.eth.getAccounts();
    let voter = await c.getVoter({from: accounts[0]});
    return voter;
}

export async function buy(value){
    let c = await voting.deployed();
    let accounts =  await web3.eth.getAccounts();
    return c.buy({value: value, from: accounts[0]});
}

export async function proposalList(){
    let c = await voting.deployed();
    let accounts =  await web3.eth.getAccounts();
    return c.proposalList({from: accounts[0]});
}
export async function vote(proposal, ballots){
    let c = await voting.deployed();
    console.log(proposal, ballots);
    let accounts =  await web3.eth.getAccounts();
    return c.vote(proposal, ballots, {from: accounts[0]});
}
