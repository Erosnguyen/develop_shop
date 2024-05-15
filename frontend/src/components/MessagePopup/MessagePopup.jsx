import React from 'react'

function MessagePopup(props) {
    return (

        <div className="login-popup absolute z-10 w-full h-full bg-[#00000090] flex justify-center" style={{ top: 0, left: 0 }}>
            <div className='text-white'>{props?.showMessage?.text}</div>
        </div>
    )
}

export default MessagePopup
