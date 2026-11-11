export type ToolId = 
  | 'humanizer' 
  | 'paraphraser' 
  | 'tone-changer' 
  | 'simplifier' 
  | 'summarizer' 
  | 'grammar-fix';

export interface ToolDefinition {
  id: ToolId;
  name: string;
  tagline: string;
  description: string;
  iconName: string;
  badge: string;
  actionText: string;
  sampleInput: string;
  gradient: string;
}

export interface TransformationHistoryItem {
  id: string;
  toolId: ToolId;
  toolName: string;
  inputText: string;
  outputText: string;
  timestamp: string;
  wordsCount: number;
  metadata?: Record<string, any>;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role?: string;
  wordsProcessed: number;
  documentsSaved: number;
  createdAt: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message: string;
}
