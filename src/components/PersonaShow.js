'use client';

import { useState } from 'react';

const PersonaShow = ({ onPersonaSelect }) => {
  // 预设角色数据
  const personas = [
    {
      id: 'ID_01',
      name: 'MASK_USER',
      image: '/assets/persona/p1.png',
    },
    {
      id: 'ID_02',
      name: 'FLANEUR',
      image: '/assets/persona/p2.png',
    },
    {
      id: 'ID_03',
      name: 'CYBER_SOCIOLOGIST',
      image: '/assets/persona/p3.png',
    },
  ];

  // 处理角色选择
  const handlePersonaSelect = (persona) => {
    onPersonaSelect(persona);
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* 标题栏 */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">[Persona Show]</h2>
      </div>

      {/* 角色展示区 */}
      <div className="flex-1 flex justify-center items-center gap-8">
        {personas.map((persona) => (
          <div 
            key={persona.id}
            className="flex flex-col items-center cursor-pointer border-2 border-black p-4 hover:bg-gray-100"
            onClick={() => handlePersonaSelect(persona)}
          >
            {/* 角色图片 */}
            <div className="w-32 h-48 mb-4">
              <img 
                src={persona.image} 
                alt={persona.name} 
                className="w-full h-full object-contain border-2 border-black"
                style={{ imageRendering: 'pixelated' }}
              />
            </div>
            {/* 角色名称 */}
            <div className="text-sm font-mono text-center">
              [{persona.id}: {persona.name}]
            </div>
          </div>
        ))}
      </div>

      {/* 底部信息 */}
      <div className="mt-4 text-xs font-mono">
        <p>//:PERSONA_SYSTEM_INITIALIZED</p>
        <p>//:SELECT_A_PERSONA_TO_SUMMON_TO_DESKTOP</p>
      </div>
    </div>
  );
};

export default PersonaShow;