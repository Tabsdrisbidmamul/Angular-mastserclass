import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

@Injectable({ providedIn: 'root' })
export class AgentService {
  constructor(protected _http: HttpClient) {}

  protected fetch<Type>(endpoint: string, useEndpoint = 'DB') {
    return this._http.get<Type[]>(endpoint, {
      observe: 'response',
      headers: {
        useEndpoint,
      },
    });
  }

  protected put<Type>(endpoint: string, putData: Type, useEndpoint = 'DB') {
    return this._http.put<Type>(endpoint, this.addId(putData), {
      headers: { useEndpoint },
    });
  }

  protected post<TypeA, TypeB>(
    endpoint: string,
    postData: TypeA,
    useEndpoint = 'DB'
  ) {
    return this._http.post<TypeB>(endpoint, postData, {
      headers: { useEndpoint },
    });
  }

  protected addId<Type>(data: Type) {
    if (data instanceof Array) {
      const idArray = [];
      data.forEach((type) => {
        idArray.push({ ...type, id: uuidv4() });
      });

      return idArray;
    }
  }
}
