// The function that hides a given element
function hideElement(item) {
	item.style.display = "none";
}

function hideGoogleTabs() {
	chrome.storage.managed.get(["udmList"], async (data) => {
		const allowedUdmCodes = data.udmList || [];

		let searchTabs = document.querySelectorAll("a[href^='/search']");
		for (let i = 0; i < searchTabs.length; i++) {
			let udmCodeIndex = searchTabs[i].href.indexOf("&udm=");
			if (udmCodeIndex < 0) { // No UDM code found
				hideElement(searchTabs[i]);
				continue;
			}
			
			udmCodeIndex+=5 // Add 5 to index (there are 5 characters in "&udm=")
			
			let udmCode = searchTabs[i].href.substring(udmCodeIndex, searchTabs[i].href.indexOf("&", udmCodeIndex));
			
			if (!(allowedUdmCodes.includes(udmCode))) {
				console.log("UDM code is " + udmCode + ". Hiding element...");
				hideElement(searchTabs[i]);
			}
		}
	});
}

function redirectUrl() {
	chrome.storage.managed.get(["defaultUDM","udmList"], async (data) => {
		// Get Current URL UDM Index
		let currentUdmIndex = window.location.href.indexOf("&udm=");

		if (currentUdmIndex < 0) // No UDM code found
			window.location.href = window.location.href + "&udm=" + data.defaultUDM; // Append default UDM code
		else {
			currentUdmIndex+=5; // Add 5 to index (there are 5 characters in "&udm=")

			let currentUdmCode = window.location.href.substring(currentUdmIndex, window.location.href.indexOf("&", currentUdmIndex));

			const allowedUdmCodes = data.udmList || [];
			
			if (!(allowedUdmCodes.includes(currentUdmCode))) {
				console.log("Current URL UDM code is '" + currentUdmCode + "'. Appending UDM code '" + data.defaultUDM + "' to URL.");
				let newUrl = window.location.href.replace("udm=" + currentUdmCode, "udm=" + data.defaultUDM);
				window.location.href = newUrl;
			}
		}
	});
}

// Run immediately in case it's already there
redirectUrl();
hideGoogleTabs();

// Create an observer to watch for page changes
const observer = new MutationObserver((mutations) => {
	hideGoogleTabs();
});

// Start the observer
observer.observe(document.body, {
	childList: true,
	subtree: true
});