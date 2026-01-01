/**
 * VaultView - Technique Vault (Knowledge Graph)
 * 
 * Features:
 * - List view of techniques
 * - Tag-based filtering
 * - Add/edit/delete techniques
 * - Tag management
 * 
 * Design: Minimalist Athletic Dashboard with data-driven filtering
 */

import React, { useState, useMemo } from 'react';
import { useMat } from '@/contexts/MatContext';
import { Card, Button, Input, Label, Textarea, Badge } from '@/components/Atomic';
import { Technique } from '@/types';
import { Trash2, Plus, X } from 'lucide-react';
import { nanoid } from 'nanoid';

export default function VaultView() {
  const { techniques, addTechnique, deleteTechnique } = useMat();

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    tags: '',
    description: '',
  });

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    techniques.forEach((t) => t.tags.forEach((tag) => tags.add(tag)));
    return Array.from(tags).sort();
  }, [techniques]);

  const filteredTechniques = useMemo(() => {
    if (selectedTags.length === 0) return techniques;
    return techniques.filter((t) =>
      selectedTags.some((tag) => t.tags.includes(tag))
    );
  }, [techniques, selectedTags]);

  const handleAddTechnique = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const tags = formData.tags
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    addTechnique({
      name: formData.name,
      tags,
      description: formData.description || undefined,
    });

    setFormData({ name: '', tags: '', description: '' });
    setShowForm(false);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Header */}
      <div className="pt-6">
        <h2 className="text-2xl font-bold font-mono">Technique Vault</h2>
        <p className="text-muted-foreground text-sm mt-1">Knowledge graph of techniques</p>
      </div>

      {/* Add Technique Form */}
      {showForm && (
        <Card className="border-2 border-primary/30">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium uppercase tracking-wide">Add Technique</h3>
            <button
              onClick={() => setShowForm(false)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleAddTechnique} className="space-y-4">
            <div>
              <Label htmlFor="name">Technique Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="e.g., Triangle Choke"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input
                id="tags"
                type="text"
                placeholder="e.g., #GuardRetention, #LegLocks, #DeepHalf"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="mt-1"
              />
              <p className="text-xs text-muted-foreground mt-1">Include # prefix for consistency</p>
            </div>

            <div>
              <Label htmlFor="description">Description (optional)</Label>
              <Textarea
                id="description"
                placeholder="Notes about this technique..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="mt-1"
              />
            </div>

            <Button type="submit" variant="primary" size="md" className="w-full">
              Add Technique
            </Button>
          </form>
        </Card>
      )}

      {!showForm && (
        <Button
          onClick={() => setShowForm(true)}
          variant="primary"
          size="md"
          className="w-full gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Technique
        </Button>
      )}

      {/* Tag Filter */}
      {allTags.length > 0 && (
        <Card>
          <p className="text-xs font-medium uppercase tracking-wide mb-3">Filter by Tag</p>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all border ${
                  selectedTags.includes(tag)
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-muted text-muted-foreground border-border hover:border-primary/50'
                }`}
              >
                {tag}
              </button>
            ))}
            {selectedTags.length > 0 && (
              <button
                onClick={() => setSelectedTags([])}
                className="px-3 py-1 rounded-full text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </Card>
      )}

      {/* Techniques List */}
      <div className="space-y-3">
        {filteredTechniques.length === 0 ? (
          <Card className="text-center py-8">
            <p className="text-muted-foreground">
              {techniques.length === 0
                ? 'No techniques yet. Add your first technique!'
                : 'No techniques match the selected tags.'}
            </p>
          </Card>
        ) : (
          filteredTechniques.map((technique) => (
            <Card key={technique.id} className="border border-border">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-base">{technique.name}</h3>
                  {technique.description && (
                    <p className="text-sm text-muted-foreground mt-1">{technique.description}</p>
                  )}
                  {technique.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {technique.tags.map((tag) => (
                        <Badge key={tag} variant="default" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => deleteTechnique(technique.id)}
                  className="text-muted-foreground hover:text-destructive transition-colors flex-shrink-0 mt-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Stats */}
      {techniques.length > 0 && (
        <Card className="bg-muted/30">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold font-mono">{techniques.length}</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mt-1">Total Techniques</p>
            </div>
            <div>
              <p className="text-2xl font-bold font-mono">{allTags.length}</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mt-1">Unique Tags</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
