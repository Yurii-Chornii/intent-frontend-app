import React, {useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import data from "../../store/Data"
import Card from "../Card/Card";
import Users from "../../store/Users";
import {useHistory} from "react-router-dom";
import {Form, Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "./ToursList.scss"

const ToursList = observer(() => {
    const history = useHistory();
    const {minPrice, maxPrice, pageNumber, pageSize, sortOrder} = data;
    const [show, setShow] = useState(false);
    const [modalHeader, setModalHeader] = useState("");
    const [modalBody, setModalbody] = useState("");

    const getTours = async (
        minPrice: number,
        maxPrice: number,
        pageNumber: number,
        pageSize: number,
        sortOrder: string
    ) => {
        const response = await fetch(`http://localhost:8765/api/tours/` +
            `?minPrice=${minPrice}` +
            `&maxPrice=${maxPrice}` +
            `&page=${pageNumber - 1}` +
            `&size=${pageSize}` +
            `&sort=${sortOrder}`
        )
            .then(value => value.json())
            .then(value => value)
            .catch(e => console.error(e))

        if (!response) {
            showModal("Ups..", "smth went wrong while fetch tours");
        } else {
            const {content, totalPages} = response;
            data.setToursDB(content);
            data.setTotalPages(totalPages);
        }
    }

    useEffect(() => {
        getTours(minPrice, maxPrice, pageNumber, pageSize, sortOrder)
    }, [minPrice, maxPrice, pageNumber, pageSize, sortOrder])

    useEffect(() => {
        if (!Users.loginedUserDB) history.push("/");
    }, [history])

    useEffect(() => {
        Users.getUserCartItems();
    }, [Users.loginedUserDB, Users.userCartItemsIds])

    const paramsFormHandler = (e: any): void => {
        e.preventDefault();
        const from = +e.target[0].value;
        const till = +e.target[1].value;
        if (from !== till && from < till) {
            data.setMinPrice(from);
            data.setMaxPrice(till);
            data.setPage(1)
        } else {
            showModal("Filter params is not valid!", "Please check filter params")
        }
    }

    const sortHandler = (direction: string): void => {
        if (data.sortOrder === direction) {
            data.setSortOrder("id")
        } else if (data.sortOrder === "id" || data.sortOrder !== direction) {
            data.setSortOrder(direction)
        }
        data.setPage(1)
    }

    const params = <div className="params">
        <div>
            <Form inline className="m-1">
                <Form.Label>Count tours on the page:</Form.Label>
                <Form.Control
                    as="select"
                    className="mr-sm-2 ml-2"
                    id="selectCountTours"
                    defaultValue={data.pageSize}
                    onChange={(e) => {
                        data.setPageSize(+e.target.value);
                        data.setPage(1);
                    }}
                    custom
                >
                    <option value="3">3</option>
                    <option value="6">6</option>
                    <option value="9">9</option>
                    <option value="12">12</option>
                </Form.Control>
                <i className="fas fa-sort-numeric-down m-1" style={{"color": data.sortOrder === "price,asc" ? "green" : ""}}
                   onClick={() => sortHandler("price,asc")}/>
                <i className="fas fa-sort-numeric-down-alt m-1"
                   style={{"color": data.sortOrder === "price,desc" ? "green" : ""}}
                   onClick={() => sortHandler("price,desc")}/>
            </Form>
        </div>
        <div>
            <Form inline className="m-1" onSubmit={paramsFormHandler}>
                <Form.Control type="number" placeholder={"price from " + data.minPrice} min="0" step="100"/>
                <Form.Control type="number" placeholder={"price till " + data.maxPrice} min="0" step="100"/>
                <button type="submit" className="btn btn-success ml-1">Filter</button>
                <button type="reset" onClick={() => {
                    data.setMinPrice(0);
                    data.setMaxPrice(5000);
                    data.setPage(1)
                }} className="btn btn-outline-dark ml-1">
                    Clear
                </button>
            </Form>
        </div>
    </div>

    const pagination = <div className="pagination">
        {data.pageNumber > 2 && <i className="fas fa-step-backward" onClick={() => data.setPage(1)}/>}
        {data.pageNumber > 1 && <i className="fas fa-caret-left" onClick={() => data.decrementPage()}/>}
        {`${data.pageNumber} of ${data.totalPages}`}
        {data.pageNumber < data.totalPages && <i className="fas fa-caret-right" onClick={() => data.incrementPage()}/>}
        {data.pageNumber < (data.totalPages - 1) &&
        <i className="fas fa-step-forward" onClick={() => data.setPage(data.totalPages)}/>}
    </div>

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const showModal = (headerText: string, bodyText: string): void => {
        setModalHeader(headerText);
        setModalbody(bodyText)
        handleShow();
    }

    const modal = <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>{modalHeader}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalBody}</Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
        </Modal.Footer>
    </Modal>

    return (
        <div>
            {modal}
            <header className="logined-user-box">
                <div>
                    {
                        Users.loginedUserDB && (
                            <span onClick={() => history.push("/")}>
                                <i className="far fa-user"/> {Users.loginedUserDB.userName} <span
                                style={{color: "green"}}>{Users.userBalance}$</span>
                            </span>
                        )
                    }
                </div>
                <div className="ml-3">
                    <span onClick={() => history.push("/cart")}>
                        <b><i className="fab fa-opencart" style={{fontSize: "25px"}}/></b>
                    </span>
                </div>
            </header>
            <div className="cads-box">
                {data.toursDB.length === 0 ? (<h3>Loading...</h3>) : (
                    <>
                        <div className="sort-and-filter-box">
                            <div className="sort-and-filter-box__menu">
                                {params}
                            </div>
                        </div>
                        {data.toursDB && data.toursDB.map(value => (
                            <Card key={value.id} tour={value}/>
                        ))}
                    </>
                )}
            </div>
            {
                data.totalPages > 1 && pagination
            }
        </div>
    );
})

export default ToursList;
