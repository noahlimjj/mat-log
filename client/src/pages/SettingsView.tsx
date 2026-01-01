/**
 * SettingsView - Settings & Data Management
 * 
 * Features:
 * - Export data as JSON
 * - Reset all data
 * - App information
 * 
 * Design: Minimalist Athletic Dashboard
 */

import React from 'react';
import { useMat } from '@/contexts/MatContext';
import { Card, Button } from '@/components/Atomic';
import { Download, RotateCcw } from 'lucide-react';

export default function SettingsView() {
  const { exportData, resetData, stats } = useMat();

  return (
    <div className="space-y-6 pb-24">
      {/* Header */}
      <div className="pt-6">
        <h2 className="text-2xl font-bold font-mono">Settings</h2>
        <p className="text-muted-foreground text-sm mt-1">Manage your data</p>
      </div>

      {/* Data Management */}
      <Card>
        <h3 className="text-sm font-medium uppercase tracking-wide mb-4">Data Management</h3>
        <div className="space-y-3">
          <Button
            onClick={exportData}
            variant="primary"
            size="md"
            className="w-full gap-2"
          >
            <Download className="w-4 h-4" />
            Export Data as JSON
          </Button>
          <p className="text-xs text-muted-foreground">
            Download a backup of all your sessions and techniques
          </p>
        </div>
      </Card>

      {/* Danger Zone */}
      <Card className="border-2 border-destructive/30">
        <h3 className="text-sm font-medium uppercase tracking-wide mb-4 text-destructive">Danger Zone</h3>
        <div className="space-y-3">
          <Button
            onClick={resetData}
            variant="danger"
            size="md"
            className="w-full gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Reset All Data
          </Button>
          <p className="text-xs text-muted-foreground">
            Permanently delete all sessions, techniques, and data. This cannot be undone.
          </p>
        </div>
      </Card>

      {/* Stats Summary */}
      <Card className="bg-muted/30">
        <h3 className="text-sm font-medium uppercase tracking-wide mb-4">Data Summary</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Sessions</p>
            <p className="text-lg font-bold font-mono mt-1">{stats.totalSessions}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Total Hours</p>
            <p className="text-lg font-bold font-mono mt-1">{stats.totalHours.toFixed(1)}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Techniques</p>
            <p className="text-lg font-bold font-mono mt-1">{stats.totalTechniques}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Rounds</p>
            <p className="text-lg font-bold font-mono mt-1">{stats.totalRounds}</p>
          </div>
        </div>
      </Card>

      {/* App Info */}
      <Card className="text-center">
        <p className="text-sm font-medium mb-2">MatLog Pro</p>
        <p className="text-xs text-muted-foreground">v1.0.0</p>
        <p className="text-xs text-muted-foreground mt-2">
          Advanced BJJ Training Tracker
        </p>
      </Card>
    </div>
  );
}
