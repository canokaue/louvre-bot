const { ethers } = require('hardhat');

const contractFactoryAddress = "0x41f3d600d8be3cc7a538638e0685474343d37fd5";

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const main = async () => {

  while (true) {
  const Contract = await ethers.getContractFactory("TokenSale");
  const tokenSale = await Contract.attach(contractFactoryAddress);

  const now = Date.now();
  const lastSale = (await tokenSale.lastSale()).toString();
  const nextSale = (parseInt(lastSale) + 30).toString();
  // const tokenPrice = (await tokenSale.tokenPrice()).toString(); // this makes the bot way slower

  const countdown = (parseInt(nextSale)).toString() - parseInt((now.toString()).slice(0, -3));

  console.log("");
  console.log("now = " , now);
  console.log("countdown = " , countdown);
  console.log("");
  console.log("nextSale = " , nextSale);
  console.log("lastSale = " , lastSale);
  // console.log("tokenPrice = " , tokenPrice);
  console.log("");

  if ((countdown <= 4 & countdown >= 2) || (countdown <= -41 & countdown >= -45)) {
    
    console.log("XYKO NEEDS MONEY :/");
    await sleep(420); // nice
    const txid = await tokenSale.buyToken();
    console.log("Txid: ", txid);
    await sleep(1500);
  }

  }
}


main();