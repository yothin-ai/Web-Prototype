import { useEffect, useState } from 'react'
import type { Localized } from '../i18n'

// [Thai name, English name, postcode]
type Sub = [string, string, number]
// province (Thai name) -> its English name and its districts, each with its sub-districts.
type Raw = Record<string, { en: string; d: [string, string, Sub[]][] }>

// Thailand's districts and sub-districts with postcodes, from the open data set
// kongvut/thai-province-data (MIT licence). Loaded on first use because it is large.
let cache: Raw | null = null
let pending: Promise<Raw> | null = null
const load = () => cache ? Promise.resolve(cache) : (pending ??= import('./thai-address.json').then((m) => (cache = m.default as unknown as Raw)))

export function useAddressData(): Raw | null {
  const [data, setData] = useState<Raw | null>(cache)
  useEffect(() => {
    if (!data) void load().then(setData)
  }, [data])
  return data
}

const districtsRaw = (data: Raw | null, province: string) => data?.[province]?.d ?? []

export const districtsOf = (data: Raw | null, province: string): Localized[] =>
  districtsRaw(data, province).map(([th, en]) => ({ th, en }))

export const subsOf = (data: Raw | null, province: string, district: string): { name: Localized; zip: string }[] =>
  (districtsRaw(data, province).find((d) => d[0] === district)?.[2] ?? []).map(([th, en, zip]) => ({ name: { th, en }, zip: String(zip) }))

export const zipsOf = (data: Raw | null, province: string): Set<string> =>
  new Set(districtsRaw(data, province).flatMap((d) => d[2].map((s) => String(s[2]))))

// Names are saved in Thai; this finds their English forms when the data has loaded.
export function localizeParts(province: string, district: string, subdistrict: string) {
  const prov = cache?.[province]
  const dist = prov?.d.find((d) => d[0] === district)
  const sub = dist?.[2].find((s) => s[0] === subdistrict)
  return {
    province: { th: province, en: prov?.en } as Localized,
    district: { th: district, en: dist?.[1] } as Localized,
    subdistrict: { th: subdistrict, en: sub?.[1] } as Localized,
  }
}
