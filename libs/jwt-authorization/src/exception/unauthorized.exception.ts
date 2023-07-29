import { UnauthorizedException } from '@nestjs/common';

export class UnauthorizedAccess extends UnauthorizedException {
    constructor() {
        super('Unauthorized access', 'Unauthorized');
    }
}
