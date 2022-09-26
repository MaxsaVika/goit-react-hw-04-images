import React from "react";
import css from './Loader.module.css'

export function Loader () {
    return (
        <div className={css.backdrop}>
            <div className={css.loader}></div>
        </div>
    )
}