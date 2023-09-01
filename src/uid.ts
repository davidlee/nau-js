import { differenceInMilliseconds } from 'date-fns'

const CHARSET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export function encode(int:number): string {
  if (int === 0) return CHARSET[0]

  let res = "";
  while (int > 0) {
    res = CHARSET[int % 62] + res
    int = Math.floor(int / 62)
  }
  return res
}

const D0 = new Date(2021,0 /* Jan */, 1)

function ms() {
  return differenceInMilliseconds(new Date(), D0)
}

export function uid(): string {
  return encode( ms() )
}

