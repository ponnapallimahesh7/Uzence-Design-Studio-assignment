// src/App.tsx
import React from "react";
import { DataTable } from "./components/DataTable/DataTable";
import { InputField } from "./components/InputField/InputField";
export default function App() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Demo App</h1>

      <h2>InputField Example</h2>
      <InputField
  label="Name"
  placeholder="Enter your name"
  value=""
  onChange={(e: React.ChangeEvent<HTMLInputElement>) => console.log(e.target.value)}
/>

      <h2 style={{ marginTop: "2rem" }}>DataTable Example</h2>
      <DataTable
        data={[
          { id: 1, name: "Alice", age: 25 },
          { id: 2, name: "Bob", age: 30 },
        ]}
        columns={[
  { key: "id", title: "ID", dataIndex: "id" },
  { key: "name", title: "Name", dataIndex: "name" },
  { key: "age", title: "Age", dataIndex: "age" },
]}

      />
    </div>
  );
}
