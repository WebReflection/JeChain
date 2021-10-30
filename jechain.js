const crypto = require("crypto"), SHA256 = message => crypto.createHash("sha256").update(message).digest("hex");

class Block {
    constructor(timestamp = Date.now().toString(), data = []) {
        this.timestamp = timestamp;
        this.data = data;
        this.prevHash = "";
        this.nonce = 0;
    }

    get hash() {
        return SHA256(this.prevHash + this.timestamp + JSON.stringify(this.data) + this.nonce);
    }

    mine(difficulty) {
        while(this.hash.substring(0, difficulty) !== "0".repeat(difficulty)) {
            this.nonce++;
        }
    }
}

class Blockchain extends Array {
    constructor() {
        super(new Block()).difficulty = 1;
    }

    get lastBlock() {
        return this[this.length - 1];
    }

    push(block) {
        block.prevHash = this.lastBlock.hash;
        block.mine(this.difficulty);
        return super.push(block);
    }

    isValid() {
        for (let i = 1; i < this.length; i++) {
            const currentBlock = this[i];
            const prevBlock = this[i-1];

            if (currentBlock.hash !== currentBlock.getHash() || prevBlock.hash !== currentBlock.prevHash) {
                return false;
            }
        }

        return true;
    }
}

const JeChain = new Blockchain();

module.exports.Block = Block;
module.exports.Blockchain = Blockchain;
module.exports.JeChain = JeChain;
