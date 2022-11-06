import { useEffect, useState, Suspense } from 'react'
import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'
import Spinner from './components/Spinner'
import { createResource as fetchData } from './helper'



function App() {
  let [search, setSearch] = useState('')
  let [message, setMessage] = useState('Search for Music!')
  let [data, setData] = useState(null)

  useEffect(() => {
    if (search) {
      document.title=`${search} Music`
      console.log(fetchData(search))
      setData(fetchData(search))
  }
  }, [search])

  const handleSearch = (e, term) => {
    e.preventDefault()
    setSearch(term)
  }

  const renderGallery = () => {
    if (data) {
      return (
        <Suspense fallback={<Spinner />}>
          <Gallery data={data} />
        </Suspense>
      )
    }
  }

  return (
    <div className="App">
      <SearchBar handleSearch={handleSearch} />
      {message}
      {renderGallery()}
    </div>
  )
}

export default App

