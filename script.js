// Sistema de Bolhas Frutiger Aero
(function() {
    'use strict';
    
    // Configurações
    var CONFIG = {
        maxBubbles: 25,
        intervalMs: 1000,
        minSize: 20,
        maxSize: 120,
        minDuration: 3,
        maxDuration: 8
    };
    
    var bubbleInterval = null;
    
    // Função para criar bolha
    function criarBolha() {
        var container = document.getElementById('bubbles-container');
        if (!container) return;
        
        var currentBubbles = document.querySelectorAll('.bubble').length;
        if (currentBubbles >= CONFIG.maxBubbles) return;
        
        var bubble = document.createElement('div');
        bubble.classList.add('bubble');
        
        var size = Math.random() * (CONFIG.maxSize - CONFIG.minSize) + CONFIG.minSize;
        bubble.style.width = size + 'px';
        bubble.style.height = size + 'px';
        
        var margin = 20;
        var leftPos = Math.random() * (100 - margin * 2) + margin;
        bubble.style.left = leftPos + '%';
        
        var duration = Math.random() * (CONFIG.maxDuration - CONFIG.minDuration) + CONFIG.minDuration;
        bubble.style.animationDuration = duration + 's';
        
        bubble.style.animationDelay = Math.random() * 3 + 's';
        bubble.style.opacity = 0.3 + Math.random() * 0.5;
        
        container.appendChild(bubble);
        
        setTimeout(function() {
            if (bubble && bubble.remove) {
                bubble.remove();
            }
        }, duration * 1000);
    }
    
    // Função para iniciar bolhas
    function iniciarBolhas() {
        if (bubbleInterval) clearInterval(bubbleInterval);
        
        for (var i = 0; i < 5; i++) {
            setTimeout(function() {
                criarBolha();
            }, i * 200);
        }
        
        bubbleInterval = setInterval(function() {
            if (document.querySelectorAll('.bubble').length < CONFIG.maxBubbles) {
                criarBolha();
            }
        }, CONFIG.intervalMs);
    }
    
    // Função para parar bolhas
    function pararBolhas() {
        if (bubbleInterval) {
            clearInterval(bubbleInterval);
            bubbleInterval = null;
        }
    }
    
    // Função global para mostrar mensagem
    window.mostrarMensagem = function(rede) {
        var toast = document.createElement('div');
        
        var emojis = {
            'LinkedIn': '🔗',
            'GitHub': '🐙',
            'Instagram': '📸'
        };
        
        var emoji = emojis[rede] || '✨';
        
        toast.textContent = emoji + ' Você será redirecionado para o ' + rede + '! ' + emoji;
        toast.style.position = 'fixed';
        toast.style.bottom = '30px';
        toast.style.left = '50%';
        toast.style.transform = 'translateX(-50%)';
        toast.style.background = 'rgba(255, 255, 255, 0.95)';
        toast.style.backdropFilter = 'blur(12px)';
        toast.style.color = '#1a4d6b';
        toast.style.padding = '12px 24px';
        toast.style.borderRadius = '50px';
        toast.style.fontWeight = 'bold';
        toast.style.fontSize = '0.95em';
        toast.style.zIndex = '10000';
        toast.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
        toast.style.border = '1px solid rgba(255, 255, 255, 0.8)';
        toast.style.fontFamily = 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif';
        toast.style.pointerEvents = 'none';
        toast.style.whiteSpace = 'nowrap';
        
        document.body.appendChild(toast);
        
        setTimeout(function() {
            if (toast && toast.remove) toast.remove();
        }, 2000);
        
        console.log('[Cartão Digital] Usuário clicou em: ' + rede);
    };
    
    // Adicionar estilos dinâmicos
    function adicionarEstilosDinamicos() {
        if (document.getElementById('frutiger-dynamic-styles')) return;
        
        var style = document.createElement('style');
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
            
            div[style*="position: fixed"][style*="bottom: 30px"] {
                animation: fadeInOut 2s ease forwards;
            }
            
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
    
    // Inicialização
    document.addEventListener('DOMContentLoaded', function() {
        console.log('Cartão Digital Frutiger Aero Inicializado');
        
        adicionarEstilosDinamicos();
        
        if (!document.getElementById('bubbles-container')) {
            var container = document.createElement('div');
            container.id = 'bubbles-container';
            container.className = 'bubbles-container';
            container.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;overflow:hidden;';
            document.body.insertBefore(container, document.body.firstChild);
        }
        
        iniciarBolhas();
        
        document.addEventListener('visibilitychange', function() {
            if (document.hidden) {
                pararBolhas();
            } else {
                iniciarBolhas();
            }
        });
    });
    
    // Limpar ao sair
    window.addEventListener('beforeunload', function() {
        pararBolhas();
    });
})();
