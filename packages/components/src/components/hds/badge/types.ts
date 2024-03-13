export type Size = `${SizeValues}`;
export enum SizeValues {
    SMALL = 'small',
    MEDIUM = 'medium',
    LARGE = 'large',
}

export type Type = `${TypeValues}`;
export enum TypeValues {
    FILLED = 'filled',
    INVERTED = 'inverted',
    OUTLINED = 'outlined',
}

export type Color = `${ColorValues}`;
export enum ColorValues {
    NEUTRAL = 'neutral',
    NEUTRAL_DARK_MODE = 'neutral-dark-mode',
    HIGHLIGHT = 'highlight',
    SUCCESS = 'success',
    WARNING = 'warning',
    CRITICAL = 'critical',

}