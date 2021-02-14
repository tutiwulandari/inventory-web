import {Form, FormGroup, Label, Input, Button, Container, InputGroup, InputGroupAddon} from "reactstrap";
import {Link, useParams, useHistory, Redirect} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import React, {useEffect, useState} from 'react'
import {getItemById, save} from "../../action/itemAction";
import {connect} from "react-redux";
import ContainerError from "../../components/Containers";
import {findAll} from "../../action/unitAction"
import {faSave} from "@fortawesome/free-solid-svg-icons/faSave";

const ItemForm = ({isLoading, item,findAll, savedItem, getItemById, save, error, units}) => {
    const {id} = useParams();
    const [redirect, setRedirect] = useState(false);
    const [data, setData] = useState({})
    const history = useHistory();

    const [unitsModel, setUnitsModel] = useState([])
    useEffect(() => {
        findAll({page: 0, size: 100}, {code: null, description: null})
    }, [findAll])

    const onReload = (id) => {
        getItemById(Number(id))
        // findAll()
    }

    useEffect(() => {
        if(id) {
            onReload(id)
        }
    }, [id, getItemById])

    useEffect(() => {
        if(id) {
            getItemById(id)
        }
        if (units) {
            setUnitsModel(units)
        }
    }, [id, getItemById, units])


    useEffect(() => {
        if(id && item ) {
            setData({
                ...item
            })
        }
    }, [id, item])


    useEffect(() => {
        if (savedItem) {
            history.push('/items');
        }
    }, [savedItem, history])
    //setiap ada perubahan saveUnit dan history useEffect dijalankan

    const onSubmit = (event) => {
        event.preventDefault();
        save(data)
    }

    if (redirect === true) {
        return <Redirect to="/items" />
    }

    return (
        <ContainerError error={error} >
            <Container>
            <div>
                <Link to="/items">
                    <Button style={{marginTop: "100px"}} color="dark">
                        <FontAwesomeIcon icon={faArrowLeft}/>
                        Back
                    </Button>
                    <br/> <br/>
                </Link>
            </div>

            <div style={{width: "50%"}}>
                {
                    !isLoading ? units &&
                    <Form onSubmit={onSubmit}>
                        <FormGroup>
                            <Label htmlFor="name" sm={5} size="lg">Product Name</Label>
                            <Input type="text" name="name" bsSize="lg"
                                   id="name" placeholder="input product name"
                            value={data.name || ''} onChange= {event => setData({...data, name:event.target.value})}/>
                        </FormGroup>

                        <FormGroup>
                            <Label htmlFor="price" sm={5} size="lg">Price</Label>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">Rp.</InputGroupAddon>
                                <Input placeholder="Input Price" min={0} max={100} type="number" step="1"
                                       name="price" bsSize="lg" value={data.price || ''} onChange={event =>
                                    setData({...data, price:event.target.value})}  />
                                <InputGroupAddon addonType="append">.00</InputGroupAddon>
                            </InputGroup>
                        </FormGroup>
                        <FormGroup>
                            <Label for ="unit" sm={5} size="lg"> Unit </Label>
                            <Input type="select" name="unit" onChange={event => setData({...data, unitId: event.target.value})}>
                                <option>-- Choose --</option>
                                { console.log("UNITS", unitsModel)}
                                {
                                    unitsModel.map((element, index) =>
                                        <option key={index} value={element.id}> {element.description}</option>
                                    )}
                            </Input>
                        </FormGroup><br/>
                        <FormGroup>
                            <Button color="dark">
                                <FontAwesomeIcon icon={faSave}/>
                                {id > 0 ? "     Update" : "     Save"} </Button> {'   '}
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
            item: state.getItemById.data || [],
            isLoading: state.getItemById.isLoading || state.saveItem.loading,
            units: state.findAllUnit.data || [],
            savedItem: state.saveItem.data,
            error: state.getItemById.error || state.saveItem.error,
            update: state.updateItem,
        }
    }

const mapDispatchToProps = {getItemById, save, findAll}

export default connect(mapStateToProps, mapDispatchToProps)(ItemForm);