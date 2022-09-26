import PropTypes from 'prop-types';
import { ImageGalleryItem } from './ImageGalleryItem';
import css from '../Styled/Styles.module.css'

const ImageGallery = ({images=[], onClick}) =>{
    return (
        <ul className={css.ImageGallery}>
            {images.map(({ id, tags, webformatURL, largeImageURL }) => {
                return (
                    <ImageGalleryItem
                    key={id}
                    alt = {tags}
                    webformatURL={webformatURL}
                    largeImageURL={largeImageURL}
                    onClick={onClick} />
                )
            })}
        </ul>
    )
}

ImageGallery.propTypes = {
    images: PropTypes.array,
    onClick: PropTypes.func,
    id: PropTypes.number,
    tags: PropTypes.string,
    webformatURL: PropTypes.string,
    largeImageURL: PropTypes.string,
}

export default ImageGallery

