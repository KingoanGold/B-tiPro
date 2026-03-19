/* eslint-disable */
import React, { useState, useMemo, useEffect } from 'react';
import { 
  Hammer, HardHat, Calculator, BookOpen, User, 
  ArrowLeft, CheckCircle2, Play, Trophy, 
  Droplets, Flame, Truck, Layers, Clock, Box, Grid,
  Shield, Map, Paintbrush, Ruler, Medal, Pencil,
  X, Check
} from 'lucide-react';

// ==========================================
// BÂTIPRO : ENCYCLOPÉDIE DE LA MAÇONNERIE
// ==========================================

const MODULES = [
  {
    id: 'm1', title: 'Initiation & Sécurité (Normes)', icon: <Shield size={24} />, color: 'from-amber-500 to-orange-600',
    level: 'Débutant', duration: '2h30',
    chapters: [
      { 
        id: 'm1c1', title: 'Les EPI et les normes de sécurité', duration: '20 min', 
        content: "La sécurité n'est pas une option. Le milieu de la maçonnerie est particulièrement hostile.\n\n1. Le Casque (Norme EN 397) : Obligatoire dès qu'il y a un risque de chute de gravats ou d'utilisation d'engins.\n2. Chaussures de Sécurité (Norme S3) : Coque de protection (résiste à 200 joules), semelle anti-perforation (clous) et résistance à l'eau.\n3. Gants (Norme EN 388) : Le ciment frais a un pH de 12 à 13 (très basique). Sans gants enduits en nitrile, il provoque des brûlures chimiques et des dermatites dites 'gale du ciment'.\n4. Masque respiratoire (FFP2/FFP3) : Indispensable lors de la découpe de béton à la meuleuse. La poussière de silice est extrêmement nocive et provoque la silicose (maladie pulmonaire irréversible)." 
      },
      { 
        id: 'm1c2', title: 'Ergonomie : Préserver son dos', duration: '15 min', 
        content: "Un maçon manipule plusieurs tonnes par jour.\n\n• Levage : Ne courbez JAMAIS le dos pour ramasser un sac de 35 kg. Écartez les jambes, pliez les genoux, gardez le dos droit et poussez sur vos cuisses.\n• Port de charge : Gardez le poids collé à votre buste. Plus la charge est éloignée de votre corps, plus la pression sur les disques lombaires est décuplée par effet de levier.\n• La Torsion : Ne pivotez jamais seulement le buste lorsque vous portez une charge. Déplacez vos pieds pour tourner. La torsion chargée est la cause n°1 des hernies discales." 
      },
      { 
        id: 'm1c3', title: 'Le catalogue de l\'outillage à main', duration: '40 min', 
        content: "L'outillage doit être robuste et nettoyé à l'eau immédiatement après usage :\n\n• La Truelle : Ronde (pour gâcher), carrée, ou 'langue de chat' (très fine, pour les joints).\n• La Taloche : Plaque en plastique ou bois. Sert à stocker du mortier dans une main pendant qu'on l'applique de l'autre, ou à lisser ('talocher') un enduit.\n• Le Niveau tubulaire et Fil à plomb : Le niveau (1m idéalement) vérifie l'horizontalité. Pour un mur de plus de 2m de haut, le fil à plomb reste le maître absolu de la verticalité.\n• Règle en Aluminium (1.5m à 3m) : Pour aligner les parpaings ou 'tirer' le béton d'une dalle.\n• La Massette et la Broche (burin) : Pour les petits ajustements ou ébavurer." 
      },
    ]
  },
  {
    id: 'm2', title: 'Lecture de Plans & Implantation', icon: <Map size={24} />, color: 'from-blue-500 to-blue-700',
    level: 'Débutant', duration: '3h',
    chapters: [
      { 
        id: 'm2c1', title: 'Les Chaises d\'Implantation', duration: '45 min', 
        content: "C'est l'étape qui transfère le plan sur le terrain.\n\nLes 'chaises' sont deux piquets de bois plantés fermement, reliés par une planche horizontale parfaitement de niveau. On les place à l'extérieur de la zone à terrasser (recul de 1.5m) pour éviter qu'elles soient arrachées par la pelle mécanique.\n\nSur ces planches, on plante un clou. En reliant un clou d'une chaise à la chaise opposée avec un cordeau (ficelle fluo très résistante), on matérialise l'axe exact de nos futurs murs. L'intersection des cordeaux donne l'angle de la construction." 
      },
      { 
        id: 'm2c2', title: 'Nivellement : Tuyau d\'eau et Laser', duration: '30 min', 
        content: "Comment s'assurer que deux points distants de 20 mètres sont exactement à la même hauteur ?\n\n• Le niveau à eau (méthode traditionnelle) : Un long tuyau transparent rempli d'eau. Selon le principe des vases communicants, le niveau de l'eau sera toujours rigoureusement identique aux deux extrémités du tuyau, peu importe le terrain au milieu.\n• Le niveau Laser rotatif : Posé sur un trépied au centre du terrain, il projette une ligne rouge ou verte parfaitement horizontale à 360°. On utilise un récepteur fixé sur une mire (grande règle graduée) pour relever les hauteurs dans les fouilles." 
      },
      { 
        id: 'm2c3', title: 'L\'Équerrage (Théorème de Pythagore)', duration: '30 min', 
        content: "Sur de grandes longueurs, une équerre de maçon est trop imprécise. On utilise la méthode du 3-4-5 (a² + b² = c²).\n\n1. À l'intersection de vos cordeaux, mesurez exactement 3 mètres sur le cordeau A et faites une marque.\n2. Mesurez 4 mètres sur le cordeau B et marquez-le.\n3. Mesurez la diagonale entre ces deux marques.\n4. Si la diagonale mesure EXACTEMENT 5 mètres, votre angle est à 90°. Sinon, décalez doucement un cordeau sur sa chaise jusqu'à obtenir 5 mètres." 
      }
    ]
  },
  {
    id: 'm3', title: 'Les Fondations (DTU 13.1)', icon: <Layers size={24} />, color: 'from-stone-500 to-stone-700',
    level: 'Intermédiaire', duration: '4h',
    chapters: [
      { 
        id: 'm3c1', title: 'Fouilles et profondeur Hors-Gel', duration: '40 min', 
        content: "Une maison solide commence dans la terre. Vous devez creuser jusqu'à atteindre le 'bon sol' (la couche d'assise porteuse).\n\nLa profondeur hors-gel : Les semelles doivent reposer sous cette ligne virtuelle. Si l'eau gèle sous la fondation, elle gonfle (augmentation de volume de 9%), soulève la maison et crée des fissures structurelles. \nLa profondeur dépend de la région : 50 cm en climat doux océanique, 80 cm dans l'Est, et plus de 1m en montagne." 
      },
      { 
        id: 'm3c2', title: 'Béton de propreté et Enrobage', duration: '30 min', 
        content: "Ne posez JAMAIS l'acier directement sur la terre !\n\n1. Béton de propreté : Au fond de la fouille, coulez 4 cm d'un béton faiblement dosé (150kg/m³). Il crée une surface de travail plane et propre.\n2. L'Enrobage : L'acier de vos semelles filantes doit être totalement enrobé de béton (min 3 à 5 cm tout autour) pour le protéger de la corrosion. Utilisez des cales en plastique pour surélever les armatures sur le béton de propreté." 
      },
      { 
        id: 'm3c3', title: 'Recouvrement et liaisons d\'angle', duration: '45 min', 
        content: "Les armatures (semelles de 6m de long) doivent être reliées entre elles.\n\n• Le recouvrement : Les fers doivent se superposer sur une longueur égale à 50 fois leur diamètre (Ex: pour un fer de Ø10mm, le recouvrement est de 50cm). Attachez-les avec du fil de fer recuit et une tenaille.\n• Les angles : On ne croise pas simplement les semelles dans les angles. On utilise des équerres de liaison (fers tordus à 90°) pour assurer la continuité mécanique de la fondation." 
      }
    ]
  },
  {
    id: 'm4', title: 'Liants : Mortiers & Bétons', icon: <Droplets size={24} />, color: 'from-slate-400 to-slate-600',
    level: 'Intermédiaire', duration: '3h',
    chapters: [
      { 
        id: 'm4c1', title: 'La différence fondamentale', duration: '20 min', 
        content: "Ne confondez plus jamais ces deux liants.\n\nLE MORTIER : Ciment (ou chaux) + Sable + Eau.\nC'est la 'colle'. Il sert à jointer les parpaings, sceller des appuis, faire une chape ou un enduit.\n\nLE BÉTON : Ciment + Sable + GRAVIERS + Eau.\nC'est la 'structure'. Le gravier forme le squelette qui encaisse la compression (le poids). Il sert pour les fondations, dalles, poteaux et linteaux." 
      },
      { 
        id: 'm4c2', title: 'La règle des dosages (Cimenterie)', duration: '45 min', 
        content: "Dosage standard Béton (350 kg/m³) :\nÀ la pelle (règle du 1-2-3) : 1 volume de ciment, 2 de sable, 3 de graviers, 1/2 d'eau.\nÀ la bétonnière (pour 1 sac de 35kg) : 35kg ciment + 50L sable + 70L graviers + 17L eau.\n\nDosage Mortier de montage (300 kg/m³) :\nPour 1 sac de 35kg de ciment : 100 à 120L de sable (soit 10 à 12 seaux de maçon) + 17L d'eau.\n\nATTENTION : Trop d'eau ruine la résistance du béton et crée de la laitance. L'eau ne doit représenter que la moitié du poids du ciment." 
      },
      { 
        id: 'm4c3', title: 'La Chaux et le Mortier Bâtard', duration: '30 min', 
        content: "Pour la rénovation de vieux murs en pierre, le ciment gris (Portland) est à proscrire : il est trop rigide et bloque l'humidité, faisant pourrir la pierre.\n\nOn utilise la Chaux (NHL 3.5 ou NHL 5). Elle est souple, respirante, et fongicide.\nLe 'Mortier Bâtard' est un mélange : 50% Ciment + 50% Chaux + Sable + Eau. Il combine la résistance rapide du ciment et la souplesse de la chaux. Parfait pour sceller des tuiles ou crépir un muret." 
      }
    ]
  },
  {
    id: 'm5', title: 'Élévation : Murs en Parpaings', icon: <Box size={24} />, color: 'from-orange-600 to-red-700',
    level: 'Avancé', duration: '5h',
    chapters: [
      { 
        id: 'm5c1', title: 'La Coupure de capillarité (Arase)', duration: '45 min', 
        content: "L'humidité du sol remonte dans les murs (capillarité), détruisant les plâtres intérieurs. Pour bloquer cela, le DTU impose une coupure sous le premier rang habitable.\n\nSoit on déroule une bande bitumeuse (feutre), soit on réalise une 'arase étanche' : une couche de mortier de 2cm d'épaisseur, fortement dosée (400kg/m³) et additionnée d'hydrofuge de masse (adjuvant liquide qui bouche les pores du ciment)." 
      },
      { 
        id: 'm5c2', title: 'Le rang de départ', duration: '1h', 
        content: "Si le 1er rang est de travers, tout le mur le sera.\n1. Étalez un lit de mortier épais.\n2. Posez vos blocs d'angle (blocs creux pour recevoir les fers verticaux) aux extrémités du mur.\n3. Réglez-les au millimètre (fil à plomb et grand niveau).\n4. Tendez un cordeau bien tendu entre les arêtes supérieures de ces deux blocs. Ne touchez jamais le cordeau en posant les blocs intermédiaires (laissez 1mm d'écart)." 
      },
      { 
        id: 'm5c3', title: 'Croisement et joints', duration: '1h30', 
        content: "Règle d'or : Les joints verticaux ne doivent jamais être superposés (coup de sabre). On croise les blocs d'un demi-parpaing ou d'un tiers au minimum pour répartir les charges.\n\nPose : Déposez deux boudins de mortier sur les bords extérieurs du parpaing inférieur. Graissez les 'oreilles' du nouveau bloc. Positionnez, tapotez avec le manche de la truelle pour régler l'aplomb.\nFinition : Une fois le mortier un peu 'tiré' (durci), passez un fer à joint (ou un morceau de tuyau d'arrosage) pour serrer et lisser les joints." 
      }
    ]
  },
  {
    id: 'm6', title: 'Dalles & Planchers (Hérisson)', icon: <Layers size={24} />, color: 'from-cyan-600 to-cyan-800',
    level: 'Avancé', duration: '4h',
    chapters: [
      { 
        id: 'm6c1', title: 'Hérisson et Film Polyane', duration: '1h', 
        content: "Pour une dalle sur terre-plein (rez-de-chaussée) :\n1. Le Hérisson : Couche de 15 à 20 cm de cailloux (calibre 40/80) compactés à la plaque vibrante. Il sert à drainer l'eau sous la dalle et créer une assise solide. (On n'utilise jamais de terre ou de gravats contenant du plâtre).\n2. Le Polyane : Film plastique épais déroulé sur le hérisson, remontant sur les bords des murs. Il bloque définitivement les remontées d'humidité." 
      },
      { 
        id: 'm6c2', title: 'Treillis soudé et Joints de dilatation', duration: '1h', 
        content: "Le treillis soudé (ST25 C en général pour une dalle de maison) est le ferraillage de la dalle. Il doit être posé sur des cales pour être noyé au milieu de l'épaisseur du béton (souvent 12 cm au total).\n\nLe béton se dilate avec la chaleur et se rétracte au séchage. Pour éviter des fissures anarchiques, on place des joints de fractionnement (profilés en PVC) tous les 15 à 20 m², ou on scie la dalle sur 1/3 de son épaisseur le lendemain du coulage." 
      },
      { 
        id: 'm6c3', title: 'Tirer la dalle à la règle', duration: '1h30', 
        content: "Commencez par couler le béton au fond de la pièce pour reculer vers la sortie.\nLe geste du tirage : Utilisez une grande règle en aluminium posée sur des guides préalablement mis de niveau (tubes en acier ou joints PVC). Faites des mouvements de va-et-vient latéraux (comme une scie) en tirant la règle vers vous. Le mouvement latéral fait remonter la laitance et lisse la surface, tandis que le mouvement arrière égalise la hauteur." 
      }
    ]
  }
];

