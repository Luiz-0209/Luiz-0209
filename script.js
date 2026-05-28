// ============================================
// SISTEMA DE BOLHAS FRUTIGER AERO - VERSÃO MELHORADA
// ============================================

// Configurações
const CONFIG = {
    maxBubbles: 30,        // Aumentei para mais bolhas
    intervalMs: 800,       // Intervalo mais rápido
    minSize: 15,           // Tamanho mínimo (px)
    maxSize: 130,          // Tamanho máximo (px)
    minDuration: 3,        // Duração mínima da animação (s)
    maxDuration: 9,        // Duração máxima da animação (s)
    glassmorphism: true    // Efeito vidro ativado
};

// ============================================
// FUNÇÃO PARA CRIAR BOLHAS (VERSÃO MELHORADA)
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
    
    // Efeito de brilho extra para algumas bolhas
    if (Math.random() > 0.7) {
        bubble.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.8), inset 0 0 20px rgba(255, 255, 255, 0.9)';
    }
    
    container.appendChild(bubble);
    
    // Adicionar efeito sonoro visual (opcional)
    if (Math.random() > 0.95) {
        bubble.style.animation = 'float 2s ease-in-out, pop 0.3s ease-out';
    }
    
    // Remover bolha após animação
    setTimeout(() => {
        if (bubble && bubble.remove) {
            bubble.remove();
        }
    }, duration * 1000);
}

