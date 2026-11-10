export type TabType = 
  | 'dashboard' 
  | 'coach' 
  | 'settings' 
  | 'shots' 
  | 'lighting' 
  | 'ideas' 
  | 'shotlist' 
  | 'learning' 
  | 'profile';

export interface PhotoAnalysisResult {
  overallScore: number;
  scoreBreakdown: {
    composition: number;
    lighting: number;
    focusSharpness: number;
    colorGrading: number;
    cameraAngle: number;
  };
  summary: string;
  compositionAnalysis: string;
  lightingAnalysis: string;
  focusAnalysis: string;
  colorAnalysis: string;
  cameraAngleAnalysis: string;
  suggestedAngle: string;
  improvements: string[];
  recommendedSettings: {
    camera: string;
    iso: string;
    shutterSpeed: string;
    aperture: string;
    whiteBalance: string;
    why: string;
  };
}

export interface CameraPreset {
  id: string;
  name: string;
  category: 'dslr' | 'cinema' | 'phone' | 'drone';
  brand: string;
  sensor: string;
  nativeIso: string;
}

export interface SceneCondition {
  id: string;
  name: string;
  iconName: string;
  description: string;
  defaultIso: string;
  defaultAperture: string;
  defaultShutter: string;
  defaultWb: string;
  defaultFps?: string;
  explanation: string;
  ndFilter?: string;
}

export interface CinematicShotItem {
  id: string;
  nameAr: string;
  nameEn: string;
  abbreviation: string;
  type: 'framing' | 'angle' | 'movement';
  description: string;
  focalLength: string;
  fps: string;
  lensType: string;
  emotion: string;
  famousUsage: string;
  proTip: string;
  diagramType: string;
}

export interface LightingSetup {
  id: string;
  nameAr: string;
  nameEn: string;
  category: 'portrait' | 'cinematic' | 'commercial';
  description: string;
  shadowPattern: string;
  lightRatio: string;
  lights: {
    key: { active: boolean; angle: number; distance: number; modifier: string; power: number };
    fill: { active: boolean; angle: number; distance: number; modifier: string; power: number };
    rim: { active: boolean; angle: number; distance: number; modifier: string; power: number };
    background: { active: boolean; angle: number; distance: number; modifier: string; power: number };
  };
  idealFor: string;
  stepByStep: string[];
}

export interface PhotoshootConcept {
  id: string;
  conceptTitle: string;
  category: 'portraits' | 'fashion' | 'cars' | 'products' | 'food' | 'social';
  categoryAr: string;
  logline: string;
  moodAndAesthetics: string;
  colorPalette: string[];
  colorNames: string[];
  lightingRecipe: {
    keyLight: string;
    fillLight: string;
    rimLight: string;
    ambientOrGels: string;
  };
  recommendedPoses: string[];
  propsAndStyling: string[];
  cameraAndLens: string;
  proTips: string;
}

export interface ShotListItem {
  id: string;
  sceneNumber: string;
  shotNumber: string;
  shotType: string;
  angle: string;
  movement: string;
  focalLength: string;
  fps: string;
  lighting: string;
  actionDescription: string;
  directorNote: string;
}

export interface ShotListPlan {
  projectTitle: string;
  totalEstimatedTime: string;
  recommendedLensPackage: string[];
  lightingMood: string;
  shots: ShotListItem[];
}

export interface LessonItem {
  id: string;
  title: string;
  category: string;
  level: 'مبتدئ' | 'متوسط' | 'متقدم';
  readTime: string;
  summary: string;
  content: string[];
  cheatSheet: {
    rule: string;
    example: string;
    mistakeToAvoid: string;
  };
}

export interface GearItem {
  id: string;
  name: string;
  type: 'camera' | 'lens' | 'light' | 'accessory';
  specs: string;
  isFavorite: boolean;
}
