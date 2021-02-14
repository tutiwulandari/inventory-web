import React, {useEffect} from "react";
import {Button, Container} from "reactstrap";
import {Table} from "react-bootstrap";
import {connect} from "react-redux";
import {getStockById} from "../../action/stockAction"
import {Link, useParams} from "react-router-dom"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";

function StockDetail( { isLoading, stock, getStockById}) {

    let {id} = useParams();

    useEffect(() => {
        getStockById(id)
    }, [getStockById])


    useEffect(() => {
        if (id > 0)
            getStockById(id)
    }, [getStockById])

return (
    <Container>
        <div>
            <Link to="/stocks">
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
                <th width="200">Quantity</th>
                <th width="200">Name</th>
                <th width="200">Price</th>
                <th width="200">Code</th>
                <th width="200">Description</th>
            </tr>
            </thead>
            <tbody>
            {
                !isLoading ? stock.item &&
                <tr style={{textAlign:"center"}}>
                    <td >{stock.id}</td>
                    <td >{stock.quantity}</td>
                    <td >{stock.item.name}</td>
                    <td >{stock.item.price}</td>
                    <td >{stock.item.unit.code}</td>
                    <td >{stock.item.unit.description}</td>
                </tr>
                : <p>Loading...</p>
            }
            </tbody>
        </Table>
    </Container>
)
}
const mapStateToProps = (state) => {
    return {
        isLoading: state.getStockById.loading || state.saveStock.loading,
        stock: state.getStockById.data || [],
    }
}

//findById ambil dari action
const mapDispatchToProps = { getStockById}

export default connect(mapStateToProps, mapDispatchToProps)(StockDetail)