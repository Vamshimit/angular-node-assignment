import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Transaction } from './transaction.interface';
import { Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = 'http://localhost:3000'; // Adjust this to your Express server URL

  constructor(private http: HttpClient) { }

  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl}/api/transactions`);
  }

  filterTransactionsByDate(startDate: string, endDate: string): Observable<Transaction[]> {
    let params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);
    return this.http.get<Transaction[]>(`${this.apiUrl}/api/transactions/date`, { params });
  }

  filterTransactionsByStatus(status: string): Observable<Transaction[]> {
    let params = new HttpParams().set('status', status);
    return this.http.get<Transaction[]>(`${this.apiUrl}/api/transactions/status`, { params });
  }

  updateTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.put<Transaction>(`${this.apiUrl}/api/transactions/${transaction.id}`, transaction);
  }
}