const FontSizeAdjuster = () => {
    let paragraphs = document.getElementsByClassName('beschrijving');
    let i = 0
    let FontSizes = ['16px','20px','24px','32px']

    function increaseFontSize () {
        i++
        if(i > 4){
            i--
        }
        for(let j = 0; j < paragraphs.length; j++){
            paragraphs[j].style.fontSize = FontSizes[i]
        }
    }
    function decreaseFontSize () {
        i--
        if(i < 0){
            i++
        }
        for(let j = 0; j < paragraphs.length; j++){
            paragraphs[j].style.fontSize = FontSizes[i]
        }
    }

    return(
        <div className="FontSizeButton-Container">
            <p className="FontSizeButton-text">Increase or Decrease the font size</p>
            <button className="FontSizeButton" onClick={increaseFontSize}>+</button>
            <button className="FontSizeButton" onClick={decreaseFontSize}>-</button>
        </div>
    );
}

export default FontSizeAdjuster;