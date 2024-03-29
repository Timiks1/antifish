import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable()
export class ServerConnect {
  constructor(private http: HttpClient) {}

  search() {
    // Преобразуйте ваш объект данных в параметры запроса

    return this.http.get('http://91.211.91.155:8083/api/search');
  }
  insertData(table_name: string, channel_name: string) {
    let params = new HttpParams()
      .set('table_name', table_name) // Преобразует массив в строку, разделенную запятыми
      .set('channel_names', channel_name);

    return this.http.get('http://91.211.91.155:8083/api/insert', { params });
  }
  insertAllData(table_name: string, channel_names: string[]) {
    const channel_name_str = channel_names.join(',');

    let params = new HttpParams()
      .set('table_name', table_name) // Преобразует массив в строку, разделенную запятыми
      .set('channel_names', channel_name_str);

    return this.http.get('http://91.211.91.155:8083/api/insertAll', { params });
  }

  getAll() {
    return this.http.get('http://91.211.91.155:8083/api/getAll');
  }
  delete(table_name: string, channel_name: string) {
    let params = new HttpParams()
      .set('table_name', table_name) // Преобразует массив в строку, разделенную запятыми
      .set('channel_names', channel_name);

    return this.http.get('http://91.211.91.155:8083/api/delete', { params });
  }
}
