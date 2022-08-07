export default function sendMidEnd(
  eventName: string,
  eventData: any,
  callback?: (data: any) => void
) {
  console.log("SENDING MID END:", eventName)
  chrome.runtime.sendMessage({ eventName, eventData }, callback);
}
