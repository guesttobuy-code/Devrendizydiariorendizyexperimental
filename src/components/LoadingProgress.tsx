import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Loader2, Zap } from 'lucide-react';
import { toast } from 'sonner';

interface LoadingProgressProps {
  isLoading: boolean;
  onForceLoad: () => void;
}

export function LoadingProgress({ isLoading, onForceLoad }: LoadingProgressProps) {
  const [seconds, setSeconds] = useState(0);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setSeconds(0);
      setShowButton(false);
      return;
    }

    const interval = setInterval(() => {
      setSeconds(prev => {
        const newValue = prev + 0.1;
        
        // Mostra botão após 2 segundos
        if (newValue >= 2 && !showButton) {
          setShowButton(true);
        }
        
        return newValue;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isLoading, showButton]);

  if (!isLoading) return null;

  const progress = Math.min((seconds / 3) * 100, 100); // 3 segundos = 100%

  return (
    <div className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-8 max-w-md w-full mx-4">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
          <h2 className="text-2xl font-semibold mb-2">Carregando RENDIZY</h2>
          <p className="text-gray-600 dark:text-gray-400">
            {seconds < 1 ? 'Conectando ao servidor...' : 
             seconds < 2 ? 'Carregando propriedades...' : 
             seconds < 3 ? 'Carregando reservas...' : 
             'Preparando interface...'}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>{Math.round(progress)}%</span>
            <span>{seconds.toFixed(1)}s / 3.0s</span>
          </div>
        </div>

        {/* Warning após 2 segundos */}
        {showButton && (
          <div className="space-y-4">
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                <strong>Servidor lento ou offline?</strong>
                <br />
                Você pode forçar o carregamento com dados locais.
              </p>
            </div>

            <Button 
              onClick={() => {
                toast.success('Carregamento forçado! Usando dados locais.');
                onForceLoad();
              }}
              className="w-full"
              size="lg"
              variant="default"
            >
              <Zap className="w-4 h-4 mr-2" />
              Forçar Carregamento Agora
            </Button>

            <p className="text-xs text-center text-gray-500 dark:text-gray-400">
              O sistema carregará automaticamente em {Math.max(0, 3 - seconds).toFixed(1)}s
            </p>
          </div>
        )}

        {/* Hint antes de 2 segundos */}
        {!showButton && (
          <p className="text-xs text-center text-gray-500 dark:text-gray-400">
            Aguarde... carregamento automático em andamento
          </p>
        )}
      </div>
    </div>
  );
}
