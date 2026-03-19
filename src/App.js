/* eslint-disable */
import React, { useState, useMemo, useEffect } from 'react';
import { 
  Hammer, HardHat, Calculator, BookOpen, User, 
  ArrowLeft, CheckCircle2, Play, Trophy, 
  Droplets, Truck, Layers, Clock, Box, Grid,
  Shield, Map, Paintbrush, Ruler, Medal, Pencil,
  X, Check, Wrench, Pickaxe, DoorOpen
} from 'lucide-react';

// ==========================================
// BÂTIPRO V6 : L'ENCYCLOPÉDIE ULTIME (50 LEÇONS)
// ==========================================

const MODULES = [
  {
    id: 'm1', title: 'Sécurité & Préparation', icon: <Shield size={24} />, color: 'from-amber-500 to-orange-600',
    level: 'Débutant', duration: '3h',
    chapters: [
      { id: 'm1c1', title: 'Les EPI (Équipements de Protection)', duration: '20 min', content: "Obligatoires sur chantier : Casque (EN 397) contre les chutes d'objets. Chaussures S3 (coque + anti-perforation). Gants nitrile (le ciment brûle la peau, pH 13). Masque FFP3 contre la poussière de silice (découpe de parpaings). Lunettes de protection." },
      { id: 'm1c2', title: 'Ergonomie et port de charges', duration: '15 min', content: "Le maçon soulève des tonnes. Ne courbez jamais le dos. Pliez les genoux, gardez le dos droit et utilisez les muscles des cuisses. Portez les sacs (35kg) collés au buste. Ne pivotez pas le tronc, déplacez vos pieds." },
      { id: 'm1c3', title: 'Balisage et sécurisation du chantier', duration: '15 min', content: "Un chantier doit être clos. Utilisez des barrières Heras ou de la rubalise de chantier. Signalez les tranchées ouvertes pour éviter les chutes. Prévoyez une zone de stockage propre et un accès pompier dégagé." },
      { id: 'm1c4', title: 'Installation de chantier', duration: '20 min', content: "Définir l'emplacement de la bétonnière (proche du sable, du gravier et d'un point d'eau). Prévoir l'évacuation des eaux de lavage (bac de décantation). Installer le coffret électrique de chantier étanche." },
      { id: 'm1c5', title: 'Gestion des déchets (Gravats)', duration: '10 min', content: "Triez à la source. Les gravats inertes (béton, brique, tuile) peuvent être recyclés en sous-couche (remblai). Les plastiques (polyane, sacs) et produits chimiques (adjuvants) vont en déchetterie spécialisée." }
    ]
  },
  {
    id: 'm2', title: 'L\'Outillage du Maçon', icon: <Wrench size={24} />, color: 'from-slate-500 to-slate-700',
    level: 'Débutant', duration: '2h',
    chapters: [
      { id: 'm2c1', title: 'Les outils à main (Truelles, Taloches)', duration: '20 min', content: "La truelle ronde sert à gâcher, la truelle carrée à dresser. La taloche (bois/plastique) porte le mortier. Le gratton sert à finir les enduits. Nettoyez-les à l'eau immédiatement après usage, le ciment sec pardonne peu." },
      { id: 'm2c2', title: 'Les outils de mesure et contrôle', duration: '25 min', content: "Le mètre ruban (décamètre). Le niveau tubulaire (1m minimum). Le fil à plomb pour la verticalité absolue. La règle en aluminium (2 à 3m) pour vérifier la planéité. L'équerre de maçon pour les angles." },
      { id: 'm2c3', title: 'L\'électroportatif de base', duration: '30 min', content: "La meuleuse d'angle (disque diamant) pour couper blocs et aciers. Le perforateur-burineur pour percer le béton. Le malaxeur électrique pour les colles et enduits. Toujours débrancher avant de changer d'accessoire." },
      { id: 'm2c4', title: 'La Bétonnière (Utilisation/Entretien)', duration: '20 min', content: "Ordre de chargement : 1/2 Eau -> Gravier (nettoie la cuve) -> Ciment -> Sable -> Reste de l'eau. Ne jamais taper sur la cuve au marteau pour la vider ! Nettoyez à grande eau avec quelques graviers à la fin de la journée." }
    ]
  },
  {
    id: 'm3', title: 'Topographie & Implantation', icon: <Map size={24} />, color: 'from-blue-500 to-blue-800',
    level: 'Intermédiaire', duration: '3h',
    chapters: [
      { id: 'm3c1', title: 'Lecture de plans et Échelles', duration: '30 min', content: "Plan de masse, plan de coupe, élévation. L'échelle 1/50 signifie que 2 cm sur le plan valent 1 mètre en réalité. Attention aux cotes : en maçonnerie, on parle souvent en centimètres (ex: 250 = 2,50m) ou en mètres." },
      { id: 'm3c2', title: 'Les chaises d\'implantation', duration: '40 min', content: "Piquets plantés à 1,5m à l'extérieur des futures fouilles, reliés par des planches de niveau. On y plante des clous pour tendre des cordeaux matérialisant les axes des murs. Le terrassement se fait sans toucher les chaises." },
      { id: 'm3c3', title: 'L\'Équerrage (Règle du 3-4-5)', duration: '30 min', content: "Théorème de Pythagore pour un angle droit parfait : Mesurez 3m sur un cordeau, 4m sur l'autre. La diagonale doit faire exactement 5m. Ajustez les cordeaux sur les chaises jusqu'à obtenir cette mesure." },
      { id: 'm3c4', title: 'Le niveau : Tuyau d\'eau et Laser', duration: '20 min', content: "Le niveau à eau utilise le principe des vases communicants pour reporter une hauteur sur un terrain accidenté. Le niveau laser rotatif est aujourd'hui la norme : il projette un plan horizontal capté par une cellule sur une mire." }
    ]
  },
  {
    id: 'm4', title: 'Terrassement & Fondations', icon: <Pickaxe size={24} />, color: 'from-stone-600 to-stone-900',
    level: 'Intermédiaire', duration: '4h',
    chapters: [
      { id: 'm4c1', title: 'Nature des sols et Étude G2', duration: '30 min', content: "On ne construit pas sur de la terre végétale ou de l'argile gonflante. L'étude de sol (G2) définit la profondeur du 'bon sol' (le refus). Un sol sableux draine bien, un sol argileux retient l'eau et nécessite des fondations spécifiques." },
      { id: 'm4c2', title: 'Profondeur Hors-Gel', duration: '20 min', content: "Les semelles de fondation doivent être sous la ligne hors-gel. Si l'eau gèle sous la maison, elle soulève le bâtiment. Minimum 50cm (littoral) à plus de 1m (montagne). Respectez la carte des gels locale." },
      { id: 'm4c3', title: 'Le Béton de propreté', duration: '15 min', content: "Couche de 4 à 5 cm de béton maigre (150kg/m³) coulée au fond de la fouille. Elle empêche l'acier de la fondation d'être en contact avec la terre (ce qui le ferait rouiller)." },
      { id: 'm4c4', title: 'Ferraillage des semelles filantes', duration: '45 min', content: "Posez les armatures sur des cales en plastique (enrobage minimum 3 à 5 cm de béton partout). Les fers doivent se recouvrir sur une longueur de 50x leur diamètre (ex: 50cm pour un fer de 10mm). Renforcez les angles avec des équerres." },
      { id: 'm4c5', title: 'Coulage et Vibration des fondations', duration: '30 min', content: "Béton dosé à 350kg/m³. Coulez depuis la toupie. Utilisez une aiguille vibrante pour chasser l'air. Ne vibrez pas trop au même endroit (risque de ségrégation : les cailloux tombent, l'eau et le ciment remontent)." }
    ]
  },
  {
    id: 'm5', title: 'Les Liants (Mortiers & Bétons)', icon: <Droplets size={24} />, color: 'from-cyan-700 to-cyan-900',
    level: 'Intermédiaire', duration: '3h',
    chapters: [
      { id: 'm5c1', title: 'Ciment, Chaux et Plâtre', duration: '30 min', content: "Le Ciment Portland (gris) est dur et étanche. La Chaux (NHL) est souple, laisse respirer les vieux murs en pierre. Le Plâtre est réservé à l'intérieur pour des scellements rapides (prise en quelques minutes)." },
      { id: 'm5c2', title: 'Dosage du Mortier', duration: '20 min', content: "Mortier = Ciment + Sable + Eau. Il sert à coller (parpaings, briques, enduits). Dosage standard : 1 volume de ciment pour 3 à 4 volumes de sable. Trop d'eau = retrait au séchage et fissures." },
      { id: 'm5c3', title: 'Dosage du Béton', duration: '20 min', content: "Béton = Ciment + Sable + GRAVIERS + Eau. C'est le squelette structurel. Dosage standard (règle 1-2-3) : 1 vol. ciment, 2 vol. sable, 3 vol. graviers, 1/2 vol. d'eau. Les graviers donnent la résistance à la compression." },
      { id: 'm5c4', title: 'Adjuvants et conditions climatiques', duration: '20 min', content: "Plastifiant : rend le béton fluide avec moins d'eau. Hydrofuge de masse : rend le mortier étanche (arases, piscines). Antigel : abaisse la température de gel de l'eau. Ne maçonne jamais sous 5°C ni au-dessus de 35°C sans précautions." },
      { id: 'm5c5', title: 'Le Mortier Bâtard', duration: '15 min', content: "Mélange 50% Ciment / 50% Chaux. Il combine la résistance rapide du ciment et la plasticité de la chaux. Excellent pour les enduits extérieurs traditionnels ou pour sceller des tuiles faîtières." }
    ]
  },
  {
    id: 'm6', title: 'Élévation : Murs en Parpaings', icon: <Box size={24} />, color: 'from-orange-600 to-red-700',
    level: 'Avancé', duration: '5h',
    chapters: [
      { id: 'm6c1', title: 'L\'Arase étanche (Coupure capillaire)', duration: '30 min', content: "Obligatoire (DTU). L'humidité remonte dans les murs. Sous le 1er rang habitable, coulez 2cm de mortier fortement hydrofugé, ou déroulez une bande d'arase bitumeuse." },
      { id: 'm6c2', title: 'Le rang de départ (Le plus important)', duration: '45 min', content: "Posez les blocs d'angle sur un lit de mortier épais. Réglez-les au millimètre (horizontalité et aplomb). Tendez un cordeau entre eux. Alignez tous les blocs intermédiaires sur ce cordeau (laissez 1mm de jour)." },
      { id: 'm6c3', title: 'Croisement et joints (Coup de sabre)', duration: '30 min', content: "Les joints verticaux ne doivent JAMAIS s'aligner d'un rang à l'autre (coup de sabre = fissure). Croisez les blocs d'un tiers ou d'un demi. Lissez les joints au fer une fois le mortier 'tiré' (légèrement dur)." },
      { id: 'm6c4', title: 'Blocs d\'angle et Chaînages verticaux', duration: '30 min', content: "Aux angles du bâtiment et autour des portes/fenêtres, utilisez des parpaings d'angle (percés). Glissez-y des fers à béton reliés aux fondations. On les remplira de béton liquide à la fin pour créer des poteaux armés invisibles." },
      { id: 'm6c5', title: 'Les coupes de parpaings', duration: '20 min', content: "Utilisez une meuleuse avec disque diamant segmenté (toujours avec EPI et masque !). Pour des coupes propres, tracez le bloc, entaillez les 4 faces à la meuleuse, puis donnez un coup sec avec la massette au centre." }
    ]
  },
  {
    id: 'm7', title: 'Élévation : Briques et Béton Cellulaire', icon: <Grid size={24} />, color: 'from-red-500 to-red-800',
    level: 'Avancé', duration: '3h',
    chapters: [
      { id: 'm7c1', title: 'La Brique Alvéolaire (Généralités)', duration: '20 min', content: "Excellente isolation thermique (Gelimac, Monomur). Plus fragile que le parpaing. Nécessite une coupe précise à la scie sabre (lame carbure) ou à la grande meule à eau." },
      { id: 'm7c2', title: 'Le montage à Joint Mince', duration: '45 min', content: "Fini la truelle ! Les briques rectifiées se collent avec un mortier-colle spécifique appliqué au rouleau applicateur (environ 2mm d'épaisseur). Le 1er rang doit être ABSOLUMENT parfait sur une arase de mortier classique." },
      { id: 'm7c3', title: 'Le Béton Cellulaire (Siporex)', duration: '30 min', content: "Léger, isolant, se coupe à la scie égoïne spéciale. Se monte aussi à la colle (joint mince). Attention, il pompe l'eau très vite : la colle doit être appliquée rapidement et proprement avec une truelle peigne." },
      { id: 'm7c4', title: 'Traitement des ponts thermiques', duration: '20 min', content: "Dans ces maçonneries isolantes, on utilise des planelles isolées en bord de dalle, et des blocs spéciaux pour les linteaux et chaînages, afin d'éviter que le froid ne rentre par le béton armé." }
    ]
  },
  {
    id: 'm8', title: 'Béton Armé & Coffrage', icon: <Ruler size={24} />, color: 'from-zinc-500 to-zinc-800',
    level: 'Expert', duration: '4h',
    chapters: [
      { id: 'm8c1', title: 'Principes du ferraillage', duration: '30 min', content: "Le béton craint la traction. L'acier l'encaisse. Les armatures sont composées de fers filants (longitudinaux) et de cadres/épingles (transversaux) qui empêchent le béton d'éclater sous la pression (effort tranchant)." },
      { id: 'm8c2', title: 'Coffrage bois : Les bases', duration: '40 min', content: "Le béton frais est un liquide très lourd (2,4 tonnes/m³). Votre coffrage en planches de pin (voliges ou bastaings) doit être ultra-résistant. Utilisez des serre-joints, des étais et des cales. Appliquez de l'huile de décoffrage sur le bois." },
      { id: 'm8c3', title: 'Réaliser un Poteau', duration: '30 min', content: "Attachez votre chaînage vertical (généralement 4 fers torsadés carrés) aux fers en attente. Fermez le coffrage sur 3 côtés, puis le 4ème. Coulez doucement, vibrez avec l'aiguille par couches de 50cm pour éviter la ségrégation." },
      { id: 'm8c4', title: 'Décoffrage et ragréage des nids de poule', duration: '20 min', content: "Attendez minimum 48h. Décoffrez doucement sans faire levier sur les arêtes. Si vous voyez des trous (nids de graviers = manque de vibration), il faut les reboucher avec un mortier de réparation fibré spécifique." }
    ]
  },
  {
    id: 'm9', title: 'Dalles, Chapes & Planchers', icon: <Layers size={24} />, color: 'from-indigo-600 to-indigo-900',
    level: 'Avancé', duration: '4h',
    chapters: [
      { id: 'm9c1', title: 'Le Hérisson (Sous-couche)', duration: '20 min', content: "Dalle sur terre-plein. Décaissez, étalez 15cm de cailloux compactés (calibre 40/80) pour drainer. N'utilisez pas de terre végétale. Recouvrez d'un film polyane (plastique) pour bloquer l'humidité (superposez les bords de 20cm)." },
      { id: 'm9c2', title: 'Treillis soudé et Joints de fractionnement', duration: '30 min', content: "Placez le treillis (ex: ST25C) sur des cales (3cm). Le béton travaille et fissure. Placez des joints profilés en plastique (règles jointes) tous les 15m² pour diriger ces fissures de manière invisible." },
      { id: 'm9c3', title: 'Tirer une dalle (Le geste)', duration: '40 min', content: "Béton étalé un peu plus haut que le niveau. Posez une règle en aluminium sur vos guides. Effectuez un mouvement de 'scie' gauche-droite tout en reculant. Ce mouvement latéral fait remonter la laitance et lisse la surface." },
      { id: 'm9c4', title: 'La Chape maigre du carreleur', duration: '30 min', content: "La dalle est grossière, la chape est lisse. C'est un mortier sous-dosé en eau (aspect terre humide) dosé à 250kg de ciment/m³. On la dresse à la règle sur la dalle pour y coller ou y sceller le carrelage de finition." }
    ]
  },
  {
    id: 'm10', title: 'Les Ouvertures (Linteaux, Appuis)', icon: <DoorOpen size={24} />, color: 'from-purple-600 to-purple-800',
    level: 'Avancé', duration: '3h',
    chapters: [
      { id: 'm10c1', title: 'Le Linteau en blocs U', duration: '30 min', content: "La poutre au-dessus de la fenêtre. On utilise des blocs en 'U' posés sur une planche étayée. On y place une armature spécifique (chaînage triangulaire ou fers tordus) reposant sur les murs porteurs, puis on coule le béton." },
      { id: 'm10c2', title: 'L\'Appui de fenêtre', duration: '30 min', content: "Souvent préfabriqué en béton. Il doit être posé de niveau. Il comporte un 'rejingot' (rebord arrière pour bloquer l'eau sous la fenêtre) et une 'goutte d\'eau' (rainure sous l'appui pour que l'eau tombe sans couler sur la façade)." },
      { id: 'm10c3', title: 'Le Seuil de porte', duration: '20 min', content: "Similaire à l'appui de fenêtre, mais pour les baies vitrées ou portes. Il doit affleurer parfaitement avec le niveau du carrelage fini intérieur (cote 'Sol Fini' sur les plans)." }
    ]
  },
  {
    id: 'm11', title: 'Enduits de Façade', icon: <Paintbrush size={24} />, color: 'from-amber-200 to-amber-500',
    level: 'Expert', duration: '4h',
    chapters: [
      { id: 'm11c1', title: 'Préparation et Baguettes d\'angle', duration: '20 min', content: "Le mur doit être propre, brossé et dépoussiéré. Scellez des profilés métalliques ou plastiques (baguettes d'angle) sur les arêtes des murs au mortier. Elles serviront de guide d'épaisseur et renforceront les angles." },
      { id: 'm11c2', title: 'Le Gobetis (L\'accroche)', duration: '30 min', content: "1ère couche. Mortier très riche en ciment et liquide. On le projette violemment (à la truelle ou à la machine) pour qu'il pénètre les pores du parpaing. Laissez rugueux. Il garantit que les couches suivantes ne tomberont pas." },
      { id: 'm11c3', title: 'Le Corps d\'enduit (Dressage)', duration: '40 min', content: "2ème couche (24h plus tard). Mortier normal hydrofugé (1,5cm d'épaisseur). Appliquez généreusement puis dressez avec une règle en aluminium en vous appuyant sur des repères ou vos baguettes d'angle." },
      { id: 'm11c4', title: 'Les Finitions (Taloché, Gratté, Éponge)', duration: '30 min', content: "Dernière couche fine, souvent teintée (Mortier monocouche). On peut la lisser à la taloche bois/éponge, ou la gratter avec une planche à clous (gratton) juste avant le séchage complet pour un aspect rustique (façades modernes)." }
    ]
  },
  {
    id: 'm12', title: 'Maçonnerie Paysagère', icon: <Hammer size={24} />, color: 'from-green-600 to-emerald-800',
    level: 'Intermédiaire', duration: '3h',
    chapters: [
      { id: 'm12c1', title: 'Muret en Pierre Sèche', duration: '30 min', content: "Sans mortier ! Triez les pierres. Les plus larges forment la base. Inclinez très légèrement les faces extérieures vers le centre du mur (fruit). Croisez les joints. Remplissez le milieu avec du cailloutis de calage." },
      { id: 'm12c2', title: 'Le Pavage sur lit de sable', duration: '20 min', content: "Décaissez, posez un géotextile (bloque les mauvaises herbes et la terre). Étalez 3 à 5 cm de sable grossier. Dressez à la règle. Posez les pavés en tapotant au maillet caoutchouc. Jointoyez avec du sable fin polymère." },
      { id: 'm12c3', title: 'Création d\'escaliers extérieurs', duration: '30 min', content: "Calcul de Blondel : 2x Hauteur de marche + 1 Giron (profondeur) = 60 à 64 cm. Coffrez les contremarches avec des planches solides. Ferraillez et coulez en commençant par le bas." }
    ]
  }
];

