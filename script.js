// ============================================
// SISTEMA DE BOLHAS FRUTIGER AERO
// ============================================

// Configurações
const CONFIG = {
    maxBubbles: 25,        // Máximo de bolhas simultâneas
    intervalMs: 1000,      // Intervalo entre criação de bolhas
    minSize: 20,           // Tamanho mínimo (px)
    maxSize: 120,          // Tamanho máximo (px)
    minDuration: 3,        // Duração mínima da animação (s)
    maxDuration: 8         // Duração máxima da animação (s)
};

// ============================================
// FUNÇÃO PARA CRIAR BOLHAS
// ============================================
function criarBolha() {
    const container = document.getElementById('bubbles-container');
    if (!container) return;
    
    // Limitar número de bolhas
    const currentBubbles = document.querySelectorAll('.bubble').length;
    if (currentBubbles >= CONFIG.maxBubbles) return;
    
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    
    // Tamanho aleatório
    const size = Math.random() * (CONFIG.maxSize - CONFIG.minSize) + CONFIG.minSize;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    
    // Posição horizontal aleatória (com margem para não ficar nas bordas)
    const margin = 20;
    const leftPos = Math.random() * (100 - margin * 2) + margin;
    bubble.style.left = `${leftPos}%`;
    
    // Duração da animação
    const duration = Math.random() * (CONFIG.maxDuration - CONFIG.minDuration) + CONFIG.minDuration;
    bubble.style.animationDuration = `${duration}s`;
    
    // Atraso aleatório
    bubble.style.animationDelay = `${Math.random() * 3}s`;
    
    // Variação de opacidade inicial
    bubble.style.opacity = 0.3 + Math.random() * 0.5;
    
    container.appendChild(bubble);
    
    // Remover bolha após animação
    setTimeout(() => {
        if (bubble && bubble.remove) {
            bubble.remove();
        }
    }, duration * 1000);
}

// ============================================
// SISTEMA DE NOTIFICAÇÕES (VERSÃO CORRIGIDA)
// ============================================
window.mostrarMensagem = function(rede) {
    // Criar notificação estilo Frutiger Aero
    const toast = document.createElement('div');
    
    // Emojis para cada rede
    const emojis = {
        'LinkedIn': '🔗',
        'GitHub': '🐙',
        'Instagram': '📸'
    };
    
    const emoji = emojis[rede] || '✨';
    
    toast.textContent = `${emoji} Você será redirecionado para o ${rede}! ${emoji}`;
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(12px);
        color: #1a4d6b;
        padding: 12px 24px;
        border-radius: 50px;
        font-weight: bold;
        font-size: 0.95em;
        z-index: 10000;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        border: 1px solid rgba(255, 255, 255, 0.8);
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        pointer-events: none;
        white-space: nowrap;
        animation: fadeInOut 2s ease forwards;
    `;
    
    document.body.appendChild(toast);
    
    // Remover notificação
    setTimeout(() => {
        if (toast && toast.remove) toast.remove();
    }, 2000);
    
    // Log para debug
    console.log(`[Cartão Digital] Usuário clicou em: ${rede}`);
    
    // Opcional: redirecionar após a mensagem
    // setTimeout(() => {
    //     window.open(`https://${rede.toLowerCase()}.com/seuusuario`, '_blank');
    // }, 500);
};

// ============================================
// INICIALIZAÇÃO
// ============================================
let bubbleInterval = null;

function iniciarBolhas() {
    if (bubbleInterval) clearInterval(bubbleInterval);
    
    // Criar algumas bolhas iniciais
    for (let i = 0; i < 5; i++) {
        setTimeout(() => criarBolha(), i * 200);
    }
    
    // Intervalo para criar novas bolhas
    bubbleInterval = setInterval(() => {
        if (document.querySelectorAll('.bubble').length < CONFIG.maxBubbles) {
            criarBolha();
        }
    }, CONFIG.intervalMs);
}

function pararBolhas() {
    if (bubbleInterval) {
        clearInterval(bubbleInterval);
        bubbleInterval = null;
    }
}

// ============================================
// ADICIONAR ESTILOS DINÂMICOS (CORRIGIDO)
// ============================================
function adicionarEstilosDinamicos() {
    // Verificar se os estilos já existem
    if (document.getElementById('frutiger-dynamic-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'frutiger-dynamic-styles';
    style.textContent = `
        /* Animação para as bolhas */
        @keyframes float {
            0% {
                transform: translateY(0) translateX(0) rotate(0deg);
                opacity: 0.7;
            }
            50% {
                transform: translateY(-50vh) translateX(20px) rotate(180deg);
                opacity: 0.5;
            }
            100% {
                transform: translateY(-100vh) translateX(-20px) rotate(360deg);
                opacity: 0;
            }
        }
        
        /* Animação para as notificações */
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
        
        /* Estilo base das bolhas */
        .bubble {
            position: absolute;
            bottom: -100px;
            background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.3));
            border-radius: 50%;
            pointer-events: none;
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.5), inset 0 0 15px rgba(255, 255, 255, 0.8);
            animation: float linear infinite;
            backdrop-filter: blur(2px);
            will-change: transform;
            backface-visibility: hidden;
        }
        
        /* Efeito de brilho nos links */
        .link-card {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: pointer;
        }
        
        .link-card:hover {
            text-shadow: 0 0 8px rgba(255, 255, 255, 0.8);
        }
        
        /* Responsividade para notificações em mobile */
        @media (max-width: 600px) {
            div[style*="position: fixed"][style*="bottom: 30px"] {
                font-size: 0.85em !important;
                padding: 10px 18px !important;
                white-space: normal !important;
                text-align: center;
                max-width: 90%;
            }
        }
    `;
    document.head.appendChild(style);
}

// ============================================
// EVENTOS E INICIALIZAÇÃO
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('✨ Cartão Digital Frutiger Aero Inicializado ✨');
    
    // Adicionar estilos dinâmicos
    adicionarEstilosDinamicos();
    
    // Verificar se o container de bolhas existe, se não, criar
    if (!document.getElementById('bubbles-container')) {
        const container = document.createElement('div');
        container.id = 'bubbles-container';
        container.className = 'bubbles-container';
        container.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 0;
            overflow: hidden;
        `;
        document.body.insertBefore(container, document.body.firstChild);
    }
    
    // Iniciar bolhas
    iniciarBolhas();
    
    // Pausar animações quando a página não está visível (performance)
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            pararBolhas();
            console.log('⏸️ Bolhas pausadas');
        } else {
            iniciarBolhas();
            console.log('▶️ Bolhas retomadas');
        }
    });
});

// Limpar ao sair
window.addEventListener('beforeunload', () => {
    pararBolhas();
});

// ============================================
// FUNÇÕES DE DEBUG (úteis para GitHub)
// ============================================
if (typeof window !== 'undefined') {
    window.debugBolhas = {
        criar: criarBolha,
        parar: pararBolhas,
        iniciar: iniciarBolhas,
        limparTodas: () => {
            document.querySelectorAll('.bubble').forEach(b => b.remove());
            console.log('🗑️ Todas as bolhas removidas');
        },
        config: CONFIG
    };
    console.log('💡 Dica: Use window.debugBolhas no console para controlar as bolhas');
    console.log('💡 Use mostrarMensagem("LinkedIn") para testar notificações');
}
