import React, { useState, useMemo, useEffect } from 'react';
import { 
  Hammer, HardHat, Calculator, BookOpen, User, 
  ChevronRight, ArrowLeft, Search, CheckCircle2, 
  Play, Trophy, Ruler, Droplets, ArrowRight,
  Flame, Pickaxe, Truck, Layers
} from 'lucide-react';

// --- DONNÉES : MODULES DE COURS ---
const MODULES = [
  {
    id: 'm1', title: 'Les Bases & La Sécurité', icon: <HardHat size={24} />, color: 'from-amber-500 to-orange-600',
    level: 'Débutant', duration: '2h', progress: 100,
    chapters: [
      { title: 'Équipement de Protection Individuelle (EPI)', duration: '15 min', completed: true },
      { title: 'Lire un plan de base', duration: '45 min', completed: true },
      { title: 'Les outils du maçon', duration: '30 min', completed: true },
    ]
  },
  {
    id: 'm2', title: 'Fondations & Dalles', icon: <Layers size={24} />, color: 'from-stone-500 to-stone-700',
    level: 'Intermédiaire', duration: '4h', progress: 30,
    chapters: [
      { title: 'Préparation du terrain et décaissement', duration: '40 min', completed: true },
      { title: 'Le ferraillage et le treillis soudé', duration: '1h', completed: false },
      { title: 'Couler une dalle béton de niveau', duration: '1h30', completed: false },
    ]
  },
  {
    id: 'm3', title: 'Élévation de Murs', icon: <Hammer size={24} />, color: 'from-orange-600 to-red-700',
    level: 'Intermédiaire', duration: '5h', progress: 0,
    chapters: [
      { title: 'Préparer son mortier de montage', duration: '30 min', completed: false },
      { title: 'Monter le premier rang (L\'arase)', duration: '1h', completed: false },
      { title: 'Croiser les parpaings et gérer les angles', duration: '1h30', completed: false },
    ]
  }
];

// --- DONNÉES : GLOSSAIRE ---
const GLOSSAIRE = [
  { term: 'Arase', def: 'Couche de mortier parfaitement de niveau sur laquelle on monte le premier rang.' },
  { term: 'Barbotine', def: 'Mélange liquide de ciment et d\'eau servant de liaison.' },
  { term: 'Chaînage', def: 'Armature en acier noyée dans le béton pour consolider les murs.' },
  { term: 'Ferraillage', def: 'Ensemble des armatures en fer ou en acier destinées à renforcer le béton.' },
  { term: 'Parpaing', def: 'Bloc de béton manufacturé, creux ou plein. Aussi appelé "Agglo".' }
];

