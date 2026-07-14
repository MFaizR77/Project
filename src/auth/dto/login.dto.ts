import {IsEmail, IsNotEmpty, IsString, Length, Matches, MinLength} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
    @ApiProperty({
        description: 'Email address of the user',
        example: 'john.doe@example.com'
    })
    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @ApiProperty({
        description: 'Password of the user',
        example: 'password123',
    })
    @IsNotEmpty()
    @IsString()
    password!: string;
}
