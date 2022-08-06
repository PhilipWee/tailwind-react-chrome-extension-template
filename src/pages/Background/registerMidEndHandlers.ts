type midEndCallBack = (data: any) => Promise<any>;

export type MidEndHandlers = Record<string, midEndCallBack>;
export default function registerMidEndHandlers(midEndHandlers: MidEndHandlers) {
  const listeners = Object.entries(midEndHandlers).map(
    ([eventName, midEndHandler]) => {
      const myListenerFunc: Parameters<
        typeof chrome.runtime.onMessage.addListener
      >[0] = async (req, sender, sendResponse) => {
        if (req.eventName === eventName) {
          const result = await midEndHandler(req.eventData);
          return sendResponse(result);
        }

        //Send response asynchronously
        return true;
      };

      chrome.runtime.onMessage.addListener(myListenerFunc);

      return myListenerFunc;
    }
  );

  return () => {
    listeners.forEach((listener) =>
      chrome.runtime.onMessage.removeListener(listener)
    );
  };
}
