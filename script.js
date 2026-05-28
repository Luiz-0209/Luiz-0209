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

// Verificar se estamos em ambiente GitHub Pages
const isGitHub = window.location.hostname.includes('github.io');

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
// SISTEMA DE NOTIFICAÇÕES
// ============================================
function mostrarMensagem(rede) {
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
        animation: fadeInOut 2s ease forwards;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        pointer-events: none;
        white-space: nowrap;
    `;
    
    document.body.appendChild(toast);
    
    // Remover notificação
    setTimeout(() => {
        if (toast && toast.remove) toast.remove();
    }, 2000);
    
    // Log para debug (útil no GitHub)
    console.log(`[Cartão Digital] Usuário clicou em: ${rede}`);
}

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
// ADICIONAR ESTILOS DINÂMICOS (garantia de funcionamento)
// ============================================
function adicionarEstilosDinamicos() {
    // Verificar se os estilos já existem
    if (document.getElementById('frutiger-dynamic-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'frutiger-dynamic-styles';
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
        
        /* Efeito de brilho nos links */
        .link-card {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .link-card:hover {
            text-shadow: 0 0 8px rgba(255, 255, 255, 0.8);
        }
        
        /* Responsividade para notificações em mobile */
        @media (max-width: 600px) {
            .toast-notification {
                font-size: 0.85em !important;
                padding: 10px 18px !important;
                white-space: normal !important;
                text-align: center;
                max-width: 90%;
            }
        }
        
        /* Otimização de performance */
        .bubble {
            will-change: transform;
            backface-visibility: hidden;
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
    
    // Iniciar bolhas
    iniciarBolhas();
    
    // Adicionar efeito de brilho aos links
    document.querySelectorAll('.link-card').forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transition = 'all 0.3s ease';
        });
    });
    
    // Pausar animações quando a página não está visível (performance)
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            pararBolhas();
        } else {
            iniciarBolhas();
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
// Expor funções no console para debug (opcional)
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
}
