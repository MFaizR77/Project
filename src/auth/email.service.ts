import {Injectable} from '@nestjs/common';
import { Resend } from 'resend';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
    private resend: Resend;

    constructor(private configService: ConfigService) {
        this.resend = new Resend(this.configService.get('RESEND_API_KEY'));
    }

    async sendVerificationEmail(email : string, token: string){
        const appUrl = this.configService.get<string>('APP_URL');
        const verificationLink = `${appUrl}/verify-email?token=${token}`;

        await this.resend.emails.send({
            from: 'noreply@yourapp.com',
            to: email,
            subject: 'Verify your email address',
            html: `<p>Please click the link below to verify your email address:</p><p><a href="${verificationLink}">Verify Email</a></p>`
        });
    }

    async sendPasswordResetEmail(email: string, token: string) {
        const appUrl = this.configService.get<string>('APP_URL');
        const resetLink = `${appUrl}/reset-password?token=${token}`;

        await this.resend.emails.send({
            from: 'noreply@yourapp.com',
            to: email,
            subject: 'Reset your password',
            html: `<p>Please click the link below to reset your password:</p><p><a href="${resetLink}">Reset Password</a></p>`
        });
    }
}