'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Window from '../components/Window';
import Minesweeper from '../components/Minesweeper';
import Player from '../components/Player';
import QzoneRetro from '../components/QzoneRetro';
import PixelPet from '../components/PixelPet';
import PersonaShow from '../components/PersonaShow';
import MyComputer from '../components/MyComputer';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openWindows, setOpenWindows] = useState({
    myComputer: false,
    minesweeper: false,
    player: false,
    qzoneRetro: false,
    pixelPet: false,
    personaShow: false,
  });
  const [isInverted, setIsInverted] = useState(false);
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [activePersona, setActivePersona] = useState(null);
  const [showPersonaBubble, setShowPersonaBubble] = useState(false);

  // @ts-ignore
  const toggleWindow = (windowName: any) => {
    setOpenWindows(prev => ({
      ...prev,
      [windowName]: !prev[windowName]
    }));
  };

  const handleEnter = () => {
    setIsLoggedIn(true);
  };

  // 处理角色选择
  const handlePersonaSelect = (persona) => {
    setActivePersona(persona);
  };

  const handleMineHit = () => {
    // 触发背景反色效果
    setIsInverted(true);
    setTimeout(() => {
      setIsInverted(false);
    }, 500);
  };

  // 处理背景反色效果
  useEffect(() => {
    if (isInverted) {
      document.body.classList.add('inverted');
    } else {
      document.body.classList.remove('inverted');
    }
    return () => {
      document.body.classList.remove('inverted');
    };
  }, [isInverted]);

  // 处理气泡自动消失
  useEffect(() => {
    if (showPersonaBubble) {
      const timer = setTimeout(() => {
        setShowPersonaBubble(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showPersonaBubble]);

  const windowContents = {
    myComputer: (
      <MyComputer />
    ),

    minesweeper: (
      <Minesweeper onMineHit={handleMineHit} />
    ),
    player: (
      <Player />
    ),
    qzoneRetro: (
      <QzoneRetro />
    ),
    pixelPet: (
      <PixelPet />
    ),
    personaShow: (
      <PersonaShow onPersonaSelect={handlePersonaSelect} />
    ),
  };

  return (
    <AnimatePresence>
      {!isLoggedIn ? (
        <div className="w-full h-screen bg-white relative">
          {/* 登录窗口 */}
          <motion.div
            className="window"
            initial={{ opacity: 0, scale: 0.8, x: 0, y: 0 }}
            animate={{ opacity: 1, scale: 1, x: typeof window !== 'undefined' ? window.innerWidth / 2 - 200 : 0, y: typeof window !== 'undefined' ? window.innerHeight / 2 - 125 : 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            drag
            dragConstraints={{ left: 0, right: typeof window !== 'undefined' ? window.innerWidth - 400 : 400, top: 0, bottom: typeof window !== 'undefined' ? window.innerHeight - 250 : 250 }}
            style={{
              width: '400px',
              height: '250px',
              position: 'fixed',
              left: typeof window !== 'undefined' ? window.innerWidth / 2 - 200 : 0,
              top: typeof window !== 'undefined' ? window.innerHeight / 2 - 125 : 0,
            }}
          >
            <div className="window-bar">
              <div className="window-title">[SYSTEM_AUTH_v2.0]</div>
              <div className="flex gap-2">
                <div className="window-button">_</div>
                <div className="window-button">□</div>
                <div className="window-button">X</div>
              </div>
            </div>
            <div className="window-content flex flex-col justify-center items-start">
              <p className="mb-4">TARGET_ARCHIVE: [劉詩源的電腦]</p>
              <p className="mb-4">VISITOR_ID: GUEST_01 [访客01]</p>
              <p className="mb-8">ACCESS_LEVEL: RESTRICTED [仅浏览]</p>
              <motion.button
                className="web10-button self-center border-2 border-black"
                style={{ backgroundColor: '#0000FF', color: '#FFFFFF' }}
                whileTap={{ scale: 0.95, x: 1, y: 1 }}
                onClick={handleEnter}
              >
                [ENTER]
              </motion.button>
            </div>
          </motion.div>
        </div>
      ) : (
        <div className="w-full h-screen bg-[#008080] relative">
          {/* 桌面图标 */}
          <div className="absolute top-16 left-16 flex flex-wrap max-w-2xl">
            <div className="desktop-icon" onClick={() => toggleWindow('myComputer')}>
              <div className="icon-image">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-3/4 h-3/4 relative">
                    <div className="absolute inset-0 bg-[#C0C0C0] border border-black"></div>
                    <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-[#808080] border border-black"></div>
                    <div className="absolute top-1/3 left-1/3 w-1/6 h-1/6 bg-[#404040] border border-black"></div>
                  </div>
                </div>
              </div>
              <div className="icon-label">[我的電腦]</div>
            </div>



            {/* 扫雷图标 */}
            <div className="desktop-icon" onClick={() => toggleWindow('minesweeper')}>
              <div className="icon-image">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-3/4 h-3/4 relative">
                    <div className="absolute inset-0 bg-[#FF0000] border border-black"></div>
                    <div className="absolute inset-1 bg-[#FF8080] border border-black"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-black"></div>
                  </div>
                </div>
              </div>
              <div className="icon-label">[扫雷.exe]</div>
            </div>

            {/* 播放器图标 */}
            <div className="desktop-icon" onClick={() => toggleWindow('player')}>
              <div className="icon-image">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-3/4 h-3/4 relative">
                    <div className="absolute inset-0 bg-[#00FF00] border border-black"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="w-0 h-0 border-l-[12px] border-l-black border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="icon-label">[Player.exe]</div>
            </div>

            {/* 时尚档案图标 */}
            <div className="desktop-icon" onClick={() => toggleWindow('qzoneRetro')}>
              <div className="icon-image">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-3xl text-yellow-500">★</div>
                </div>
              </div>
              <div className="icon-label">[我的空間.qzn]</div>
            </div>

            {/* 宠物图标 */}
            <div className="desktop-icon" onClick={() => toggleWindow('pixelPet')}>
              <div className="icon-image">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-3/4 h-3/4 relative">
                    <div className="absolute inset-0 bg-[#87CEEB] border border-black"></div>
                    <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-[#4169E1] border border-black"></div>
                    <div className="absolute top-1/3 left-1/3 w-1/6 h-1/6 bg-white border border-black"></div>
                    <div className="absolute top-1/3 right-1/3 w-1/6 h-1/6 bg-white border border-black"></div>
                    <div className="absolute bottom-1/3 left-1/3 w-1/3 h-1/6 bg-black"></div>
                  </div>
                </div>
              </div>
              <div className="icon-label">[宠物.exe]</div>
            </div>

            {/* QQ秀图标 */}
            <div className="desktop-icon" onClick={() => toggleWindow('personaShow')}>
              <div className="icon-image">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-3/4 h-3/4 relative">
                    <div className="absolute inset-0 bg-[#FFC0CB] border border-black"></div>
                    <div className="absolute top-1/4 left-1/4 w-1/2 h-1/4 bg-[#FF0000] border border-black"></div>
                    <div className="absolute top-1/2 left-1/4 w-1/2 h-1/4 bg-[#0000FF] border border-black"></div>
                    <div className="absolute bottom-1/4 left-1/4 w-1/2 h-1/4 bg-[#FFFF00] border border-black"></div>
                  </div>
                </div>
              </div>
              <div className="icon-label">[我的QQ秀.lnk]</div>
            </div>
          </div>

          {/* 视窗 */}
          <AnimatePresence>
            <Window
              title="我的電腦"
              content={windowContents.myComputer}
              isOpen={openWindows.myComputer}
              onClose={() => toggleWindow('myComputer')}
            />

            <Window
              title="扫雷"
              content={windowContents.minesweeper}
              isOpen={openWindows.minesweeper}
              onClose={() => toggleWindow('minesweeper')}
            />

            <Window
              title="Player"
              content={windowContents.player}
              isOpen={openWindows.player}
              onClose={() => toggleWindow('player')}
              onMinimize={() => toggleWindow('player')}
              style={{ width: '320px', height: '568px', rounded: true, border: 'none', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)' }}
            />

            <Window
              title="我的空間"
              content={windowContents.qzoneRetro}
              isOpen={openWindows.qzoneRetro}
              onClose={() => toggleWindow('qzoneRetro')}
            />

            <Window
              title="Pixel Pet"
              content={windowContents.pixelPet}
              isOpen={openWindows.pixelPet}
              onClose={() => toggleWindow('pixelPet')}
              style={{ width: '300px', height: '400px' }}
            />

            <Window
              title="Persona Show"
              content={windowContents.personaShow}
              isOpen={openWindows.personaShow}
              onClose={() => toggleWindow('personaShow')}
              style={{ width: '600px', height: '400px' }}
            />
          </AnimatePresence>

          {/* 桌面小人 */}
          {activePersona && (
            <motion.div 
              className="fixed bottom-16 right-8 z-100 cursor-pointer persona-animation"
              onClick={() => setShowPersonaBubble(true)}
              drag
              dragConstraints={{ left: 0, right: typeof window !== 'undefined' ? window.innerWidth - 100 : 400, top: 0, bottom: typeof window !== 'undefined' ? window.innerHeight - 100 : 400 }}
            >
              {/* 像素小人图片 */}
              <div className="h-40">
                <img 
                  src={activePersona.image} 
                  alt={activePersona.name} 
                  className="h-full object-contain"
                  style={{ imageRendering: 'pixelated' }}
                />
              </div>
              
              {/* 气泡 */}
              {showPersonaBubble && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full mb-2 bg-white border-2 border-black p-2 text-xs font-mono w-48 text-center">
                  [CONNECTED_TO_LIUSHIYUAN_OS]
                </div>
              )}
            </motion.div>
          )}
          
          {/* 任务栏 */}
          <div className="fixed bottom-0 left-0 right-0 bg-[#C0C0C0] border-t-2 border-black z-50">
            <div className="flex justify-between items-center h-10 px-4">
              {/* 左侧 START 按钮 */}
              <div className="relative">
                <button 
                  className="web10-button text-sm"
                  onClick={() => setShowStartMenu(!showStartMenu)}
                >
                  [START]
                </button>
                
                {/* 开始菜单 */}
                {showStartMenu && (
                  <div className="absolute bottom-full mb-2 left-0 bg-[#C0C0C0] border-2 border-black p-2 min-w-[200px]">
                    <div className="flex flex-col gap-2">
                      <div className="border-2 border-black p-2 hover:bg-[#F0F0F0] cursor-pointer flex items-center gap-2"
                           onClick={() => {
                             // 触发关机效果
                             document.body.classList.add('fade-out');
                             setTimeout(() => {
                               setIsLoggedIn(false);
                               document.body.classList.remove('fade-out');
                             }, 1000);
                           }}>
                        <span className="text-red-600">⏻</span>
                        [關機 (U)]
                      </div>
                      <div className="border-2 border-black p-2 hover:bg-[#F0F0F0] cursor-pointer flex items-center gap-2"
                           onClick={() => {
                             // 触发重启效果
                             window.location.reload();
                           }}>
                        <span className="text-green-600">🔄</span>
                        [重新啟動 (R)]
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* 右侧时钟和系统状态 */}
              <div className="flex items-center gap-4 text-sm">
                <span>{new Date().toLocaleTimeString()}</span>
                <span>[2006_MY_SITE]</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}