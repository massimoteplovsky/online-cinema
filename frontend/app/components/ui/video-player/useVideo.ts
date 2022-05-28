import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { IVideoElement } from './video-player.interface';

export const useVideo = (videoUrl: string) => {
	const videoRef = useRef<IVideoElement>(null);

	const [isPlaying, setIsPlaying] = useState<boolean>(false);
	const [isMuted, setIsMuted] = useState<boolean>(false);
	const [volume, setVolume] = useState<number>(1);
	const [isTouched, setIsTouched] = useState<boolean>(false);
	const [currentTime, setCurrentTime] = useState<number>(0);
	const [videoTime, setVideoTime] = useState<number>(0);
	const [progress, setProgress] = useState<number>(0);

	const setInitialState = useCallback(() => {
		console.log('reset');
		setIsPlaying(false);
		setIsTouched(false);
		setCurrentTime(0);
		setProgress(0);
	}, []);

	useEffect(() => {
		const video = videoRef.current!;
		if (!video) return;

		console.log(video.volume);

		const handleSetVideoParams = () => {
			setVideoTime(video.duration);
			setVolume(video.volume);
		};
		video.addEventListener('loadedmetadata', handleSetVideoParams);

		return () => {
			video.removeEventListener('loadedmetadata', handleSetVideoParams);
		};
	}, [videoUrl]);

	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		const updateProgress = () => {
			setIsTouched(true);
			setCurrentTime(video.currentTime);
			setProgress((video.currentTime / videoTime) * 100);
		};

		video.addEventListener('timeupdate', updateProgress);

		return () => {
			setInitialState();
			video.removeEventListener('timeupdate', updateProgress);
		};
	}, [videoTime, setInitialState]);

	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		const handleResetVideo = () => {
			video.load();
			video.addEventListener('loadedmetadata', setInitialState);
		};
		video.addEventListener('ended', handleResetVideo);

		return () => {
			video.removeEventListener('ended', handleResetVideo);
			video.removeEventListener('loadedmetadata', setInitialState);
		};
	}, [setInitialState]);

	const toggleVideo = useCallback(() => {
		if (!isPlaying) {
			videoRef.current?.play();
			setIsPlaying(true);
			return;
		}
		videoRef.current?.pause();
		setIsPlaying(false);
	}, [isPlaying]);

	const toggleMute = useCallback(() => {
		!isMuted ? setIsMuted(true) : setIsMuted(false);
	}, [isMuted]);

	const forward = () => {
		if (videoRef.current) videoRef.current.currentTime += 10;
	};

	const revert = () => {
		if (videoRef.current) videoRef.current.currentTime -= 10;
	};

	const setVideoCurrentTime = (value: number) => {
		const video = videoRef.current;
		if (!video) return;

		video.currentTime = value;
		setCurrentTime(video.currentTime);
	};

	const setVideoVolume = useCallback((value: number) => {
		const video = videoRef.current;
		if (!video) return;

		setVolume(value);
		setIsMuted(value === 0 ? true : false);
		video.volume = value;
	}, []);

	const setFullScreen = () => {
		const video = videoRef.current;

		if (!video) return;

		if (video.requestFullscreen) {
			video.requestFullscreen();
			return;
		}
		if (video.msRequestFullscreen) {
			video.msRequestFullscreen();
			return;
		}
		if (video.mozRequestFullscreen) {
			video.mozRequestFullscreen();
			return;
		}
		if (video.webkitRequestFullscreen) {
			video.webkitRequestFullscreen();
			return;
		}
	};

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			switch (e.key) {
				case 'ArrowRight':
					forward();
					break;
				case 'ArrowLeft':
					revert();
					break;
				case ' ':
					e.preventDefault();
					toggleVideo();
					break;
				case 'f':
					setFullScreen();
					break;
				default:
					return;
			}
		};

		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [toggleVideo]);

	return useMemo(
		() => ({
			videoRef,
			actions: {
				forward,
				revert,
				setFullScreen,
				toggleVideo,
				toggleMute,
				setVideoVolume,
				setVideoCurrentTime,
			},
			videoParams: {
				isPlaying,
				isMuted,
				isTouched,
				currentTime,
				videoTime,
				progress,
				volume,
			},
		}),
		[
			currentTime,
			isPlaying,
			isMuted,
			progress,
			videoTime,
			toggleVideo,
			toggleMute,
			isTouched,
			volume,
			setVideoVolume,
			setVideoCurrentTime,
		]
	);
};
