# Dntel Form Hook

A powerful, flexible, and performant React form management hook for building dynamic, sectioned forms.

## Features

- 🎯 Dynamic form sections with automatic rendering
- 💾 Local storage persistence for form drafts
- 🎨 Multiple field types with fallback handling
- 📱 Responsive layout options
- ⚡ Optimized performance with minimal re-renders
- 🔄 Advanced state management
- 🎛️ Comprehensive form controls

## Quick Start

```tsx

const App = () => {
  const sampleConfig = {
  sections: [
    {
      id: "personal",
      title: "Personal Information",
      order: 1,
      layout: "full",
      fields: [
        {
          key: "name",
          type: "text",
          label: "Full Name",
          colSpan: 2,
          required: true,
        },
        {
          key: "email",
          type: "text",
          label: "Email",
          colSpan: 1,
          required: true,
        },
        {
          key: "active",
          type: "boolean",
          label: "Active Status",
          colSpan: 1,
        },
      ],
    },
    {
      id: "address",
      title: "Address Details",
      order: 2,
      layout: "full",
      fields: [
        {
          key: "address.street",
          type: "text",
          label: "Street",
          colSpan: 2,
        },
        {
          key: "address.city",
          type: "text",
          label: "City",
          colSpan: 1,
        },
        {
          key: "address.country",
          type: "select",
          label: "Country",
          colSpan: 1,
          options: [
            { label: "United States", value: "US" },
            { label: "Canada", value: "CA" },
            { label: "United Kingdom", value: "UK" },
          ],
        },
      ],
    },
    {
      id: "preferences",
      title: "Preferences",
      order: 3,
      layout: "right",
      fields: [
        {
          key: "theme",
          type: "select",
          label: "Theme",
          options: [
            { label: "Light", value: "light" },
            { label: "Dark", value: "dark" },
            { label: "System", value: "system" },
          ],
          colSpan: 1,
        },
        {
          key: "notifications",
          type: "boolean",
          label: "Enable Notifications",
          colSpan: 1,
        },
        {
          key: "startDate",
          type: "date",
          label: "Start Date",
          colSpan: 2,
        },
      ],
    },
  ],
};

 const form = useDntelForm(sampleConfig as FormConfig, "sample-form");;

  return (
    <div>
      <button onClick={() => setEditMode(!editMode)}>
        Toggle Edit Mode
      </button>
      <DntelForm
        sections={sampleConfig.sections as FormSection[]}
        changes={form.changes}
        expandedSections={form.expandedSections}
        onChangeValue={form.changeValue}
        onExpandSection={form.expandSection}
        editMode={form.editMode}
      />
    </div>
  );
};
```

## Hook API

### States

```typescript
interface DntelFormState {
  changes: Record<string, any>; // Form field changes
  activeSection: string; // Currently visible section ID
  expandedSections: string[]; // Array of expanded section IDs
  lastChanged: number | null; // Timestamp of last change
  editMode: boolean; // Form edit mode state
}
```

### Functions

```typescript
interface DntelFormFunctions {
  expandAll: () => void; // Expand all sections
  collapseAll: () => void; // Collapse all sections
  scrollToSection: (id: string) => void; // Scroll to specific section
  expandSection: (id: string) => void; // Expand specific section
  reset: () => void; // Reset form to initial state
  changeValue: (key: string, value: any) => void; // Update field value
  clearLS: () => void; // Clear localStorage
  setEditMode: (enabled: boolean) => void; // Toggle edit mode
}
```

## Field Types

### Text Field

```typescript
{
  key: 'name',
  type: 'text',
  label: 'Full Name',
  colSpan: 2,
  required: true
}
```

### Boolean Field

```typescript
{
  key: 'isActive',
  type: 'boolean',
  label: 'Active Status',
  colSpan: 1
}
```

### Select Field

```typescript
{
  key: 'country',
  type: 'select',
  label: 'Country',
  options: [
    { label: 'USA', value: 'us' },
    { label: 'Canada', value: 'ca' }
  ],
  colSpan: 2
}
```

### Date Field

```typescript
{
  key: 'birthDate',
  type: 'date',
  label: 'Date of Birth',
  colSpan: 1
}
```

## Section Layouts

Forms can be organized into sections with different layouts:

- `full` - Full width (default)
- `right` - Right-aligned
- `left` - Left-aligned

```typescript
const sections = [
  {
    id: "personal",
    title: "Personal Information",
    order: 1,
    layout: "full",
    fields: [
      /* ... */
    ],
  },
  {
    id: "contact",
    title: "Contact Details",
    order: 2,
    layout: "right",
    fields: [
      /* ... */
    ],
  },
];
```

## Advanced Features

### Local Storage Persistence

Forms can automatically save drafts to localStorage when an ID is provided:

```typescript
const { FormComponent } = useDntelForm(initialData, "unique-form-id");
```

### Dynamic Fields

All fields support fallback to text input with reset capability:

```typescript
// Boolean field with string value
{
  key: 'status',
  type: 'boolean',
  value: 'UNKNOWN'  // Renders as text input with reset option
}
```

### Nested Fields

Support for dot notation in field keys:

```typescript
{
  key: 'address.street',
  type: 'text',
  label: 'Street Address'
}
```

## Performance Optimizations

- Minimal re-renders using React.memo
- Memoized callbacks with useCallback
- Efficient state updates
- Optimized localStorage interactions
- Smart section rendering

## TypeScript Support

Full TypeScript support with comprehensive type definitions:

```typescript
interface FormField {
  key: string;
  type: "text" | "boolean" | "select" | "date";
  label: string;
  options?: Array<{
    label: string;
    value: string | number;
  }>;
  colSpan?: 1 | 2;
  required?: boolean;
}

interface FormSection {
  id: string;
  title: string;
  order: number;
  layout?: "full" | "right" | "left";
  fields: FormField[];
}
```
