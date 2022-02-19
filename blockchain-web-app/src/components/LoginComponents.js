import React from 'react';
import { useEffect } from 'react';
import TokenComponent from './TokenComponent';


function Login(props) {

  
    const checkWalletIsConnected = async () => {
      const { ethereum } = window;
  
      if (!ethereum) {
        console.log("Make sure you have Metamask installed!");
        return;
      } else {
        console.log("Wallet exists! We're ready to go!")
      }
  
      const accounts = await ethereum.request({ method: 'eth_accounts' });
  
      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account: ", account);
        props.setCurrentAccounts(account);
      } else {
        console.log("No authorized account found");
      }
    }
  
    const connectWalletHandler = async () => {
      const { ethereum } = window;
  
      if (!ethereum) {
        alert("Please install Metamask!");
      }
  
      try {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        console.log("Found an account! Address: ", accounts[0]);
        props.setCurrentAccounts(accounts[0]);
        
      } catch (err) {
        console.log(err)
      }
    }
  
  
    const connectWalletButton = () => {
      return (
        <div className="container-fluid text-center">
             <button onClick={connectWalletHandler} className='btn btn-success m-5 '>
              Connect Wallet
            </button>
        </div>
       
      )
    }
  
    const changeHome = () => {
      return (
          <>
          <div className='container-fluid p-5 text-center '>
          <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/512px-MetaMask_Fox.svg.png?20201112074605' height={150}></img>
          <h2 className='text-success'>Wallet Connected</h2>
          <TokenComponent setCurrentAccounts={props.setCurrentAccounts} funct={props.setCurrentBalanaces} check={checkWalletIsConnected} currentAccount={props.currentAccount}></TokenComponent>
        
          </div>
      
          </>
       
      )
    }
  
    useEffect(() => {
      checkWalletIsConnected();
    }, [])
  
    return (
      <div>
        <div>
          {props.currentAccount ? changeHome() : connectWalletButton()}
        </div>
      </div>
    )

}



export default Login;
