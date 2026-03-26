'use client';

import { useState, useEffect, useRef } from 'react';

const JumpGame = () => {
  // 游戏状态
  const [tick, setTick] = useState(0); // 强制重绘的 Ticker
  const [highScore, setHighScore] = useState(0);
  const [scoreAnimation, setScoreAnimation] = useState(false); // 分数动画状态
  
  // 使用Ref存储分数，确保游戏循环能获取最新值
  const scoreRef = useRef(0);
  
  // 游戏配置
  const gameWidth = 300;
  const gameHeight = 400;
  const gravity = 0.15; // 极低重力，营造月球漂浮感
  const moveSpeed = 3; // 降低移动速度，保持视觉协调
  const platformSpeed = 1; // 平台慢速移动，营造漂浮感
  const maxFallSpeed = 4; // 极低速上限，确保不会突然加速下落
  
  // 玩家尺寸（star.png 放大 50%）
  const PLAYER_WIDTH = 30; // 20 * 1.5
  const PLAYER_HEIGHT = 45; // 30 * 1.5
  
  // 背景滚动
  const backgroundYRef = useRef(0);
  
  // Ref 驱动物理引擎 - 所有位置数据使用 useRef
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const requestRef = useRef();
  
  // 玩家位置
  const playerPosRef = useRef({
    x: 150,
    y: 100,
    width: PLAYER_WIDTH,
    height: PLAYER_HEIGHT,
    velocityY: 0
  });
  
  // 平台数组
  const platformsRef = useRef([]);
  
  // 游戏运行状态
  const isRunningRef = useRef(false);
  
  // 键盘状态
  const keysRef = useRef({ left: false, right: false });
  
  // 游戏数据
  const gameDataRef = useRef({
    frameCount: 0,
    lastScore: 0,
    platformSpeed: 2,
    maxPlatformWidth: 200
  });
  
  // 初始化游戏
  useEffect(() => {
    // 加载最高分
    const savedHighScore = localStorage.getItem('jumpGameHighScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore));
    }
    
    // 强制焦点
    if (containerRef.current) {
      containerRef.current.focus();
    }
    
    // 使用全局 Window 监听器
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      // 清理
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);
  
  // 预加载背景图片
  useEffect(() => {
    const preloadImage = new Image();
    preloadImage.src = '/assets/game/background1.png';
    preloadImage.onload = () => {
      console.log('背景图片加载成功');
    };
    preloadImage.onerror = () => {
      console.error('背景图片加载失败');
    };
  }, []);
  
  // 处理键盘按下
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'a') {
      keysRef.current.left = true;
    } else if (e.key === 'ArrowRight' || e.key === 'd') {
      keysRef.current.right = true;
    }
  };
  
  // 处理键盘释放
  const handleKeyUp = (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'a') {
      keysRef.current.left = false;
    } else if (e.key === 'ArrowRight' || e.key === 'd') {
      keysRef.current.right = false;
    }
  };
  
  // 初始化平台
  const initializePlatforms = () => {
    const initialPlatforms = [];
    
    // 初始平台（玩家开始的平台）
    initialPlatforms.push({
      x: 50,
      y: 150,
      width: 200,
      height: 10,
      isScored: false
    });
    
    // 预生成 5 个平台，拉开垂直间距
    for (let i = 0; i < 5; i++) {
      initialPlatforms.push({
        x: 20 + Math.random() * (gameWidth - 100), // 左右各留20px操作空间
        y: 150 + (i + 1) * 120, // 增加垂直间距，营造空旷感
        width: 80 + Math.random() * 120,
        height: 10,
        isScored: false
      });
    }
    
    platformsRef.current = initialPlatforms;
  };
  
  // 游戏循环
  const gameLoop = () => {
    // 渲染游戏（无论是否运行）
    renderGame();
    
    // 强制重绘：通知 React 更新画面
    setTick(t => t + 1);
    
    // 如果游戏没有运行，直接返回
    if (!isRunningRef.current) {
      requestRef.current = requestAnimationFrame(gameLoop);
      return;
    }
    
    // 物理引擎逻辑
    updateGame();
    
    // 背景滚动：随平台上升速度的一半缓慢向上滚动
    if (isRunningRef.current) {
      backgroundYRef.current += gameDataRef.current.platformSpeed / 2;
      // 重置背景位置，避免无限增长
      if (backgroundYRef.current >= gameHeight) {
        backgroundYRef.current = 0;
      }
    }
    
    // 继续循环
    requestRef.current = requestAnimationFrame(gameLoop);
  };
  
  // 更新游戏状态
  const updateGame = () => {
    const player = playerPosRef.current;
    const platforms = platformsRef.current;
    const gameData = gameDataRef.current;
    
    // 更新平台位置
    const updatedPlatforms = platforms.map(platform => ({
      ...platform,
      y: platform.y - gameData.platformSpeed
    }));
    
    // 移除超出屏幕的平台
    const filteredPlatforms = updatedPlatforms.filter(platform => platform.y + platform.height > 0);
    
    // 每60帧生成一个新平台，进一步拉开垂直间距，营造空旷感
    gameData.frameCount++;
    if (gameData.frameCount % 60 === 0) {
      // 确保平台在窗口底部随机生成的X轴范围合理，留出操作空间
      const newPlatform = {
        x: 20 + Math.random() * (gameWidth - 100), // 左右各留20px操作空间
        y: gameHeight,
        width: 60 + Math.random() * (gameData.maxPlatformWidth - 60),
        height: 10,
        isScored: false
      };
      platformsRef.current = [...filteredPlatforms, newPlatform];
    } else {
      platformsRef.current = filteredPlatforms;
    }
    
    // 应用重力
    let newVelocityY = player.velocityY + gravity;
    // 限制最大下落速度
    newVelocityY = Math.min(newVelocityY, maxFallSpeed);
    let newY = player.y + newVelocityY;
    let newX = player.x;
    let platformHit = false;
    
    // 左右移动
    if (keysRef.current.left) {
      newX -= moveSpeed;
    }
    if (keysRef.current.right) {
      newX += moveSpeed;
    }
    
    // 屏幕环绕
    if (newX < -player.width) {
      newX = gameWidth;
    } else if (newX > gameWidth) {
      newX = -player.width;
    }
    
    // 碰撞检测
    let onPlatform = false;
    let currentPlatform = null;
    
    // 重置所有平台的调试颜色
    platformsRef.current.forEach(platform => {
      delete platform.debugColor;
    });
    
    // 遍历所有平台进行检测
    platformsRef.current.forEach(platform => {
      // 容错间距：5像素缓冲
      const tolerance = 5;
      
      // 碰撞触发条件 - 必须同时满足四个条件
      if (
        // 条件1：垂直位置：方块底部刚好到达或略微超过平台顶部
        newY + player.height >= platform.y - tolerance &&
        newY + player.height <= platform.y + tolerance &&
        // 条件2：下落状态：方块当前正在向下掉
        newVelocityY > 0 &&
        // 条件3：左边界锁定：方块的右边缘必须大于平台的左边缘
        player.x + player.width > platform.x &&
        // 条件4：右边界锁定：方块的左边缘必须小于平台的右边缘
        player.x < platform.x + platform.width
      ) {
        // 吸附逻辑：将方块吸附到平台顶部
        newY = platform.y - player.height;
        newVelocityY = 0;
        platformHit = true;
        onPlatform = true;
        currentPlatform = platform;
        // 强化变色反馈：踩中的平台变为亮绿色
        currentPlatform.debugColor = '#00FF00';
        
        // 唯一性计分：只有当平台未被计分过时才计分
        if (!currentPlatform.isScored) {
          // 使用Ref更新分数，确保游戏循环能获取最新值
          scoreRef.current += 5;
          // 触发分数动画
          setScoreAnimation(true);
          setTimeout(() => setScoreAnimation(false), 300);
          currentPlatform.isScored = true;
          
          // 难度联动：每当分数达到100的倍数，增加难度
          if (scoreRef.current % 100 === 0) {
            // 增加平台上升速度10%
            gameData.platformSpeed *= 1.1;
            // 缩小新生成平台的宽度
            gameData.maxPlatformWidth = Math.max(60, gameData.maxPlatformWidth * 0.95);
          }
        }
      }
    });
    
    // 即时脱离逻辑：只要方块滑出平台边缘，立即下落
    if (onPlatform && currentPlatform) {
      // 再次检查X轴条件
      const isOnPlatformX = (player.x + player.width > currentPlatform.x) &&
                           (player.x < currentPlatform.x + currentPlatform.width);
      
      if (isOnPlatformX) {
        // 方块随平台同步上升
        newY -= gameData.platformSpeed;
      } else {
        // 移出平台范围，立即释放重力
        onPlatform = false;
        currentPlatform = null;
      }
    }
    
    // 检查是否触顶或坠落
    if (newY < 0 || newY > gameHeight) {
      // 游戏结束
      isRunningRef.current = false;
      // 更新最高分
      if (scoreRef.current > highScore) {
        setHighScore(scoreRef.current);
        localStorage.setItem('jumpGameHighScore', scoreRef.current.toString());
      }
    }
    

    
    // 更新玩家状态
    playerPosRef.current = {
      ...player,
      x: newX,
      y: newY,
      velocityY: newVelocityY
    };
  };
  
  // 渲染游戏
  const renderGame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    // 清空画布
    ctx.clearRect(0, 0, gameWidth, gameHeight);
    
    // 绘制平台
    platformsRef.current.forEach(platform => {
      // 平台样式：完全不透明的实心块
      ctx.fillStyle = platform.debugColor || '#FFFFFF';
      ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
    });
    
    // 绘制玩家
    const player = playerPosRef.current;
    
    // 保存当前状态
    ctx.save();
    
    // 镜像逻辑：按下左键时翻转，按下右键时恢复
    if (keysRef.current.left) {
      ctx.scale(-1, 1);
      ctx.drawImage(
        document.getElementById('star-image'),
        -player.x - player.width,
        player.y,
        player.width,
        player.height
      );
    } else {
      ctx.drawImage(
        document.getElementById('star-image'),
        player.x,
        player.y,
        player.width,
        player.height
      );
    }
    
    // 恢复状态
    ctx.restore();
  };
  
  // 开始游戏
  const startGame = () => {
    // 重置游戏状态
    scoreRef.current = 0;
    
    // 重置游戏数据
    gameDataRef.current = {
      frameCount: 0,
      lastScore: 0,
      platformSpeed: 1, // 平台慢速移动，营造漂浮感
      maxPlatformWidth: 200
    };
    
    // 重置玩家位置
    playerPosRef.current = {
      x: 150,
      y: 100,
      width: PLAYER_WIDTH,
      height: PLAYER_HEIGHT,
      velocityY: 0
    };
    
    // 初始化平台
    initializePlatforms();
    
    // 设置游戏运行状态
    isRunningRef.current = true;
    
    // 启动游戏循环
    if (!requestRef.current) {
      gameLoop();
    }
  };
  
  // 重新开始游戏
  const restartGame = () => {
    // 停止游戏
    isRunningRef.current = false;
    
    // 重置分数
    scoreRef.current = 0;
  };
  
  return (
    <div 
      ref={containerRef}
      tabIndex={0}
      className="w-full min-h-[500px] flex flex-col items-center relative z-50 overflow-hidden"
      style={{
        backgroundImage: `url('/assets/game/background1.png')`,
        backgroundSize: 'cover',
        backgroundPositionY: `${backgroundYRef.current}px`,
        backgroundRepeat: 'repeat-y'
      }}
    >
      <h2 className="text-lg font-bold mb-2 text-white text-shadow-lg">[跳格子游戏]</h2>
      
      {/* 得分显示 */}
      <div className="flex justify-between w-full px-4 mb-2 text-sm font-mono">
        <div 
          className={`transition-transform duration-200 ${scoreAnimation ? 'scale-110' : 'scale-100'} text-white text-shadow-md`}
          id="score-display"
        >
          分数: {scoreRef.current}
        </div>
        <div className="text-white text-shadow-md">最高分: {highScore}</div>
      </div>
      
      {/* 游戏画布 */}
      <canvas
        ref={canvasRef}
        width={gameWidth}
        height={gameHeight}
        className="border-2 border-black bg-transparent z-50"
      />
      
      {/* 隐藏的star图片元素 */}
      <img 
        id="star-image" 
        src="/assets/game/star.png" 
        alt="Star" 
        className="hidden"
        style={{ display: 'none' }}
      />
      
      {/* 开始遮罩层 */}
      {!isRunningRef.current && scoreRef.current === 0 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 z-100 pointer-events-auto">
          <h3 className="text-xl font-bold text-white mb-4">跳格子游戏</h3>
          <p className="text-white mb-2">使用 ← → 或 A D 键移动</p>
          <p className="text-white mb-4">主动向下跳寻找新平台</p>
          <button
            className="z-50 pointer-events-auto bg-green-500 border-2 border-black text-white font-bold py-2 px-4"
            onClick={startGame}
          >
            游戏开始
          </button>
        </div>
      )}
      
      {/* 游戏结束界面 */}
      {!isRunningRef.current && scoreRef.current > 0 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 z-100 pointer-events-auto">
          <h3 className="text-xl font-bold text-white mb-4">游戏结束</h3>
          <p className="text-white mb-2">最终分数: {scoreRef.current}</p>
          {scoreRef.current > highScore && (
            <p className="text-yellow-400 mb-4">新纪录！</p>
          )}
          <button
            className="z-50 pointer-events-auto bg-green-500 border-2 border-black text-white font-bold py-2 px-4"
            onClick={restartGame}
          >
            再来一局
          </button>
        </div>
      )}
      
      {/* 游戏说明 */}
      <div className="mt-4 text-xs font-mono text-white text-shadow-md">
        <p>使用 ← → 或 A D 键移动</p>
        <p>主动向下跳寻找新平台</p>
        <p>触顶或坠落游戏结束</p>
        <p>分数越高，速度越快，平台越窄</p>
      </div>
    </div>
  );
};

export default JumpGame;