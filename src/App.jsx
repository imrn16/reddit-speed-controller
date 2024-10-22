import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { PiFastForwardFill, PiRewindFill, PiFastForward, PiRewind } from "react-icons/pi";

const App = () => {
	const [speed, setSpeed] = useState(1.0);
	const [prevSpeed, setPrevSpeed] = useState(1.0);
	const [isVisible, setIsVisible] = useState(false);
	const [toggleVisible, setToggleVisible] = useState(true);

	const mouseTimeoutRef = useRef(null);
	const boostIntervalRef = useRef(null);

	// const [btnFFClicked, setBtnFFClicked] = useState(false);
	// const [btnRWClicked, setBtnRWClicked] = useState(false);

	useEffect(() => {
		const video = document.querySelector("video");
		if (video) {
			video.playbackRate = speed;
		}

		const handleKeyDown = (e) => {
			if (e.key === "[") {
				decreaseSpeed();
			} else if (e.key === "]") {
				increaseSpeed();
			} else if (e.key === `\\`) {
				if (!boostIntervalRef.current) {
					setPrevSpeed(speed);
					boostSpeed();
					boostIntervalRef.current = setInterval(boostSpeed, 100);
				}
				//boost view
			} else if (e.key === `;`) {
				resetSpeed();
				//hide
			} else if (e.key === `'`) {
				setToggleVisible(!toggleVisible);
				//hide view
			}
		};

		const handleKeyUp = (e) => {
			if (e.key === `\\`) {
				clearInterval(boostIntervalRef.current);
				boostIntervalRef.current = null;
				setSpeed(prevSpeed);
			}
		};

		const handleMouseEnter = (e) => {
			if (!e.relatedTarget || e.relatedTarget.closest("#yt-speed-controls") === null) {
				setIsVisible(true);
			}
			if (mouseTimeoutRef.current) {
				clearTimeout(mouseTimeoutRef.current);
			}
			mouseTimeoutRef.current = setTimeout(() => {
				setIsVisible(false);
			}, 3000);
		};

		const handleMouseMove = (e) => {
			if (e.target.closest("video")) {
				if (!isVisible) setIsVisible(true);
				if (mouseTimeoutRef.current) {
					clearTimeout(mouseTimeoutRef.current);
				}
				mouseTimeoutRef.current = setTimeout(() => {
					setIsVisible(false);
				}, 3000);
			}
		};

		const handleMouseLeave = (e) => {
			if (!e.relatedTarget || e.relatedTarget.closest("#yt-speed-controls") === null) {
				setIsVisible(false);
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		document.addEventListener("keyup", handleKeyUp);
		document.addEventListener("mousemove", handleMouseMove);

		const videoElement = document.querySelector("video");
		if (videoElement) {
			videoElement.addEventListener("mouseenter", handleMouseEnter);
			videoElement.addEventListener("mouseleave", handleMouseLeave);
		}

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
			document.removeEventListener("keyup", handleKeyUp);
			document.removeEventListener("mousemove", handleMouseMove);
			if (videoElement) {
				videoElement.removeEventListener("mouseenter", handleMouseEnter);
				videoElement.removeEventListener("mouseleave", handleMouseLeave);
			}
		};
	}, [speed, isVisible, toggleVisible]);

	const increaseSpeed = () => {
		setSpeed((prevSpeed) => Math.min(prevSpeed + 0.25, 16.0));
		if (!isVisible) setIsVisible(true);
		if (mouseTimeoutRef.current) {
			clearTimeout(mouseTimeoutRef.current);
		}
		mouseTimeoutRef.current = setTimeout(() => {
			setIsVisible(false);
		}, 3000);
	};

	const decreaseSpeed = () => {
		setSpeed((prevSpeed) => Math.max(prevSpeed - 0.25, 0.25));
		if (!isVisible) setIsVisible(true);
		if (mouseTimeoutRef.current) {
			clearTimeout(mouseTimeoutRef.current);
		}
		mouseTimeoutRef.current = setTimeout(() => {
			setIsVisible(false);
		}, 3000);
	};

	const resetSpeed = () => {
		setSpeed(1.0);
		if (!isVisible) setIsVisible(true);
		if (mouseTimeoutRef.current) {
			clearTimeout(mouseTimeoutRef.current);
		}
		mouseTimeoutRef.current = setTimeout(() => {
			setIsVisible(false);
		}, 3000);
	};

	const boostSpeed = () => {
		setSpeed(16.0);
		if (!isVisible) setIsVisible(true);
		if (mouseTimeoutRef.current) {
			clearTimeout(mouseTimeoutRef.current);
		}
		mouseTimeoutRef.current = setTimeout(() => {
			setIsVisible(false);
		}, 3000);
	};

	return (
		toggleVisible &&
		isVisible && (
			<div
				id="yt-speed-controls"
				className="absolute mybox top-4 right-20 h-12 text-sm w-40 bg-neutral-900 bg-opacity-70 text-white rounded-full flex items-center z-50 pointer-events-auto">
				<div className="flex justify-center mr-auto w-1/3 hover:bg-opacity-50 bg-opacity-0 bg-neutral-500 rounded-r-cust rounded-l-full h-12 justify-items-center align-center bg-prple-600">
					<button
						className="flex justify-center items-center h bg-rd-700 w-full hovr:text-red-500 bg-netral-400 focus:outline-none"
						onClick={decreaseSpeed}>
						<span className="icon">
							<PiRewind
								className="rewind-icon"
								size={"16"}
							/>
							<PiRewindFill
								className="rewind-fill-icon hidden"
								size={"16"}
							/>
						</span>
					</button>
				</div>

				<div className="h-6 w-px bg-gray-400"></div>

				<div className="flex w-1/2 h-12  justify-between bg-rd-900 hover:bg-opacity-50 bg-opacity-0 bg-neutral-500 rounded-lg">
					<button
						className="flex items-center justify-center bg-gren-400 w-full h-full text-xl font-bold focus:outline-none"
						style={{ userSelect: "none" }}
						onClick={resetSpeed}>
						{speed.toFixed(2)}
					</button>
				</div>

				<div className="h-6 w-px bg-gray-400"></div>

				<div className="flex justify-center mr-auto w-1/3 hover:bg-opacity-50 bg-opacity-0 bg-neutral-500 rounded-l-cust rounded-r-full h-12 justify-items-center align-center bg-prple-600">
					<button
						className="flex justify-center items-center h bg-rd-700 w-full hovr:text-red-500 bg-netral-400 focus:outline-none"
						onClick={increaseSpeed}>
						<span className="icon">
							<PiFastForward
								className="forward-icon"
								size={"16"}
							/>
							<PiFastForwardFill
								className="forward-fill-icon hidden"
								size={"16"}
							/>
						</span>
					</button>
				</div>
			</div>
		)
	);
};

export default App;