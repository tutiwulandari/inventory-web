import {Form, FormGroup, Label, Input, Button, Row, Col, Container} from "reactstrap";
import {Link, useParams, useHistory, Redirect} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import React, {useEffect, useState} from 'react'
import {findById, save} from "../../action/unitAction";
import {connect} from "react-redux";
import ContainerError from "../../components/Containers";
import {faSave} from "@fortawesome/free-solid-svg-icons/faSave";


const UnitForm = ({isLoading, unit, savedUnit, findById, save, error}) => {
    const {id} = useParams();
    const [redirect, setRedirect] = useState(false);
    const [data, setData] = useState({})
    const history = useHistory();

    useEffect(() => {
        if (id && parseInt(id) !== data.id) {
            findById(id);
            setData(unit)
        }
    }, [unit])

    useEffect(() => {
        // console.log(savedUnit)
        if (savedUnit) {
            history.push('/unitList');
        }
    }, [savedUnit])



    const handleChange = (event) => {
        // const {name, value} = event.target
        let name = event.target.name
        let value = event.target.value
        setData({...data, [name]: value})
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        save(data);
    }

    if (redirect === true) {
        return <Redirect to="/unitList"/>
    }


    return (
        <ContainerError error={error} >
            <Container style={{backgroundColor:"dark"}}>
            <div>
                <Link to="/unitList">
                    <Button style={{marginTop: "100px"}} color="dark">
                        <FontAwesomeIcon icon={faArrowLeft}/>
                        Back
                    </Button>
                    <br/> <br/>
                </Link>
            </div>

            <div style={{width: "50%"}}>
                {
                !isLoading ?
                    <Form onSubmit={handleSubmit} >
                        <FormGroup>
                            <Input sm={5} size="lg" onChange={handleChange} value={data?.id || '' } type="text" name="id"
                                   hidden={true}/>
                            <Label htmlFor="code" sm={5} size="lg" style={{fontFamily:"cursive"}}>Code </Label>
                            <Input onChange={handleChange} type="text" value={data?.code || ''} name="code" bsSize="lg"
                                   id="code" placeholder="input code"/>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="description" sm={5} size="lg" style={{fontFamily:"cursive"}}>Description</Label>
                            <Input onChange={handleChange} type="text" value={data?.description || ''}
                                   name="description" bsSize="lg" id="description" placeholder="input description"/>
                        </FormGroup>
                        <Button color="dark">
                            <FontAwesomeIcon icon={faSave}/>
                            {id > 0 ? "     Update" : "     Save"}
                        </Button>
                    </Form> :
                    <div> Loading...</div>
                }
            </div>
            </Container>
        </ContainerError>
    );
}

const mapStateToProps = (state) => {
    console.log("state")
        return {
            //call reducer
            unit: state.findUnitById.data,
            isLoading: state.findUnitById.isLoading,
            savedUnit: state.saveUnit.data,
            update: state.updateUnit,
        }
    }

const mapDispatchToProps = {findById, save}

export default connect(mapStateToProps, mapDispatchToProps)(UnitForm);