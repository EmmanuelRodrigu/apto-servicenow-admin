import React from "react"

export default function Error({error = ''}) {
    return (
        <div className={`form-error ${error ? '' : 'invisible'}`}>
            {error?.message}
        </div>
    )
}