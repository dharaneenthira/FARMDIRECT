import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Send, User, MessageSquare, Phone, ShieldCheck, Sprout } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const ChatPage = () => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const activeProdId = searchParams.get('product');

  const [activeChat, setActiveChat] = useState({
    id: 1,
    name: "Murugan (Madurai Organic Farms)",
    role: "Farmer",
    online: true,
    avatar: "🌾",
    productContext: "Fresh Country Tomatoes (500 kg)"
  });

  const conversations = [
    {
      id: 1,
      name: "Murugan (Madurai Organic Farms)",
      role: "Farmer",
      online: true,
      lastMsg: "I can dispatch 500 kg tomatoes by 2:00 PM today.",
      time: "10:32 AM",
      avatar: "🌾"
    },
    {
      id: 2,
      name: "Velu (Thanjavur Paddy Fields)",
      role: "Farmer",
      online: false,
      lastMsg: "Sona Masoori raw rice is aged 1 year.",
      time: "Yesterday",
      avatar: "🌾"
    },
    {
      id: 3,
      name: "FreshMart Supermarket Chain",
      role: "Buyer",
      online: true,
      lastMsg: "Can we lock the price at ₹33/kg for 1000 kg?",
      time: "9:15 AM",
      avatar: "🏪"
    }
  ];

  const [messages, setMessages] = useState([
    { id: 1, sender: "Murugan", text: "Hello! Thank you for inquiring about our Madurai Country Tomatoes harvest.", time: "10:30 AM", isMe: false },
    { id: 2, sender: "Me", text: "Hi Murugan, what is the available quantity and can you handle immediate transport to Coimbatore?", time: "10:31 AM", isMe: true },
    { id: 3, sender: "Murugan", text: "Yes! We have 850 kg harvested yesterday. We can dispatch 500 kg right now via AgroExpress fleet.", time: "10:32 AM", isMe: false }
  ]);

  const [inputText, setInputText] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: user ? user.name : "Me",
      text: inputText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    };

    setMessages([...messages, newMsg]);
    setInputText('');

    // Simulated reply after 1 flex second
    setTimeout(() => {
      const reply = {
        id: Date.now() + 1,
        sender: activeChat.name,
        text: "Got it! Terms confirmed. Preparing harvest paperwork now.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMe: false
      };
      setMessages(prev => [...prev, reply]);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[600px]">
          
          {/* Left Conversations Sidebar */}
          <div className="md:col-span-4 border-r border-slate-200 bg-slate-50 flex flex-col">
            <div className="p-4 border-b border-slate-200 bg-white">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-600" /> Direct Messaging
              </h2>
              <span className="text-[10px] text-slate-400 font-semibold uppercase">Farmer - Buyer Conversations</span>
            </div>

            <div className="divide-y divide-slate-200 overflow-y-auto flex-1">
              {conversations.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveChat(c)}
                  className={`w-full text-left p-4 hover:bg-slate-100 transition flex items-start gap-3 ${
                    activeChat.id === c.id ? 'bg-emerald-50 border-l-4 border-emerald-600' : ''
                  }`}
                >
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center text-sm shadow">
                      {c.avatar}
                    </div>
                    {c.online && (
                      <span className="w-3 h-3 rounded-full bg-emerald-500 border-2 border-white absolute bottom-0 right-0"></span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                      <h4 className="text-xs font-bold text-slate-900 truncate">{c.name}</h4>
                      <span className="text-[10px] text-slate-400">{c.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">{c.lastMsg}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right Active Chat Area */}
          <div className="md:col-span-8 flex flex-col bg-white">
            
            {/* Active Chat Header */}
            <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-lg">
                  {activeChat.avatar}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{activeChat.name}</h3>
                  <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Online • Verified Direct Trader
                  </span>
                </div>
              </div>

              {activeChat.productContext && (
                <div className="hidden sm:block bg-emerald-100 text-emerald-900 text-[10px] font-bold px-3 py-1 rounded-full border border-emerald-300">
                  Ref: {activeChat.productContext}
                </div>
              )}
            </div>

            {/* Messages Body */}
            <div className="flex-1 p-6 space-y-4 overflow-y-auto bg-slate-50/50">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex flex-col ${m.isMe ? 'items-end' : 'items-start'}`}
                >
                  <div className={`max-w-md p-3.5 rounded-2xl text-xs space-y-1 shadow-sm ${
                    m.isMe
                      ? 'bg-emerald-600 text-white rounded-br-none'
                      : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none'
                  }`}>
                    <p className="leading-relaxed">{m.text}</p>
                    <span className={`text-[9px] block text-right font-semibold ${m.isMe ? 'text-emerald-200' : 'text-slate-400'}`}>
                      {m.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Box */}
            <form onSubmit={handleSend} className="p-4 border-t border-slate-200 flex gap-2 bg-white">
              <input
                type="text"
                placeholder="Type your message about crop price, quantity, or transport..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-2.5 rounded-xl shadow text-xs flex items-center gap-1 transition"
              >
                <Send className="w-4 h-4" /> Send
              </button>
            </form>

          </div>

        </div>

      </div>
    </div>
  );
};
