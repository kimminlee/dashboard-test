import {
  AreaChart, Area, XAxis, YAxis, ResponsiveContainer,
  BarChart, Bar, Cell, Tooltip, 
  LineChart, Line, CartesianGrid
} from 'recharts';

// --- Mock Data ---
const hourlyData = Array.from({ length: 12 }, (_, i) => ({
  time: i,
  usage: Math.floor(Math.random() * 400) + 800 + (Math.sin(i) * 200),
}));

const floorData = [
  { name: 'Lobby', value: 40, fullMark: 100 },
  { name: 'Gym', value: 85, fullMark: 100 },
  { name: 'Pool', value: 100, fullMark: 100 },
  { name: 'Office', value: 60, fullMark: 100 },
];

// [NEW] 시스템 성능 데이터 (시간 흐름에 따른 변화)
const performanceData = Array.from({ length: 20 }, (_, i) => ({
  time: i,
  cpu: 50 + Math.random() * 30,
  mem: 40 + Math.random() * 20,
  net: 20 + Math.random() * 40,
}));

// --- Custom Tooltip ---
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black/95 border border-neon-cyan/50 p-3 text-sm font-bold shadow-[0_0_15px_rgba(0,243,255,0.2)]">
        {payload.map((p: any, index: number) => (
          <div key={index} className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }}></span>
            <span className="text-gray-300 uppercase">{p.dataKey}:</span>
            <span className="text-white ml-auto">{Math.round(p.value)}%</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

// 1. 에너지 트렌드 (부드러운 곡선)
export const HourlyTrendChart = () => {
  return (
    <div className="w-full h-full relative">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={hourlyData} margin={{ top: 10, right: 10, left: -50, bottom: 0 }}>
          <defs>
            <linearGradient id="glowGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00f3ff" stopOpacity={0.5}/>
              <stop offset="100%" stopColor="#00f3ff" stopOpacity={0}/>
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <Tooltip content={CustomTooltip} cursor={{ stroke: '#00f3ff', strokeWidth: 1 }} />
          <Area 
            type="monotone" 
            dataKey="usage" 
            stroke="#00f3ff" 
            strokeWidth={4}
            fill="url(#glowGradient)" 
            filter="url(#glow)"
            animationDuration={1500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

// 2. 구역별 사용량 (가로 막대)
export const FloorDistChart = () => {
  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={floorData} layout="vertical" barSize={10} barCategoryGap={30}>
          <XAxis type="number" hide domain={[0, 100]} />
          <YAxis 
            dataKey="name" 
            type="category" 
            width={60} 
            tick={{ fill: '#e2e8f0', fontSize: 13, fontWeight: 600 } as any} 
            axisLine={false}
            tickLine={false}
          />
          <Bar dataKey="fullMark" fill="#1e293b" radius={[0, 6, 6, 0]} animationDuration={0} />
          <Bar dataKey="value" radius={[0, 6, 6, 0]}>
             {floorData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.name === 'Pool' ? '#00f3ff' : '#64748b'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

// 3. [NEW] 시스템 성능 모니터 (계단형 라인 차트)
// 직사각형 공간을 꽉 채우며, 3가지 지표를 동시에 보여줍니다.
export const SystemPerformanceChart = () => {
  return (
    <div className="w-full h-full relative">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={performanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
          <XAxis dataKey="time" hide />
          <YAxis domain={[0, 100]} hide />
          <Tooltip content={CustomTooltip} cursor={{ stroke: 'white', strokeWidth: 1, strokeDasharray: '4 4' }} />
          
          {/* CPU: Cyan - 가장 중요 */}
          <Line 
            type="step" 
            dataKey="cpu" 
            stroke="#00f3ff" 
            strokeWidth={2} 
            dot={false} 
            animationDuration={1000} 
          />
          {/* MEM: Purple - 보조 */}
          <Line 
            type="step" 
            dataKey="mem" 
            stroke="#bd00ff" 
            strokeWidth={2} 
            dot={false} 
            animationDuration={1500} 
          />
          {/* NET: White - 배경 흐름 */}
          <Line 
            type="step" 
            dataKey="net" 
            stroke="#ffffff" 
            strokeWidth={1} 
            strokeOpacity={0.5} 
            dot={false} 
            animationDuration={2000} 
          />
        </LineChart>
      </ResponsiveContainer>
      
      {/* 범례 (Legend) 직접 배치 */}
      <div className="absolute top-0 right-4 flex gap-4 text-[10px] font-bold">
        <div className="flex items-center gap-1"><span className="w-2 h-2 bg-neon-cyan rounded-sm"></span><span className="text-neon-cyan">CPU</span></div>
        <div className="flex items-center gap-1"><span className="w-2 h-2 bg-neon-purple rounded-sm"></span><span className="text-neon-purple">MEM</span></div>
        <div className="flex items-center gap-1"><span className="w-2 h-2 bg-white/50 rounded-sm"></span><span className="text-white/50">NET</span></div>
      </div>
    </div>
  );
};