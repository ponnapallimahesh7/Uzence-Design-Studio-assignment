import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { InputField } from "./InputField";

const meta: Meta<typeof InputField> = {
  title: "Components/InputField",
  component: InputField,
};
export default meta;

export const Default: StoryObj<typeof InputField> = {
  args: {
    label: "Username",
    placeholder: "Enter username",
    helperText: "This is a helper text",
  },
};

export const Error: StoryObj<typeof InputField> = {
  args: {
    label: "Email",
    placeholder: "Enter email",
    invalid: true,
    errorMessage: "Invalid email address",
  },
};
