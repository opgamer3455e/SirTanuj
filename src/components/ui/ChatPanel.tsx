import { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';
import { Socket } from 'socket.io-client';

interface ChatMessage {
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
}

interface ChatPanelProps {
  socket: Socket | null;
  roomId: string;
  currentUserId: string;
  currentUserName: string;
}

export default function ChatPanel({ socket, roomId, currentUserId, currentUserName }: ChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!socket) return;

    const handleReceiveMessage = (message: ChatMessage) => {
      setMessages((prev) => [...prev, message]);
    };

    socket.on('receive-message', handleReceiveMessage);

    return () => {
      socket.off('receive-message', handleReceiveMessage);
    };
  }, [socket]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !socket) return;

    const messageData: ChatMessage = {
      senderId: currentUserId,
      senderName: currentUserName,
      text: inputText.trim(),
      timestamp: new Date().toISOString(),
    };

    socket.emit('send-message', roomId, messageData);
    setInputText('');
  };

  const formatTime = (isoString: string) => {
    const d = new Date(isoString);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="w-full h-full bg-[#111] border border-white/10 rounded-2xl flex flex-col overflow-hidden shadow-2xl">
      <div className="px-4 py-3 border-b border-white/10 bg-black/40">
        <h3 className="font-bold text-white tracking-wide">In-Call Messages</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
        {messages.map((msg, idx) => {
          const isMe = msg.senderId === currentUserId;
          return (
            <div key={idx} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-xs font-semibold text-zinc-400">
                  {isMe ? 'You' : msg.senderName}
                </span>
                <span className="text-[10px] text-zinc-600">{formatTime(msg.timestamp)}</span>
              </div>
              <div
                className={`px-3 py-2 rounded-xl text-sm max-w-[85%] break-words ${
                  isMe ? 'bg-[#FC642D] text-white rounded-br-sm' : 'bg-white/10 text-zinc-200 rounded-bl-sm'
                }`}
              >
                {msg.text}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={sendMessage} className="p-3 border-t border-white/10 bg-black/40 flex gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Send a message..."
          className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#FC642D] transition-colors"
        />
        <button
          type="submit"
          disabled={!inputText.trim()}
          className="p-2 bg-[#FC642D] hover:bg-[#ff7544] text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}
