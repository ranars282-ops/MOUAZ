import { 
  CameraPreset, 
  SceneCondition, 
  CinematicShotItem, 
  LightingSetup, 
  PhotoshootConcept, 
  LessonItem, 
  GearItem 
} from '../types';

export const CAMERA_PRESETS: CameraPreset[] = [
  { id: 'sony-a7iv', name: 'Sony Alpha 7 IV', category: 'dslr', brand: 'Sony', sensor: 'Full Frame (33MP)', nativeIso: 'ISO 100 / 3200' },
  { id: 'canon-r6ii', name: 'Canon EOS R6 Mark II', category: 'dslr', brand: 'Canon', sensor: 'Full Frame (24.2MP)', nativeIso: 'ISO 100 / 800' },
  { id: 'nikon-z8', name: 'Nikon Z8', category: 'dslr', brand: 'Nikon', sensor: 'Stacked Full Frame (45.7MP)', nativeIso: 'ISO 64 / 500' },
  { id: 'sony-fx3', name: 'Sony FX3 Cinema Line', category: 'cinema', brand: 'Sony Cinema', sensor: 'Full Frame BSI (Dual Base ISO 800/12800)', nativeIso: 'ISO 800 / 12800 (S-Log3)' },
  { id: 'bmpcc-6k', name: 'Blackmagic Pocket Cinema 6K Pro', category: 'cinema', brand: 'Blackmagic Design', sensor: 'Super 35 (Built-in ND)', nativeIso: 'ISO 400 / 3200' },
  { id: 'iphone-16pro', name: 'Apple iPhone 16 Pro Max', category: 'phone', brand: 'Apple', sensor: '48MP ProRAW (f/1.78)', nativeIso: 'ISO 50 - 6400 (Smart HDR)' },
  { id: 'samsung-s24u', name: 'Samsung Galaxy S24 Ultra', category: 'phone', brand: 'Samsung', sensor: '200MP Expert RAW', nativeIso: 'ISO 50 - 3200 (Pro Mode)' },
  { id: 'dji-mavic3', name: 'DJI Mavic 3 Pro Cine', category: 'drone', brand: 'DJI', sensor: '4/3 Hasselblad + Dual Tele', nativeIso: 'ISO 100 - 6400 (D-Log)' }
];

export const SCENE_CONDITIONS: SceneCondition[] = [
  {
    id: 'daylight',
    name: 'ضوء النهار الطبيعي (Bright Daylight)',
    iconName: 'Sun',
    description: 'شمس ساطعة ومباشرة تتطلب ضبط سرعة غالق عالية لمنع احتراق بياض السماء (Overexposure).',
    defaultIso: '100',
    defaultAperture: 'f/4.0 - f/8.0',
    defaultShutter: '1/1000s - 1/2000s',
    defaultWb: '5500K (Daylight)',
    defaultFps: '24 FPS',
    ndFilter: 'ND8 أو ND16 (مهم جداً للفيديو للحفاظ على 1/50s)',
    explanation: 'نستخدم أقل حساسية ISO (100) لضمان أقصى نطاق ديناميكي (Dynamic Range) وتفادي الضجيج الرقمي، مع سرعة غالق سريعة جداً لمعادلة كمية الضوء الهائلة.'
  },
  {
    id: 'night',
    name: 'تصوير ليلي ومنخفض الإضاءة (Night & Low Light)',
    iconName: 'Moon',
    description: 'شوارع مضاءة بإضاءات نيون خافتة، فعاليات ليلية أو أفق المدينة.',
    defaultIso: '1600 - 3200',
    defaultAperture: 'f/1.4 - f/2.0 (أوسع فتحة ممكنة)',
    defaultShutter: '1/125s (أو حامل ثلاثي 1s - 5s)',
    defaultWb: '3800K - 4500K (Fluorescent/Tungsten mix)',
    defaultFps: '24 FPS',
    explanation: 'توسيع فتحة العدسة لأقصى حد (f/1.8 أو أوسع) يتيح دخول أكبر قدر من الفوتونات للمستشعر، مع رفع ISO بحذر لتجنب فقدان التفاصيل في الظلال.'
  },
  {
    id: 'golden-hour',
    name: 'الساعة الذهبية (Golden Hour)',
    iconName: 'Sunset',
    description: 'الساعة التي تسبق الغروب أو تلي الشروق، حيث تسود ألوان عنبرية ودافئة وظلال ناعمة طويلة.',
    defaultIso: '100 - 200',
    defaultAperture: 'f/2.2 - f/2.8',
    defaultShutter: '1/320s - 1/500s',
    defaultWb: '6500K - 7000K (Shade/Warm)',
    defaultFps: '24 / 60 FPS',
    ndFilter: 'ND4 اختياري',
    explanation: 'الضوء الناعم ذو الزاوية المنخفضة مثالي للبورتريه مع تأثير Rim Light طبيعي يضيء أطراف الشعر. الـ White Balance الدافئ يعزز نغمات الذهب.'
  },
  {
    id: 'indoor-studio',
    name: 'استوديو داخلي مع فلاشات (Indoor Studio)',
    iconName: 'Layers',
    description: 'بيئة إضاءة خاضعة لتحكم كامل باستخدام فلاشات Strobe أو إضاءات LED ناعمة.',
    defaultIso: '100',
    defaultAperture: 'f/8.0 (Sweet Spot للحدة)',
    defaultShutter: '1/160s - 1/200s (Sync Speed)',
    defaultWb: '5600K (Flash Preset)',
    defaultFps: '24 FPS',
    explanation: 'سرعة الغالق 1/160s هي سرعة التزامن المعيارية لعزل أي إضاءة محيطة بالغرفة بالكامل، بينما فتحة f/8 تمنح حدة بصرية استثنائية من المركز للأطراف.'
  },
  {
    id: 'portrait-bokeh',
    name: 'بورتريه سينمائي وعزل خلفية (Portrait Bokeh)',
    iconName: 'User',
    description: 'التركيز على ملامح الشخص وعزل الخلفية المشتتة بتأثير بوكيه ناعم ضبابي.',
    defaultIso: '100 - 200',
    defaultAperture: 'f/1.4 - f/1.8',
    defaultShutter: '1/400s',
    defaultWb: '5500K أو Custom Grey Card',
    defaultFps: '24 FPS',
    explanation: 'فتحة العدسة الواسعة تخلق عمق ميدان ضحل (Shallow Depth of Field) يُبرز عيون المودل بشكل ثلاثي الأبعاد ساحر.'
  },
  {
    id: 'landscape',
    name: 'مناظر طبيعية وتعريض طويل (Landscape & Water)',
    iconName: 'Mountain',
    description: 'جبال، شلالات، بحار، ومبانٍ معمارية تتطلب أقصى حدة في كامل الإطار.',
    defaultIso: '64 - 100',
    defaultAperture: 'f/11 (تجنب الحيود بعد f/16)',
    defaultShutter: '1/60s (أو 2s - 10s مع حامل وفلتر ND للشلالات)',
    defaultWb: 'Daylight 5500K',
    ndFilter: 'ND64 أو ND1000 للشلالات ومسارات الغيوم',
    explanation: 'فتحة f/11 تضمن عمق ميدان كبير جداً (Deep DoF) مع بقاء كل العناصر من الصخور الأمامية حتى قمم الجبال الخلفية بحدة فائقة.'
  },
  {
    id: 'sports-action',
    name: 'رياضة وحركة سريعة (Sports & Action)',
    iconName: 'Zap',
    description: 'مباريات كرة قدم، سباق سيارات، طيور محلقة، أو أطفال يركضون.',
    defaultIso: '400 - 1600 (Auto ISO مع Min Shutter)',
    defaultAperture: 'f/2.8 - f/4.0',
    defaultShutter: '1/1000s - 1/4000s',
    defaultWb: 'Auto White Balance (AWB)',
    defaultFps: '120 FPS / Continuous High (Burst)',
    explanation: 'تجميد الحركة السريعة جداً ومنع أي ضبابية حركية (Motion Blur) يتطلب سرعة غالق لا تقل عن 1/1000s، مع ضبط تركيز الفوكس على تتبع الأجسام (AF-C Tracking).'
  },
  {
    id: 'cinematic-video',
    name: 'فيديو سينمائي قاعدة 180 درجة (180° Rule Cinema)',
    iconName: 'Film',
    description: 'تصوير فيديو سينمائي بمظهر هوليوودي انسيابي بالحركة الطبيعية للعين البشرية.',
    defaultIso: 'Native Base ISO (800 في S-Log3)',
    defaultAperture: 'f/2.0 - f/2.8',
    defaultShutter: '1/50s (ضعف الـ FPS تماماً)',
    defaultWb: '5600K أو 3200K (ثابت غير تلقائي)',
    defaultFps: '24 FPS (Cinematic Standard)',
    ndFilter: 'Variable ND ضروري جداً للحفاظ على سرعة 1/50s نهاراً',
    explanation: 'قاعدة 180-Degree Shutter Rule تفرض أن تكون سرعة الغالق ضعف معدل الإطارات (24fps x 2 = 1/48s أو 1/50s). هذا ينتج ضبابية حركة Motion Blur تحاكي تماماً إدراك العين السينمائي.'
  }
];

