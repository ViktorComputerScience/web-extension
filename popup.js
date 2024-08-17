document.addEventListener('DOMContentLoaded', () => {

    const toggleSwitch = document.getElementById('toggle-sort');
    const switchContainer = document.querySelector('.cl-switch');

    switchContainer.classList.add('no-transition');

    chrome.storage.local.get(['isSortEnabled'], (storedValues) => {
        
        if (storedValues.isSortEnabled !== undefined) {
            toggleSwitch.checked = storedValues.isSortEnabled;
        }

        void toggleSwitch.offsetWidth;

        setTimeout(() => {
            switchContainer.classList.remove('no-transition');
        }, 0);

    });

    toggleSwitch.addEventListener('change', () => {

        const isChecked = toggleSwitch.checked;

        chrome.storage.local.set({ isSortEnabled: isChecked});
        
        if (toggleSwitch.checked) {
            chrome.runtime.sendMessage({action: "enableSort"});

        } else {
            chrome.runtime.sendMessage({action: "disableSort"});
        }

    })

})