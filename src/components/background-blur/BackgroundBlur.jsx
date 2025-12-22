import './BackgroundBlur.css'

export default function BackgroundBlur({OpenCart, showCart, renderCart}) {
    return (
        <>
            { renderCart &&
                <div onClick={OpenCart} className={`background-blur  tra ${showCart ? '' : 'hide'}`}></div>
            }
        </>
    )
}