import React from 'react'
import {Table} from "reactstrap";
import {Link} from "react-router-dom";

const ItemRow = ({data}) => {
    return (
        <Link to= '/detailItem/id'>
            <Table striped>
                <tbody>
                <tr>
                    <td width="200">Product Name</td>
                    <td width="10">:</td>
                    <td>{data.name}</td>
                </tr>
                <tr>
                    <td width="200">Price</td>
                    <td width="10">:</td>
                    <td>{data.price}</td>
                </tr>
                <tr>
                    <td width="200">Code</td>
                    <td width="10">:</td>
                    <td>{data.unit.code}</td>
                </tr>
                <tr>
                    <td width="200">Description</td>
                    <td width="10">:</td>
                    <td>{data.unit.description}</td>
                </tr>

                </tbody>
            </Table>
        </Link>
    );
}

export default ItemRow;