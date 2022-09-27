import PropTypes from 'prop-types';
import { ImageGalleryItem } from './ImageGalleryItem';
import css from '../Styled/Styles.module.css'
import React, { Component } from 'react'
import {searchApiImg} from 'components/servises/searchApi'
import {Loader} from '../shared/Loader/Loader'
import { LoadMoreBtn } from '../shared/LoadMoreBtn/LoadMoreBtn'
import Modal from '../shared/Modal/Modal';

export default class ImageGallery extends Component {
    state = {
            images: [],
            loading: false,
            error: null,
            modalOpen: false,
            modalImg: "",
          }

   componentDidUpdate (prevProps) {
       const { search, page } = this.props

       if (prevProps.search !== search) {
           this.setState({
               images: []
            })
       }

        if(prevProps.search !== search || page !== prevProps.page) {
            this.fetchImages() 
        }    
   }

   async fetchImages(){
    const { search, page } = this.props
    
        this.setState({
            loading: true,
        })
    
        try{
            const data = await searchApiImg(search, page);

                this.setState(({images})=>{
                    return {
                        images: [...images, ...data.hits],
                    }
            })
            } catch (error) {
                this.setState({error})
    
            } finally {
                this.setState({loading: false,})
            }
    
    }

    loadMore = () => {
        this.props.handleNextPage()
    }

    openModal = (modalImg) => {
        this.setState({
          modalOpen: true,
          modalImg,
        })
      }
      
      closeModal = () => {
        this.setState({
          modalOpen: false,
          modalImg: "",
        })
      }
    
  render() {
    const {images, loading, error, modalOpen, modalImg} = this.state
    const {loadMore, openModal, closeModal} = this
    const isImages = Boolean(images.length)

    return (
        <section className={css.App}>
          {error && <p>Try later...</p>}
          {loading && <Loader />}
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
            {isImages && <LoadMoreBtn onLoadMore = {loadMore}/>}

            {modalOpen && <Modal onClose = {closeModal}>
             <img src={modalImg} alt ="" />
           </Modal>}

        </section>     
    )
  }
}

ImageGallery.propTypes = {
    images: PropTypes.array,
    id: PropTypes.number,
    webformatURL: PropTypes.string,
    largeImageURL: PropTypes.string,
    tags: PropTypes.string
}
