import React, {useContext, useState} from "react";
import {Row, Col, Button, Input} from "reactstrap";

const ClientComponent = () => {
    const [clients, setClients] = useState([]);
    const [open, setOpen] = useState(false);
    
    const currentUser = useContext(CurrentUserContext).currentUser;
    
    const getClients = (e) => {

        let filtering = {
            filterType: e.target.filterType.value
        }
        
        let sorting = {
            columnName: e.target.columnName
        }
    }

    const hasPermission = (permission) => {
        return currentUser?.permissions?.includes(permission);
    }

    const openAddModal = (e) => {
        setClients(e ? e : {});

        setOpen(!open)
    }
    
    return (
        <>
            <Row>
                <Col md={2}>
                    {hasPermission("ADD_CLIENT") &&
                        <Button
                            color={"success"}
                            onClick={() => openAddModal('')}>
                            + ADD
                        </Button>}
                </Col>
                <Col md={9}>
                    <Row>
                        <Col md={6}>
                            <Input placeholder={"Qidirish"}/>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    )
}

export default ClientComponent;