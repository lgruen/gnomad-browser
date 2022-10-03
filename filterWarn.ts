const forbiddenPhrases = [/componentWillMount has been renamed/]

const originalWarn = console.warn
const filteredWarn: typeof global.console.warn = (message?: any, ...optionalParams: any[]) => {
  const messageString: string = message.toString()
  if (forbiddenPhrases.some((forbiddenPhrase) => messageString.match(forbiddenPhrase))) {
    return
  }
  originalWarn(message, optionalParams)
}

global.console = {
  ...console,
  warn: filteredWarn,
}
