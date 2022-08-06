import registerMidEndHandlers from './registerMidEndHandlers';

console.log('This is the background page.');
console.log('Put the background scripts here.');

chrome.commands.onCommand.addListener((command) => {
  //@ts-ignore
  chrome.extension.getBackgroundPage()?.console.log(`Command: ${command}`);
});

registerMidEndHandlers({
  'open-window': openWindow,
});

async function openWindow(data: { url: string; target?: string }) {
  console.log('MID END RECEIVED');
  return data;
}
