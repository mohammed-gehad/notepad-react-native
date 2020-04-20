import React,{useContext} from 'react'
import { View, Text } from 'react-native'
import {Context as NoteContext} from '../Context/NoteContext'

const Note = () => {
    const {state , getNotes } =useContext(NoteContext)
    return (
        <View>
            <Text>note</Text>
        </View>
    )
}

export default Note
