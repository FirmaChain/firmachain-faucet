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
npm start:local
```
</br>

### 2. Create .env.local for mnemonic of faucet

```javascript
FAUCET_MNEMONIC='twist real vast bronze phrase impose million equip claim flight scatter embark nation thumb easy mother walk income talent better lesson horse arrest any'
```
</br>

### 3. Google reCAPTHA configration
Add site_key to .env.local (RECAPTCHA_SITEKEY)


```javascript
RECAPTCHA_SITEKEY=8as9dfaasAAAKEflsefjJPk8wHPL4yGg6AHzfDh-
```
</br>


### # Disable reCAPTCHA
```javascript

// line - 129
const reCaptchaSiteKey = process.env.REACT_APP_RECAPTCHA_SITEKEY;

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
