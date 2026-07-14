import {IsEmail, IsNotEmpty, IsString, Length, Matches, MinLength} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto {
    @ApiProperty({
        description: 'Name of the user',
        example: 'John Doe'
    })
    @IsString()
    @IsNotEmpty()
    @Length(4, 50)
    name!: string;

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
        minLength: 8
    })
    @IsNotEmpty()
    @MinLength(8)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
        message: 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
    })
    password!: string;
}