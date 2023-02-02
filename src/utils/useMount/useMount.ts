import { EffectCallback, useEffect } from 'react'

const useEffectOnce = (effect: EffectCallback): void => {
  useEffect(effect, [])
}

type Effect = (...args: unknown[]) => void

export const useMount = (fn: Effect): void => {
  useEffectOnce(() => {
    fn()
  })
}
