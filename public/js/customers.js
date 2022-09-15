if ( window.history.replaceState ) {
    window.history.replaceState( null, null, window.location.href );
}

let hiddenAlert= document.getElementById("hidden-alert");
let hiddenFromName= document.getElementById("hidden-fromName");
let hiddenToName= document.getElementById("hidden-toName");
let alert= document.getElementById("alert");
let dataRows= document.getElementsByClassName("data-row");
let nameData= document.getElementById("name-data");

// console.log("Value to force alert !", hiddenAlert.value);

if(hiddenAlert.value){
    alert.innerHTML=`<strong>Transaction Successful!</strong> Amount of ₹${hiddenAlert.value} transferred from ${hiddenFromName.value} to ${hiddenToName.value}.
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`
    alert.style.display="block";
    setTimeout(function() {
        $(".alert").alert('close');
    }, 10000);
}
else{
    hiddenAlert.style.display="none";
}

for(let i= 0; i<10; i++){
    if(document.querySelectorAll(".check-bal")[i].innerHTML<= 100){
        document.querySelectorAll(".check-bal")[i].style.color= "#e33545";
    }
}

// for(let i= 0; i<10; i++){
//     if(nameData.innerHTML=== `${hiddenFromName.value}`){
//         document.querySelectorAll(".data-row")[i].style.color= "green";
//     }
// }

// for(let i= 0; i<10; i++){
//     dataRow.setAttribute("class", `${nameData.innerHTML}`);
// }

// dataRow.classList.add= `${hiddenFromName}`;