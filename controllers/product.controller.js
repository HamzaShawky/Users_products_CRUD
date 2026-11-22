// Imports
const bcryptjs = require('bcryptjs');
const Joi = require('joi');


// Users
const products = [
    {
        id: 1,
        name: "Wireless Mouse",
        price: 450,
        description: "A wireless computer mouse"
    },
    {
        id: 2,
        name: "OLED Monitor",
        price: 1000,
        description: "A very amazing monitor"
    },

]


// Schema
const createAndUpdateSchema = Joi.object({
        name: Joi.string().trim().required(),
        price: Joi.number().positive().required(),
        description: Joi.string().trim().min(10).required()
})


async function find(request,response){
    
    try{

        response.status(200).jsend.success(products);

    }catch(error){
        response.status(500).jsend.error("Iternal server error")
    }

}

async function findById(request,response){

    try{

        const id = request.params.id;
        let findProduct = products.find(product=> product.id === +id);
        if(!findProduct){
            return response.status(404).jsend.error("Product not found")
        }

        response.status(200).jsend.success(findProduct);


    }catch(error){
        response.status(500).jsend.error("Iternal server error")
    }
}

async function create(request,response){
    try{

        const {error , value} = createAndUpdateSchema.validate(request.body);
        if(error){
            return response.status(400).jsend.error("bad request");
        }

        const id  = products.length +1 ;
        const newProduct = {id:id, ...value};

        products.push(newProduct);

        response.status(201).jsend.success(newProduct);

    }catch(error){
        response.status(500).jsend.error("Iternal server error")
    }
}

async function findByIdandUpdate(request,response){
    try{

        const {error , value} = createAndUpdateSchema.validate(request.body);
        if(error){
            return response.status(400).jsend.error("bad request");
        }

        const id = request.params.id;
        let findProduct = products.findIndex(product=> product.id === +id);
        if(findProduct == -1){
            return response.status(404).jsend.error("Product not found")
        }

        const newProduct = {id: +id, ...value};
        products.splice(findProduct,1,newProduct);

        response.status(200).jsend.success(products);

    }catch(error){
        response.status(500).jsend.error("Iternal server error")
    }
}

async function findByIdandDelete(request,response){
    try{

        const id = request.params.id;
        let findProduct = products.findIndex(product=> product.id === +id);
        if(findProduct == -1){
            return response.status(404).jsend.error("Product not found")
        }

        products.splice(findProduct,1);

        response.status(200).jsend.success(products);

    }catch(error){
        response.status(500).jsend.error("Iternal server error")
    }
}


// Exports
module.exports = {
    find,findById,findByIdandDelete,findByIdandUpdate,create
}