'use client';

import { useState, useEffect, useRef } from 'react';

const Player = ({ playerState, setPlayerState }) => {
  const [spectrum, setSpectrum] = useState(Array(12).fill(0));
  const audioRef = useRef(null);
  const trackSource = '/assets/music/track1.mp3'; // 音频路径

  // 初始化音频元素
  useEffect(() => {
    if (!playerState.audioElement) {
      const audioElement = new Audio(trackSource);
      audioElement.loop = true;
      setPlayerState({ ...playerState, audioElement });
      audioRef.current = audioElement;
    } else {
      audioRef.current = playerState.audioElement;
    }
  }, []);

  // 模拟频谱动效
  useEffect(() => {
    let interval;
    if (playerState.isPlaying) {
      interval = setInterval(() => {
        const newSpectrum = Array(12).fill(0).map(() => Math.random() * 100);
        setSpectrum(newSpectrum);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [playerState.isPlaying]);

  const togglePlayPause = () => {
    if (playerState.audioElement) {
      if (playerState.isPlaying) {
        playerState.audioElement.pause();
      } else {
        playerState.audioElement.play();
      }
      setPlayerState({ ...playerState, isPlaying: !playerState.isPlaying });
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      {/* iPod 容器 */}
      <div className="w-4/5 h-4/5 relative" style={{ width: '160px', height: '240px' }}>
        {/* iPod 背景图片 - 最底层 */}
        <img 
          src="/assets/player/ipod.png" 
          alt="iPod" 
          className="w-full h-full object-contain"
          style={{ 
            imageRendering: 'pixelated',
            zIndex: 1
          }}
        />
        
        {/* 屏幕区域内容 - 上层 */}
        <div 
          className="absolute flex flex-col items-center justify-center"
          style={{
            top: '25%',
            left: '15%',
            width: '70%',
            height: '40%',
            zIndex: 10
          }}
        >
          {/* 频谱动效 */}
          <div className="w-full h-12 flex items-end justify-center gap-1 mb-2">
            {spectrum.map((height, index) => (
              <div
                key={index}
                className="w-1.5 bg-black"
                style={{
                  height: `${height}%`,
                  minHeight: '2px'
                }}
              />
            ))}
          </div>

          {/* 歌曲信息 */}
          <div className="w-full text-center mb-2">
            <div className="text-xs font-bold text-black">ipod touch</div>
            <div className="text-[10px] text-gray-700">Now Playing</div>
          </div>
        </div>
        
        {/* 底部播放按钮（对准 iPod 中间的圆形按钮） - 上层 */}
        <div 
          className="absolute"
          style={{
            bottom: '20%',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10
          }}
        >
          <button
            className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white"
            onClick={togglePlayPause}
            style={{
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
            }}
          >
            {playerState.isPlaying ? '⏸' : '▶'}
          </button>
        </div>
      </div>
      

    </div>
  );
};

export default Player;