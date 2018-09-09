
// BUYERS (Buinesses) - ERC 20
function getBalance(offsetToken, address){
  console.log('asd', offsetToken);
  return new Promise((resolve, reject) =>{
    offsetToken.balanceOf(address)
    .then((result) =>{
      resolve(result.toString());
    })
    .catch((err) =>{
      reject(err);
    })
  });
}

function buyCredits(offsetCrowdsale, address){
  return new Promise((resolve, reject) =>{
    offsetCrowdsale.buyTokens(address, {from:address, value:500})
    .then((data) =>{
        console.log(data);
    })
    .catch((err) =>{
      reject(err);
    })
  });
}



// // SELLERS (Farmers) - ERC 721
function getToken(trackingToken){
  return new Promise((resolve, reject) =>{
    // first get token array of user
    trackingToken.balanceOf.then((data) =>{
      // then get specific token by id 
      console.log('DATA', data);
      // .then(() =>{
      //   //const balance = data.data.value;
      //   const matchingAccount = data.data.find((account)=>{
      //     return account.address === address;
      //   });
      //   resolve(matchingAccount.value);
      // })
      // .catch((err) =>{
      //   reject(err);
      // })
    })
    .catch((err) =>{
      reject(err);
    })
  });
}

function claimPayment(){
  return;
}

// // VALIDATORS
// function mintToken(){
//   return new Promise((resolve, reject) =>{

//     .then((data) =>{
//       //const balance = data.data.value;
//       const matchingAccount = data.data.find((account)=>{
//         return account.address === address;
//       });
//       resolve(matchingAccount.value);
//     })
//     .catch((err) =>{
//       reject(err);
//     })
//   });
// }

export { getBalance, buyCredits, getToken, claimPayment };