import { motion } from 'framer-motion';
import { DashboardLayout } from './components/DashboardLayout';
import { Card } from './components/Card';
import { BuildingScene } from './components/BuildingScene';
// [수정] SystemRadarChart 대신 SystemPerformanceChart Import
import { HourlyTrendChart, FloorDistChart, SystemPerformanceChart } from './components/EnergyCharts';

function App() {
  return (
    <DashboardLayout>
      {/* 1. 메인 3D 섹션 */}
      <Card className="xl:col-span-2 xl:row-span-2 min-h-[400px] relative overflow-hidden border-neon-cyan/30" title="Digital Twin">
        <div className="absolute inset-0 z-0">
          <BuildingScene />
        </div>
        
        <div className="absolute top-12 right-6 flex flex-col gap-3 items-end z-10 pointer-events-none">
          {/* TEMP */}
          <div className="w-32 bg-black/80 backdrop-blur-md border border-white/30 px-3 py-2 rounded-lg shadow-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse shadow-[0_0_10px_#00f3ff]"></span>
              <span className="text-sm font-bold text-gray-300">TEMP</span>
            </div>
            <span className="text-sm font-black text-neon-cyan">24°C</span>
          </div>

          {/* HUM */}
          <div className="w-32 bg-black/80 backdrop-blur-md border border-white/30 px-3 py-2 rounded-lg shadow-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse shadow-[0_0_10px_#ffffff]"></span>
              <span className="text-sm font-bold text-gray-300">HUM</span>
            </div>
            <span className="text-sm font-black text-white">45%</span>
          </div>
        </div>
      </Card>

      {/* 2. KPI 카드들 */}
      
      <Card title="Total Load">
        <div className="flex flex-col h-full justify-center">
          <div className="flex items-baseline gap-2">
            <div className="text-6xl font-black text-white tracking-tighter drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
              4.2
            </div>
            <span className="text-xl font-normal text-gray-400 pb-1">MW</span>
          </div>
          
          <div className="h-2 w-full bg-gray-800 mt-5 overflow-hidden rounded-full border border-white/10">
            <motion.div 
              className="h-full bg-neon-cyan shadow-[0_0_15px_#00f3ff]"
              initial={{ x: '-100%' }} animate={{ x: '0%' }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            />
          </div>
        </div>
      </Card>

      <Card title="Efficiency">
        <div className="flex flex-col h-full justify-center">
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-6xl font-black text-white tracking-tighter drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
              98.2
            </span>
            <span className="text-xl font-normal text-gray-400 pb-1">%</span>
          </div>

          <div className="w-full bg-gray-800/50 h-3 rounded-full overflow-hidden backdrop-blur-sm border border-white/10">
            <motion.div 
              className="h-full bg-gradient-to-r from-neon-cyan to-neon-purple shadow-[0_0_20px_#bd00ff]"
              initial={{ width: 0 }}
              animate={{ width: "98.2%" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </div>
          
          <div className="mt-3 text-sm font-bold text-white flex items-center gap-2">
            <span className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse shadow-[0_0_8px_#00f3ff]"></span>
            SYSTEM OPTIMIZED
          </div>
        </div>
      </Card>

      {/* 3. 그래프 영역 */}
      <Card className="xl:col-span-2 min-h-[250px]" title="Live Trend">
        <HourlyTrendChart />
      </Card>

      <Card className="xl:col-span-2 min-h-[250px]" title="Zone Usage">
        <FloorDistChart />
      </Card>

      {/* [수정] Performance Chart로 교체됨 */}
      <Card className="xl:col-span-2 min-h-[250px]" title="Resource Monitor">
        <SystemPerformanceChart />
      </Card>

    </DashboardLayout>
  );
}

export default App;