import React, { useState } from 'react'
import '../css/Product.css'
import {EVMConnect, Tokens, Chains} from 'resmic'
import shoe from '../assets/shoe.png'


export default function Product() {
    const [paymentStatus, setPaymentStatus] = useState(false);
    const [userAddress, setUserAddress] = useState();
    const [walletId, setWalletId] = useState();
    const [btnText,setBtnText] = useState("Create Wallet");
    const [tokenId, setTokenId] = useState()
    const [walletAddress, setWalletAddress] = useState();
    
    const [fnOne, setFnOne] = useState(true)
    const [fnTwo, setFnTwo] = useState(false)
    const [fnThree, setFnThree] = useState(false)


    const generateWalletAddress = async() => {
        console.log("here")
        const url = 'https://api.circle.com/v1/w3s/developer/wallets';
        const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json', Authorization: 'Bearer TEST_API_KEY:d85f0edd01d09fd1ba68cd3888f56041:1ce39f455c8e98bf414c929050929506'},
        body: '{"idempotencyKey":"8a83af2a-318e-4a22-80c0-9d9a1b4ee3a5","entitySecretCipherText":"fH4lYlKiyvuwdpSQAG14tLBNSJJVgDGXdmxFFidCfg4A+3aIVONdmg+gbVXmRcJFarhFJKhkBBdh6scG6r2A9HzDlY2XG9Y0Rf7avT85o4HFMxK+103/BwFbm6vRt6nE/HUSoyGPI5moiQwI8a2EZ4xnIeVsRe9Qxrss2eZUuV5SunIdV59C0PFOc4a6AsrcSW7rmVk2PQ0PYyDAzDUZqw5N2rwCTqG33WvMhrQ6YHmMQrIR3lu2c1srhwcLadOAIldwWwKo2XB5vS/AHJkt09ohDBI7ZqA0d53/LX0F3MEIfC0k0WCIftidUjB0CYFFwT2Agt0/ZCJ0yRv2A/W0OWF8gNM99azhSO2pVLB6tWXhnkOFZC/4cNjakxNk0Gz+2+tndZKXm8HHi9RJw2TUpkySCM7Q6DDGKTmCL3zxTpp1FahOuXNIGRKHh0JmTl9CljBLiZaZZkkUEHSP+vwnmraEDc5sw6kYor2ph3xGY8xd4XgsuGsSaSSPKttp/z3fF5HDJHOC20jXct6iVDScxk5UjGL7nJyQ/t79g4eVzyNtIV3PpMwqtoUByqMFL9rBFwytW3a3ClrypgvBXvmfmQ/TIHdFOibYbiv3SY2OTBEidhDhwyK+L9x1PWioTDRm5FybN6w04v30KkQBxcPa4H70LNFhbD4eDQa1B9EfrMY=","blockchains":["MATIC-MUMBAI"],"count":1,"walletSetId":"018bf9f7-ac72-7eae-bc78-04b2a3a8751e"}'
        };
    
        try {
        const response = await fetch(url, options);
        const data = await response.json();
        // console.log(data);
        // console.log(data.data);
        console.log(data.data.wallets);
        console.log(data.data.wallets[0]);
        console.log(data.data.wallets[0].address);
        setWalletId(data.data.wallets[0].id)
        setUserAddress( "Deposite funds to:",data.data.wallets[0].address)
        alert(data.data.wallets[0].address)
        setWalletAddress(data.data.wallets[0].address)

        setFnOne(false)
        setFnTwo(true)
        } catch (error) {
        console.error(error);
        }

    }

    // Alert of wallet address to deposit funds in it  

    const CheckBalance = async() => {
        // {
        //     "id": "6af0e420-0f1a-5ba5-92ae-e0f429e8aef4",
        //     "state": "LIVE",
        //     "walletSetId": "018bf9f7-ac72-7eae-bc78-04b2a3a8751e",
        //     "custodyType": "DEVELOPER",
        //     "address": "0x8dde08326971ed512bd71eb100f977d2565f5eea",
        //     "blockchain": "MATIC-MUMBAI",
        //     "accountType": "EOA",
        //     "updateDate": "2023-11-23T02:50:46Z",
        //     "createDate": "2023-11-23T02:50:46Z"
        // }


        // Check the balance
        // const url = 'https://api.circle.com/v1/w3s/wallets/__WALLET_ID__/balances';
        const url = `https://api.circle.com/v1/w3s/wallets/${walletId}/balances`;
        const options = {
        method: 'GET',
        headers: {'Content-Type': 'application/json', Authorization: 'Bearer TEST_API_KEY:d85f0edd01d09fd1ba68cd3888f56041:1ce39f455c8e98bf414c929050929506'}
        };

        try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data.data.tokenBalances[0]);
        console.log(data.data.tokenBalances[0].amount);
        console.log(data.data.tokenBalances[0].token.symbol);
        setTokenId(data.data.tokenBalances[0].token.id);
        alert(`Token : ${data.data.tokenBalances[0].token.symbol} \n Amount: ${data.data.tokenBalances[0].amount}`)
        setFnTwo(false)
        setFnThree(true)
        } catch (error) {
        console.error(error);
        }

    }

    const sendTokens = async() => {
        const fetch = require('node-fetch');

        const url = 'https://api.circle.com/v1/w3s/developer/transactions/transfer';
        const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json', Authorization: 'Bearer TEST_API_KEY:d85f0edd01d09fd1ba68cd3888f56041:1ce39f455c8e98bf414c929050929506'},
        // body: '{"idempotencyKey":"8a83af2a-318e-4a22-80c0-9d9a1b4ee3a5","entitySecretCipherText":"fH4lYlKiyvuwdpSQAG14tLBNSJJVgDGXdmxFFidCfg4A+3aIVONdmg+gbVXmRcJFarhFJKhkBBdh6scG6r2A9HzDlY2XG9Y0Rf7avT85o4HFMxK+103/BwFbm6vRt6nE/HUSoyGPI5moiQwI8a2EZ4xnIeVsRe9Qxrss2eZUuV5SunIdV59C0PFOc4a6AsrcSW7rmVk2PQ0PYyDAzDUZqw5N2rwCTqG33WvMhrQ6YHmMQrIR3lu2c1srhwcLadOAIldwWwKo2XB5vS/AHJkt09ohDBI7ZqA0d53/LX0F3MEIfC0k0WCIftidUjB0CYFFwT2Agt0/ZCJ0yRv2A/W0OWF8gNM99azhSO2pVLB6tWXhnkOFZC/4cNjakxNk0Gz+2+tndZKXm8HHi9RJw2TUpkySCM7Q6DDGKTmCL3zxTpp1FahOuXNIGRKHh0JmTl9CljBLiZaZZkkUEHSP+vwnmraEDc5sw6kYor2ph3xGY8xd4XgsuGsSaSSPKttp/z3fF5HDJHOC20jXct6iVDScxk5UjGL7nJyQ/t79g4eVzyNtIV3PpMwqtoUByqMFL9rBFwytW3a3ClrypgvBXvmfmQ/TIHdFOibYbiv3SY2OTBEidhDhwyK+L9x1PWioTDRm5FybN6w04v30KkQBxcPa4H70LNFhbD4eDQa1B9EfrMY=","amounts":["0.001"],"destinationAddress":"0x056397760b973bfb921bc10be9da5034b1e921d7","feeLevel":"HIGH","tokenId":"e4f549f9-a910-59b1-b5cd-8f972871f5db","walletId":"6af0e420-0f1a-5ba5-92ae-e0f429e8aef4"}'
        body: `{"idempotencyKey":"8a83af2a-318e-4a22-80c0-9d9a1b4ee3a5","entitySecretCipherText":"C6hWj3G/9qgr+8WSAO+1V4mRdjm2SPrjNflAg3l6Kb5K3SiAPwxHjkEOT06mLP6Izlu+0q34tt1OfEzPshJA85j6C51EkKmg3GZb5QG6v8x41Phia50sWcWLpDQlhg1KbH+1geMQ9m2f++oY2iUPrSuGp4FXpCd3M20i3IROZAsGGkmrTR5Nu2ZsxKybNWQR3o5wjh1GblusIizwrGyU5nUsl9mjkEoJwAcxvv5j0l0hbHIpfRuT+SfKXdi5O35+NsetRnBX6KgzrFgIfZG76iw/uVnRJnAEzyWnxVwTo21BVnYSYuMKXBLR8s1hKVI0edu8oT3mvIThBD8ub5GEf1yGUtvgm+mfLy7/YjAAw6xomsmj/lCvzBQdDt6FP6dnVVL4BIuMChgSla2lGT1cSgw5LQUuNKS55yUiNPeDOtXcx9hJidxBoYN8GSVTkaI+wNXgs/GXPT26xnL4EPxl4Nb9OVGN+pVUEVqz234Dy5Y91z7QrtpR41YPU2PsUFPhrUAFIqfhziB/kzrTC4XUDtotBUIlnbYBMtibncwTS1l9r20L7z0OD79xGUOClCYOfIQWbBcylTdZan4d/XFbhRBJ7Ba/h2499ZRH6AioH0KIWWzQ31tewbkwQ3WjhPZY+IVbl41X+NE1yIpNJ1lTC45EmWMSS+i7BUlNuL8BH7E=","amounts":["0.1"],"destinationAddress":"0x056397760b973bfb921bc10be9da5034b1e921d7","feeLevel":"HIGH","tokenId":"e4f549f9-a910-59b1-b5cd-8f972871f5db","walletId":"6af0e420-0f1a-5ba5-92ae-e0f429e8aef4"}'`
        };

        try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data);
        } catch (error) {
        console.error(error);
        }
    }


  return (
    
    <div className='product'>
        <div className="header">
            <div className="product-name">
                <span>RobloX Runners</span>
            </div>
            <div className="product-img">
                <img src={shoe} alt="" />
            </div>
            <div className="product-rating">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
            </div>
            <div className="product-info">
                <span>Men's Sneakers, Casual Red Shoes for Men's & Boys</span>
            </div>
            <div className="product-price">
                {/* <span>$100.00</span> */}
                <span>0.1 MATIC</span>
            </div>
        </div>
        <div className="footer">
        {/* <EVMConnect  Address={"0x056397760b973BfB921Bc10Be9DA5034B1e921d7"} //Wallet address to receive funds
                Chains={[ Chains.Ethereum, Chains.Polygon, Chains.Goerli]} //Choose the blockchains to allow payments from
        	Tokens ={[Tokens.USDT,Tokens.ETH,Tokens.DAI]} //Choose the Tokens to accept payments from
                Amount={100} //Amount you want to receive in USD($)
                setPaymentStatus = {setPaymentStatus}
                noOfBlockConformation={5} //No. of blocks to wait for the payment conformation (Optional)
                Style = {{displayName: "Buy Now",
                    backgroundColor: "rgb(209,99,180)",
                    color: "#fff",
                    border: "none",
                    width:'50%',
                    boxSizing:'border-box',
                    padding: "1rem",
                    borderRadius: "8px",
                    fontSize: "1.2rem",
                    fontWeight:'400'
        }}
        /> */}

        {/* <button onClick={generateWalletAddress} >Click Here</button>
        <button onClick={sendFunds} >Send Tokens</button>
        <button onClick={sendTokens} >sendTokens</button> */}
        
        {/* <button onClick={generateWalletAddress} >{btnText}</button> */}
        {fnOne&& (<button onClick={generateWalletAddress}>Create wallet</button>)}
        {fnTwo && (<button onClick={CheckBalance}>Check Balance</button>)}
        {fnThree&& (<button onClick={sendTokens}>Make Payment</button>)}

        </div>
    </div>
  )
}