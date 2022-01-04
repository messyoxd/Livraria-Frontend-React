import styles from "./Select.module.css";
import { AsyncPaginate } from "react-select-async-paginate";
import { useState } from "react";

function Select({ text, name, options, handleOnChange, value, loadOptions }) {
    
    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}:</label>
            <AsyncPaginate
                value={value}
                loadOptions={loadOptions}
                onChange={handleOnChange}
                additional={{
                    page: 0,
                }}
            />
        </div>
    );
}

export default Select;
