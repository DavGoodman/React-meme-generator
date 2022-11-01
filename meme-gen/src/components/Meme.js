import React from "react"


export default function Meme() {

    // let allMemeImages = memesData.data.memes.map(item => item.url)
        
    const [meme, setMeme] = React.useState({
        topText:"",
        bottomText:"",
        randomImage: "http://i.imgflip.com/1bij.jpg"
    })

    const [allMemes, setAllMemes] = React.useState([])
    
    React.useEffect(()=>{
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))
    }, [])
    
    function changeImage(event) {
        event.preventDefault()
        const {name, value} = event.target
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        setMeme(   prevObject=>{
         return{
             
            ...prevObject,
            [name]: name === "randomImage" ? allMemes[randomNumber].url : value
            
         }})
        
    }
    

    return (
        <main>
            <form className="form">
                <input 
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                    name="topText"
                    onChange={changeImage}
                    value={meme.topText}
                />
                <input 
                    type="text"
                    placeholder="Bottom text"
                    className="form--input"
                    name="bottomText"
                    onChange={changeImage}
                    value={meme.bottomText}
                />

                <button 
                    onClick={changeImage}
                    className="form--button"
                    name="randomImage"
                >
                    Get a new meme image
                </button>

                <div className="meme-img-container">

                    <img src={meme.randomImage} className="meme-img"/>
                    <h2 className="meme-text top">
                        {meme.topText}
                    </h2>

                    <h2 className="meme-text bottom">
                        {meme.bottomText}
                    </h2>

                </div>
            </form>
        </main>
    )
}

function randomNum(min, max) {
    return (Math.floor(Math.random() * (max - min + 1)) + min);}