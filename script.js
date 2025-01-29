let is_opacity_on = 0;

function draw_grid(size) {
    let container = document.querySelector(".container");
    for (let i = 0; i < size; i++) {
        let gridRow = document.createElement("div");
        gridRow.setAttribute("class", "grid-row");
        container.appendChild(gridRow);
        for (let j = 0; j < size; j++) {
            let gridElement = document.createElement("div");
            gridElement.setAttribute("class", "grid-element");
            gridRow.appendChild(gridElement);
        }
    }    
}

function clear_screen() {
    let new_size = 0;
    let gridRow = document.querySelectorAll(".grid-row");
    for (let i = 0; i < gridRow.length; i++) {
        gridRow[i].remove();
    }
    do {
        new_size = parseInt(prompt("What size do you want your grid to be? (1-100)"));
    } while(new_size <= 0 || new_size > 100 || !new_size);
    draw_grid(new_size);
    draw();
}

function draw() {
    is_opacity_on = 0;
    let gridElements = document.querySelectorAll(".grid-element");
    for (let i = 0; i < gridElements.length; i++) {
        gridElements[i].addEventListener("mouseover", (event) => {
            event.target.style.backgroundColor = "black";
        });
    }
}

function erase() {
    is_opacity_on = 0;
    let gridElements = document.querySelectorAll(".grid-element");
    for (let i = 0; i < gridElements.length; i++) {
        gridElements[i].addEventListener("mouseover", (event) => {
            event.target.style.backgroundColor = "white";
        });
    }
}

function rgb() {
    r = Math.floor(Math.random()*256);
    g = Math.floor(Math.random()*256);
    b = Math.floor(Math.random()*256);
    return "rgb(" + r + "," + g + "," + b + ")";
}

function rainbow() {
    is_opacity_on = 0;
    let gridElements = document.querySelectorAll(".grid-element");
    for (let i = 0; i < gridElements.length; i++) {
        gridElements[i].addEventListener("mouseover", (event) => {
            event.target.style.backgroundColor = rgb();
        });
    }
}

function opacity() {
    let gridElements = document.querySelectorAll(".grid-element");
    if (is_opacity_on == 0) {
        gridElements.forEach((element) => {
       
            element.setAttribute("data-opacity", "0");
            element.addEventListener("mouseover", (event) => {
                let el = event.target;
                let currentOpacity = parseFloat(el.getAttribute("data-opacity"));
    
                let newOpacity = Math.min(currentOpacity + 0.1, 1);
    
                el.style.backgroundColor = `rgba(0, 0, 0, ${newOpacity})`;
                el.setAttribute("data-opacity", newOpacity.toString());
            });
        });    
        is_opacity_on = 1;
    }
}

draw_grid(16);
draw();

let newGridButton = document.querySelector(".new-grid");
newGridButton.addEventListener("click", clear_screen);

let eraser = document.querySelector(".eraser");
eraser.addEventListener("click", erase);

let blackPen = document.querySelector(".black");
blackPen.addEventListener("click", draw);

let rainbowPen = document.querySelector(".rainbow");
rainbowPen.addEventListener("click", rainbow);

let opacityPen = document.querySelector(".opacity");
opacityPen.addEventListener("click", opacity);