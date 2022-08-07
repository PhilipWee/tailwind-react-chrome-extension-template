import { PasteProps } from '../Background';
import { API_KEY } from '../Popup/util/constants';
import sendMidEnd from '../Popup/util/sendMidEnd';

console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

console.log('dss');
document.addEventListener('paste', (event) => {
  const pasteEvent: PasteProps = {
    //@ts-ignore
    text: (event.clipboardData || window.clipboardData).getData('text'),
    currentUrl: window.location.href,
  };

  sendMidEnd('paste', pasteEvent, (result) => {
    const gistUrl = result.data.data.html_url;
    console.log('RESULT', gistUrl);
    navigator.clipboard.writeText(gistUrl);
    alert('Gist URL Copied to clipboard!');
  });

  return false;
});
