/* eslint-disable */
import React, { useState, useMemo, useEffect } from 'react';
import { 
  Hammer, HardHat, Calculator, BookOpen, User, 
  ArrowLeft, Search, CheckCircle2, Play, Trophy, 
  Droplets, Flame, Truck, Layers, Clock, Box, Grid,
  Shield, Map, Paintbrush, Ruler, Medal, Pencil,
  ChevronRight, AlertTriangle, X, Check
} from 'lucide-react';

// --- DONNÉES : MODULES ET VRAIES LEÇONS ---
const MODULES = [
  {
    id: 'm1', title: 'Initiation & Sécurité', icon: <Shield size={24} />, color: 'from-amber-500 to-orange-600',
    level: 'Débutant', duration: '2h',
    chapters: [
      { id: 'm1c1', title: 'Équipement de Protection Individuelle (EPI)', duration: '15 min', content: "La sécurité avant tout. Sur un chantier de maçonnerie, vous devez obligatoirement porter :\n\n- Un casque de chantier (contre les chutes de gravats).\n- Des chaussures de sécurité (coquées, norme S3) pour protéger vos orteils et éviter les clous.\n- Des gants de maçonnerie (le ciment brûle la peau à cause de son pH très basique).\n- Des lunettes de protection, indispensables lors des découpes à la meuleuse ou lors du gâchage." },
      { id: 'm1c2', title: 'Gestes et postures de sécurité', duration: '20 min', content: "Un maçon soulève des tonnes de matériaux par jour. Pour préserver votre dos :\n\n- Pliez toujours les genoux pour ramasser une charge.\n- Gardez le dos droit et utilisez la force de vos cuisses.\n- Portez les charges lourdes (sacs de ciment de 35kg) près de votre corps.\n- Ne faites jamais de torsion du buste lorsque vous portez une charge ; pivotez avec vos pieds." },
      { id: 'm1c3', title: 'Les outils à main indispensables', duration: '40 min', content: "La caisse à outils du maçon : \n\n1. La truelle : pour prendre, jeter et lisser le mortier. \n2. La taloche : pour transporter de petites quantités de mortier ou lisser un enduit. \n3. Le niveau à bulle et le fil à plomb : vos meilleurs amis pour des murs droits. \n4. La massette et le burin : pour les petits ajustements et les démolitions." },
    ]
  },
  {
    id: 'm2', title: 'Lecture de Plans & Implantation', icon: <Map size={24} />, color: 'from-blue-500 to-blue-700',
    level: 'Débutant', duration: '3h',
    chapters: [
      { id: 'm2c1', title: 'Comprendre l\'échelle et les cotes', duration: '45 min', content: "Sur un plan de maçonnerie, l'échelle standard est souvent le 1/50 ou 1/100. \n- Au 1/50, 2 centimètres sur le papier représentent 1 mètre dans la réalité.\n- Les cotes sont exprimées en centimètres ou en mètres. Lisez toujours les cotes cumulées pour éviter d'additionner des erreurs de millimètres bout à bout." },
      { id: 'm2c2', title: 'Le théorème de Pythagore (Règle du 3-4-5)', duration: '30 min', content: "Pour faire un angle parfaitement droit (90°) sans grande équerre de maçon, utilisez la règle du 3-4-5 :\n\n1. Mesurez 3 mètres sur votre premier cordeau.\n2. Mesurez 4 mètres sur le cordeau perpendiculaire.\n3. La diagonale entre ces deux points doit mesurer exactement 5 mètres. Si c'est le cas, votre angle est parfait !" },
      { id: 'm2c3', title: 'Tirer les cordeaux et les chaises', duration: '1h', content: "Les chaises d'implantation sont des piquets en bois plantés à l'extérieur de la zone de terrassement, reliés par une planche horizontale. Elles permettent de tendre des cordeaux (ficelles) qui matérialiseront l'axe de vos futurs murs sans vous gêner pendant que vous creusez les fondations." }
    ]
  },
  {
    id: 'm3', title: 'Fondations & Soubassements', icon: <Layers size={24} />, color: 'from-stone-500 to-stone-700',
    level: 'Intermédiaire', duration: '4h30',
    chapters: [
      { id: 'm3c1', title: 'Décaissement et mise hors gel', duration: '40 min', content: "Les fondations doivent descendre sous la ligne de 'mise hors gel'. Si l'eau gèle sous vos fondations, elle gonfle et soulève la maison, fissurant les murs. Cette profondeur varie selon les régions (de 50 cm sur le littoral à plus d'1 mètre en montagne)." },
      { id: 'm3c2', title: 'Le ferraillage des semelles', duration: '1h', content: "Le béton résiste très bien à la compression, mais mal à la traction. C'est pourquoi on y ajoute de l'acier (béton armé).\n\nDans le fond de votre fouille (sur un béton de propreté), placez vos armatures (semelles filantes) en les surélevant de 4 à 5 cm avec des cales, pour qu'elles soient parfaitement enrobées par le béton et ne rouillent pas." },
      { id: 'm3c3', title: 'Couler et vibrer le béton', duration: '1h', content: "Une fois le béton coulé dans la fouille, il faut le vibrer à l'aide d'une aiguille vibrante (ou en tapotant le coffrage) pour chasser les bulles d'air. Attention à ne pas trop vibrer, sous peine de voir les graviers tomber au fond et l'eau remonter (phénomène de ségrégation)." }
    ]
  },
  {
    id: 'm4', title: 'Les Liants : Mortiers & Bétons', icon: <Droplets size={24} />, color: 'from-slate-400 to-slate-600',
    level: 'Intermédiaire', duration: '2h30',
    chapters: [
      { id: 'm4c1', title: 'Différence entre mortier et béton', duration: '20 min', content: "L'erreur classique du débutant !\n\n- Le MORTIER = Ciment (ou chaux) + Sable + Eau. Il sert à 'coller' (monter des parpaings, faire un enduit, une chape).\n- Le BÉTON = Ciment + Sable + GRAVIER + Eau. Il sert à structurer (faire une dalle, une fondation, un linteau). Le gravier lui donne sa résistance mécanique." },
      { id: 'm4c2', title: 'Les dosages standards', duration: '45 min', content: "Pour le Béton standard (Dalle) :\nDosé à 350 kg/m³. On utilise souvent la règle du 1-2-3 à la pelle :\n- 1 volume de ciment\n- 2 volumes de sable\n- 3 volumes de gravier\n- 1/2 volume d'eau\n\nPour le Mortier de montage (Parpaings) :\nDosé à environ 300 kg/m³. Règle : 1 seau de ciment pour 3 à 4 seaux de sable." }
    ]
  },
  {
    id: 'm5', title: 'Élévation : Parpaings (Agglos)', icon: <Box size={24} />, color: 'from-orange-600 to-red-700',
    level: 'Intermédiaire', duration: '5h',
    chapters: [
      { id: 'm5c1', title: 'L\'arase et le premier rang', duration: '45 min', content: "Le premier rang est le plus important de toute votre construction. S'il est de travers, tout le mur sera de travers.\n1. Étalez un lit de mortier épais.\n2. Posez vos parpaings d'angle en premier.\n3. Réglez-les parfaitement de niveau (horizontal) et d'aplomb (vertical).\n4. Tendez un cordeau entre ces blocs pour aligner le reste du rang." },
      { id: 'm5c2', title: 'Monter les rangs courants (Croisement)', duration: '2h', content: "Les parpaings doivent toujours être croisés en quinconce d'un rang sur l'autre, généralement d'un demi-bloc. Cela répartit les charges et solidarise le mur. Utilisez une truelle pour déposer deux bandes de mortier sur les parois du parpaing inférieur, puis posez le nouveau bloc en tapotant doucement avec le manche de la truelle." },
      { id: 'm5c3', title: 'Les joints', duration: '1h', content: "Au fur et à mesure que vous montez vos blocs, récupérez l'excédent de mortier qui bave avec votre truelle. Une fois le mortier un peu 'tiré' (légèrement durci), passez un fer à joint (ou un morceau de tuyau d'arrosage) pour lisser les joints et les rendre étanches." }
    ]
  },
  {
    id: 'm6', title: 'Béton Armé : Poteaux & Linteaux', icon: <Ruler size={24} />, color: 'from-zinc-500 to-zinc-800',
    level: 'Avancé', duration: '4h',
    chapters: [
      { id: 'm6c1', title: 'Coffrer un linteau', duration: '1h30', content: "Le linteau est la poutre qui soutient le mur au-dessus d'une fenêtre ou d'une porte.\nPour le réaliser, utilisez des parpaings en 'U' (blocs linteaux) ou fabriquez un coffrage en planches de bois étayé par en dessous. Assurez-vous que les étais sont fermement réglés." },
      { id: 'm6c2', title: 'Ferraillage et coulage du linteau', duration: '1h', content: "Placez une armature de chaînage rectangulaire dans votre coffrage. Les aciers ne doivent pas toucher le bois (utilisez des enrobeurs plastiques). Coulez un béton fortement dosé, vibrez-le bien pour qu'il s'infiltre partout autour des fers, et arasez la surface à la truelle." }
    ]
  },
  {
    id: 'm7', title: 'Dalles & Chapes', icon: <Layers size={24} />, color: 'from-cyan-600 to-cyan-800',
    level: 'Avancé', duration: '4h',
    chapters: [
      { id: 'm7c1', title: 'Préparer le hérisson et le polyane', duration: '1h', content: "Avant de couler une dalle sur terre-plein :\n1. Étalez une couche de graviers/cailloux compactés (le hérisson) sur 15cm pour drainer l'eau.\n2. Déroulez un film polyane (plastique) en faisant se chevaucher les lés de 20cm avec du gros scotch. Cela empêchera les remontées d'humidité dans votre maison." },
      { id: 'm7c2', title: 'Tirer une dalle à la règle', duration: '1h30', content: "Posez votre treillis soudé sur des cales. Coulez le béton en commençant par le fond de la pièce. Utilisez une grande règle de maçon en aluminium, posée sur des guides préalablement mis de niveau. Faites des mouvements de gauche à droite (en 'sciant') tout en reculant pour niveler le béton." }
    ]
  },
  {
    id: 'm8', title: 'Enduits de Façade', icon: <Paintbrush size={24} />, color: 'from-amber-200 to-amber-500',
    level: 'Expert', duration: '4h',
    chapters: [
      { id: 'm8c1', title: 'Le gobetis (Couche d\'accroche)', duration: '45 min', content: "Un enduit traditionnel se fait en 3 couches. La première est le Gobetis.\nC'est un mortier très liquide, très riche en ciment. On le projette violemment à la truelle contre le mur en parpaings pour créer une surface rugueuse, ce qui permettra à la couche suivante de s'accrocher fermement." },
      { id: 'm8c2', title: 'Le corps d\'enduit et la finition', duration: '2h', content: "La deuxième couche (le corps d'enduit) vient redresser le mur. Elle s'applique grassement et se tire à la règle. \nLa dernière couche (la finition) donne l'aspect final. Vous pouvez la talocher avec une taloche en plastique ou en éponge (aspect lisse) ou la gratter avec un gratton (aspect rustique)." }
    ]
  }
];

