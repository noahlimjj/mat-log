/**
 * LoggerView - Session & Sparring Log
 * 
 * Complex form with:
 * - Standard fields (Date, Duration, Type, Instructor)
 * - Dynamic sparring rounds with conditional logic
 * - Add/remove round functionality
 * 
 * Design: Minimalist Athletic Dashboard with data-driven form logic
 */

import React, { useState } from 'react';
import { useMat } from '@/contexts/MatContext';
import { Card, Button, Input, Label, Select, Textarea } from '@/components/Atomic';
import { Session, Round, RoundResult, SessionType } from '@/types';
import { Trash2, Plus } from 'lucide-react';
import { nanoid } from 'nanoid';

export default function LoggerView() {
  const { addSession } = useMat();

  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    duration: 1.5,
    type: 'gi' as SessionType,
    instructor: '',
  });

  const [rounds, setRounds] = useState<Omit<Round, 'id' | 'timestamp'>[]>([]);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success'>('idle');

  const handleAddRound = () => {
    setRounds([...rounds, { partnerName: '', result: 'draw', method: '' }]);
  };

  const handleRemoveRound = (index: number) => {
    setRounds(rounds.filter((_, i) => i !== index));
  };

  const handleRoundChange = (index: number, field: keyof Omit<Round, 'id' | 'timestamp'>, value: string) => {
    const updated = [...rounds];
    updated[index] = { ...updated[index], [field]: value };
    setRounds(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const session: Omit<Session, 'id' | 'createdAt'> = {
      date: formData.date,
      duration: parseFloat(formData.duration.toString()),
      type: formData.type,
      instructor: formData.instructor,
      rounds: rounds.map((r) => ({
        ...r,
        id: nanoid(),
        timestamp: Date.now(),
      })),
    };

    addSession(session);

    setFormData({
      date: new Date().toISOString().split('T')[0],
      duration: 1.5,
      type: 'gi',
      instructor: '',
    });
    setRounds([]);
    setSubmitStatus('success');
    setTimeout(() => setSubmitStatus('idle'), 3000);
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Header */}
      <div className="pt-6">
        <h2 className="text-2xl font-bold font-mono">Log Session</h2>
        <p className="text-muted-foreground text-sm mt-1">Track your training and sparring</p>
      </div>

      {submitStatus === 'success' && (
        <Card className="border-2 border-[oklch(0.7_0.15_141.36)]/50 bg-[oklch(0.7_0.15_141.36)]/5">
          <p className="text-sm text-[oklch(0.7_0.15_141.36)]">✓ Session logged successfully</p>
        </Card>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Session Info */}
        <Card>
          <h3 className="text-sm font-medium uppercase tracking-wide mb-4">Session Details</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="duration">Duration (hours)</Label>
                <Input
                  id="duration"
                  type="number"
                  step="0.5"
                  min="0.5"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: parseFloat(e.target.value) })}
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="type">Type</Label>
                <Select
                  id="type"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as SessionType })}
                  className="mt-1"
                >
                  <option value="gi">Gi</option>
                  <option value="no-gi">No-Gi</option>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="instructor">Instructor</Label>
              <Input
                id="instructor"
                type="text"
                placeholder="Optional"
                value={formData.instructor}
                onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                className="mt-1"
              />
            </div>
          </div>
        </Card>

        {/* Sparring Rounds */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium uppercase tracking-wide">Sparring Rounds</h3>
            <Button
              type="button"
              onClick={handleAddRound}
              variant="ghost"
              size="sm"
              className="gap-1"
            >
              <Plus className="w-4 h-4" />
              Add Round
            </Button>
          </div>

          {rounds.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4 text-center">No rounds added yet</p>
          ) : (
            <div className="space-y-4">
              {rounds.map((round, index) => (
                <div key={index} className="border border-border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-mono font-medium text-muted-foreground">Round {index + 1}</p>
                    <button
                      type="button"
                      onClick={() => handleRemoveRound(index)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div>
                    <Label htmlFor={`partner-${index}`}>Partner Name</Label>
                    <Input
                      id={`partner-${index}`}
                      type="text"
                      placeholder="Partner's name"
                      value={round.partnerName}
                      onChange={(e) => handleRoundChange(index, 'partnerName', e.target.value)}
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`result-${index}`}>Result</Label>
                    <Select
                      id={`result-${index}`}
                      value={round.result}
                      onChange={(e) => handleRoundChange(index, 'result', e.target.value)}
                      className="mt-1"
                    >
                      <option value="submit">Submit (I Won)</option>
                      <option value="tap">Tap (I Lost)</option>
                      <option value="draw">Draw</option>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor={`method-${index}`}>
                      {round.result === 'submit' ? 'Finished With' : round.result === 'tap' ? 'Caught With' : 'Method'}
                    </Label>
                    <Input
                      id={`method-${index}`}
                      type="text"
                      placeholder="e.g., Triangle Choke, Armbar, Guard Pass"
                      value={round.method}
                      onChange={(e) => handleRoundChange(index, 'method', e.target.value)}
                      required
                      className="mt-1"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Submit Button */}
        <Button type="submit" variant="primary" size="lg" className="w-full font-medium">
          Log Session
        </Button>
      </form>
    </div>
  );
}
