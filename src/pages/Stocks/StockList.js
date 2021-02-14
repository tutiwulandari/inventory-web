import BootstrapTable from "react-bootstrap-table-next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faInfo, faEdit, faTrash, faPlus} from "@fortawesome/free-solid-svg-icons";
import {Container, Button, Row, Col, Spinner, ButtonGroup} from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import React, {useEffect, useState} from "react";
import { getAll, removeById } from "../../action/stockAction";
import ContainerError from "../../components/Containers";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import swal from 'sweetalert';
import {PaginationButton} from "../../components/Button";



const { SearchBar } = Search

//Mengurutkan berdasarkan id(ada di Sort table with bootstrap 4)
const defaultSorted = [
  {
    dataField: "id",
    order: "asc",
  },
];
function StockList({ isLoading, stocks, getAll, removeById, isRemoved, error, size, total, currentPage }) {
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
      dataField: "quantity",
      text: "Quantity",
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
              <Link to={"/detailStock/"+ row.id}>
                <Button color="dark" className="mt-2">
                  <FontAwesomeIcon icon={faInfo} />
                  Detail
                </Button>{" "}
                {"    "}
              </Link>

              <Link to={"/stock/"+ row.id +"/edit"}>
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
            <h1 style={{textAlign:"center"}}> <br/>STOCK LIST</h1>
          </div>
          { !isLoading ? (
              <ToolkitProvider
                  bootstrap4
                  keyField="id"
                  data= {stocks}
                  columns={columns}
                  defaultSorted={defaultSorted}
                  onDelete={(value)=>onDelete(value)}
                  search

              >
                {(stocks) => (
                    <div>
                      <Row>
                        <Col>
                          <Link to="/stock">
                            <Button color="dark" className="mr-2">
                              <FontAwesomeIcon icon={faPlus} />
                              {'     '}Create
                            </Button>
                            <br/> <br/>
                          </Link>
                        </Col>
                        <Col>
                          <div className="float-right">
                            <SearchBar {...stocks.searchProps} placeholder="Search .." />
                          </div>
                          <br/> <br/>
                        </Col>
                      </Row>
                      <BootstrapTable {...stocks.baseProps}  rowStyle={{textAlign:"center"}} hover condensed/>
                      <Row>
                        <Col>
                          <PaginationButton currentPage={currentPage} setPage={setPageParam} totalPage={totalPage}/>
                        </Col>
                        <Col>
                          <div className="float-right" >
                            <ButtonGroup size="md">
                              <Button onClick={() => { setSizeParam(1) }} color="primary"> 1
                              </Button>
                              <Button onClick={() => { setSizeParam(2) }} color="primary"> 2
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
                {stocks.error ? (
                    <h4>{stocks.error}</h4>
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
    isRemoved: state.removeStockById.data,
    stocks: state.getStocks.data || [],
    isLoading: state.getStocks.loading || state.removeStockById.loading,
    error: state.getStocks.error || state.removeStockById,
    size: state.getStocks.pagination.size,
    total: state.getStocks.pagination.total,
    currentPage: state.getStocks.pagination.page
  };
};

//Mengirimkan action
const mapDispatchToProps = { getAll, removeById };

export default connect(mapStateToProps, mapDispatchToProps)(StockList);
