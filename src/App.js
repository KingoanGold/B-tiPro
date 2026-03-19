/* eslint-disable */
import React, { useState, useMemo, useEffect } from 'react';
import { 
  Hammer, HardHat, Calculator, BookOpen, User, 
  ArrowLeft, Search, CheckCircle2, Play, Trophy, 
  Droplets, Flame, Truck, Layers, Clock, Box, Grid,
  Shield, Map, PaintRoller, Ruler, Medal, Pencil,
  ChevronRight, Camera, AlertTriangle
} from 'lucide-react';

// --- DONNÉES : MODULES DE COURS (MASSIF) ---
const MODULES = [
  {
    id: 'm1', title: 'Initiation & Sécurité', icon: <Shield size={24} />, color: 'from-amber-500 to-orange-600',
    level: 'Débutant', duration: '2h', progress: 100,
    chapters: [
      { title: 'Équipement de Protection Individuelle (EPI)', duration: '15 min', completed: true },
      { title: 'Gestes et postures de sécurité', duration: '20 min', completed: true },
      { title: 'Sécuriser un chantier (Balisage)', duration: '15 min', completed: true },
      { title: 'Les outils à main (Truelles, taloches, niveaux)', duration: '40 min', completed: true },
      { title: 'L\'outillage électroportatif (Bétonnière, meuleuse)', duration: '30 min', completed: true }
    ]
  },
  {
    id: 'm2', title: 'Lecture de Plans & Implantation', icon: <Map size={24} />, color: 'from-blue-500 to-blue-700',
    level: 'Débutant', duration: '3h', progress: 50,
    chapters: [
      { title: 'Comprendre l\'échelle et les cotes', duration: '45 min', completed: true },
      { title: 'Le théorème de Pythagore (La règle du 3-4-5)', duration: '30 min', completed: true },
      { title: 'Planter des chaises d\'implantation', duration: '45 min', completed: false },
      { title: 'Tirer les cordeaux et vérifier l\'équerrage', duration: '1h', completed: false }
    ]
  },
  {
    id: 'm3', title: 'Fondations & Soubassements', icon: <Layers size={24} />, color: 'from-stone-500 to-stone-700',
    level: 'Intermédiaire', duration: '4h30', progress: 0,
    chapters: [
      { title: 'Décaissement et mise hors gel', duration: '40 min', completed: false },
      { title: 'Le béton de propreté', duration: '30 min', completed: false },
      { title: 'Ferrailler les semelles filantes', duration: '1h', completed: false },
      { title: 'Couler et vibrer le béton de fondation', duration: '1h', completed: false },
      { title: 'Monter le mur de soubassement', duration: '1h20', completed: false }
    ]
  },
  {
    id: 'm4', title: 'Les Liants : Mortiers & Bétons', icon: <Droplets size={24} />, color: 'from-slate-400 to-slate-600',
    level: 'Intermédiaire', duration: '2h30', progress: 0,
    chapters: [
      { title: 'La différence entre ciment, mortier et béton', duration: '20 min', completed: false },
      { title: 'Les dosages standards (350kg, bâtard, etc.)', duration: '45 min', completed: false },
      { title: 'Gâcher à la main ou à la bétonnière', duration: '45 min', completed: false },
      { title: 'Les adjuvants (Hydrofuge, antigel, plastifiant)', duration: '40 min', completed: false }
    ]
  },
  {
    id: 'm5', title: 'Élévation : Parpaings (Agglos)', icon: <Box size={24} />, color: 'from-orange-600 to-red-700',
    level: 'Intermédiaire', duration: '6h', progress: 0,
    chapters: [
      { title: 'Préparer son mortier de montage', duration: '30 min', completed: false },
      { title: 'L\'arase étanche (Coupure de capillarité)', duration: '45 min', completed: false },
      { title: 'Monter les blocs d\'angle et d\'aplomb', duration: '1h30', completed: false },
      { title: 'Monter les rangs courants (Croisement)', duration: '2h', completed: false },
      { title: 'Ferraillage vertical et blocs à bancher', duration: '1h15', completed: false }
    ]
  },
  {
    id: 'm6', title: 'Élévation : Briques Roulées', icon: <Grid size={24} />, color: 'from-red-500 to-red-800',
    level: 'Avancé', duration: '4h', progress: 0,
    chapters: [
      { title: 'Le mortier joint mince (Colle)', duration: '45 min', completed: false },
      { title: 'L\'utilisation du rouleau applicateur', duration: '1h', completed: false },
      { title: 'Ajuster et scier les briques alvéolaires', duration: '1h', completed: false },
      { title: 'Traiter les ponts thermiques', duration: '1h15', completed: false }
    ]
  },
  {
    id: 'm7', title: 'Béton Armé : Poteaux & Poutres', icon: <Ruler size={24} />, color: 'from-zinc-500 to-zinc-800',
    level: 'Avancé', duration: '5h', progress: 0,
    chapters: [
      { title: 'Lire un plan de ferraillage', duration: '1h', completed: false },
      { title: 'Façonner les armatures (Cadres, épingles)', duration: '1h30', completed: false },
      { title: 'Coffrer un poteau ou un linteau', duration: '1h30', completed: false },
      { title: 'Couler, vibrer et décoffrer', duration: '1h', completed: false }
    ]
  },
  {
    id: 'm8', title: 'Dalles, Chapes & Planchers', icon: <Layers size={24} />, color: 'from-cyan-600 to-cyan-800',
    level: 'Avancé', duration: '5h', progress: 0,
    chapters: [
      { title: 'Préparer le hérisson et le polyane', duration: '1h', completed: false },
      { title: 'Poser les joints de dilatation et le treillis', duration: '45 min', completed: false },
      { title: 'Tirer une dalle à la règle', duration: '1h30', completed: false },
      { title: 'La chape de finition (Mortier)', duration: '1h45', completed: false }
    ]
  },
  {
    id: 'm9', title: 'Enduits de Façade', icon: <PaintRoller size={24} />, color: 'from-amber-200 to-amber-500',
    level: 'Expert', duration: '4h', progress: 0,
    chapters: [
      { title: 'Préparer les supports et poser les baguettes', duration: '1h', completed: false },
      { title: 'Le gobetis (Couche d\'accroche)', duration: '45 min', completed: false },
      { title: 'Le corps d\'enduit (Dressage)', duration: '1h15', completed: false },
      { title: 'La finition (Talochée, grattée ou lissée)', duration: '1h', completed: false }
    ]
  },
  {
    id: 'm10', title: 'Maçonnerie Paysagère', icon: <Hammer size={24} />, color: 'from-green-600 to-emerald-800',
    level: 'Intermédiaire', duration: '4h', progress: 0,
    chapters: [
      { title: 'Monter un muret en pierre sèche', duration: '1h15', completed: false },
      { title: 'Réaliser des joints à la chaux', duration: '1h', completed: false },
      { title: 'Poser des pavés autobloquants sur lit de sable', duration: '1h', completed: false },
      { title: 'Créer des marches d\'escalier extérieur', duration: '45 min', completed: false }
    ]
  }
];

