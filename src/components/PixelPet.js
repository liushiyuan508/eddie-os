'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const PixelPet = () => {
  const [showBubble, setShowBubble] = useState(false);
  const [bubbleText, setBubbleText] = useState('');
  const [isJumping, setIsJumping] = useState(false);

  // 随机气泡文字
  const bubbleTexts = [
    '[SYSTEM_STATUS: NORMAL]',
    '[SOCIETY_OBSERVING...]',
    '[FEED_ME_DATA]'
  ];

  // 处理点击事件
  const handlePetClick = () => {
    const randomText = bubbleTexts[Math.floor(Math.random() * bubbleTexts.length)];
    setBubbleText(randomText);
    setShowBubble(true);
    
    // 2秒后自动隐藏气泡
    setTimeout(() => {
      setShowBubble(false);
    }, 2000);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <h2 className="text-lg font-bold mb-4">[rourou]</h2>
      
      {/* 像素风格宠物 */}
      <div className="relative mb-4">
        {/* 宠物主体 */}
        <motion.div 
          className="relative cursor-pointer"
          onClick={handlePetClick}
          animate={{ 
            scale: [1, 1.05, 1],
            y: isJumping ? [-20, 0] : 0
          }}
          transition={{ 
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            y: { duration: 0.5, ease: "easeOut" }
          }}
          onAnimationComplete={() => setIsJumping(false)}
        >
          <img 
            src="/assets/pet/pet.png" 
            alt="Pixel Pet" 
            className="w-32 h-32 object-contain"
            style={{ imageRendering: 'pixelated' }}
          />
          
          {/* 气泡 */}
          {showBubble && (
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full mb-2 bg-white border-2 border-black p-2 text-xs font-mono w-48 text-center">
              {bubbleText}
            </div>
          )}
        </motion.div>
      </div>
      
      {/* 控制按钮 */}
      <div className="flex gap-2 mb-4">
        <button 
          className="web10-button"
          onClick={() => setIsJumping(true)}
        >
          [JUMP]
        </button>
      </div>
      
      {/* 状态信息 */}
      <div className="mt-4 text-sm font-mono">
        <p>//:PET_STATUS: ACTIVE</p>
        <p>//:MOOD: HAPPY</p>
      </div>
    </div>
  );
};

export default PixelPet;