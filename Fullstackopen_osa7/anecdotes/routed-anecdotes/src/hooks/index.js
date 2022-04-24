import React, { useState } from 'react'

export const useField = (name) => {
    const [value, setValue] = useState('')
  
    const onChange = (event, reset=false) => {
        if (reset) setValue('')
        if (!reset) setValue(event.target.value)
    }

    return {
      name,
      value,
      onChange,
    }
}