export const CINEMATIC_SHOTS: CinematicShotItem[] = [
  {
    id: 'extreme-close-up',
    nameAr: 'لقطة مقربة جداً',
    nameEn: 'Extreme Close-Up (ECU)',
    abbreviation: 'ECU',
    type: 'framing',
    description: 'كادر ضيق يملأ الشاشة بتفصيل دقيق للغاية: عينا الشخصية، دمعة تنحدر، حركة مفتاح في قفل، أو اهتزاز ساعة يد فاخرة.',
    focalLength: '85mm - 100mm Macro',
    fps: '24 FPS أو 60 FPS للتركيز المجهري',
    lensType: 'Macro Prime Lens',
    emotion: 'توتر درامي فائق، حميمية عاطفية، واكتشاف سر خطير.',
    famousUsage: 'المشاهد الشهيرة للمخرج سيرجيو ليوني في أفلام الغرب الأمريكي (Sergio Leone Westerns) في مبارزات النظرات الحاسمة.',
    proTip: 'احرص على الإضاءة الموجهة ذات الفلتر المنعم حتى لا تظهر العيوب المجهرية بشكل قاسي.',
    diagramType: 'ecu'
  },
  {
    id: 'close-up',
    nameAr: 'لقطة مقربة للوجه',
    nameEn: 'Close-Up (CU)',
    abbreviation: 'CU',
    type: 'framing',
    description: 'تُظهر رأس الشخصية وأعلى الكتفين. تلغي كل مشتتات المحيط لتجعل المشاهد يقرأ أدق انفعالات الوجه وحركات العيون.',
    focalLength: '50mm - 85mm',
    fps: '24 FPS',
    lensType: 'Fast Prime (f/1.4 - f/1.8)',
    emotion: 'التعاطف، الصدمة، الاعتراف، أو لحظات الحوار الفاصلة.',
    famousUsage: 'حوارات أفلام كريستوفر نولان ومارتن سكورسيزي عند بلوغ ذروة الصراع النفسي.',
    proTip: 'وجّه دائماً الفوكس بدقة متناهية على بؤبؤ العين الأقرب للكاميرا (Eye AF)، وتأكد من وجود Catchlight في العين.',
    diagramType: 'cu'
  },
  {
    id: 'medium-shot',
    nameAr: 'لقطة متوسطة',
    nameEn: 'Medium Shot (MS)',
    abbreviation: 'MS',
    type: 'framing',
    description: 'تُظهر الشخصية من الخصر إلى أعلى الرأس. تمثل التوازن المثالي بين إبراز تعابير الوجه ولغة الجسد وتفاعل الشخصية مع المكان.',
    focalLength: '35mm - 50mm',
    fps: '24 FPS',
    lensType: 'Standard Prime / 24-70mm Zoom',
    emotion: 'حيادية، حوار طبيعي، وقائع واقعية.',
    famousUsage: 'لقطات الأخبار، البرامج الحوارية، والمشاهد اليومية الكلاسيكية في معظم أفلام هوليوود.',
    proTip: 'حافظ على مسافة رأس مريحة (Headroom) ومساحة أمام وجه الشخصية في اتجاه نظرتها (Looking Room).',
    diagramType: 'ms'
  },
  {
    id: 'cowboy-shot',
    nameAr: 'لقطة الكاوبوي / الأمريكية',
    nameEn: 'Cowboy Shot (American Shot)',
    abbreviation: 'CS',
    type: 'framing',
    description: 'تُقتص من منتصف الفخذين إلى الرأس. نشأت تاريخياً لإظهار مسدس الكاوبوي في حزامه ولغة يديه أثناء الاستعداد لإطلاق النار.',
    focalLength: '35mm - 50mm',
    fps: '24 FPS',
    lensType: 'Standard Prime',
    emotion: 'الثقة، الاستعداد للمواجهة، القوة، وإظهار تفاصيل الزي والأسلحة.',
    famousUsage: 'أفلام الأكشن والأبطال الخارقين وسلسلة أفلام Marvel و Star Wars.',
    proTip: 'لا تقطع الكادر أبداً عند مفصل الركبة مباشرة بل فوقه ببضعة سنتيمترات لتجنب الإحساس البصري ببتر الأطراف.',
    diagramType: 'cowboy'
  },
  {
    id: 'wide-shot',
    nameAr: 'لقطة واسعة',
    nameEn: 'Wide Shot (WS) / Master',
    abbreviation: 'WS',
    type: 'framing',
    description: 'تُظهر الجسم بالكامل من الرأس حتى أخمص القدمين مع مساحة كافية من البيئة المحيطة لتحديد الموقع والمسافات.',
    focalLength: '24mm - 35mm',
    fps: '24 FPS',
    lensType: 'Wide Prime Lens',
    emotion: 'تأسيس للمكان، عزلة الشخصية في فضاء واسع، أو ديناميكية المجموعات.',
    famousUsage: 'المشاهد التأسيسية (Establishing Shots) في بداية كل مشهد درامي لتوجيه المشاهد جغرافياً.',
    proTip: 'استخدم خطوط القيادة المعمارية (Leading Lines) على الأرض أو الجدران لجذب عين المشاهد إلى الشخصية داخل الكادر الواسع.',
    diagramType: 'ws'
  },
  {
    id: 'low-angle',
    nameAr: 'لقطة من زاوية منخفضة',
    nameEn: 'Low-Angle Shot',
    abbreviation: 'LAS',
    type: 'angle',
    description: 'توضع الكاميرا أسفل مستوى عين الشخصية وتُوجّه للأعلى، مما يجعل الموضوع يبدو ضخماً، مهيباً، أو مسيطراً على المشهد.',
    focalLength: '24mm - 28mm',
    fps: '24 FPS أو 60 FPS',
    lensType: 'Ultra-Wide / Standard',
    emotion: 'السلطة، الفخامة، العظمة، الخوف والترهيب في أفلام الأشرار.',
    famousUsage: 'مشاهد تصوير سيارات الدفع الرباعي الرياضية، والزعماء في الأفلام الملحمية مثل The Godfather.',
    proTip: 'كلما زاد اتساع العدسة واقتربت من الأرض، تعزز الإحساس بالارتفاع الشاهق والسيادة.',
    diagramType: 'low-angle'
  },
  {
    id: 'dutch-angle',
    nameAr: 'الزاوية المائلة / الزاوية الهولندية',
    nameEn: 'Dutch Angle / Canted Angle',
    abbreviation: 'DA',
    type: 'angle',
    description: 'إمالة الكاميرا على محورها الأفقي عمداً بدرجة 15 إلى 30 درجة، لكسر استواء الأفق وخلق شعور بعدم الاستقرار والتخبط.',
    focalLength: '28mm - 35mm',
    fps: '24 FPS',
    lensType: 'Wide Lens',
    emotion: 'الهلع، الجنون النفسي، الارتباك، والخطر الداهم الوشيك.',
    famousUsage: 'أفلام المخرج ألفريد هيتشكوك، فيلم Inception، ومطاردات Mission Impossible.',
    proTip: 'استخدمها باعتدال شديد في اللحظة النفسية المناسبة؛ الإفراط فيها يجعل المشاهد يشعر بدوار بصري.',
    diagramType: 'dutch'
  },
  {
    id: 'tracking-shot',
    nameAr: 'لقطة التتبع الحركي',
    nameEn: 'Tracking / Truck Shot',
    abbreviation: 'TRK',
    type: 'movement',
    description: 'تتحرك الكاميرا جانبياً بالتوازي مع حركة الشخصية (يساراً أو يميناً) عبر Gimbal أو Dolly أو Steadicam.',
    focalLength: '35mm - 50mm',
    fps: '24 FPS أو 48 FPS',
    lensType: 'Gimbal / Steadicam Rig',
    emotion: 'الإيقاع السريع، الطاقة، الاستمرار، والمرافقة اللصيقة للرحلة.',
    famousUsage: 'المشاهد الممتدة الشهيرة في أفلام ويس أندرسون (Wes Anderson) ولقطات المشي والحوار الطويلة في Succession.',
    proTip: 'اجعل سرعة حركة الكاميرا متطابقة تماماً مع سرعة خطوات الشخصية للحفاظ على ثبات المسافة النسبية.',
    diagramType: 'tracking'
  },
  {
    id: 'dolly-zoom',
    nameAr: 'تأثير فيرتيجو / زووم الزحف',
    nameEn: 'Dolly Zoom (Vertigo Effect)',
    abbreviation: 'DZ',
    type: 'movement',
    description: 'سحب الكاميرا للخلف فعلياً مع عمل تقريب للعدسة للأمام (Zoom In) في نفس اللحظة والسرعة، فيبقى الموضوع ثابتاً بينما تتشوه الخلفية خلفه.',
    focalLength: 'Zoom Lens (24-70mm أو 70-200mm)',
    fps: '24 FPS',
    lensType: 'Parfocal Cinema Zoom',
    emotion: 'الصدمة المباغتة، الإدراك المروع، والدوار الشديد.',
    famousUsage: 'فيلم Vertigo للمخرج هيتشكوك، ومشهد الشاطئ الشهير في فيلم Jaws لستيفن سبيلبرغ.',
    proTip: 'تتطلب تدريباً وتنسيقاً عاليين بين مصور الكاميرا (Cam Op) ومساعد الفوكس (Focus Puller).',
    diagramType: 'dolly-zoom'
  }
];

