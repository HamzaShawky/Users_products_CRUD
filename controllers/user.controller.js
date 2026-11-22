// Imports
const bcryptjs = require('bcryptjs');
const Joi = require('joi');


// Users
const users = [
    {
        id: 1,
        name: "Hamza Shawky",
        email: "hamza.Shawky@gmail.com",
        age: 20,
        password: bcryptjs.hashSync("Hamza",10)
    },
    {
        id: 2,
        name: "Ahmed Ali",
        email: "ahmed@example.com",
        age: 25,
        password: bcryptjs.hashSync("Ahmed",10)
    },

]


// Schema
const createAndUpdateSchema = Joi.object({
        name: Joi.string().min(3).trim().required(),
        email: Joi.string().email().trim().lowercase().required(),
        age: Joi.number().positive().required(),
        password: Joi.string().min(5).required()
})


async function find(request,response){
    
    try{

        let without = users.map(user => {
            let {password,...without} = user;
            return without ; 
        })
        return response.status(200).jsend.success(without)

    }catch(error){
        response.status(500).jsend.error("Iternal server error")
    }

}

async function findById(request,response){

    try{

        const id = request.params.id;
        let user = users.find(user => user.id === +id);
        if(!user){
            return response.status(404).jsend.error("User not found")
        }

        return response.status(200).jsend.success(user)

    }catch(error){
        response.status(500).jsend.error("Iternal server error")
    }
}

async function create(request,response){
    try{

        const {error,value} = createAndUpdateSchema.validate(request.body);
        if(error){
            return response.status(400).jsend.error("bad request")
        }


        let findUser = users.find(user => user.email === value.email);
        if(findUser){
            return response.status(409).jsend.error("conflict")
        }


        const id = users.length +1 ;

        const hashedPassword = await bcryptjs.hash(value.password,10);

        const newUser = {id:id , ...value, password: hashedPassword}
        users.push(newUser);


        let {password, ...userwithoutPassword} = newUser;
        return response.status(201).jsend.success(userwithoutPassword)

    }catch(error){
        response.status(500).jsend.error("Iternal server error")
    }
}

async function findByIdandUpdate(request,response){
    try{
        const {error,value} = createAndUpdateSchema.validate(request.body);
        if(error){
            return response.status(400).jsend.error("bad request")
        }

        const id = request.params.id;
        let user = users.findIndex(user => user.id === +id);
        if(user == -1){
            return response.status(404).jsend.error("User not found")
        }

        const hashedPassword = await bcryptjs.hash(value.password,10);

        const newUser = {id: +id, ...value, password: hashedPassword};
        users.splice(user,1,newUser)


        let {password,...userwithoutPassword} = users[id];
        return response.status(200).jsend.success(userwithoutPassword)


    }catch(error){
        response.status(500).jsend.error("Iternal server error")
    }
}

async function findByIdandDelete(request,response){
    try{

        const id = request.params.id;
        let user = users.findIndex(user => user.id === +id);
        if(user < 0){
            return response.status(404).jsend.error("User not found")
        }
        users.splice(user,1)
        return response.status(200).jsend.success("User Deleted")


    }catch(error){
        response.status(500).jsend.error("Iternal server error")
    }
}


// Exports
module.exports = {
    find,findById,findByIdandDelete,findByIdandUpdate,create
}