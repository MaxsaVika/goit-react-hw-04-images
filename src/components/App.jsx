import { useState } from 'react'
import ImageGallery from './ImageGallery/ImageGallery';
import css from 'components/Styled/Styles.module.css';
import Searchbar from './Searchbar/Searchbar';

export default function App() {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const onSearch = (search) => {
    setSearch(search)
    setPage(1)
}

  const handleNextPage = () => {
    setPage((prev) => prev + 1)
  }

  return (
    <>
      <Searchbar onSubmit = {onSearch} />    
      <section className={css.App}>
        <ImageGallery search={search} page={page} handleNextPage={handleNextPage} />
      </section>
    </>    
  )
}