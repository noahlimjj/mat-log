/**
 * DashboardView - The "Headquarters"
 * 
 * Displays:
 * - "Road to Rome" Countdown (Feb 2026)
 * - Weekly Volume Chart (Hours + Intensity)
 * - Mat Rat Score (gamified metric)
 * - Quick stats cards
 * 
 * Design: Minimalist Athletic Dashboard with data-driven focus
 */

import React, { useMemo } from 'react';
import { useMat } from '@/contexts/MatContext';
import { Card } from '@/components/Atomic';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function DashboardView() {
  const { stats } = useMat();

  const daysToRome = useMemo(() => {
    const target = new Date('2026-02-01');
    const today = new Date();
    const diff = Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return Math.max(0, diff);
  }, []);

  const chartData = useMemo(() => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.map((day, i) => ({
      day,
      hours: stats.weeklyHours[i] || 0,
      intensity: stats.weeklyIntensity[i] || 0,
    }));
  }, [stats.weeklyHours, stats.weeklyIntensity]);

  return (
    <div className="space-y-6 pb-24">
      {/* Header */}
      <div className="pt-6">
        <h1 className="text-3xl font-bold font-mono">MatLog Pro</h1>
        <p className="text-muted-foreground text-sm mt-1">Brazilian Jiu-Jitsu Training Tracker</p>
      </div>

      {/* Road to Rome Countdown */}
      <Card className="border-2 border-primary/30 bg-gradient-to-br from-card to-card/50">
        <div className="text-center py-4">
          <p className="text-muted-foreground text-sm uppercase tracking-wide mb-2">Road to Rome</p>
          <div className="text-5xl font-bold font-mono text-primary mb-2">{daysToRome}</div>
          <p className="text-muted-foreground text-sm">days until February 2026</p>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Card className="text-center">
          <p className="text-muted-foreground text-xs uppercase tracking-wide mb-2">Total Hours</p>
          <p className="text-2xl font-bold font-mono">{stats.totalHours.toFixed(1)}</p>
        </Card>
        <Card className="text-center">
          <p className="text-muted-foreground text-xs uppercase tracking-wide mb-2">Sessions</p>
          <p className="text-2xl font-bold font-mono">{stats.totalSessions}</p>
        </Card>
        <Card className="text-center">
          <p className="text-muted-foreground text-xs uppercase tracking-wide mb-2">Techniques</p>
          <p className="text-2xl font-bold font-mono">{stats.totalTechniques}</p>
        </Card>
        <Card className="text-center">
          <p className="text-muted-foreground text-xs uppercase tracking-wide mb-2">Rounds</p>
          <p className="text-2xl font-bold font-mono">{stats.totalRounds}</p>
        </Card>
      </div>

      {/* Mat Rat Score */}
      <Card className="border-2 border-accent/30 bg-gradient-to-br from-card to-card/50">
        <div className="flex items-baseline justify-between">
          <div>
            <p className="text-muted-foreground text-sm uppercase tracking-wide mb-1">Mat Rat Score</p>
            <p className="text-4xl font-bold font-mono">{stats.matRatScore}</p>
            <p className="text-xs text-muted-foreground mt-2">
              (Hours × 10) + (Techniques × 5)
            </p>
          </div>
          <div className="text-right text-3xl">🐀</div>
        </div>
      </Card>

      {/* Weekly Volume Chart */}
      <Card>
        <p className="text-sm font-medium uppercase tracking-wide mb-4">Weekly Volume & Intensity</p>
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
            <XAxis dataKey="day" stroke="currentColor" opacity={0.5} />
            <YAxis stroke="currentColor" opacity={0.5} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--background))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '0.5rem',
              }}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
            />
            <Legend />
            <Bar dataKey="hours" fill="hsl(var(--chart-1))" name="Hours Trained" />
            <Line dataKey="intensity" stroke="hsl(var(--chart-2))" name="Avg Intensity" strokeWidth={2} />
          </ComposedChart>
        </ResponsiveContainer>
      </Card>

      {/* Win/Loss/Draw Stats */}
      <Card>
        <p className="text-sm font-medium uppercase tracking-wide mb-4">Sparring Record</p>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold font-mono text-[oklch(0.7_0.15_141.36)]">{stats.wins}</p>
            <p className="text-xs text-muted-foreground uppercase tracking-wide mt-1">Wins</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold font-mono text-[oklch(0.65_0.2_17.77)]">{stats.losses}</p>
            <p className="text-xs text-muted-foreground uppercase tracking-wide mt-1">Losses</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold font-mono text-[oklch(0.75_0.18_70.08)]">{stats.draws}</p>
            <p className="text-xs text-muted-foreground uppercase tracking-wide mt-1">Draws</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
