import { useState } from 'react';

interface SlackProps {
  onClose: () => void;
}

interface Channel {
  id: string;
  name: string;
  unread: number;
}

interface Message {
  id: string;
  author: string;
  avatar: string;
  content: string;
  time: string;
  reactions?: { emoji: string; count: number }[];
}

const mockChannels: Channel[] = [
  { id: '1', name: 'general', unread: 0 },
  { id: '2', name: 'engineering', unread: 3 },
  { id: '3', name: 'design', unread: 0 },
  { id: '4', name: 'random', unread: 12 },
  { id: '5', name: 'announcements', unread: 1 },
];

const mockMessages: Message[] = [
  { id: '1', author: 'Sarah', avatar: '👩‍💻', content: 'Good morning team! 🌅', time: '9:00 AM' },
  { id: '2', author: 'Mike', avatar: '👨‍💼', content: 'Morning! Ready for the standup?', time: '9:02 AM', reactions: [{ emoji: '👍', count: 3 }] },
  { id: '3', author: 'Emily', avatar: '👩‍🎨', content: 'Just pushed the new designs to Figma. Check them out when you get a chance!', time: '9:15 AM', reactions: [{ emoji: '🎉', count: 5 }, { emoji: '❤️', count: 2 }] },
  { id: '4', author: 'Dev Bot', avatar: '🤖', content: '✅ Build #1234 passed on main', time: '9:30 AM' },
];

const Slack: React.FC<SlackProps> = ({ onClose: _onClose }) => {
  const [channels] = useState(mockChannels);
  const [messages] = useState(mockMessages);
  const [selectedChannel, setSelectedChannel] = useState('1');
  const [newMessage, setNewMessage] = useState('');

  return (
    <div className="h-full flex bg-white">
      {/* Workspace Sidebar */}
      <div className="w-16 bg-[#3f0e40] flex flex-col items-center py-3 gap-2">
        <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center text-white font-bold cursor-pointer hover:bg-white/30">
          H
        </div>
        <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-white/60 cursor-pointer hover:bg-white/20">
          +
        </div>
      </div>

      {/* Channel Sidebar */}
      <div className="w-64 bg-[#3f0e40] text-white flex flex-col">
        <div className="px-4 py-3 flex items-center justify-between">
          <span className="font-bold">Hanzo AI</span>
          <button className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center">
            ✏️
          </button>
        </div>

        <div className="px-2 mb-2">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-3 py-1.5 bg-white/10 rounded text-sm placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-white/30"
          />
        </div>

        <div className="flex-1 overflow-auto">
          <div className="px-3 py-2 text-sm text-white/70">Channels</div>
          {channels.map(channel => (
            <div
              key={channel.id}
              onClick={() => setSelectedChannel(channel.id)}
              className={`flex items-center justify-between px-4 py-1.5 cursor-pointer transition-colors
                ${selectedChannel === channel.id ? 'bg-[#1264a3] text-white' : 'text-white/70 hover:bg-white/10'}
              `}
            >
              <span className="flex items-center gap-2">
                <span className="text-white/50">#</span>
                {channel.name}
              </span>
              {channel.unread > 0 && (
                <span className="bg-[#cd2553] text-white text-xs px-1.5 rounded-full">
                  {channel.unread}
                </span>
              )}
            </div>
          ))}

          <div className="px-3 py-2 text-sm text-white/70 mt-4">Direct Messages</div>
          <div className="px-4 py-1.5 flex items-center gap-2 text-white/70 hover:bg-white/10 cursor-pointer">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            Sarah Chen
          </div>
          <div className="px-4 py-1.5 flex items-center gap-2 text-white/70 hover:bg-white/10 cursor-pointer">
            <span className="w-2 h-2 rounded-full bg-gray-500" />
            Mike Johnson
          </div>
        </div>
      </div>

      {/* Main Chat */}
      <div className="flex-1 flex flex-col bg-white">
        <div className="h-14 px-4 flex items-center justify-between border-b">
          <div className="flex items-center gap-2">
            <span className="text-gray-400">#</span>
            <span className="font-bold">{channels.find(c => c.id === selectedChannel)?.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded">📌</button>
            <button className="p-2 hover:bg-gray-100 rounded">⚙️</button>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-4 space-y-4">
          {messages.map(msg => (
            <div key={msg.id} className="flex gap-3 hover:bg-gray-50 p-2 rounded -mx-2">
              <div className="w-9 h-9 rounded bg-gray-200 flex items-center justify-center text-lg shrink-0">
                {msg.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="font-bold">{msg.author}</span>
                  <span className="text-xs text-gray-400">{msg.time}</span>
                </div>
                <p className="text-gray-800">{msg.content}</p>
                {msg.reactions && (
                  <div className="flex gap-1 mt-1">
                    {msg.reactions.map((r, i) => (
                      <span key={i} className="px-2 py-0.5 bg-gray-100 rounded-full text-sm">
                        {r.emoji} {r.count}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4">
          <div className="border rounded-lg">
            <div className="flex items-center gap-2 p-2 border-b bg-gray-50">
              <button className="p-1 hover:bg-gray-200 rounded">B</button>
              <button className="p-1 hover:bg-gray-200 rounded italic">I</button>
              <button className="p-1 hover:bg-gray-200 rounded">🔗</button>
              <button className="p-1 hover:bg-gray-200 rounded">📋</button>
            </div>
            <input
              type="text"
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              placeholder={`Message #${channels.find(c => c.id === selectedChannel)?.name}`}
              className="w-full p-3 focus:outline-none"
            />
            <div className="flex items-center justify-between p-2 border-t">
              <div className="flex gap-1">
                <button className="p-1.5 hover:bg-gray-100 rounded">➕</button>
                <button className="p-1.5 hover:bg-gray-100 rounded">😊</button>
                <button className="p-1.5 hover:bg-gray-100 rounded">@</button>
              </div>
              <button className="px-3 py-1 bg-[#007a5a] text-white rounded font-medium text-sm hover:bg-[#006a4e]">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slack;
