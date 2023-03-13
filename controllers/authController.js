import { hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";


export const registerController = async (req , res) => {
    try {
        const {name,email,password,phone,address} = req.body
        //validations
        if(!name){
            return res.send({error:'Name is reqired'})
        }
        if(!email){
            return res.send({error:'Email is reqired'})
        }
        if(!password){
            return res.send({error:'Password is reqired'})
        }
        if(!phone){
            return res.send({error:'Phone no is reqired'})
        }
        if(!address){
            return res.send({error:'Address is reqired'})
        }
        
        //check user
        const exisitingUser = await userModel.findOne({email})
        //exisiting user
        if(exisitingUser){
            return res.status(200).send({
                success:true,
                message:'Already Register please login',
            })
        }
        //register user
        const hassedPassword = await hashPassword(password)
        //save
        const user = new userModel({name, email, phone, address, password:hassedPassword}).save()

        res.status(201).send({
            success:true,
            message:'User Register Successfully',
            user,
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Registeration',
            error
        })
    }
};



