import api from "../../../utils/api";
import handleHttpErrors from "../../../utils/errors";
import useFlashMessage from "../../../hooks/useFlashMessage";
import { useState, useEffect } from "react";
import { Context } from "../../../context/UserContext";
import { useContext } from "react";
import styles from "./Dashboard.module.css";

import Datatable from "../../layout/Datatable";
import { Link } from "react-router-dom";

function Books() {
    const { authenticated } = useContext(Context);
    const { setFlashMessage } = useFlashMessage();
    const user = JSON.parse(localStorage.getItem("user"));
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);

    const [savedSelectedRows, setSavedSelectedRows] = useState([]);
    const [toggledClearRows, setToggleClearRows] = useState(false);

    const differenceBy = (books, selectedRows, param) => {
        // for (let i = 0; i < books.length; i++) {
        //     for (let j = 0; j < selectedRows.length; j++) {
        //         if (books[i][param] === selectedRows[j][param]) {

        //         }
        //     }
        // }
        return books.filter((book) => !selectedRows.includes(book[param]));
    };

    const handleDelete = async () => {
        if (
            savedSelectedRows.length > 0 &&
            window.confirm(
                `Are you sure you want to delete:\r ${savedSelectedRows.map(
                    (r) => r.title
                )}?`
            )
        ) {
            setToggleClearRows(!toggledClearRows);
            let aux = []; // selected book id array
            const param = "id";
            for (let i = 0; i < savedSelectedRows.length; i++) {
                aux.push(savedSelectedRows[i][param]);
            }
            // const notSelected = differenceBy(books, aux, param)
            
            // setBooks(differenceBy(books, aux, param));

            // excluir livros no backend
            const token = localStorage.getItem("token") || "";
            let msgText = "";
            let msgType = "success";
            for (let index = 0; index < aux.length; index++) {
                await api
                    .delete(`/books/delete/${aux[index]}`, {
                        headers: {
                            Authorization: `Bearer ${JSON.parse(token)}`,
                        },
                    })
                    // eslint-disable-next-line no-loop-func
                    .catch((err) => {
                        msgType = "error";
                        msgText = handleHttpErrors(err.response);
                    });
                if (index > 0 && msgText !== "") {
                    setFlashMessage(
                        "Some books were deleted succssfully, but an error ocurred: " +
                            msgText,
                        msgType
                    );
                    break;
                } else if (msgText !== "") {
                    setFlashMessage(msgText, msgType);
                    break;
                }
            }

            if (msgText === "")
                setFlashMessage("Books successfully deleted!", "success");
                fetchBooks(1);
        } else if (savedSelectedRows.length === 0) {
            setFlashMessage("Nothing was selected!", "error");
        }
    };

    const handleEdit = () => {
        if (savedSelectedRows.length === 1) {
            // setToggleClearRows(!toggledClearRows);
            // redirecionar para form de edicao de livros
        } else if (savedSelectedRows.length === 0) {
            setFlashMessage("Nothing was selected!", "error");
        } else {
            setFlashMessage("Can only select one for editing!", "error");
        }
    };

    const fetchBooks = async (page) => {
        setLoading(true);
        await api
            .get(`/books?page=${page - 1}&size=${perPage}`)
            .then((response) => {
                setBooks(response.data.content);
                setTotalRows(response.data.totalEntries);
            })
            .catch((err) => {
                console.log(err);
                setFlashMessage("Server error!", "error");
            });
        setLoading(false);
    };

    const handlePageChange = (page) => {
        fetchBooks(page);
    };

    const handlePerRowsChange = async (newPerPage, page) => {
        setLoading(true);
        await api
            .get(`/books?page=${page - 1}&size=${newPerPage}`)
            .then((response) => {
                setBooks(response.data.content);
                setPerPage(newPerPage);
            })
            .catch((err) => {
                console.log(err);
                setFlashMessage("Server error!", "error");
            });
        setLoading(false);
    };

    const handleRowSelected = ({ selectedRows }) => {
        setSavedSelectedRows([...selectedRows]);
    };

    const handleClearRows = () => {
        setToggleClearRows(!toggledClearRows);
    };

    useEffect(() => {
        fetchBooks(1); // fetch page 1 of books
    }, []);

    const columns = [
        {
            name: "Author",
            selector: (row) => row.author,
            sortable: true,
        },
        {
            name: "Title",
            selector: (row) => row.title,
            sortable: true,
        },
        {
            name: "Published Date",
            selector: (row) => row.publishedDate,
            sortable: true,
        },
        {
            name: "Available Stock",
            selector: (row) => row.availableStock,
            sortable: true,
        },
        {
            name: "Publisher",
            selector: (row) => row.publisher.name,
            sortable: true,
        },
    ];

    return (
        <section className={styles.bookList}>
            <h1>Books</h1>
            {authenticated && user.admin ? (
                <div className={styles.actions}>
                    <Link to="/books/create">Create Book</Link>
                    <button
                        className={styles.actions_delete}
                        onClick={handleDelete}
                    >
                        Delete
                    </button>
                    <button
                        className={styles.actions_edit}
                        onClick={handleEdit}
                    >
                        Edit
                    </button>
                </div>
            ) : (
                // <>
                // </>
                <></>
            )}
            <div>
                <Datatable
                    columns={columns}
                    data={books}
                    loading={loading}
                    // contextActions={contextActions}
                    handleRowSelected={handleRowSelected}
                    toggledClearRows={toggledClearRows}
                    totalRows={totalRows}
                    handlePageChange={handlePageChange}
                    handlePerRowsChange={handlePerRowsChange}
                    savedSelectedRows={savedSelectedRows}
                ></Datatable>
            </div>
        </section>
    );
}

export default Books;
