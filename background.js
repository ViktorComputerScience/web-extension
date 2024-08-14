function sortTabsAlphabetically() {

    chrome.tabs.query({currentWindow: true}, (tabs) => {

        let filteredTabs = tabs.filter((tab) => tab.title && tab.title !== 'New Tab');

        filteredTabs.sort((a, b) => a.title.localeCompare(b.title));

        for (let i = 0; i < filteredTabs.length; i++) {
            chrome.tabs.move(filteredTabs[i].id, {index: i});
        }

    });
}

chrome.tabs.onUpdated.addListener((tabID, changeInfo, tab) => {

    if (changeInfo.status === 'complete') {
        sortTabsAlphabetically();
    }

});