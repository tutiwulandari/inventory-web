import {Form, FormGroup, Label, Input, Button, Container} from "reactstrap";
import {Link, useParams, useHistory, Redirect} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import React, {useEffect, useState} from 'react'
import {getStockById, save} from "../../action/stockAction";
import {connect} from "react-redux";
import ContainerError from "../../components/Containers";
import {getAll, getItemById} from "../../action/itemAction";
import {faSave} from "@fortawesome/free-solid-svg-icons/faSave";


const StockForm = ({isLoading, stock, savedStock, getStockById, save, error, getAll, items}) => {
    const {id} = useParams();
    const [redirect, setRedirect] = useState(false);
    const [data, setData] = useState({})
    const history = useHistory();

    const [itemsModel, setItemsModel] = useState([])

    //itemAction
    useEffect(() => {
        getAll({page:0, size:100}, {name: null, price:null})
    }, [getAll])

    const onReload =(id) => {
        getStockById(Number(id))
        // getAll();
    }

    useEffect(() => {
        if(id) {
            onReload(id)
        }
    }, [id, getStockById])

    useEffect(() => {
        if(id) {
            onReload(id)
        }
    },[id, getStockById])

    useEffect(() => {
        if(id) {
            getStockById(id)
        }
        if (items) {
            setItemsModel(items)
        }
    }, [id, getStockById, items])

    useEffect(() => {
        if(id && stock ) {
            setData({
                ...stock
            })
        }
    }, [id, stock])


    //Save
    useEffect(() => {
        if (savedStock) {
            history.push('/stocks');
        }
    }, [savedStock, history])


    const handleSubmit = (event) => {
        event.preventDefault();
        save(data);
    }

    if (redirect === true) {
        return <Redirect to='/stocks'/>
    }

    return (
        <ContainerError error={error} >
            <Container>
            <div>
                <Link to="/stocks">
                    <Button style={{marginTop: "100px"}} color="dark">
                        <FontAwesomeIcon icon={faArrowLeft}/>
                        Back
                    </Button>
                    <br/> <br/>
                </Link>
            </div>

            <div style={{width: "50%"}}>
                {!isLoading ? items &&
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="stock" sm={5} size="lg" style={{fontFamily:"cursive"}}> Name </Label>
                            <Input type="select" name="unit" onChange={event => setData({...data, itemId: event.target.value})}>
                            <option>--Choose --</option>
                            {
                                itemsModel.map((element, index) =>
                                    <option key={index} value={element.id}>{element.name}</option>
                            )}
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="quantity" sm={5} size="lg" style={{fontFamily:"cursive"}}> Quantity</Label>
                            <Input type="text" name="quantity" bsSize="lg" id="quantity" placeholder="input quantity product"
                                   value={data.quantity || ''} onChange={event => setData({...data, quantity: event.target.value})}/>
                        </FormGroup> <br/>
                        <FormGroup>
                            <Button color="dark">
                                <FontAwesomeIcon icon={faSave}/>
                                {id > 0 ? "     Update" : "     Save"}</Button> {'  '}
                        </FormGroup>
                    </Form> :
                    <p> Loading...</p>
                }
            </div>
            </Container>
        </ContainerError>
    );
}

const mapStateToProps = (state) => {
    return {
        //call reducer
        stock: state.getStockById.data || [],
        isLoading: state.getStockById.isLoading || state.saveStock.loading,
        items : state.getItems.data || [],
        savedStock: state.saveStock.data,
        error: state.getStockById.error || state.saveStock.error,
        update: state.updateStock
    }
}

const mapDispatchToProps = {getStockById, save, getAll}

export default connect(mapStateToProps, mapDispatchToProps)(StockForm);