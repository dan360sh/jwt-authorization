import { Injectable } from '@nestjs/common';

import { HttpService } from "@nestjs/axios";

@Injectable()
export class JwtAuthorizationService {
  constructor(private readonly httpService: HttpService) {
    console.log("XXXXX1");

    this.httpService.get("https://www.google.ru/").subscribe((data) => {
      console.log(data);
    })
  }
}
