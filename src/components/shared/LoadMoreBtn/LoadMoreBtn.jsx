import React from 'react'
import css from 'components/Styled/Styles.module.css'

export  const LoadMoreBtn = ({onLoadMore})=>{
    return <button className={css.Button} type='button' onClick = {() => onLoadMore()}>Load more</button>
}
