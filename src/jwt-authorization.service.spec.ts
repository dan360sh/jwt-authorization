import { Test, TestingModule } from '@nestjs/testing';
import { JwtAuthorizationService } from './jwt-authorization.service';

describe('JwtAuthorizationService', () => {
  let service: JwtAuthorizationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtAuthorizationService],
    }).compile();

    service = module.get<JwtAuthorizationService>(JwtAuthorizationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
