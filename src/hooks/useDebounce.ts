import {  useEffect, useState } from "react"

const useDebounce = (value: string = '', interval: number = 500) => {
    const [debounced, setDebounced] = useState("")

    useEffect(() => {
        const id = setTimeout(() => setDebounced(value), interval)

        return () => {
            clearInterval(id)
        }
    }, [value, interval])

    return debounced
}

export default useDebounce