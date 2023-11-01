"use client"

import { useRef, useState } from "react"
import { IMediaPlayerProps } from "./mediaPlayer.interface"
import { TbPlayerPlayFilled, TbPlayerPauseFilled, TbPlayerSkipBack, TbPlayerSkipForward } from 'react-icons/tb'
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import styles from "./mediaPlayer.module.css"

export default function MediaPlayer (props: IMediaPlayerProps) {
    const { channel, onChangeChannel } = props

    const [ isPlaying, setIsPlaying ] = useState<boolean>(false)
    const [ loading, setLoading ] = useState<boolean>(false)

    const audioRef: any = useRef()

    const handlePlayPause = () => {
        if (audioRef.current.paused) {
            setLoading(true)
            audioRef.current.play()
            setIsPlaying(true)
        } else {
            audioRef.current.pause()
            setIsPlaying(false)
        }
    }

    return (
        <div className={styles["media-player-container"]}>
            <p className={styles.title}>{channel.title}</p>
            <p className={styles.online}><span style={{color: "red", margin: "0 5px 0 0"}}>•</span>Online</p>
            <div className={styles["controls-container"]}>
                <div className={styles["controls-left"]}>
                    <button 
                        className={styles["icon-outlined"]}
                        onClick={() => {
                            onChangeChannel(false)
                            if (isPlaying) {
                                setLoading(true)
                                setIsPlaying(true)
                            }
                        }}
                    >
                        <TbPlayerSkipBack/>
                    </button>
                    <button
                        className={styles["icon-outlined"]}
                        onClick={() => {
                            onChangeChannel(true)
                            if (isPlaying) {
                                setLoading(true)
                                setIsPlaying(true)
                            }
                        }}
                    >
                        <TbPlayerSkipForward/>
                    </button>
                </div>
                <button 
                    className={styles["player-container"]}
                    onClick={handlePlayPause}
                >
                    {isPlaying && !loading
                        ? <TbPlayerPauseFilled className={styles.icon}/> 
                        : !isPlaying && !loading 
                            ? <TbPlayerPlayFilled className={styles.icon}/> 
                            : <AiOutlineLoading3Quarters className={`${styles.icon} ${styles.loading}`}/> 
                    }
                </button>
            </div>
            <audio 
                className={styles.audio} 
                ref={audioRef} 
                src={channel.url} 
                controls
                autoPlay={isPlaying}
                onProgress={() => setLoading(false)}
            />
        </div>
    )
}