import {useState, useEffect, CSSProperties} from 'react'

const delay : number = 20 
const scGap : number = 0.02 

export const useAnimatedScale = () => {
    const [scale, setScale] = useState(0)
    const [animated, setAnimated] = useState(false)
    return {
        scale, 
        start() {
            if (!animated) {
                setAnimated(true)
                const interval = setInterval(() => {
                    setScale((prev : number) => {
                        if (prev > 1) {
                            setAnimated(false)
                            clearInterval(interval)
                            return 0 
                        }
                        return prev + scGap 
                    })
                }, delay)
            }
        }
    }
}

export const useDimension = () => {
    const [w, setW] = useState(window.innerWidth)
    const [h, setH] = useState(window.innerHeight)
    useEffect(() => {
        window.onresize = () => {
            setW(window.innerWidth)
            setH(window.innerHeight)
        }
        return () => {

        }
    }, [])
    return {
        w, h 
    }
}

const sinify : Function = (scale : number) => Math.sin(scale * Math.PI)

export const useStyle = (w : number, h : number, scale : number) => {
    const size : number = Math.min(w, h) / 5 
    const x : number = w / 2 
    const y : number = h / 2
    return {
        parentStyle() : CSSProperties {
           return {
                position: 'absolute', 
                left: `${x}px`,
                top: `${y}px`
           }
        },
        boxStyle() : CSSProperties {
            return {
                position: 'absolute',
                width: `${size}px`,
                height: `${size}px`,
                top: `${-size / 2}px`,
                left: `${-size / 2}px`,
                background: 'indigo',
                opacity: 1 - sinify(scale)
            }
        },
        textStyle() : CSSProperties {
            return {
                position: 'absolute',
                fontSize : `${Math.min(w, h) / 40}px`,
                left: `${-(w / 2 + 200) + (w / 2 + 100) * sinify(scale)}px`,
                top: `-50px`,
                width: '200px',
                height: '100px',
                color: 'black'
            }
        }
    }
} 