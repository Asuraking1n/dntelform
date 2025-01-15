/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { Select } from "./ui/select";
import { Calendar } from "./ui/calendar";
import { FormField, FormSection } from "../types";

interface DntelFormProps {
  sections: FormSection[];
  changes: Record<string, any>;
  expandedSections: string[];
  onChangeValue: (key: string, value: any) => void;
  onExpandSection: (id: string) => void;
  editMode: boolean;
}

export const DntelForm: React.FC<DntelFormProps> = ({
  sections,
  changes,
  expandedSections,
  onChangeValue,
  onExpandSection,
  editMode,
}) => {
  const renderField = (field: FormField) => {
    const value = changes[field.key] ?? "";

    switch (field.type) {
      case "boolean":
        return (
          <Checkbox
            checked={!!value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onChangeValue(field.key, e.target.checked)
            }
            disabled={!editMode}
          />
        );

      case "select":
        return (
          <Select
            value={value}
            onChange={(e) => onChangeValue(field.key, e.target.value)}
            options={field.options}
            disabled={!editMode}
          />
        );

      case "date":
        return (
          <Calendar
            value={value ? new Date(value).toISOString().split("T")[0] : ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onChangeValue(field.key, e.target.value)
            }
            disabled={!editMode}
          />
        );

      default:
        return (
          <Input
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onChangeValue(field.key, e.target.value)
            }
            disabled={!editMode}
          />
        );
    }
  };

  return (
    <div className="space-y-6">
      {sections
        .sort((a, b) => a.order - b.order)
        .map((section) => (
          <div
            key={section.id}
            id={`section-${section.id}`}
            className={`border rounded-lg p-4 ${
              section.layout === "right"
                ? "ml-auto w-1/2"
                : section.layout === "left"
                ? "w-1/2"
                : "w-full"
            }`}
          >
            <button
              className="w-full flex justify-between items-center"
              onClick={() => onExpandSection(section.id)}
            >
              <h2 className="text-xl font-semibold">{section.title}</h2>
              <span>{expandedSections.includes(section.id) ? "▼" : "▶"}</span>
            </button>

            {expandedSections.includes(section.id) && (
              <div className="grid grid-cols-2 gap-4 mt-4">
                {section.fields.map((field) => (
                  <div
                    key={field.key}
                    className={`space-y-2 ${
                      field.colSpan === 2 ? "col-span-2" : "col-span-1"
                    }`}
                  >
                    <label className="block text-sm font-medium">
                      {field.label}
                      {field.required && (
                        <span className="text-red-500">*</span>
                      )}
                    </label>
                    {renderField(field)}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
    </div>
  );
};
