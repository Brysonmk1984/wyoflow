WyoFlow was built at the 2018 WyoHackathon. The project provides a utility token platform to protect Wyoming’s water resources. The WyoFlow platform utilizes the Ethereum blockchain, ERC20 and ERC721 utility tokens, and MakerDAO DAI tokens. WyoFlow can be found at www.wyoflow.org. The contracts and the front-end app are currently only available via local test instances.

## Setup and Usage

#### If you do not have truffle and ganache-cli installed already, run:
1. ```npm install -g truffle```
2. ```npm install -g ganache-cli```

### Once truffle and ganache-cli are installed, run:
1. `git clone https://github.com/nward13/wyoflow.git`
2. `cd ./wyoflow`
3. `npm install`

## To run dev blockchain and server:
1. `ganache-cli`  
In a separate terminal window: 
2. `truffle migrate --compile-all --reset`
3. `npm run start`

Corporations, NGOs, State Governments, and others have sponsored water restoration activities, including Wyoming’s recent investment of $2.2 million on a 2018 pilot program. Corporations such as New Belgium, InBev, Intel, Green Mountain Coffee, and others use Water Offset Credits to minimize their water footprint and achieve water stewardship goals. Water rights holders receive payments for the release of their water back into critical dewatered ecosystems. Water Offset Credits are certified by organizations such as the National Fish and Wildlife Foundation. However, current water restoration credit exchanges rely on multiple intermediaries and have significant inefficiencies.

A peer to peer decentralized system could minimize intermediaries and offer significant efficiencies over current water conservation credits. WyoFlow provides a Utility Token Platform to enable transactions between those who are willing to pay to conserve and those who are willing to conserve in exchange for payments. There are three roles for parties in this system: Payors, Conservers, and Validators/Recruiters. Payors such as New Belgium and Intel are willing to pay others to conserve in order to offset their own water footprint. The payors pay Ether to purchase an ERC20 Water Offset Token. These funds are traded for DAI and stored in the ERC20 contract. DAI is used to ensure that the funds available for water conservation are not impacted by changes in the value of Ether. Conservers are holders of senior water rights who agree to accept Ether in exchange for agreeing not to use water that they otherwise would. Validators recruit potential conservers and confirm that the conserved water is returned to the stream. They receive a small payment in ETH to incentivize these services. An ERC721 token is then minted containing metadata identifying the watershed, volume conserved, and the downstream destination (i.e. Lake Powell).

The ERC721 token provides a mechanism to track and claim the beneficial use of the water. By proving this beneficial use and “branding” the water via the ERC721 token, the state of Wyoming can bank this water downstream. Per the Colorado River Compact, the Upper Basin states (of which Wyoming is a part), are required to pass a minimum of 7.5 million acre-ft to the Lower Basin states every year. An estimated 400,000 acre-ft of water allocated to the state of Wyoming is left unused. Because there is not a system in place to track this water and claim its return to the river system as beneficial use, the state cannot bank the water in a downstream reservoir to put towards their downstream obligation in future years. Wyoming state engineer Pat Tyrrell recently said water conserved by the state “ought to have a bucking bronco on it.” The ERC721 token provides a method to brand this water for the future benefit of the state of Wyoming.
