const IPFSAPI = require('ipfs-http-client-lite');
const fs = require('fs');
const lodash = require('lodash');
const multihash = require('multihashes')

class IPFS {
    setIPFSNode(host) {
        this.uri = host;
        this.client = IPFSAPI({ apiUrl: this.uri });
    }

    getURLFromHash(hash) {
        return `${this.uri}/ipfs/${hash}`;
    }

    async addJson(data) {
        if (!this.client)
            return `Not set ipfs client. Please execute 'constructor' or 'setIPFS'`;

        if (isEmpty(data))
            return `input data is empty.`;

        const retData = await this.client.add(Buffer.from(data));
        return retData[0].hash;
    }

    async addFile(data) {
        if (!this.client)
            return `Not set ipfs client. Please execute 'constructor' or 'setIPFS'`;

        if (lodash.isString(data)) {
            data = fs.readFileSync(data);
        }

        if (!lodash.isBuffer(data) && !lodash.isArrayBuffer(data)) throw new Error(`Invalid data: ${data}`);

        const retData = await this.client.add(Buffer.from(data));
        return retData[0].hash;
    }

    async get(hash) {
        if (!this.client) 
            return `Not set ipfs client. Please execute 'constructor' or 'setIPFS'`;

        let retData = await this.client.cat(hash, {});
        return retData;
    }

    toHex(hash) {
        const buf = multihash.fromB58String(hash);
        return `0x${multihash.toHexString(buf)}`;
    }
}

function isEmpty (value) {
    if( value == "" || value == null || value == undefined || ( value != null && typeof value == "object" && !Object.keys(value).length ) )
        return true;
    else
        return false;
}

module.exports = IPFS;