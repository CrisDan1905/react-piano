import { ComponentType, useEffect } from 'react'
import { InstrumentName } from 'soundfont-player'
import { MidiValue } from '../../domain/note'
import { useSoundfont } from './useSoundfont'

type InjectedProps = {
  loading: boolean
  play: (note: MidiValue) => Promise<void>
  stop: (note: MidiValue) => Promise<void>
}

type ProviderProps = {
  AudioContext: AudioContextType
  instrument?: InstrumentName
}

export const withInstrument = (WrappedComponent: ComponentType<InjectedProps>) => {
  return function WithInstrumentComponent (props: ProviderProps) {
    const { AudioContext, instrument } = props

    const { loading, current, play, stop, load } = useSoundfont({ AudioContext })

    useEffect(() => {
      if (!loading && instrument !== current) void load(instrument)
    }, [
      loading, current, play, stop, load
    ])

    return (
      <WrappedComponent loading={loading} play={play} stop={stop} />
    )
  }
}