const GLOSSAIRE = [
  { term: 'Adjuvant', def: 'Produit ajouté au béton ou mortier pour modifier ses propriétés (antigel, hydrofuge, plastifiant).' },
  { term: 'Agglo', def: 'Abréviation d\'aggloméré, l\'autre nom commun du parpaing de ciment.' },
  { term: 'Arase', def: 'Couche de mortier parfaitement de niveau sur laquelle on monte le premier rang d\'un mur.' },
  { term: 'Banche', def: 'Grand panneau de coffrage (souvent métallique) utilisé pour couler des murs entiers en béton armé.' },
  { term: 'Barbotine', def: 'Mélange très liquide de ciment et d\'eau servant de colle de liaison (souvent utilisé pour le carrelage ou la reprise de béton).' },
  { term: 'Chaînage', def: 'Armature en acier noyée dans le béton (horizontale ou verticale) pour lier, ceinturer et solidifier les murs.' },
  { term: 'Cordeau', def: 'Ficelle colorée tendue entre deux piquets ou blocs servant de guide d\'alignement rectiligne.' },
  { term: 'Coup de sabre', def: 'Défaut grave de maçonnerie où les joints verticaux de deux rangs de parpaings sont superposés, créant une ligne de fragilité.' },
  { term: 'Cure du béton', def: 'Action de protéger le béton frais contre une évaporation trop rapide de son eau (bâchage ou arrosage en plein été).' },
  { term: 'Décaissement', def: 'Action de creuser et retirer la couche de terre végétale pour atteindre le bon sol.' },
  { term: 'Enrobage', def: 'Épaisseur de béton recouvrant les armatures en acier pour les protéger de la corrosion (minimum 3cm).' },
  { term: 'Équerrage', def: 'Action de vérifier ou tracer un angle à exactement 90 degrés (règle du 3-4-5).' },
  { term: 'Ferraillage', def: 'Mise en place des armatures métalliques destinées à armer le béton et lui donner sa résistance à la traction.' },
  { term: 'Gâchage', def: 'Action de mélanger le liant (ciment/chaux), les agrégats (sable/gravier) et l\'eau pour obtenir le mortier/béton.' },
  { term: 'Gobetis', def: 'Première couche d\'un enduit, projetée très liquide, servant de couche d\'accroche rugueuse pour le corps d\'enduit.' },
  { term: 'Hérisson', def: 'Couche de pierres et graviers damés, exempte de terre, constituant la couche drainante sous une dalle.' },
  { term: 'Hydrofuge', def: 'Produit (liquide ou poudre) qui rend un mortier ou un béton imperméable à l\'eau.' },
  { term: 'Linteau', def: 'Poutre horizontale en béton armé, bois ou acier, située au-dessus d\'une ouverture (porte, fenêtre) soutenant la maçonnerie supérieure.' },
  { term: 'Laitance', def: 'Couche blanchâtre et friable qui remonte à la surface d\'un béton trop riche en eau.' },
  { term: 'Parpaing', def: 'Bloc de maçonnerie manufacturé en béton, creux ou plein. Standard : 50x20x20cm.' },
  { term: 'Plumb (Aplomb)', def: 'Ce qui est parfaitement vertical (vérifié au fil à plomb ou au niveau).' },
  { term: 'Polyane', def: 'Film plastique épais étanche placé sous le béton d\'une dalle pour bloquer les remontées capillaires d\'humidité.' },
  { term: 'Ragréage', def: 'Application d\'un enduit très fin et auto-lissant sur une dalle pour rattraper les défauts de planéité avant pose d\'un revêtement.' },
  { term: 'Refus (Bon sol)', def: 'Couche géologique profonde et dure sur laquelle les fondations peuvent reposer sans risque d\'affaissement.' },
  { term: 'Semelle', def: 'Base de la fondation (souvent filante sous les murs), armée de ferraillage, qui répartit le poids du bâtiment sur le sol.' },
  { term: 'Taloche', def: 'Outil de maçon, plaque munie d\'une poignée, servant à porter le mortier ou à réaliser la finition d\'un enduit.' },
  { term: 'Tirage', def: 'Action de niveler et lisser le béton frais d\'une dalle en reculant avec une règle en aluminium.' },
  { term: 'Treillis soudé', def: 'Grillage d\'armatures en acier croisées et soudées, utilisé pour ferrailler les dalles et planchers.' },
  { term: 'Truelle', def: 'L\'outil symbolique du maçon. Lame d\'acier servant à prendre, jeter, étaler et couper le mortier.' },
  { term: 'Vibration', def: 'Action d\'utiliser une aiguille vibrante plongée dans le béton frais pour en expulser l\'air et le compacter.' }
];

