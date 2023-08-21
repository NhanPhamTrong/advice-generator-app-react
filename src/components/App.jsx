import "./App.scss"
import mobileDivider from "../assets/images/pattern-divider-mobile.svg"
import desktopDivider from "../assets/images/pattern-divider-desktop.svg"
import iconDice from "../assets/images/icon-dice.svg"
import { useEffect, useState } from "react"

export const App = () => {
    // From 1 to 224
    const [rand, setRand] = useState(Math.floor(Math.random() * (224 - 1 + 1) + 1))
    const [advice, setAdvice] = useState({
        id: 0,
        content: ""
    })
    const [divider, setDivider] = useState(window.innerWidth < 600 ? mobileDivider : desktopDivider)

    useEffect(() => {
        const HandleWindowResize = () => {
            setDivider(window.innerWidth < 600 ? mobileDivider : desktopDivider)
        }

        window.addEventListener('resize', HandleWindowResize);

        return () => {
            window.removeEventListener('resize', HandleWindowResize);
        }
    })

    useEffect(() => {
        fetch("https://api.adviceslip.com/advice/" + Math.floor(Math.random() * (224 - 1 + 1) + 1))
            .then(res => res.json())
            .then((item) => {
                setAdvice({
                    id: item.slip.id,
                    content: item.slip.advice
                })
            })
    }, [])

    const ChangeAdvice = () => {
        setRand(() => {
            let newRand = Math.floor(Math.random() * (224 - 1 + 1) + 1)
            if (newRand === rand) {
                newRand = newRand > 1 ? newRand - 1 : newRand + 1
            }
            return newRand
        })
        fetch("https://api.adviceslip.com/advice/" + rand)
            .then(res => res.json())
            .then((item) => {
                setAdvice({
                    id: item.slip.id,
                    content: item.slip.advice
                })
            })
    }

    return (
        <main className="container">
            <h1>{"ADVICE #" + advice.id}</h1>
            <h2>
                <span><i class="fa-solid fa-quote-left fa-2xs"></i></span>
                {advice.content}
                <span><i class="fa-solid fa-quote-right fa-2xs"></i></span>
            </h2>
            <img src={divider} alt="divider" />
            <button type="button" onClick={ChangeAdvice}>
                <img src={iconDice} alt="Change advice" />
            </button>
        </main>
    )
}