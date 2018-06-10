import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

//promise -> 비동기로 클라이언트와 서버사이를 처리 서버에서 리턴이 오지않아도 클라는 자기 할일을 계속함
import 'rxjs/add/operator/toPromise';
 
import { Customer } from './customer';

@Injectable({
  providedIn: 'root'
})  
export class DataService {

  private baseUrl = 'api/customers';  // URL to web API //backend쪽의 url과 매칭이 이루어져야함
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {}
 
  // Get all customers
  getCustomers(): Promise<Customer[]> {

    return this.http.get(this.baseUrl)
      .toPromise()
      .then(response => response.json() as Customer[])//받아온것을 json으로 파싱후 customer에 저장
      .catch(this.handleError);
  }
 
  getCustomersByLastName(lastName: string): Promise<Customer[]> {
    // `를 이용해서 +없이 삽입 가능
    const url= `${this.baseUrl}/${lastName}`;
    
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Customer[])
      .catch(this.handleError);
  }
  
  create(customer: Customer): Promise<Customer> {
   
    return this.http
      .post(this.baseUrl, JSON.stringify(customer), {headers : this.headers})//받은 customer객체를 json으로 바꾸는것 -> serialization -> stringify함수
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }
 
  delete(id: number): Promise<void> {
   const url= `${this.baseUrl}/${id}`;

    return this.http.delete(url)
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }
 
  private handleError(error: any): Promise<any> {
    console.error('Error:', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}