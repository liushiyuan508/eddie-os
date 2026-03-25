'use client';

import { useState, useEffect, useRef } from 'react';

const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [spectrum, setSpectrum] = useState(Array(12).fill(0));
  const audioRef = useRef(null);
  const trackSource = '/assets/music/track1.mp3'; // 音频路径

  // 模拟频谱动效
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        const newSpectrum = Array(12).fill(0).map(() => Math.random() * 100);
        setSpectrum(newSpectrum);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="w-full h-full relative">
      {/* iPod 背景图片 */}
      <img 
        src="/assets/player/ipod.png" 
        alt="iPod" 
        className="w-full h-full object-contain"
        style={{ imageRendering: 'pixelated' }}
      />
      
      {/* 屏幕区域内容 */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[70%] h-[60%] flex flex-col items-center justify-center">
        {/* 频谱动效 */}
        <div className="w-full h-16 flex items-end justify-center gap-1 mb-4">
          {spectrum.map((height, index) => (
            <div
              key={index}
              className="w-2 bg-black"
              style={{
                height: `${height}%`,
                minHeight: '2px'
              }}
            />
          ))}
        </div>

        {/* 歌曲信息 */}
        <div className="w-full text-center mb-4">
          <div className="text-sm font-bold text-black">ipod touch</div>
          <div className="text-xs text-gray-700">Now Playing</div>
        </div>
      </div>
      
      {/* 底部播放按钮（对准 iPod 中间的圆形按钮） */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <button
          className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white"
          onClick={togglePlayPause}
          style={{
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
          }}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>
      </div>
      
      {/* 音频元素 */}
      <audio 
        ref={audioRef} 
        src={trackSource} 
        loop
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default Player;