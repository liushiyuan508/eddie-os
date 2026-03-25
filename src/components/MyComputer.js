'use client';

import { useState, useEffect } from 'react';

const MyComputer = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [currentTime, setCurrentTime] = useState(new Date());

  // 更新时间
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full relative">
      {/* 选项卡 */}
      <div className="flex border-b-2 border-black">
        <button
          className={`px-4 py-2 border-r-2 border-black ${activeTab === 'general' ? 'bg-gray-200' : 'bg-white'}`}
          onClick={() => setActiveTab('general')}
        >
          [常规]
        </button>
        <button
          className={`px-4 py-2 border-r-2 border-black ${activeTab === 'performance' ? 'bg-gray-200' : 'bg-white'}`}
          onClick={() => setActiveTab('performance')}
        >
          [性能]
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'logs' ? 'bg-gray-200' : 'bg-white'}`}
          onClick={() => setActiveTab('logs')}
        >
          [系统日志]
        </button>
      </div>

      {/* 选项卡内容 */}
      <div className="p-4">
        {activeTab === 'general' && (
          <div className="monospace">
            <h2 className="text-lg font-bold mb-4">[系统属性]</h2>
            <div className="mb-4">
              <p>计算机名: LIUSHIYUAN_PC_2006</p>
              <p>身份: 穿越到二十年前就用上电脑的小男孩</p>
              <p>内存: 64.0 MB of RAM (已被社交碎片占满)</p>
            </div>
            <div className="border-2 border-black p-2 bg-gray-100">
              <p>//:SYSTEM_STATUS: ONLINE</p>
              <p>//:OS_VERSION: Windows XP 2006</p>
              <p>//:USER_LEVEL: ADMIN</p>
            </div>
          </div>
        )}

        {activeTab === 'performance' && (
          <div className="monospace">
            <h2 className="text-lg font-bold mb-4">[性能]</h2>
            <div className="mb-4">
              <p className="mb-2">情緒穩定度:</p>
              <div className="border-2 border-black h-4 bg-white">
                <div className="bg-blue-500 h-full" style={{ width: '42%' }}></div>
              </div>
              <p className="mt-2">42%</p>
            </div>
            <div className="mb-4">
              <p>处理器: Intel(R) Happy Core(TM) i9-2027</p>
              <p>显卡: NVIDIA GeForce 256</p>
              <p>硬盘: 10GB (已用 9.5GB)</p>
            </div>
            <div className="border-2 border-black p-2 bg-gray-100">
              <p>//:PERFORMANCE_SCORE: 9999</p>
              <p>//:SYSTEM_HEALTH: GOOD</p>
            </div>
          </div>
        )}

        {activeTab === 'logs' && (
          <div className="monospace">
            <h2 className="text-lg font-bold mb-4">[系统日志]</h2>
            <div className="border-2 border-black p-4 bg-gray-100">
              <p className="mb-2">//: 涐德卋，伱卟懂...</p>
              <p className="mb-2">//: ゞ噯の終點，湜誰茬等待？ゞ</p>
              <p className="mb-2">//: [ERROR] 泖間菑加速，趉嘚呔赽，硪莣記帶赽楽。</p>
              <p className="mb-2">//: [INFO] 今天天气真好，适合上网冲浪</p>
              <p className="mb-2">//: [WARNING] 内存不足，建议关闭一些窗口</p>
              <p className="mb-2">//: [SUCCESS] 系统启动成功</p>
            </div>
          </div>
        )}
      </div>

      {/* 右下角时间 */}
      <div className="absolute bottom-2 right-2 border-2 border-black p-2 bg-white text-xs font-mono">
        {currentTime.toLocaleString('zh-CN')}
      </div>

      {/* 系统乱码装饰 */}
      <div className="absolute top-2 right-2 text-xs text-gray-500 font-mono">
        //:ERR_MEM_ALLOC
      </div>
      <div className="absolute bottom-2 left-2 text-xs text-gray-500 font-mono">
        //:SYSTEM_OK
      </div>
    </div>
  );
};

export default MyComputer;