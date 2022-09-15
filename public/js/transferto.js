let checkbox= document.getElementById("checkbox");
let transferModal= document.getElementById("transferModal");
let transferForm= document.getElementById("transfer-form");
let transferBtn= document.getElementById("transfer-now-btn");
let hiddenName= document.getElementById("hidden-name").value;
let hiddenBalance= document.getElementById("hidden-balance").value;
let hiddenAmountInput= document.getElementById("hidden-amount");
let inputAmount= document.getElementById("transfer-amount");
let zeroError= document.getElementById("zero-error");
let balanceError= document.getElementById("balance-error");
let minBalanceError= document.getElementById("min-balance-error");
let fatalBalanceError= document.getElementById("fatal-balance-error");
let submitAmountBtn= document.getElementById("submit-amount-btn");
let confirmModalTitle= document.getElementById("confirm-modal-title");
let confirmP= document.getElementById("confirm-p");
let confirmBtn= document.getElementById("confirm-btn");
let cancelBtn= document.getElementById("cancel-btn");
let reqCustID= document.getElementById("reqCustID").value;
let reqTransferID= document.getElementById("reqTransferID").value;
let alert= document.getElementById("alert");

let inputValue;

checkbox.onclick= function(){
    transferBtn.toggleAttribute("disabled");
};

transferBtn.onclick= function(){
    transferForm.reset();
    zeroError.style.display="none";
    balanceError.style.display="none";
    minBalanceError.style.display="none";
    fatalBalanceError.style.display="none";
    hiddenAmountInput.setAttribute("value", "");
    // console.log("inside on click");
    // console.log(Number(hiddenBalance));
    // console.log(Number(hiddenBalance)> 100);
    if(Number(hiddenBalance)> 100){
        // console.log("inside if(no balance error)")
        $('#transfer-form').on('submit', function(e){
            // console.log("Inside submit event!");
            inputValue= inputAmount.value;
            let minBalance= hiddenBalance-inputValue;
            if(Number(inputValue)<= 0){
                // console.log("Inside if !");
                e.preventDefault();
                zeroError.style.display="block";
                balanceError.style.display="none";
                minBalanceError.style.display="none";
            }
            else if(Number(inputValue)> Number(hiddenBalance)){
                // console.log("Inside else if!");
                e.preventDefault();
                balanceError.style.display="block";
                zeroError.style.display="none";
                minBalanceError.style.display="none";
            }
            else if(Number(minBalance)< 100){
                // console.log("Inside else if!");
                e.preventDefault();
                minBalanceError.style.display="block";
                zeroError.style.display="none";
                balanceError.style.display="none";
            }
            else{
                // console.log("Inside else !");
                $('#transferModal').modal('toggle');
                $('#confirmModal').modal('show');
                e.preventDefault();
                zeroError.style.display="none";
                balanceError.style.display="none";
                minBalanceError.style.display="none";
                hiddenAmountInput.setAttribute("value", `${Number(inputValue)}`);
                confirmP.innerHTML=`Do you want to transfer ₹${Number(inputValue)} to ${hiddenName} ?`;
            }
        });
    }
    else{
        // console.log("inside else(balance error)");
        inputAmount.setAttribute("disabled", "");
        inputAmount.style.cursor="not-allowed";
        submitAmountBtn.classList.remove("btn-success");
        fatalBalanceError.style.display="block";
        submitAmountBtn.setAttribute("disabled", "");
        submitAmountBtn.classList.add("btn-danger");
    }
};

$('#confirm-form').on('submit', function(e){
    confirmBtn.setAttribute("disabled", "");
});

confirmBtn.addEventListener("click", (e) => {
    confirmModalTitle.innerHTML= "Processing..."
    confirmP.innerHTML= "Wait while your transaction is being processed...";
    // confirmBtn.setAttribute("disabled", "");
    if(reqCustID && reqTransferID){
        // confirmBtn.setAttribute("disabled", "");
        setTimeout(function(){
            checkbox.checked= false;
            transferBtn.toggleAttribute("disabled");
            $('#confirmModal').modal('toggle');
        }, 2000)
        // checkbox.checked= false;
        // transferBtn.toggleAttribute("disabled");
        // $('#confirmModal').modal('toggle');
    }
    else{
        e.preventDefault();
        confirmBtn.setAttribute("disabled", "");
        setTimeout(function(){
            // e.preventDefault();
            confirmModalTitle.innerHTML= "Error!"
            confirmP.innerHTML= "Transaction failed due to an error !";
            confirmP.style.color="#e33545";
            confirmBtn.classList.remove("btn-success");
            confirmBtn.setAttribute("disabled", "");
            confirmBtn.classList.add("btn-danger");
            alert.style.display= "block";
        }, 5000);
    }    
});

cancelBtn.addEventListener("click", () => {
    $('#confirmModal').modal('toggle');
});
  