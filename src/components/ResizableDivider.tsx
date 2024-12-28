import { useState, useEffect, useCallback } from 'react'

interface ResizableDividerProps {
  onResize: (newLeftWidth: number) => void
}

const ResizableDivider: React.FC<ResizableDividerProps> = ({ onResize }) => {
  const [isDragging, setIsDragging] = useState(false)

  const handleMouseDown = () => {
    setIsDragging(true)
  }

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging) {
        const newLeftWidth = e.clientX
        onResize(newLeftWidth)
      }
    },
    [isDragging, onResize]
  )

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [handleMouseMove, handleMouseUp])

  return (
    <div
      className="w-2 bg-gray-300 cursor-col-resize hover:bg-gray-400 transition-colors flex justify-center items-center"
      onMouseDown={handleMouseDown}
      ><span className='select-none'>||</span></div>
    )
}

export default ResizableDivider

