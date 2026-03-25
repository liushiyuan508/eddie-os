'use client';

const FashionArchive = () => {
  // 模拟图片数据
  const images = [
    { id: 1, description: '//:2024_FW_COLLECTION' },
    { id: 2, description: '//:2025_SS_TRENDS' },
    { id: 3, description: '//:BRAND_IDENTITY' },
    { id: 4, description: '//:CAMPAIGN_2026' },
    { id: 5, description: '//:RUNWAY_SPRING' },
    { id: 6, description: '//:ACCESSORIES_LINE' },
    { id: 7, description: '//:STREET_STYLE' },
    { id: 8, description: '//:VINTAGE_INSPIRED' },
  ];

  return (
    <div className="w-full h-full">
      <h1 className="text-xl font-bold mb-4">[BRAND_STUDY_2026]</h1>
      
      {/* 图片阵列 */}
      <div className="grid grid-cols-2 gap-4">
        {images.map((image) => (
          <div key={image.id} className="flex flex-col">
            {/* 图片占位符 */}
            <div className="border-2 border-black h-48 bg-gray-100 flex items-center justify-center mb-2">
              <span className="text-gray-500">[IMAGE_{image.id}]</span>
            </div>
            {/* 描述文字 */}
            <div className="text-xs font-mono">
              {image.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FashionArchive;