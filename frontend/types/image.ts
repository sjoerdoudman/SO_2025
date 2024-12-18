export interface Image {
    alt?: string,
    sizes: {
        xs?: string,
        sm: string,
        md: string,
        lg?: string,
        xl: string,
    },
    srcset?: string,
}