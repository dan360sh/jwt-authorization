import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { HttpService } from "@nestjs/axios";
@Injectable()
export class JwtRsaService {
    constructor(private readonly httpService: HttpService) {
    }
    private privateKey: string | null = null;
    public publicKey: string = "";


    setRsaKeys(publicKey: string, privateKey: string) {
        this.privateKey = privateKey;
        this.publicKey = publicKey;
    }

    sign(payload: any): string {
        const expiresIn: number = this.parseTime("50m");
        const maxAge: number = this.parseTime("20d");
        const header = {
            alg: 'RS256',
            typ: 'JWT',
        };

        const currentTime = Math.floor(Date.now() / 1000);
        payload.iat = currentTime; // Добавим время создания токена (issued at)

        if (expiresIn) {
            payload.exp = currentTime + expiresIn; // Добавим время истечения токена (expiration time)
        }

        const encodedHeader = this.base64urlEncode(JSON.stringify(header));
        const encodedPayload = this.base64urlEncode(JSON.stringify(payload));
        const dataToSign = `${encodedHeader}.${encodedPayload}`;

        const signature = crypto.createSign('RSA-SHA256').update(dataToSign).sign(this.privateKey, 'base64');
        const encodedSignature = this.base64urlEncode(signature);

        return `${dataToSign}.${encodedSignature}`;
    }

    verify(token: string): boolean {
        const [header, payload, signature] = token.split('.');

        const verify = crypto.createVerify('RSA-SHA256');
        verify.update(`${header}.${payload}`);

        if (verify.verify(this.publicKey, this.base64urlDecode(signature), 'base64')) {
            const decodedPayload = JSON.parse(this.base64urlDecode(payload));
            const currentTime = Math.floor(Date.now() / 1000);

            if (decodedPayload.exp && decodedPayload.exp <= currentTime) {
                // Токен истек
                return false;
            }

            return true;
        }
        return false;
    }

    public loadPublicToken(): void{
        if(this.privateKey === null && false){
            this.httpService.get("http://localhost:3000/auth/get-public-token").subscribe((data) => {
                this.publicKey = data.data;
            })
        }
    }

    private base64urlEncode(str: string): string {
        return Buffer.from(str).toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
    }

    private base64urlDecode(str: string): string {
        str = (str + '==='.slice((str.length + 3) % 4)).replace(/-/g, '+').replace(/_/g, '/');
        return Buffer.from(str, 'base64').toString();
    }

    private parseTime(time: string): number {
        const regex = /(\d+)([smhdw])/;
        const match = time.match(regex);

        if (!match) {
            throw new Error(`Invalid time format: ${time}`);
        }

        const value = parseInt(match[1], 10);
        const unit = match[2];

        switch (unit) {
            case 's':
                return value;
            case 'm':
                return value * 60;
            case 'h':
                return value * 60 * 60;
            case 'd':
                return value * 60 * 60 * 24;
            case 'w':
                return value * 60 * 60 * 24 * 7;
            default:
                throw new Error(`Invalid time unit: ${unit}`);
        }
    }
}
