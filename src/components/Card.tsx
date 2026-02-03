import React from 'react';
import { twMerge } from 'tailwind-merge';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export const Card: React.FC<CardProps> = ({ children, className, title }) => {
  // 제목에서 첫 글자를 따와 ID 생성 (예: Total Load -> TL-01)
  const generateId = (text: string) => {
    if (!text) return 'SYS-00';
    const initials = text.split(' ').map(word => word[0]).join('').toUpperCase();
    return `${initials}-01`;
  };

  return (
    <div
      className={twMerge(
        "relative overflow-hidden rounded-2xl bg-[#0f0c29]/80 backdrop-blur-xl transition-all duration-300",
        "border border-white/10 border-t-white/20 border-l-white/20",
        "shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]",
        "group",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      {/* 장식용 코너 라인 */}
      <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-neon-cyan/50 rounded-tl-2xl" />
      <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-neon-purple/50 rounded-br-2xl" />

      <div className="p-6 h-full flex flex-col relative z-10">
        {title && (
          <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-white text-base font-extrabold uppercase tracking-widest flex items-center gap-2 drop-shadow-md">
              <span className="w-2 h-2 rounded-sm bg-neon-cyan shadow-[0_0_8px_#00f3ff]"></span>
              {title}
            </h3>
            
            {/* [수정] 의미 없는 점 3개 삭제 -> 시스템 ID 텍스트로 대체 */}
            {/* 기존: <div className="flex gap-1.5">...</div> (삭제됨) */}
            <div className="text-[10px] font-mono text-gray-600 tracking-widest group-hover:text-neon-cyan/50 transition-colors">
              [{generateId(title)}]
            </div>
          </div>
        )}
        <div className="flex-1 min-h-0">{children}</div>
      </div>
    </div>
  );
};