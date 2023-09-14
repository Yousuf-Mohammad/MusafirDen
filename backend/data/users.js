import bcrypt from 'bcryptjs';

const users =[
    {
        name:'Admin User',
        email:'admin@musafir.com',
        password: bcrypt.hashSync('asdfgh',10),
        isAdmin:true
    },
    {
        name:'Yousuf Mohammad ',
        email:'yousuf@musafir.com',
        password: bcrypt.hashSync('123456',10),
        isAdmin:false
    },
    {
        name:'Keu Ekjon',
        email:'ekjon@musafir.com',
        password: bcrypt.hashSync('123456',10),
        isAdmin:false
    },
]
export default users;