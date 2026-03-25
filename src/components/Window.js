'use client';

import { motion } from 'framer-motion';

const Window = ({ title, content, isOpen, onClose, onMinimize = () => {}, position = { x: 0, y: 0 }, style = {} }) => {
  if (!isOpen) return null;

  // 计算默认居中位置
  const getWidth = () => {
    if (style?.width && typeof style.width === 'string') {
      return parseInt(style.width);
    }
    return style?.width || 450;
  };

  const getHeight = () => {
    if (style?.height && typeof style.height === 'string') {
      return parseInt(style.height);
    }
    return style?.height || 350;
  };

  // 只在客户端计算默认位置
  const defaultPosition = typeof window !== 'undefined' ? {
    x: window.innerWidth / 2 - getWidth() / 2,
    y: window.innerHeight / 2 - getHeight() / 2
  } : {
    x: 0,
    y: 0
  };

  // 使用传入的位置或默认居中位置
  const finalPosition = position || defaultPosition;

  return (
    <motion.div
      className={`window ${style?.rounded ? 'rounded-full' : ''}`}
      initial={{ x: finalPosition.x, y: finalPosition.y, opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      drag
      dragConstraints={{ left: 0, right: typeof window !== 'undefined' ? window.innerWidth - (style?.width || 600) : 400, top: 0, bottom: typeof window !== 'undefined' ? window.innerHeight - (style?.height || 400) : 400 }}
      style={{
        left: finalPosition.x,
        top: finalPosition.y,
        width: '80%',
        maxWidth: '900px',
        height: '70vh',
        ...style,
      }}
    >
      <div className="window-bar">
        <div className="window-title">{title} //:ERR_MEM_ALLOC</div>
        <div className="flex gap-2">
          <div className="window-button" onClick={onMinimize}>_</div>
          <div className="window-button">□</div>
          <div className="window-button" onClick={onClose}>X</div>
        </div>
      </div>
      <div className="window-content custom-scrollbar">
        {content}
      </div>
    </motion.div>
  );
};

export default Window;