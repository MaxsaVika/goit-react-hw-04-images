// import PropTypes from 'prop-types';
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
            page: 1,
          }

   componentDidUpdate (prevProps, prevState) {
       const {page} = this.state

    //    if(page !== prevState.page){
    //     this.fetchImages();
    //    }

        if(prevProps.search !== this.props.search || page !== prevState.page) {
            this.fetchImages() 
        }

        if(prevProps.search !== this.props.search) {
            this.setState({
                images: [],
                page: 1,
            })
        }
   }

   async fetchImages(){
        const {page} = this.state;

        console.log();
    
        this.setState({
            loading: true,
        })
    
        try{
            const data = await searchApiImg(this.props.search, page);

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
          this.setState(({page}) => { 
            return {
              page: page + 1,
            }
          })
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



// const ImageGallery = ({images=[], onClick}) =>{
//     return (
//         <ul className={css.ImageGallery}>
//             {images.map(({ id, tags, webformatURL, largeImageURL }) => {
//                 return (
//                     <ImageGalleryItem
//                     key={id}
//                     alt = {tags}
//                     webformatURL={webformatURL}
//                     largeImageURL={largeImageURL}
//                     onClick={onClick} />
//                 )
//             })}
//         </ul>
//     )
// }

// ImageGallery.propTypes = {
//     images: PropTypes.array,
//     onClick: PropTypes.func,
//     id: PropTypes.number,
//     tags: PropTypes.string,
//     webformatURL: PropTypes.string,
//     largeImageURL: PropTypes.string,
// }

// export default ImageGallery