// import axios from 'axios';

// function getUsers(){
//   const users = ['0x895B758229aFF6C0f95146A676bBF579aD7636aa', '0xe6680987f8893F130aa2313acacb2A5eDaa9CC2B', '0xB9ABCD42B1351F62615dc2fF023FE03673122DC4']
//   return users;
// }

// // BUYERS (Buinesses) - ERC 20
// function getBalance(address){
//   return new Promise((resolve, reject) =>{
//     axios.get('dummyData.json')
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

// function buyCredits(address){
//   return new Promise((resolve, reject) =>{
//     axios.get('dummyData.json')
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

// // VALIDATORS
// function mintToken(){
//   return new Promise((resolve, reject) =>{
//     axios.get('dummyData.json')
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
// export { getBalance, buyCredits, getTokens, getTokenInfo };