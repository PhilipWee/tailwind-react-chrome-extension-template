export default function sendMidEnd(
  eventName: string,
  eventData: any,
  callback?: (data: any) => void
) {
  chrome.runtime.sendMessage({ eventName, eventData }, callback);
}
