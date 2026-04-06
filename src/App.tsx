import React, { useState } from 'react';
import { Shield, Brain, Zap, Lock, ChevronRight, Activity, Wallet, CheckCircle } from 'lucide-react';

function App() {
  const [onboarded, setOnboarded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [strategy, setStrategy] = useState<any>(null);

  const handleZKVerify = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/verify-zk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ proof: 'mock_proof' })
      });
      const data = await res.json();
      if (data.success) setOnboarded(true);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const generateStrategy = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/generate-strategy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ riskTolerance: 'medium' })
      });
      const data = await res.json();
      setStrategy(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans">
      {/* Nav */}
      <nav className="border-b border-slate-800 p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Shield className="text-blue-500 w-8 h-8" />
          <span className="text-xl font-bold tracking-tight">GuardianAI <span className="text-blue-500">Finance</span></span>
        </div>
        <div className="flex gap-4 items-center">
          <div className="text-xs px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-slate-400 italic">
            HashKey Mainnet Node Connected
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium transition-colors">
            Connect Wallet
          </button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-8">
        {!onboarded ? (
          <div className="max-w-md mx-auto mt-20 text-center space-y-6">
            <div className="bg-blue-500/10 p-4 rounded-full w-20 h-20 mx-auto flex items-center justify-center border border-blue-500/20">
              <Lock className="text-blue-500 w-10 h-10" />
            </div>
            <h1 className="text-4xl font-bold">Privacy-First Onboarding</h1>
            <p className="text-slate-400">Generate a ZK-Proof of identity without revealing sensitive data. Verified by HashKey Compliance layer.</p>
            <button 
              onClick={handleZKVerify}
              disabled={loading}
              className="w-full bg-white text-slate-950 font-bold py-4 rounded-xl hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
            >
              {loading ? "Generating Proof..." : "Generate ZK-Identity Proof"}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Stats Sidebar */}
            <div className="space-y-6">
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
                <h3 className="text-slate-400 mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                  <Activity className="w-4 h-4" /> Portfolio Health
                </h3>
                <div className="text-3xl font-bold">$124,502.12</div>
                <div className="text-emerald-500 text-sm mt-1">+12.4% (30d)</div>
              </div>

              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
                <h3 className="text-slate-400 mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                  <CheckCircle className="w-4 h-4" /> ZK-ID Status
                </h3>
                <div className="flex items-center gap-2 text-emerald-400">
                  <Shield className="w-5 h-5" /> Verified & Sybil-Resistant
                </div>
              </div>
            </div>

            {/* Main Action Area */}
            <div className="md:col-span-2 space-y-8">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-3xl relative overflow-hidden">
                <div className="relative z-10">
                  <h2 className="text-2xl font-bold mb-2">Autonomous Yield Agent</h2>
                  <p className="text-blue-100 mb-6">Execute complex cross-protocol strategies in the HashKey ecosystem with one click.</p>
                  <button 
                    onClick={generateStrategy}
                    className="bg-white text-blue-700 font-bold px-6 py-3 rounded-xl hover:shadow-lg transition-all flex items-center gap-2"
                  >
                    <Brain className="w-5 h-5" /> Generate Optimal Strategy
                  </button>
                </div>
                <div className="absolute -right-10 -bottom-10 opacity-20">
                  <Brain className="w-64 h-64" />
                </div>
              </div>

              {strategy && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold px-2">AI-Suggested Strategy Steps</h3>
                  {strategy.steps.map((step: any) => (
                    <div key={step.step} className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center gap-4">
                      <div className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                        {step.step}
                      </div>
                      <div className="flex-1">
                        <div className="font-bold">{step.action}</div>
                        <div className="text-sm text-slate-400">{step.protocol} • {step.description}</div>
                      </div>
                      <button className="text-blue-500 hover:text-blue-400">
                        <ChevronRight />
                      </button>
                    </div>
                  ))}
                  <div className="bg-slate-800/50 p-4 rounded-xl border border-dashed border-slate-600 flex justify-between items-center">
                    <span className="text-slate-300 italic">Projected APY: {strategy.estimatedApy}</span>
                    <button className="bg-emerald-600 px-6 py-2 rounded-lg font-bold">Execute All</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;