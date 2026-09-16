import React, { useState, useRef, useEffect } from 'react';
import { AppLayout } from '../components/layout/AppLayout';
import { Send, Bot, User, Sparkles, Trash2 } from 'lucide-react';
import { aiService } from '../services/aiService';
import { chatStorage } from '../services/storageService';

const QUICK_SUGGESTIONS = [
  'Why am I distracted?',
  'Show my worst habit',
  'Give me a study plan',
  'How can I reduce screen time?',
  'Start a focus session',
  'Evening scrolling advice',
];

function renderMarkdown(text) {
  const lines = text.split('\n');
  return lines.map((line, i) => {
    const parts = line.split(/(\*\*[^*]+\*\*)/);
    return (
      <p key={i} className={line === '' ? 'my-1' : 'mb-1'}>
        {parts.map((part, j) =>
          part.startsWith('**') && part.endsWith('**') ? (
            <strong key={j} className="font-bold text-slate-900 dark:text-white">{part.slice(2, -2)}</strong>
          ) : (
            <span key={j}>{part}</span>
          )
        )}
      </p>
    );
  });
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      <span className="typing-dot w-2 h-2 bg-primary-400 rounded-full"></span>
      <span className="typing-dot w-2 h-2 bg-primary-400 rounded-full"></span>
      <span className="typing-dot w-2 h-2 bg-primary-400 rounded-full"></span>
    </div>
  );
}

const INITIAL_MESSAGE = {
  id: 'init',
  role: 'assistant',
  content: "Hi Kamali! 👋 I'm your **FocusAI Coach**. I've analyzed your phone usage data and I'm ready to help you build better digital habits.\n\nYour **Focus Score today is 78/100** — up 12% from yesterday! 🎉\n\nWhat would you like to work on?",
  timestamp: Date.now(),
};

export default function AIChatPage() {
  const [messages, setMessages] = useState(() => {
    const saved = chatStorage.getHistory();
    return saved.length > 0 ? saved : [INITIAL_MESSAGE];
  });
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    chatStorage.saveHistory(messages);
  }, [messages]);

  const sendMessage = async (text) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    const userMsg = { id: Date.now(), role: 'user', content: trimmed, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await aiService.generateResponse(trimmed, messages);
      const aiMsg = { id: Date.now() + 1, role: 'assistant', content: response, timestamp: Date.now() };
      setMessages(prev => [...prev, aiMsg]);
    } catch (e) {
      const errMsg = { id: Date.now() + 1, role: 'assistant', content: 'Sorry, I had trouble generating a response. Please try again!', timestamp: Date.now() };
      setMessages(prev => [...prev, errMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const clearChat = () => {
    setMessages([INITIAL_MESSAGE]);
    chatStorage.clearHistory();
  };

  return (
    <AppLayout title="AI Coach">
      <div className="max-w-2xl mx-auto flex flex-col" style={{ height: 'calc(100vh - 160px)', minHeight: '500px' }}>
        {/* Header */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-700 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center">
                <Bot size={20} className="text-white" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900 dark:text-white">FocusAI Coach</h2>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Online</p>
                </div>
              </div>
            </div>
            <button
              onClick={clearChat}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
            >
              <Trash2 size={12} /> Clear
            </button>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">
            Your personal guide for healthier phone habits. Ask me anything about your usage patterns.
          </p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-1 scrollbar-hide">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 animate-fade-in ${
                msg.role === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                msg.role === 'user'
                  ? 'bg-primary-600'
                  : 'bg-gradient-to-br from-primary-500 to-violet-600'
              }`}>
                {msg.role === 'user'
                  ? <User size={14} className="text-white" />
                  : <Sparkles size={14} className="text-white" />
                }
              </div>
              <div className={`max-w-[80%] ${
                msg.role === 'user' ? 'items-end' : 'items-start'
              } flex flex-col`}>
                <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-primary-600 text-white rounded-tr-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-100 dark:border-slate-700 rounded-tl-sm shadow-sm'
                }`}>
                  {msg.role === 'assistant' ? renderMarkdown(msg.content) : msg.content}
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-violet-600 flex items-center justify-center flex-shrink-0">
                <Sparkles size={14} className="text-white" />
              </div>
              <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl rounded-tl-sm shadow-sm">
                <TypingIndicator />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Quick suggestions */}
        <div className="flex flex-wrap gap-2 mb-3">
          {QUICK_SUGGESTIONS.map(s => (
            <button
              key={s}
              onClick={() => sendMessage(s)}
              disabled={isTyping}
              className="text-xs font-medium px-3 py-1.5 bg-primary-50 dark:bg-primary-900/20 hover:bg-primary-100 dark:hover:bg-primary-900/40 text-primary-700 dark:text-primary-400 rounded-full border border-primary-200 dark:border-primary-800 transition-colors disabled:opacity-50"
            >
              {s}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-end gap-3 p-3">
          <textarea
            ref={inputRef}
            rows={1}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me about your phone habits..."
            className="flex-1 resize-none bg-transparent text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none max-h-32 scrollbar-hide"
            style={{ lineHeight: '1.5' }}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isTyping}
            className="flex-shrink-0 w-9 h-9 bg-primary-600 hover:bg-primary-700 disabled:opacity-40 text-white rounded-xl flex items-center justify-center transition-all duration-200 active:scale-95"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </AppLayout>
  );
}
