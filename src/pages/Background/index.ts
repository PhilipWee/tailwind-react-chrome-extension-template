import registerMidEndHandlers from './registerMidEndHandlers';
import { ModelOperations } from '@vscode/vscode-languagedetection';
import { useUserData } from '../Popup/state/user-data';
// import weights from './data/group1-shard1of1.bin';
import { Octokit } from 'octokit';

console.log('This is the background page.');
console.log('Put the background scripts here.');

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
  const userData = useUserData.getState();
  const octokit = new Octokit({
    auth: userData.apiKey,
  });

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
