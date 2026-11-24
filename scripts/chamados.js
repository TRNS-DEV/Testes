document.getElementById("foto").addEventListener("change", function () {
    document.getElementById("fileName").textContent =
        this.files.length ? this.files[0].name : "Adicionar foto";
});

document.getElementById("ticketForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const toast = document.getElementById("toast");

    toast.classList.add("show");

    setTimeout(function () {
        window.location.href = "denuncia_enviada.html";
    }, 2500);
});