export const LIGHTING_SETUPS: LightingSetup[] = [
  {
    id: 'rembrandt',
    nameAr: 'إضاءة رامبرانت السينمائية',
    nameEn: 'Rembrandt Lighting',
    category: 'portrait',
    description: 'سُميت تيمناً بالرسام الهولندي رامبرانت. تتميز بمثلث ضوء مضيء بارز على خد الشخصية المظلل تحت العين مباشرة.',
    shadowPattern: 'مثلث ضوئي صغير ومحدد على جانب الوجه المظلل مع ظل أنف ناعم يتصل بظل الشفاه.',
    lightRatio: '4:1 إلى 3:1 (طابع درامي مميز)',
    lights: {
      key: { active: true, angle: 45, distance: 1.5, modifier: 'Softbox 90cm مع Grid', power: 85 },
      fill: { active: true, angle: -45, distance: 2.2, modifier: 'Silver Reflector عاكس فضي', power: 25 },
      rim: { active: true, angle: 135, distance: 2.0, modifier: 'Stripbox مع Grid', power: 40 },
      background: { active: false, angle: 180, distance: 3.0, modifier: 'Spot Snoot', power: 0 }
    },
    idealFor: 'البورتريه الرجالي الدرامي، الممثلين، مقابلات الأفلام الوثائقية، وصور الغلاف الفخمة.',
    stepByStep: [
      'ضع الضوء الرئيسي (Key Light) بزاوية 45 درجة جانبياً وبزاوية 45 درجة للأعلى بالنسبة لوجه الشخص.',
      'وجّه الضوء حتى ترى مثلثاً ضوئياً واضحاً يتشكل على خد الشخصية البعيد عن الضوء.',
      'تأكد أن المثلث الضوئي لا يتجاوز عرض العين ولا يمتد إلى ما دون مستوى فتحة الأنف.',
      'أضف عاكساً فضياً أو ضوء خافت (Fill Light) على الجانب الآخر لتخفيف حدة سواد الظل دون إزالة المثلث.'
    ]
  },
  {
    id: 'butterfly',
    nameAr: 'إضاءة الفراشة / باراماونت التجميلية',
    nameEn: 'Butterfly / Paramount Lighting',
    category: 'portrait',
    description: 'الإضاءة الأيقونية لعصر هوليوود الذهبي (Paramount Studios). تُبرز عظام الوجنتين وتمنح بشرة متوهجة ناعمة ونحت ثلاثي الأبعاد جذاب.',
    shadowPattern: 'ظل صغير متناظر يشبه أجنحة الفراشة تحت الأنف مباشرة وفي منحنى الشفة العليا.',
    lightRatio: '2:1 أو 1:1 (إضاءة ناعمة عالية التجميل)',
    lights: {
      key: { active: true, angle: 0, distance: 1.2, modifier: 'Beauty Dish مع Diffuser Sock', power: 90 },
      fill: { active: true, angle: 0, distance: 0.8, modifier: 'Curved Reflector عاكس مقوس أسفل الصدر', power: 50 },
      rim: { active: true, angle: 160, distance: 2.0, modifier: 'Kicker Light للشعر', power: 35 },
      background: { active: true, angle: 180, distance: 2.5, modifier: 'Background Light ناعم', power: 30 }
    },
    idealFor: 'تصوير الأزياء والميك آب ومستحضرات التجميل وجلسات صور البورتريه النسائية وغلاف المجلات.',
    stepByStep: [
      'ضع الـ Beauty Dish أو السوفت بوكس الدائري أمام وجه الشخصية تماماً، بارتفاع أعلى من الرأس وبزاوية 45 درجة للأسفل.',
      'اضبط الارتفاع حتى يظهر ظل أنيق يشبه الفراشة تحت الأنف ولا يلامس الشفة العليا.',
      'ضع عاكساً فضياً مقعراً (Clamshell Setup) في حضن المودل ليعكس الضوء الساقط إلى عينيها ويخلق بريق Catchlight ساحر.',
      'أضف إضاءة شعر (Hair Light) خفيفة من الخلف للفصل عن الخلفية السوداء.'
    ]
  },
  {
    id: 'split-lighting',
    nameAr: 'الإضاءة المنقسمة الدرامية (Split Lighting)',
    nameEn: 'Split Lighting',
    category: 'cinematic',
    description: 'تقسيم الوجه تماماً إلى نصفين: نصف مضاء ونصف غارق بالظلام الحالك. تُعطي إحساساً بالغموض وازدواجية الشخصية.',
    shadowPattern: 'خط مستقيم من الظل يمر بطول منتصف الجبين والأنف والذقن، عازلاً الجانب الآخر تماماً.',
    lightRatio: '8:1 أو لا يوجد ضوء ملء على الإطلاق (Pure Low-Key)',
    lights: {
      key: { active: true, angle: 90, distance: 1.2, modifier: 'Stripbox مع Grid حاد', power: 95 },
      fill: { active: false, angle: -90, distance: 0, modifier: 'None', power: 0 },
      rim: { active: true, angle: 135, distance: 1.8, modifier: 'Rim Light دقيق', power: 50 },
      background: { active: false, angle: 180, distance: 3.0, modifier: 'None', power: 0 }
    },
    idealFor: 'ملصقات أفلام الجريمة، الأبطال ذوي الشخصيات الغامضة أو الشريرة، الموسيقيين ومصممي ألعاب الفيديو.',
    stepByStep: [
      'ضع الضوء الرئيسي بزاوية 90 درجة تماماً على أحد جانبي الشخصية (موازياً للكتف).',
      'حرك الضوء ببطء للأمام أو للخلف حتى ترى الضوء يسقط فقط على جانب واحد من الأنف دون أن يلمس الجانب المعاكس.',
      'استخدم لوحاً أسود ماصاً للضوء (Negative Fill) في الجهة المعاكسة لمنع أي انعكاسات ضوئية من جدران الغرفة.'
    ]
  },
  {
    id: 'three-point',
    nameAr: 'توزيع الإضاءة الثلاثية الكلاسيكي (3-Point Lighting)',
    nameEn: 'Classic 3-Point Lighting',
    category: 'cinematic',
    description: 'المعيار الذهبي في إنتاج المقابلات السينمائية والإعلانات. يشمل Key Light و Fill Light و Back/Hair Light.',
    shadowPattern: 'تدرج طبيعي متوازن ناعم يمنح عمقاً ثلاثي الأبعاد تاماً دون ظلال قاسية أو تشويه ملامح.',
    lightRatio: '2:1 أو 3:1',
    lights: {
      key: { active: true, angle: 45, distance: 1.8, modifier: 'Dome Softbox 120cm', power: 80 },
      fill: { active: true, angle: -45, distance: 2.2, modifier: 'White Diffusion Panel', power: 40 },
      rim: { active: true, angle: 135, distance: 1.9, modifier: 'Rim Spotlight موجه للأكتاف', power: 60 },
      background: { active: true, angle: 180, distance: 3.0, modifier: 'RGB Tube Gel خلفي', power: 45 }
    },
    idealFor: 'المقابلات المتلفزة، البودكاست المرئي عالي الجودة، فيديوهات يوتيوب الاحترافية، والإعلانات المؤسسية.',
    stepByStep: [
      '1. Key Light: الضوء الأقوى بزاوية 45 درجة لتحديد وجه الشخص وبنيته.',
      '2. Fill Light: ضوء ناعم نصف قوة الكي لايت لفتح الظلال على الجانب الآخر دون خلق ظلال مزدوجة.',
      '3. Back/Rim Light: موضوع خلف الشخصية وموجه لأعلى الكتف والشعر لإنشاء خط فصل فاخر يعزل الشخصية عن الخلفية.',
      '4. Background Light: لون تكميلي خافت على الجدار الخلفي لإضافة عمق فني للكادر.'
    ]
  }
];

