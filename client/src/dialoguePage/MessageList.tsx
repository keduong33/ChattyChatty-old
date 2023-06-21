import { useDialogueState } from "./DialogueState";

export const MessageList = () => {
  const [messageList] = useDialogueState((state) => [state.messageList]);
  return (
    <div title="Messages List" className="mb-2">
      {messageList.map((message, i) => (
        <div key={i}>
          <div>{message}</div>
        </div>
      ))}
      {/* Maybe find a better way but rn check if there has not been a response --> messageList length is odd */}
      {messageList.length % 2 != 0 && <div>Bot Typing...</div>}
    </div>
  );
};
