import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { DataTable } from "./DataTable";                 // ✅ Your DataTable component

// Define your User type
type User = {
  id: string;
  name: string;
  email: string;
};

const meta: Meta<typeof DataTable<User>> = {
  title: "Components/DataTable",
  component: DataTable<User>,
};
export default meta;

type Story = StoryObj<typeof DataTable<User>>;

export const Default: Story = {
  args: {
    data: [
      { id: "1", name: "Alice", email: "alice@example.com" },
      { id: "2", name: "Bob", email: "bob@example.com" },
    ],
    columns: [
      { key: "name", title: "Name", dataIndex: "name" },
      { key: "email", title: "Email", dataIndex: "email" },
    ],
    selectable: true,
  },
};
