let displayBalance= document.getElementById("display-balance");
let transferMoneyBtn= document.getElementById("transfer-money-btn");
let fatalBalanceError= document.getElementById("fatal-balance-error");
let custBalance= document.getElementById("cust-balance").value;

if(Number(custBalance)<= 100){
    displayBalance.style.color="#e33545";
    fatalBalanceError.style.color="#e33545";
    transferMoneyBtn.classList.remove("btn-primary");
    transferMoneyBtn.classList.add("btn-danger");
}

transferMoneyBtn.onclick= function(){
    if(Number(custBalance)<= 100){
        $('#errorModal').modal('show');
        return false;
    }
}

