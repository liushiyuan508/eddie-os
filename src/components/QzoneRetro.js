'use client';

import { useState } from 'react';

const QzoneRetro = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      username: '劉詩源',
      avatar: '/assets/persona/p1.png',
      content: '今天去了公園，天氣很好！心情也跟著變好了～',
      image: '/assets/persona/p1.png',
      time: '2026-03-25 12:30',
      device: 'N97'
    },
    {
      id: 2,
      username: '劉詩源',
      avatar: '/assets/persona/p1.png',
      content: '分享一張最近拍的照片，覺得很有意境～',
      image: '/assets/persona/p2.png',
      time: '2026-03-24 18:45',
      device: 'N97'
    },
    {
      id: 3,
      username: '劉詩源',
      avatar: '/assets/persona/p1.png',
      content: '今天學會了做新菜，超級好吃！',
      image: '/assets/persona/p3.png',
      time: '2026-03-23 20:15',
      device: 'N97'
    }
  ]);
  
  const [newPost, setNewPost] = useState('');
  const [showImage, setShowImage] = useState(null);

  const handlePostSubmit = () => {
    if (newPost.trim()) {
      const post = {
        id: Date.now(),
        username: '劉詩源',
        avatar: '/assets/persona/p1.png',
        content: newPost,
        image: '/assets/persona/p1.png',
        time: new Date().toLocaleString('zh-TW'),
        device: 'N97'
      };
      setPosts([post, ...posts]);
      setNewPost('');
    }
  };

  return (
    <div className="w-full h-full bg-white/80">
      {/* 空间装扮横幅 */}
      <div className="w-full h-24 bg-gradient-to-r from-yellow-300 to-orange-400 border-b-2 border-black flex items-center justify-center">
        <h1 className="text-2xl font-bold text-black">//.個人動態_</h1>
      </div>

      {/* 发表说说 */}
      <div className="p-4 border-b-2 border-black">
        <div className="flex gap-4">
          <img 
            src="/assets/persona/p1.png" 
            alt="Avatar" 
            className="w-12 h-12 object-contain"
            style={{ imageRendering: 'pixelated' }}
          />
          <div className="flex-1">
            <textarea 
              className="w-full border-2 border-black p-2 bg-white font-mono text-sm" 
              placeholder="分享你的心情..." 
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              rows={3}
            />
            <div className="flex justify-end mt-2">
              <button 
                className="bg-blue-500 text-white px-4 py-1 border-2 border-black hover:bg-blue-600"
                onClick={handlePostSubmit}
              >
                [發表]
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 动态流 */}
      <div className="p-4 overflow-y-auto custom-scrollbar" style={{ height: 'calc(100% - 300px)' }}>
        {posts.map((post) => (
          <div key={post.id} className="mb-6 border-2 border-black p-4 bg-white">
            <div className="flex items-center gap-2 mb-2">
              <img 
                src={post.avatar} 
                alt="Avatar" 
                className="w-10 h-10 object-contain"
                style={{ imageRendering: 'pixelated' }}
              />
              <div className="flex items-center gap-1">
                <span className="font-bold">{post.username}</span>
                <span className="text-yellow-500">⭐</span> {/* 黄钻等级 */}
              </div>
            </div>
            <div className="mb-3 font-mono text-sm">{post.content}</div>
            {post.image && (
              <div className="mb-3 cursor-pointer" onClick={() => setShowImage(post.image)}>
                <img 
                  src={post.image} 
                  alt="Post" 
                  className="w-full max-w-md border border-black"
                  style={{ imageRendering: 'pixelated' }}
                />
              </div>
            )}
            <div className="text-xs text-gray-500">
              {post.time} 來自 {post.device}
            </div>
          </div>
        ))}
      </div>

      {/* 留言板 */}
      <div className="fixed bottom-0 left-0 right-0 border-t-2 border-black bg-white/90 p-4">
        <h3 className="font-bold mb-2">留言板</h3>
        <div className="flex flex-wrap gap-2">
          <div className="bg-gray-100 border border-black px-3 py-1 text-sm">[記得回踩哦]</div>
          <div className="bg-gray-100 border border-black px-3 py-1 text-sm">[最近好嗎？]</div>
          <div className="bg-gray-100 border border-black px-3 py-1 text-sm">[來看看你～]</div>
          <div className="bg-gray-100 border border-black px-3 py-1 text-sm">[加油！]</div>
        </div>
      </div>

      {/* 图片预览 */}
      {showImage && (
        <div 
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setShowImage(null)}
        >
          <img 
            src={showImage} 
            alt="Preview" 
            className="max-w-[80%] max-h-[80%] border-2 border-white"
            style={{ imageRendering: 'pixelated' }}
          />
        </div>
      )}
    </div>
  );
};

export default QzoneRetro;