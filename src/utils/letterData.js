import LZString from 'lz-string'

export function encodeLetter(data) {
  const json = JSON.stringify(data)
  return LZString.compressToEncodedURIComponent(json)
}

export function decodeLetter(encoded) {
  try {
    const json = LZString.decompressFromEncodedURIComponent(encoded)
    if (!json) return null
    return JSON.parse(json)
  } catch {
    return null
  }
}

export function saveDraft(data) {
  localStorage.setItem('letterly-draft', JSON.stringify(data))
}

export function loadDraft() {
  try {
    const stored = localStorage.getItem('letterly-draft')
    return stored ? JSON.parse(stored) : null
  } catch {
    return null
  }
}

export function clearDraft() {
  localStorage.removeItem('letterly-draft')
}

export function createDefaultLetter() {
  return {
    senderName: '',
    recipientName: '',
    content: '',
    theme: 'vintage-romance',
    font: 'serif',
    decorations: [],
    gifts: {
      bouquet: null,
      plushie: null,
      chocolateBox: null,
    },
  }
}
