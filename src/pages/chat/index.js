import React, {useEffect, useState} from "react";
import {
    Badge,
    Button,
    Card,
    CardBody,
    CardSubtitle,
    CardTitle,
    Col, Form, FormGroup,
    Input, Label,
    Modal, ModalBody, ModalFooter,
    ModalHeader,
    Navbar,
    Row
} from "reactstrap";
import {Link} from "react-router-dom";
import axios from "axios";
import {WEBSOCKET_ADD_USER_PATH, WEBSOCKET_GET_CHATS_PATH} from "../../utils/api";
import {USERNAME} from "../../utils/RestContants";
import {toast} from "react-toastify";
import style from "./style.css"

const Chat = () => {
    const [chats, setChats] = useState([]);
    const [messages, setMessages] = useState([]);
    const [selectedChat, setSelectedChat] = useState();
    const [open, setOpen] = useState(false);

    const addUser = (e) => {
        e.preventDefault();
        axios.post(
            // WEBSOCKET_ADD_USER_PATH,
            "http://10.10.1.107:8090/user/sign/",
            {headers:
                    {
                    "Content-Type": "application/json",
                    username: "e.target.username.value"
            }}
        ).then(res => {
            localStorage.setItem(USERNAME, res.data.username.valueOf());
            toggleModal();
        }).catch(err => {
            toast.error(err+"!")
        })
    }

    const toggleModal = () => {
        setOpen(!open)
    }

    const getChats = () => {
        axios.get(
            WEBSOCKET_GET_CHATS_PATH,
            {headers: {username: localStorage.getItem(USERNAME)}}
        ).then(res => {
            console.log(res);
            setChats(res.data)
        })
    }

    useEffect(() => {
        if (!localStorage.getItem("username"))
            setOpen(true)
        else {
            getChats()
        }
    }, [])
    return (<>
        {!localStorage.getItem("username") ?
            <>
                <Link to={"/"}>Orqaga qaytish</Link>
                <Modal isOpen={open}>
                    <ModalHeader>Ro'yxatdan o'tish</ModalHeader>
                    <Form onSubmit={addUser}>
                        <ModalBody>
                            <FormGroup>
                                <Label for="username" sm={2}>Username</Label>
                                <Input
                                    id={"username"}
                                    name={"username"}
                                    placeholder={"Username o'ylab toping"}/>
                            </FormGroup>

                        </ModalBody>
                        <ModalFooter>
                            <Button
                                color="danger"
                                type={"button"}
                                onClick={toggleModal}>Close</Button>{' '}
                            <Button
                                color="success"
                                type={"submit"}>Save</Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </>
            :
            <Row className={"root"}>
                <Col md={3} className={"chats"}>
                    <Input placeholder={"Search chat"} className={"search"}/>
                    {chats.map(item =>
                        <Card className={"card"}>
                            <CardBody>
                                <CardTitle className={"title"}>
                                    <h3 className={"h3"}>{item.name}</h3>
                                    <Badge className={"badge"}>
                                        {item.unread}
                                    </Badge>
                                </CardTitle>
                            </CardBody>
                        </Card>
                    )}
                </Col>
                <Col md={9} className={"chat"}>
                     <Row className={"top"}>
                        <Card className={"card"}>
                            <CardBody className={"card_body"}>
                                <CardTitle>
                                    <h3>{selectedChat?.name}</h3>
                                </CardTitle>
                            </CardBody>
                        </Card>
                    </Row>
                    <Row className={"middle"}>
                        <Card style={{borderRadius: "0px"}}>
                            <CardBody>
                                {messages.map(item =>
                                    <Card style={
                                        {
                                            width: '250px',
                                            marginTop: '5px'
                                        }
                                    }>
                                        <CardBody>
                                            {item.text}
                                        </CardBody>
                                    </Card>)}
                            </CardBody>
                        </Card>
                    </Row>
                    <Row>
                        <div className="message">
                            <Input
                                type={"textarea"}
                                className={"send_message"}/>
                            <Badge className={"send"}>Send</Badge>
                        </div>
                    </Row>
                </Col>
            </Row>
        }
    </>);
}

export default Chat;