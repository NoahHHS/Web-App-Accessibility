const Zoekbalk = ({placeholder}) => {
    return(
      <div>
        <section className='Zoekbalk' >
        <input type="text" class="OnderzoekSearchInput" placeholder={placeholder}/>
        <button className='search'><div class="search-icon">&#128269;</div></button>
        </section>
      </div>
    )
  }

  export {Zoekbalk};