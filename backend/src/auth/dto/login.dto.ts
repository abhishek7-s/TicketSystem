import {IsString } from "class-validator"

export class loginUser{
    @IsString() 
    email : string;
    
    @IsString() 
    password : string;
}   