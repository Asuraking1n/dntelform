/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback, useEffect } from "react";
import { FormConfig } from "../types";

export const useDntelForm = (config: FormConfig, formId?: string) => {
  const [changes, setChanges] = useState<Record<string, any>>({});
  const [activeSection, setActiveSection] = useState<string>("");
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [lastChanged, setLastChanged] = useState<number | null>(null);
  const [editMode, setEditMode] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    if (formId) {
      const saved = localStorage.getItem(`form-${formId}`);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setChanges(parsed.changes || {});
          setExpandedSections(parsed.expandedSections || []);
          setActiveSection(parsed.activeSection || "");
        } catch (error) {
          console.error("Error loading form state:", error);
        }
      }
    }
  }, [formId]);

  // Save to localStorage on state changes
  useEffect(() => {
    if (formId) {
      const state = {
        changes,
        expandedSections,
        activeSection,
        lastChanged: Date.now(),
      };
      localStorage.setItem(`form-${formId}`, JSON.stringify(state));
    }
  }, [changes, expandedSections, activeSection, formId]);

  // Functions
  const expandAll = useCallback(() => {
    const allSectionIds = config.sections.map((section) => section.id);
    setExpandedSections(allSectionIds);
  }, [config]);

  const collapseAll = useCallback(() => {
    setExpandedSections([]);
  }, []);

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(`section-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  }, []);

  const expandSection = useCallback((id: string) => {
    setExpandedSections((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
    setActiveSection(id);
  }, []);

  const reset = useCallback(() => {
    setChanges({});
    setLastChanged(null);
    if (formId) {
      localStorage.removeItem(`form-${formId}`);
    }
  }, [formId]);

  const changeValue = useCallback((key: string, value: any) => {
    setChanges((prev) => {
      const keys = key.split(".");
      if (keys.length === 1) {
        return { ...prev, [key]: value };
      }

      const result = { ...prev };
      let current = result;
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return result;
    });
    setLastChanged(Date.now());
  }, []);

  const clearLS = useCallback(() => {
    if (formId) {
      localStorage.removeItem(`form-${formId}`);
    }
  }, [formId]);

  return {
    // State
    changes,
    activeSection,
    expandedSections,
    lastChanged,
    editMode,

    // Functions
    expandAll,
    collapseAll,
    scrollToSection,
    expandSection,
    reset,
    changeValue,
    clearLS,
    setEditMode,
  };
};