const BADGES = [
  { id: 'bd1', name: 'Le Casque', desc: 'Profil créé', icon: <HardHat size={24}/> },
  { id: 'bd2', name: 'Sécurisé', desc: 'Module 1 fini', icon: <Shield size={24}/> },
  { id: 'bd3', name: 'Chef de Chantier', desc: '5 leçons lues', icon: <BookOpen size={24}/> },
  { id: 'bd4', name: 'L\'Artisan', desc: 'Plus de 10 leçons', icon: <Trophy size={24}/> },
];

const LoadingScreen = () => (
  <div className="fixed inset-0 bg-slate-950 flex flex-col items-center justify-center z-[999] overflow-hidden">
    <style>{`
      @keyframes dropHeavy {
        0% { transform: translateY(-300px); opacity: 0; }
        60% { transform: translateY(10px); opacity: 1; }
        80% { transform: translateY(-5px); opacity: 1; }
        100% { transform: translateY(0); opacity: 1; }
      }
      .b-1 { animation: dropHeavy 0.6s cubic-bezier(0.25, 1, 0.5, 1) forwards; opacity: 0; animation-delay: 0.1s; }
      .b-2 { animation: dropHeavy 0.6s cubic-bezier(0.25, 1, 0.5, 1) forwards; opacity: 0; animation-delay: 0.4s; }
      .b-3 { animation: dropHeavy 0.6s cubic-bezier(0.25, 1, 0.5, 1) forwards; opacity: 0; animation-delay: 0.7s; }
      .b-4 { animation: dropHeavy 0.6s cubic-bezier(0.25, 1, 0.5, 1) forwards; opacity: 0; animation-delay: 1.0s; }
      .b-5 { animation: dropHeavy 0.6s cubic-bezier(0.25, 1, 0.5, 1) forwards; opacity: 0; animation-delay: 1.3s; }
    `}</style>
    <div className="relative w-48 h-40 mb-8">
      <div className="b-1 absolute bottom-0 left-0 w-14 h-8 bg-stone-400 border-[3px] border-stone-600 shadow-lg flex items-center justify-center"><div className="w-8 h-3 border-2 border-stone-500 rounded-sm"></div></div>
      <div className="b-2 absolute bottom-0 left-[60px] w-14 h-8 bg-stone-400 border-[3px] border-stone-600 shadow-lg flex items-center justify-center"><div className="w-8 h-3 border-2 border-stone-500 rounded-sm"></div></div>
      <div className="b-3 absolute bottom-0 left-[120px] w-14 h-8 bg-stone-400 border-[3px] border-stone-600 shadow-lg flex items-center justify-center"><div className="w-8 h-3 border-2 border-stone-500 rounded-sm"></div></div>
      <div className="b-4 absolute bottom-[32px] left-[30px] w-14 h-8 bg-stone-400 border-[3px] border-stone-600 shadow-lg flex items-center justify-center"><div className="w-8 h-3 border-2 border-stone-500 rounded-sm"></div></div>
      <div className="b-5 absolute bottom-[32px] left-[90px] w-14 h-8 bg-stone-400 border-[3px] border-stone-600 shadow-lg flex items-center justify-center"><div className="w-8 h-3 border-2 border-stone-500 rounded-sm"></div></div>
    </div>
    <h2 className="text-amber-500 font-black text-xl tracking-widest uppercase animate-pulse">Coulage des fondations...</h2>
  </div>
);

