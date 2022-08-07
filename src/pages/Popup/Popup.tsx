import React, { useEffect, useState } from 'react';
import registerMidEndHandlers from '../Background/registerMidEndHandlers';
import { API_KEY } from './util/constants';
import sendMidEnd from './util/sendMidEnd';

export default function Popup() {
  console.log('ZThis is the popup page baby');
  useEffect(() => {
    // Example of how to send a message to eventPage.ts.
    chrome.runtime.sendMessage({ popupMounted: true });
  }, []);

  useEffect(() => {
    return registerMidEndHandlers({
      paste: async (data) => {
        console.log('PASTE IN POPUP', data);
      },
    });
  });

  return <MainInterface />;
}

export function MainInterface() {
  const updateApiKey = (apiKey: string) => {
    chrome.storage.sync.set({ apiKey });
  };

  const updateEnabled = (enabled: boolean) => {
    chrome.storage.sync.set({ enabled });
  };

  return (
    <div className="inline-flex flex-col items-start justify-start gap-2.5 bg-white px-2.5 pt-[17px] pb-[17px]">
      <div className="w-[280px] gap-[3px]">
        <div className="flex w-full flex-col items-start justify-start rounded border border-solid border-[rgba(0,0,0,0.23)] px-3">
          <div className="flex h-0.5 items-center justify-start gap-2.5 bg-white px-1">
            <div>
              <p className="font-['Roboto'] text-xs leading-3 text-[rgba(0,0,0,0.6)] bg-white">
                API Key
              </p>
            </div>
          </div>
          <div className="flex w-full">
            <div className="flex w-full items-start justify-start gap-2 overflow-clip pt-[15px] pb-[15px]">
              <div className="flex h-full flex-1">
                <div className="flex h-full flex-1 flex-grow items-start justify-start overflow-clip">
                  <input
                    type="password"
                    className="flex-1 font-['Roboto'] text-base leading-6 text-gray-700 focus-visible:outline-none"
                    placeholder={'Using Saved API Key'}
                    onChange={(e) => updateApiKey(e.target.value)}
                  />
                  <BxHelpCircle
                    onClick={() => {
                      window.open(
                        'https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token',
                        '_blank'
                      );
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full items-center justify-between">
        <div className="gap-2">
          <div className="flex items-start justify-start gap-2">
            <input
              type="checkbox"
              className="h-[17px] w-[17px] rounded-[3px] border border-solid border-gray-400 bg-[rgba(242,242,242,1)]"
              onChange={(e) => updateEnabled(e.target.checked)}
            />
            <div className="gap-1.5">
              <p className="font-['Inter'] text-sm font-medium leading-[normal] text-gray-700">
                Enabled
              </p>
            </div>
          </div>
        </div>
        {/* TODO: Add a MADE WITH kinda sticker thingamajig */}
        <div
          onClick={() => {
            window.open('https://www.firejet.io', '_blank');
          }}
          className="cursor-pointer h-[38px] w-10 bg-[url(https://uortjlczjmucmpaqqhqm.supabase.co/storage/v1/object/public/firejet-converted-images/7427/56a5c813cb79fbe555305cdedd6a17076c7dd559.webp)] bg-cover"
        />
      </div>
    </div>
  );
}

interface HelpCircleProps {
  onClick: () => void;
}

function BxHelpCircle(props: HelpCircleProps) {
  return (
    <div onClick={props.onClick} className="h-6 w-6 cursor-pointer">
      <svg
        width="100%"
        height="100%"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 6C10.9571 6.00132 9.95723 6.41622 9.21974 7.1537C8.48226 7.89118 8.06736 8.89104 8.06604 9.934H10.066C10.066 8.867 10.934 8 12 8C13.066 8 13.934 8.867 13.934 9.934C13.934 10.532 13.453 10.966 12.718 11.56C12.4779 11.7481 12.2473 11.948 12.027 12.159C11.029 13.156 11 14.215 11 14.333V15H13L12.999 14.367C13 14.351 13.032 13.981 13.44 13.574C13.59 13.424 13.779 13.274 13.975 13.116C14.754 12.485 15.933 11.532 15.933 9.934C15.9322 8.89106 15.5177 7.89104 14.7803 7.15347C14.0429 6.41591 13.043 6.00106 12 6ZM11 16H13V18H11V16Z"
          fill="#374151"
        />
        <path
          d="M12 2C6.486 2 2 6.486 2 12C2 17.514 6.486 22 12 22C17.514 22 22 17.514 22 12C22 6.486 17.514 2 12 2ZM12 20C7.589 20 4 16.411 4 12C4 7.589 7.589 4 12 4C16.411 4 20 7.589 20 12C20 16.411 16.411 20 12 20Z"
          fill="#374151"
        />
      </svg>
    </div>
  );
}

function GenerateButton(props: GenerateButtonInterface) {
  return (
    <>
      {props.firejetVariant === 'STATE=ENABLED_TYPE0' && (
        <div className="inline-flex">
          <div className="flex items-center justify-center gap-2.5 overflow-clip rounded-[10px] bg-gray-800 p-3.5">
            <FluentFlashSettings24Filled />
            <p className="font-['Inter'] text-base font-medium leading-[normal] text-[rgba(242,242,242,1)]">
              Create Gist
            </p>
          </div>
        </div>
      )}
    </>
  );
}

GenerateButton.defaultProps = {
  firejetVariant: 'STATE=ENABLED_TYPE0',
};

interface GenerateButtonInterface {
  firejetVariant: 'STATE=ENABLED_TYPE0';
}

function FluentFlashSettings24Filled() {
  return (
    <div className="h-6 w-6">
      <svg
        width="100%"
        height="100%"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.42398 2.83C7.51067 2.587 7.67043 2.37677 7.88134 2.22817C8.09225 2.07956 8.34397 1.99986 8.60198 2H15.055C15.253 1.99999 15.4482 2.04704 15.6245 2.13727C15.8008 2.2275 15.9532 2.35832 16.069 2.51897C16.1848 2.67962 16.2608 2.86548 16.2907 3.06125C16.3206 3.25703 16.3036 3.4571 16.241 3.645L14.79 8H18.748C19.852 8 20.414 9.327 19.646 10.12L18.688 11.108C17.6333 10.9115 16.5463 10.9791 15.5241 11.3048C14.5018 11.6305 13.5761 12.2042 12.8295 12.9747C12.0829 13.7452 11.5386 14.6885 11.2452 15.7204C10.9518 16.7524 10.9184 17.841 11.148 18.889L8.58498 21.536C7.53098 22.624 5.71298 21.642 6.04398 20.164L7.31398 14.496L5.74398 14.49C5.46433 14.4888 5.18904 14.4206 4.94118 14.2911C4.69332 14.1616 4.48011 13.9745 4.3194 13.7457C4.1587 13.5168 4.05518 13.2528 4.01752 12.9757C3.97987 12.6985 4.00917 12.4165 4.10298 12.153L7.42398 2.831V2.83ZM14.277 13.976C14.3516 14.2345 14.3733 14.5055 14.3407 14.7726C14.3082 15.0397 14.222 15.2975 14.0875 15.5306C13.9529 15.7636 13.7728 15.9671 13.5577 16.1289C13.3427 16.2906 13.0972 16.4073 12.836 16.472L12.252 16.617C12.1584 17.2159 12.1604 17.8258 12.258 18.424L12.798 18.554C13.0616 18.6175 13.3095 18.7339 13.5267 18.8962C13.7439 19.0585 13.9258 19.2632 14.0614 19.4979C14.197 19.7327 14.2835 19.9926 14.3156 20.2618C14.3477 20.531 14.3247 20.8039 14.248 21.064L14.061 21.695C14.501 22.081 15.001 22.395 15.546 22.617L16.039 22.098C16.2258 21.9015 16.4506 21.745 16.6998 21.6381C16.949 21.5312 17.2173 21.476 17.4885 21.476C17.7596 21.476 18.028 21.5312 18.2771 21.6381C18.5263 21.745 18.7512 21.9015 18.938 22.098L19.437 22.624C19.9781 22.4037 20.4789 22.0952 20.919 21.711L20.721 21.025C20.6464 20.7664 20.6247 20.4954 20.6574 20.2282C20.69 19.961 20.7762 19.7032 20.9108 19.4701C21.0455 19.2371 21.2258 19.0336 21.4409 18.8719C21.6561 18.7102 21.9017 18.5935 22.163 18.529L22.746 18.384C22.8396 17.7851 22.8376 17.1752 22.74 16.577L22.2 16.447C21.9365 16.3834 21.6887 16.2669 21.4716 16.1046C21.2545 15.9423 21.0727 15.7375 20.9372 15.5028C20.8017 15.268 20.7153 15.0082 20.6833 14.739C20.6513 14.4698 20.6743 14.197 20.751 13.937L20.937 13.306C20.497 12.9184 19.9954 12.6068 19.453 12.384L18.96 12.902C18.7731 13.0987 18.5482 13.2553 18.299 13.3623C18.0497 13.4693 17.7813 13.5245 17.51 13.5245C17.2387 13.5245 16.9703 13.4693 16.721 13.3623C16.4717 13.2553 16.2468 13.0987 16.06 12.902L15.562 12.377C15.018 12.597 14.518 12.907 14.079 13.29L14.277 13.976ZM17.5 19C16.7 19 16.05 18.329 16.05 17.5C16.05 16.672 16.7 16 17.5 16C18.3 16 18.95 16.672 18.95 17.5C18.95 18.329 18.3 19 17.5 19Z"
          fill="#F2F2F2"
        />
      </svg>
    </div>
  );
}

function CopyButton() {
  return (
    <div className="h-6 w-[25px]">
      <svg
        width="100%"
        height="100%"
        preserveAspectRatio="none"
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.2824 0.5H4.52931C3.36029 0.5 2.40381 1.44091 2.40381 2.59091V17.2273H4.52931V2.59091H17.2824V0.5ZM20.4706 4.68182H8.78033C7.6113 4.68182 6.65482 5.62273 6.65482 6.77273V21.4091C6.65482 22.5591 7.6113 23.5 8.78033 23.5H20.4706C21.6396 23.5 22.5961 22.5591 22.5961 21.4091V6.77273C22.5961 5.62273 21.6396 4.68182 20.4706 4.68182ZM20.4706 21.4091H8.78033V6.77273H20.4706V21.4091Z"
          fill="#F2F2F2"
        />
      </svg>
    </div>
  );
}
