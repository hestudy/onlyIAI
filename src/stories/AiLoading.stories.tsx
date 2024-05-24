import AiLoading from "@/components/AiLoading";
import type { Meta, StoryObj } from "@storybook/react";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof AiLoading> = {
  component: AiLoading,
};

export default meta;
type Story = StoryObj<typeof AiLoading>;

export const FirstStory: Story = {
  args: {
    //👇 The args you need here will depend on your component
  },
};
