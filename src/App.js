/* eslint-disable */
import React, { useState, useMemo, useEffect } from 'react';
import { 
  Hammer, HardHat, Calculator, BookOpen, User, 
  ArrowLeft, CheckCircle2, Play, Trophy, 
  Droplets, Truck, Layers, Clock, Box, Grid,
  Shield, Map, Paintbrush, Ruler, Medal, Pencil,
  X, Check, Search, AlertTriangle, Compass,
  Activity, Wrench
} from 'lucide-react';

const MODULES = [
  {
    id: 'm1', title: 'Sécurité, EPI & Installation', icon: <Shield size={24} />, color: 'from-amber-500 to-orange-600', level: 'Débutant', duration: '3h',
    chapters: [
      { 
        id: 'm1c1', title: 'Les Équipements de Protection Individuelle', duration: '30 min', 
        content: `La maçonnerie est le corps d'état le plus accidentogène. Vos EPI sont votre seule assurance vie.
        
• Casque de chantier (EN 397) : Obligatoire dès la présence d'engins de levage ou de travaux superposés. Durée de vie plastique : 3 à 5 ans.
• Chaussures S3 : Elles doivent posséder une coque de protection (200 joules) et une semelle anti-perforation en acier ou kevlar pour contrer les clous de coffrage.
• Gants de maçon : Le ciment frais a un pH de 13 (hautement basique). Sans gants enduits (nitrile/latex), vous risquez des brûlures chimiques graves et la "gale du ciment".
• Masque respiratoire (FFP3) : Indispensable à la meuleuse. La poussière de béton contient de la silice cristalline, responsable de la silicose (maladie pulmonaire mortelle).` 
      },
      { 
        id: 'm1c2', title: 'Ergonomie et Manutention', duration: '20 min', 
        content: `Un maçon manipule plusieurs tonnes de charge par jour. Préserver son dos est une priorité absolue.
        
• Le levage : Ne courbez jamais la colonne vertébrale pour ramasser un sac de ciment de 35 kg. Écartez les pieds, pliez les genoux à 90°, gardez le dos droit, et poussez sur vos cuisses.
• Le port : Maintenez la charge collée contre votre ventre/buste. L'éloigner de 20 cm multiplie la pression sur vos disques intervertébraux par 5 par effet de levier.
• La rotation : Ne vrillez jamais votre buste avec une charge dans les mains. C'est la cause n°1 des hernies discales. Déplacez vos appuis (vos pieds) pour pivoter l'ensemble du corps.` 
      },
      { 
        id: 'm1c3', title: 'L\'installation de chantier (PIC)', duration: '40 min', 
        content: `Le Plan d'Installation de Chantier (PIC) définit l'organisation de votre zone de travail.
        
1. Zone de stockage : Les palettes de parpaings doivent être posées sur un sol plan et stable. Le sable et le gravier doivent être séparés pour éviter le mélange, idéalement sur des bâches.
2. Emplacement de la bétonnière : Elle doit être au carrefour stratégique : près du tas de sable, près du point d'eau, et avec un accès facile pour les brouettes.
3. Électricité : Utilisez un coffret de chantier étanche (IP65) avec disjoncteur différentiel 30mA pour brancher l'électroportatif. Les câbles doivent être suspendus si possible pour ne pas tremper dans la boue.
4. Eaux résiduelles : Prévoyez un bac de décantation pour les eaux de lavage des truelles et de la bétonnière. On ne jette pas de laitance de ciment dans les égouts publics.` 
      }
    ]
  },
  {
    id: 'm2', title: 'L\'Outillage & L\'Électroportatif', icon: <Hammer size={24} />, color: 'from-slate-500 to-slate-700', level: 'Débutant', duration: '4h',
    chapters: [
      { 
        id: 'm2c1', title: 'L\'outillage à main indispensable', duration: '45 min', 
        content: `La caisse à outils du maçon compagnon :

• Les Truelles : La ronde ou bout carré (pour gâcher, prendre et jeter le mortier), et la langue de chat (très fine, pour jointoyer ou faire des retouches).
• Les Taloches : Plaque avec poignée. En plastique ou en bois. Sert de "réservoir" de mortier dans la main gauche, ou à lisser les enduits.
• Les Niveaux : Le niveau tubulaire à bulle (idéalement 1m ou 1m20 pour la précision). Le fil à plomb (un poids au bout d'une ficelle) reste l'outil le plus précis pour vérifier la verticalité d'un mur sur 2,50m de haut.
• La Règle de maçon : Profilé en aluminium creux de 1,5m à 3m. Elle permet de tirer le béton des dalles ou d'aligner les blocs.
• La Massette et la Broche : Pour les petites démolitions ou ébavurer des coulures de béton séché.` 
      },
      { 
        id: 'm2c2', title: 'L\'électroportatif', duration: '35 min', 
        content: `Les outils motorisés qui font gagner un temps précieux :

• La meuleuse d'angle (disque 230mm) : Équipée d'un disque diamant segmenté, elle coupe les parpaings, les tuiles et le béton armé. (Attention au violent effet de recul).
• Le perforateur-burineur : Outil SDS-Plus ou SDS-Max. Mode rotation pour percer le béton, mode percussion pour buriner et faire des saignées.
• Le malaxeur (mélangeur) : Indispensable pour préparer les mortiers-colles (joint mince) ou les ragréages de façon homogène sans grumeaux.
• La scie sabre : Équipée d'une lame carbure, elle est parfaite pour la découpe de la brique alvéolaire (Monomur) avec beaucoup moins de poussière qu'une meuleuse.` 
      },
      { 
        id: 'm2c3', title: 'La Bétonnière : Utilisation et Entretien', duration: '30 min', 
        content: `C'est le cœur du chantier. Une bétonnière mal utilisée s'encrasse en deux jours.

L'ordre de gâchage parfait (pour éviter que le ciment ne colle au fond) :
1. Versez la moitié de l'eau prévue.
2. Ajoutez tout le gravier (il va racler et nettoyer le fond de la cuve en tournant).
3. Incorporez le ciment (il va se mélanger au gravier et à l'eau).
4. Ajoutez le sable progressivement.
5. Ajustez avec le reste d'eau jusqu'à obtenir la consistance voulue.

L'entretien : En fin de journée, mettez un demi-seau d'eau et deux pelles de gros graviers dans la cuve. Laissez tourner 5 minutes, videz. La cuve sera brillante. Ne frappez JAMAIS la cuve avec un marteau pour décoller le béton sec, cela cabosse l'acier et le ciment accrochera encore plus ensuite.` 
      }
    ]
  },
  {
    id: 'm3', title: 'Topographie & Implantation', icon: <Compass size={24} />, color: 'from-blue-600 to-blue-800', level: 'Intermédiaire', duration: '3h30',
    chapters: [
      { 
        id: 'm3c1', title: 'Lecture de plans', duration: '40 min', 
        content: `Un maçon doit savoir lire trois types de plans : le plan de masse (vue de haut sur le terrain), le plan d'élévation (les façades), et le plan de coupe (qui montre les hauteurs sous plafond et fondations).

L'échelle : Le plus souvent au 1/50e. Cela signifie que 1 cm sur la feuille correspond à 50 cm dans la réalité (donc 2 cm = 1 mètre).
Les cotes : En maçonnerie de gros œuvre, on parle généralement en mètres (ex: 2.50) ou en centimètres (ex: 250). Ne cumulez pas les petites cotes à la suite lors de vos mesures, utilisez les cotes cumulées pour éviter les erreurs de millimètres qui s'additionnent.` 
      },
      { 
        id: 'm3c2', title: 'Le nivellement : Tuyau d\'eau vs Laser', duration: '35 min', 
        content: `Comment reporter un repère de hauteur (ex: le trait de 1 mètre fini) sur tous les murs de la maison ?

• Le niveau à eau : C'est la méthode ancestrale et infaillible. Un long tuyau en plastique transparent rempli d'eau (sans bulles d'air !). Par le principe de la gravité et des vases communicants, la surface de l'eau sera toujours exactement à la même altitude à chaque extrémité du tuyau.
• Le Laser rotatif : Posé sur un trépied lourd et stable, il s'auto-nivelle et projette un faisceau horizontal à 360 degrés. On utilise le "récepteur" sonore, fixé sur une mire (grande règle graduée), pour retrouver ce plan laser partout sur le chantier, même en plein soleil.` 
      },
      { 
        id: 'm3c3', title: 'L\'équerrage absolu (Pythagore)', duration: '45 min', 
        content: `L'équerre métallique de votre caisse à outils est beaucoup trop petite pour tracer l'angle d'une maison de 10 mètres de long. La moindre erreur d'un degré se transformera en un décalage de 15 cm au bout du mur.

On utilise la règle du 3-4-5 (le théorème de Pythagore a² + b² = c²) :
1. Tendez vos deux cordeaux pour former votre angle approximatif.
2. À partir de l'intersection, mesurez très précisément 3 mètres sur le premier cordeau et marquez-le.
3. Mesurez 4 mètres sur le second cordeau et marquez-le.
4. Prenez votre décamètre et mesurez la diagonale entre vos deux marques.
5. La diagonale DOIT mesurer exactement 5 mètres. Si elle fait 4.95m ou 5.08m, votre angle n'est pas droit. Pivotez un des cordeaux jusqu'à tomber au millimètre près sur 5m.` 
      },
      { 
        id: 'm3c4', title: 'Poser des chaises d\'implantation', duration: '40 min', 
        content: `Les chaises permettent de matérialiser les murs en l'air, au-dessus des fouilles, pour que le terrassier puisse creuser sans rien casser.

1. Construisez des "chaises" (deux gros piquets en bois reliés par une traverse horizontale clouée).
2. Plantez-les solidement à 1,50m ou 2m à l'extérieur des futurs murs (le recul).
3. Réglez toutes les traverses horizontales de toutes les chaises exactement à la même altitude (au niveau laser).
4. Plantez un clou sur la traverse, et tendez un cordeau fluo jusqu'à la chaise opposée. Ce cordeau représente l'axe, ou le bord extérieur, de votre futur mur de fondation.` 
      }
    ]
  },
  {
    id: 'm4', title: 'Terrassement & Blindage', icon: <Truck size={24} />, color: 'from-stone-600 to-stone-800', level: 'Avancé', duration: '3h',
    chapters: [
      { 
        id: 'm4c1', title: 'La nature des sols (Étude G2)', duration: '35 min', 
        content: `Toute la structure de la maison repose sur la terre. Si la terre bouge, la maison se fissure.
        
• La terre végétale : (les 20 à 40 premiers cm). Elle est meuble, pleine de racines et d'eau. On doit la retirer intégralement (c'est le décapage). ON NE CONSTRUIT JAMAIS SUR DE LA TERRE VÉGÉTALE.
• Le "Bon sol" ou le Refus : C'est la couche géologique dure (argile compacte, roche, grave) capable de supporter le poids du bâtiment (exprimé en MPa ou bars).
• L'étude de sol géotechnique (G2) : Un foreur vient analyser la résistance du sol à plusieurs mètres de profondeur. Le rapport vous dira exactement à quelle profondeur vous devez creuser vos fondations.` 
      },
      { 
        id: 'm4c2', title: 'Les fondations superficielles', duration: '30 min', 
        content: `On parle de fondations superficielles quand le bon sol se trouve à faible profondeur (entre 50cm et 1m50).
        
La largeur de la tranchée (la fouille en rigole) dépend du poids à supporter. Généralement, pour une maison individuelle en parpaings, la semelle fait 50 cm de large pour 30 cm de profondeur. Le fond de fouille doit être plat, propre, et horizontal (on crée des redans ou des "marches d'escalier" si le terrain est en pente, on ne coule jamais de semelle inclinée).` 
      },
      { 
        id: 'm4c3', title: 'Mise hors-gel et Blindage', duration: '45 min', 
        content: `La mise hors-gel est une règle du Code de la Construction.
L'eau contenue dans la terre augmente de 9% de volume lorsqu'elle gèle. Si la terre gèle sous votre fondation, elle va soulever la maison (phénomène de soulèvement gélif) et créer des fissures structurelles gravissimes.
Le bas de votre fondation doit donc être plus profond que la ligne de gel locale. (Ex: 50 cm en bord de mer, 80 cm dans l'Est, plus de 1,20m en altitude).

Le Blindage : Dès qu'une tranchée dépasse 1,30m de profondeur et que des hommes doivent y descendre, la loi impose de blinder (étayer) les parois pour empêcher l'ensevelissement mortel par éboulement.` 
      }
    ]
  },
  {
    id: 'm5', title: 'Béton Armé : Fondations', icon: <Layers size={24} />, color: 'from-zinc-500 to-zinc-700', level: 'Avancé', duration: '4h',
    chapters: [
      { 
        id: 'm5c1', title: 'Le Béton de propreté', duration: '20 min', 
        content: `Une fois le terrassier parti, vous avez des tranchées en terre. Vous ne pouvez pas poser de l'acier directement sur la terre (la terre absorbe l'eau du béton et fait rouiller l'acier).

Vous devez couler au fond de chaque fouille une fine couche de 4 à 5 cm d'un béton faiblement dosé en ciment (150kg/m³). C'est le béton de propreté. Il sèche vite et vous offre un plancher propre, plat et solide pour tracer vos murs et positionner vos ferraillages.` 
      },
      { 
        id: 'm5c2', title: 'Règles de Ferraillage (DTU)', duration: '50 min', 
        content: `L'acier (qui encaisse la traction) et le béton (qui encaisse la compression) forment le béton armé.

1. L'enrobage : L'acier doit être enrobé par au moins 3 à 5 cm de béton sur toutes ses faces pour être protégé de l'oxygène et de la corrosion. Utilisez des cales en béton ou en plastique pour surélever les semelles (armatures) sur le béton de propreté.
2. Le recouvrement : Vos barres de fer font souvent 6 mètres. Pour faire un mur de 10m, il faut les lier. On ne les pose pas bout à bout ! Elles doivent se superposer (se croiser) sur une longueur équivalente à 50 fois le diamètre du fer. (Ex: fer de 10mm = 50cm de recouvrement). Elles sont ligaturées au fil de fer recuit.
3. Les liaisons d'angle : Les angles sont les points de rupture. Les semelles ne doivent pas juste se croiser. Elles doivent être reliées par des équerres de liaison (fers tordus à 90°) dans chaque lit d'acier.` 
      },
      { 
        id: 'm5c3', title: 'Les fers en attente', duration: '30 min', 
        content: `Avant de couler le béton de fondation, vous devez implanter vos futurs murs.
À l'aide de votre fil à plomb et de vos cordeaux de chaises, repérez l'emplacement exact des futurs poteaux d'angle et des contours de portes. 
Plantez dans les semelles des "fers en attente" (des barres d'acier verticales tordues en équerre à leur base). Elles dépasseront du béton une fois coulé, et permettront de lier la fondation avec les murs d'élévation.` 
      },
      { 
        id: 'm5c4', title: 'Coulage et Vibration', duration: '40 min', 
        content: `Le coulage se fait souvent à la toupie (camion malaxeur) avec un béton normalisé C25/30 (résistance 25 MPa).

La vibration est obligatoire. On plonge une "aiguille vibrante" pneumatique ou électrique dans le béton frais. La vibration liquéfie momentanément le béton, chasse les bulles d'air emprisonnées (qui créent de la fragilité) et fait s'imbriquer parfaitement les graviers autour des aciers.
Attention : Retirez l'aiguille lentement (environ 10cm par seconde). Ne vibrez pas plus de 5 secondes au même endroit, sinon les lourds graviers coulent au fond et l'eau remonte en surface (ségrégation).` 
      }
    ]
  },
  {
    id: 'm6', title: 'Les Liants & Adjuvants', icon: <Droplets size={24} />, color: 'from-cyan-600 to-cyan-800', level: 'Intermédiaire', duration: '3h',
    chapters: [
      { 
        id: 'm6c1', title: 'Béton vs Mortier', duration: '30 min', 
        content: `C'est la règle d'or du maçon.
        
• LE MORTIER = Liant (Ciment ou Chaux) + Sable + Eau.
C'est une pâte qui sert de "colle" (pour monter des parpaings, des briques), ou de revêtement (enduit, chape, ragréage). Il ne possède pas de résistance structurelle majeure.

• LE BÉTON = Ciment + Sable + GRAVIERS + Eau.
C'est un matériau de structure. Le gravier (les granulats) forme un squelette ultra-résistant à la compression, tandis que le ciment sert de colle entre ces graviers. Utilisé pour dalles, poutres, poteaux, fondations.` 
      },
      { 
        id: 'm6c2', title: 'Ciment Gris, Ciment Blanc et Chaux', duration: '35 min', 
        content: `• Ciment CEM II (Portland classique) : Le ciment gris standard (32.5 ou 42.5 MPa). Étanche, rigide, prise très dure. Idéal pour le neuf.
• Ciment Blanc : Chimiquement identique au gris, mais purifié de ses oxydes de fer. Utilisé pour les bétons apparents, les enduits clairs ou les joints de carrelage.
• La Chaux Hydraulique (NHL 3.5 ou 5) : Liant ancestral. Prise plus lente. Elle est "respirante" (laisse passer la vapeur d'eau), souple et fongicide. Obligatoire pour la rénovation de murs en pierre ancienne, car le ciment bloquerait l'humidité et ferait exploser la pierre au premier gel.` 
      },
      { 
        id: 'm6c3', title: 'L\'Eau : Le meilleur ennemi', duration: '30 min', 
        content: `En maçonnerie, l'eau sert à déclencher la réaction chimique de cristallisation du ciment (la prise hydraulique), PAS à rendre le mélange fluide.

L'erreur du débutant est de noyer son béton pour qu'il soit plus facile à étaler à la règle. Mais cette eau en excès va s'évaporer, laissant derrière elle un réseau de micro-canaux vides. Résultat : un béton poreux, friable, qui perd jusqu'à 50% de sa résistance mécanique, et qui fissure énormément au séchage (retrait).
Le rapport Eau/Ciment (E/C) doit idéalement se situer autour de 0,5 (soit 17.5 Litres d'eau pour 1 sac de ciment de 35 kg).` 
      },
      { 
        id: 'm6c4', title: 'Les Adjuvants chimiques', duration: '25 min', 
        content: `La chimie moderne permet d'altérer le comportement du béton en y ajoutant des liquides dans l'eau de gâchage :
        
• Plastifiant / Superplastifiant : Permet de rendre le béton très fluide et liquide SANS ajouter d'eau. Parfait pour couler un linteau très ferraillé.
• Hydrofuge de masse : Rebouche les pores capillaires du mortier. Le rend totalement étanche (utilisé pour les bassins, piscines, et les arases de fondations).
• Accélérateur / Retardateur de prise : Pour compenser les températures. (Ex: Retardateur l'été pour éviter que le béton ne grille au soleil avant d'être tiré).` 
      }
    ]
  },
  {
    id: 'm7', title: 'Élévation : Agglos (Parpaings)', icon: <Box size={24} />, color: 'from-orange-500 to-orange-700', level: 'Avancé', duration: '6h',
    chapters: [
      { 
        id: 'm7c1', title: 'L\'Arase étanche', duration: '40 min', 
        content: `L'humidité contenue dans la terre remonte naturellement dans les matériaux poreux : c'est la remontée capillaire. Elle détruit les plâtres, crée des moisissures et de la mérule.

Le DTU impose de couper cette remontée. Sous le premier rang de parpaings du plancher bas, vous devez réaliser une "Coupure de Capillarité".
Méthodes :
1. Une couche de mortier de ciment de 2 cm d'épaisseur, fortement dosée (400kg/m³) et additionnée d'hydrofuge de masse. Lissée parfaitement à la truelle.
2. Le déroulement d'une bande bitumeuse (type feutre asphalte) posée à sec sur un lit de mortier.` 
      },
      { 
        id: 'm7c2', title: 'L\'art du Rang de Départ', duration: '1h', 
        content: `Si le premier rang est posé de travers, vous allez subir et amplifier cette erreur sur les 3 mètres de hauteur du mur.

1. Déposez un lit de mortier onctueux d'environ 2 à 3 cm.
2. Posez le bloc d'angle de l'extrémité gauche. Réglez son aplomb (verticalité des faces) au niveau ou fil à plomb. Réglez son horizontalité exacte.
3. Faites la même chose avec le bloc de l'extrémité droite du mur.
4. Tendez un cordeau fluo entre ces deux blocs, parfaitement aligné sur l'arête supérieure extérieure.
5. Posez tous les blocs intermédiaires. Leurs arêtes doivent frôler le cordeau (laissez 1 millimètre de jour pour ne pas pousser la ficelle).` 
      },
      { 
        id: 'm7c3', title: 'Croisement et joints (Coup de sabre)', duration: '45 min', 
        content: `La règle structurelle des murs maçonnés : Les joints verticaux ne doivent jamais être superposés d'un rang à l'autre. C'est ce qu'on appelle un "coup de sabre", une faille verticale qui fendra le mur en deux à la première contrainte.
Il faut croiser les blocs (les chevaucher) au minimum du tiers de leur longueur, idéalement de la moitié.

La pose : 
- Appliquez deux bandes de mortier sur le bord supérieur du parpaing en dessous (on ne remplit pas le creux central).
- Graissez une face latérale (les "oreilles") du nouveau bloc.
- Posez-le à 1cm du précédent, et tapotez avec le manche de la truelle pour l'aligner au cordeau. Le mortier va baver, récupérez-le avec la truelle.
- Lissez les joints apparents avec un fer à joint "demi-rond" une fois le mortier un peu durci.` 
      },
      { 
        id: 'm7c4', title: 'Chaînages verticaux et Blocs spéciaux', duration: '45 min', 
        content: `Un mur en parpaing creux n'a aucune résistance à la flexion latérale (vent fort, séisme). Il doit être "ceinturé".
On crée des poteaux en béton armé INVISIBLES à l'intérieur du mur.

Aux angles du bâtiment, de part et d'autre des portes et fenêtres, et tous les 3 mètres sur les murs pleins, on utilise des "Blocs d'angle". Ce sont des parpaings percés d'un trou carré de haut en bas.
On fait monter l'armature d'acier à travers ces trous. Une fois le mur terminé, on coule un béton très fluide (avec plastifiant) depuis le sommet du mur pour remplir toute la colonne. C'est le chaînage vertical.` 
      }
    ]
  },
  {
    id: 'm8', title: 'Élévation : Briques Alvéolaires', icon: <Grid size={24} />, color: 'from-red-500 to-red-800', level: 'Avancé', duration: '4h',
    chapters: [
      { 
        id: 'm8c1', title: 'Avantages thermiques (Monomur)', duration: '30 min', 
        content: `Le parpaing de béton est un très mauvais isolant thermique. La brique de terre cuite alvéolaire (type Porotherm ou Bio\'Bric) est structurée avec des dizaines de minuscules cavités emprisonnant l'air (le meilleur isolant naturel).
Une brique "Monomur" de 37cm d'épaisseur permet parfois de se passer d'isolant intérieur (laine de verre). Elle gère aussi très bien l'hygrométrie (l'humidité de l'air).
Revers de la médaille : Elle est cassante, chère, et ne tolère pas l'approximation lors de la pose.` 
      },
      { 
        id: 'm8c2', title: 'La Maçonnerie Roulée (Joint Mince)', duration: '50 min', 
        content: `La brique moderne ne se monte plus à la truelle avec de gros joints de mortier de 1,5 cm, car ce mortier créerait des "ponts thermiques" (des autoroutes pour le froid).
Les briques sont "rectifiées" en usine : leurs faces sont sciées pour être parfaitement lisses et de hauteur millimétrée.

Le montage :
1. Le premier rang est monté sur un lit de mortier classique pour régler l'horizontalité PARFAITE (au laser).
2. Pour les rangs suivants, on prépare une "colle" (mortier-colle spécial) mélangée au malaxeur électrique.
3. On applique cette colle avec un "rouleau applicateur" spécifique qui dépose une couche striée de seulement 1 à 3 millimètres d'épaisseur.
4. On pose la brique rectifiée dessus. Le mur monte à une vitesse fulgurante et l'isolation est continue.` 
      },
      { 
        id: 'm8c3', title: 'La Découpe de la Brique', duration: '30 min', 
        content: `C'est le point noir de la brique. Taper dessus avec une massette la fait exploser en miettes.
Pour les coupes de précision, il faut utiliser une scie sabre équipée d'une lame spéciale carbure (très efficace et produit peu de poussière), ou bien une grande scie sur table à eau avec disque diamant de 400mm (parfait pour les grosses cadences sur chantier).` 
      }
    ]
  },
  {
    id: 'm9', title: 'Béton Armé : Coffrage & Poteaux', icon: <Layers size={24} />, color: 'from-slate-600 to-slate-900', level: 'Expert', duration: '5h',
    chapters: [
      { 
        id: 'm9c1', title: 'La pression hydrostatique du béton', duration: '30 min', 
        content: `L'erreur la plus spectaculaire en maçonnerie est l'explosion d'un coffrage.
Le béton frais est un liquide lourd, de l'ordre de 2,4 tonnes par mètre cube. Lors du coulage d'un poteau de 3 mètres de haut, la pression exercée sur le bas du coffrage est titanesque. De plus, la vibration à l'aiguille augmente instantanément cette pression latérale.
Votre coffrage ne doit pas être "juste assez solide", il doit être surdimensionné.` 
      },
      { 
        id: 'm9c2', title: 'Réaliser le coffrage en bois', duration: '45 min', 
        content: `Utilisez des planches de pin épaisses (voliges de 27mm ou bastaings).
1. Fixation : Ne vous contentez pas de clous. Utilisez des vis à bois (facilite le décoffrage) et serrez le coffrage par l'extérieur à l'aide de serre-joints à pompe de maçon ou de "chevillettes".
2. Huile de décoffrage : Avant de refermer le coffrage, badigeonnez l'intérieur du bois avec une huile de décoffrage végétale ou minérale. Sans cela, le ciment s'agglomérera dans les fibres du bois et vous arracherez des morceaux de béton au décoffrage.
3. Étanchéité : Colmatez les fuites dans les angles. Si la "laitance" liquide s'échappe, le béton perd de sa force et des nids de graviers apparaîtront en surface.` 
      },
      { 
        id: 'm9c3', title: 'Calage des aciers et Enrobage', duration: '30 min', 
        content: `Dans un coffrage de poutre ou de poteau, les armatures ont tendance à bouger pendant le coulage et à venir se coller contre le bois. Au décoffrage, l'acier sera apparent, s'oxydera avec la pluie, gonflera et fera exploser le poteau dans 5 ans.
Vous DEVEZ utiliser des enrobeurs (ou écarteurs) en plastique en forme de roue, clipsés sur les aciers, qui maintiendront une distance rigoureuse de 3 cm entre le ferraillage et le coffrage en bois.` 
      },
      { 
        id: 'm9c4', title: 'Le Décoffrage et les Nids d\'abeilles', duration: '30 min', 
        content: `Temps de séchage minimal avant de retirer les planches latérales : 48h (plus s'il fait froid). Pour les éléments en suspension (le dessous d'un linteau ou d'une dalle), on attend 21 à 28 jours (séchage structurel à cœur).
Si au décoffrage vous constatez des zones granuleuses avec des trous (les nids de cailloux / nids d'abeilles, causés par un manque de vibration) : ne les masquez pas avec du mortier classique ! Nettoyez à haute pression, purgez les morceaux friables, et utilisez un "mortier de réparation structurel fibré" (classe R3 ou R4) qui possède la même résistance qu'un béton armé.` 
      }
    ]
  },
  {
    id: 'm10', title: 'Ouvertures : Linteaux & Seuils', icon: <Grid size={24} />, color: 'from-purple-600 to-purple-800', level: 'Avancé', duration: '4h',
    chapters: [
      { 
        id: 'm10c1', title: 'Le Linteau traditionnel ou en bloc U', duration: '40 min', 
        content: `Le linteau est la poutre horizontale qui soutient le poids du mur au-dessus d'une baie (porte, fenêtre).
Deux méthodes de réalisation :
1. Le coffrage traditionnel : On fabrique une "caisse" en bois supportée par des étais métalliques sous le trou de la fenêtre. On y dépose un chaînage, et on coule du béton.
2. Le Bloc "U" (ou bloc linteau) : C'est un parpaing creusé en forme de U. On aligne ces blocs sur une simple planche soutenue par des étais, on place le ferraillage dans la rigole du U, et on remplit de béton. L'avantage est qu'en façade, l'aspect parpaing reste uniforme pour faciliter l'accroche de l'enduit.` 
      },
      { 
        id: 'm10c2', title: 'L\'Appui de Fenêtre', duration: '40 min', 
        content: `L'appui de fenêtre est la partie basse de l'encadrement extérieur. Il est très exposé à la pluie.
Ses éléments techniques cruciaux :
• Le Rejingot : C'est le petit muret (redent) situé à l'arrière de l'appui, sur lequel va se poser la menuiserie de la fenêtre. Il empêche le vent de pousser l'eau sous le dormant de la fenêtre vers l'intérieur.
• Les Oreilles : Les débords latéraux qui rentrent dans la maçonnerie pour garantir l'étanchéité des angles.
• La Goutte d'eau (ou larmier) : C'est une petite rainure creusée sous la partie débordante extérieure de l'appui. L'eau de pluie qui coule sur l'appui est stoppée par cette rainure, forme une goutte, et tombe dans le vide au lieu de ruisseler sur la façade et de créer des coulures noires.` 
      },
      { 
        id: 'm10c3', title: 'Le Seuil de Porte / Baie Vitrée', duration: '30 min', 
        content: `Contrairement à l'appui de fenêtre, un seuil de porte est soumis à un écrasement (le passage de personnes, voire de voitures pour un garage).
Le point critique est l'altimétrie (la hauteur). Le haut du seuil, côté intérieur, doit être calculé méticuleusement pour arriver EXACTEMENT à la même hauteur que le futur niveau de la dalle + chape + carrelage fini. On appelle cette cote le "Sol Fini" (Trait de Niveau d'un mètre sur les plans).` 
      }
    ]
  },
  {
    id: 'm11', title: 'Planchers & Dalles (Hérisson)', icon: <Layers size={24} />, color: 'from-indigo-600 to-indigo-800', level: 'Avancé', duration: '5h',
    chapters: [
      { 
        id: 'm11c1', title: 'Le Hérisson (Base drainante)', duration: '40 min', 
        content: `Pour couler une dalle au rez-de-chaussée (sur terre-plein), il faut créer une assise saine.
1. Décaissez la terre végétale.
2. Étalez une couche de 15 à 25 cm de matériaux concassés durs (calibre 40/80mm ou 0/31.5). C'est le hérisson. N'utilisez jamais de vieux gravats plâtreux ou de terre.
3. Compactez fortement l'ensemble avec une plaque vibrante (dameuse). Ce lit caillouteux empêche la remontée d'eau par capillarité et tasse le sol.` 
      },
      { 
        id: 'm11c2', title: 'Film Polyane et Isolation', duration: '30 min', 
        content: `Sur le hérisson bien compacté :
1. Déroulez un film Polyane (un plastique très épais de minimum 150 microns). Il doit remonter le long des murs périphériques pour former une cuvette étanche parfaite. Superposez les bandes plastiques sur 20 cm et scotchez-les.
2. (Optionnel selon les normes thermiques RT2012/RE2020) : Posez des panneaux isolants incompressibles (Polyuréthane ou Polystyrène extrudé) directement sur le polyane pour isoler votre dalle du froid du sol.` 
      },
      { 
        id: 'm11c3', title: 'Ferraillage et Treillis Soudé', duration: '30 min', 
        content: `La dalle en béton fait généralement 12 cm d'épaisseur.
Elle doit être ferraillée avec du "Treillis Soudé" (généralement du ST25C en maison individuelle). 
Le treillis se présente sous forme de grands panneaux de grillage. Règle absolue : LE TREILLIS NE DOIT PAS TOUCHER LE FOND. S'il est collé au plastique, il ne sert à rien. Il doit se situer au tiers inférieur de l'épaisseur de la dalle. Posez-le sur de petits blocs de béton ou des cales en plastique de 3 à 4 cm de haut.` 
      },
      { 
        id: 'm11c4', title: 'Couler et Tirer la dalle (La Règle)', duration: '50 min', 
        content: `Coulage : Toujours commencer par le fond de la pièce pour reculer vers la porte de sortie.
Le geste du tirage :
1. Préparez des guides : Calez des tubes ronds en acier ou des profilés PVC de niveau, espacés de 2 mètres.
2. Coulez le béton un peu plus haut que ces guides.
3. Posez votre grande règle en aluminium sur les deux guides.
4. Effectuez un mouvement de balancier latéral (de gauche à droite, comme une scie), tout en reculant lentement la règle vers vous. 
Ce mouvement de cisaillement latéral est crucial : il fait descendre les graviers, fait remonter l'eau et la laitance du ciment (ce qui lisse la surface), et le mouvement de recul égalise la hauteur au niveau des guides.` 
      }
    ]
  },
  {
    id: 'm12', title: 'Les Chapes (Maigres & Liquides)', icon: <Layers size={24} />, color: 'from-blue-400 to-blue-600', level: 'Expert', duration: '3h30',
    chapters: [
      { 
        id: 'm12c1', title: 'Pourquoi une chape sur une dalle ?', duration: '20 min', 
        content: `La dalle structurelle en béton tirée à la règle est rugueuse et présente souvent de faux niveaux (des creux ou des bosses de quelques millimètres). On ne peut pas coller de carrelage ni poser de parquet directement dessus avec un beau rendu.
La chape est une couche de finition, de 4 à 6 cm d'épaisseur, qui vient "rattraper" les niveaux pour offrir une surface lisse et parfaitement plane (Tolérance de 3mm sous une règle de 2m).` 
      },
      { 
        id: 'm12c2', title: 'La Chape Traditionnelle (Carreleur)', duration: '40 min', 
        content: `C'est un "mortier sous-dosé".
Dosage : Environ 200 à 250 kg de ciment par mètre cube de sable. Mais surtout, on y met très peu d'eau. La consistance n'est pas une pâte collante, mais ressemble plutôt à de la "terre de jardin humide" (quand on la serre dans le poing, elle garde sa forme sans mouiller la main).
On l'étale sur le sol, on la dame vigoureusement (pour la compacter), et on la dresse (coupe) à la règle en aluminium sur des guides (règles de carreleur). On la finit en la frottant à la taloche éponge pour serrer les grains de sable en surface.` 
      },
      { 
        id: 'm12c3', title: 'La Chape Liquide (Fluide)', duration: '30 min', 
        content: `La méthode moderne, notamment sur les Planchers Chauffants.
C'est un mortier auto-nivelant, souvent à base d'Anhydrite (sulfate de calcium) ou de Ciment, livré par camion toupie. Il est liquide comme de la soupe.
On le pompe dans la maison à l'aide d'un tuyau. Le chapiste utilise une "barre à débuller" (une barre avec des picots ou un tube) pour croiser la surface en créant des vagues. La chape se met à niveau toute seule comme un plan d'eau. Séchage : il faut impérativement poncer la surface après séchage pour enlever la pellicule de laitance et pouvoir coller le carrelage.` 
      }
    ]
  },
  {
    id: 'm13', title: 'Enduits de Façade & Crépis', icon: <Paintbrush size={24} />, color: 'from-amber-200 to-amber-500', level: 'Expert', duration: '5h',
    chapters: [
      { 
        id: 'm13c1', title: 'Préparation des supports et Profilés', duration: '40 min', 
        content: `Un enduit pèse lourd (environ 30 kg/m²). Le support (parpaings) doit être brossé, dépoussiéré, et humidifié s'il fait chaud, pour éviter que le mur ne pompe immédiatement l'eau de l'enduit (ce qui le ferait "griller" et faïencer/fissurer).
Les Angles : Pour des arêtes parfaites et solides, scellez des profilés d'angle (baguettes métalliques ou PVC équipées de treillis fibre de verre) sur tous les angles sortants de la maison et autour des fenêtres à l'aide d'un mortier colle.` 
      },
      { 
        id: 'm13c2', title: 'Le Gobetis (Couche d\'Accroche)', duration: '35 min', 
        content: `L'enduit traditionnel se fait en 3 couches (DTU 26.1).
La première est le Gobetis. C'est un mortier bâtard très liquide, sur-dosé en ciment (400 à 500 kg/m³).
On le projette violemment sur le mur (à la truelle ou au sablon pneumatique) en fine couche de 3 à 5 mm. L'objectif n'est pas de lisser le mur, mais de créer une surface extrêmement rugueuse (comme du papier de verre géant) sur laquelle la couche suivante pourra s'agripper sans glisser.` 
      },
      { 
        id: 'm13c3', title: 'Le Corps d\'Enduit (Dressage)', duration: '45 min', 
        content: `Appliquée 24 à 48h après le gobetis. C'est la couche la plus épaisse (15 à 20 mm).
Le mortier est hydrofugé (pour l'imperméabilité) et dosé normalement (300 kg/m³).
On l'applique généreusement sur le mur. Ensuite, on le "dresse" en passant une règle en aluminium crantée ou droite, de bas en haut, pour aplanir les bosses et combler les creux. L'objectif est d'obtenir une surface parfaitement plane (verticale), mais laissée brute/rayée.` 
      },
      { 
        id: 'm13c4', title: 'La Couche de Finition (Aspects)', duration: '40 min', 
        content: `Dernière couche de quelques millimètres, souvent un enduit industriel prêt-à-l'emploi et teinté dans la masse (Monocouche).
Les finitions possibles :
• Talochée : Fendillée ou lisse. On passe une taloche en mousse ou en bois en mouvements circulaires. (Très salissant avec la pollution).
• Grattée : Aspect moderne et mat. On laisse l'enduit durcir quelques heures, puis on passe une grande planche couverte de clous (le gratton) avec un mouvement circulaire régulier pour faire tomber la pellicule de surface.
• Projetée / Tyrolienne : Aspect très rustique à picots. Obtenu avec une machine à manivelle (la tyrolienne) qui projette des gouttelettes de mortier.` 
      }
    ]
  },
  {
    id: 'm14', title: 'La Maçonnerie Paysagère', icon: <Hammer size={24} />, color: 'from-green-600 to-emerald-800', level: 'Intermédiaire', duration: '4h',
    chapters: [
      { 
        id: 'm14c1', title: 'Le Muret en Pierre Sèche', duration: '40 min', 
        content: `Art ancestral et écologique. Aucun mortier n'est utilisé. C'est l'emboîtement des pierres qui crée la structure.
1. Les fondations : Décaissez de 20cm, créez un lit de gros graviers.
2. Le tri : Séparez les pierres de parement (belles faces), les boutisses (pierres longues), et les cailloux de calage.
3. Le Fruit : Un mur en pierre sèche ne doit pas être parfaitement vertical. Ses faces doivent s'incliner vers le centre du mur au fur et à mesure qu'on monte (c'est le "fruit", d'environ 5% à 10%). Cela évite que le mur ne s'effondre.
4. Les boutisses : Tous les mètres, placez une très longue pierre qui traverse toute l'épaisseur du mur pour relier la face avant et la face arrière.` 
      },
      { 
        id: 'm14c2', title: 'Le Pavage sur lit de sable', duration: '35 min', 
        content: `L'allée carrossable écologique et drainante.
1. Le Fond de forme : Décaissez sur 20 cm, mettez 15 cm de tout-venant concassé (0/31.5) et compactez à la plaque vibrante.
2. Le Géotextile : Posez un feutre indéchirable pour éviter que les mauvaises herbes ne remontent, et que le sable ne s'enfonce dans les graviers.
3. Le Lit de pose : Étalez 3 à 5 cm de sable de rivière, tirez-le à la règle. Ne marchez plus dessus !
4. La pose : Posez vos pavés (béton, granit) de bord à bord. Ajustez la hauteur d'un coup de maillet en caoutchouc blanc (pour ne pas tacher). 
5. Les joints : Balayez un sable polymère très fin dans les interstices de la surface finie pour la bloquer.` 
      },
      { 
        id: 'm14c3', title: 'Création d\'un escalier (Loi de Blondel)', duration: '40 min', 
        content: `Un escalier mal calculé fatigue ou fait trébucher. En maçonnerie, on utilise la formule de l'architecte François Blondel depuis le 17e siècle :
2 fois la Hauteur de marche (H) + 1 Giron (profondeur de la marche, G) doit être compris entre 60 et 64 cm. (2H + G = 62 cm, idéalement).
Exemple idéal : Marche de 17 cm de haut, giron de 28 cm. (17*2 + 28 = 62).

Le coffrage : L'escalier en béton se coule sur une "paillasse" inclinée (le fond). On coffre les contremarches avec des planches ultra-solides fixées sur les parois latérales (les limons). On ferraille abondamment la paillasse en ancrant les fers dans les paliers haut et bas. On coule un béton "ferme" (peu d'eau) en commençant toujours par la marche du bas, pour que le béton ne dégouline pas sous les planches de contremarches.` 
      }
    ]
  },
  {
    id: 'm15', title: 'Pathologies & Rénovation', icon: <AlertTriangle size={24} />, color: 'from-rose-600 to-rose-900', level: 'Expert', duration: '3h',
    chapters: [
      { 
        id: 'm15c1', title: 'Déchiffrer les fissures', duration: '40 min', 
        content: `Toutes les fissures ne sont pas dangereuses.
• Le Faïençage : Un réseau en toile d'araignée très fin sur l'enduit de façade. Dû à un séchage trop rapide du mortier (retrait). C'est inesthétique mais non structurel.
• Fissures horizontales : Souvent au niveau de la jonction entre le mur et le plancher. Causées par la dilatation thermique différente des deux matériaux. Des profilés de fractionnement les évitent.
• Fissures en escalier (suivant les joints de parpaings) : C'est le tassement différentiel. Un côté de la maison s'enfonce dans le sol (sécheresse de l'argile, ou fuite d'eau souterraine), la maison se casse en deux. Dangereux.
• Fissure verticale traversante : Souvent liée à l'absence d'un joint de dilatation sur une façade de plus de 15 mètres de long.` 
      },
      { 
        id: 'm15c2', title: 'L\'Humidité : Capillarité, Infiltration, Condensation', duration: '40 min', 
        content: `L'eau détruit l'intérieur des maisons. Diagnostiquer la source est le métier de l'expert :
1. Les Remontées Capillaires : Les murs du rez-de-chaussée (surtout l'ancien) pompent l'eau du sol. Les plâtres pourrissent à 1 mètre du sol, auréoles noires. (Solution : Injection de résine hydrophobe dans l'épaisseur du mur, ou drainage par l'extérieur).
2. L'Infiltration : Souvent localisée (sous une fenêtre, autour d'une cheminée). L'eau de pluie passe à travers une façade poreuse, un enduit micro-fissuré ou une toiture.
3. La Condensation : Souvent confondue avec une fuite. Aux angles des plafonds ou derrière les meubles. C'est l'humidité de l'air intérieur (respiration, douche) qui se condense en eau sur un mur froid (Pont thermique + Manque de VMC).` 
      },
      { 
        id: 'm15c3', title: 'Reprises en sous-œuvre (Travaux dangereux)', duration: '30 min', 
        content: `Casser un mur porteur pour ouvrir un grand salon ou une baie vitrée est le chantier le plus risqué.
L'étude de charge (par un ingénieur structure) est obligatoire.
1. Étayage massif : Avant de casser quoi que ce soit, on soutient les planchers supérieurs et la toiture avec des dizaines d'étais métalliques et des poutres (bastaings), de part et d'autre du futur trou.
2. L'ouverture : On découpe le mur avec précaution.
3. La Poutre IPN / HEA : On met en place une poutre métallique massive, reposant sur des appuis en béton plein de minimum 20 cm de chaque côté. On la met sous tension (en force) avant de retirer les étais, pour éviter que le bâtiment ne s'affaisse d'un millimètre.` 
      }
    ]
  },
  {
    id: 'm16', title: 'La Démarche Éco-Responsable', icon: <Activity size={24} />, color: 'from-teal-600 to-teal-800', level: 'Débutant', duration: '2h',
    chapters: [
      { 
        id: 'm16c1', title: 'Bétons bas carbone', duration: '30 min', 
        content: `L'industrie cimentière (cuisson du clinker à 1450°C) est responsable de 7% des émissions mondiales de CO2. 
Les nouveaux ciments (CEM III, CEM IV) ou les "Bétons bas carbone" substituent une partie de ce clinker polluant par des laitiers de hauts fourneaux (déchets de la sidérurgie) ou des cendres volantes. 
Côté artisan : la prise de ces bétons est souvent beaucoup plus lente (notamment par temps froid). Il faut adapter les temps de décoffrage.` 
      },
      { 
        id: 'm16c2', title: 'Le Béton de Chanvre', duration: '30 min', 
        content: `Matériau d'avenir biosourcé. 
On mélange de la Chénevotte (le bois de la tige du chanvre agricole), de la Chaux formulée, et de l'eau.
Ce n'est PAS un béton porteur, on ne peut pas construire la structure avec. On l'utilise en remplissage d'une ossature bois, ou en isolation thermique/phonique par l'intérieur. Il se banchera (coffrage) ou se projettera à la machine. Il régule excellemment l'humidité de la maison.` 
      }
    ]
  }
];

