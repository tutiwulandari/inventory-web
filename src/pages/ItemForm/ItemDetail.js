import React, { useEffect} from 'react'
import { connect } from 'react-redux';
import {Link, useParams} from 'react-router-dom';
import {getItemById} from "../../action/itemAction";
import {Table} from "react-bootstrap";
import {Button, Container} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";

//findById ambil dari dispact
function ItemDetail({ isLoading, item, getItemById }) {

    let { id } = useParams()

    useEffect(() => {
        //jika ada id yg dipiih
        getItemById(id)
    }, [getItemById])


    useEffect(() => {
        //jika ada id yg dipiih
        if (id > 0)
            getItemById(id)
    }, [getItemById])


    return (
        <Container>
            <div>
                <Link to="/items">
                    <Button style={{marginTop: "10px"}} color="dark">
                        <FontAwesomeIcon icon={faArrowLeft}/>
                        Back
                    </Button>
                    <br/> <br/>
                </Link>
            </div>
            <Table striped bordered hover size="sm">
                <thead>
                <tr style={{textAlign:"center"}}>
                    <th width="200">ID</th>
                    <th width="200">Name</th>
                    <th width="200">Price</th>
                    <th width="200">Code</th>
                    <th width="200">Description</th>
                </tr>
                </thead>
                <tbody>
                {!isLoading ?
                    item.unit &&
                    <tr style={{textAlign:"center"}}>
                        <td >{item.id}</td>
                        <td >{item.name}</td>
                        <td >{item.price}</td>
                        <td >{item.unit.code}</td>
                        <td >{item.unit.description}</td>
                    </tr>
                    : <p>Loading...</p>}
                </tbody>
            </Table>
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.getItemById.loading || state.saveItem.loading,
        item: state.getItemById.data || [],
    }
}

//findById ambil dari action
const mapDispatchToProps = { getItemById}

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetail)