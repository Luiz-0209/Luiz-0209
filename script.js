function mostrarMensagem(rede){
    alert(`Abrindo ${rede} 🌎`);
}

/* ===== BOLHAS ===== */

for(let i = 0; i < 25; i++){

    let bolha = document.createElement('div');

    bolha.classList.add('bubble');

    let tamanho = Math.random() * 60 + 20;

    bolha.style.width = `${tamanho}px`;
    bolha.style.height = `${tamanho}px`;

    bolha.style.left = `${Math.random() * 100}%`;

    bolha.style.animationDuration =
    `${Math.random() * 10 + 8}s`;

    bolha.style.animationDelay =
    `${Math.random() * 5}s`;

    document.body.appendChild(bolha);
}
