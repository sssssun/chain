const name ="sun",
    age=27,
    gender="female";


//sayHi 의 parameter 에 타입을 명시해줌으로써 더 명확하게 코드작성 가능 
const sayHi = (name:string,age:number,gender:string): string=> {
    return `Hello ${name}, you are ${age} and ${gender}`;
}

sayHi(name,age,gender);

export {};