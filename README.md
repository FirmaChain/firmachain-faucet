# FirmaChain Testnet/Devnet Faucet

![image](https://user-images.githubusercontent.com/5277080/132805004-9716fcec-1502-4a1a-817e-6de3c50f046d.png)



Website : https://faucet-devnet.firmachain.org/

FirmaChain Faucet is a web service to obtain coins in testnet and devnet environments. 

The coin provided should be used only for testing purposes. Also, we are not responsible for issues related to testnet/devnet coin.

**WARNING**: The coin obtained through faucet is not compatible with the coin of mainnet and has no value.


# How to bulid Firma-Faucet

### 1. Install and Run 
```javascript
npm install
npm start
```
</br>

### 2. Create config.js for mnemonic of faucet

```javascript
var DATA = {
    faucetMnemonic : "FAUCET MNEMONIC"
}

export default DATA
```
</br>

### 3. Google reCAPTHA configration
Add site_key to config.js (reCaptchaSiteKey)


```javascript
var DATA = {
    faucetMnemonic : "FAUCET MNEMONIC",
    reCaptchaSiteKey : "RECAPCHA SITE KEY"
}

export default DATA
```



### # Disable reCAPTCHA
```javascript

// line - 129
const reCaptchaSiteKey = DATA.reCaptchaSiteKey;

// line - 218
const activateSendProcess = () => {
    if(sendAddressInput === ''){
        handleAlertOpen('Please fill in Address', 5000, 'error');
        return;
    }

    if(sendAddressInput === nftMode.enable){
        OptionActions.setNftMode(true);
        return;
    } else if(sendAddressInput === nftMode.disable){
        OptionActions.setNftMode(false);
        return;
    }
    
    // line - 232
    // setOpenRecaptcha() => sendAddress()
    setOpenRecaptcha(true);
}

// line - 367
{openRecaptcha &&
    <ReCaptchaBox>
        <ReCAPTCHA 
            style={{ display: "inline-block", height: '35px'}}
            theme="light"
            sitekey={reCaptchaSiteKey}
            onChange={handleRecaptcha}
        />
    </ReCaptchaBox>
}
```
