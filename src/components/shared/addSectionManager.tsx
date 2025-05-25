import React, { useState } from "react";
import { AddSectionForm } from "../global/addSection";
import { FormKit } from "./form-kit";
import { SectionDataTable } from "./section-table";

export interface SectionRow {
  id: number;
  section_name: string;
  status: "Active" | "Inactive";
}

export const SectionManager: React.FC = () => {
  const [selectedSectionName, setSelectedSectionName] = useState<string | null>(
    null
  );
  const [sections, setSections] = useState<SectionRow[]>([]);
  const [idCounter, setIdCounter] = useState(1);

  const handleSelectSection = (name: string) => {
    setSelectedSectionName(name);
  };

  const handleCancel = () => {
    setSelectedSectionName(null);
  };

  const handleSubmit = (_data: any) => {
    setSections((prev) => [
      ...prev,
      {
        id: idCounter,
        section_name: selectedSectionName!,
        status: "Active",
      },
    ]);
    setIdCounter((c) => c + 1);
    setSelectedSectionName(null);
  };

  return (
    <div className="space-y-6">
      {!selectedSectionName && (
        <AddSectionForm onSelectSection={handleSelectSection} />
      )}

      {selectedSectionName && (
        <FormKit
          sectionName={selectedSectionName}
          onCancel={handleCancel}
          onSubmit={handleSubmit}
        />
      )}

      {!selectedSectionName && <SectionDataTable data={sections} />}
    </div>
  );
};