// ============================================
// SISTEMA DE NOTIFICAÇÕES (VERSÃO CORRIGIDA E MELHORADA)
// ============================================
window.mostrarMensagem = function(rede) {
    // Evitar múltiplas notificações simultâneas
    if (window.toastTimeout) clearTimeout(window.toastTimeout);
    
    // Criar notificação estilo Frutiger Aero
    const toast = document.createElement('div');
    
    // Emojis e cores para cada rede
    const redesConfig = {
        'LinkedIn': { emoji: '🔗', cor: '#0077b5', mensagem: 'Conectando ao LinkedIn' },
        'GitHub': { emoji: '🐙', cor: '#333', mensagem: 'Abrindo GitHub' },
        'Instagram': { emoji: '📸', cor: '#e4405f', mensagem: 'Indo para o Instagram' },
        'default': { emoji: '✨', cor: '#1a4d6b', mensagem: 'Abrindo link' }
    };
    
    const config = redesConfig[rede] || redesConfig.default;
    
    toast.innerHTML = `
        <span style="font-size: 1.2em;">${config.emoji}</span>
        <span>${config.mensagem} ${rede}!</span>
        <span style="font-size: 1.2em;">${config.emoji}</span>
    `;
    
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        background: ${CONFIG.glassmorphism ? 'rgba(255, 255, 255, 0.95)' : '#ffffff'};
        backdrop-filter: ${CONFIG.glassmorphism ? 'blur(12px)' : 'none'};
        color: ${config.cor};
        padding: 14px 28px;
        border-radius: 50px;
        font-weight: bold;
        font-size: 0.95em;
        z-index: 10000;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.5);
        border: none;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        pointer-events: none;
        white-space: nowrap;
        animation: fadeInOut 2.5s ease forwards;
        letter-spacing: 0.5px;
        gap: 10px;
        display: flex;
        align-items: center;
        gap: 12px;
    `;
    
    document.body.appendChild(toast);
    
    // Remover notificação
    window.toastTimeout = setTimeout(() => {
        if (toast && toast.remove) toast.remove();
    }, 2500);
    
    // Log para debug
    console.log(`%c[Cartão Digital] %cUsuário clicou em: ${rede}`, 'color: #4caf50; font-weight: bold', `color: ${config.cor}; font-weight: bold`);
    
    // Opcional: redirecionar após a mensagem
    // Descomente as linhas abaixo para ativar os redirecionamentos reais
    /*
    setTimeout(() => {
        const links = {
            'LinkedIn': 'https://linkedin.com/in/seuusuario',
            'GitHub': 'https://github.com/seuusuario',
            'Instagram': 'https://instagram.com/seuusuario'
        };
        if (links[rede]) {
            window.open(links[rede], '_blank');
        }
    }, 500);
    */
};

// ============================================
// INICIALIZAÇÃO
// ============================================
let bubbleInterval = null;
let performanceCheckInterval = null;

function iniciarBolhas() {
    if (bubbleInterval) clearInterval(bubbleInterval);
    
    // Criar algumas bolhas iniciais
    for (let i = 0; i < 8; i++) {
        setTimeout(() => criarBolha(), i * 150);
    }
    
    // Intervalo para criar novas bolhas
    bubbleInterval = setInterval(() => {
        const currentCount = document.querySelectorAll('.bubble').length;
        if (currentCount < CONFIG.maxBubbles) {
            // Criar múltiplas bolhas baseado na quantidade atual
            const toCreate = Math.min(3, CONFIG.maxBubbles - currentCount);
            for (let i = 0; i < toCreate; i++) {
                setTimeout(() => criarBolha(), i * 100);
            }
        }
    }, CONFIG.intervalMs);
    
    // Verificar performance periodicamente
    if (performanceCheckInterval) clearInterval(performanceCheckInterval);
    performanceCheckInterval = setInterval(() => {
        const bubbleCount = document.querySelectorAll('.bubble').length;
        if (bubbleCount > CONFIG.maxBubbles + 5) {
            console.warn(`⚠️ Muitas bolhas (${bubbleCount}), limpando...`);
            document.querySelectorAll('.bubble').forEach(b => b.remove());
        }
    }, 10000);
}

function pararBolhas() {
    if (bubbleInterval) {
        clearInterval(bubbleInterval);
        bubbleInterval = null;
    }
    if (performanceCheckInterval) {
        clearInterval(performanceCheckInterval);
        performanceCheckInterval = null;
    }
}

// ============================================
// ADICIONAR ESTILOS DINÂMICOS (VERSÃO MELHORADA)
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
                opacity: 0.8;
            }
            25% {
                transform: translateY(-25vh) translateX(15px) rotate(90deg);
                opacity: 0.6;
            }
            50% {
                transform: translateY(-50vh) translateX(-10px) rotate(180deg);
                opacity: 0.5;
            }
            75% {
                transform: translateY(-75vh) translateX(10px) rotate(270deg);
                opacity: 0.3;
            }
            100% {
                transform: translateY(-100vh) translateX(-15px) rotate(360deg);
                opacity: 0;
            }
        }
        
        /* Animação especial para bolhas que "estouram" */
        @keyframes pop {
            0% {
                transform: scale(1);
                opacity: 1;
            }
            100% {
                transform: scale(1.5);
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
        
        /* Animação de brilho nas bolhas */
        @keyframes shimmer {
            0% {
                filter: brightness(1);
            }
            50% {
                filter: brightness(1.2);
            }
            100% {
                filter: brightness(1);
            }
        }
        
        /* Estilo base das bolhas */
        .bubble {
            position: absolute;
            bottom: -100px;
            background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.4));
            border-radius: 50%;
            pointer-events: none;
            box-shadow: 0 0 15px rgba(255, 255, 255, 0.6), inset 0 0 20px rgba(255, 255, 255, 0.9);
            animation: float linear infinite;
            backdrop-filter: blur(3px);
            will-change: transform;
            backface-visibility: hidden;
            transition: filter 0.3s ease;
        }
        
        .bubble:hover {
            animation-play-state: paused;
            filter: brightness(1.1);
        }
        
        /* Efeito de brilho nos links */
        .link-card {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }
        
        .link-card:hover {
            text-shadow: 0 0 8px rgba(255, 255, 255, 0.8);
            transform: translateX(10px) scale(1.02);
        }
        
        /* Efeito de onda nos links */
        .link-card::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.4);
            transform: translate(-50%, -50%);
            transition: width 0.6s, height 0.6s;
        }
        
        .link-card:active::after {
            width: 300px;
            height: 300px;
        }
        
        /* Responsividade para notificações em mobile */
        @media (max-width: 600px) {
            div[style*="position: fixed"][style*="bottom: 30px"] {
                font-size: 0.85em !important;
                padding: 10px 18px !important;
                white-space: normal !important;
                text-align: center;
                max-width: 90%;
                gap: 8px !important;
            }
            
            .bubble {
                backdrop-filter: blur(2px);
            }
        }
        
        /* Redução de animações para quem prefere */
        @media (prefers-reduced-motion: reduce) {
            .bubble, .link-card {
                animation: none !important;
                transition: none !important;
            }
        }
    `;
    document.head.appendChild(style);
}

