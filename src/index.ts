//블록체인 할 때 한 블록을 인터페이스로 정의
//블록 세부 설명같은거 정의 
//interface 는 js 에서 안돌아감 -> 대신 class 쓴다

class Human{
    public name: string;
    public age: number;
    public gender: string

    constructor(name:string, age:number, gender:string){
        this.name=name;
        this.age=age;
        this.gender=gender;
    }
}

const sun=new Human("sun",20,"female");


//sayHi 의 parameter 에 타입을 명시해줌으로써 더 명확하게 코드작성 가능 
//return type 도 명시 가능 
const sayHi = (person: Human): string=> {
    return `Hello ${person.name}, you are ${person.age} and ${person.gender}!`;
}

console.log(sayHi(sun));

export {};