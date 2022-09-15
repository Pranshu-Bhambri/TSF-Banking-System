for(let i= 0; i<9; i++){
    if(document.querySelectorAll(".check-bal")[i].innerHTML<= 100){
        document.querySelectorAll(".check-bal")[i].style.color= "#e33545";
    }
}