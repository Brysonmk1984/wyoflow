import axios from 'axios';


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
    // axios.get('dummyData.json')
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
// function getToken(address){
//   return new Promise((resolve, reject) =>{
//     // first get token array of user
//     axios.get('dummyData.json')
//     .then((data) =>{
//       // then get specific token by id 
//       axios.get('dummyData.json')
//       .then(() =>{
//         //const balance = data.data.value;
//         const matchingAccount = data.data.find((account)=>{
//           return account.address === address;
//         });
//         resolve(matchingAccount.value);
//       })
//       .catch((err) =>{
//         reject(err);
//       })
//     })
//     .catch((err) =>{
//       reject(err);
//     })
//   });
// }

// function claimPayment(){
//   return;
// }

// VALIDATORS
function mintToken(releaser, acreftReleased, streamInfo, destination, verifier, trackingToken){
  return new Promise((resolve, reject) =>{
    console.log(trackingToken);
    trackingToken.mintToken(releaser, acreftReleased, streamInfo, destination, {from:verifier})
    .then((result) =>{
      console.log(result)
      // resolve(result);
    })
    .catch((err) =>{
      reject(err);
    })
  });
}
// export { getBalance, buyCredits, getTokens, getTokenInfo };
export { getBalance, buyCredits, mintToken };