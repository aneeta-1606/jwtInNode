import {Request, Response, json} from 'express'
import jwt from 'jsonwebtoken'
import User, {UserInterface} from '../models/userModel'


export const signup = async (req:Request, res:Response)=>{

    const user: UserInterface = new User({
        username: req.body.username,
        email:req.body.email,
        password: req.body.password
    });

    user.password = await user.encryptPassword(user.password)
    const savedUesr = await user.save();

    const token: string = jwt.sign({id: savedUesr._id}, 'secretkey')
    res.header('auth-token', token).json(savedUesr)
}

export const login = async (req:Request, res:Response)=>{
    const user = await User.findOne({email: req.body.email})
    if(!user) return res.status(400).json('email or password is incorrect')

    const isPasswordIncorrect: boolean = await user.validatePassword(req.body.password)
    if(!isPasswordIncorrect) return res.status(400).json('Password invalid')

    const token: string = jwt.sign({id: user._id}, 'secretkey', {expiresIn: 60 *60 * 24})

    res.json({token})
}

export const getProfile = async (req:Request, res:Response) => {
   const user = await User.findById(req.userId, {password: 0})
   if(!user) return res.status(404).json('No user found');
   res.json(user);
   
}