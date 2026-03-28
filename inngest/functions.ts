import { createAgent, openai } from "@inngest/agent-kit";
import { inngest } from "./client";

export const processTask = inngest.createFunction(
  { id: "process-task", triggers: { event: "app/task.created" } },
  async ({ event, step }) => {
    const summarizer = createAgent({
      name: "Summarizer",
      system: "You are an expert summarizer. You summarize in 2 words.",
      model: openai({ model: "gpt-4o" }),
    });

    const { output } = await summarizer.run(
      `Summarize the following result: ${event.data.value}`,
    );

    return { output };
  },
);
