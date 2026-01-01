/**
 * MatLog Pro Type Definitions
 * 
 * Data structures for Session, Round, and Technique tracking.
 * Follows the Minimalist Athletic Dashboard design philosophy.
 */

export type SessionType = 'gi' | 'no-gi';
export type RoundResult = 'submit' | 'tap' | 'draw';

export interface Round {
  id: string;
  partnerName: string;
  result: RoundResult;
  method: string;
  timestamp: number;
}

export interface Session {
  id: string;
  date: string;
  duration: number;
  type: SessionType;
  instructor: string;
  rounds: Round[];
  createdAt: number;
}

export interface Technique {
  id: string;
  name: string;
  tags: string[];
  description?: string;
  createdAt: number;
}

export interface MatLogState {
  sessions: Session[];
  techniques: Technique[];
  lastUpdated: number;
}

export interface Stats {
  totalHours: number;
  totalSessions: number;
  totalTechniques: number;
  totalRounds: number;
  matRatScore: number;
  wins: number;
  losses: number;
  draws: number;
  weeklyHours: number[];
  weeklyIntensity: number[];
}
