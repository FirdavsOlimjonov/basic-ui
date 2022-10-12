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
    const [chats, setChats] = useState([
        {
            id:1,
            name: "No Name",
            unread: 2
        }
    ]);
    const [messages, setMessages] = useState([
        {
            id: '100',
            chatId: 10,
            text: 'Pulni bering 1000$'
        }, {
            id: '101',
            chatId: 10,
            text: 'Pulni bering 1000$'
        }, {
            id: '102',
            chatId: 10,
            text: 'Pulni bering 1000$'
        }, {
            id: '103',
            chatId: 10,
            text: 'Pulni bering 1000$'
        }
    ]);
    const [selectedChat, setSelectedChat] = useState({});
    const [open, setOpen] = useState(false);

    const addUser = (e) => {
        e.preventDefault();
        axios.post(
            WEBSOCKET_ADD_USER_PATH,
            {username: e.target.username.value}
        ).then(res => {
            localStorage.setItem(USERNAME, res.data.username);
            toggleModal();
        }).catch(err => {
            toast.error("Bunday user mavjud")
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
                    <Input placeholder={"Search chat"}/>
                    {chats.map(item =>
                        <Card>
                            <CardBody
                                style={{cursor: 'pointer'}}>
                                <CardTitle>
                                    <h3>{item.name}
                                        <Badge>
                                            {item.unread}
                                        </Badge>
                                    </h3>
                                </CardTitle>

                            </CardBody>
                        </Card>
                    )}
                </Col>
                <Col md={9}>
                    {selectedChat.id && <Row>
                        <Card>
                            <CardBody>
                                <CardTitle>
                                    <h3>{selectedChat.name}</h3>
                                </CardTitle>
                            </CardBody>
                        </Card>
                    </Row>}
                    <Row>
                        <Card>
                            <CardBody>
                                {messages.map(item =>
                                    <Card>
                                        <CardBody>
                                            {item.text}
                                        </CardBody>
                                    </Card>)}
                            </CardBody>
                        </Card>
                    </Row>
                    <Row>
                        <div>
                            <Input
                                type={"textarea"}
                                className={"send_message"}/>
                            <Badge>Send</Badge>
                        </div>
                    </Row>
                </Col>
            </Row>
        }
    </>)
}

export default Chat;