// --- DONNÉES : GLOSSAIRE ---
const GLOSSAIRE = [
  { term: 'Arase', def: 'Couche de mortier parfaitement de niveau sur laquelle on monte le premier rang.' },
  { term: 'Barbotine', def: 'Mélange liquide de ciment et d\'eau servant de liaison entre deux couches.' },
  { term: 'Chaînage', def: 'Armature en acier noyée dans le béton pour lier et solidifier les murs.' },
  { term: 'Cordeau', def: 'Ficelle tendue entre deux points servant de guide d\'alignement.' },
  { term: 'Décaissement', def: 'Action de creuser le sol pour préparer des fondations.' },
  { term: 'Enduit', def: 'Préparation de mortier appliquée sur un mur pour le protéger et le décorer.' },
  { term: 'Équerrage', def: 'Action de vérifier qu\'un angle fait exactement 90 degrés.' },
  { term: 'Ferraillage', def: 'Armatures métalliques destinées à armer le béton.' },
  { term: 'Gâchage', def: 'Action de mélanger le ciment, le sable, les graviers et l\'eau.' },
  { term: 'Hérisson', def: 'Couche de graviers damés constituant l\'assise d\'une dalle.' },
  { term: 'Linteau', def: 'Poutre située au-dessus d\'une ouverture (porte, fenêtre).' },
  { term: 'Parpaing', def: 'Bloc de béton manufacturé. Le composant de base des murs maçonnés.' },
  { term: 'Ragréage', def: 'Opération consistant à lisser une surface avant de poser un revêtement.' },
  { term: 'Taloche', def: 'Plaque munie d\'une poignée, servant à porter ou lisser le mortier.' },
  { term: 'Truelle', def: 'L\'outil symbolique du maçon, servant à manipuler le mortier.' }
];

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [selectedModule, setSelectedModule] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null); // Gère l'affichage d'une leçon en plein écran
  
  // Profil State & Sauvegarde Locale
  const [userProfile, setUserProfile] = useState({ name: '', level: 'Apprenti', avatar: '', completedLessons: [] });
  const [isNewUser, setIsNewUser] = useState(false);
  const [profileForm, setProfileForm] = useState({ name: '', level: 'Apprenti' });

  // Outils States
  const [toolTab, setToolTab] = useState('dalle');
  const [calcLength, setCalcLength] = useState('');
  const [calcWidth, setCalcWidth] = useState('');
  const [calcDepth, setCalcDepth] = useState('');
  const [wallLength, setWallLength] = useState('');
  const [wallHeight, setWallHeight] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // 1. Initialisation au lancement
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    const saved = localStorage.getItem('batipro_v3_profile');
    if (saved) {
      setUserProfile(JSON.parse(saved));
    } else {
      setIsNewUser(true);
    }
    return () => clearTimeout(timer);
  }, []);

  // 2. Sauvegarde du Profil
  const saveProfile = () => {
    if(!profileForm.name.trim()) return;
    const newProfile = { 
      ...userProfile, 
      name: profileForm.name, 
      level: profileForm.level,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${profileForm.name}&backgroundColor=1e293b`,
      completedLessons: userProfile.completedLessons || []
    };
    setUserProfile(newProfile);
    localStorage.setItem('batipro_v3_profile', JSON.stringify(newProfile));
    setIsNewUser(false);
  };

  // 3. Marquer une leçon comme terminée
  const finishLesson = (lessonId) => {
    if (!userProfile.completedLessons.includes(lessonId)) {
      const updatedLessons = [...userProfile.completedLessons, lessonId];
      const updatedProfile = { ...userProfile, completedLessons: updatedLessons };
      setUserProfile(updatedProfile);
      localStorage.setItem('batipro_v3_profile', JSON.stringify(updatedProfile));
    }
    setActiveLesson(null); // Ferme la leçon
  };

  // 4. Calcul de progression dynamique
  const getModuleProgress = (mod) => {
    if(!userProfile.completedLessons) return 0;
    const total = mod.chapters.length;
    const finished = mod.chapters.filter(c => userProfile.completedLessons.includes(c.id)).length;
    return Math.round((finished / total) * 100);
  };

  const totalFinished = userProfile.completedLessons?.length || 0;

  // 5. Conditions dynamiques des Badges
  const BADGES = [
    { id: 'bd1', name: 'Nouveau Casque', desc: 'Profil créé', icon: <HardHat size={24}/>, unlocked: userProfile.name !== '' },
    { id: 'bd2', name: 'Bases Solides', desc: 'Fini le Module 1', icon: <Shield size={24}/>, unlocked: getModuleProgress(MODULES[0]) === 100 },
    { id: 'bd3', name: 'Apprenti Actif', desc: '5 leçons terminées', icon: <BookOpen size={24}/>, unlocked: totalFinished >= 5 },
    { id: 'bd4', name: 'Maître Bâtisseur', desc: 'Toutes les leçons', icon: <Trophy size={24}/>, unlocked: totalFinished >= 20 },
  ];
  const unlockedBadgesCount = BADGES.filter(b => b.unlocked).length;

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
    const totalBlocks = Math.ceil((area / 0.1) * 1.05); // Parpaing 20x50 = 0.1m2
    return { area: area.toFixed(2), blocks: totalBlocks, mortar: Math.ceil(area * 15) };
  }, [wallLength, wallHeight]);

  // --- ECRAN DE CHARGEMENT ---
  if (isLoading) return (
    <div className="fixed inset-0 bg-slate-950 flex flex-col items-center justify-center z-[999]">
      <div className="w-16 h-16 border-4 border-slate-800 border-t-amber-500 rounded-full animate-spin mb-6"></div>
      <h2 className="text-amber-500 font-black text-xl tracking-widest uppercase animate-pulse">Chargement BâtiPro...</h2>
    </div>
  );

  // --- ECRAN ONBOARDING ---
  if (isNewUser) return (
    <div className="fixed inset-0 bg-slate-950 text-white flex flex-col p-6">
      <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
        <HardHat className="text-amber-500 mx-auto mb-6" size={64} />
        <h1 className="text-3xl font-black text-center mb-2">Bienvenue sur Bâti<span className="text-amber-500">Pro</span></h1>
        <p className="text-slate-400 text-center mb-10 text-sm">Crée ton profil pour commencer ta formation (sauvegardé sur cet appareil).</p>
        <div className="space-y-6">
          <div>
            <label className="text-[10px] font-black uppercase text-slate-500 block mb-2">Ton Prénom ou Surnom</label>
            <input type="text" value={profileForm.name} onChange={e=>setProfileForm({...profileForm, name: e.target.value})} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-4 text-white font-bold outline-none focus:border-amber-500" placeholder="Ex: Bob le Bricoleur" />
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
        <button onClick={saveProfile} className="w-full mt-10 bg-amber-500 text-slate-950 py-4 rounded-xl font-black uppercase tracking-widest">Enfiler mon casque</button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-slate-950 text-slate-100 flex flex-col font-sans overflow-hidden">
      
      {/* HEADER */}
      {!selectedModule && !activeLesson && (
        <header className="px-6 pt-6 pb-2 bg-slate-950 flex justify-between items-center z-40 relative">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/20"><HardHat size={22}/></div>
            <div><h1 className="text-xl font-black text-white leading-none">Bâti<span className="text-amber-500">Pro</span></h1></div>
          </div>
          <div className="w-10 h-10 rounded-full border-2 border-slate-700 overflow-hidden"><img src={userProfile.avatar} alt="Avatar" className="w-full h-full object-cover"/></div>
        </header>
      )}

      {/* CONTENU PRINCIPAL */}
      <main className="flex-1 overflow-y-auto custom-scroll pb-24 relative">
        
        {/* --- 1. ACCUEIL --- */}
        {activeTab === 'home' && !selectedModule && !activeLesson && (
          <div className="animate-in fade-in duration-500 space-y-8 p-6">
            <div>
              <h2 className="text-3xl font-black text-white">Salut, {userProfile.name} !</h2>
              <p className="text-amber-500 font-bold mt-1">Niveau : {userProfile.level}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl flex flex-col items-center text-center">
                <CheckCircle2 className="text-amber-500 mb-2" size={28} />
                <span className="text-2xl font-black text-white">{totalFinished}</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Leçons finies</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl flex flex-col items-center text-center">
                <Medal className="text-emerald-500 mb-2" size={28} />
                <span className="text-2xl font-black text-white">{unlockedBadgesCount} / {BADGES.length}</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Badges débloqués</span>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-[2rem] p-6">
              <h3 className="text-[10px] font-black uppercase text-slate-500 mb-4 flex items-center gap-2"><Trophy size={14}/> Tes Trophées</h3>
              <div className="grid grid-cols-2 gap-3">
                {BADGES.map((b) => (
                  <div key={b.id} className={`p-4 rounded-2xl border flex flex-col items-center text-center transition-all ${b.unlocked ? 'bg-amber-500/10 border-amber-500/30 text-amber-500' : 'bg-slate-950 border-slate-800 opacity-50 text-slate-600'}`}>
                      <div className="mb-2">{b.icon}</div>
                      <div className={`text-xs font-black mb-1 ${b.unlocked ? 'text-white' : 'text-slate-500'}`}>{b.name}</div>
                      <div className="text-[9px] opacity-70 leading-tight">{b.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- 2. LISTE DES MODULES --- */}
        {activeTab === 'courses' && !selectedModule && !activeLesson && (
          <div className="animate-in fade-in p-6 space-y-4">
            <div className="mb-6">
              <h1 className="text-3xl font-black text-white mb-1">L'Académie</h1>
              <p className="text-slate-400 text-sm">Choisis un module pour commencer.</p>
            </div>
            {MODULES.map((mod) => {
              const progress = getModuleProgress(mod);
              return (
                <div key={mod.id} onClick={() => setSelectedModule(mod)} className="bg-slate-900 border border-slate-800 rounded-[2rem] p-5 cursor-pointer hover:border-amber-500/50 transition-all">
                  <div className="flex gap-4 items-center">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${mod.color} flex items-center justify-center text-white shrink-0`}>{mod.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-black text-white text-base leading-tight">{mod.title}</h3>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">{mod.chapters.length} leçons</span>
                        <span className="text-[10px] font-bold text-amber-500">{progress}%</span>
                      </div>
                      <div className="w-full bg-slate-950 rounded-full h-1.5 mt-2 overflow-hidden">
                        <div className="bg-amber-500 h-full rounded-full transition-all duration-700" style={{ width: `${progress}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* --- 3. DÉTAIL D'UN MODULE (Liste des leçons) --- */}
        {activeTab === 'courses' && selectedModule && !activeLesson && (
          <div className="animate-in slide-in-from-right h-full flex flex-col absolute inset-0 bg-slate-950 z-50">
            <div className={`pt-12 pb-8 px-6 bg-gradient-to-br ${selectedModule.color} rounded-b-[3rem] shadow-2xl shrink-0 relative`}>
              <button onClick={() => setSelectedModule(null)} className="absolute top-6 left-6 w-10 h-10 bg-black/30 rounded-full flex items-center justify-center text-white"><ArrowLeft size={20} /></button>
              <div className="mt-8">
                <h1 className="text-3xl font-black text-white mt-2 leading-tight">{selectedModule.title}</h1>
                <p className="text-white/80 mt-2 font-bold">{getModuleProgress(selectedModule)}% Complété</p>
              </div>
            </div>
            <div className="flex-1 p-6 space-y-4 overflow-y-auto pb-24">
              {selectedModule.chapters.map((chap, idx) => {
                const isFinished = userProfile.completedLessons.includes(chap.id);
                return (
                  <div key={idx} onClick={() => setActiveLesson(chap)} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center gap-4 cursor-pointer hover:bg-slate-800 transition">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 ${isFinished ? 'bg-emerald-500/10 border-emerald-500 text-emerald-500' : 'bg-slate-950 border-slate-700 text-slate-500'}`}>
                      {isFinished ? <CheckCircle2 size={18} /> : <Play size={14} className="ml-0.5" />}
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-bold text-sm ${isFinished ? 'text-slate-400 line-through decoration-slate-600' : 'text-white'}`}>{chap.title}</h4>
                      <span className="text-[10px] text-slate-500 flex items-center gap-1 mt-1"><Clock size={10}/> {chap.duration}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* --- 4. LECTURE D'UNE LEÇON (Plein écran) --- */}
        {activeLesson && (
          <div className="animate-in slide-in-from-bottom h-full flex flex-col absolute inset-0 bg-slate-900 z-[100]">
            <header className="p-6 flex justify-between items-center border-b border-white/5 bg-slate-950">
              <div className="flex items-center gap-3 text-amber-500 font-bold"><BookOpen size={20}/> Leçon</div>
              <button onClick={() => setActiveLesson(null)} className="p-2 bg-slate-800 rounded-full text-white"><X size={20}/></button>
            </header>
            <div className="flex-1 p-6 overflow-y-auto">
              <h2 className="text-3xl font-black text-white mb-6 leading-tight">{activeLesson.title}</h2>
              <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 text-slate-300 text-base leading-relaxed whitespace-pre-wrap">
                {activeLesson.content}
              </div>
            </div>
            <div className="p-6 bg-slate-950 border-t border-white/5">
              {!userProfile.completedLessons.includes(activeLesson.id) ? (
                <button onClick={() => finishLesson(activeLesson.id)} className="w-full bg-amber-500 text-slate-950 py-4 rounded-xl font-black uppercase tracking-widest flex items-center justify-center gap-2">
                  <Check size={20}/> J'ai compris, terminer
                </button>
              ) : (
                <button onClick={() => setActiveLesson(null)} className="w-full bg-slate-800 text-white py-4 rounded-xl font-black uppercase tracking-widest">Fermer</button>
              )}
            </div>
          </div>
        )}

        {/* --- 5. OUTILS (Calculatrices) --- */}
        {activeTab === 'tools' && !selectedModule && !activeLesson && (
          <div className="animate-in fade-in p-6 space-y-6">
            <h1 className="text-3xl font-black text-white mb-1">Boîte à Outils</h1>
            <div className="flex bg-slate-900 rounded-2xl p-1 border border-slate-800">
              <button onClick={()=>setToolTab('dalle')} className={`flex-1 py-3 rounded-xl text-xs font-bold ${toolTab === 'dalle' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'}`}>Dalle</button>
              <button onClick={()=>setToolTab('mur')} className={`flex-1 py-3 rounded-xl text-xs font-bold ${toolTab === 'mur' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'}`}>Mur</button>
            </div>

            {toolTab === 'dalle' && (
              <div className="bg-slate-900 border border-slate-800 rounded-[2rem] p-6">
                <h2 className="text-lg font-black text-white mb-4 flex items-center gap-2"><Truck className="text-amber-500"/> Béton (350kg/m³)</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="text-[10px] font-black uppercase text-slate-500 mb-2 block">Long. (m)</label><input type="number" value={calcLength} onChange={e=>setCalcLength(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none focus:border-amber-500" /></div>
                    <div><label className="text-[10px] font-black uppercase text-slate-500 mb-2 block">Larg. (m)</label><input type="number" value={calcWidth} onChange={e=>setCalcWidth(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none focus:border-amber-500" /></div>
                  </div>
                  <div><label className="text-[10px] font-black uppercase text-slate-500 mb-2 block">Épaisseur (cm)</label><input type="number" value={calcDepth} onChange={e=>setCalcDepth(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none focus:border-amber-500" /></div>
                </div>
                {calcConcrete && (
                  <div className="mt-6 bg-slate-800 rounded-2xl overflow-hidden border border-slate-700">
                    <div className="bg-amber-500 text-slate-950 text-center py-2 font-black">{calcConcrete.vol} m³ de béton</div>
                    <div className="p-4 grid grid-cols-2 gap-2 text-center">
                      <div className="bg-slate-900 p-2 rounded-lg"><div className="font-black text-lg">{calcConcrete.ciment}</div><div className="text-[9px] text-slate-400">SACS (35kg)</div></div>
                      <div className="bg-slate-900 p-2 rounded-lg"><div className="font-black text-lg">{calcConcrete.sable}</div><div className="text-[9px] text-slate-400">KG SABLE</div></div>
                      <div className="bg-slate-900 p-2 rounded-lg"><div className="font-black text-lg">{calcConcrete.gravier}</div><div className="text-[9px] text-slate-400">KG GRAVIER</div></div>
                      <div className="bg-slate-900 p-2 rounded-lg"><div className="font-black text-lg">{calcConcrete.eau}</div><div className="text-[9px] text-slate-400">LITRES EAU</div></div>
                    </div>
                  </div>
                )}
              </div>
            )}
            {toolTab === 'mur' && (
              <div className="bg-slate-900 border border-slate-800 rounded-[2rem] p-6">
                <h2 className="text-lg font-black text-white mb-4 flex items-center gap-2"><Box className="text-orange-500"/> Parpaings (20x50)</h2>
                <div className="space-y-4">
                  <div><label className="text-[10px] font-black uppercase text-slate-500 mb-2 block">Longueur mur (m)</label><input type="number" value={wallLength} onChange={e=>setWallLength(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none focus:border-orange-500" /></div>
                  <div><label className="text-[10px] font-black uppercase text-slate-500 mb-2 block">Hauteur mur (m)</label><input type="number" value={wallHeight} onChange={e=>setWallHeight(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none focus:border-orange-500" /></div>
                </div>
                {calcWall && (
                  <div className="mt-6 bg-slate-800 rounded-2xl overflow-hidden border border-slate-700">
                    <div className="bg-orange-500 text-slate-950 text-center py-2 font-black">{calcWall.area} m² au total</div>
                    <div className="p-4 grid grid-cols-2 gap-2 text-center">
                      <div className="bg-slate-900 p-2 rounded-lg"><div className="font-black text-2xl text-orange-500">{calcWall.blocks}</div><div className="text-[9px] text-slate-400">PARPAINGS (+5%)</div></div>
                      <div className="bg-slate-900 p-2 rounded-lg"><div className="font-black text-2xl text-white">{calcWall.mortar}</div><div className="text-[9px] text-slate-400">LITRES MORTIER</div></div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

      </main>

      {/* NAV BOTTOM */}
      <nav className="absolute bottom-0 w-full bg-slate-950/95 backdrop-blur-2xl border-t border-slate-800/50 flex justify-around items-center pt-3 pb-6 px-1 z-40">
        {[
          { id: 'home', icon: <User size={22} />, label: 'Profil' },
          { id: 'courses', icon: <BookOpen size={22} />, label: 'Cours' },
          { id: 'tools', icon: <Calculator size={22} />, label: 'Outils' }
        ].map(item => (
          <button 
            key={item.id}
            onClick={() => {setActiveTab(item.id); setSelectedModule(null); setActiveLesson(null);}} 
            className={`flex flex-col items-center gap-1 w-1/3 transition-all duration-300 ${activeTab === item.id ? 'text-amber-500' : 'text-slate-500 hover:text-slate-300'}`}
          >
            {item.icon}
            <span className="text-[9px] font-black uppercase tracking-wider">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
