import { useAudioContext } from '../AudioContextProvider'
import { NoAudioMessage } from '../NoAudioMessage'
import { Playground } from '../Playground'

export const Main = (): React.ReactElement => {
  const AudioContext = useAudioContext()
  console.log(AudioContext)

  return AudioContext ? <Playground /> : <NoAudioMessage />
}
