import React, { Component } from 'react'
import {ImSearch} from 'react-icons/im';
import css from 'components/Styled/Styles.module.css'

export default class Searchbar extends Component {
    state = {
        search: "",
    }

    handleChange = (e) => {
        const {value, name} = e.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit = (e)=> {
        e.preventDefault()
        const {onSubmit} = this.props;
        onSubmit({...this.state})
        this.reset()
    }

    reset() {
        this.setState({
            search: "",
        })
    }

  render() {
    const {handleSubmit, handleChange} = this
    const {search} = this.state;

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
}