const GLOSSAIRE = [
  { term: 'Adjuvant', def: 'Produit chimique (liquide/poudre) modifiant les propriétés du béton (antigel, retardateur).' },
  { term: 'Agglo', def: 'Diminutif d\'aggloméré, l\'autre nom du parpaing de ciment.' },
  { term: 'Arase', def: 'Couche de mortier parfaitement horizontale rattrapant les niveaux ou créant une barrière étanche.' },
  { term: 'Banche', def: 'Coffrage lourd (métal ou bois) pour couler des murs entiers en béton armé.' },
  { term: 'Barbotine', def: 'Lait de ciment pur (très liquide) servant de couche de liaison entre vieux et nouveau béton.' },
  { term: 'Chaînage', def: 'Armatures en acier ceinturant le bâtiment (horizontales dans les dalles, verticales dans les angles).' },
  { term: 'Coup de sabre', def: 'Défaut grave : alignement vertical des joints de parpaings sur plusieurs rangs (fissure assurée).' },
  { term: 'Cure (du béton)', def: 'Protection du béton frais contre l\'évaporation rapide de l\'eau (soleil, vent) pour éviter les fissures.' },
  { term: 'DTU', def: 'Document Technique Unifié. C\'est le livre des normes de la construction française. Obligatoire pour les assurances.' },
  { term: 'Enrobage', def: 'Épaisseur de béton (min. 3cm) qui doit entourer l\'acier pour le protéger de la rouille.' },
  { term: 'Étude de sol (G2)', def: 'Sondage géologique déterminant la profondeur et la nature des fondations nécessaires.' },
  { term: 'Fruit (d\'un mur)', def: 'Légère inclinaison donnée à la face d\'un mur de soutènement pour augmenter sa stabilité.' },
  { term: 'Hérisson', def: 'Lit de pierres drainantes (sans terre) servant de base solide sous une dalle.' },
  { term: 'Laitance', def: 'Couche friable de poussière blanche remontant à la surface d\'un béton trop riche en eau.' },
  { term: 'Linteau', def: 'Poutre horizontale supportant la maçonnerie au-dessus d\'une porte ou fenêtre.' },
  { term: 'Mire', def: 'Règle graduée verticale utilisée avec un niveau laser pour relever des altitudes.' },
  { term: 'Polyane', def: 'Film plastique isolant bloquant les remontées capillaires sous les dalles.' },
  { term: 'Rejingot', def: 'Bord relevé à l\'arrière d\'un appui de fenêtre pour bloquer l\'infiltration de l\'eau.' },
  { term: 'Ségrégation', def: 'Défaut du béton : les graviers tombent au fond, le ciment et l\'eau remontent en surface (souvent dû à une vibration excessive).' }
];

