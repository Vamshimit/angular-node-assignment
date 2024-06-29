import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Transaction } from '../transaction.interface';


@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.scss']
})
export class TransactionDetailsComponent implements OnInit, OnChanges {
  @Input() transaction!: Transaction;
  @Output() transactionUpdated = new EventEmitter<Transaction>();
  @Output() goBack = new EventEmitter<Transaction>();

  transactionForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['transaction'] && this.transactionForm) {
      this.transactionForm.patchValue(this.transaction);
    }
  }

  createForm(): void {
    this.transactionForm = this.fb.group({
      id: [{ value: '', disabled: true }],
      date: [{ value: '', disabled: true }],
      comments: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]*$/)]],
      status: ['', Validators.required]
    });

    if (this.transaction) {
      this.transactionForm.patchValue(this.transaction);
    }
  }

  back(){
    this.goBack.emit();
  }

  onSubmit(): void {
    if (this.transactionForm.valid) {
      const updatedTransaction: Transaction = {
        ...this.transaction,
        ...this.transactionForm.value
      };
      this.transactionUpdated.emit(updatedTransaction);
    }
  }
}