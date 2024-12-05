(function () {
	console.log("content.js loaded");

	const videoPlayerSelector = "shreddit-player, shreddit-player-2";

	function checkForVideos(node) {
		const videoElements = node.querySelectorAll(videoPlayerSelector);

		videoElements.forEach((videoContainer) => {
			const video = videoContainer.shadowRoot.querySelector("video");
			if (video && !video.hasAttribute("data-speed-control")) {
				console.log("Adding speed control to video:", video);
				video.setAttribute("data-speed-control", "true");

				const controlsContainer = document.createElement("div");
				controlsContainer.id = "speed-controls";
				controlsContainer.style.position = "absolute";
				controlsContainer.style.top = "10px";
				controlsContainer.style.right = "10px";
				controlsContainer.style.width = "120px";
				controlsContainer.style.height = "34px";
				controlsContainer.style.zIndex = "1000";
				controlsContainer.style.backgroundColor = "rgba(23, 23, 23, 0.7)";
				controlsContainer.style.backdropFilter = `blur(5px)`;
				//controlsContainer.style.padding = "10px";
				//controlsContainer.style.borderRadius = "5px";
				controlsContainer.style.display = "flex";
				controlsContainer.style.flexDirection = "column";
				controlsContainer.style.alignItems = "center";
				controlsContainer.style.justifyContent = "center";
				controlsContainer.style.borderRadius = "9999px";
				//controlsContainer.style.border = "2px solid rgba(255, 255, 255, 0.2)";

				const shadowRoot = controlsContainer.attachShadow({ mode: "open" });
				const container = document.createElement("div");
				shadowRoot.appendChild(container);

				// Load Tailwind CSS
				console.log("Appending CSS");
				const link = document.createElement("link");
				link.rel = "stylesheet";
				link.href = chrome.runtime.getURL("dist/assets/index.css");
				container.appendChild(link);

				// Speed control components
				const speedControl = document.createElement("div");
				speedControl.style.display = "flex";
				speedControl.style.alignItems = "center";
				speedControl.style.justifyContent = "space-between";
				speedControl.style.height = "100%";
				speedControl.style.width = "120px";
				speedControl.style.height = "34px";
				//speedControl.style.backgroundColor = "rgba(50, 255, 50, 1)";
				speedControl.style.borderRadius = "9999px";

				const decrementButton = document.createElement("button");
				decrementButton.innerText = "<<";
				//decrementButton.style.marginRight = "15px";
				//decrementButton.style.padding = "5px";
				//decrementButton.style.backgroundColor = "rgba(0, 0, 0, 0)";
				decrementButton.style.borderRadius = "9999px";
				decrementButton.style.borderTopLeftRadius = "9999px";
				decrementButton.style.borderBottomLeftRadius = "9999px";
				decrementButton.style.borderTopRightRadius = "3000px";
				decrementButton.style.borderBottomRightRadius = "3000px";
				decrementButton.style.height = "30px";
				decrementButton.style.marginLeft = "2px";
				decrementButton.style.color = "#ffffff";
				decrementButton.style.textCol = "#ffffff";
				decrementButton.style.fontSize = "16px";
				decrementButton.style.cursor = "pointer";
				//decrementButton.style.backgroundColor = "rgba(50, 255, 255, 1)";
				decrementButton.style.width = "35px";
				decrementButton.style.display = "flex";
				decrementButton.style.alignItems = "center";
				decrementButton.style.justifyContent = "center";
				decrementButton.style.alignSelf = "center";
				//decrementButton.style.height = '100%'
				//decrementButton.style.width = '33.33%'

				const incrementButton = document.createElement("button");
				incrementButton.innerText = ">>";
				//incrementButton.style.marginLeft = "15px";
				//incrementButton.style.paddingLeft = "8px";
				//incrementButton.style.paddingRight = "8px";
				//incrementButton.style.height = '100%'
				//incrementButton.style.marginLeft = '10px'
				//incrementButton.style.backgroundColor = "rgba(255, 255, 255, 0)";
				incrementButton.style.borderTopRightRadius = "9999px";
				incrementButton.style.borderBottomRightRadius = "9999px";
				incrementButton.style.borderTopLeftRadius = "3000px";
				incrementButton.style.borderBottomLeftRadius = "3000px";
				incrementButton.style.color = "#ffffff";
				incrementButton.style.fontSize = "16px";
				incrementButton.style.cursor = "pointer";
				incrementButton.style.width = "35px";
				incrementButton.style.height = "30px";
				incrementButton.style.marginRight = "2px";
				incrementButton.style.display = "flex";
				incrementButton.style.alignItems = "center";
				incrementButton.style.justifyContent = "center";
				incrementButton.style.alignSelf = "center";
				//incrementButton.style.paddingTop = '2px'
				//incrementButton.style.paddingBottom = '2px'

				const speedDisplay = document.createElement("div");
				speedDisplay.innerText = "1.00";
				speedDisplay.style.fontSize = "14px";
				speedDisplay.style.fontWeight = "bold";
				speedDisplay.style.color = "#fff";
				//speedDisplay.style.backgroundColor = 'green'
				//speedDisplay.style.width = '100%'
				speedDisplay.style.cursor = "pointer";
				//speedDisplay.style.width = "40px";
				speedDisplay.style.display = "flex";
				speedDisplay.style.alignItems = "center";
				speedDisplay.style.justifyContent = "center";
				speedDisplay.style.alignSelf = "center";
				speedDisplay.style.justifySelf = "center";
				speedDisplay.style.borderRadius = "5px";
				speedDisplay.style.width = "50px";
				speedDisplay.style.height = "30px";

				speedDisplay.addEventListener("click", () => {
					video.playbackRate = 1.0;
					speedDisplay.innerText = `${video.playbackRate.toFixed(2)}`;
				});

				speedDisplay.addEventListener("selectstart", (e) => e.preventDefault());

				decrementButton.addEventListener("click", () => {
					video.playbackRate = Math.max(0.25, parseFloat(video.playbackRate) - 0.25);
					speedDisplay.innerText = `${video.playbackRate.toFixed(2)}`;
				});

				incrementButton.addEventListener("click", () => {
					video.playbackRate = Math.min(25.0, parseFloat(video.playbackRate) + 0.25);
					speedDisplay.innerText = `${video.playbackRate.toFixed(2)}`;
				});

				decrementButton.addEventListener("mouseover", () => {
					decrementButton.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
				});
				decrementButton.addEventListener("mouseout", () => {
					decrementButton.style.backgroundColor = "rgba(50, 50, 50, 0)";
				});

				speedDisplay.addEventListener("mouseover", () => {
					speedDisplay.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
				});
				speedDisplay.addEventListener("mouseout", () => {
					speedDisplay.style.backgroundColor = "rgba(50, 50, 50, 0)";
				});

				// Set up hover effects for incrementButton
				incrementButton.addEventListener("mouseover", () => {
					incrementButton.style.backgroundColor = "rgba(255, 255, 255, 0.1)"; // adjust to desired opacity
				});
				incrementButton.addEventListener("mouseout", () => {
					incrementButton.style.backgroundColor = "rgba(50, 50, 50, 0)"; // return to full opacity
				});

				document.addEventListener("keydown", (event) => {
					if (event.key === "]") {
						// Check if the pressed key is ']'
						incrementButton.click(); // Simulate a click on the incrementButton
					}
				});

				document.addEventListener("keydown", (event) => {
					if (event.key === "[") {
						// Check if the pressed key is ']'
						decrementButton.click(); // Simulate a click on the incrementButton
					}
				});

				document.addEventListener("keydown", (event) => {
					if (event.key === ";") {
						// Check if the pressed key is ']'
						speedDisplay.click(); // Simulate a click on the incrementButton
					}
				});

				let prevVal = 1.0;

				// Listen for keydown events
				document.addEventListener("keydown", (event) => {
					if (event.key === `\\`) {
						// Check if the pressed key is '\'
						prevVal = video.playbackRate; // Store the current playback rate
						video.playbackRate = 16.0; // Set playback rate to 16.0
						speedDisplay.innerText = `${video.playbackRate.toFixed(2)}`; // Update display
					}
				});

				// Listen for keyup events
				document.addEventListener("keyup", (event) => {
					if (event.key === `\\`) {
						// Check if the released key is '\'
						video.playbackRate = prevVal; // Restore the previous playback rate
						speedDisplay.innerText = `${video.playbackRate.toFixed(2)}`; // Update display
					}
				});

				document.addEventListener("keydown", (event) => {
					if (event.key === `'`) {
						// Check if the pressed key is '`'
						// Check if the opacity is "0" and toggle it
						if (controlsContainer.style.opacity === "0") {
							controlsContainer.style.opacity = "1"; // Set to 0.5 if currently 0
						} else {
							controlsContainer.style.opacity = "0"; // Set to 0 otherwise
						}
					}
				});

				speedControl.appendChild(decrementButton);
				speedControl.appendChild(speedDisplay);
				speedControl.appendChild(incrementButton);

				container.appendChild(speedControl);

				// Load React app
				console.log("Appending app");
				const script = document.createElement("script");
				script.src = chrome.runtime.getURL("dist/assets/index.js");
				container.appendChild(script);

				const parentElement = videoContainer.closest("shreddit-async-loader");
				if (parentElement) {
					parentElement.style.position = "relative";
					parentElement.insertBefore(controlsContainer, videoContainer);
					console.log("Speed control added:", controlsContainer);
				} else {
					console.warn("Parent element not found for video:", video);
				}
			}
		});
	}

	function traverseShadowRoots(node) {
		if (node.shadowRoot) {
			checkForVideos(node.shadowRoot);
			node.shadowRoot.querySelectorAll("*").forEach(traverseShadowRoots);
		} else {
			node.querySelectorAll("*").forEach((childNode) => {
				if (childNode.shadowRoot) {
					checkForVideos(childNode.shadowRoot);
					childNode.shadowRoot.querySelectorAll("*").forEach(traverseShadowRoots);
				}
			});
		}
	}

	const observer = new MutationObserver((mutations) => {
		console.log("Mutation observed");

		mutations.forEach((mutation) => {
			mutation.addedNodes.forEach((node) => {
				if (node.nodeType === 1) {
					checkForVideos(node);
					traverseShadowRoots(node);
				}
			});
		});
	});

	observer.observe(document.body, { childList: true, subtree: true });
	console.log("Observer started");

	// Polling to ensure dynamic elements get checked
	setInterval(() => {
		console.log("Interval check for videos");
		checkForVideos(document.body);
		traverseShadowRoots(document.body);
	}, 3000); // Adjust interval as needed
})();
