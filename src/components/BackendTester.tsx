import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { Badge } from './ui/badge';
import { CheckCircle2, XCircle, Loader2, Database, Trash2 } from 'lucide-react';
import api from '../utils/api';
import { isMockEnabled, toggleMockMode, seedMockData } from '../utils/mockBackend';

export function BackendTester() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [mockMode, setMockMode] = useState(isMockEnabled());

  const addResult = (test: string, success: boolean, data?: any, error?: string) => {
    setResults(prev => [...prev, { test, success, data, error, timestamp: new Date() }]);
  };

  const clearResults = () => setResults([]);

  const runTest = async (name: string, testFn: () => Promise<any>) => {
    try {
      setLoading(true);
      const result = await testFn();
      if (result.success) {
        addResult(name, true, result.data);
      } else {
        addResult(name, false, undefined, result.error || result.message);
      }
    } catch (error: any) {
      addResult(name, false, undefined, error.message);
    } finally {
      setLoading(false);
    }
  };

  const tests = [
    {
      name: 'Health Check',
      description: 'Verifica se a API está online',
      fn: async () => {
        const { projectId, publicAnonKey } = await import('../utils/supabase/info');
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-67caf26a/health`,
          {
            headers: { 'Authorization': `Bearer ${publicAnonKey}` }
          }
        );
        return response.json();
      }
    },
    {
      name: 'Popular Banco',
      description: 'Adiciona dados de exemplo',
      fn: async () => {
        const { projectId, publicAnonKey } = await import('../utils/supabase/info');
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-67caf26a/dev/seed-database`,
          {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${publicAnonKey}` }
          }
        );
        return response.json();
      }
    },
    {
      name: 'Teste Completo - Location + Listing',
      description: 'Cria Location e Listing completos para testar todas funcionalidades',
      fn: async () => {
        const { projectId, publicAnonKey } = await import('../utils/supabase/info');
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-67caf26a/dev/seed-complete-test`,
          {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${publicAnonKey}` }
          }
        );
        return response.json();
      }
    },
    {
      name: 'Listar Propriedades',
      description: 'Busca todas as propriedades',
      fn: () => api.properties.list()
    },
    {
      name: 'Listar Reservas',
      description: 'Busca todas as reservas',
      fn: () => api.reservations.list()
    },
    {
      name: 'Listar Hóspedes',
      description: 'Busca todos os hóspedes',
      fn: () => api.guests.list()
    },
    {
      name: 'Dados do Calendário',
      description: 'Busca dados para calendário',
      fn: () => {
        const today = new Date();
        const nextMonth = new Date(today);
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        
        return api.calendar.getData({
          startDate: today.toISOString().split('T')[0],
          endDate: nextMonth.toISOString().split('T')[0],
          includeBlocks: true,
          includePrices: true,
        });
      }
    },
    {
      name: 'Estatísticas do Calendário',
      description: 'Busca estatísticas do período',
      fn: () => {
        const today = new Date();
        const nextMonth = new Date(today);
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        
        return api.calendar.getStats(
          today.toISOString().split('T')[0],
          nextMonth.toISOString().split('T')[0]
        );
      }
    },
  ];

  const clearDatabase = async () => {
    if (!confirm('Tem certeza que deseja limpar TODOS os dados do banco?')) return;
    
    setLoading(true);
    try {
      const { projectId, publicAnonKey } = await import('../utils/supabase/info');
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-67caf26a/dev/clear-database`,
        {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${publicAnonKey}` }
        }
      );
      const result = await response.json();
      
      if (result.success) {
        addResult('Limpar Banco', true, result.data);
      } else {
        addResult('Limpar Banco', false, undefined, result.error);
      }
    } catch (error: any) {
      addResult('Limpar Banco', false, undefined, error.message);
    } finally {
      setLoading(false);
    }
  };

  const runAllTests = async () => {
    clearResults();
    for (const test of tests) {
      await runTest(test.name, test.fn);
      // Pequeno delay entre testes
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  };

  const handleToggleMock = () => {
    toggleMockMode();
    setMockMode(!mockMode);
    window.location.reload(); // Recarrega para aplicar mudança
  };

  const handleSeedMock = () => {
    seedMockData();
    addResult('Popular Dados Mock', true, { message: '5 propriedades, 4 hóspedes, 3 reservas criados!' });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Mock Mode Indicator */}
      {mockMode && (
        <Alert className="border-purple-200 bg-purple-50">
          <CheckCircle2 className="h-4 w-4 text-purple-600" />
          <AlertDescription className="text-purple-900">
            <strong>🎭 Modo Demonstração Ativo!</strong> Backend rodando localmente no navegador. 
            Todos os dados são salvos no localStorage e persistem entre recarregamentos.
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-6 h-6" />
            Testador de Backend - Rendizy API
            {mockMode && <Badge variant="secondary" className="ml-2">Mock Mode</Badge>}
          </CardTitle>
          <CardDescription>
            {mockMode 
              ? 'Testando backend simulado (localStorage)' 
              : 'Teste todas as funcionalidades do backend rapidamente'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2 flex-wrap">
            <Button
              onClick={handleToggleMock}
              variant={mockMode ? 'default' : 'outline'}
              size="lg"
            >
              {mockMode ? '🎭 Modo Mock Ativo' : '🌐 Ativar Modo Mock'}
            </Button>

            {mockMode && (
              <Button
                onClick={handleSeedMock}
                variant="secondary"
                size="lg"
              >
                🌱 Popular Dados
              </Button>
            )}
            
            <Button
              onClick={runAllTests}
              disabled={loading}
              size="lg"
            >
              {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Executar Todos os Testes
            </Button>
            
            <Button
              onClick={clearResults}
              variant="outline"
              disabled={loading || results.length === 0}
            >
              Limpar Resultados
            </Button>

            <Button
              onClick={clearDatabase}
              variant="destructive"
              disabled={loading}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Limpar Banco
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {tests.map((test, index) => (
              <Card key={index} className="hover:bg-accent cursor-pointer transition-colors">
                <CardHeader className="p-4">
                  <CardTitle className="text-sm">{test.name}</CardTitle>
                  <CardDescription className="text-xs">{test.description}</CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <Button
                    onClick={() => runTest(test.name, test.fn)}
                    disabled={loading}
                    size="sm"
                    variant="secondary"
                    className="w-full"
                  >
                    {loading && <Loader2 className="w-3 h-3 mr-2 animate-spin" />}
                    Testar
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {results.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Resultados dos Testes</CardTitle>
            <CardDescription>
              {results.filter(r => r.success).length} de {results.length} testes passaram
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {results.map((result, index) => (
                <Alert
                  key={index}
                  variant={result.success ? 'default' : 'destructive'}
                  className="border-l-4"
                >
                  <div className="flex items-start gap-3">
                    {result.success ? (
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    )}
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold">{result.test}</span>
                        <Badge variant={result.success ? 'default' : 'destructive'} className="text-xs">
                          {result.success ? 'SUCESSO' : 'ERRO'}
                        </Badge>
                      </div>
                      
                      {result.success && result.data && (
                        <AlertDescription className="text-xs mt-2">
                          <details>
                            <summary className="cursor-pointer hover:underline">
                              Ver dados ({typeof result.data === 'object' && Array.isArray(result.data) 
                                ? `${result.data.length} items` 
                                : 'objeto'})
                            </summary>
                            <pre className="mt-2 p-2 bg-muted rounded text-xs overflow-auto max-h-60">
                              {JSON.stringify(result.data, null, 2)}
                            </pre>
                          </details>
                        </AlertDescription>
                      )}
                      
                      {!result.success && result.error && (
                        <AlertDescription className="text-xs mt-1 text-red-600">
                          {result.error}
                        </AlertDescription>
                      )}
                      
                      <div className="text-xs text-muted-foreground mt-1">
                        {result.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                </Alert>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle className="text-sm">📚 Informações</CardTitle>
        </CardHeader>
        <CardContent className="text-xs space-y-2">
          <p>
            <strong>Backend:</strong> Supabase Edge Function (Hono)
          </p>
          <p>
            <strong>Banco de Dados:</strong> KV Store (Key-Value)
          </p>
          <p>
            <strong>Total de Rotas:</strong> 25+ endpoints
          </p>
          <p>
            <strong>Funcionalidades:</strong> CRUD completo para Propriedades, Reservas, Hóspedes, Calendário
          </p>
          <p className="pt-2 border-t">
            <strong>Dica:</strong> Execute "Popular Banco" primeiro se o banco estiver vazio!
          </p>
        </CardContent>
      </Card>

      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="text-sm text-orange-800">🔧 Se os testes falharem</CardTitle>
        </CardHeader>
        <CardContent className="text-xs space-y-2 text-orange-900">
          <p>
            <strong>Erro "Missing authorization header":</strong> O backend precisa ser deployado no Supabase.
          </p>
          <p>
            <strong>Alternativa:</strong> Teste direto no Console do navegador (F12).
          </p>
          <p className="pt-2">
            <strong>📄 Veja o arquivo:</strong> <code className="bg-white px-1 py-0.5 rounded">TESTE_RAPIDO_CONSOLE.md</code>
          </p>
          <p>
            Lá tem comandos prontos para você copiar e colar no Console!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
