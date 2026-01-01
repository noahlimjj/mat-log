/**
 * MatContext
 * 
 * Global state management for MatLog Pro.
 * Exposes: addSession, addTechnique, updateSession, deleteTechnique, stats, exportData
 * Follows Minimalist Athletic Dashboard design philosophy with data-driven operations.
 */

import React, { createContext, useContext, useCallback, useMemo } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Session, Technique, MatLogState, Stats, Round } from '@/types';
import { nanoid } from 'nanoid';

interface MatContextType {
  sessions: Session[];
  techniques: Technique[];
  stats: Stats;
  addSession: (session: Omit<Session, 'id' | 'createdAt'>) => void;
  updateSession: (id: string, updates: Partial<Session>) => void;
  deleteSession: (id: string) => void;
  addTechnique: (technique: Omit<Technique, 'id' | 'createdAt'>) => void;
  updateTechnique: (id: string, updates: Partial<Technique>) => void;
  deleteTechnique: (id: string) => void;
  exportData: () => void;
  resetData: () => void;
}

const MatContext = createContext<MatContextType | undefined>(undefined);

const INITIAL_STATE: MatLogState = {
  sessions: [],
  techniques: [],
  lastUpdated: Date.now(),
};

export function MatProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useLocalStorage<MatLogState>('matlog-pro-state', INITIAL_STATE);

  const calculateStats = useCallback((sessions: Session[], techniques: Technique[]): Stats => {
    const totalSessions = sessions.length;
    const totalHours = sessions.reduce((sum, s) => sum + s.duration, 0);
    const totalTechniques = techniques.length;
    const totalRounds = sessions.reduce((sum, s) => sum + s.rounds.length, 0);
    const matRatScore = totalHours * 10 + totalTechniques * 5;

    let wins = 0;
    let losses = 0;
    let draws = 0;

    sessions.forEach((session) => {
      session.rounds.forEach((round) => {
        if (round.result === 'submit') wins++;
        else if (round.result === 'tap') losses++;
        else if (round.result === 'draw') draws++;
      });
    });

    const weeklyHours = Array(7).fill(0);
    const weeklyIntensity = Array(7).fill(0);

    const now = new Date();
    sessions.forEach((session) => {
      const sessionDate = new Date(session.date);
      const daysDiff = Math.floor((now.getTime() - sessionDate.getTime()) / (1000 * 60 * 60 * 24));
      if (daysDiff < 7) {
        const dayIndex = 6 - daysDiff;
        weeklyHours[dayIndex] += session.duration;
        const avgIntensity = session.rounds.length > 0 ? Math.min(10, session.rounds.length) : 5;
        weeklyIntensity[dayIndex] = Math.max(weeklyIntensity[dayIndex], avgIntensity);
      }
    });

    return {
      totalHours,
      totalSessions,
      totalTechniques,
      totalRounds,
      matRatScore,
      wins,
      losses,
      draws,
      weeklyHours,
      weeklyIntensity,
    };
  }, []);

  const stats = useMemo(() => calculateStats(state.sessions, state.techniques), [state.sessions, state.techniques, calculateStats]);

  const addSession = useCallback(
    (session: Omit<Session, 'id' | 'createdAt'>) => {
      const newSession: Session = {
        ...session,
        id: nanoid(),
        createdAt: Date.now(),
      };
      setState((prevState) => ({
        ...prevState,
        sessions: [...prevState.sessions, newSession],
        lastUpdated: Date.now(),
      }));
    },
    [setState]
  );

  const updateSession = useCallback(
    (id: string, updates: Partial<Session>) => {
      setState((prevState) => ({
        ...prevState,
        sessions: prevState.sessions.map((s) => (s.id === id ? { ...s, ...updates } : s)),
        lastUpdated: Date.now(),
      }));
    },
    [setState]
  );

  const deleteSession = useCallback(
    (id: string) => {
      setState((prevState) => ({
        ...prevState,
        sessions: prevState.sessions.filter((s) => s.id !== id),
        lastUpdated: Date.now(),
      }));
    },
    [setState]
  );

  const addTechnique = useCallback(
    (technique: Omit<Technique, 'id' | 'createdAt'>) => {
      const newTechnique: Technique = {
        ...technique,
        id: nanoid(),
        createdAt: Date.now(),
      };
      setState((prevState) => ({
        ...prevState,
        techniques: [...prevState.techniques, newTechnique],
        lastUpdated: Date.now(),
      }));
    },
    [setState]
  );

  const updateTechnique = useCallback(
    (id: string, updates: Partial<Technique>) => {
      setState((prevState) => ({
        ...prevState,
        techniques: prevState.techniques.map((t) => (t.id === id ? { ...t, ...updates } : t)),
        lastUpdated: Date.now(),
      }));
    },
    [setState]
  );

  const deleteTechnique = useCallback(
    (id: string) => {
      setState((prevState) => ({
        ...prevState,
        techniques: prevState.techniques.filter((t) => t.id !== id),
        lastUpdated: Date.now(),
      }));
    },
    [setState]
  );

  const exportData = useCallback(() => {
    const dataStr = JSON.stringify(state, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `matlog-pro-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [state]);

  const resetData = useCallback(() => {
    if (window.confirm('Are you sure you want to reset all data? This cannot be undone.')) {
      setState(INITIAL_STATE);
    }
  }, [setState]);

  const value: MatContextType = {
    sessions: state.sessions,
    techniques: state.techniques,
    stats,
    addSession,
    updateSession,
    deleteSession,
    addTechnique,
    updateTechnique,
    deleteTechnique,
    exportData,
    resetData,
  };

  return <MatContext.Provider value={value}>{children}</MatContext.Provider>;
}

export function useMat() {
  const context = useContext(MatContext);
  if (!context) {
    throw new Error('useMat must be used within MatProvider');
  }
  return context;
}
