function checkCashRegister(price, cash, cid) {
  let totalCashInDrawer = 0;
  let currUnit = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100];
  let currNum = [];

  let requiredCID = [];
  let changeDue = cash - price;

  for (let i = 0; i < cid.length; i++) {
    totalCashInDrawer += cid[i][1] ;
    currNum.push(cid[i][1] / currUnit[i]);
  }
  

  if (changeDue > totalCashInDrawer) {
    console.log({status: "INSUFFICIENT_FUNDS", change: []});
    return {status: "INSUFFICIENT_FUNDS", change: []};
  } else if (changeDue == totalCashInDrawer) {
    console.log({status: "CLOSED", change: [...cid]});
    return {status: "CLOSED", change: [...cid]};
  } else {
    for (let j = currUnit.length - 1; j >= 0; j--) {
      for (let k = 1; k <= currNum[j]; k++) {
        changeDue = Number((changeDue - currUnit[j]).toFixed(2));
        console.log(changeDue);
        if (changeDue < 0 && k == 1) {
          changeDue = changeDue + currUnit[j];
          break;
        } else if (changeDue < 0 && k > 1) {
          requiredCID.push([cid[j][0],(k-1)*currUnit[j]]);
          changeDue = changeDue + currUnit[j];
          break;
        } else if (changeDue > 0 && k == currNum[j]) {
          requiredCID.push([cid[j][0],(k)*currUnit[j]]);
          break;
        } else if (changeDue == 0 && k > 1) {
          requiredCID.push([cid[j][0], k*currUnit[j]]);
          break;
        }
      }
    }
    console.log(requiredCID);
    if (changeDue == 0) {
      console.log({status: "OPEN", change: requiredCID});
      return {status: "OPEN", change: requiredCID};
    } else if (changeDue != 0) {
      console.log({status: "INSUFFICIENT_FUNDS", change: []});
      return {status: "INSUFFICIENT_FUNDS", change: []};
    }   
    }
}

checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])