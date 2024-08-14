function sortTabsAlphabetically() {

    chrome.tabs.query({currentWindow: true}, (tabs) => {

        tabs.sort((a, b) => a.title.localeCompare(b.title));

        for (let i = 0; i < tabs.length; i++) {
            chrome.tabs.move(tabs[i].id, {index: i});
        }
    });
}

chrome.tabs.onCreated.addListener(() => {
    sortTabsAlphabetically();
})