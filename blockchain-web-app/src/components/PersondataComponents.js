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

	

function PersondataComponents(props) {


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

    const savedata = async () => {
        try {
          const { ethereum } = window;
    
          if (ethereum) {
  
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const governToken= new ethers.Contract(GovernContractAddress, abi, signer);

            const PatientContract= new ethers.Contract(PatientContractAddress, abiPatient, signer);
  
  
            //datacapture
            const idu=document.getElementById("idu").value;
            const FirstName=document.getElementById("fname").value;
            const LastName=document.getElementById("lname").value;
            const Gender=document.getElementById("gender").value;
            const Address1=document.getElementById("address1").value;
            const Address2=document.getElementById("address2").value;
            const City=document.getElementById("city").value;
            const State=document.getElementById("state").value;
            const Zipcode=document.getElementById("zipcode").value;
            const Diagnoses=document.getElementById("diagnoses").value;
            const Medicines=document.getElementById("medicines").value;
            const HealthSurvey=document.getElementById("healthsurvey").value;
            const LabTest=document.getElementById("labtest").value;
            const PastHistroy=document.getElementById("pasthistroy").value;
  
            //start 
          
           
        
         
         
           
           
            console.log("Initialize");
            const Fullname=FirstName+" "+LastName;
            const FullAddress=Address1+" "+Address2+" "+City+" "+State+" "+Zipcode; 
            const HealthSurveyLabtest=HealthSurvey+LabTest;
            console.log(Fullname)
            console.log(idu)
            let Txn2 = await PatientContract.addEmployee(idu,Fullname,Gender,FullAddress,Diagnoses,Medicines,HealthSurveyLabtest,PastHistroy,props.currentAccount);
    
            
            console.log("Mining... please wait");
            await Txn2.wait();
    
            console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${Txn2.hash}`);
            
            //balance capture
            balanceof();
            var elem = document.getElementById("alertid");
		  elem.classList.add("show");
		  setTimeout(function(){
			elem.classList.remove("show");
		  }, 3000);

          //
          idu=document.getElementById("idu").value="";
          FirstName=document.getElementById("fname").value="";
          LastName=document.getElementById("lname").value="";
          Gender=document.getElementById("gender").value="";
          Address1=document.getElementById("address1").value="";
          Address2=document.getElementById("address2").value="";
          City=document.getElementById("city").value="";
          State=document.getElementById("state").value="";
          Zipcode=document.getElementById("zipcode").value="";
          Diagnoses=document.getElementById("diagnoses").value="";
          Medicines=document.getElementById("medicines").value="";
          HealthSurvey=document.getElementById("healthsurvey").value="";
          LabTest=document.getElementById("labtest").value="";
          PastHistroy=document.getElementById("pasthistroy").value="";

          
          //
           

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
    <div className="container shadow-lg p-3 mb-5 bg-white rounded mt-3">
        <form className="needs-validation" noValidate>
        <div className="alert alert-danger" role="alert">
            Note : You will Spend 2 Token While Saving Data
            </div>
        <div className="alert alert-info" role="alert">
            Personal data
            </div>
            <div className="col-md-6 mb-3">
            <label htmlFor="validationCustom01">ID</label>
            <input type="number" className="form-control" id="idu"  required/>
            <div className="valid-feedback">
                Looks good!
            </div>
            </div>
        <div className="form-row">
            <div className="col-md-6 mb-3">
            <label htmlFor="validationCustom01">First name</label>
            <input type="text" className="form-control" id="fname"  required/>
            <div className="valid-feedback">
                Looks good!
            </div>
            </div>
            <div className="col-md-6 mb-3">
            <label htmlFor="validationCustom02">Last name</label>
            <input type="text" className="form-control" id="lname"  required/>
            <div className="valid-feedback">
                Looks good!
            </div>
            </div>
            <div className="col-md-3 mb-3">
            <label htmlFor="validationCustom04">Gender</label>
            <select className="custom-select" id="gender" required>
                <option>Female</option>
                <option>Male</option>
                <option>Cant say</option>
            </select>
            <div className="invalid-feedback">
                Please select a valid Gender
            </div>
            </div>
        </div>
        <div className="form-group">
            <label htmlFor="inputAddress">Address</label>
            <input type="text" className="form-control" id="address1" placeholder="1234 Main St"/>
        </div>
        <div className="form-group">
            <label htmlFor="inputAddress2">Address 2</label>
            <input type="text" className="form-control" id="address2" placeholder="Apartment, studio, or floor"/>
        </div>
        <div className="form-row">
            <div className="col-md-6 mb-3">
            <label htmlFor="validationCustom03">City</label>
            <input type="text" className="form-control" id="city" required/>
            <div className="invalid-feedback">
                Please provide a valid city.
            </div>
            </div>
            
            <div className="col-md-3 mb-3">
            <label htmlFor="validationCustom04">State</label>
            <input type="text" className="form-control" id="state" required/>
            <div className="invalid-feedback">
                Please select a valid state.
            </div>
            </div>
            <div className="col-md-3 mb-3">
            <label htmlFor="validationCustom05">Zip</label>
            <input type="text" className="form-control" id="zipcode" required/>
            <div className="invalid-feedback">
                Please provide a valid zip.
            </div>
            </div>
        </div>
        <div className="alert alert-info" role="alert">
            Medical data
        </div>

        <div className="form-group">
    <label htmlFor="exampleFormControlTextarea1">Diagnoses</label>
    <textarea className="form-control" id="diagnoses" rows="3"></textarea>
  </div>

  <div className="form-group">
    <label htmlFor="exampleFormControlTextarea1"> medications/Medicines</label>
    <textarea className="form-control" id="medicines" rows="3"></textarea>
  </div>

  <div className="form-group">
    <label htmlFor="exampleFormControlTextarea1">Health Surveys</label>
    <textarea className="form-control" id="healthsurvey" rows="3"></textarea>
  </div>

  <div className="form-group">
    <label htmlFor="exampleFormControlTextarea1">lab tests</label>
    <textarea className="form-control" id="labtest" rows="3"></textarea>
  </div>

  <div className="form-group">
    <label htmlFor="exampleFormControlTextarea1">Any Past Histroy</label>
    <textarea className="form-control" id="pasthistroy" rows="3"></textarea>
  </div>


     
        
        </form>
        <button onClick={savedata} className="btn btn-primary">Submit form</button>
    </div>
  )
}

export default PersondataComponents

