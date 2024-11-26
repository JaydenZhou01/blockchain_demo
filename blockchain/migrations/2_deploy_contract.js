const DeliverySystem = artifacts.require("./DeliverySystem.sol");

module.exports = function (deployer) {
  deployer.deploy(DeliverySystem,{ gas: 5000000 });
};