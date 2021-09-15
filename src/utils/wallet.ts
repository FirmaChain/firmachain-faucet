import { useState } from 'react';

import { txClient as NftTxClient, queryClient as NftQueryClient } from '../firmachain/firmachain.firmachain.nft/module/index';
import { DirectSecp256k1HdWallet, DirectSecp256k1Wallet } from "@cosmjs/proto-signing";
import { stringToPath, Slip10, Slip10Curve, Bip39, EnglishMnemonic } from "@cosmjs/crypto";

import { txClient as BankTxClient, queryClient as BankQueryClient } from '../cosmos-sdk/cosmos.bank.v1beta1/module';
import { BroadcastTxResponse } from "@cosmjs/stargate";

import DATA from "../config";

export function Wallet() {
    
    const firmaWalletOption = {
        hdPaths: [stringToPath("m/44'/7777777'/0'/0/0")],
        prefix: "firma",
    }

    // imperium과 colosseum 중 선택 시, 주소가 바뀜
    // http://imperium-node1.firmachain.org:26657/
    // const chainTxAddress = "http://192.168.20.101:26657";
    const chainQueryAddress = "https://imperium-node1.firmachain.org:1317";
    const [chainTxAddress, setChainTxAddress] = useState("https://imperium-node1.firmachain.org:26657");

    const tokenDenom = "ufct";
    const faucetMnemonic = DATA.faucetMnemonic;

    function changeChainTxAddress(chainAdr: string) {
        // console.log("changed chain tx address ["+chainAdr+"]");
        setChainTxAddress(chainAdr)
        
    }

    // 신규지갑 생성해서 니모닉 전달
    async function createNewWallet() : Promise<DirectSecp256k1HdWallet> {
        
        let newWallet = await DirectSecp256k1HdWallet.generate(24);
        return newWallet;
    }

    async function getTokenBalance(address: string) : Promise<string> {
        
        let bankQueryClient = await BankQueryClient({ addr: chainQueryAddress });

        let result = await bankQueryClient.queryBalance(address, tokenDenom);
        let balance = "";

        if (result.data.balance == null) {
            console.log("[queryBalance] - supply is null");
        }
        else {
            // console.log("[queryBalance] " + result.data.balance.denom);
            console.log("[queryBalance] " + result.data.balance.amount);

            balance = getFCTStringFromUFCT(String(result.data.balance.amount));
        }

        return balance;
    }

    async function sendTokenByPrivateKey(privateKeyHex: string, targetAddress: string, amount: number, memo: string = "faucet") : Promise<BroadcastTxResponse> {
        let privateKey = Buffer.from(privateKeyHex.replace('0x', ''), 'hex');
        // Uint8Array 인풋으로 private 키를 넣으면, 바로 지갑 형태로 리턴해준다.
        let walletFromPrivateKey = await DirectSecp256k1Wallet.fromKey(privateKey, firmaWalletOption.prefix);
        const bankTxClient = await BankTxClient(walletFromPrivateKey, { addr: chainTxAddress })
        
        let account = await walletFromPrivateKey.getAccounts();
        const sendAmount = { denom: tokenDenom, amount: getUFCTStringFromFCT(amount)}
        
        // 전송할 블록체인 메시지 생성
        let message = bankTxClient.msgSend({ fromAddress: account[0].address, toAddress: targetAddress, amount: [sendAmount] });

        // 소수점은 안된다. 확인결과, 이 amount가 직접 가스비로 지불된다. (계산이 아닌 내가 바로 내는 돈)
        const gasFeeAmount = { denom: tokenDenom, amount: "2000" };
        const defaultFee = { amount: [gasFeeAmount], gas: "200000", };

        let result = await bankTxClient.signAndBroadcast([message], { fee: defaultFee, memo: memo });
        
        return result;
    }


    async function sendTokenByMnemonic(senderMnemonic: string, targetAddress: string, amount: number, memo: string = "faucet") : Promise<BroadcastTxResponse> {
        const faucetWallet = await DirectSecp256k1HdWallet.fromMnemonic(senderMnemonic, firmaWalletOption);
        const bankTxClient = await BankTxClient(faucetWallet, { addr: chainTxAddress })

        const accounts = await faucetWallet.getAccounts();
        const sendAmount = { denom: tokenDenom, amount: getUFCTStringFromFCT(amount)}

        // 전송할 블록체인 메시지 생성
        let message = bankTxClient.msgSend({ fromAddress: accounts[0].address, toAddress: targetAddress, amount: [sendAmount] });

        // 소수점은 안된다. 확인결과, 이 amount가 직접 가스비로 지불된다. (계산이 아닌 내가 바로 내는 돈)
        const gasFeeAmount = { denom: tokenDenom, amount: "2000" };
        const defaultFee = { amount: [gasFeeAmount], gas: "200000", };

        let result = await bankTxClient.signAndBroadcast([message], { fee: defaultFee, memo: memo });
        
        return result;
    }

    async function getAddressFromMnemonic(mnemonic: string) : Promise<string>{
        let wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, firmaWalletOption);
        let account = await wallet.getAccounts();
        return account[0].address;
    }

    // 니모닉에서 지갑으로 변환
    async function createWalletFromMnemonic(mnemonic: string) : Promise<DirectSecp256k1HdWallet>{
        
        let wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, firmaWalletOption);
        return wallet;
    }

    async function sendTokenFromFaucet(targetAddress: string, amount: number) : Promise<BroadcastTxResponse> {
        // 수도꼭지 지갑=
        const faucetWallet = await DirectSecp256k1HdWallet.fromMnemonic(faucetMnemonic, firmaWalletOption);
        const bankTxClient = await BankTxClient(faucetWallet, { addr: chainTxAddress })

        const accounts = await faucetWallet.getAccounts();
        const sendAmount = { denom: tokenDenom, amount: getUFCTStringFromFCT(amount)}

        // 전송할 블록체인 메시지 생성
        let message = bankTxClient.msgSend({ fromAddress: accounts[0].address, toAddress: targetAddress, amount: [sendAmount] });

        // 소수점은 안된다. 확인결과, 이 amount가 직접 가스비로 지불된다. (계산이 아닌 내가 바로 내는 돈)
        const gasFeeAmount = { denom: tokenDenom, amount: "2000" };
        const defaultFee = { amount: [gasFeeAmount], gas: "200000", };

        let result = await bankTxClient.signAndBroadcast([message], { fee: defaultFee, memo: "faucet" });
        
        return result;
    }

    function getFCTStringFromUFCT(uFctAmount: string): string {
        let number = Number(uFctAmount);
        return (number / 1000000).toString();
    }

    function getUFCTStringFromFCT(fctAmount: number) : string{
        return fctAmount + "000000";
    }

    async function getPrivateKey(mnemonic: string, accountIndex: number) : Promise<string> {

        const mnemonicChecked = new EnglishMnemonic(mnemonic);
        const seed = await Bip39.mnemonicToSeed(mnemonicChecked);

        let hdpath = stringToPath("m/44'/7777777'/" + accountIndex + "'/0/0")

        const {privkey} = Slip10.derivePath(Slip10Curve.Secp256k1, seed, hdpath);

        let hex = Buffer.from(privkey).toString('hex');
        return "0x" + hex;
    }

    async function getAddressFromPrivateKey(privateKeyHex: string) : Promise<string> {

        let privateKey = Buffer.from(privateKeyHex.replace('0x', ''), 'hex');

        // Uint8Array 인풋으로 private 키를 넣으면, 바로 지갑 형태로 리턴해준다.
        let walletFromPrivateKey = await DirectSecp256k1Wallet.fromKey(privateKey, firmaWalletOption.prefix);
        let account = await walletFromPrivateKey.getAccounts();
        
        return account[0].address;
    }



    ///////////////////////////

    async function getNFTBalance(address: string){
        let nftQueryClient = await NftQueryClient({ addr: chainQueryAddress });
        let result3 = await nftQueryClient.queryBalanceOf({ ownerAddress: address});
        console.log("[queryBalanceOf] : " + result3.data.total);
    
        if(result3.data != null)
            return parseInt(result3.data.total!);
    
        return 0;
    }
    
    async function getNFTInfo(nftItemId: string){
        let nftQueryClient = await NftQueryClient({ addr: chainQueryAddress });
        let result2 = await nftQueryClient.queryNftItem(nftItemId);
        if (result2.data.NftItem != null) {
    
            // console.log("[queryNftItem id] : " + result2.data.NftItem.id);
            // console.log("[queryNftItem owner] : " + result2.data.NftItem.owner);
            // console.log("[queryNftItem tokenURI] : " + result2.data.NftItem.tokenURI);
    
            return result2.data.NftItem;
        }
    
        return null;
    }
    
    // 체인내에 만들어진 모든 NFT 데이터 (모든 유저들 데이터)
    async function getNFTBalanceAll() {
    
        let nftQueryClient = await NftQueryClient({ addr: chainQueryAddress });
    
        let result = await nftQueryClient.queryNftItemAll();
        let hasNFTItem = false;
    
        if (result.data.NftItem != null) {
    
            for (var i = 0; i < result.data.NftItem.length; i++) {
    
                hasNFTItem = true;
    
                // need name of "creator" check
                // console.log("[queryNftItemAll id] : " + result.data.NftItem[i].id);
                // console.log("[queryNftItemAll owner] : " + result.data.NftItem[i].owner);
                // console.log("[queryNftItemAll tokenURI] : " + result.data.NftItem[i].tokenURI);
            }
        }
    
        if(hasNFTItem)
            return result.data.NftItem;
        
        return [];
    }
    
    async function getAllNFT(address : string){
    
        let nftTotal = await getNFTBalance(address);
    
        let nftQueryClient = await NftQueryClient({ addr: chainQueryAddress });
    
        var nftItemList = [];
    
        // 확인된 사용자 갯수를 인덱스 화 해서 해당 정보 얻어오기
        for (var i = 0; i < nftTotal; i++) {
    
            // 해당 인덱스의 NFT ID 값 얻어오기
            let result4 = await nftQueryClient.queryTokenOfOwnerByIndex({ ownerAddress: address, index: i.toString() });
            let nftID1 = result4.data.tokenId;
    
            if (nftID1 != null) {
                // 얻어온 NFT ID 값의 실제 정보 얻어오기
                let result2 = await nftQueryClient.queryNftItem(nftID1);
                if (result2.data.NftItem != null) {
                    nftItemList.push(result2.data.NftItem);
                }
            }
        }
    
        return nftItemList;
    }
    
    async function MintNFT(privateKeyHex : string, tokenURI : string, memo: string = "faucet"){
        
        let privateKey = Buffer.from(privateKeyHex.replace('0x', ''), 'hex');
        let walletFromPrivateKey = await DirectSecp256k1Wallet.fromKey(privateKey, firmaWalletOption.prefix);
        let account = await walletFromPrivateKey.getAccounts();
        
        const gasFeeAmount = { denom: tokenDenom, amount: "2000" };
        const defaultFee = { amount: [gasFeeAmount], gas: "200000", };
    
        let nftTxClient = await NftTxClient(walletFromPrivateKey, { addr: chainTxAddress })
    
        let message = await nftTxClient.msgMint({ owner: account[0].address, tokenURI: tokenURI });
        let result = await nftTxClient.signAndBroadcast([message], { fee: defaultFee, memo: memo });
    
        //console.log("[signAndBroadCast height] " + result.height);
        //console.log("[signAndBroadCast transactionHash] " + result.transactionHash);
        //console.log("[signAndBroadCast rawLog] " + result.rawLog);
    
        return result;
    }
    
    async function BurnNFT(privateKeyHex : string,  nftId : number, memo: string = "faucet"){
        
        let privateKey = Buffer.from(privateKeyHex.replace('0x', ''), 'hex');
        let walletFromPrivateKey = await DirectSecp256k1Wallet.fromKey(privateKey, firmaWalletOption.prefix);
        let account = await walletFromPrivateKey.getAccounts();
        
        const gasFeeAmount = { denom: tokenDenom, amount: "2000" };
        const defaultFee = { amount: [gasFeeAmount], gas: "200000", };
    
        let nftTxClient = await NftTxClient(walletFromPrivateKey, { addr: chainTxAddress })
    
        let message = await nftTxClient.msgBurn({ owner : account[0].address, nftId : nftId});
        let result = await nftTxClient.signAndBroadcast([message], { fee: defaultFee, memo: memo });
    
        //console.log("[signAndBroadCast height] " + result.height);
        //console.log("[signAndBroadCast transactionHash] " + result.transactionHash);
        //console.log("[signAndBroadCast rawLog] " + result.rawLog);
    
        return result;
    }
    
    async function TransferNFT(privateKeyHex : string, targetAddress : string, nftId : number, memo: string = "faucet"){
        
        let privateKey = Buffer.from(privateKeyHex.replace('0x', ''), 'hex');
        let walletFromPrivateKey = await DirectSecp256k1Wallet.fromKey(privateKey, firmaWalletOption.prefix);
        let account = await walletFromPrivateKey.getAccounts();
        
        const gasFeeAmount = { denom: tokenDenom, amount: "2000" };
        const defaultFee = { amount: [gasFeeAmount], gas: "200000", };
    
        let nftTxClient = await NftTxClient(walletFromPrivateKey, { addr: chainTxAddress })
    
        let message = await nftTxClient.msgTransfer({ owner : account[0].address, nftId : nftId, toAddress : targetAddress});
        let result = await nftTxClient.signAndBroadcast([message], { fee: defaultFee, memo: memo });
    
        //console.log("[signAndBroadCast height] " + result.height);
        //console.log("[signAndBroadCast transactionHash] " + result.transactionHash);
        //console.log("[signAndBroadCast rawLog] " + result.rawLog);
    
        return result;
    }
    
    async function TestNFTModule() {
    
        // NFT ID 값으로만 정보를 얻을 떄
        const testNFTID = "0";
        let data = await getNFTInfo(testNFTID);
    
        if (data != null) {
            console.log("[getNFTInfo id] : " + data.id);
            console.log("[getNFTInfo owner] : " + data.owner);
            console.log("[getNFTInfo tokenURI] : " + data.tokenURI);
        }
    
        let targetAddres  = "firma1nssuz67am2uwc2hjgvphg0fmj3k9l6cx65ux9u";
    
        // 현재 지갑주소의 NFT 갯수만 확인
        let nftTotal = await getNFTBalance(targetAddres);
        console.log("[getNFTBalance] : " + nftTotal);
    
        // 현재 지갑주소의 모든 NFT 정보 얻기
        let nftItemList = await getAllNFT(targetAddres);
    
        for (var i = 0; i < nftItemList.length; i++) {
    
            console.log("[nftItemList id] : " + nftItemList[i].id);
            console.log("[nftItemList owner] : " + nftItemList[i].owner);
            console.log("[nftItemList tokenURI] : " + nftItemList[i].tokenURI);
        }
        
        let sampePrivateKey = "0xsdfklsjfsldkjfsdf";
        
        // NFT 만들기
        let result1 = MintNFT(sampePrivateKey, "http://ipfs.naver.com");
    
        // NFT 전송
        let result2 = await TransferNFT(sampePrivateKey, targetAddres, 0);
        
        // NFT소각
        let result3 = await BurnNFT(sampePrivateKey, 0);
    }
    
    return {
        sendTokenByPrivateKey,
        changeChainTxAddress,
        createNewWallet,
        sendTokenFromFaucet,
        getPrivateKey,
        getAddressFromPrivateKey,
        getTokenBalance,
        MintNFT,
        getAllNFT,
        getNFTBalanceAll,
        TransferNFT,
        BurnNFT,
    }
}

