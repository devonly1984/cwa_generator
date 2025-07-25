import Sandbox from "@e2b/code-interpreter"
import { AgentResult, TextMessage } from "@inngest/agent-kit";

export const getSandbox = async (sandboxId:string)=>{
    const sandbox = await Sandbox.connect(sandboxId);
    return sandbox;
}
export const lastAssistantTextMessageContent = (result:AgentResult)=>{
    const lastAssistantTextMessageIndex = result.output.findLastIndex(
        (message)=>message.role==='assistant',

    )
    const message = result.output[lastAssistantTextMessageIndex] as
      | TextMessage
      | undefined;
      return message?.content
        ? typeof message.content === "string"
          ? message.content
          : message.content.map((c) => c.text).join("")
        : undefined;

}

/*export const createOrUpdateFiles = async (
  { files },
  { step, network }
) => {
  const newFiles = await step?.run("createOrUpdateFiles", async () => {
    try {
      const updatedFiles = network.state.data.files || {};
      const sandbox = await getSandbox(sandboxId);
      for (const file of files) {
        await sandbox.files.write(file?.path, file.content);
        updatedFiles[file.path] = file.content;
      }
      return updatedFiles;
    } catch (error) {
      return `Error: ${error}`;
    }
  });
  if (typeof newFiles === "object") {
    network.state.data.files = newFiles;
  }
};*/