// ============================================
// EVENTOS E INICIALIZAÇÃO
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('%c✨ Cartão Digital Frutiger Aero Inicializado ✨', 'color: #4caf50; font-size: 14px; font-weight: bold');
    console.log('%cVersão melhorada com sistema de bolhas inteligente', 'color: #81c784; font-size: 12px');
    
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
    
    // Adicionar evento de clique nos links para analytics
    document.querySelectorAll('.link-card').forEach(link => {
        link.addEventListener('click', function(e) {
            const text = this.textContent.trim();
            console.log(`%c📊 Analytics: Clique em ${text}`, 'color: #ff9800');
        });
    });
    
    // Pausar animações quando a página não está visível (performance)
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            pararBolhas();
            console.log('⏸️ Bolhas pausadas (economia de recursos)');
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
            console.log('%c🗑️ Todas as bolhas removidas', 'color: #f44336');
        },
        config: CONFIG,
        status: () => {
            const count = document.querySelectorAll('.bubble').length;
            console.log(`%c📊 Status: ${count}/${CONFIG.maxBubbles} bolhas ativas`, 'color: #2196f3');
            return { activeBubbles: count, maxBubbles: CONFIG.maxBubbles };
        }
    };
    
    // Comandos de ajuda
    console.log('%c💡 Comandos de debug disponíveis:', 'color: #9c27b0; font-weight: bold');
    console.log('  %cwindow.debugBolhas.criar()', 'color: #4caf50');
    console.log('  %cwindow.debugBolhas.limparTodas()', 'color: #ff9800');
    console.log('  %cwindow.debugBolhas.status()', 'color: #2196f3');
    console.log('  %cwindow.debugBolhas.config', 'color: #9c27b0');
    console.log('%c💡 Teste notificações: mostrarMensagem("LinkedIn")', 'color: #00bcd4');
    console.log('%c💡 Use mostrarMensagem("GitHub") ou mostrarMensagem("Instagram")', 'color: #00bcd4');
}

// ============================================
// EXTRA: EFEITO DE BRILHO NOS LINKS (OPCIONAL)
// ============================================
function adicionarEfeitoBrilhoLinks() {
    const links = document.querySelectorAll('.link-card');
    links.forEach(link => {
        link.addEventListener('mousemove', (e) => {
            const rect = link.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            link.style.setProperty('--x', `${x}px`);
            link.style.setProperty('--y', `${y}px`);
        });
    });
}

// Adicionar CSS para o efeito de brilho
const extraStyle = document.createElement('style');
extraStyle.textContent = `
    .link-card {
        position: relative;
        overflow: hidden;
    }
    
    .link-card::before {
        content: '';
        position: absolute;
        top: var(--y, 50%);
        left: var(--x, 50%);
        transform: translate(-50%, -50%);
        width: 0;
        height: 0;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%);
        transition: width 0.5s, height 0.5s;
        pointer-events: none;
    }
    
    .link-card:hover::before {
        width: 200px;
        height: 200px;
    }
`;
document.head.appendChild(extraStyle);

console.log('%c✅ Sistema Frutiger Aero completamente carregado!', 'color: #4caf50; font-size: 12px; font-weight: bold');
