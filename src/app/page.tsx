"use client"

import CardRadioCover from '@/components/Cards/CardRadioCover';
import MediaPlayer from '@/components/MediaPlayer/MediaPlayer';
import { IRadioChannel } from '@/interfaces/radio.interface';
import React, { useCallback, useEffect, useState } from 'react';
import styles from './page.module.css';

export default function Home() {
  const [ selectedChannelIndex, setSelectedChannelIndex ] = useState<number>(0)
  const [ data, setData ] = useState<IRadioChannel[]>([])

  const getChannels = async () => {
    const response = await fetch("/mocks/data.json")
    const channels = await response.json()
    setData(channels)
  }

  useEffect(() => {
    getChannels()
  }, [])

  const renderMediaPlayer = useCallback(() => {
    return (
      <MediaPlayer 
        channel={data[selectedChannelIndex]} 
        onChangeChannel={(forward: boolean) => {
          setSelectedChannelIndex(
            forward && selectedChannelIndex < data.length - 1
              ? selectedChannelIndex + 1
              : !forward && selectedChannelIndex > 0 
                ? selectedChannelIndex - 1
                : selectedChannelIndex
          )}
        }
      />
    )
  }, [selectedChannelIndex, data])

  return (
    <main className={styles.main}>
      <section className={styles.container}>
        {data.length > 0 && <CardRadioCover cover={data[selectedChannelIndex].cover} program={data[selectedChannelIndex].program}/>}
      </section>
      {data.length > 0 && renderMediaPlayer()}
    </main>
  )
}
