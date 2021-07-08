const colors = {
  background: 'rgba(12,10,29,1.0)',
  text: 'rgba(255,255,255,0.96)',
}

const fonts = {
  body: 'EuclidCircular, Arial',
  heading: 'EuclidCircular, Arial',
}

const space = [
  '0px',
  '4px',
  '8px',
  '12px',
  '16px',
  '20px',
  '24px',
  '32px',
  '40px',
  '64px',
  '128px',
  '256px',
]
const fontWeights = { body: 400, caption: 500, heading: 600 }
const borderRadius = { base: space[1] }
const opacity = { base: 0.72 }

const globalTheme = {
  useCustomProperties: true,
  colors: colors,
  fonts: fonts,
  space: space,
  styles: {
    root: {
      fontFamily: 'body',
      fontWeight: 'body',
      color: 'text',
    },
    h1: {
      fontWeight: 'heading',
    },
    h2: {
      fontWeight: 'heading',
    },
    h3: {
      fontWeight: 'heading',
    },
    h4: {
      fontWeight: 'heading',
    },
    h5: {
      fontWeight: 'heading',
    },
    h6: {
      fontWeight: 'heading',
    },
    p: {},
    a: {},
    text: {},
  },
}

export default globalTheme
