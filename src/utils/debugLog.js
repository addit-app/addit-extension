import debug from 'debug'

const BASE = 'addit-extension'
const COLORS = {
  trace: 'lightblue',
  info: 'blue',
  warn: 'yellow',
  error: 'red',
}

class Log {
  generateMessage(level, message, source) {
    // set the prefix which will cause debug to enable the message
    const namespace = `${BASE}:${level}`
    const createDebug = debug(namespace)

    // set the colour of the message based on the level
    createDebug.color = COLORS[level]

    if (source) {
      createDebug(message, source)
    } else {
      createDebug(message)
    }
  }

  trace(message, source) {
    return this.generateMessage('trace', message, source)
  }

  info(message, source) {
    return this.generateMessage('info', message, source)
  }

  warn(message, source) {
    return this.generateMessage('warn', message, source)
  }

  error(message, source) {
    return this.generateMessage('error', message, source)
  }
}

export default new Log()
