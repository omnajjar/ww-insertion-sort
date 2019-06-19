import handleMessage from "./worker.handleMessage";

export default function initialize() {
  self.addEventListener("message", message => {
    const messageData = message.data;
    handleMessage(messageData);
  });
}
