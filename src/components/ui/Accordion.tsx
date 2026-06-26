import { useState } from 'react';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

export function AccordionItem({ title, children, isOpen, onToggle }: AccordionItemProps) {
  return (
    <div className="border border-white/10 rounded-2xl bg-[#121212] overflow-hidden mb-4">
      <button
        className="w-full px-6 py-5 flex items-center justify-between text-left transition-colors hover:bg-white/5"
        onClick={onToggle}
      >
        <span className="text-lg font-medium text-white pr-4">{title}</span>
        <svg 
          className="text-zinc-400 shrink-0" 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <line x1="5" y1="12" x2="19" y2="12" />
          <line 
            x1="12" 
            y1="5" 
            x2="12" 
            y2="19" 
            className="origin-center transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
              opacity: isOpen ? 0 : 1
            }}
          />
        </svg>
      </button>
      <div className={`accordion-wrapper ${isOpen ? 'open' : ''}`}>
        <div className="overflow-hidden">
          <div className="px-6 pb-5 text-zinc-400">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

interface AccordionProps {
  items: { id: string; title: string; content: React.ReactNode }[];
  allowMultiple?: boolean;
}

export default function Accordion({ items, allowMultiple = false }: AccordionProps) {
  const [openIds, setOpenIds] = useState<string[]>([]);

  const handleToggle = (id: string) => {
    setOpenIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((openId) => openId !== id);
      } else {
        return allowMultiple ? [...prev, id] : [id];
      }
    });
  };

  return (
    <div className="w-full">
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          title={item.title}
          isOpen={openIds.includes(item.id)}
          onToggle={() => handleToggle(item.id)}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
}