// --- DONNÉES : GLOSSAIRE (ÉTOFFÉ) ---
const GLOSSAIRE = [
  { term: 'Adjuvant', def: 'Produit chimique ajouté au béton ou mortier pour modifier ses propriétés (antigel, hydrofuge...).' },
  { term: 'Agglo', def: 'Abréviation d\'aggloméré, autre nom du parpaing.' },
  { term: 'Arase', def: 'Couche de mortier parfaitement de niveau sur laquelle on monte le premier rang.' },
  { term: 'Auge', def: 'Récipient de forme rectangulaire servant à gâcher ou contenir de petites quantités de mortier ou plâtre.' },
  { term: 'Banche', def: 'Panneau de coffrage de grande dimension utilisé pour couler des murs en béton banché.' },
  { term: 'Barbotine', def: 'Mélange liquide de ciment et d\'eau servant de liaison entre deux couches.' },
  { term: 'Bastaing', def: 'Pièce de bois de charpente souvent utilisée en maçonnerie pour le coffrage ou les échafaudages.' },
  { term: 'Chaînage', def: 'Armature en acier (horizontale ou verticale) noyée dans le béton pour lier et solidifier les murs.' },
  { term: 'Chevillette', def: 'Tige d\'acier pointue à section carrée ou ronde, utilisée pour fixer provisoirement des guides de maçonnerie.' },
  { term: 'Cordeau', def: 'Ficelle tendue entre deux points servant de guide d\'alignement pour monter un mur.' },
  { term: 'Cure', def: 'Action de protéger le béton frais contre l\'évaporation trop rapide de l\'eau (soleil, vent).' },
  { term: 'Décaissement', def: 'Action de creuser le sol pour préparer des fondations ou une dalle.' },
  { term: 'Enduit', def: 'Préparation de mortier appliquée sur un mur pour le protéger et le décorer.' },
  { term: 'Équerrage', def: 'Opération consistant à vérifier qu\'un angle fait exactement 90 degrés (souvent avec la règle du 3-4-5).' },
  { term: 'Ferraillage', def: 'Ensemble des armatures métalliques destinées à armer le béton.' },
  { term: 'Fil à plomb', def: 'Outil constitué d\'une masse suspendue à une ficelle, servant à vérifier la verticalité.' },
  { term: 'Fouille', def: 'Trou ou tranchée creusée dans le sol pour recevoir les fondations.' },
  { term: 'Gâchage', def: 'Action de mélanger les agrégats, le liant (ciment/chaux) et l\'eau pour obtenir un mortier ou béton.' },
  { term: 'Gobetis', def: 'Première couche d\'un enduit, très fine et liquide, servant d\'accroche.' },
  { term: 'Hérisson', def: 'Couche de pierres ou de graviers damés constituant l\'assise d\'une dalle sur terre-plein.' },
  { term: 'Hydrofuge', def: 'Traitement ou adjuvant qui empêche l\'eau de pénétrer.' },
  { term: 'Jointement', def: 'Remplissage des espaces (joints) entre des pierres, des briques ou du carrelage.' },
  { term: 'Laitance', def: 'Couche blanchâtre qui se forme à la surface d\'un béton trop riche en eau.' },
  { term: 'Linteau', def: 'Poutre horizontale située au-dessus d\'une ouverture (porte, fenêtre) soutenant la maçonnerie.' },
  { term: 'Parpaing', def: 'Bloc de béton manufacturé, creux ou plein. Le composant de base des murs maçonnés.' },
  { term: 'Plâtre', def: 'Liant utilisé principalement en intérieur pour les finitions ou scellements rapides.' },
  { term: 'Polyane', def: 'Film plastique étanche placé sous une dalle pour empêcher les remontées d\'humidité.' },
  { term: 'Ragréage', def: 'Opération consistant à lisser et aplanir une surface (souvent un sol) avant de poser un revêtement.' },
  { term: 'Semelle', def: 'Base de la fondation d\'un mur, généralement renforcée par des armatures (semelle filante).' },
  { term: 'Serre-joint', def: 'Outil de serrage indispensable pour maintenir les planches de coffrage.' },
  { term: 'Taloche', def: 'Plaque munie d\'une poignée, servant à porter le mortier ou à lisser les enduits.' },
  { term: 'Tirage', def: 'Action d\'étaler et de lisser le béton ou la chape à l\'aide d\'une règle.' },
  { term: 'Treillis soudé', def: 'Armature en forme de grillage utilisée pour armer les dalles en béton.' },
  { term: 'Truelle', def: 'L\'outil symbolique du maçon, servant à manipuler le mortier.' },
  { term: 'Vibration', def: 'Action d\'utiliser une aiguille vibrante pour chasser l\'air du béton frais et le rendre compact.' }
];