const GLOSSAIRE = [
  { term: 'Acrotère', def: 'Muret situé en bordure des toitures-terrasses pour permettre le relevé d\'étanchéité et éviter les chutes.' },
  { term: 'Adjuvant', def: 'Produit chimique liquide ou en poudre ajouté au mortier/béton lors du gâchage pour en modifier les propriétés (hydrofuge, plastifiant, antigel, accélérateur).' },
  { term: 'Agglo', def: 'Raccourci pour "bloc de béton aggloméré", le nom technique et exact du parpaing de ciment.' },
  { term: 'Aiguille vibrante', def: 'Cylindre métallique vibrant (pneumatique/électrique) plongé dans le béton frais pour expulser les bulles d\'air et compacter le mélange.' },
  { term: 'Arase', def: 'Dernier niveau d\'un mur, souvent coulé en mortier ou béton, mis parfaitement à niveau horizontal pour recevoir la charpente ou un autre ouvrage.' },
  { term: 'Banche', def: 'Panneau de coffrage lourd, souvent métallique, de grande dimension, assemblé face à face pour couler des murs complets en béton armé (béton banché).' },
  { term: 'Barbotine', def: 'Mélange très liquide d\'eau et de ciment pur (ou d\'une résine d\'accrochage). Utilisé comme "colle" primaire de liaison entre deux couches de béton ou pour le carrelage.' },
  { term: 'Bastaing', def: 'Pièce de bois de charpente (souvent de section 63x175 mm), détournée par les maçons pour constituer des échafaudages ou retenir de lourds coffrages de béton.' },
  { term: 'Béton cellulaire', def: 'Matériau de construction ultra-léger et isolant (Siporex/Ytong), fait de sable, chaux, ciment, et d\'un agent levant créant des millions de micro-bulles d\'air.' },
  { term: 'Chaînage', def: 'Armatures en acier disposées horizontalement (dans les planchers) et verticalement (aux angles des murs) pour créer une armature périphérique reliant les maçonneries, comme la ceinture d\'un pantalon.' },
  { term: 'Chape', def: 'Couche de mortier posée sur une dalle structurelle. Elle ne supporte pas de charge lourde, elle sert à aplanir et mettre de niveau la surface avant la pose d\'un revêtement (carrelage, parquet).' },
  { term: 'Chevillette', def: 'Tige d\'acier forgée avec une pointe et une section carrée. S\'enfonce au marteau dans le mur pour serrer temporairement une règle ou un coffrage.' },
  { term: 'Clinker', def: 'Le constituant principal du ciment Portland. C\'est un mélange de calcaire et d\'argile cuit à très haute température (1450°C) dans un four rotatif, puis broyé en poudre fine.' },
  { term: 'Cordeau', def: 'Petite ficelle (souvent en nylon tressé coloré) tendue fermement entre deux points pour créer une ligne de référence droite servant de guide pour aligner les parpaings.' },
  { term: 'Coup de sabre', def: 'Défaut de pose de maçonnerie où les joints verticaux de deux (ou plusieurs) rangs successifs sont superposés. Cela crée une ligne de rupture immédiate, le mur n\'étant plus solidaire.' },
  { term: 'Cure (du béton)', def: 'Méthodes de protection du béton pendant ses premiers jours de séchage pour empêcher son eau de s\'évaporer trop vite (vent, soleil de plomb) : vaporisation de produit de cure, bâches, ou arrosage.' },
  { term: 'Décaissement', def: 'Action de creuser et d\'enlever de la terre sur une épaisseur donnée pour préparer la réalisation d\'une fondation ou d\'un dallage.' },
  { term: 'Délardage', def: 'Opération consistant à tailler ou scier une partie d\'un matériau en biseau (souvent utilisé dans la taille de pierre ou charpente).' },
  { term: 'DTU (Document Technique Unifié)', def: 'Le recueil des règles de l\'art de la construction en France. Si un ouvrage ne respecte pas le DTU, les assurances décennales refusent la prise en charge en cas de sinistre.' },
  { term: 'Enrobage', def: 'L\'épaisseur de béton minimale imposée qui doit séparer une armature en acier de l\'air libre ou de la terre. Primordial pour éviter la corrosion du fer (généralement de 3 à 5 cm).' },
  { term: 'Étude de sol (G2)', def: 'Analyse géologique du terrain réalisée par forage avant construction, permettant à l\'ingénieur de prescrire le type et la profondeur des fondations nécessaires.' },
  { term: 'Ferraillage', def: 'Opération consistant à découper, façonner, ligaturer et mettre en place l\'ensemble des armatures en acier dans les coffrages avant le coulage du béton.' },
  { term: 'Fruit (d\'un mur)', def: 'Inclinaison volontaire donnée à la face extérieure d\'un mur (il s\'amincit vers le sommet) pour améliorer sa stabilité, typique des vieux murs de soutènement en pierre sèche.' },
  { term: 'Gâchage', def: 'Le fait de mélanger de manière intime les composants à l\'état sec (ciment, sable, gravier) puis d\'y incorporer l\'eau pour obtenir la consistance plastique voulue d\'un mortier ou béton.' },
  { term: 'Giron', def: 'En construction d\'escaliers, c\'est la distance horizontale (la profondeur) de la marche, mesurée entre les nez de deux marches successives. Le pied se pose sur le giron.' },
  { term: 'Gobetis', def: 'La toute première couche fine et extrêmement liquide d\'un enduit de façade. Son but exclusif est de créer une accroche très rugueuse sur le support lisse.' },
  { term: 'Hérisson', def: 'Sous-couche d\'une dalle sur terre-plein, composée de pierres ou de gros graviers damés, servant d\'assise stable et isolant la dalle de l\'humidité directe du sol par drainage de l\'eau.' },
  { term: 'HEB / HEA / IPN', def: 'Profilés métalliques (poutrelles en acier laminé). L\'IPN a une forme en "I", le HEB a une forme de "H". Très utilisés en rénovation pour remplacer un mur porteur abattu.' },
  { term: 'Hydrofuge', def: 'Produit de traitement ou additif qui a la propriété de repousser l\'eau, rendant un matériau poreux (comme le mortier) parfaitement imperméable.' },
  { term: 'Joint de dilatation', def: 'Coupure ou espace vide aménagé intentionnellement dans les grands bâtiments en béton pour absorber les variations de dimensions dues aux changements de températures sans que le bâtiment ne fissure.' },
  { term: 'Laitance', def: 'Pellicule blanchâtre et poudreuse qui remonte à la surface des bétons frais qui ont été gâchés avec trop d\'eau. Cette couche est très fragile et empêche la colle de carrelage d\'accrocher.' },
  { term: 'Linteau', def: 'Élément architectural horizontal (en béton armé, bois, ou pierre) qui ferme le haut d\'une ouverture (porte ou fenêtre) et soutient la charge de la maçonnerie supérieure.' },
  { term: 'Plumb (Aplomb)', def: 'L\'état de ce qui est rigoureusement et parfaitement vertical (par rapport au centre de la Terre). Vérifié historiquement au fil à plomb.' },
  { term: 'Polyane', def: 'Marque déposée devenue nom commun. Désigne le film plastique épais d\'étanchéité déposé sur le sol avant le coulage d\'une dalle pour couper les remontées capillaires.' },
  { term: 'Pont thermique', def: 'Zone de l\'enveloppe du bâtiment présentant une discontinuité dans l\'isolation, laissant entrer le froid extérieur ou fuir la chaleur intérieure (ex: dalle de béton non isolée en nez de plancher).' },
  { term: 'Ragréage', def: 'Opération de lissage du sol (sur une dalle ou une chape mal réalisée) par l\'application d\'un mortier très fluide "autolissant" sur quelques millimètres, avant la pose de carrelage ou lino.' },
  { term: 'Refus (Bon sol)', def: 'Niveau géologique du sous-sol suffisamment dur, stable et incompressible pour pouvoir y asseoir les semelles de fondation de la maison sans risque de tassement.' },
  { term: 'Rejingot', def: 'Bordure arrière surélevée d\'un appui de fenêtre en maçonnerie. La menuiserie vient s\'appuyer derrière le rejingot, ce qui empêche les eaux de ruissellement extérieures de pénétrer dans la pièce.' },
  { term: 'Ségrégation', def: 'Désordre grave du béton frais. Lorsqu\'il est gâché avec trop d\'eau ou vibré trop longtemps, les éléments se séparent : les lourds graviers tombent au fond du coffrage, le ciment et l\'eau remontent.' },
  { term: 'Taloche', def: 'Outil manuel incontournable. Plaque rectangulaire munie d\'une poignée, permettant au maçon de retenir une quantité de mortier dans une main pour l\'appliquer, ou permettant de frotter/lisser la surface finale d\'un enduit.' },
  { term: 'Treillis soudé', def: 'Armature standardisée pour les surfaces planes (dalles, dallages). C\'est un réseau de fils d\'acier croisés perpendiculairement et soudés électriquement à chaque intersection.' },
  { term: 'Truelle', def: 'L\'extension de la main du maçon. Outil constitué d\'une lame d\'acier reliée à un manche coudé, servant à gâcher, couper, prendre et jeter le mortier sur les blocs.' }
];

