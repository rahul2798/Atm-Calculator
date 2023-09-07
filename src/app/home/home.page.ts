import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() {}

  formDatas: any = [];
  isCondition1: boolean = false;
  isCondition2: boolean = false;
  isCondition3: boolean = false;
  date=new Date();
  

  withdrawFunction() {
    let x = this.withdraw(this.withdrawAmount1);
    let msg = '';
    if (x) {

      msg =
        'Withdraw ' +
        this.withdrawAmount1 +
        '.' +
        'Denomination are ';
        this.isCondition3=true;
        this.isCondition1=false

    } else {
      msg = 'denomination are not available';
      this.isCondition2=true
    }

    this.formDatas.push({
      msg: msg,
      value: x,
    });
    this.withdrawAmount1 = 0;
  }
  addTotalValueOfDenomination() {
    this.balance[2000] += this.inputValue1;
    this.balance[500] += this.inputValue2;
    this.balance[200] += this.inputValue3;
    this.balance[100] += this.inputValue4;

    let x = (this.balance[2000]*2000)+(this.balance[500]*500)+(this.balance[200]*200)+(this.balance[100]*100);
    console.log(x);
    let msg = '';
    if (x) {
      msg =
        
        'Deposit'+' '+x +' '+
         '2000:'+this.balance[2000]+' '+'500:'+this.balance[500]+' '+'200:'+this.balance[200]+' '+'100:'+this.balance[100];
        
    } 

    this.formDatas.push({
      msg: msg,
      value: x,
    });
    this.isCondition1=true
  }
  inputValue1: any = 0;
  inputValue2: any = 0;
  inputValue3: any = 0;
  inputValue4: any = 0;
  withdrawAmount1: any;
  getTotalBalance() {
    let totalBalance: any = 0;
    for (const denomination in this.balance) {
      if (this.balance.hasOwnProperty(denomination)) {
        totalBalance += parseInt(denomination) * this.balance[denomination];
      }
    }
    return totalBalance;
  }
  private balance: any = {
    2000: 0,
    500: 0,
    200: 0,
    100: 0,
  };



  deposit(denomination: number, amount: number): void {
    if (denomination in this.balance) {
      this.balance[denomination] += amount;
    }
  }

  withdraw(amount: number): { [key: number]: number } | null {
    const withdrawal: any = {};
    const sortedDenominations: any = Object.keys(this.balance)
      .map(Number)
      .sort((a, b) => b - a);

    for (const denomination of sortedDenominations) {
      if (amount >= denomination) {
        const numNotes = Math.min(
          Math.floor(amount / denomination),
          this.balance[denomination]
        );
        withdrawal[denomination] = numNotes;
        amount -= numNotes * denomination;
      }
    }

    if (amount === 0) {
      for (const denomination in withdrawal) {
        if (withdrawal.hasOwnProperty(denomination)) {
          this.balance[denomination] -= withdrawal[denomination];
        }
      }
      return withdrawal;
    } else {
      return null;
    }
  }

  getBalance(): { [key: number]: number } {
    return { ...this.balance };
  }


}
