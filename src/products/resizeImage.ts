// Turns a picked file into a small JPEG data address, so a picture can be kept in the browser without filling its storage.
export const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']
export const MAX_FILE_BYTES = 5 * 1024 * 1024
export const MAX_SIDE = 800
export const MAX_IMAGES = 4

export type ImageProblem = 'type' | 'size' | 'read'

export async function resizeImage(file: File): Promise<{ url: string } | { problem: ImageProblem }> {
  if (!IMAGE_TYPES.includes(file.type)) return { problem: 'type' }
  if (file.size > MAX_FILE_BYTES) return { problem: 'size' }
  try {
    const bitmap = await createImageBitmap(file)
    const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height))
    const canvas = document.createElement('canvas')
    canvas.width = Math.max(1, Math.round(bitmap.width * scale))
    canvas.height = Math.max(1, Math.round(bitmap.height * scale))
    const ctx = canvas.getContext('2d')
    if (!ctx) return { problem: 'read' }
    // A transparent picture would turn black as a JPEG, so it is drawn on the surface colour.
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--color-surface').trim() || 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
    bitmap.close()
    return { url: canvas.toDataURL('image/jpeg', 0.82) }
  } catch {
    return { problem: 'read' }
  }
}

// Characters the page already keeps in the browser; the storage holds about 5 million, so a save past this is refused with a message.
export const STORAGE_LIMIT = 4_500_000
export function storageUsed(): number {
  try {
    let n = 0
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i) ?? ''
      n += key.length + (localStorage.getItem(key)?.length ?? 0)
    }
    return n
  } catch {
    return 0
  }
}
