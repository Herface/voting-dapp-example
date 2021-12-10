/**
 * 迁移脚
 * 需要通过truffle运行
 */
const TokenVoting = artifacts.require("TokenVoting");

module.exports = function(deployer) {
  deployer.deploy(TokenVoting, ["Apple", "Banana", "Cherry"], 10000);
};
