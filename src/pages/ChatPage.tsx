import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getChatPartners, getChatThread, sendChat, markChatsRead, getSession } from '../lib/data';
import { MessageSquare, Send, ArrowLeft, Briefcase } from 'lucide-react';

export default function ChatPage() {
  const navigate = useNavigate();
  const session = getSession();
  const [refreshKey, setRefreshKey] = useState(0);
  const [activePartner, setActivePartner] = useState<{ partnerId: string; jobId: string } | null>(null);
  const [message, setMessage] = useState('');
  const [thread, setThread] = useState<any[]>([]);
  const threadEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!session) navigate('/auth');
  }, [session, navigate]);

  if (!session) return null;

  const refresh = () => setRefreshKey(k => k + 1);
  const partners = getChatPartners(session.id);

  useEffect(() => {
    if (activePartner) {
      setThread(getChatThread(session.id, activePartner.partnerId, activePartner.jobId));
      markChatsRead(session.id, activePartner.partnerId);
      refresh();
    }
  }, [activePartner, session.id, refreshKey]);

  useEffect(() => {
    threadEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [thread]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !activePartner) return;
    const partner = partners.find(p => p.partnerId === activePartner.partnerId && p.jobId === activePartner.jobId);
    sendChat({
      fromId: session.id,
      fromName: session.name,
      toId: activePartner.partnerId,
      toName: partner?.partnerName || '',
      jobId: activePartner.jobId,
      jobTitle: partner?.jobTitle || '',
      text: message.trim(),
    });
    setMessage('');
    setThread(getChatThread(session.id, activePartner.partnerId, activePartner.jobId));
    refresh();
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate(-1)} className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#2554a7]" />
            <h1 className="text-xl font-bold text-gray-900">Messages</h1>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex h-[600px]">
            {/* Partners List */}
            <div className="w-72 border-r border-gray-100 flex flex-col shrink-0">
              <div className="p-4 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900 text-sm">Conversations</h3>
              </div>
              <div className="flex-1 overflow-y-auto">
                {partners.length === 0 ? (
                  <div className="p-6 text-center">
                    <MessageSquare className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                    <p className="text-sm text-gray-400">No conversations yet</p>
                  </div>
                ) : (
                  partners.map((p, i) => (
                    <button
                      key={i}
                      onClick={() => setActivePartner({ partnerId: p.partnerId, jobId: p.jobId })}
                      className={`w-full text-left px-4 py-3.5 border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                        activePartner?.partnerId === p.partnerId && activePartner?.jobId === p.jobId ? 'bg-blue-50 border-l-2 border-l-[#2554a7]' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 font-bold text-xs shrink-0">
                          {p.partnerName.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900 truncate">{p.partnerName}</p>
                            {p.unread > 0 && (
                              <span className="inline-flex items-center justify-center w-5 h-5 bg-[#2554a7] text-white text-xs rounded-full shrink-0">{p.unread}</span>
                            )}
                          </div>
                          <p className="text-xs text-gray-400 truncate flex items-center gap-1">
                            <Briefcase className="w-3 h-3" />{p.jobTitle}
                          </p>
                          <p className="text-xs text-gray-300 truncate mt-0.5">{p.lastMessage}</p>
                        </div>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* Chat Thread */}
            <div className="flex-1 flex flex-col min-w-0">
              {activePartner ? (
                <>
                  {/* Thread Header */}
                  <div className="px-5 py-3.5 border-b border-gray-100 flex items-center gap-3">
                    <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 font-bold text-xs">
                      {partners.find(p => p.partnerId === activePartner.partnerId && p.jobId === activePartner.jobId)?.partnerName.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {partners.find(p => p.partnerId === activePartner.partnerId && p.jobId === activePartner.jobId)?.partnerName}
                      </p>
                      <p className="text-xs text-gray-400 flex items-center gap-1">
                        <Briefcase className="w-3 h-3" />
                        {partners.find(p => p.partnerId === activePartner.partnerId && p.jobId === activePartner.jobId)?.jobTitle}
                      </p>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-5 space-y-3">
                    {thread.length === 0 ? (
                      <div className="text-center py-12 text-gray-400 text-sm">
                        No messages yet. Start the conversation!
                      </div>
                    ) : (
                      thread.map(msg => (
                        <div key={msg.id} className={`flex ${msg.fromId === session.id ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm ${
                            msg.fromId === session.id
                              ? 'bg-[#2554a7] text-white rounded-br-md'
                              : 'bg-gray-100 text-gray-800 rounded-bl-md'
                          }`}>
                            <p className="whitespace-pre-wrap">{msg.text}</p>
                            <p className={`text-[10px] mt-1.5 ${msg.fromId === session.id ? 'text-blue-200' : 'text-gray-400'}`}>
                              {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                    <div ref={threadEndRef} />
                  </div>

                  {/* Send Input */}
                  <form onSubmit={handleSend} className="p-4 border-t border-gray-100 flex gap-2">
                    <input
                      type="text"
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2554a7] focus:border-transparent"
                    />
                    <button
                      type="submit"
                      disabled={!message.trim()}
                      className="bg-[#2554a7] text-white px-5 py-3 rounded-xl text-sm font-medium hover:bg-[#1d3f8a] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      <Send className="w-4 h-4" /> Send
                    </button>
                  </form>
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                  <MessageSquare className="w-12 h-12 mb-3" />
                  <p className="text-sm font-medium">Select a conversation</p>
                  <p className="text-xs mt-1">Choose a chat from the sidebar to start messaging</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
