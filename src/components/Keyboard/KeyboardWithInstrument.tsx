import { withInstrument } from '../../adapters/Soundfont'
import { useInstrument } from '../../state/Instrument'
import { useAudioContext } from '../AudioContextProvider'
import { Keyboard } from './Keyboard'

const WrappedKeyboard = withInstrument(Keyboard)

export const KeyboardWithInstrument = (): React.ReactElement => {
  const AudioContext = useAudioContext()!
  const { instrument } = useInstrument()

  return (<WrappedKeyboard AudioContext={AudioContext} instrument={instrument} />)
}
