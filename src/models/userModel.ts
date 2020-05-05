import {Schema, model, Document} from 'mongoose'
import bycrypt from 'bcryptjs'

export interface UserInterface extends Document{
    username:string;
    email:string;
    password:string;
    encryptPassword(password: string): Promise<string>;
    validatePassword(password: string): Promise<boolean>;
}

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        min: 4,
        lowercase: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password:{
        type: String,
        required: true
    }
})

userSchema.methods.encryptPassword = async(password: string) :Promise<string> => {
    const salt = await bycrypt.genSalt(10)
    return bycrypt.hash(password, salt)
}

userSchema.methods.validatePassword = async function (password: string) :Promise<boolean> {
    return await bycrypt.compare(password, this.password)
}
export default model<UserInterface>('User', userSchema) ;