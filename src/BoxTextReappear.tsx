import React from 'react'
import withContext from './withContext'
import { useStyle } from './hooks'

interface BTRProps {
    w : number, 
    h : number, 
    scale : number, 
    onClick : Function
}

const BoxTextReappear : React.FC<BTRProps> = (props : BTRProps) => {
    const {parentStyle, boxStyle, textStyle} = useStyle(props.w, props.h, props.scale)
    return (
        <div style = {parentStyle()}>
            <div style = {boxStyle()} onClick = {() => props.onClick()}></div>
            <div style = {textStyle()}>
                hello world
            </div>
        </div>
    )
}

export default withContext(BoxTextReappear)