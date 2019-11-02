//블록체인 할 때 한 블록을 인터페이스로 정의
//블록 세부 설명같은거 정의 
//interface 는 js 에서 안돌아감 -> 대신 class 쓴다

import * as CryptoJs from "crypto-js";

class Block{
    public index:number;
    public hash: string;
    public previousHash:string;
    public data:string;
    public timestamp:number;

    //블록 생성하지 않아도 method 쓸수있도록 하는 것 -> static 
    static calculateBlockHash=(
        index: number, previousHash:string, timestamp:number, data:string
    ):string => CryptoJs.SHA256(index+previousHash+timestamp+data).toString();

    static validateStructure=(aBlock :Block):boolean => 
        typeof aBlock.index==="number" && 
        typeof aBlock.hash=== "string" && 
        typeof aBlock.previousHash === "string" && 
        typeof aBlock.data==="string" && 
        typeof aBlock.timestamp === "number";
    

    constructor(index:number,hash: string,previousHash:string,data:string,timestamp:number){
        this.index=index;
        this.hash=hash;
        this.previousHash=previousHash;
        this.data=data;
        this.timestamp=timestamp;
    }
}

const genesisBlock: Block=new Block(0,"1010010101010","","First Block",123456);

let blockchain: Block[]=[genesisBlock];

//(): 뒤에 붙는 거는 return type, => 는 무엇을 return할 것인지
const getBlockchain= (): Block[]=> blockchain;

const getLatestBlock=(): Block => blockchain[getBlockchain.length-1];

const getNewTimestamp=():number => Math.round(new Date().getTime() /1000);

const createNewBlock=(data:string): Block => {
    const previousBlock: Block = getLatestBlock();
    const newIndex:number = previousBlock.index +1 ;
    const newTimestamp: number=getNewTimestamp();
    const newHash: string=Block.calculateBlockHash(
        newIndex,previousBlock.hash,newTimestamp,data
    );

    const newBlock: Block=new Block(newIndex,newHash,previousBlock.hash,data,newTimestamp);

    return newBlock;
}

const getHashforBlock=(aBlock : Block):string => 
    Block.calculateBlockHash(aBlock.index,aBlock.previousHash,aBlock.timestamp,aBlock.data);

//candidate block, previous block 불러와서 비교
//블록체인의 기반은 자신의 전 블록으로의 링크가 있다는 것
//블록의 구조가 유효한지 판단
const isBlockValid=(candidateBlock:Block, previousBlock:Block):boolean => {
    if(!Block.validateStructure(candidateBlock)){
        return false;
    }
    else if(previousBlock.index+1 !== candidateBlock.index){
        return false;
    }
    else if(previousBlock.hash !== candidateBlock.previousHash){
        return false;
    }
    else if(getHashforBlock(candidateBlock) !== candidateBlock.hash){
        return false;
    }
    else{
        return true;
    }
} 

const addBlock=(candidateBlock : Block):void => {
    if(isBlockValid(candidateBlock, getLatestBlock())){
        blockchain.push(candidateBlock);
    }
}

export {};