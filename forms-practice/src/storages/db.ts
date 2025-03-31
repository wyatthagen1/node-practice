import { userSchema,user } from "../schemas/userSchema"

const users: user[] = [
    {name: "Bobby", birthdate: '2025-03-11', bio:'yo im bobbo', age: 40, email: 'swaggio@gmail.com'},
    {name: "Sally", birthdate: '2025-03-11', bio:'yo im sallo', age: 40, email: 'swaggio@gmail.com'},
    {name: "Dicky", birthdate: '2025-03-11', bio:'yo im dicko', age: 40, email: 'swaggio@gmail.com'}
]

export async function getUser<K extends keyof user>(value:user[K],prop:K){
    return users.find((user)=>user[prop] === value)
}

function calculateBirthday(birthdate:user["birthdate"]){
    const MM = birthdate.slice(5,7); // MM
    const DD = birthdate.slice(8,birthdate.length) // DD 
    const YYYY = birthdate.slice(0,4) // YYYY
    const bday = Number(new Date(Number(YYYY), Number(MM) - 1, Number(DD)))
    console.log(bday)
    const age = Math.floor((Number(new Date()) - bday) / 31557600000) // convert to years
    console.log(`Birthday: ${birthdate}, Age:${age}`)
    return age
}

export async function postUser(user:user){
    const age = calculateBirthday(user.birthdate)
    user.age = age;
    users.push(user)
}

export async function updateUser(name:user["name"],updatedUser:user){
    const age = calculateBirthday(updatedUser.birthdate)
    updatedUser.age = age; 
    let userIndex = users.findIndex((user)=>user.name === name);
    users.splice(userIndex,1,updatedUser)
}

export async function getAllUsers(): Promise<user[]>{
    return users
}

export async function deleteUser(name:user["name"]){
    let userIndex = users.findIndex((user)=>user.name === name);
    users.splice(userIndex,1)
}