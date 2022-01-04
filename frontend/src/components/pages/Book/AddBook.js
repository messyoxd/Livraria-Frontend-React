import api from "../../../utils/api";

import styles from "./AddBook.module.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

/* components */
import BookForm from "../../form/BookForm";

/* hooks */
import useFlashMessage from "../../../hooks/useFlashMessage";
import handleHttpErrors from "../../../utils/errors";

function AddBook() {
    const { setFlashMessage } = useFlashMessage();
    const [token] = useState(localStorage.getItem("token") || "");
    const history = useNavigate();

    async function loadOptions(search, loadedOptions, { page }) {
        const response = await api.get(`/publishers?page=${page}&size=3`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            },
        });
        let options = [];
        for (let i = 0; i < response.data.content.length; i++) {
            options.push({
                value: response.data.content[i].id,
                label: response.data.content[i].name,
            });
        }
        return {
            options: options,
            hasMore: loadedOptions.length < response.data.totalEntries,
            additional: {
                page: page + 1,
            },
        };
    }

    async function handleSubmit(book) {
        let msgText = "";
        let msgType = "success";
        // console.log(book);
        await api
            .post("/books/create", book, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`,
                },
            })
            .then((response) => {
                msgText = response.data.message;
                setFlashMessage(msgText, msgType);
                history("/books");
            })
            .catch((err) => {
                msgType = "error";
                msgText = handleHttpErrors(err.response);
                setFlashMessage(msgText, msgType);
            });
    }

    return (
        <section className={styles.addbook_header}>
            <div>
                <h1>Add a new Book</h1>
            </div>
            <BookForm
                btnText="Add Book"
                loadOptions={loadOptions}
                handleSubmit={handleSubmit}
            />
        </section>
    );
}

export default AddBook;
