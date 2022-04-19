
function SearchBar({ handleSearchInput }) {
  return (
    <div className='h-min absolute top-5 left-80 z-10'>
      <input 
        className='rounded-full h-10 w-80 pl-3'
        type='text'
        placeholder='Artists, songs, or podcasts'
        onChange={handleSearchInput}
      />
    </div>
  )
}

export default SearchBar;
