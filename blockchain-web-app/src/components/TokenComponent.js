import React from 'react';
import { useEffect} from 'react';
import { ethers } from 'ethers';
import Login from './LoginComponents';

const GovernContractAddress = "0x0dD5af341973dcE1747622B54c1Ae0Cc15F0a744";
//const contracttoken="0xf44f3a345B62aC0E6eB9382e06A3d0F4De7C83fc";
const abi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_accountaddress",
				"type": "address"
			}
		],
		"name": "burntoken",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_minetokenamount",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_accountaddress",
				"type": "address"
			}
		],
		"name": "callMint",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "_UpdatedBalance",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_addressoftoken",
				"type": "address"
			}
		],
		"name": "setaddressB",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_accountaddress",
				"type": "address"
			}
		],
		"name": "balancedisplay",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "balance",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

function TokenComponent(props) {

	const balanceof = async ()=>{
		try {
			const { ethereum } = window;
	  
			if (ethereum) {

			const provider = new ethers.providers.Web3Provider(ethereum);
			const signer = provider.getSigner();
			const governToken= new ethers.Contract(GovernContractAddress, abi, signer);

			const balance = await governToken.balancedisplay(props.currentAccount);
			props.funct(String(balance));

			} else {
			  console.log("Ethereum object does not exist");
			}
	  
		  } catch (err) {
			console.log(err);
		  }
		
	}

	const logout=async()=>{
		try {
			props.setCurrentAccounts("");
			props.funct("");
		  } catch (err) {
			console.log(err);
		  }
	}

    const mintHandler = async () => {
      try {
        const { ethereum } = window;
  
        if (ethereum) {

          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const governToken= new ethers.Contract(GovernContractAddress, abi, signer);


        // console.log("Initialize");
         // let Txn = await governToken.setaddressB(contractoken,currentAccount);
  
         // console.log("Mining... please wait........");
         // await Txn.wait();
  
         // console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${Txn.hash}`);


		  const tokentobuy=document.getElementById("tokenvalueid").value;

		  console.log("Initialize",props.currentAccount,tokentobuy);
          let Txn2 = await governToken.callMint(tokentobuy,props.currentAccount);
  
          console.log("Mining... please wait");
          await Txn2.wait();
  
          console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${Txn2.hash}`);
		  balanceof();
		  document.getElementById("tokenvalueid").value="";
		  var elem = document.getElementById("alertid");
		  elem.classList.add("show");
		  setTimeout(function(){
			elem.classList.remove("show");
		  }, 3000);


		  
  
        } else {
          console.log("Ethereum object does not exist");
		  document.getElementById("tokenvalueid").value="";
		  var elem = document.getElementById("alertidf");
		  elem.classList.add("show");
		  setTimeout(function(){
			elem.classList.remove("show");
		  }, 3000);
        }
  
      } catch (err) {
        console.log(err);
		document.getElementById("tokenvalueid").value="";
		var elem = document.getElementById("alertidf");
		elem.classList.add("show");
		setTimeout(function(){
			elem.classList.remove("show");
		  }, 3000);
      }
    }
  
    const mintButton = () => {
      return (

		<div className='d-flex justify-content-center'>

			<div className="card" style={{width: "25rem",height:"10rem"}}>

			<div className="card-body">
			<h5 className="card-title"></h5>
					<div className="input-group input-group-lg mb-3">
						<div className="input-group-prepend">
						<span className="input-group-text" id="inputGroup-sizing-lg">
						Enter Number of Token
						</span>
						</div>
							<input
							type="number"
							name="tokenvaluename"
							id="tokenvalueid"
							className="form-control"
							aria-label="Enter Token"
							aria-describedby="inputGroup-sizing-lg"
							/>
					</div>
				<button onClick={mintHandler} className="btn btn-success">
					Buy Token
				</button>

				<button onClick={logout} className="btn btn-success ml-2">
					Logout
				</button>
			</div>
			</div>

		</div>
			
	
        
      );
    }


	const changeHome= () => {
		return (
		 <>
		 <Login></Login>
		 </>
		)
	  }

  
    useEffect(() => {
      props.check();
	  balanceof();
    }, [])
  
    return (
      <>
        
		{props.currentAccount ? mintButton() : changeHome()}
         
      </>
    )

}



export default TokenComponent;
