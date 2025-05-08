import React, { useState } from 'react'
import { Child } from './Child';

const newfile = () => {
    const [data, setData] = useState('');
    const handler = () => {
        setData()
    }
    return (
        <Child handler={handler} />
    )
}

export default newfile