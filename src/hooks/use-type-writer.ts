import { useEffect, useState } from 'react'

export const useTypewriter = (text: string, speed: number) => {
  const [displayText, setDisplayText] = useState('')
  const [cursorVisible, setCursorVisible] = useState(true)

  useEffect(() => {
    let i = 0

    // Intervalo para digitação
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayText((prevText) => prevText + text.charAt(i))
        i++
      } else {
        clearInterval(typingInterval)
      }
    }, speed)

    // Limpeza do intervalo de digitação
    return () => {
      clearInterval(typingInterval)
    }
  }, [text, speed])

  useEffect(() => {
    // Intervalo para alternar a visibilidade do cursor
    const cursorInterval = setInterval(() => {
      setCursorVisible((prevCursorVisible) => !prevCursorVisible)
    }, 500)

    // Limpeza do intervalo do cursor
    return () => {
      clearInterval(cursorInterval)
    }
  }, [])

  // Retorna o texto com o cursor
  const textWithCursor = `${displayText}${cursorVisible ? '|' : ' '}`

  return textWithCursor
}
