import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from './ImageGalleryItem';
import css from '../Styled/Styles.module.css'
import {searchApiImg} from 'components/servises/searchApi'
import {Loader} from '../shared/Loader/Loader'
import { LoadMoreBtn } from '../shared/LoadMoreBtn/LoadMoreBtn'
import Modal from '../shared/Modal/Modal';

export default function ImageGallery({ search, page, handleNextPage }) {

    const[images, setImages] = useState([])
    const[loading, setLoading] = useState(false)
    const[error, setError] = useState(null)
    const[modalOpen, setModalOpen] = useState(false)
    const[modalImg, setModalImg] = useState('')

    const isImages = Boolean(images.length)

    useEffect(() => {
        setImages([])
    }, [search])

    useEffect(() =>{
        if (!search) return

        const fetchImages = async ()=> {
            
            setLoading(true)
            
            try{
                const data = await searchApiImg(search, page);
                setImages((prevImages) => [...prevImages, ...data.hits])

            } catch (error) {
                setError(error)
            
            } finally {
                setLoading(false)
            }
        }
        fetchImages()
    }, [search, page])

    const loadMore = () => {
        handleNextPage()
    }

    const openModal = (modalImg) => {
        setModalOpen(true)
        setModalImg(modalImg)
      }
      
    const closeModal = () => {
        setModalOpen(false)
        setModalImg('')
    }

    return (
        <>
          {isImages && 
                <ul className={css.ImageGallery}>
                    {images.map(({ id, tags, webformatURL, largeImageURL }) => {
                        return (
                            <ImageGalleryItem
                                key={id}
                                alt = {tags}
                                webformatURL={webformatURL}
                                largeImageURL={largeImageURL}
                                onClick = {openModal}
                            />
                        )
                    })}
                </ul>
            }
            {error && <p>Try later...</p>}
            {/* <div> */}
                {loading && <Loader />}
                {isImages && !loading && <LoadMoreBtn onLoadMore = {loadMore}/>}
            {/* </div> */}

            {modalOpen && <Modal onClose = {closeModal}>
             <img src={modalImg} alt ="" />
           </Modal>}
        </>    
    )
}

ImageGallery.propTypes = {
    images: PropTypes.array,
    id: PropTypes.number,
    webformatURL: PropTypes.string,
    largeImageURL: PropTypes.string,
    tags: PropTypes.string
}
