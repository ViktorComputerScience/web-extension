const WARNING_TAB_LIMIT = 5;
const MAX_TAB_LIMIT = 10;

// icons from https://www.iconfinder.com/
const DEFAULT_ICON = 'green-icon-128.png';
const WARNING_LIMIT_ICON = 'orange-icon-128.png';
const MAX_LIMIT_ICON = 'red-icon-128.png';

function sortTabsAlphabetically() {

    chrome.tabs.query({currentWindow: true}, (tabs) => {

        let filteredTabs = tabs.filter((tab) => tab.title && tab.title !== 'New Tab');

        filteredTabs.sort((a, b) => a.title.localeCompare(b.title));

        for (let i = 0; i < filteredTabs.length; i++) {
            chrome.tabs.move(filteredTabs[i].id, {index: i});
        }

    });
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {

    if (changeInfo.status === 'complete') {
        sortTabsAlphabetically();
    }

});

// idea from u/zombarista (https://www.reddit.com/r/webdev/comments/17ryy2f/build_a_browser_extension_if_you_want_to_try/)

function updateIcon() {

    chrome.tabs.query({currentWindow: true}, (tabs) => {

        if (tabs.length > MAX_TAB_LIMIT) {

            chrome.action.setIcon({path: MAX_LIMIT_ICON});

        } else if (tabs.length > WARNING_TAB_LIMIT) {

            chrome.action.setIcon({path: WARNING_LIMIT_ICON});

        } else {

            chrome.action.setIcon({path: DEFAULT_ICON});
        }

    });
}

chrome.tabs.onCreated.addListener(updateIcon);
chrome.tabs.onRemoved.addListener(updateIcon);