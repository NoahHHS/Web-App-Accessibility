const FontSizeAdjuster = (prop) => {
    let p = document.getElementById(prop.value);
    let i = 0
    let FontSizes = ['16px','20px','24px','32px']

    function increaseFontSize () {
        i++
        if(i > 4){
            i--
        }
        p.style.fontSize = FontSizes[i]
    }
    function decreaseFontSize () {
        i--
        if(i < 0){
            i++
        }
        p.style.fontSize = FontSizes[i]
    }

    return(
        <div className="FontSizeButton-Container">
            <button className="IncreaseButton" onClick={increaseFontSize}>+</button>
            <button className="IncreaseButton" onClick={decreaseFontSize}>-</button>
        </div>
    );
}