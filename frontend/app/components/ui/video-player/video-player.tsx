import { FC, useState } from 'react';
import InputRange, { Range } from 'react-input-range';
import 'react-input-range/lib/css/index.css';

import MaterialIcon from '../material-icon';

import { useVideo } from './useVideo';
import { IVideoPlayer } from './video-player.interface';
import s from './video-player.module.scss';

const VideoPlayer: FC<IVideoPlayer> = ({ videoUrl }) => {
	const [isOverPlayer, setIsOverPlayer] = useState(false);
	const {
		videoRef,
		actions: {
			forward,
			revert,
			toggleVideo,
			setFullScreen,
			toggleMute,
			setVideoVolume,
			setVideoCurrentTime,
		},
		videoParams: {
			isPlaying,
			videoTime,
			currentTime,
			progress,
			isTouched,
			isMuted,
			volume,
		},
	} = useVideo(videoUrl);

	console.log(progress);

	const convertTime = (time: number) => {
		const checkZero = (num: number) => (num < 10 ? `0${num}` : num);
		const hours = Math.floor(time / 3600);
		const minutes = Math.floor((time - Number(hours) * 3600) / 60);
		const seconds = Math.floor((time - Number(hours) * 3600) % 60);

		return `${hours > 0 ? `${checkZero(hours)}:` : ''}
        ${checkZero(minutes)}:${checkZero(seconds)}`;
	};

	return (
		<div
			className={s.wrapper}
			onMouseEnter={() => setIsOverPlayer(true)}
			onMouseLeave={() => setIsOverPlayer(false)}
		>
			<video
				className={s.video}
				src={videoUrl}
				ref={videoRef}
				muted={isMuted}
				poster="/uploads/movies/poster.png"
			></video>

			{!isTouched ? (
				<button className={s.mainPlayButton} onClick={toggleVideo}>
					<MaterialIcon name="MdPlayArrow" />
				</button>
			) : (
				isOverPlayer && (
					<div className={s.playerCommands}>
						<div className={s.progressContainer}>
							<input
								type="range"
								style={{ width: '100%', cursor: 'pointer' }}
								min={0}
								max={videoTime}
								value={currentTime}
								onChange={(e) =>
									setVideoCurrentTime(parseInt(e.target.value, 10))
								}
							/>
							{/* <div
								style={{ width: `${progress}%` }}
								className={s.progressBar}
							></div> */}
						</div>

						<div className={s.controls}>
							<div>
								<button onClick={revert}>
									<MaterialIcon name="MdHistory" />
								</button>
								<button className={s.playButton} onClick={toggleVideo}>
									<MaterialIcon name={isPlaying ? 'MdPause' : 'MdPlayArrow'} />
								</button>
								<button onClick={forward}>
									<MaterialIcon name="MdUpdate" />
								</button>
								<div className={s.timeControls}>
									<p className={s.controlsTime}>{convertTime(currentTime)}</p>{' '}
									<span>/</span>
									<p className={s.controlsTime}>{convertTime(videoTime)}</p>
								</div>
							</div>
							<div>
								<input
									type="range"
									style={{ cursor: 'pointer' }}
									min={0}
									max={100}
									step={5}
									value={volume * 100}
									onChange={(e) =>
										setVideoVolume(parseInt(e.target.value, 10) / 100)
									}
								/>
								<button onClick={toggleMute}>
									<MaterialIcon name={isMuted ? 'MdVolumeOff' : 'MdVolumeUp'} />
								</button>
								<button onClick={setFullScreen}>
									<MaterialIcon name="MdFullscreen" />
								</button>
							</div>
						</div>
					</div>
				)
			)}
		</div>
	);
};

export default VideoPlayer;
