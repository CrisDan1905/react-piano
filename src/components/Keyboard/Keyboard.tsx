import { selectkey } from '../../domain/keyboard'
import { MidiValue, notes } from '../../domain/note'
import { Key } from '../Key/Key'
import styles from './Keyboard.module.css'

export type KeyboardProps = {
  loading: boolean
  play: (note: MidiValue) => Promise<void>
  stop: (note: MidiValue) => Promise<void>
}

export const Keyboard = ({ loading, play, stop }: KeyboardProps): React.ReactElement => {
  return (
    <div className={styles.keyboard}>
      {
      notes.map(({ midi, type, index, octave }) => {
        const label = selectkey(octave, index)
        return (
          <Key
            key={midi}
            type={type}
            label={label}
            disabled={loading}
            onDown={() => { void play(midi) }}
            onUp={() => { void stop(midi) }}
          />
        )
      })
    }
    </div>
  )
}
