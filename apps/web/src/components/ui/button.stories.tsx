import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";

const meta = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost"],
    },
    size: {
      control: "select",
      options: ["md", "lg", "icon"],
    },
    children: {
      control: "text",
    },
  },
  args: {
    children: "Clique-moi",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
export const Secondary: Story = {
  args: { variant: "secondary" },
};
export const Ghost: Story = {
  args: { variant: "ghost" },
};
