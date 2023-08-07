const btn = document.getElementById("btn");
const width = window.screen.width;
const height = window.screen.height;

btn.addEventListener("click", screenSize);

function screenSize() {
    alert(`Ширина вашего экрана: ${width}px, высота вашего экрана: ${height}px.`)
}