// ... Je te fournis la Partie 2 dans mon prochain message sans faute ! Ne touche à rien.
const BADGES = [
  { id: 'bd1', name: 'Nouveau Casque', desc: 'Profil créé', icon: <HardHat size={24}/> },
  { id: 'bd2', name: 'L\'Apprenti', desc: '10 leçons terminées', icon: <BookOpen size={24}/> },
  { id: 'bd3', name: 'Le Compagnon', desc: '25 leçons terminées', icon: <Hammer size={24}/> },
  { id: 'bd4', name: 'Chef de Chantier', desc: '40 leçons terminées', icon: <Shield size={24}/> },
  { id: 'bd5', name: 'Maître Bâtisseur', desc: '100% de l\'encyclopédie', icon: <Trophy size={24}/> },
];

const LoadingScreen = () => (
  <div className="fixed inset-0 bg-slate-950 flex flex-col items-center justify-center z-[999] overflow-hidden">
    <div className="w-16 h-16 border-4 border-slate-800 border-t-amber-500 rounded-full animate-spin mb-6"></div>
    <h2 className="text-amber-500 font-black text-xl tracking-widest uppercase animate-pulse">Coulage en cours...</h2>
    <p className="text-slate-500 text-xs mt-2 font-bold">Préparation de l'Encyclopédie</p>
  </div>
);

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [selectedModule, setSelectedModule] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null); 
  
  const [userProfile, setUserProfile] = useState({ name: '', level: 'Apprenti', avatar: '', completedLessons: [] });
  const [isNewUser, setIsNewUser] = useState(true);
  const [profileForm, setProfileForm] = useState({ name: '', level: 'Apprenti' });

  // States pour les outils
  const [toolTab, setToolTab] = useState('dalle');
  const [calcLength, setCalcLength] = useState('');
  const [calcWidth, setCalcWidth] = useState('');
  const [calcDepth, setCalcDepth] = useState('');
  const [wallLength, setWallLength] = useState('');
  const [wallHeight, setWallHeight] = useState('');
  const [stairHeight, setStairHeight] = useState('');
  
  // State pour le glossaire
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500); 
    const saved = localStorage.getItem('batipro_encyclopedia_profile');
    if (saved) {
      setUserProfile(JSON.parse(saved));
      setIsNewUser(false);
    }
    return () => clearTimeout(timer);
  }, []);

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
    localStorage.setItem('batipro_encyclopedia_profile', JSON.stringify(newProfile));
    setIsNewUser(false);
  };

  const finishLesson = (lessonId) => {
    if (!userProfile.completedLessons.includes(lessonId)) {
      const updatedLessons = [...userProfile.completedLessons, lessonId];
      const updatedProfile = { ...userProfile, completedLessons: updatedLessons };
      setUserProfile(updatedProfile);
      localStorage.setItem('batipro_encyclopedia_profile', JSON.stringify(updatedProfile));
    }
    setActiveLesson(null);
  };

  const getModuleProgress = (mod) => {
    if(!userProfile.completedLessons || mod.chapters.length === 0) return 0;
    const total = mod.chapters.length;
    const finished = mod.chapters.filter(c => userProfile.completedLessons.includes(c.id)).length;
    return Math.round((finished / total) * 100);
  };

  const totalFinished = userProfile.completedLessons?.length || 0;
  
  const totalLessonsInApp = useMemo(() => {
    return MODULES.reduce((acc, mod) => acc + mod.chapters.length, 0);
  }, []);

  const badgesWithStatus = BADGES.map(b => {
    let unlocked = false;
    if (b.id === 'bd1') unlocked = userProfile.name !== '';
    if (b.id === 'bd2') unlocked = totalFinished >= 10;
    if (b.id === 'bd3') unlocked = totalFinished >= 25;
    if (b.id === 'bd4') unlocked = totalFinished >= 40;
    if (b.id === 'bd5') unlocked = totalFinished >= totalLessonsInApp;
    return { ...b, unlocked };
  });
  
  const unlockedBadgesCount = badgesWithStatus.filter(b => b.unlocked).length;

  // Calculatrices
  const calcConcrete = useMemo(() => {
    const l = parseFloat(calcLength), w = parseFloat(calcWidth), d = parseFloat(calcDepth) / 100;
    if (!l || !w || !d || l <= 0 || w <= 0 || d <= 0) return null;
    const vol = l * w * d;
    return { 
      vol: vol.toFixed(2), 
      ciment: Math.ceil(vol * 10), 
      sable: Math.round(vol * 800), 
      gravier: Math.round(vol * 1000), 
      eau: Math.round(vol * 175) 
    };
  }, [calcLength, calcWidth, calcDepth]);

  const calcWall = useMemo(() => {
    const l = parseFloat(wallLength), h = parseFloat(wallHeight);
    if (!l || !h || l <= 0 || h <= 0) return null;
    const area = l * h;
    const totalBlocks = Math.ceil((area / 0.1) * 1.05);
    return { 
      area: area.toFixed(2), 
      blocks: totalBlocks, 
      mortar: Math.ceil(area * 15)
    };
  }, [wallLength, wallHeight]);

  const calcStairs = useMemo(() => {
    const h = parseFloat(stairHeight) * 100; // Conversion en cm
    if (!h || h <= 0) return null;
    // Objectif : Hauteur de marche idéale autour de 17 cm
    const nbMarches = Math.round(h / 17);
    const hauteurMarche = h / nbMarches;
    // Loi de Blondel : 2H + G = 63 (idéal)
    const giron = 63 - (2 * hauteurMarche);
    const reculement = giron * (nbMarches - 1); // Longueur totale au sol
    
    return {
      nb: nbMarches,
      hMarche: hauteurMarche.toFixed(1),
      giron: giron.toFixed(1),
      reculement: (reculement / 100).toFixed(2) // Remis en mètres
    };
  }, [stairHeight]);

  if (isLoading) return <LoadingScreen />;

  if (isNewUser) return (
    <div className="fixed inset-0 bg-slate-950 text-white flex flex-col p-6 z-[999]">
      <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
        <HardHat className="text-amber-500 mx-auto mb-6" size={64} />
        <h1 className="text-3xl font-black text-center mb-2">Bienvenue sur Bâti<span className="text-amber-500">Pro</span></h1>
        <p className="text-slate-400 text-center mb-10 text-sm">L'Encyclopédie Ultime du Maçon. ({totalLessonsInApp} leçons détaillées).</p>
        <div className="space-y-6">
          <div>
            <label className="text-[10px] font-black uppercase text-slate-500 block mb-2">Ton Prénom ou Surnom</label>
            <input type="text" value={profileForm.name} onChange={e=>setProfileForm({...profileForm, name: e.target.value})} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-4 text-white font-bold outline-none focus:border-amber-500" placeholder="Ex: Bob le Bâtisseur" />
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
        <button onClick={saveProfile} className="w-full mt-10 bg-amber-500 text-slate-950 py-4 rounded-xl font-black uppercase tracking-widest shadow-lg shadow-amber-500/20 hover:bg-amber-400 transition">Enfiler mon casque</button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-slate-950 text-slate-100 flex flex-col font-sans overflow-hidden">
      {!selectedModule && !activeLesson && (
        <header className="px-6 pt-6 pb-2 bg-slate-950 flex justify-between items-center z-40 relative border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/20"><HardHat size={22}/></div>
            <div>
              <h1 className="text-xl font-black text-white leading-none">Bâti<span className="text-amber-500">Pro</span></h1>
              <span className="text-[9px] text-slate-400 uppercase font-bold tracking-widest">Édition Encyclopédie</span>
            </div>
          </div>
          <button onClick={() => setActiveTab('profile')} className="w-10 h-10 rounded-full border-2 border-slate-700 overflow-hidden"><img src={userProfile.avatar} alt="Avatar" className="w-full h-full object-cover"/></button>
        </header>
      )}

      <main className="flex-1 overflow-y-auto custom-scroll pb-24 relative">
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
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Leçons validées</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl flex flex-col items-center text-center">
                <Medal className="text-emerald-500 mb-2" size={28} />
                <span className="text-2xl font-black text-white">{unlockedBadgesCount} <span className="text-sm text-slate-500">/ {BADGES.length}</span></span>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Trophées obtenus</span>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-[2rem] p-6">
              <h3 className="text-[10px] font-black uppercase text-slate-500 mb-4 flex items-center gap-2"><Trophy size={14}/> Ta Collection de Badges</h3>
              <div className="grid grid-cols-2 gap-3">
                {badgesWithStatus.map((b) => (
                  <div key={b.id} className={`p-4 rounded-2xl border flex flex-col items-center text-center transition-all duration-300 ${b.unlocked ? 'bg-amber-500/10 border-amber-500/30 text-amber-500' : 'bg-slate-950 border-slate-800 opacity-40 text-slate-600'}`}>
                      <div className="mb-2">{b.icon}</div>
                      <div className={`text-xs font-black mb-1 ${b.unlocked ? 'text-white' : 'text-slate-500'}`}>{b.name}</div>
                      <div className="text-[9px] opacity-70 leading-tight">{b.desc}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <button onClick={() => setActiveTab('courses')} className="w-full bg-slate-900 border border-slate-800 py-4 rounded-2xl font-bold flex justify-center items-center gap-2 hover:bg-slate-800 transition">
               <BookOpen size={18} className="text-amber-500" /> Accéder à la formation
            </button>
          </div>
        )}

        {activeTab === 'courses' && !selectedModule && !activeLesson && (
          <div className="animate-in fade-in p-6 space-y-4">
            <div className="mb-6">
              <h1 className="text-3xl font-black text-white mb-1">Le Catalogue</h1>
              <p className="text-slate-400 text-sm">Le savoir-faire de A à Z ({MODULES.length} modules).</p>
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

        {activeTab === 'courses' && selectedModule && !activeLesson && (
          <div className="animate-in slide-in-from-right h-full flex flex-col absolute inset-0 bg-slate-950 z-50">
            <div className={`pt-12 pb-8 px-6 bg-gradient-to-br ${selectedModule.color} rounded-b-[3rem] shadow-2xl shrink-0 relative`}>
              <button onClick={() => setSelectedModule(null)} className="absolute top-6 left-6 w-10 h-10 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-colors"><ArrowLeft size={20} /></button>
              <div className="mt-8">
                <span className="text-white/80 text-[10px] font-black uppercase tracking-widest">{selectedModule.level} • {selectedModule.duration}</span>
                <h1 className="text-3xl font-black text-white mt-2 leading-tight">{selectedModule.title}</h1>
                <p className="text-white mt-4 font-bold bg-black/20 inline-block px-3 py-1 rounded-full text-xs border border-white/20">{getModuleProgress(selectedModule)}% Complété</p>
              </div>
            </div>
            <div className="flex-1 p-6 space-y-4 overflow-y-auto pb-24 custom-scroll">
              <h3 className="font-black text-white text-lg mb-2">Sommaire du module</h3>
              {selectedModule.chapters.map((chap, idx) => {
                const isFinished = userProfile.completedLessons.includes(chap.id);
                return (
                  <div key={idx} onClick={() => setActiveLesson(chap)} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center gap-4 cursor-pointer hover:bg-slate-800 transition group">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 transition-colors duration-300 ${isFinished ? 'bg-emerald-500/10 border-emerald-500 text-emerald-500' : 'bg-slate-950 border-slate-700 text-slate-500 group-hover:border-amber-500 group-hover:text-amber-500'}`}>
                      {isFinished ? <CheckCircle2 size={18} /> : <Play size={14} className="ml-0.5" />}
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-bold text-sm leading-snug transition-colors ${isFinished ? 'text-slate-400 line-through decoration-slate-600' : 'text-white'}`}>{chap.title}</h4>
                      <span className="text-[10px] text-slate-500 flex items-center gap-1 mt-1"><Clock size={10}/> {chap.duration}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {activeLesson && (
          <div className="animate-in slide-in-from-bottom h-full flex flex-col absolute inset-0 bg-slate-900 z-[100]">
            <header className="p-6 flex justify-between items-center border-b border-white/5 bg-slate-950 shrink-0 shadow-sm">
              <div className="flex items-center gap-3 text-amber-500 font-bold"><BookOpen size={20}/> Lecture détaillée</div>
              <button onClick={() => setActiveLesson(null)} className="p-2 bg-slate-800 rounded-full text-white hover:bg-slate-700 transition"><X size={20}/></button>
            </header>
            <div className="flex-1 p-6 overflow-y-auto custom-scroll bg-slate-900">
              <h2 className="text-3xl font-black text-white mb-8 leading-tight">{activeLesson.title}</h2>
              <div className="text-slate-300 text-lg leading-relaxed whitespace-pre-wrap font-medium">
                {activeLesson.content}
              </div>
            </div>
            <div className="p-6 bg-slate-950 border-t border-white/5 shrink-0">
              {!userProfile.completedLessons.includes(activeLesson.id) ? (
                <button onClick={() => finishLesson(activeLesson.id)} className="w-full bg-amber-500 text-slate-950 py-4 rounded-xl font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-amber-400 transition transform active:scale-95 shadow-lg shadow-amber-500/20">
                  <Check size={20}/> J'ai assimilé ce cours
                </button>
              ) : (
                <button onClick={() => setActiveLesson(null)} className="w-full bg-slate-800 text-white py-4 rounded-xl font-black uppercase tracking-widest hover:bg-slate-700 transition">Retour au sommaire</button>
              )}
            </div>
          </div>
        )}

        {activeTab === 'tools' && !selectedModule && !activeLesson && (
          <div className="animate-in fade-in p-6 space-y-6">
            <h1 className="text-3xl font-black text-white mb-1">Boîte à Outils</h1>
            <p className="text-slate-400 text-sm mb-6">Calculatrices de précision professionnelles.</p>

            <div className="flex bg-slate-900 rounded-2xl p-1 border border-slate-800">
              <button onClick={()=>setToolTab('dalle')} className={`flex-1 py-3 rounded-xl text-xs font-bold transition-colors ${toolTab === 'dalle' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}>Béton</button>
              <button onClick={()=>setToolTab('mur')} className={`flex-1 py-3 rounded-xl text-xs font-bold transition-colors ${toolTab === 'mur' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}>Parpaings</button>
              <button onClick={()=>setToolTab('escalier')} className={`flex-1 py-3 rounded-xl text-xs font-bold transition-colors ${toolTab === 'escalier' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}>Escalier</button>
            </div>

            {/* Outil 1 : Dalle Béton */}
            {toolTab === 'dalle' && (
              <div className="bg-slate-900 border border-slate-800 rounded-[2rem] p-6 animate-in zoom-in-95 duration-200">
                <h2 className="text-lg font-black text-white mb-6 flex items-center gap-3"><Truck className="text-amber-500" size={24}/> Dalle (Dosage 350kg/m³)</h2>
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
                    <div className="bg-amber-500 text-slate-950 text-center py-3 font-black text-xl">{calcConcrete.vol} m³ <span className="text-sm">de béton final</span></div>
                    <div className="p-4 grid grid-cols-2 gap-3 text-center">
                      <div className="bg-slate-900 p-3 rounded-xl border border-slate-700/50">
                        <div className="font-black text-2xl text-white">{calcConcrete.ciment}</div>
                        <div className="text-[9px] text-slate-400 font-bold uppercase mt-1">Sacs (35kg)</div>
                      </div>
                      <div className="bg-slate-900 p-3 rounded-xl border border-slate-700/50">
                        <div className="font-black text-2xl text-white">{calcConcrete.sable}</div>
                        <div className="text-[9px] text-slate-400 font-bold uppercase mt-1">Kg de Sable</div>
                      </div>
                      <div className="bg-slate-900 p-3 rounded-xl border border-slate-700/50">
                        <div className="font-black text-2xl text-white">{calcConcrete.gravier}</div>
                        <div className="text-[9px] text-slate-400 font-bold uppercase mt-1">Kg de Gravier</div>
                      </div>
                      <div className="bg-slate-900 p-3 rounded-xl border border-slate-700/50">
                        <div className="font-black text-2xl text-white">{calcConcrete.eau}</div>
                        <div className="text-[9px] text-slate-400 font-bold uppercase mt-1">Litres d'Eau</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Outil 2 : Mur en Parpaings */}
            {toolTab === 'mur' && (
              <div className="bg-slate-900 border border-slate-800 rounded-[2rem] p-6 animate-in zoom-in-95 duration-200">
                <h2 className="text-lg font-black text-white mb-6 flex items-center gap-3"><Box className="text-orange-500" size={24}/> Mur Agglos (20x50cm)</h2>
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
                    <div className="bg-orange-500 text-slate-950 text-center py-3 font-black text-xl">{calcWall.area} m² <span className="text-sm">de surface</span></div>
                    <div className="p-4 grid grid-cols-2 gap-3 text-center">
                      <div className="bg-slate-900 p-4 rounded-xl border border-slate-700/50">
                        <div className="font-black text-3xl text-orange-500 mb-1">{calcWall.blocks}</div>
                        <div className="text-[9px] text-slate-400 font-bold uppercase">Parpaings (+5% marge)</div>
                      </div>
                      <div className="bg-slate-900 p-4 rounded-xl border border-slate-700/50">
                        <div className="font-black text-3xl text-white mb-1">{calcWall.mortar}</div>
                        <div className="text-[9px] text-slate-400 font-bold uppercase">Litres de Mortier</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Outil 3 : Escalier (Loi de Blondel) */}
            {toolTab === 'escalier' && (
              <div className="bg-slate-900 border border-slate-800 rounded-[2rem] p-6 animate-in zoom-in-95 duration-200">
                <h2 className="text-lg font-black text-white mb-6 flex items-center gap-3"><Layers className="text-blue-500" size={24}/> Escalier (Loi de Blondel)</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-500 mb-2 block">Hauteur totale à franchir (m)</label>
                    <input type="number" value={stairHeight} onChange={e=>setStairHeight(e.target.value)} placeholder="Ex: 2.80" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500 transition" />
                    <p className="text-[9px] text-slate-500 mt-2">Mesurez du sol fini (RDC) au sol fini (Étage).</p>
                  </div>
                </div>

                {calcStairs && (
                  <div className="mt-8 bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 shadow-xl">
                    <div className="bg-blue-600 text-white text-center py-3 font-black text-xl">{calcStairs.nb} Marches</div>
                    <div className="p-4 grid grid-cols-2 gap-3 text-center">
                      <div className="bg-slate-900 p-3 rounded-xl border border-slate-700/50">
                        <div className="font-black text-2xl text-blue-400">{calcStairs.hMarche} cm</div>
                        <div className="text-[9px] text-slate-400 font-bold uppercase mt-1">Hauteur de marche</div>
                      </div>
                      <div className="bg-slate-900 p-3 rounded-xl border border-slate-700/50">
                        <div className="font-black text-2xl text-white">{calcStairs.giron} cm</div>
                        <div className="text-[9px] text-slate-400 font-bold uppercase mt-1">Giron (Profondeur)</div>
                      </div>
                      <div className="bg-slate-900 p-3 rounded-xl border border-slate-700/50 col-span-2">
                        <div className="font-black text-2xl text-white">{calcStairs.reculement} m</div>
                        <div className="text-[9px] text-slate-400 font-bold uppercase mt-1">Reculement (Longueur totale au sol)</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === 'glossary' && !selectedModule && !activeLesson && (
          <div className="animate-in fade-in duration-500 p-6 space-y-6 flex flex-col min-h-full">
            <div>
              <h1 className="text-3xl font-black text-white mb-1">Dictionnaire Pro</h1>
              <p className="text-slate-400 text-sm">Le lexique complet du BTP.</p>
            </div>

            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-amber-500 transition-colors" size={20} />
              <input 
                type="text" placeholder="Chercher un terme (ex: Barbotine)..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
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
                <p className="text-center text-slate-500 mt-10 font-bold">Aucun terme technique trouvé.</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'profile' && !selectedModule && !activeLesson && (
          <div className="animate-in fade-in p-6 space-y-8">
            <h1 className="text-3xl font-black text-white">Mon Espace</h1>

            <div className="bg-slate-900 border border-slate-800 rounded-[2rem] p-6 text-center shadow-lg">
              <div className="w-24 h-24 rounded-full border-4 border-slate-800 bg-slate-950 overflow-hidden mx-auto mb-4 relative group">
                <img src={userProfile.avatar} alt="Avatar" className="w-full h-full object-cover"/>
              </div>
              <h2 className="text-2xl font-black text-white mb-1">{userProfile.name}</h2>
              <span className="bg-amber-500/20 text-amber-500 px-4 py-1.5 rounded-full text-xs font-bold border border-amber-500/30 inline-block">{userProfile.level}</span>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-[2rem] p-6">
              <h3 className="text-[10px] font-black uppercase text-slate-500 mb-4 flex items-center gap-2"><Trophy size={14}/> Avancement Global ({unlockedBadgesCount}/{BADGES.length})</h3>
              <div className="grid grid-cols-2 gap-3">
                {badgesWithStatus.map((b) => (
                  <div key={b.id} className={`p-4 rounded-2xl border flex flex-col items-center text-center transition-all ${b.unlocked ? 'bg-amber-500/10 border-amber-500/30 text-amber-500 shadow-md' : 'bg-slate-950 border-slate-800 opacity-50 text-slate-600'}`}>
                      <div className="mb-2">{b.icon}</div>
                      <div className={`text-xs font-black mb-1 ${b.unlocked ? 'text-white' : 'text-slate-500'}`}>{b.name}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <button onClick={() => {
                if(window.confirm("Action irréversible : Êtes-vous sûr de vouloir effacer tout votre avancement ?")) {
                  localStorage.removeItem('batipro_encyclopedia_profile');
                  window.location.reload();
                }
              }} 
              className="w-full bg-rose-500/10 border border-rose-500/20 text-rose-500 py-4 rounded-xl font-bold hover:bg-rose-500/20 transition flex justify-center items-center gap-2"
            >
              <AlertTriangle size={18}/> Réinitialiser ma progression
            </button>
          </div>
        )}

      </main>

      <nav className="absolute bottom-0 w-full bg-slate-950/95 backdrop-blur-2xl border-t border-slate-800/50 flex justify-around items-center pt-3 pb-6 px-1 z-40">
        {[
          { id: 'home', icon: <HardHat size={22} strokeWidth={activeTab === 'home' ? 2.5 : 2} />, label: 'Tableau' },
          { id: 'courses', icon: <BookOpen size={22} strokeWidth={activeTab === 'courses' ? 2.5 : 2} />, label: 'Savoir' },
          { id: 'tools', icon: <Calculator size={22} strokeWidth={activeTab === 'tools' ? 2.5 : 2} />, label: 'Outils' },
          { id: 'glossary', icon: <Search size={22} strokeWidth={activeTab === 'glossary' ? 2.5 : 2} />, label: 'Dico' },
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
