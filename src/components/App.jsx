import React, { Component } from 'react'
import {Loader} from './shared/Loader/Loader'
import ImageGallery from './ImageGallery/ImageGallery';
import { LoadMoreBtn } from './shared/LoadMoreBtn/LoadMoreBtn';
import css from 'components/Styled/Styles.module.css';
import {searchApiImg} from 'components/servises/searchApi'
import Searchbar from './Searchbar/Searchbar';
import Modal from './shared/Modal/Modal';

export default class App extends Component {
  state = {
    images: [],
    loading: false,
    error: null,
    search: "", 
    modalOpen: false,
    modalImg: "",
    page: 1,
  }

  componentDidUpdate (_, prevState) {
    const {search, page} = this.state
    if((search && prevState.search !== search) || page > prevState.page){
        this.fetchImages()
    }
}

async fetchImages(){
    const {search, page} = this.state;

    this.setState({loading: true,})

    try{
        const data = await searchApiImg(search, page);
        const {hits} = data;
            this.setState(({images})=>{
                return {
                    images: [...images, ...hits],
                }
        })
        } catch (error) {
            this.setState({error})

        } finally {
            this.setState({loading: false,})
        }

}

onSearch = ({search})=>{
  this.setState({
      search,
  })
}

loadMore = ()=>{
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
    const {images, loading, error, modalOpen} = this.state;
    const {loadMore, onSearch, openModal, closeModal} = this;
    const isImages = Boolean(images.length)

    return (
      <>
        <Searchbar onSubmit = {onSearch}/>
        {modalOpen && <Modal onClose = {closeModal}>
            <div>HELLO</div>
          </Modal>}
        <section className={css.App}>
          {loading && <Loader />}
          {error && <p>Try later...</p>}
          {isImages && <ImageGallery images={images} onClick={openModal}/>}
          {isImages && <LoadMoreBtn onLoadMore = {loadMore}/>}
        </section>
      </>
      
    )
  }
}
