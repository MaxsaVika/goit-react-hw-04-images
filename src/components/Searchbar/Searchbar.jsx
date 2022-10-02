// import React, { Component } from 'react'
import { useState } from 'react'
import {ImSearch} from 'react-icons/im';
import css from 'components/Styled/Styles.module.css'

export default function Searchbar({onSubmit}) {
    const [search, setSearch] = useState('')

    const handleChange = ({target: {value}}) => {
        setSearch(value)
    }

    const handleSubmit = (e)=> {
        e.preventDefault()

        if(search.trim() === "") {
           return  alert('Enter category of images for search.')
        }

        onSubmit(search)
        setSearch('')
    }

    return (
        <header className={css.Searchbar}>
            <form className={css.SearchForm} onSubmit = {handleSubmit}>
                <button type="submit" className = {css.SearchForm_button} > 
                    <ImSearch size={20} />
                </button>
                <input 
                    type="text" 
                    value={search}
                    name = "search"
                    placeholder = "Search images and photos" 
                    className = {css.SearchForm_input}
                    onChange = {handleChange}
                />
            </form>
        </header> 
    )
}