// --- COMPOSANT : ECRAN DE CHARGEMENT ANIMÉ ---
const LoadingScreen = () => (
  <div className="fixed inset-0 bg-slate-950 flex flex-col items-center justify-center z-[999] overflow-hidden">
    <style>{`
      @keyframes dropHeavy {
        0% { transform: translateY(-300px); opacity: 0; }
        60% { transform: translateY(10px); opacity: 1; }
        80% { transform: translateY(-5px); opacity: 1; }
        100% { transform: translateY(0); opacity: 1; }
      }
      .block-1 { animation: dropHeavy 0.6s cubic-bezier(0.25, 1, 0.5, 1) forwards; opacity: 0; animation-delay: 0.2s; }
      .block-2 { animation: dropHeavy 0.6s cubic-bezier(0.25, 1, 0.5, 1) forwards; opacity: 0; animation-delay: 0.6s; }
      .block-3 { animation: dropHeavy 0.6s cubic-bezier(0.25, 1, 0.5, 1) forwards; opacity: 0; animation-delay: 1.1s; }
      .block-4 { animation: dropHeavy 0.6s cubic-bezier(0.25, 1, 0.5, 1) forwards; opacity: 0; animation-delay: 1.5s; }
      .block-5 { animation: dropHeavy 0.6s cubic-bezier(0.25, 1, 0.5, 1) forwards; opacity: 0; animation-delay: 1.9s; }
    `}</style>

    <div className="relative w-48 h-40 mb-8">
      {/* Rangée 1 (Bas) */}
      <div className="block-1 absolute bottom-0 left-0 w-14 h-8 bg-stone-400 border-[3px] border-stone-600 rounded-sm shadow-lg flex items-center justify-center">
        <div className="w-8 h-3 border-2 border-stone-500 rounded-sm"></div>
      </div>
      <div className="block-2 absolute bottom-0 left-[60px] w-14 h-8 bg-stone-400 border-[3px] border-stone-600 rounded-sm shadow-lg flex items-center justify-center">
        <div className="w-8 h-3 border-2 border-stone-500 rounded-sm"></div>
      </div>
      <div className="block-3 absolute bottom-0 left-[120px] w-14 h-8 bg-stone-400 border-[3px] border-stone-600 rounded-sm shadow-lg flex items-center justify-center">
        <div className="w-8 h-3 border-2 border-stone-500 rounded-sm"></div>
      </div>
      
      {/* Rangée 2 (Haut - Croisée) */}
      <div className="block-4 absolute bottom-[32px] left-[30px] w-14 h-8 bg-stone-400 border-[3px] border-stone-600 rounded-sm shadow-lg flex items-center justify-center">
        <div className="w-8 h-3 border-2 border-stone-500 rounded-sm"></div>
      </div>
      <div className="block-5 absolute bottom-[32px] left-[90px] w-14 h-8 bg-stone-400 border-[3px] border-stone-600 rounded-sm shadow-lg flex items-center justify-center">
        <div className="w-8 h-3 border-2 border-stone-500 rounded-sm"></div>
      </div>
    </div>

    <h2 className="text-amber-500 font-black text-xl tracking-widest uppercase animate-pulse">Gâchage du mortier...</h2>
    <p className="text-slate-500 text-xs mt-2 font-bold">Préparation du chantier</p>
  </div>
);

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [selectedModule, setSelectedModule] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [calcLength, setCalcLength] = useState('');
  const [calcWidth, setCalcWidth] = useState('');
  const [calcDepth, setCalcDepth] = useState('');

  // Simuler le temps de chargement pour voir l'animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 secondes de chargement
    return () => clearTimeout(timer);
  }, []);

  const calculateConcrete = useMemo(() => {
    const l = parseFloat(calcLength);
    const w = parseFloat(calcWidth);
    const d = parseFloat(calcDepth) / 100;
    if (!l || !w || !d || l <= 0 || w <= 0 || d <= 0) return null;
    const volume = l * w * d;
    return {
      volume: volume.toFixed(2),
      cimentSacs: Math.ceil(volume * 10),
      sable: Math.round(volume * 800),
      gravier: Math.round(volume * 1000),
      eau: Math.round(volume * 175)
    };
  }, [calcLength, calcWidth, calcDepth]);

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="fixed inset-0 bg-slate-950 text-slate-100 flex flex-col font-sans overflow-hidden">
      
      {/* HEADER GLOBALE */}
      {!selectedModule && (
        <header className="px-6 pt-6 pb-2 bg-slate-950 flex justify-between items-center z-40 relative">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/20">
              <HardHat size={22} className="block" />
            </div>
            <div>
              <h1 className="text-xl font-black text-white tracking-tight leading-none">Bâti<span className="text-amber-500">Pro</span></h1>
              <span className="text-[9px] text-slate-400 uppercase font-bold tracking-widest">Académie Maçonnerie</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center text-slate-400">
            <User size={18} />
          </div>
        </header>
      )}

      {/* CONTENU */}
      <main className="flex-1 overflow-y-auto custom-scroll pb-24 relative">
        
        {/* --- ACCUEIL --- */}
        {activeTab === 'home' && !selectedModule && (
          <div className="animate-in slide-in-from-bottom-4 fade-in duration-500 space-y-8 p-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl flex flex-col items-center justify-center text-center shadow-lg hover:border-amber-500/30 transition-colors">
                <Trophy className="text-amber-500 mb-2" size={28} />
                <span className="text-2xl font-black text-white">Niv. 3</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Apprenti</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl flex flex-col items-center justify-center text-center shadow-lg hover:border-emerald-500/30 transition-colors">
                <CheckCircle2 className="text-emerald-500 mb-2" size={28} />
                <span className="text-2xl font-black text-white">4</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Leçons finies</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl p-6 shadow-xl shadow-orange-900/20 relative overflow-hidden group cursor-pointer hover:scale-[1.02] transition-transform">
              <Flame className="absolute -right-4 -bottom-4 text-white/10 group-hover:scale-110 transition-transform duration-700" size={120} />
              <span className="bg-white/20 text-white text-[10px] font-black uppercase px-3 py-1 rounded-full backdrop-blur-md border border-white/20">Astuce du Chef</span>
              <h3 className="text-xl font-black text-white mt-4 mb-2">Mouiller ses parpaings</h3>
              <p className="text-white/90 text-sm leading-relaxed">
                En été, pensez à humidifier légèrement vos parpaings avant de les poser. S'ils sont trop secs, ils "boiront" l'eau de votre mortier.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-black text-white mb-4">Reprendre le chantier</h2>
              <div onClick={() => { setSelectedModule(MODULES[1]); setActiveTab('courses'); }} className="bg-slate-900 border border-slate-800 rounded-3xl p-4 flex items-center gap-4 cursor-pointer hover:bg-slate-800 hover:border-amber-500/50 transition-all shadow-lg active:scale-95">
                <div className="w-16 h-16 rounded-2xl bg-stone-800 flex items-center justify-center text-stone-400 shrink-0">
                  <Layers size={28} />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-white text-sm">Fondations & Dalles</h4>
                  <p className="text-xs text-slate-400 mb-2">Leçon : Ferraillage...</p>
                  <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full" style={{ width: '30%' }}></div>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500">
                  <Play size={20} className="ml-1" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- COURS (LISTE) --- */}
        {activeTab === 'courses' && !selectedModule && (
          <div className="animate-in slide-in-from-bottom-4 fade-in duration-500 p-6 space-y-4">
            <div className="mb-6">
              <h1 className="text-3xl font-black text-white mb-1">L'Académie</h1>
              <p className="text-slate-400 text-sm">Maîtrisez les gestes de A à Z.</p>
            </div>
            
            {MODULES.map((mod, index) => (
              <div 
                key={mod.id} 
                onClick={() => setSelectedModule(mod)} 
                className="bg-slate-900 border border-slate-800 rounded-[2rem] p-5 cursor-pointer hover:border-amber-500/50 hover:bg-slate-800/50 transition-all shadow-lg active:scale-95 group"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'both' }}
              >
                <div className="flex gap-4 items-center">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${mod.color} flex items-center justify-center text-white shadow-lg shrink-0 group-hover:rotate-6 transition-transform`}>
                    {mod.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-black text-white text-base">{mod.title}</h3>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">{mod.chapters.length} leçons</span>
                      <span className="text-[10px] font-bold text-amber-500">{mod.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-950 rounded-full h-1.5 mt-2 overflow-hidden">
                      <div className="bg-amber-500 h-full rounded-full transition-all duration-1000" style={{ width: `${mod.progress}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* --- COURS (DÉTAIL D'UN MODULE) --- */}
        {activeTab === 'courses' && selectedModule && (
          <div className="animate-in slide-in-from-right duration-300 h-full flex flex-col absolute inset-0 bg-slate-950 z-50">
            <div className={`pt-12 pb-8 px-6 bg-gradient-to-br ${selectedModule.color} rounded-b-[3rem] shadow-2xl relative shrink-0`}>
              <button onClick={() => setSelectedModule(null)} className="absolute top-6 left-6 w-10 h-10 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/40 transition-colors active:scale-90">
                <ArrowLeft size={20} />
              </button>
              <div className="mt-8">
                <span className="text-white/80 text-[10px] font-black uppercase tracking-widest">{selectedModule.level} • {selectedModule.duration}</span>
                <h1 className="text-3xl font-black text-white mt-2 leading-tight">{selectedModule.title}</h1>
              </div>
            </div>

            <div className="flex-1 p-6 space-y-4 overflow-y-auto custom-scroll pb-24">
              <h3 className="font-black text-white text-lg mb-4">Programme du module</h3>
              {selectedModule.chapters.map((chap, idx) => (
                <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center gap-4 hover:bg-slate-800 transition-colors cursor-pointer group">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 transition-colors ${chap.completed ? 'bg-emerald-500/10 border-emerald-500 text-emerald-500' : 'bg-slate-950 border-slate-700 text-slate-500 group-hover:border-amber-500 group-hover:text-amber-500'}`}>
                    {chap.completed ? <CheckCircle2 size={18} /> : <Play size={14} className="ml-0.5" />}
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-bold text-sm transition-colors ${chap.completed ? 'text-slate-400' : 'text-white group-hover:text-amber-400'}`}>{chap.title}</h4>
                    <span className="text-[10px] text-slate-500 flex items-center gap-1 mt-1"><Clock size={10}/> {chap.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- OUTILS --- */}
        {activeTab === 'tools' && (
          <div className="animate-in slide-in-from-bottom-4 fade-in duration-500 p-6 space-y-6">
            <div>
              <h1 className="text-3xl font-black text-white mb-1">La Boîte à Outils</h1>
              <p className="text-slate-400 text-sm">Finies les erreurs de calcul.</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-[2rem] p-6 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-amber-500/10 rounded-xl text-amber-500"><Truck size={24} /></div>
                <h2 className="text-lg font-black text-white leading-tight">Calculateur de<br/>Dalle Béton</h2>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <label className="text-[10px] font-black uppercase text-slate-500 block mb-2">Longueur (m)</label>
                  <input type="number" value={calcLength} onChange={e => setCalcLength(e.target.value)} placeholder="0" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 text-white text-lg font-bold outline-none focus:border-amber-500 transition shadow-inner" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <label className="text-[10px] font-black uppercase text-slate-500 block mb-2">Largeur (m)</label>
                    <input type="number" value={calcWidth} onChange={e => setCalcWidth(e.target.value)} placeholder="0" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 text-white text-lg font-bold outline-none focus:border-amber-500 transition shadow-inner" />
                  </div>
                  <div className="relative">
                    <label className="text-[10px] font-black uppercase text-slate-500 block mb-2">Épaisseur (cm)</label>
                    <input type="number" value={calcDepth} onChange={e => setCalcDepth(e.target.value)} placeholder="0" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 text-white text-lg font-bold outline-none focus:border-amber-500 transition shadow-inner" />
                  </div>
                </div>
              </div>

              {calculateConcrete && (
                <div className="mt-8 animate-in zoom-in duration-500 slide-in-from-bottom-4">
                  <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 text-center py-4 rounded-t-2xl font-black text-xl shadow-lg">
                    {calculateConcrete.volume} m³ <span className="text-sm font-bold opacity-80 block">Volume Total</span>
                  </div>
                  <div className="bg-slate-800 rounded-b-2xl p-4 grid grid-cols-2 gap-4 border-x border-b border-slate-700 shadow-inner">
                    <div className="text-center p-3 bg-slate-900/80 rounded-xl border border-slate-700/50">
                      <span className="block text-2xl font-black text-white">{calculateConcrete.cimentSacs}</span>
                      <span className="text-[9px] text-slate-400 uppercase font-bold">Sacs ciment (35kg)</span>
                    </div>
                    <div className="text-center p-3 bg-slate-900/80 rounded-xl border border-slate-700/50">
                      <span className="block text-2xl font-black text-white">{calculateConcrete.sable}</span>
                      <span className="text-[9px] text-slate-400 uppercase font-bold">Kg de sable</span>
                    </div>
                    <div className="text-center p-3 bg-slate-900/80 rounded-xl border border-slate-700/50">
                      <span className="block text-2xl font-black text-white">{calculateConcrete.gravier}</span>
                      <span className="text-[9px] text-slate-400 uppercase font-bold">Kg de gravier</span>
                    </div>
                    <div className="text-center p-3 bg-slate-900/80 rounded-xl border border-slate-700/50">
                      <span className="block text-2xl font-black text-white">{calculateConcrete.eau}</span>
                      <span className="text-[9px] text-slate-400 uppercase font-bold">Litres d'eau</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* --- GLOSSAIRE --- */}
        {activeTab === 'glossary' && (
          <div className="animate-in slide-in-from-bottom-4 fade-in duration-500 p-6 space-y-6 flex flex-col">
            <div>
              <h1 className="text-3xl font-black text-white mb-1">Le Glossaire</h1>
              <p className="text-slate-400 text-sm">Le jargon du chantier, décrypté.</p>
            </div>

            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-amber-500 transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Chercher un terme..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-amber-500 transition shadow-lg" 
              />
            </div>

            <div className="space-y-3 pb-8">
              {GLOSSAIRE.filter(item => item.term.toLowerCase().includes(searchQuery.toLowerCase()) || item.def.toLowerCase().includes(searchQuery.toLowerCase())).map((item, idx) => (
                <div key={idx} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl hover:border-amber-500/30 transition-colors">
                  <h3 className="font-black text-amber-500 mb-2 text-lg">{item.term}</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">{item.def}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* NAV BOTTOM */}
      <nav className="absolute bottom-0 w-full bg-slate-950/90 backdrop-blur-2xl border-t border-slate-800/50 flex justify-around items-center pt-4 pb-6 px-2 z-40">
        {[
          { id: 'home', icon: <HardHat size={24} strokeWidth={activeTab === 'home' ? 2.5 : 2} />, label: 'Accueil' },
          { id: 'courses', icon: <BookOpen size={24} strokeWidth={activeTab === 'courses' ? 2.5 : 2} />, label: 'Cours' },
          { id: 'tools', icon: <Calculator size={24} strokeWidth={activeTab === 'tools' ? 2.5 : 2} />, label: 'Outils' },
          { id: 'glossary', icon: <Search size={24} strokeWidth={activeTab === 'glossary' ? 2.5 : 2} />, label: 'Jargon' }
        ].map(item => (
          <button 
            key={item.id}
            onClick={() => {setActiveTab(item.id); setSelectedModule(null);}} 
            className={`flex flex-col items-center gap-1.5 w-1/4 transition-all duration-300 ${activeTab === item.id ? 'text-amber-500 scale-110' : 'text-slate-500 hover:text-slate-300'}`}
          >
            {item.icon}
            <span className="text-[9px] font-black uppercase tracking-wider">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
