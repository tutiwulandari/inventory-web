import BootstrapTable from "react-bootstrap-table-next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faInfo, faEdit, faTrash, faPlus} from "@fortawesome/free-solid-svg-icons";
import {Container, Button, Row, Col, Spinner, ButtonGroup} from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import React, {useEffect, useState} from "react";
import { getAll, removeById } from "../../action/itemAction";
import ContainerError from "../../components/Containers";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import swal from 'sweetalert';
import { PaginationButton } from "../../components/Button";


const { SearchBar } = Search
//Mengurutkan berdasarkan id(ada di Sort table with bootstrap 4)
const defaultSorted = [
  {
    dataField: "id",
    order: "asc",
  },
];

function ItemList({ isLoading, items, getAll, isRemoved, error, removeById, size, total, currentPage}) {

  //Pagination
  const [pageParam, setPageParam] = useState(0);
  const [sizeParam, setSizeParam] = useState(10);
  const totalPage = Math.ceil(total / size);

  const onReload = () => {
    getAll(
        { page: pageParam, size: sizeParam }
    )};

  useEffect(onReload, []);

  useEffect(onReload, [getAll, pageParam, sizeParam]);

  useEffect(() => {
    if (isRemoved) {
      onReload();
    }
  }, [isRemoved, getAll]);

  const onDelete = (id) => {
    swal({
      title: "Are you sure delete this data??",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
        .then(willDelete => {
          if (willDelete) {
            removeById(id);
            swal("Deleted!", "Data has been deleted!\"", {
              icon: "success"
            });
          } else {
            swal("Data Failed to delete")
          }
        });
  }


  const columns = [
    {
      dataField: "id",
      text: "ID",
      sort: true,
      headerStyle: () => {
        return { textAlign: "center" };
      },
    },
    {
      dataField: "name",
      text: "Name",
      sort: true,
      headerStyle: () => {
        return { textAlign: "center" };
      },
    },
    {
      dataField: "price",
      text: "Price",
      sort: true,
      headerStyle: () => {
        return { textAlign: "center" };
      },
    },
    {
      dataField: "link",
      text: "Action",
      headerStyle: () => {
        return { textAlign: "center" };
      },
      formatter: (rowContent, row) => {
        return (
            <div style={{textAlign:"center"}}>
              <Link to={"/detailItem/"+ row.id}>
                <Button color="dark" className="mt-2">
                  <FontAwesomeIcon icon={faInfo} />
                  Detail
                </Button>{" "}
                {"    "}
              </Link>

              <Link to={"/item/"+ row.id +"/edit"}>
                <Button color="warning" className="mt-2">
                  <FontAwesomeIcon icon={faEdit} />
                  Edit
                </Button>{" "}
                {"     "}
              </Link>

              <Button color="danger" className="mt-2" onClick={() => onDelete(row.id)}>
                <FontAwesomeIcon icon={faTrash} />
                Delete
              </Button>
            </div>
        );
      },
    },
  ];

  return (
      <ContainerError error={error}>
        <Container>
          <div style={{fontFamily:"cursive"}}>
            <h1 style={{textAlign:"center"}}> <br/>ITEM LIST</h1>
          </div>
          {
            !isLoading ? (
              <ToolkitProvider
                  bootstrap4
                  keyField="id"
                  data= {items}
                  columns={columns}
                  defaultSorted={defaultSorted}
                  onDelete={(value)=>onDelete(value)}
                  search
              >
                {(items) => (
                    <div>
                      <Row>
                        <Col>
                          <Link to="/item">
                            <Button color="dark" className="mr-2">
                              <FontAwesomeIcon icon={faPlus} />
                              {'     '}Create
                            </Button>
                            <br/> <br/>
                          </Link>
                        </Col>
                        <Col>
                          <div className="float-right">
                            <SearchBar {...items.searchProps} placeholder="Search .." />
                          </div>
                          <br/> <br/>
                        </Col>
                      </Row>
                      <BootstrapTable {...items.baseProps}  rowStyle={{textAlign:"center"}} hover condensed />
                      <Row>
                        <Col className="mt-2">
                          <PaginationButton currentPage={currentPage} setPage={setPageParam} totalPage={totalPage}/>
                        </Col>
                        <Col>
                          <div className="float-right">
                            <ButtonGroup size="md" style={{fontFamily:"cursive"}}>
                              <Button onClick={() => { setSizeParam(1) }} color="primary"> 1
                              </Button>
                              <Button onClick={() => { setSizeParam(2) }} color="primary" > 2
                              </Button>
                              <Button onClick={() => { setSizeParam(3) }} color="primary"> 3
                              </Button>
                            </ButtonGroup>
                          </div>

                        </Col>
                      </Row>


                    </div>

                )}
              </ToolkitProvider>
          ) : (
              <div className="text-center">
                {items.error ? (
                    <h4>{items.error}</h4>
                ) : (
                    <Spinner color="dark" />
                )}
              </div>
          )
          }

        </Container>
      </ContainerError>
  );
}

const mapStateToProps = (state) => {
  return {
    //manggil dari reducer (mengambil state)
    isRemoved: state.removeItemById.data,
    items: state.getItems.data || [],
    isLoading: state.getItems.loading || state.removeItemById.loading,
    error: state.getItems.error || state.removeItemById,
    size: state.getItems.pagination.size,
    total: state.getItems.pagination.total,
    currentPage: state.getItems.pagination.page
  };
};

//Mengirimkan action
const mapDispatchToProps = { getAll, removeById };

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
