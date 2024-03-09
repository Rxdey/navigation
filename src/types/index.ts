import type { ColorInput, HSV, HSL, RGBA } from '@ctrl/tinycolor';

export type ColorPickerValue = {
    a: number
    hex: string
    hex8: string
    hsl: HSL
    hsv: HSV
    oldHue: number
    rgba: RGBA
    source: 'rgba' | 'hsl' | 'hex' | 'hsv' | 'hsva'
}