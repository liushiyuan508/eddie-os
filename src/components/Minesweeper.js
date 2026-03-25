'use client';

import { useState, useEffect } from 'react';

const Minesweeper = ({ onMineHit }) => {
  const [grid, setGrid] = useState([]);
  const [revealed, setRevealed] = useState([]);
  const [flags, setFlags] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [glitchCode, setGlitchCode] = useState('//:404');

  // 初始化游戏
  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const size = 10;
    const newGrid = Array(size).fill().map(() => Array(size).fill(0));
    const newRevealed = Array(size).fill().map(() => Array(size).fill(false));
    const newFlags = Array(size).fill().map(() => Array(size).fill(false));

    // 随机放置 20 个地雷
    let minesPlaced = 0;
    while (minesPlaced < 20) {
      const x = Math.floor(Math.random() * size);
      const y = Math.floor(Math.random() * size);
      if (newGrid[x][y] !== 'M') {
        newGrid[x][y] = 'M';
        minesPlaced++;
      }
    }

    // 计算每个格子周围的地雷数
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (newGrid[i][j] !== 'M') {
          let count = 0;
          for (let di = -1; di <= 1; di++) {
            for (let dj = -1; dj <= 1; dj++) {
              const ni = i + di;
              const nj = j + dj;
              if (ni >= 0 && ni < size && nj >= 0 && nj < size && newGrid[ni][nj] === 'M') {
                count++;
              }
            }
          }
          newGrid[i][j] = count;
        }
      }
    }

    setGrid(newGrid);
    setRevealed(newRevealed);
    setFlags(newFlags);
    setGameOver(false);
  };

  const generateGlitchCode = () => {
    const codes = ['//:404', '//:ERR_MEM', '//:STACK_OVF', '//:NULL_PTR', '//:DIV_ZERO'];
    const randomCode = codes[Math.floor(Math.random() * codes.length)];
    setGlitchCode(randomCode);
  };

  const handleCellClick = (x, y) => {
    if (gameOver || revealed[x][y] || flags[x][y]) return;

    const newRevealed = [...revealed];
    newRevealed[x][y] = true;

    if (grid[x][y] === 'M') {
      // 踩雷了
      setGameOver(true);
      if (onMineHit) {
        onMineHit();
      }
    } else if (grid[x][y] === 0) {
      // 递归翻开周围的格子
      revealAdjacent(x, y, newRevealed);
    }

    setRevealed(newRevealed);
    generateGlitchCode();
  };

  const handleCellRightClick = (e, x, y) => {
    e.preventDefault();
    if (gameOver || revealed[x][y]) return;

    const newFlags = [...flags];
    newFlags[x][y] = !newFlags[x][y];
    setFlags(newFlags);
    generateGlitchCode();
  };

  const revealAdjacent = (x, y, newRevealed) => {
    for (let di = -1; di <= 1; di++) {
      for (let dj = -1; dj <= 1; dj++) {
        const ni = x + di;
        const nj = y + dj;
        if (ni >= 0 && ni < 10 && nj >= 0 && nj < 10 && !newRevealed[ni][nj] && !flags[ni][nj]) {
          newRevealed[ni][nj] = true;
          if (grid[ni][nj] === 0) {
            revealAdjacent(ni, nj, newRevealed);
          }
        }
      }
    }
  };

  return (
    <div>
      <div className="mb-4">{glitchCode}</div>
      <div className="grid grid-cols-10 gap-0">
        {grid.map((row, x) => (
          row.map((cell, y) => (
            <div
              key={`${x}-${y}`}
              className={`w-8 h-8 flex items-center justify-center text-sm font-bold border-2 border-black ${revealed[x][y] ? 'bg-gray-300' : 'bg-gray-100 hover:bg-gray-200'} ${flags[x][y] ? 'bg-yellow-100' : ''}`}
              onClick={() => handleCellClick(x, y)}
              onContextMenu={(e) => handleCellRightClick(e, x, y)}
              style={{
                boxShadow: revealed[x][y] ? 'inset 2px 2px 0px #000000' : '2px 2px 0px #000000'
              }}
            >
              {revealed[x][y] ? (
                cell === 'M' ? '💣' : cell > 0 ? cell : ''
              ) : flags[x][y] ? '🚩' : ''}
            </div>
          ))
        ))}
      </div>
      <div className="mt-4 flex gap-2">
        <button 
          className="web10-button" 
          onClick={initializeGame}
        >
          [RESTART]
        </button>
      </div>
    </div>
  );
};

export default Minesweeper;