// ==========================================
// DÉBUT DE LA PARTIE 2 (Composant Principal)
// ==========================================

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [selectedModule, setSelectedModule] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null); 
  
  const [userProfile, setUserProfile] = useState({ name: '', level: 'Apprenti', avatar: '', completedLessons: [] });
  const [isNewUser, setIsNewUser] = useState(true);
  const [profileForm, setProfileForm] = useState({ name: '', level: 'Apprenti' });

  // Outils States
  const [toolTab, setToolTab] = useState('dalle');
  const [calcLength, setCalcLength] = useState('');
  const [calcWidth, setCalcWidth] = useState('');
  const [calcDepth, setCalcDepth] = useState('');
  const [wallLength, setWallLength] = useState('');
  const [wallHeight, setWallHeight] = useState('');
  
  // Glossaire State
  const [searchQuery, setSearchQuery] = useState('');

  // 1. Initialisation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000); // 2 secondes de faux chargement pour voir l'animation
    const saved = localStorage.getItem('batipro_v5_profile');
    if (saved) {
      setUserProfile(JSON.parse(saved));
      setIsNewUser(false);
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
    localStorage.setItem('batipro_v5_profile', JSON.stringify(newProfile));
    setIsNewUser(false);
  };

  // 3. Marquer une leçon comme terminée
  const finishLesson = (lessonId) => {
    if (!userProfile.completedLessons.includes(lessonId)) {
      const updatedLessons = [...userProfile.completedLessons, lessonId];
      const updatedProfile = { ...userProfile, completedLessons: updatedLessons };
      setUserProfile(updatedProfile);
      localStorage.setItem('batipro_v5_profile', JSON.stringify(updatedProfile));
    }
    setActiveLesson(null);
  };

  // 4. Calcul de progression dynamique
  const getModuleProgress = (mod) => {
    if(!userProfile.completedLessons) return 0;
    const total = mod.chapters.length;
    const finished = mod.chapters.filter(c => userProfile.completedLessons.includes(c.id)).length;
    return Math.round((finished / total) * 100);
  };

  const totalFinished = userProfile.completedLessons?.length || 0;

  // 5. Conditions dynamiques des Badges (Évaluées à la volée)
  const badgesWithStatus = BADGES.map(b => {
    let unlocked = false;
    if (b.id === 'bd1') unlocked = userProfile.name !== '';
    if (b.id === 'bd2') unlocked = getModuleProgress(MODULES[0]) === 100;
    if (b.id === 'bd3') unlocked = totalFinished >= 5;
    if (b.id === 'bd4') unlocked = totalFinished >= 10;
    return { ...b, unlocked };
  });
  
  const unlockedBadgesCount = badgesWithStatus.filter(b => b.unlocked).length;

  // Logiques Calculatrices
  const calcConcrete = useMemo(() => {
    const l = parseFloat(calcLength), w = parseFloat(calcWidth), d = parseFloat(calcDepth) / 100;
    if (!l || !w || !d || l <= 0 || w <= 0 || d <= 0) return null;
    const vol = l * w * d;
    return { 
      vol: vol.toFixed(2), 
      ciment: Math.ceil(vol * 10), // 350kg/m3 = 10 sacs de 35kg
      sable: Math.round(vol * 800), 
      gravier: Math.round(vol * 1000), 
      eau: Math.round(vol * 175) 
    };
  }, [calcLength, calcWidth, calcDepth]);

  const calcWall = useMemo(() => {
    const l = parseFloat(wallLength), h = parseFloat(wallHeight);
    if (!l || !h || l <= 0 || h <= 0) return null;
    const area = l * h;
    const totalBlocks = Math.ceil((area / 0.1) * 1.05); // Un parpaing 20x50 = 0.1m², +5% de casse
    return { 
      area: area.toFixed(2), 
      blocks: totalBlocks, 
      mortar: Math.ceil(area * 15) // ~15 Litres par m²
    };
  }, [wallLength, wallHeight]);

  // --- ECRAN CHARGEMENT ---
  if (isLoading) return <LoadingScreen />;

  // --- ECRAN ONBOARDING (Création profil) ---
  if (isNewUser) return (
    <div className="fixed inset-0 bg-slate-950 text-white flex flex-col p-6 z-[999]">
      <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
        <HardHat className="text-amber-500 mx-auto mb-6" size={64} />
        <h1 className="text-3xl font-black text-center mb-2">Bienvenue sur Bâti<span className="text-amber-500">Pro</span></h1>
        <p className="text-slate-400 text-center mb-10 text-sm">Crée ton profil pour commencer ta formation. (Progression sauvegardée sur cet appareil).</p>
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
        <button onClick={saveProfile} className="w-full mt-10 bg-amber-500 text-slate-950 py-4 rounded-xl font-black uppercase tracking-widest shadow-lg shadow-amber-500/20">Enfiler mon casque</button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-slate-950 text-slate-100 flex flex-col font-sans overflow-hidden">
      
      {/* HEADER PRINCIPAL */}
      {!selectedModule && !activeLesson && (
        <header className="px-6 pt-6 pb-2 bg-slate-950 flex justify-between items-center z-40 relative border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/20"><HardHat size={22}/></div>
            <div>
              <h1 className="text-xl font-black text-white leading-none">Bâti<span className="text-amber-500">Pro</span></h1>
              <span className="text-[9px] text-slate-400 uppercase font-bold tracking-widest">L'Encyclopédie</span>
            </div>
          </div>
          <button onClick={() => setActiveTab('profile')} className="w-10 h-10 rounded-full border-2 border-slate-700 overflow-hidden"><img src={userProfile.avatar} alt="Avatar" className="w-full h-full object-cover"/></button>
        </header>
      )}

      {/* ZONE DE CONTENU PRINCIPALE */}
      <main className="flex-1 overflow-y-auto custom-scroll pb-24 relative">
        
        {/* --- ONGLET 1 : ACCUEIL --- */}
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
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Badges obtenus</span>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-[2rem] p-6">
              <h3 className="text-[10px] font-black uppercase text-slate-500 mb-4 flex items-center gap-2"><Trophy size={14}/> Tes Trophées</h3>
              <div className="grid grid-cols-2 gap-3">
                {badgesWithStatus.map((b) => (
                  <div key={b.id} className={`p-4 rounded-2xl border flex flex-col items-center text-center transition-all ${b.unlocked ? 'bg-amber-500/10 border-amber-500/30 text-amber-500' : 'bg-slate-950 border-slate-800 opacity-50 text-slate-600'}`}>
                      <div className="mb-2">{b.icon}</div>
                      <div className={`text-xs font-black mb-1 ${b.unlocked ? 'text-white' : 'text-slate-500'}`}>{b.name}</div>
                      <div className="text-[9px] opacity-70 leading-tight">{b.desc}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <button onClick={() => setActiveTab('courses')} className="w-full bg-slate-900 border border-slate-800 py-4 rounded-2xl font-bold flex justify-center items-center gap-2 hover:bg-slate-800 transition">
               <BookOpen size={18} className="text-amber-500" /> Reprendre la formation
            </button>
          </div>
        )}

        {/* --- ONGLET 2 : COURS (LISTE DES MODULES) --- */}
        {activeTab === 'courses' && !selectedModule && !activeLesson && (
          <div className="animate-in fade-in p-6 space-y-4">
            <div className="mb-6">
              <h1 className="text-3xl font-black text-white mb-1">L'Académie</h1>
              <p className="text-slate-400 text-sm">Des fondations jusqu'aux finitions.</p>
            </div>
            {MODULES.map((mod) => {
              const progress = getModuleProgress(mod);
              return (
                <div key={mod.id} onClick={() => setSelectedModule(mod)} className="bg-slate-900 border border-slate-800 rounded-[2rem] p-5 cursor-pointer hover:border-amber-500/50 hover:bg-slate-800/80 transition-all shadow-lg">
                  <div className="flex gap-4 items-center">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${mod.color} flex items-center justify-center text-white shrink-0`}>{mod.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-black text-white text-base leading-tight">{mod.title}</h3>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">{mod.chapters.length} leçons</span>
                        <span className="text-[10px] font-bold text-amber-500">{progress}%</span>
                      </div>
                      <div className="w-full bg-slate-950 rounded-full h-1.5 mt-2 overflow-hidden border border-slate-800">
                        <div className="bg-amber-500 h-full rounded-full transition-all duration-700" style={{ width: `${progress}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* --- 3. DÉTAIL D'UN MODULE (LISTE DES CHAPITRES) --- */}
        {activeTab === 'courses' && selectedModule && !activeLesson && (
          <div className="animate-in slide-in-from-right h-full flex flex-col absolute inset-0 bg-slate-950 z-50">
            <div className={`pt-12 pb-8 px-6 bg-gradient-to-br ${selectedModule.color} rounded-b-[3rem] shadow-2xl shrink-0 relative`}>
              <button onClick={() => setSelectedModule(null)} className="absolute top-6 left-6 w-10 h-10 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/50"><ArrowLeft size={20} /></button>
              <div className="mt-8">
                <span className="text-white/80 text-[10px] font-black uppercase tracking-widest">{selectedModule.level} • {selectedModule.duration}</span>
                <h1 className="text-3xl font-black text-white mt-2 leading-tight">{selectedModule.title}</h1>
                <p className="text-white mt-4 font-bold bg-black/20 inline-block px-3 py-1 rounded-full text-xs border border-white/20">{getModuleProgress(selectedModule)}% Complété</p>
              </div>
            </div>
            <div className="flex-1 p-6 space-y-4 overflow-y-auto pb-24 custom-scroll">
              <h3 className="font-black text-white text-lg mb-2">Programme du module</h3>
              {selectedModule.chapters.map((chap, idx) => {
                const isFinished = userProfile.completedLessons.includes(chap.id);
                return (
                  <div key={idx} onClick={() => setActiveLesson(chap)} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center gap-4 cursor-pointer hover:bg-slate-800 transition group">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 ${isFinished ? 'bg-emerald-500/10 border-emerald-500 text-emerald-500' : 'bg-slate-950 border-slate-700 text-slate-500 group-hover:border-amber-500 group-hover:text-amber-500'}`}>
                      {isFinished ? <CheckCircle2 size={18} /> : <Play size={14} className="ml-0.5" />}
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-bold text-sm leading-snug ${isFinished ? 'text-slate-400 line-through decoration-slate-600' : 'text-white'}`}>{chap.title}</h4>
                      <span className="text-[10px] text-slate-500 flex items-center gap-1 mt-1"><Clock size={10}/> {chap.duration}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* --- 4. LECTURE D'UNE LEÇON (PLEIN ÉCRAN) --- */}
        {activeLesson && (
          <div className="animate-in slide-in-from-bottom h-full flex flex-col absolute inset-0 bg-slate-900 z-[100]">
            <header className="p-6 flex justify-between items-center border-b border-white/5 bg-slate-950 shrink-0">
              <div className="flex items-center gap-3 text-amber-500 font-bold"><BookOpen size={20}/> Lecture en cours</div>
              <button onClick={() => setActiveLesson(null)} className="p-2 bg-slate-800 rounded-full text-white hover:bg-slate-700"><X size={20}/></button>
            </header>
            <div className="flex-1 p-6 overflow-y-auto custom-scroll">
              <h2 className="text-3xl font-black text-white mb-8 leading-tight">{activeLesson.title}</h2>
              <div className="text-slate-300 text-lg leading-relaxed whitespace-pre-wrap font-medium">
                {activeLesson.content}
              </div>
            </div>
            <div className="p-6 bg-slate-950 border-t border-white/5 shrink-0">
              {!userProfile.completedLessons.includes(activeLesson.id) ? (
                <button onClick={() => finishLesson(activeLesson.id)} className="w-full bg-amber-500 text-slate-950 py-4 rounded-xl font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-amber-400 transition">
                  <Check size={20}/> J'ai compris, terminer
                </button>
              ) : (
                <button onClick={() => setActiveLesson(null)} className="w-full bg-slate-800 text-white py-4 rounded-xl font-black uppercase tracking-widest hover:bg-slate-700 transition">Fermer la leçon</button>
              )}
            </div>
          </div>
        )}

        {/* --- ONGLET 3 : BOÎTE À OUTILS --- */}
        {activeTab === 'tools' && !selectedModule && !activeLesson && (
          <div className="animate-in fade-in p-6 space-y-6">
            <h1 className="text-3xl font-black text-white mb-1">Boîte à Outils</h1>
            <p className="text-slate-400 text-sm mb-6">Calculatrices de précision pour vos commandes.</p>

            <div className="flex bg-slate-900 rounded-2xl p-1 border border-slate-800">
              <button onClick={()=>setToolTab('dalle')} className={`flex-1 py-3 rounded-xl text-xs font-bold transition-colors ${toolTab === 'dalle' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}>Béton</button>
              <button onClick={()=>setToolTab('mur')} className={`flex-1 py-3 rounded-xl text-xs font-bold transition-colors ${toolTab === 'mur' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}>Parpaings</button>
            </div>

            {/* Outil 1 : Dalle Béton */}
            {toolTab === 'dalle' && (
              <div className="bg-slate-900 border border-slate-800 rounded-[2rem] p-6 animate-in zoom-in-95 duration-200">
                <h2 className="text-lg font-black text-white mb-6 flex items-center gap-3"><Truck className="text-amber-500" size={24}/> Dalle (350kg/m³)</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-black uppercase text-slate-500 mb-2 block">Long. (m)</label>
                      <input type="number" value={calcLength} onChange={e=>setCalcLength(e.target.value)} placeholder="Ex: 5" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none focus:border-amber-500 transition" />
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase text-slate-500 mb-2 block">Larg. (m)</label>
                      <input type="number" value={calcWidth} onChange={e=>setCalcWidth(e.target.value)} placeholder="Ex: 4" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none focus:border-amber-500 transition" />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-500 mb-2 block">Épaisseur (cm)</label>
                    <input type="number" value={calcDepth} onChange={e=>setCalcDepth(e.target.value)} placeholder="Ex: 12" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none focus:border-amber-500 transition" />
                  </div>
                </div>

                {calcConcrete && (
                  <div className="mt-8 bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 shadow-xl">
                    <div className="bg-amber-500 text-slate-950 text-center py-3 font-black text-xl">{calcConcrete.vol} m³ <span className="text-sm">de béton</span></div>
                    <div className="p-4 grid grid-cols-2 gap-3 text-center">
                      <div className="bg-slate-900 p-3 rounded-xl border border-slate-700/50">
                        <div className="font-black text-2xl text-white">{calcConcrete.ciment}</div>
                        <div className="text-[9px] text-slate-400 font-bold uppercase mt-1">Sacs (35kg)</div>
                      </div>
                      <div className="bg-slate-900 p-3 rounded-xl border border-slate-700/50">
                        <div className="font-black text-2xl text-white">{calcConcrete.sable}</div>
                        <div className="text-[9px] text-slate-400 font-bold uppercase mt-1">Kg Sable</div>
                      </div>
                      <div className="bg-slate-900 p-3 rounded-xl border border-slate-700/50">
                        <div className="font-black text-2xl text-white">{calcConcrete.gravier}</div>
                        <div className="text-[9px] text-slate-400 font-bold uppercase mt-1">Kg Gravier</div>
                      </div>
                      <div className="bg-slate-900 p-3 rounded-xl border border-slate-700/50">
                        <div className="font-black text-2xl text-white">{calcConcrete.eau}</div>
                        <div className="text-[9px] text-slate-400 font-bold uppercase mt-1">Litres Eau</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Outil 2 : Mur en Parpaings */}
            {toolTab === 'mur' && (
              <div className="bg-slate-900 border border-slate-800 rounded-[2rem] p-6 animate-in zoom-in-95 duration-200">
                <h2 className="text-lg font-black text-white mb-6 flex items-center gap-3"><Box className="text-orange-500" size={24}/> Mur Agglos (20x50)</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-500 mb-2 block">Longueur du mur (m)</label>
                    <input type="number" value={wallLength} onChange={e=>setWallLength(e.target.value)} placeholder="Ex: 10" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none focus:border-orange-500 transition" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-500 mb-2 block">Hauteur du mur (m)</label>
                    <input type="number" value={wallHeight} onChange={e=>setWallHeight(e.target.value)} placeholder="Ex: 2.5" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none focus:border-orange-500 transition" />
                  </div>
                </div>

                {calcWall && (
                  <div className="mt-8 bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 shadow-xl">
                    <div className="bg-orange-500 text-slate-950 text-center py-3 font-black text-xl">{calcWall.area} m² <span className="text-sm">au total</span></div>
                    <div className="p-4 grid grid-cols-2 gap-3 text-center">
                      <div className="bg-slate-900 p-4 rounded-xl border border-slate-700/50">
                        <div className="font-black text-3xl text-orange-500 mb-1">{calcWall.blocks}</div>
                        <div className="text-[9px] text-slate-400 font-bold uppercase">Parpaings (Marge +5%)</div>
                      </div>
                      <div className="bg-slate-900 p-4 rounded-xl border border-slate-700/50">
                        <div className="font-black text-3xl text-white mb-1">{calcWall.mortar}</div>
                        <div className="text-[9px] text-slate-400 font-bold uppercase">Litres Mortier</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* --- ONGLET 4 : GLOSSAIRE --- */}
        {activeTab === 'glossary' && !selectedModule && !activeLesson && (
          <div className="animate-in fade-in duration-500 p-6 space-y-6 flex flex-col min-h-full">
            <div>
              <h1 className="text-3xl font-black text-white mb-1">Le Dico du Chantier</h1>
              <p className="text-slate-400 text-sm">30 termes essentiels à maîtriser.</p>
            </div>

            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-amber-500 transition-colors" size={20} />
              <input 
                type="text" placeholder="Rechercher (ex: Arase)..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-amber-500 transition shadow-lg" 
              />
            </div>

            <div className="space-y-4 pb-8">
              {GLOSSAIRE.filter(item => item.term.toLowerCase().includes(searchQuery.toLowerCase()) || item.def.toLowerCase().includes(searchQuery.toLowerCase())).map((item, idx) => (
                <div key={idx} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl hover:border-amber-500/30 transition-colors">
                  <h3 className="font-black text-amber-500 mb-2 text-lg">{item.term}</h3>
                  <p className="text-sm text-slate-300 leading-relaxed font-medium">{item.def}</p>
                </div>
              ))}
              {GLOSSAIRE.filter(item => item.term.toLowerCase().includes(searchQuery.toLowerCase()) || item.def.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                <p className="text-center text-slate-500 mt-10">Aucun terme trouvé.</p>
              )}
            </div>
          </div>
        )}

        {/* --- ONGLET 5 : PROFIL (Paramètres & Badges) --- */}
        {activeTab === 'profile' && !selectedModule && !activeLesson && (
          <div className="animate-in fade-in p-6 space-y-8">
            <h1 className="text-3xl font-black text-white">Mon Espace</h1>

            <div className="bg-slate-900 border border-slate-800 rounded-[2rem] p-6 text-center shadow-lg">
              <div className="w-24 h-24 rounded-full border-4 border-slate-800 bg-slate-950 overflow-hidden mx-auto mb-4">
                <img src={userProfile.avatar} alt="Avatar" className="w-full h-full object-cover"/>
              </div>
              <h2 className="text-2xl font-black text-white mb-1">{userProfile.name}</h2>
              <span className="bg-amber-500/20 text-amber-500 px-4 py-1.5 rounded-full text-xs font-bold border border-amber-500/30 inline-block">{userProfile.level}</span>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-[2rem] p-6">
              <h3 className="text-[10px] font-black uppercase text-slate-500 mb-4 flex items-center gap-2"><Trophy size={14}/> Badges Débloqués ({unlockedBadgesCount}/{BADGES.length})</h3>
              <div className="grid grid-cols-2 gap-3">
                {badgesWithStatus.map((b) => (
                  <div key={b.id} className={`p-4 rounded-2xl border flex flex-col items-center text-center transition-all ${b.unlocked ? 'bg-amber-500/10 border-amber-500/30 text-amber-500' : 'bg-slate-950 border-slate-800 opacity-50 text-slate-600'}`}>
                      <div className="mb-2">{b.icon}</div>
                      <div className={`text-xs font-black mb-1 ${b.unlocked ? 'text-white' : 'text-slate-500'}`}>{b.name}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <button onClick={() => {
                if(window.confirm("Êtes-vous sûr de vouloir effacer toute votre progression ?")) {
                  localStorage.removeItem('batipro_v5_profile');
                  window.location.reload();
                }
              }} 
              className="w-full bg-rose-500/10 border border-rose-500/20 text-rose-500 py-4 rounded-xl font-bold hover:bg-rose-500/20 transition"
            >
              Réinitialiser ma progression
            </button>
          </div>
        )}

      </main>

      {/* NAVIGATION BOTTOM */}
      <nav className="absolute bottom-0 w-full bg-slate-950/95 backdrop-blur-2xl border-t border-slate-800/50 flex justify-around items-center pt-3 pb-6 px-1 z-40">
        {[
          { id: 'home', icon: <HardHat size={22} strokeWidth={activeTab === 'home' ? 2.5 : 2} />, label: 'Accueil' },
          { id: 'courses', icon: <BookOpen size={22} strokeWidth={activeTab === 'courses' ? 2.5 : 2} />, label: 'Cours' },
          { id: 'tools', icon: <Calculator size={22} strokeWidth={activeTab === 'tools' ? 2.5 : 2} />, label: 'Outils' },
          { id: 'glossary', icon: <BookOpen size={22} strokeWidth={activeTab === 'glossary' ? 2.5 : 2} />, label: 'Dico' },
          { id: 'profile', icon: <User size={22} strokeWidth={activeTab === 'profile' ? 2.5 : 2} />, label: 'Profil' }
        ].map(item => (
          <button 
            key={item.id}
            onClick={() => {setActiveTab(item.id); setSelectedModule(null); setActiveLesson(null);}} 
            className={`flex flex-col items-center gap-1.5 w-1/5 transition-all duration-300 ${activeTab === item.id ? 'text-amber-500 scale-110' : 'text-slate-500 hover:text-slate-300'}`}
          >
            {item.icon}
            <span className="text-[8px] font-black uppercase tracking-wider">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

