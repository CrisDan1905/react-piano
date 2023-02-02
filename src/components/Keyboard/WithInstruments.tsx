import { SoundfontProvider } from '../../adapters/Soundfont'
import { useInstrument } from '../../state/Instrument'
import { useAudioContext } from '../AudioContextProvider'
import { Keyboard } from './Keyboard'

export const KeyboardWithInstrument = (): React.ReactElement => {
  const AudioContext = useAudioContext() as AudioContextType
  const { instrument } = useInstrument()

  return (
    <SoundfontProvider
      AudioContext={AudioContext}
      instrument={instrument}
      render={(props) => <Keyboard {...props} />}
    />
  )
}
