import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import {findById} from "../../action/unitAction";
import {Table} from "react-bootstrap";
import {Container} from "reactstrap";

//findById ambil dari dispact
function UnitDetail({ isLoading, unit, findById }) {

    let { id } = useParams()

    useEffect(() => {
        //jika ada id yg dipiih
        findById(id)
    }, [findById])


    useEffect(() => {
        //jika ada id yg dipiih
        if (id > 0)
            findById(id)
    }, [findById])


    return (
        <Container>
            <Table striped>
                <thead>
                <tr>
                    <th width="200">ID</th>
                    <th width="200">Code</th>
                    <th width="200">Description</th>
                </tr>
                </thead>
                <tbody>
                {!isLoading ? unit &&
                    <tr>
                        <td >{unit.code}</td>
                        <td >{unit.description}</td>
                    </tr>
                    : <p>Loading...</p>}
                </tbody>
            </Table>
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.findById.loading || state.saveUnit.loading,
       unit: state.findById.data || [],
    }
}

//findById ambil dari action
const mapDispatchToProps = { findById}

export default connect(mapStateToProps, mapDispatchToProps)(UnitDetail)