const BADGES = [
  { id: 'bd1', name: 'Nouveau Casque', desc: 'Profil créé avec succès', icon: <HardHat size={24}/> },
  { id: 'bd2', name: 'Bases Solides', desc: 'Module 1 terminé', icon: <Shield size={24}/> },
  { id: 'bd3', name: 'Géomètre', desc: 'Expert en Pythagore', icon: <Ruler size={24}/> },
  { id: 'bd4', name: 'Dosage Parfait', desc: 'Utilisation du calculateur', icon: <Calculator size={24}/> },
];

// --- COMPOSANTS : CHARGEMENT ---
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
      <div className="block-1 absolute bottom-0 left-0 w-14 h-8 bg-stone-400 border-[3px] border-stone-600 rounded-sm shadow-lg flex items-center justify-center"><div className="w-8 h-3 border-2 border-stone-500 rounded-sm"></div></div>
      <div className="block-2 absolute bottom-0 left-[60px] w-14 h-8 bg-stone-400 border-[3px] border-stone-600 rounded-sm shadow-lg flex items-center justify-center"><div className="w-8 h-3 border-2 border-stone-500 rounded-sm"></div></div>
      <div className="block-3 absolute bottom-0 left-[120px] w-14 h-8 bg-stone-400 border-[3px] border-stone-600 rounded-sm shadow-lg flex items-center justify-center"><div className="w-8 h-3 border-2 border-stone-500 rounded-sm"></div></div>
      <div className="block-4 absolute bottom-[32px] left-[30px] w-14 h-8 bg-stone-400 border-[3px] border-stone-600 rounded-sm shadow-lg flex items-center justify-center"><div className="w-8 h-3 border-2 border-stone-500 rounded-sm"></div></div>
      <div className="block-5 absolute bottom-[32px] left-[90px] w-14 h-8 bg-stone-400 border-[3px] border-stone-600 rounded-sm shadow-lg flex items-center justify-center"><div className="w-8 h-3 border-2 border-stone-500 rounded-sm"></div></div>
    </div>
    <h2 className="text-amber-500 font-black text-xl tracking-widest uppercase animate-pulse">Gâchage du mortier...</h2>
  </div>
);

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [selectedModule, setSelectedModule] = useState(null);
  
  // Profil State
  const [userProfile, setUserProfile] = useState({ name: '', level: 'Apprenti', avatar: '', bio: '' });
  const [isNewUser, setIsNewUser] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({ name: '', level: 'Apprenti' });

  // Glossaire
  const [searchQuery, setSearchQuery] = useState('');

  // Outils States
  const [toolTab, setToolTab] = useState('dalle');
  const [calcLength, setCalcLength] = useState('');
  const [calcWidth, setCalcWidth] = useState('');
  const [calcDepth, setCalcDepth] = useState('');
  
  const [wallLength, setWallLength] = useState('');
  const [wallHeight, setWallHeight] = useState('');
  
  const [tileLength, setTileLength] = useState('');
  const [tileWidth, setTileWidth] = useState('');
  const [tSizeL, setTSizeL] = useState('');
  const [tSizeW, setTSizeW] = useState('');

  // Initialisation et vérification du profil
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    const savedProfile = localStorage.getItem('batipro_profile');
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
    } else {
      setIsNewUser(true);
    }
    return () => clearTimeout(timer);
  }, []);

  const saveProfile = () => {
    const newProfile = { 
      ...userProfile, 
      name: profileForm.name || 'Compagnon', 
      level: profileForm.level,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${profileForm.name || 'Compagnon'}&backgroundColor=1e293b`
    };
    setUserProfile(newProfile);
    localStorage.setItem('batipro_profile', JSON.stringify(newProfile));
    setIsNewUser(false);
    setIsEditingProfile(false);
  };

  // Logiques Calculatrices
  const calcConcrete = useMemo(() => {
    const l = parseFloat(calcLength), w = parseFloat(calcWidth), d = parseFloat(calcDepth) / 100;
    if (!l || !w || !d || l <= 0 || w <= 0 || d <= 0) return null;
    const vol = l * w * d;
    return { vol: vol.toFixed(2), ciment: Math.ceil(vol * 10), sable: Math.round(vol * 800), gravier: Math.round(vol * 1000), eau: Math.round(vol * 175) };
  }, [calcLength, calcWidth, calcDepth]);

  const calcWall = useMemo(() => {
    const l = parseFloat(wallLength), h = parseFloat(wallHeight);
    if (!l || !h || l <= 0 || h <= 0) return null;
    const area = l * h;
    const blockArea = 0.5 * 0.2; // Parpaing standard 50x20cm
    const totalBlocks = Math.ceil((area / blockArea) * 1.05); // 5% de casse
    const mortarVol = Math.ceil(area * 15); // ~15L/m2
    return { area: area.toFixed(2), blocks: totalBlocks, mortar: mortarVol };
  }, [wallLength, wallHeight]);

  const calcTiles = useMemo(() => {
    const l = parseFloat(tileLength), w = parseFloat(tileWidth);
    const tl = parseFloat(tSizeL)/100, tw = parseFloat(tSizeW)/100;
    if (!l || !w || !tl || !tw || l <= 0 || w <= 0 || tl <= 0 || tw <= 0) return null;
    const area = l * w;
    const tArea = tl * tw;
    const totalTiles = Math.ceil((area / tArea) * 1.10); // 10% de marge (coupes)
    return { area: area.toFixed(2), tiles: totalTiles };
  }, [tileLength, tileWidth, tSizeL, tSizeW]);

  if (isLoading) return <LoadingScreen />;

  // Écran d'accueil / Création de profil
  if (isNewUser) {
    return (
      <div className="fixed inset-0 bg-slate-950 text-white flex flex-col p-6 animate-in slide-in-from-bottom">
        <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
          <HardHat className="text-amber-500 mx-auto mb-6" size={64} />
          <h1 className="text-3xl font-black text-center mb-2">Bienvenue sur Bâti<span className="text-amber-500">Pro</span></h1>
          <p className="text-slate-400 text-center mb-10 text-sm">Crée ton profil pour suivre ton apprentissage et débloquer tes outils.</p>
          
          <div className="space-y-6">
            <div>
              <label className="text-[10px] font-black uppercase text-slate-500 block mb-2">Ton Prénom ou Surnom</label>
              <input type="text" value={profileForm.name} onChange={e=>setProfileForm({...profileForm, name: e.target.value})} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-4 text-white font-bold outline-none focus:border-amber-500 transition" placeholder="Ex: Bob le Bricoleur" />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase text-slate-500 block mb-2">Ton Niveau Actuel</label>
              <div className="grid grid-cols-2 gap-3">
                {['Curieux', 'Apprenti', 'Bricoleur', 'Maçon'].map(lvl => (
                  <button key={lvl} onClick={()=>setProfileForm({...profileForm, level: lvl})} className={`py-3 rounded-xl text-sm font-bold border transition-colors ${profileForm.level === lvl ? 'bg-amber-500/20 border-amber-500 text-amber-500' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <button onClick={saveProfile} className="w-full mt-10 bg-amber-500 text-slate-950 py-4 rounded-xl font-black uppercase tracking-widest shadow-lg shadow-amber-900/20">Enfiler mon casque</button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-slate-950 text-slate-100 flex flex-col font-sans overflow-hidden">
      
      {/* HEADER GLOBALE */}
      {!selectedModule && (
        <header className="px-6 pt-6 pb-2 bg-slate-950 flex justify-between items-center z-40 relative">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/20">
              <HardHat size={22} className="block" />
            </div>
            <div>
              <h1 className="text-xl font-black text-white tracking-tight leading-none">Bâti<span className="text-amber-500">Pro</span></h1>
              <span className="text-[9px] text-slate-400 uppercase font-bold tracking-widest">Maçonnerie App</span>
            </div>
          </div>
          <button onClick={()=>setActiveTab('profile')} className="w-10 h-10 rounded-full border-2 border-slate-700 overflow-hidden focus:border-amber-500 transition">
            <img src={userProfile.avatar} alt="Avatar" className="w-full h-full object-cover"/>
          </button>
        </header>
      )}

      {/* CONTENU PRINCIPAL */}
      <main className="flex-1 overflow-y-auto custom-scroll pb-24 relative">
        
        {/* --- ACCUEIL --- */}
        {activeTab === 'home' && !selectedModule && (
          <div className="animate-in slide-in-from-bottom-4 fade-in duration-500 space-y-8 p-6">
            <div>
              <h2 className="text-3xl font-black text-white">Salut, {userProfile.name} !</h2>
              <p className="text-amber-500 font-bold mt-1">Niveau : {userProfile.level}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl flex flex-col items-center justify-center text-center shadow-lg hover:border-amber-500/30 transition-colors">
                <Trophy className="text-amber-500 mb-2" size={28} />
                <span className="text-2xl font-black text-white">10</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Leçons finies</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl flex flex-col items-center justify-center text-center shadow-lg hover:border-emerald-500/30 transition-colors">
                <Medal className="text-emerald-500 mb-2" size={28} />
                <span className="text-2xl font-black text-white">2</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Badges obtenus</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl p-6 shadow-xl shadow-orange-900/20 relative overflow-hidden group cursor-pointer hover:scale-[1.02] transition-transform">
              <Flame className="absolute -right-4 -bottom-4 text-white/10 group-hover:scale-110 transition-transform duration-700" size={120} />
              <span className="bg-white/20 text-white text-[10px] font-black uppercase px-3 py-1 rounded-full backdrop-blur-md border border-white/20">Le Saviez-vous ?</span>
              <h3 className="text-xl font-black text-white mt-4 mb-2">Les Murs respirent</h3>
              <p className="text-white/90 text-sm leading-relaxed">
                N'utilisez jamais d'enduit au ciment pur sur des vieux murs en pierre. Le ciment bloque l'humidité. Préférez un mortier bâtard ou à la chaux pour laisser le mur "respirer".
              </p>
            </div>

            <div>
              <h2 className="text-lg font-black text-white mb-4 flex items-center gap-2"><Map size={20}/> Ton Chantier en cours</h2>
              <div onClick={() => { setSelectedModule(MODULES[1]); setActiveTab('courses'); }} className="bg-slate-900 border border-slate-800 rounded-3xl p-4 flex items-center gap-4 cursor-pointer hover:bg-slate-800 hover:border-blue-500/50 transition-all shadow-lg active:scale-95">
                <div className="w-16 h-16 rounded-2xl bg-blue-900/50 flex items-center justify-center text-blue-400 shrink-0">
                  <Map size={28} />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-white text-sm">Lecture & Implantation</h4>
                  <p className="text-xs text-slate-400 mb-2">Leçon : Planter des chaises...</p>
                  <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-blue-500 h-full rounded-full" style={{ width: '50%' }}></div>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
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
              <p className="text-slate-400 text-sm">Près de 40 leçons pour tout maîtriser.</p>
            </div>
            
            {MODULES.map((mod, index) => (
              <div 
                key={mod.id} onClick={() => setSelectedModule(mod)} 
                className="bg-slate-900 border border-slate-800 rounded-[2rem] p-5 cursor-pointer hover:border-amber-500/50 hover:bg-slate-800/50 transition-all shadow-lg active:scale-95 group"
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

        {/* --- COURS (DÉTAIL DU MODULE) --- */}
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

        {/* --- OUTILS MULTIPLES --- */}
        {activeTab === 'tools' && (
          <div className="animate-in slide-in-from-bottom-4 fade-in duration-500 p-6 space-y-6">
            <div>
              <h1 className="text-3xl font-black text-white mb-1">La Boîte à Outils</h1>
              <p className="text-slate-400 text-sm">Calculatrices de chantier de précision.</p>
            </div>

            {/* Selector d'outils */}
            <div className="flex bg-slate-900 rounded-2xl p-1 border border-slate-800">
              <button onClick={()=>setToolTab('dalle')} className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${toolTab === 'dalle' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}>Dalle Béton</button>
              <button onClick={()=>setToolTab('mur')} className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${toolTab === 'mur' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}>Mur Agglos</button>
              <button onClick={()=>setToolTab('carrelage')} className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${toolTab === 'carrelage' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}>Carrelage</button>
            </div>

            {/* Outil 1 : DALLE */}
            {toolTab === 'dalle' && (
              <div className="bg-slate-900 border border-slate-800 rounded-[2rem] p-6 shadow-xl animate-in zoom-in-95 duration-300">
                <div className="flex items-center gap-3 mb-6"><div className="p-3 bg-amber-500/10 rounded-xl text-amber-500"><Truck size={24} /></div><h2 className="text-lg font-black text-white">Béton (350kg/m³)</h2></div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="text-[10px] font-black uppercase text-slate-500 block mb-2">Long. (m)</label><input type="number" value={calcLength} onChange={e=>setCalcLength(e.target.value)} placeholder="0" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white font-bold outline-none focus:border-amber-500" /></div>
                    <div><label className="text-[10px] font-black uppercase text-slate-500 block mb-2">Larg. (m)</label><input type="number" value={calcWidth} onChange={e=>setCalcWidth(e.target.value)} placeholder="0" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white font-bold outline-none focus:border-amber-500" /></div>
                  </div>
                  <div><label className="text-[10px] font-black uppercase text-slate-500 block mb-2">Épaisseur (cm)</label><input type="number" value={calcDepth} onChange={e=>setCalcDepth(e.target.value)} placeholder="0" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white font-bold outline-none focus:border-amber-500" /></div>
                </div>
                {calcConcrete && (
                  <div className="mt-6">
                    <div className="bg-amber-500 text-slate-950 text-center py-3 rounded-t-2xl font-black text-lg">{calcConcrete.vol} m³ <span className="text-xs">Béton</span></div>
                    <div className="bg-slate-800 rounded-b-2xl p-4 grid grid-cols-2 gap-3">
                      <div className="text-center p-2 bg-slate-900 rounded-lg"><span className="block text-xl font-black">{calcConcrete.ciment}</span><span className="text-[8px] text-slate-400 uppercase font-bold">Sacs Ciment 35kg</span></div>
                      <div className="text-center p-2 bg-slate-900 rounded-lg"><span className="block text-xl font-black">{calcConcrete.sable}</span><span className="text-[8px] text-slate-400 uppercase font-bold">Kg Sable</span></div>
                      <div className="text-center p-2 bg-slate-900 rounded-lg"><span className="block text-xl font-black">{calcConcrete.gravier}</span><span className="text-[8px] text-slate-400 uppercase font-bold">Kg Gravier</span></div>
                      <div className="text-center p-2 bg-slate-900 rounded-lg"><span className="block text-xl font-black">{calcConcrete.eau}</span><span className="text-[8px] text-slate-400 uppercase font-bold">Litres Eau</span></div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Outil 2 : MUR */}
            {toolTab === 'mur' && (
              <div className="bg-slate-900 border border-slate-800 rounded-[2rem] p-6 shadow-xl animate-in zoom-in-95 duration-300">
                <div className="flex items-center gap-3 mb-6"><div className="p-3 bg-orange-500/10 rounded-xl text-orange-500"><Box size={24} /></div><h2 className="text-lg font-black text-white">Mur Parpaings (20x50)</h2></div>
                <div className="space-y-4">
                  <div><label className="text-[10px] font-black uppercase text-slate-500 block mb-2">Longueur du mur (m)</label><input type="number" value={wallLength} onChange={e=>setWallLength(e.target.value)} placeholder="Ex: 10" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white font-bold outline-none focus:border-orange-500" /></div>
                  <div><label className="text-[10px] font-black uppercase text-slate-500 block mb-2">Hauteur du mur (m)</label><input type="number" value={wallHeight} onChange={e=>setWallHeight(e.target.value)} placeholder="Ex: 2.5" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white font-bold outline-none focus:border-orange-500" /></div>
                </div>
                {calcWall && (
                  <div className="mt-6">
                    <div className="bg-orange-600 text-white text-center py-3 rounded-t-2xl font-black text-lg">{calcWall.area} m² <span className="text-xs">Surface Totale</span></div>
                    <div className="bg-slate-800 rounded-b-2xl p-4 grid grid-cols-2 gap-3">
                      <div className="text-center p-2 bg-slate-900 rounded-lg"><span className="block text-2xl font-black text-orange-500">{calcWall.blocks}</span><span className="text-[9px] text-slate-400 uppercase font-bold">Parpaings (Inclus +5%)</span></div>
                      <div className="text-center p-2 bg-slate-900 rounded-lg"><span className="block text-2xl font-black text-stone-400">{calcWall.mortar}</span><span className="text-[9px] text-slate-400 uppercase font-bold">Litres de Mortier</span></div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Outil 3 : CARRELAGE */}
            {toolTab === 'carrelage' && (
              <div className="bg-slate-900 border border-slate-800 rounded-[2rem] p-6 shadow-xl animate-in zoom-in-95 duration-300">
                <div className="flex items-center gap-3 mb-6"><div className="p-3 bg-blue-500/10 rounded-xl text-blue-500"><Grid size={24} /></div><h2 className="text-lg font-black text-white">Pose Carrelage</h2></div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="text-[10px] font-black uppercase text-slate-500 block mb-2">Pièce Long. (m)</label><input type="number" value={tileLength} onChange={e=>setTileLength(e.target.value)} placeholder="0" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white font-bold outline-none focus:border-blue-500" /></div>
                    <div><label className="text-[10px] font-black uppercase text-slate-500 block mb-2">Pièce Larg. (m)</label><input type="number" value={tileWidth} onChange={e=>setTileWidth(e.target.value)} placeholder="0" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white font-bold outline-none focus:border-blue-500" /></div>
                  </div>
                  <div className="border-t border-slate-800 pt-4 mt-2">
                    <label className="text-[10px] font-black uppercase text-blue-500 block mb-2">Taille d'un carreau</label>
                    <div className="grid grid-cols-2 gap-4">
                      <div><label className="text-[10px] text-slate-500 block mb-1">Côté A (cm)</label><input type="number" value={tSizeL} onChange={e=>setTSizeL(e.target.value)} placeholder="ex: 60" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white font-bold outline-none focus:border-blue-500" /></div>
                      <div><label className="text-[10px] text-slate-500 block mb-1">Côté B (cm)</label><input type="number" value={tSizeW} onChange={e=>setTSizeW(e.target.value)} placeholder="ex: 60" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white font-bold outline-none focus:border-blue-500" /></div>
                    </div>
                  </div>
                </div>
                {calcTiles && (
                  <div className="mt-6">
                    <div className="bg-blue-600 text-white text-center py-3 rounded-t-2xl font-black text-lg">{calcTiles.area} m² <span className="text-xs">Surface au sol</span></div>
                    <div className="bg-slate-800 rounded-b-2xl p-4 text-center">
                      <div className="p-4 bg-slate-900 rounded-xl border border-blue-500/30">
                        <span className="block text-3xl font-black text-blue-400 mb-1">{calcTiles.tiles}</span>
                        <span className="text-xs text-slate-400 uppercase font-bold">Carreaux à commander (Inclus +10% de marge)</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* --- GLOSSAIRE (35 TERMES) --- */}
        {activeTab === 'glossary' && (
          <div className="animate-in slide-in-from-bottom-4 fade-in duration-500 p-6 space-y-6 flex flex-col">
            <div>
              <h1 className="text-3xl font-black text-white mb-1">Le Glossaire</h1>
              <p className="text-slate-400 text-sm">Plus de 35 termes du chantier décryptés.</p>
            </div>

            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-amber-500 transition-colors" size={20} />
              <input 
                type="text" placeholder="Chercher un terme (ex: Barbotine)..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
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

        {/* --- PROFIL & PARAMÈTRES --- */}
        {activeTab === 'profile' && (
          <div className="animate-in slide-in-from-bottom-4 fade-in duration-500 p-6 space-y-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-black text-white">Mon Profil</h1>
              <button onClick={() => { setProfileForm({name: userProfile.name, level: userProfile.level}); setIsEditingProfile(true); }} className="p-3 bg-slate-900 rounded-full text-slate-400 hover:text-white border border-slate-800"><Pencil size={18}/></button>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-28 h-28 rounded-full border-4 border-slate-800 bg-slate-900 overflow-hidden mb-4 shadow-xl relative group">
                <img src={userProfile.avatar} className="w-full h-full object-cover"/>
              </div>
              <h2 className="text-2xl font-black">{userProfile.name}</h2>
              <span className="bg-amber-500/20 text-amber-500 px-4 py-1 rounded-full text-xs font-bold mt-2 border border-amber-500/30">{userProfile.level}</span>
            </div>

            {/* Badges */}
            <div>
              <h3 className="text-[10px] font-black uppercase text-slate-500 mb-4 tracking-widest flex items-center gap-2"><Medal size={14}/> Mes Badges (Succès)</h3>
              <div className="grid grid-cols-2 gap-3">
                {BADGES.map((b, i) => (
                  <div key={b.id} className={`p-4 rounded-2xl border flex flex-col items-center text-center ${i < 2 ? 'bg-slate-900 border-amber-500/30' : 'bg-slate-900 border-slate-800 opacity-40 grayscale'}`}>
                      <div className={i < 2 ? 'text-amber-500 mb-2' : 'text-slate-500 mb-2'}>{b.icon}</div>
                      <div className="text-xs font-black text-white mb-1">{b.name}</div>
                      <div className="text-[9px] text-slate-400 leading-tight">{b.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-5 text-center mt-8">
              <AlertTriangle className="text-rose-500 mx-auto mb-2" size={24}/>
              <h3 className="font-bold text-rose-500 text-sm mb-1">Rappel de sécurité</h3>
              <p className="text-xs text-slate-400">La maçonnerie comporte des risques. Portez toujours vos EPI (Casque, gants, lunettes, chaussures de sécurité).</p>
            </div>
          </div>
        )}

      </main>

      {/* MODAL ÉDITION PROFIL */}
      {isEditingProfile && (
        <div className="absolute inset-0 bg-slate-950/98 backdrop-blur-xl z-[900] flex flex-col p-6 animate-in slide-in-from-bottom">
          <header className="flex justify-between items-center mb-8">
            <button onClick={()=>setIsEditingProfile(false)} className="p-2 bg-slate-900 rounded-full"><ArrowLeft size={20}/></button>
            <h2 className="font-black">Modifier le profil</h2>
            <div className="w-10"/>
          </header>
          <div className="space-y-6 flex-1">
            <div>
              <label className="text-[10px] font-black uppercase text-slate-500 block mb-2">Prénom ou Surnom</label>
              <input type="text" value={profileForm.name} onChange={e=>setProfileForm({...profileForm, name: e.target.value})} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-4 text-white font-bold outline-none focus:border-amber-500" />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase text-slate-500 block mb-2">Niveau</label>
              <div className="grid grid-cols-2 gap-3">
                {['Curieux', 'Apprenti', 'Bricoleur', 'Maçon'].map(lvl => (
                  <button key={lvl} onClick={()=>setProfileForm({...profileForm, level: lvl})} className={`py-3 rounded-xl text-sm font-bold border ${profileForm.level === lvl ? 'bg-amber-500/20 border-amber-500 text-amber-500' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <button onClick={saveProfile} className="w-full bg-amber-500 text-slate-950 py-4 rounded-xl font-black mb-8 shadow-lg shadow-amber-900/20">Sauvegarder</button>
        </div>
      )}

      {/* NAV BOTTOM */}
      <nav className="absolute bottom-0 w-full bg-slate-950/95 backdrop-blur-2xl border-t border-slate-800/50 flex justify-around items-center pt-3 pb-6 px-1 z-40">
        {[
          { id: 'home', icon: <HardHat size={22} strokeWidth={activeTab === 'home' ? 2.5 : 2} />, label: 'Accueil' },
          { id: 'courses', icon: <BookOpen size={22} strokeWidth={activeTab === 'courses' ? 2.5 : 2} />, label: 'Cours' },
          { id: 'tools', icon: <Calculator size={22} strokeWidth={activeTab === 'tools' ? 2.5 : 2} />, label: 'Outils' },
          { id: 'glossary', icon: <Search size={22} strokeWidth={activeTab === 'glossary' ? 2.5 : 2} />, label: 'Jargon' },
          { id: 'profile', icon: <User size={22} strokeWidth={activeTab === 'profile' ? 2.5 : 2} />, label: 'Profil' }
        ].map(item => (
          <button 
            key={item.id}
            onClick={() => {setActiveTab(item.id); setSelectedModule(null);}} 
            className={`flex flex-col items-center gap-1 w-1/5 transition-all duration-300 ${activeTab === item.id ? 'text-amber-500 scale-110' : 'text-slate-500 hover:text-slate-300'}`}
          >
            {item.icon}
            <span className="text-[8px] font-black uppercase tracking-wider">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