const BADGES = [
  { id: 'bd1', name: 'Le Casque', desc: 'Profil créé', icon: <HardHat size={24}/> },
  { id: 'bd2', name: 'Le Compagnon', desc: '10 leçons lues', icon: <BookOpen size={24}/> },
  { id: 'bd3', name: 'Le Chef', desc: '25 leçons terminées', icon: <Shield size={24}/> },
  { id: 'bd4', name: 'Maître Artisan', desc: '100% complété', icon: <Trophy size={24}/> },
];

const LoadingScreen = () => (
  <div className="fixed inset-0 bg-slate-950 flex flex-col items-center justify-center z-[999] overflow-hidden">
    <div className="w-16 h-16 border-4 border-slate-800 border-t-amber-500 rounded-full animate-spin mb-6"></div>
    <h2 className="text-amber-500 font-black text-xl tracking-widest uppercase animate-pulse">Coulage des 50 leçons...</h2>
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

  // 1. Initialisation (Faux chargement + LocalStorage)
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000); 
    const saved = localStorage.getItem('batipro_v6_profile');
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
    localStorage.setItem('batipro_v6_profile', JSON.stringify(newProfile));
    setIsNewUser(false);
  };

  // 3. Marquer une leçon comme terminée
  const finishLesson = (lessonId) => {
    if (!userProfile.completedLessons.includes(lessonId)) {
      const updatedLessons = [...userProfile.completedLessons, lessonId];
      const updatedProfile = { ...userProfile, completedLessons: updatedLessons };
      setUserProfile(updatedProfile);
      localStorage.setItem('batipro_v6_profile', JSON.stringify(updatedProfile));
    }
    setActiveLesson(null);
  };

  // 4. Calcul de progression dynamique
  const getModuleProgress = (mod) => {
    if(!userProfile.completedLessons || mod.chapters.length === 0) return 0;
    const total = mod.chapters.length;
    const finished = mod.chapters.filter(c => userProfile.completedLessons.includes(c.id)).length;
    return Math.round((finished / total) * 100);
  };

  const totalFinished = userProfile.completedLessons?.length || 0;
  
  // Calcul du nombre total de leçons dans l'appli (pour le badge 100%)
  const totalLessonsInApp = useMemo(() => {
    return MODULES.reduce((acc, mod) => acc + mod.chapters.length, 0);
  }, []);

  // 5. Conditions dynamiques des Badges (Évaluées à la volée)
  const badgesWithStatus = BADGES.map(b => {
    let unlocked = false;
    if (b.id === 'bd1') unlocked = userProfile.name !== '';
    if (b.id === 'bd2') unlocked = totalFinished >= 10;
    if (b.id === 'bd3') unlocked = totalFinished >= 25;
    if (b.id === 'bd4') unlocked = totalFinished >= totalLessonsInApp;
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
      ciment: Math.ceil(vol * 10), // 350kg/m3 = ~10 sacs de 35kg
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
        <p className="text-slate-400 text-center mb-10 text-sm">Votre encyclopédie de la maçonnerie. ({totalLessonsInApp} leçons disponibles).</p>
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
              <span className="text-[9px] text-slate-400 uppercase font-bold tracking-widest">Édition Maître</span>
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
                <span className="text-2xl font-black text-white">{totalFinished} <span className="text-sm text-slate-500">/ {totalLessonsInApp}</span></span>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Leçons finies</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl flex flex-col items-center text-center">
                <Medal className="text-emerald-500 mb-2" size={28} />
                <span className="text-2xl font-black text-white">{unlockedBadgesCount} <span className="text-sm text-slate-500">/ {BADGES.length}</span></span>
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
              <p className="text-slate-400 text-sm">{MODULES.length} modules, {totalLessonsInApp} leçons.</p>
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
              <p className="text-slate-400 text-sm">Lexique essentiel à maîtriser.</p>
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
                  localStorage.removeItem('batipro_v6_profile');
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