export const PHOTOSHOOT_CONCEPTS: PhotoshootConcept[] = [
  {
    id: 'concept-cyber-portrait',
    conceptTitle: 'أطياف النيون والسايبر بانك (Cyberpunk Neo-Noir)',
    category: 'portraits',
    categoryAr: 'بورتريه إبداعي',
    logline: 'جلسة بورتريه مستقبلية تمزج بين الظلال العميقة واللمسات الضوئية المشعة بالأزرق الكهربائي والوردي الماجنتا.',
    moodAndAesthetics: 'طابع مستقبلي مقتبس من Blade Runner، حواف حادة، بخار متصاعد وأسطح معدنية عاكسة.',
    colorPalette: ['#0A0A0C', '#00F0FF', '#FF0055', '#3B82F6', '#E2E8F0'],
    colorNames: ['أسود فحمي عميق', 'أزرق كهربائي Electric Cyan', 'وردي نيون حاد', 'أزرق كوبالت', 'فضي معدني'],
    lightingRecipe: {
      keyLight: 'ضوء نيون سيان (Cyan LED Tube) بزاوية 45 درجة قريباً جداً من الوجه لإعطاء حواف حادة.',
      fillLight: 'عاكس فضي خافت لملء الظلال تحت الذقن.',
      rimLight: 'إضاءة خلفية بلون ماجنتا (Magenta) على الشعر والأكتاف للتباين اللوني المكمل (Teal & Orange / Cyber).',
      ambientOrGels: 'جهاز بخار Haze لتجسيد حزم الضوء الملونة في الهواء.'
    },
    recommendedPoses: [
      'التفاتة جانبية حادة 3/4 مع توجيه النظر مباشرة للعدسة وانعكاس النيون في العينين.',
      'يد ترفع نظارة شمسية عاكسة مع تسليط الضوء على تفاصيل الأصابع والمجوهرات.',
      'ميلان طفيف للرأس نحو مصدر الضوء الأزرق لإبراز خط الفك السفلي.'
    ],
    propsAndStyling: [
      'سترة جلدية سوداء أو قماش تقني عاكس للضوء (Techwear)',
      'نظارات شمسية مستقبلية بإطار معدني نحيف',
      'بلورات كريستال أو موشور زجاجي (Prism) يوضع أمام العدسة لخلق انعكاسات ضوئية طيفية'
    ],
    cameraAndLens: 'عدسة 85mm f/1.4 بفتحة f/1.8، ISO 200، سرعة غالق 1/160s.',
    proTips: 'ضع قطعة زجاج مبللة بقطرات ماء أمام الكاميرا جزئياً لمحاكاة كادر مأخوذ من خلف نافذة سيارة تحت المطر في مدينة مستقبلية.'
  },
  {
    id: 'concept-luxury-watch',
    conceptTitle: 'زمن الفخامة: تصوير منتجات وإكسسوارات راقية',
    category: 'products',
    categoryAr: 'تصوير المنتجات والإعلانات',
    logline: 'لقطات ماكرو فائقة الدقة لساعة يد ميكانيكية أو عطر فاخر تبرز ملمس المعادن وانعكاسات الكريستال المصقول.',
    moodAndAesthetics: 'فخامة مطلقة، ألوان أرضية داكنة، ظلال مخملية، وبريق معدني مدروس بدقة المليمتر.',
    colorPalette: ['#0B0C10', '#1F2833', '#C5A059', '#E5E7EB', '#00F0FF'],
    colorNames: ['أسود بركاني', 'رمادي جرافيت داكن', 'ذهب كلاسيكي Champagne Gold', 'ستانلس ستيل فضي', 'أزرق بارد'],
    lightingRecipe: {
      keyLight: 'Stripbox طويل مع ديفيوزر مزدوج (Diffuser) بزاوية 60 درجة من الأعلى لرسم خط انعكاس أبيض مستقيم على حافة الساعة.',
      fillLight: 'ألواح فوم كرتون بيضاء صغيرة توضع حول المنتج لعكس الضوء على ميناء الساعة وأرقامها.',
      rimLight: 'إضاءة Snoot دقيقة تسلط حزمة مركزة على عقارب الساعة أو حجر الزفير.',
      ambientOrGels: 'خلفية خشبية معتمة أو حجر بازلت أسود غير عاكس.'
    },
    recommendedPoses: [
      'الساعة موضوعة بزاوية 45 درجة مستندة إلى حجر بركاني خشن لتناقض الملمس بين الخشن والناعم المصقول.',
      'لقطة ماكرو مقربة جداً لعقارب الساعة وهي تشير إلى الوقت الإعلاني المعياري (10:10).',
      'لقطة رأسية Flat Lay مع قلم حبر فاخر ومحفظة جلدية طبيعية متناسقة الألوان.'
    ],
    propsAndStyling: [
      'قفازات بيضاء قطنية عند لمس الساعة لتجنب أي بصمات أصابع نهائياً',
      'منفاخ هواء يدوي لإزالة أي ذرة غبار قبل التقاط الكادر',
      'حجر جرانيت أو بازلت أو كتلة رخام أسود'
    ],
    cameraAndLens: 'عدسة 90mm Macro أو 100mm f/2.8 Macro، فتحة f/11 إلى f/14 لعمق ميدان شامل، ISO 100، حامل ثلاثي متين.',
    proTips: 'استخدم تقنية تجميع التركيز (Focus Stacking) بالتقاط 10-15 صورة بنقاط فوكس متتالية ودمجها ببرنامج المعالجة لضمان حدة مجهرية لكل برغي وحافة.'
  },
  {
    id: 'concept-supercar-action',
    conceptTitle: 'هدير السرعة: جلسة تصوير سيارات ديناميكية',
    category: 'cars',
    categoryAr: 'تصوير السيارات والسرعة',
    logline: 'إبراز خطوط التصميم الانسيابية للسيارة وانحناءاتها الهندسية مع مسارات ضوئية ليلية أو عند الغروب.',
    moodAndAesthetics: 'قوة، طاقة حركية، لمعان الطلاء، وأفق حضري مفتوح.',
    colorPalette: ['#090A0F', '#EF4444', '#00F0FF', '#475569', '#F1F5F9'],
    colorNames: ['أسود إسفلتي', 'أحمر رياضي مشتعل', 'سيان هايلايت', 'رمادي كربوني', 'أبيض ساطع'],
    lightingRecipe: {
      keyLight: 'Light Painting بـ LED Wand طويل يتم المشي به على طول السيارة لإنشاء خط انعكاس متواصل على هيكل السيارة.',
      fillLight: 'ضوء الغروب الطبيعي للسماء كعاكس عملاق.',
      rimLight: 'إضاءة الشوارع والمباني في الأفق كـ Bokeh خلفي.',
      ambientOrGels: 'تشغيل مصابيح السيارة الأمامية والخلفية LED مع تعريض متوازن.'
    },
    recommendedPoses: [
      'لقطة أمامية 3/4 من زاوية منخفضة جداً (Low Angle) مع لف العجلات قليلاً نحو الكاميرا لإبراز الجنوط الرياضية.',
      'لقطة تتبع حركي متوازي (Rolling Shot) من سيارة أخرى بسرعة 40-50 كم/س مع سرعة غالق 1/30s لخلق Motion Blur في الشارع والعجلات.',
      'لقطة تفاصيل مقربة لشعار السيارة والمكابح الرياضية من خلال الجنط.'
    ],
    propsAndStyling: [
      'رش رذاذ ماء خفيف على مقدمة السيارة لمحاكاة ندى الفجر الساحر',
      'موقع تصوير نظيف مثل مهبط طائرات، نفق حديث، أو طريق جبلي متعرج',
      'فلتر استقطاب دائري (CPL Filter) لإزالة الانعكاسات المشتتة عن زجاج السيارة'
    ],
    cameraAndLens: 'عدسة 24-70mm f/2.8، فلتر CPL ضروري، فتحة f/4.0، ISO 100.',
    proTips: 'أدر فلتر الاستقطاب CPL حتى ترى لمعة السماء تنعزل عن الزجاج وتظهر المقصورة الداخلية بوضوح تام.'
  },
  {
    id: 'concept-artisan-coffee',
    conceptTitle: 'طقوس القهوة المختصة: فوتوغرافيا الأطعمة والمشروبات',
    category: 'food',
    categoryAr: 'تصوير الأطعمة والمشروبات',
    logline: 'لقطة حسية تجمد قطرات صب القهوة الساخنة وتصاعد البخار مع درجات ألوان خشبية دافئة تبعث على الراحة.',
    moodAndAesthetics: 'دفء، حميمية، تدرجات بنية وعسلية، حركة مجمدة للقطرات وبخار ناعم.',
    colorPalette: ['#1C130D', '#633B1E', '#C68B59', '#FDF6E2', '#38BDF8'],
    colorNames: ['إسبريسو غامق', 'بني قرفة', 'كراميل دافئ', 'كريمة الحليب', 'أزرق باهت'],
    lightingRecipe: {
      keyLight: 'إضاءة خلفية جانبية (Back-Side Light) من خلال نافذة كبيرة أو سوفت بوكس مع ديفيوزر، لإبراز شفافية السائل والبخار.',
      fillLight: 'لوح عاكس أبيض في المقدمة لإضاءة الكوب والشعار.',
      rimLight: 'ضوء دقيق من الخلف لتحديد حواف فنجان السيراميك.',
      ambientOrGels: 'إضاءة دافئة 4500K تعزز الإحساس بالراحة والشهية.'
    },
    recommendedPoses: [
      'لحظة صب الحليب المبخر داخل الإسبريسو وتكوين رسمة الـ Latte Art من زاوية 45 درجة.',
      'لقطة صب V60 رأسية (Top Down / Flat Lay) مع تناثر حبيبات البن المطحون حول الكيمكس وساعة التوقيت.',
      'كوب دافئ يُحمل بكلتا اليدين مع تصاعد خيوط البخار في خلفية مظلمة لإبراز الدفء الإنساني.'
    ],
    propsAndStyling: [
      'خلفية خشبية معتقة أو رخام داكن غير لامع',
      'حبوب بن محمصة طازجة متناثرة بعفوية مدروسة',
      'بسكويت أو شوكولاتة داكنة مكسورة لإضافة قوام مقرمش للكادر'
    ],
    cameraAndLens: 'عدسة 50mm f/1.8 أو 85mm f/1.8، فتحة f/2.8، سرعة غالق 1/500s لتجميد حركة الصب، ISO 400.',
    proTips: 'لإبراز بخار القهوة بوضوح، يجب أن تكون الخلفية خلف البخار معتمة ومظلمة، وأن يأتي الضوء من الخلف (Backlight) مباشرة مخترقاً جزيئات البخار.'
  }
];

