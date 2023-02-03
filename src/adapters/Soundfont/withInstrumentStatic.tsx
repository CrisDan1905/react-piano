import { Component, ComponentType, ReactNode } from 'react'
import Soundfont, { InstrumentName, Player } from 'soundfont-player'
import { MidiValue } from '../../domain/note'
import { AudioNodesRegistry, DEFAULT_INSTRUMENT } from '../../domain/sound'
import { Optional } from '../../domain/types'

type InjectedProps = {
  loading: boolean
  play: (note: MidiValue) => Promise<void>
  stop: (note: MidiValue) => Promise<void>
}

type ProviderProps = {
  AudioContext: AudioContextType
}

type ProviderState = {
  loading: boolean
  current: Optional<InstrumentName>
}

export function withInstrumentStatic<TProps extends InjectedProps = InjectedProps> (initialInstrument: InstrumentName = DEFAULT_INSTRUMENT): any {
  return function enchanceComponent (WrappedComponent: ComponentType<TProps>) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const displayName = WrappedComponent.displayName ?? WrappedComponent.name ?? 'Component'

    return class WithInstrument extends Component<ProviderProps, ProviderState> {
      public static defaultProps = {
        instrument: DEFAULT_INSTRUMENT
      }

      private readonly audio: AudioContext
      private player: Optional<Player> = null
      private activeNodes: AudioNodesRegistry = {}

      public state: ProviderState = {
        loading: false,
        current: null
      }

      constructor (props: ProviderProps) {
        super(props)

        const { AudioContext } = this.props
        this.audio = new AudioContext()
      }

      private readonly load = async (instrument: InstrumentName): Promise<void> => {
        this.setState({ loading: true })
        this.player = await Soundfont.instrument(this.audio, instrument)
        this.setState({ loading: false, current: instrument })
      }

      private readonly resume = async (): Promise<void> => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this.audio.state === 'suspended'
          ? await this.audio.resume()
          : Promise.resolve()
      }

      public componentDidUpdate (): void {
        void this.load(initialInstrument)
      }

      public play = async (note: MidiValue): Promise<void> => {
        await this.resume()

        if (!this.player) return

        const node = this.player.play(note.toString())
        this.activeNodes = { ...this.activeNodes, [note]: node }
      }

      public stop = async (note: MidiValue): Promise<void> => {
        await this.resume()

        if (!this.activeNodes[note]) return

        this.activeNodes[note]!.stop()
        this.activeNodes = { ...this.activeNodes, [note]: null }
      }

      render (): ReactNode {
        const injected: InjectedProps = {
          loading: this.state.loading,
          play: this.play,
          stop: this.stop
        }

        return <WrappedComponent {...(injected as TProps)} />
      }
    }
  }
}
