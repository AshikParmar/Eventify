import React from 'react'

const Loading = (props) => {
    return (
        <div className="h-fit flex items-center justify-center">
            <div className="bg-white min-h-36 min-w-36 p-6 rounded-lg shadow-lg flex flex-col items-center">
                <p className="text-lg font-semibold">{props.title}</p>
                <div className="w-10 h-10 border-4 border-blue-500 border-dotted rounded-full animate-spin mt-3"></div>
            </div>
        </div>
    )
}

export default Loading
