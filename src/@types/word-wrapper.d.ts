declare module 'word-wrapper' {
  interface Range {
    start: number
    end: number
  }

  interface Parameters extends Partial<Range> {
    width?: number
    start?: number
    mode?: 'normal' | 'pre' | 'nowrap'
    measure?: (
      text: string,
      start: number,
      end: number,
      width: number
    ) => Range
  }

  const wrap: ((text: string, parameters?: Parameters) => string) &{
    lines (text: string, parameters?: Parameters): Range[]
  }

  export default wrap
}
