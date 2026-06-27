import { useState } from 'react';
import { ChevronDown, Info, Zap, Plus } from 'lucide-react';

export default function PublicNetworking() {
  const [port, setPort] = useState('');

  return (
    <div className="bg-[#0b0c10] min-h-screen p-8 text-white font-sans flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full">
        <h2 className="text-xl font-bold mb-1">Public Networking</h2>
        <p className="text-[#a1a1aa] text-sm mb-6 font-medium">Access to this service publicly through HTTP or TCP</p>

        <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-6 mb-6 shadow-sm">
          <h3 className="font-semibold text-lg mb-5 text-white">Generate Service Domain</h3>
          
          <div className="relative mb-6">
            <select 
              value={port} 
              onChange={(e) => setPort(e.target.value)}
              className={`w-full appearance-none bg-[#09090b] border border-[#27272a] rounded-lg py-3 px-4 focus:outline-none focus:border-[#9333ea] transition-colors cursor-pointer ${port === '' ? 'text-gray-300' : 'text-white'}`}
            >
              <option value="" disabled hidden>Select a port</option>
              <option value="80">80 (HTTP)</option>
              <option value="443">443 (HTTPS)</option>
              <option value="3000">3000 (React/Node)</option>
              <option value="8080">8080 (Alt HTTP)</option>
            </select>
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
              <ChevronDown size={18} className="text-gray-400" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center text-[#71717a] text-sm font-medium">
              <Info size={16} className="mr-2" />
              <span>Choose your target port</span>
            </div>
            
            <div className="flex gap-3">
              <button className="px-5 py-2.5 rounded-lg border border-[#27272a] hover:bg-[#27272a] hover:text-white transition-colors text-sm font-medium text-gray-300">
                Cancel
              </button>
              <button className="px-5 py-2.5 rounded-lg bg-[#a855f7] hover:bg-[#9333ea] transition-colors text-white text-sm font-medium shadow-[0_4px_14px_rgba(168,85,247,0.4)]">
                Generate Domain
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#a855f7]/30 text-[#c084fc] bg-[#a855f7]/10 hover:bg-[#a855f7]/20 transition-colors text-sm font-medium">
            <Zap size={16} />
            Generate Domain
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#27272a] hover:bg-[#27272a] transition-colors text-sm font-medium text-[#a1a1aa]">
            <Plus size={16} />
            Custom Domain
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#27272a] hover:bg-[#27272a] transition-colors text-sm font-medium text-[#a1a1aa]">
            <Plus size={16} />
            TCP Proxy
          </button>
        </div>
      </div>
    </div>
  );
}
