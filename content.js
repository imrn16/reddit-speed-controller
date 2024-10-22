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
              controlsContainer.style.height = "50px";
              controlsContainer.style.zIndex = "1000";
              controlsContainer.style.backgroundColor = "rgba(0, 0, 0, 0.5)"; 
              controlsContainer.style.padding = "10px";
              controlsContainer.style.borderRadius = "5px";
              controlsContainer.style.display = "flex";
              controlsContainer.style.flexDirection = "column";
              controlsContainer.style.alignItems = "center";
              controlsContainer.style.justifyContent = "center";

              const shadowRoot = controlsContainer.attachShadow({ mode: 'open' });
              const container = document.createElement("div");
              shadowRoot.appendChild(container);

              // Load Tailwind CSS
              console.log('Appending CSS');
              const link = document.createElement("link");
              link.rel = "stylesheet";
              link.href = chrome.runtime.getURL("dist/assets/index.css");
              container.appendChild(link);

              // Speed control components
              const speedControl = document.createElement("div");
              speedControl.style.display = "flex";
              speedControl.style.alignItems = "center";
              speedControl.style.justifyContent = "space-between";
              speedControl.style.width = "100%";

              const decrementButton = document.createElement("button");
              decrementButton.innerText = "-";
              decrementButton.style.marginRight = "10px";
              decrementButton.style.padding = "5px";
              decrementButton.style.borderRadius = "5px";
              decrementButton.style.backgroundColor = "#fff";
              decrementButton.style.color = "#000";
              decrementButton.style.fontSize = "16px";
              decrementButton.style.cursor = "pointer";

              const incrementButton = document.createElement("button");
              incrementButton.innerText = "+";
              incrementButton.style.marginLeft = "10px";
              incrementButton.style.padding = "5px";
              incrementButton.style.borderRadius = "5px";
              incrementButton.style.backgroundColor = "#fff";
              incrementButton.style.color = "#000";
              incrementButton.style.fontSize = "16px";
              incrementButton.style.cursor = "pointer";

              const speedDisplay = document.createElement("div");
              speedDisplay.innerText = "1.0x";
              speedDisplay.style.fontSize = "16px";
              speedDisplay.style.color = "#fff";

              speedDisplay.addEventListener("click", () => {
                video.playbackRate = 1.0;
                speedDisplay.innerText = `${video.playbackRate.toFixed(2)}x`;
              })

              decrementButton.addEventListener("click", () => {
                  video.playbackRate = Math.max(0.25, parseFloat(video.playbackRate) - 0.25);
                  speedDisplay.innerText = `${video.playbackRate.toFixed(2)}x`;
              });

              incrementButton.addEventListener("click", () => {
                  video.playbackRate = Math.min(25.0, parseFloat(video.playbackRate) + 0.25);
                  speedDisplay.innerText = `${video.playbackRate.toFixed(2)}x`;
              });

              speedControl.appendChild(decrementButton);
              speedControl.appendChild(speedDisplay);
              speedControl.appendChild(incrementButton);

              container.appendChild(speedControl);

              // Load React app
              console.log('Appending app');
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
          node.shadowRoot.querySelectorAll('*').forEach(traverseShadowRoots);
      } else {
          node.querySelectorAll('*').forEach((childNode) => {
              if (childNode.shadowRoot) {
                  checkForVideos(childNode.shadowRoot);
                  childNode.shadowRoot.querySelectorAll('*').forEach(traverseShadowRoots);
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
