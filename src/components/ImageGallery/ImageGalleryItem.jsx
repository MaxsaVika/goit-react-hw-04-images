import PropTypes from 'prop-types';
import css from '../Styled/Styles.module.css'

export const ImageGalleryItem = ({id, tags, webformatURL, largeImageURL, onClick}) => {
    return (
        <li key = {id} className={css.ImageGalleryItem}>
            <img 
                src={webformatURL} 
                alt = {tags} 
                className={css.ImageGalleryItem_image} 
                onClick={() => {
                        onClick({largeImageURL});
                    }}>
            </img>
        </li>
)}

ImageGalleryItem.propTypes = {
    onClick: PropTypes.func,
    tags: PropTypes.string,
    webformatURL: PropTypes.string,
    largeImageURL: PropTypes.string,
    id: PropTypes.number,
}
