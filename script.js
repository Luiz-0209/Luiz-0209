// Função para criar bolhas
function criarBolha() {
    const container = document.getElementById('bubbles-container');
    if (!container) return;
    
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    
    // Tamanho aleatório entre 20px e 120px
    const size = Math.random() * 100 + 20;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    
    // Posição horizontal aleatória
    bubble.style.left = `${Math.random() * 100}%`;
    
    // Duração da animação entre 3 e 8 segundos
    const duration = Math.random() * 5 + 3;
    bubble.style.animationDuration = `${duration}s`;
    
    // Atraso aleatório para começar
    bubble.style.animationDelay = `${Math.random() * 5}s`;
    
    container.appendChild(bubble);
    
    // Remover a bolha após a animação terminar
    setTimeout(() => {
        if (bubble && bubble.remove) {
            bubble.remove();
        }
    }, duration * 1000);
}

// Função para mostrar mensagem (para os links)
function mostrarMensagem(rede) {
    // Criar toast notification estilo Frutiger Aero
    const toast = document.createElement('div');
    toast.textContent = `✨ Você será redirecionado para o ${rede}! ✨`;
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(12px);
        color: #1a4d6b;
        padding: 15px 25px;
        border-radius: 50px;
        font-weight: bold;
        font-size: 1em;
        z-index: 1000;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        border: 1px solid rgba(255, 255, 255, 0.5);
        animation: fadeInOut 2s ease forwards;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    `;
    
    document.body.appendChild(toast);
    
    // Remover toast após 2 segundos
    setTimeout(() => {
        if (toast && toast.remove) {
            toast.remove();
        }
    }, 2000);
}

// Adicionar animação CSS para o toast
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInOut {
        0% {
            opacity: 0;
            transform: translateX(-50%) translateY(20px);
        }
        15% {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        85% {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        100% {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
    }
`;
document.head.appendChild(style);

// Criar bolhas em intervalos regulares
let bubbleInterval;
let bubbleCount = 0;
const MAX_BUBBLES = 30;

function startBubbles() {
    bubbleInterval = setInterval(() => {
        const currentBubbles = document.querySelectorAll('.bubble').length;
        if (currentBubbles < MAX_BUBBLES) {
            criarBolha();
            bubbleCount++;
        }
    }, 800);
}

function stopBubbles() {
    if (bubbleInterval) {
        clearInterval(bubbleInterval);
    }
}

// Iniciar bolhas quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    startBubbles();
    
    // Limpar bolhas ao sair da página (opcional)
    window.addEventListener('beforeunload', () => {
        stopBubbles();
    });
});

// Efeito de brilho nos links (opcional)
document.querySelectorAll('.link-card').forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.textShadow = '0 0 8px rgba(255, 255, 255, 0.8)';
    });
    
    link.addEventListener('mouseleave', () => {
        link.style.textShadow = 'none';
    });
});