export const PHOTOGRAPHY_LESSONS: LessonItem[] = [
  {
    id: 'lesson-exposure-triangle',
    title: 'إتقان مثلث التعريض (Exposure Triangle)',
    category: 'أساسيات الكاميرا',
    level: 'مبتدئ',
    readTime: '5 دقائق',
    summary: 'العلاقة التبادلية بين الـ Aperture و Shutter Speed و ISO للتحكم التام في إضاءة ومظهر المشهد.',
    content: [
      'مثلث التعريض هو الأساس الفيزيائي لأي صورة فوتوغرافية أو كادر سينمائي.',
      '1. فتحة العدسة (Aperture - تقاس بـ f-stop): تتحكم في كمية الضوء الداخلة وفي عمق الميدان (Depth of Field). الأرقام الصغيرة مثل f/1.4 تعني فتحة واسعة جداً وبوكيه قوي، بينما الأرقام الكبيرة مثل f/16 تعني فتحة ضيقة وكل المشهد حاد.',
      '2. سرعة الغالق (Shutter Speed): تتحكم في مدة دخول الضوء وتجميد الحركة (مثل 1/1000s للرياضة) أو السماح بضبابية الحركة (Motion Blur مثل 1/2s لمياه الشلالات الحريرية).',
      '3. حساسية المستشعر (ISO): تضخيم الإشارة الضوئية إلكترونياً. الحفاظ على ISO منخفض (100-200) يمنحك أنقى صورة خالية من التشويش والـ Noise، بينما رفعه (3200+) ضروري لإنقاذ المشاهد الليلية.'
    ],
    cheatSheet: {
      rule: 'أي تغيير بقيمة درجة واحدة (1 Stop) في عنصر يجب موازنته في عنصر آخر للحفاظ على نفس التعريض.',
      example: 'إذا ضيقت فتحة العدسة من f/2.8 إلى f/4 (نقص النصف من الضوء)، يجب خفض سرعة الغالق من 1/500s إلى 1/250s للموازنة.',
      mistakeToAvoid: 'تجنب تضييق الفتحة لما بعد f/16 على كاميرات الفول فريم، لأن ظاهرة الحيود البصري (Diffraction) ستقلل من حدة الصورة بدلاً من زيادتها.'
    }
  },
  {
    id: 'lesson-composition-rules',
    title: 'قواعد التكوين البصري والنسبة الذهبية',
    category: 'التكوين والكادرات',
    level: 'متوسط',
    readTime: '6 دقائق',
    summary: 'كيف توجه عين المشاهد وتخلق تناغماً وتوازناً يجذب الانتباه تلقائياً.',
    content: [
      'التكوين هو الفرق الحقيقي بين مجرد التقاط صورة وبين صناعة عمل فني ساحر.',
      '1. قاعدة الأثلاث (Rule of Thirds): قسّم الشاشة بخطين أفقيين وعموديين. ضع العنصر الأهم عند نقاط التقاطع الأربع ليحصل على أعلى ثقل بصري.',
      '2. خطوط القيادة (Leading Lines): استخدام الطرق، الأسوار، الجدران، أو الأنهر لقيادة نظر المشاهد مباشرة نحو موضوعك الرئيسي.',
      '3. التأطير الطبيعي (Natural Framing): استخدام النوافذ، الأقواس المعمارية، أو أوراق الأشجار كإطار داخلي يحيط بموضوعك ويعطيه عمقاً وبعداً ثالثاً.',
      '4. الفضاء السلبي (Negative Space): ترك مساحات فارغة متوازنة حول العنصر الأساسي لخلق شعور بالهدوء، الفخامة، أو العزلة الدرامية.'
    ],
    cheatSheet: {
      rule: 'ضع دائماً عيني الشخصية في الثلث العلوي من الكادر عند تصوير البورتريه.',
      example: 'في لقطات الأفق (Landscape)، إذا كانت السماء مليئة بالغيوم الملحمية، اجعل السماء تشغل ثلثي الكادر والأرض الثلث السفلي.',
      mistakeToAvoid: 'وضع الموضوع دائماً في المنتصف الميت بدون مبرر فني (Dead Center) مما يجعل الصورة جامدة ومملة.'
    }
  },
  {
    id: 'lesson-cinematic-lighting',
    title: 'الإضاءة السينمائية: التحكم في الظلال ونسبة التباين',
    category: 'الإضاءة والاستوديو',
    level: 'متقدم',
    readTime: '7 دقائق',
    summary: 'فهم الفارق بين النور القاسي والناعم، وكيف تصنع عمقاً هوليوودياً بأقل المعدات.',
    content: [
      'في السينما، الظلال هي التي تصنع الدراما والقصة وليس الضوء وحده.',
      '1. حجم المصدر الضوئي: كلما كان المصدر الضوئي كبيراً وقريباً من الموضوع، كلما كان الضوء ناعماً وتدرج الظلال سلساً (مثل سوفت بوكس 120cm أو شمس محجوبة بغيوم). المصادر الصغيرة مثل فلاش الكاميرا المباشر تنتج ظلالاً قاسية جداً.',
      '2. إضاءة الجانب المظلم (Shooting into the Shadow Side): عند تصوير شخص، اجعل الكاميرا تقف في الجانب المظلل من وجهه وليس في الجانب المضاء بالكامل، هذا يسمى (Upstage Lighting) وهو سر المظهر السينمائي.',
      '3. خط الفصل (Rim / Hair Light): أهم إضاءة لعزل الشخصية عن الخلفية المعتمة وجعلها تبدو ثلاثية الأبعاد تنبض بالحياة.'
    ],
    cheatSheet: {
      rule: 'كلما اقترب مصدر الضوء من موضوعك، أصبح الضوء أكثر نعومة وقلت حدة الحواف في الظلال.',
      example: 'استخدم شبكة توجيه (Grid) على السوفت بوكس لمنع تسرب الضوء للخلفية السوداء وجعل الإضاءة موجهة فقط للمودل.',
      mistakeToAvoid: 'توجيه ضوء الفلاش مباشرة من فوق الكاميرا نحو وجه الشخصية، مما يسطح الملامح ويلغي أبعاد الأنف والخدين.'
    }
  }
];

