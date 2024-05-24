import MessageRender from "@/components/MessageRender";
import type { Meta, StoryObj } from "@storybook/react";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof MessageRender> = {
  component: MessageRender,
};

export default meta;
type Story = StoryObj<typeof MessageRender>;

export const FirstStory: Story = {
  args: {
    //👇 The args you need here will depend on your component
    md: '要在 TypeScript 中实现单例模式，可以使用类和静态属性来实现。以下是一个示例代码，演示了如何在 TypeScript 中实现单例模式：\n\n```typescript\nclass Singleton {\n    private static instance: Singleton;\n\n    private constructor() {\n        // 私有构造函数，防止外部实例化\n    }\n\n    public static getInstance(): Singleton {\n        if (!Singleton.instance) {\n            Singleton.instance = new Singleton();\n        }\n        return Singleton.instance;\n    }\n\n    public greet(): void {\n        console.log("Hello! I am a singleton instance.");\n    }\n}\n\n// 使用单例模式\nconst singletonInstance1 = Singleton.getInstance();\nsingletonInstance1.greet();\n\nconst singletonInstance2 = Singleton.getInstance();\nsingletonInstance2.greet();\n\nconsole.log(singletonInstance1 === singletonInstance2); // true，两个实例相同\n```\n\n在上面的示例中，Singleton 类具有一个私有静态属性 instance，用于存储单例实例。getInstance 方法用于获取单例实例，如果实例不存在，则创建一个新实例并返回。通过调用 getInstance 方法，可以确保始终获得相同的单例实例。\n\n请注意，以上示例仅演示了一种简单的单例模式实现方式，实际应用中可能会根据具体需求进行调整和扩展。',
  },
};
