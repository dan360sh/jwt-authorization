import {  Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

@Injectable()
export class HttpService {
  constructor(private readonly httpService: HttpService) {
      console.log("XXXXX2")
  }

  // Метод для выполнения GET запроса к другому сервису
  get(url: string): Observable<AxiosResponse<any>> {
    console.log(url);
    return this.httpService.get(url);
  }
}
