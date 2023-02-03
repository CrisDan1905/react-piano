import { InstrumentContextProvider } from '../../state/Instrument'
import { InstrumentSelector } from '../InstrumentSelector'
import { KeyboardWithInstrument } from '../Keyboard/withStaticInstrument'

export const Playground = (): React.ReactElement => {
  return (
    <InstrumentContextProvider>
      <div className='playground'>
        <KeyboardWithInstrument />
        <InstrumentSelector />
      </div>
    </InstrumentContextProvider>
  )
}
