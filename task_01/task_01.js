const btn = document.querySelector('.j-btn');

btn.addEventListener("click", toggleIcon);

function toggleIcon() {
    const icon01 = document.getElementById("icon01");
    const icon02 = document.getElementById("icon02");

    // Проверяем, видима ли иконка 01, и скрываем/показываем их соответственно
    if (icon01.style.display === "none") {
        icon01.style.display = "inline";
        icon02.style.display = "none";
    } else {
        icon01.style.display = "none";
        icon02.style.display = "inline";
    }
}