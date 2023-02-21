import React from "react"

function Meme() {
    const [meme, setMeme] = React.useState({
        topText: '',
        bottomText: '',
        randomImage: 'http://i.imgflip.com/1bij.jpg'
    });

    const [allMemes, setAllMemes] = React.useState([]);

    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))
    }, [])

    function getImage(e) {
        e.preventDefault();
        document.querySelector('.meme-image').classList.remove('hidden');
        const randomIndex = Math.floor(Math.random() * allMemes.length);
        const url = allMemes[randomIndex].url;
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }));
    }

    function handleChange(event) {
        const {name, value} = event.target;

        setMeme(prevMeme => {
            return {
                ...prevMeme,
                [name]: value
            }
        })
    }

    return (
        <main>
            <form className="meme-from">
                <input 
                    type="text" 
                    name="topText" 
                    className="top-txt" 
                    placeholder="Top text..."
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input 
                    type="text" 
                    name="bottomText" 
                    className="btm-txt" 
                    placeholder="Bottom text..."
                    onChange={handleChange}
                />
                <button onClick={getImage} className="form-btn">Get a new meme image 🖼</button>
            </form>
            <div className="meme">
                <img src={meme.randomImage} className="meme-image hidden" />
                <h2 className="meme-text top">{meme.topText}</h2>
                <h2 className="meme-text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    )
  }
  
  export default Meme;