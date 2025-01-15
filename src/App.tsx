import { useDntelForm } from "./hooks/useDntelForm";
import { DntelForm } from "./components/DntelForm";
import { FormConfig, FormSection } from "./types";

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

function App() {
  const form = useDntelForm(sampleConfig as FormConfig, "sample-form");

  return (
    <div className="container mx-auto p-4 w-screen flex flex-col gap-20">
      {/* Form Controls */}
      <div className="flex gap-4 w-full justify-between">
        <div className="mb-8 space-y-4">
          {/* Feature Descriptions */}
          <div className="mb-6 p-4 border-b">
            <h2 className="text-xl font-bold mb-4">Form Features:</h2>
            <ul className="space-y-2 text-sm">
              <li>• Edit Mode: Enables/disables form field editing</li>
              <li>• Last Changed: Shows timestamp of most recent change</li>
              <li>• Expand/Collapse: Controls visibility of all sections</li>
              <li>• Auto Scroll: Quickly navigate to specific sections</li>
              <li>• Reset Form: Clears all entered data</li>
              <li>• Clear Storage: Removes saved data from browser storage</li>
            </ul>
          </div>

          {/* Edit Mode Toggle */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-sm text-gray-500 block mb-1">
                  Toggle form editing:
                </span>
                <button
                  onClick={() => form.setEditMode(!form.editMode)}
                  className={`px-4 py-2 rounded ${
                    form.editMode
                      ? "bg-yellow-500 hover:bg-yellow-600"
                      : "bg-blue-500 hover:bg-blue-600"
                  } text-white`}
                  title="Click to enable/disable form editing"
                >
                  {form.editMode ? "Exit Edit Mode" : "Enter Edit Mode"}
                </button>
              </div>
              <span className="text-sm text-gray-500">
                {form.lastChanged
                  ? `Last changed: ${new Date(
                      form.lastChanged
                    ).toLocaleString()}`
                  : "No changes yet"}
              </span>
            </div>
          </div>

          {/* Section Controls */}
          <div className="flex flex-col gap-2">
            <span className="text-sm text-gray-500">Control all sections:</span>
            <div className="flex space-x-4">
              <button
                onClick={form.expandAll}
                className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded"
                title="Opens all form sections"
              >
                Expand All
              </button>
              <button
                onClick={form.collapseAll}
                className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded"
                title="Closes all form sections"
              >
                Collapse All
              </button>
            </div>
          </div>

          {/* Section Navigation */}
          <div className="flex flex-col gap-2">
            <span className="text-sm text-gray-500">Quick navigation:</span>
            <div className="flex space-x-2">
              {sampleConfig.sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => form.scrollToSection(section.id)}
                  className={`px-3 py-1 rounded text-sm ${
                    form.activeSection === section.id
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-300"
                  }`}
                  title={`Scroll to ${section.title} section`}
                >
                  {section.title}
                </button>
              ))}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex flex-col gap-2">
            <span className="text-sm text-gray-500">Form actions:</span>
            <div className="flex space-x-4">
              <button
                onClick={form.reset}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
                title="Clears all form data"
              >
                Reset Form
              </button>
              <button
                onClick={form.clearLS}
                className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded"
                title="Removes saved form data from browser storage"
              >
                Clear Storage
              </button>
            </div>
          </div>
        </div>

        {/* Debug Information */}
        <div className="p-4 border rounded w-96">
          <h3 className="font-semibold mb-2">Current State:</h3>
          <div className="text-sm text-gray-500 mb-2">
            Live view of form state and changes
          </div>
          <pre className="text-sm p-2 rounded">
            {JSON.stringify(
              {
                changes: form.changes,
                activeSection: form.activeSection,
                expandedSections: form.expandedSections,
                editMode: form.editMode,
              },
              null,
              2
            )}
          </pre>
        </div>
      </div>

      {/* Form Component */}
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
}

export default App;
