interface User {
  email: string;
  password: string;
}


const users:User[] = [
    {
        email:"usern88@mail.ru",
        password:"12345678"
    },
    {
        email:"umar@gmail.com",
        password:"12345678"
    },
    {
        email:  "ali@gmail.com",
        password:"12345678"
    },
];

export const getUserByEmail = (email: string): User | undefined =>{
    return users.find((user) => user.email === email);
}