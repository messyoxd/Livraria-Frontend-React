import { useState } from "react";
import formStyles from "./Form.module.css";
import Input from "./Input";
import Select from "./Select";

function BookForm({ handleSubmit, bookData, btnText, loadOptions }) {
    const [book, setBook] = useState(bookData || {});
    const [publisher, setPublisher] = useState({});
    function handleChange(e) {
        setBook({
            ...book,
            [e.target.name]: e.target.value,
        });
    }
    async function submit(e) {
        e.preventDefault();
        let formData = new FormData();
        await Object.keys(book).forEach((key) =>
            formData = { ...formData, [key]: book[key] }
        );
        formData = { ...formData, publisherId: publisher.value };
        await handleSubmit(formData)
    }
    return (
        <section>
            <form className={formStyles.form_container} onSubmit={submit}>
                <Input
                    text="Title"
                    type="text"
                    name="title"
                    placeholder="Type the book title"
                    value={book.title || ""}
                    handleOnChange={handleChange}
                />
                <Input
                    text="Author"
                    type="text"
                    name="author"
                    placeholder="Type the book author name"
                    value={book.author || ""}
                    handleOnChange={handleChange}
                />
                <Input
                    text="Published date"
                    type="date"
                    name="publishedDate"
                    placeholder="Type the book published date"
                    value={book.publishedDate || ""}
                    handleOnChange={handleChange}
                />
                <Input
                    text="Available stock"
                    type="number"
                    name="availableStock"
                    placeholder="Type how many books are in total in stock"
                    value={book.availableStock || ""}
                    handleOnChange={handleChange}
                />
                <Select
                    text="Publisher"
                    name="publisherId"
                    value={
                        book.publisher
                            ? {
                                  value: book.publisherId,
                                  label: book.publisher.name,
                              }
                            : Object.keys(publisher).length > 0
                            ? publisher
                            : ""
                    }
                    handleOnChange={setPublisher}
                    loadOptions={loadOptions}
                />
                <input type="submit" value={btnText}></input>
            </form>
        </section>
    );
}

export default BookForm;
