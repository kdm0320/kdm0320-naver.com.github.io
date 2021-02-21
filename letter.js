const letter = document.querySelector(".js-letter");

function showLetter(event){
    const image = new Image();
    image.src = `blank/1.jpg`
    image.classList.add("letterImage")
    letter.appendChild(image);
    image.addEventListener('click' ,function(){
        image.style.display = 'none';

})
}


function handleLetter(){
  const btn = document.createElement("button");
  btn.innerText = "Please click this button!"
  letter.append(btn);
  btn.addEventListener('click', showLetter);
  
}


function init(){
    handleLetter();
}

init();
