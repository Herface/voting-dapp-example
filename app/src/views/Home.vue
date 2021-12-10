<template>
  <a-layout>
      <a-layout-content style="background: #fff">
         <a-row type="flex" justify="space-around" align="top">
            <a-col :span="10">
                <a-card  title="Vote Items">
                  <div v-for="(proposal, id) in proposalList" :key="id" @click="changeVote(id)">
                    <h3 style="text-align: left">{{proposal.name}}</h3>
                    <a-progress  :percent="(proposal.ballots / max) * 100" :status="currentVote === id ? 'success' : 'active'" :showInfo="false" :strokeWidth="20"/>
                    <h5 style="text-align: left">{{proposal.ballots}}</h5>
                  </div>
                </a-card>
            </a-col>
            <a-col :span="8">
              <a-space direction="vertical" style="display: flex">
              <a-card  title="Card title">
                <a-statistic title="Available Ballots" :value="ballots" style="" />
              </a-card>

              <a-card  >
                <a-input-number style="width: 150px" v-model="value"  placeholder="10000 wei/ballot" id="inputNumber" :min="0"  />
                    <a-button type="primary" @click="buyBallot()">Buy Now</a-button>
              </a-card>
              </a-space>
            </a-col>
            <a-col :span="10">
              <a-card>
                <div style="text-align: right">
                <a-space >
                    <a-input-number id="inputNumber" v-model="ballotsToVote" :min="1"  />
                    <a-button type="primary" @click="vote()">Vote Now</a-button>
                </a-space>
                </div>
              </a-card>
            </a-col>
          <a-col :span="8" >
              <a-card  title="Card title">
            <a-list style="text-align: left" item-layout="horizontal" :data-source="votedList">
    <a-list-item slot="renderItem" slot-scope="vote, index">
      <a-list-item-meta
        :description="vote"
      >
        <a slot="title" >{{proposalList[index].name}}</a>
      </a-list-item-meta>
    </a-list-item>
  </a-list>
              </a-card>
            </a-col>
        </a-row>
      </a-layout-content>
    </a-layout>

</template>
<script>
import * as vote from "../contract/voting"
export default {
  data() {
    return {
      currentVote: -1,
      collapsed: false,
      proposalList: [],
      ballots: 0,
      votedList: [],
      value: 0,
      ballotsToVote: 0,
      max: 0,
    };
  },
  


  async created(){
     await this.getProposalList();
     await this.getVoter();
     console.log(this.$web3.eth);
     let accounts =  await this.$web3.eth.getAccounts();
     
     console.log(accounts[0]);
  },

  methods: {
    async getProposalList(){
      let proposals = await vote.proposalList();
      this.proposalList = proposals;
      this.max = Math.max(...proposals.map(p=>p.ballots)) * 1.5

    },
    async getVoter(){
      let voter = await vote.getVoter();
      this.ballots = voter.ballots;
      this.votedList = voter.votedList;
      console.log(voter);
    },

    async buyBallot(){
      await vote.buy(this.value);
      await this.getVoter();
    },
    async vote(){
      if (this.currentVote < 0) {
        return;
      }
      await vote.vote(this.currentVote, this.ballotsToVote);
      await this.getProposalList();
      await this.getVoter();

    },
    changeVote(index){
      this.currentVote = index;

    }
  }
};
</script>
<style>

</style>
