let navbarBtn= document.getElementById("navbar-btn");
let openedNav= document.getElementById("navbarSupportedContent");

// window.addEventListener("scroll", () => {
//     navbar.classList.toggle("sticky");
// })

for(let i=0; i<5; i++){
    document.querySelectorAll(".nav-link")[i].addEventListener('click', () => {
        // openedNav.style.height= 0;
        navbarBtn.classList.add("collapsed");
        navbarBtn.setAttribute("aria-expanded", "false");
        openedNav.classList.remove("show");
        // openedNav.classList.add("collapsing");
        // openedNav.classList.add("collapse");
        // openedNav.classList.remove("collapsing");
    });
}

// const navLinks = document.querySelectorAll('.nav-item')
// const menuToggle = document.getElementById('navbarSupportedContent')
// // const bsCollapse = new bootstrap.Collapse(menuToggle)
// navLinks.forEach((l) => {
//     l.addEventListener('click', () => { 
//         const bsCollapse = new bootstrap.Collapse(menuToggle);
//         bsCollapse.toggle() 
//     })
// })
// menuToggle.classList.remove("show");