export const SAMPLE_COACH_PHOTOS = [
  {
    id: 'sample-portrait',
    title: 'بورتريه في الاستوديو',
    subtitle: 'إضاءة استوديو مع عزل خلفية وسوفت بوكس',
    category: 'بورتريه',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    context: {
      cameraType: 'Sony A7 IV مع عدسة 85mm f/1.4',
      scene: 'استوديو داخلي مع إضاءة موجهة'
    }
  },
  {
    id: 'sample-night',
    title: 'شارع ليلي وأضواء نيون',
    subtitle: 'إضاءة منخفضة ومصابيح شوارع دافئة',
    category: 'تصوير ليلي',
    imageUrl: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=800&q=80',
    context: {
      cameraType: 'Fujifilm X-T5 مع عدسة 35mm f/1.4',
      scene: 'ليلي خارجي بأجواء مطيرة وأضواء ساطعة'
    }
  },
  {
    id: 'sample-watch',
    title: 'ساعة يد فاخرة (ماكرو)',
    subtitle: 'تصوير تجاري للمنتجات وانعكاسات المعادن',
    category: 'منتجات تجارية',
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    context: {
      cameraType: 'Canon EOS R5 مع عدسة 100mm Macro',
      scene: 'استوديو تصوير منتجات High-Key'
    }
  },
  {
    id: 'sample-landscape',
    title: 'غروب صحراوي وجبال شاهقة',
    subtitle: 'الساعة الذهبية ونطاق ديناميكي واسع',
    category: 'طبيعة ومناظر',
    imageUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
    context: {
      cameraType: 'Nikon Z8 مع عدسة 24-70mm f/2.8',
      scene: 'الساعة الذهبية في بيئة طبيعية مفتوحة'
    }
  }
];

export const INITIAL_USER_GEAR: GearItem[] = [
  { id: 'g1', name: 'Sony Alpha 7 IV', type: 'camera', specs: '33MP Full-Frame / 4K 60p 10-Bit', isFavorite: true },
  { id: 'g2', name: 'Sony FE 50mm f/1.2 GM', type: 'lens', specs: 'Ultra-fast Prime / Extreme Sharpness', isFavorite: true },
  { id: 'g3', name: 'Sony FE 24-70mm f/2.8 GM II', type: 'lens', specs: 'Versatile Pro Cinema Zoom', isFavorite: true },
  { id: 'g4', name: 'Aputure Amaran 200d LED', type: 'light', specs: '200W Daylight 5600K Bowens Mount', isFavorite: false },
  { id: 'g5', name: 'Aputure Light Dome SE 90cm', type: 'light', specs: 'Quick-setup Softbox with Grid', isFavorite: false },
  { id: 'g6', name: 'DJI RS 3 Pro Gimbal', type: 'accessory', specs: 'Carbon Fiber 4.5kg Payload', isFavorite: false }
];
