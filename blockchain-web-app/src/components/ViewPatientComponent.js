import React from 'react'
import { useEffect } from 'react';
import { ethers } from 'ethers';

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

const PatientContractAddress="0xe8196aEB302701cCEE379CBA653332A7a7FF489d";
const abiPatient=[
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "patientid",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "FullName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "Gender",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "Address",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "Diagnoses",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "Medicines",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "Health_Survey_Lab_Test",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "AnyPastHistroy",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "accountaddress",
				"type": "address"
			}
		],
		"name": "addEmployee",
		"outputs": [],
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
		"name": "setaddressC",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "patientid",
				"type": "uint256"
			}
		],
		"name": "getEmployee",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];


function ViewPatientComponent(props) {

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
    const search = async () => {
        try {
          const { ethereum } = window;
    
          if (ethereum) {
  
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const governToken= new ethers.Contract(GovernContractAddress, abi, signer);

            const PatientContract= new ethers.Contract(PatientContractAddress, abiPatient, signer);
  
            //datacapture
            const idu=document.getElementById("idu").value;
        
            //start 
    
            console.log("Initialize");

           
            const Txn2 = await PatientContract.getEmployee(idu);
            console.log(Txn2[0]);

            document.getElementById("srno").innerHTML="1";
            document.getElementById("name").innerHTML=Txn2[0];
            document.getElementById("gender").innerHTML=Txn2[1];
            document.getElementById("address").innerHTML=Txn2[2];
            document.getElementById("diagnoses").innerHTML=Txn2[3];
            document.getElementById("medicines").innerHTML=Txn2[4];
            document.getElementById("healthsurvey").innerHTML=Txn2[5];
            document.getElementById("pasthistroy").innerHTML=Txn2[6];
    
            console.log("Mining... please wait");

            console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${Txn2.hash}`);
            
            //balance capture
            balanceof();
            var elem = document.getElementById("alertid");
		  elem.classList.add("show");
		  setTimeout(function(){
			elem.classList.remove("show");
		  }, 3000);

        
           

          } else {
            console.log("Ethereum object does not exist");
            var elem = document.getElementById("alertidf");
            elem.classList.add("show");
            setTimeout(function(){
              elem.classList.remove("show");
            }, 3000);
    
          }
    
        } catch (err) {
          console.log(err);
          var elem = document.getElementById("alertidf");
		elem.classList.add("show");
		setTimeout(function(){
			elem.classList.remove("show");
		  }, 3000);
    
        }
      }

    useEffect(() => {
        balanceof();
      }, []) 

  return (
      <>
    <div className="container shadow-lg p-3 mb-5 bg-white rounded mt-3">
        <form className="needs-validation" noValidate>

        <div className="alert alert-info" role="alert">
            Enter ID to Search
            </div>
            <div className="col-md-6 mb-3">
            <label htmlFor="validationCustom01">ID</label>
            <input type="number" className="form-control" id="idu"  required/>
            <div className="valid-feedback">
                Looks good!
            </div>
            </div>

        </form>
        <button onClick={search} className="btn btn-primary">Submit form</button>
        
        


    </div>

<div className="container shadow-lg p-3 mb-5 bg-white rounded mt-3">
<table className="table table-bordered">
    <thead className="thead-dark">
        <tr>
        <th scope="col">Sr No.</th>
        <th scope="col">Full Name</th>
        <th scope="col">Gender</th>
        <th scope="col">Address</th>
        <th scope="col">Diagnoses</th>
        <th scope="col">Medicines</th>
        <th scope="col">Health Survey/ Lab tests</th>
        <th scope="col">Past History</th>
        </tr>
    </thead>
    <tbody>
        <tr>
        <th scope="row" id="srno"></th>
        <td id="name"></td>
        <td id="gender"></td>
        <td id="address"></td>
        <td id="diagnoses"></td>
        <td id="medicines"></td>
        <td id="healthsurvey"></td>
        <td id="pasthistroy"></td>

        </tr>

    </tbody>
    </table>

    
</div>
</>
  )
}

export default ViewPatientComponent