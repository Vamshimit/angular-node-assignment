import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../transaction.service';
import { Transaction } from '../transaction.interface';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss'],
})
export class TransactionListComponent implements OnInit {
  transactions: Transaction[] = [];
  selectedTransaction: Transaction | null = null;

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(): void {
    this.transactionService.getTransactions().subscribe(
      (data) => {
        console.log(data);
      this.transactions = data;
      },
      (error) => console.error('Error fetching transactions:', error)
    );
  }

  onViewTransaction(transaction: Transaction): void {
    this.selectedTransaction = transaction;
  }

  onGoBack(){
    this.selectedTransaction = null;
  }

  onTransactionUpdated(transaction: Transaction): void {
    this.transactionService.updateTransaction(transaction).subscribe(
      (updatedTransaction) => {
        const index = this.transactions.findIndex(
          (t) => t.id === updatedTransaction.id
        );
        if (index !== -1) {
          this.transactions[index] = updatedTransaction;
        }
        this.selectedTransaction = null;
      },
      (error) => console.error('Error updating transaction:', error)
    );
  }

  filterByDate(startDate: string, endDate: string): void {
    this.transactionService
      .filterTransactionsByDate(startDate, endDate)
      .subscribe(
        (transactions) => (this.transactions = transactions),
        (error) => console.error('Error filtering transactions by date:', error)
      );
  }

  filterByStatus(status: string): void {
    this.transactionService.filterTransactionsByStatus(status).subscribe(
      (transactions) => (this.transactions = transactions),
      (error) => console.error('Error filtering transactions by status:', error)
    );
  }
}
