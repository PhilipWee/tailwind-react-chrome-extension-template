import registerMidEndHandlers from './registerMidEndHandlers';
import { ModelOperations } from '@vscode/vscode-languagedetection';
// import weights from './data/group1-shard1of1.bin';
import { Octokit } from 'octokit';

console.log('This is the background page.');
console.log('Put the background scripts here.');

const run = async () => {
  console.log('APIKEY', await chrome.storage.sync.get('apiKey'));
};

run();

registerMidEndHandlers({
  'open-window': openWindow,
  paste: handlePaste,
});

async function openWindow(data: { url: string; target?: string }) {
  console.log('MID END RECEIVED');
  return data;
}

export interface PasteProps {
  text: string;
  currentUrl: string;
}

export interface PasteReturn {
  data: any;
  error: any;
  status: 'SUCCESS' | 'FAIL';
}

async function handlePaste(data: PasteProps): Promise<PasteReturn> {
  console.log('MID END RECEIVED');
  console.log(data);

  //TODO: Check if enabled
  // const enabled = (await chrome.storage.sync.get('enabled'));
  // console.log(enabled);
  // if (!enabled)
  //   return {
  //     data: null,
  //     error: 'IS_NOT_ENABLED',
  //     status: 'FAIL',
  //   };
  //Detect if on the medium.com website
  const isMedium = true;
  if (!isMedium)
    return {
      data: null,
      error: 'IS_NOT_MEDIUM',
      status: 'FAIL',
    };
  //Detect if code
  const isCode = true;
  if (!isCode)
    return {
      data: null,
      error: 'IS_NOT_CODE',
      status: 'FAIL',
    };
  //Detect extension type
  const extensionType = '.ts';
  //Detect file name
  const fileName = 'code-snippet';
  //Detect description
  const description = 'A Code Snippet';
  //Create Gist
  const apiKey = (await chrome.storage.sync.get('apiKey')).apiKey;
  if (!apiKey)
    return {
      data: null,
      error: 'API_KEY_UNDEFINED',
      status: 'FAIL',
    };

  console.log('BNRRRRRRRRRRR', apiKey);

  const octokit = new Octokit({
    auth: apiKey,
  });

  console.log(octokit);

  const result = await octokit.request('POST /gists', {
    description,
    public: true,
    files: {
      [fileName + extensionType]: {
        content: data.text,
      },
    },
  });
  console.log('RESULT', result);
  //Return Gist URL
  return {
    data: result,
    error: null,
    status: 'SUCCESS',
  };
}
