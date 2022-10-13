import React, {useEffect, useState} from "react";
import {
    Badge,
    Button,
    Card,
    CardBody,
    CardTitle,
    Col, Form, FormGroup,
    Input, Label,
    Modal, ModalBody, ModalFooter,
    ModalHeader,
    Row
} from "reactstrap";
import {Link} from "react-router-dom";
import axios from "axios";
import {WEBSOCKET_ADD_USER_PATH, WEBSOCKET_GET_CHATS_PATH, WEBSOCKET_GET_MESSAGES_PATH} from "../../utils/api";
import {USERNAME} from "../../utils/RestContants";
import {toast} from "react-toastify";

const Chat = () => {
    const [chats, setChats] = useState([
        {
            id: '10',
            username: 'aaa',
            unread: 33
        }
    ]);
    const [messages, setMessages] = useState([]);
    const [selectedChat, setSelectedChat] = useState({});
    const [open, setOpen] = useState(false);
    const [newmessage, setNewMessage] = useState([]);
    const setText = (e) => setNewMessage(e.target.value);

    const addUser = (e) => {
        e.preventDefault();
        axios.post(
            WEBSOCKET_ADD_USER_PATH,
            {username: e.target.username.value}
        ).then(res => {
            localStorage.setItem(USERNAME, res.data.data.username);
            toggleModal();
        }).catch(err => {
            toast.error("Bunday user mavjud")
        })
    }

    const addMessage = () => {
        axios.post(
            WEBSOCKET_ADD_MESSAGE_PATH,
            
        )
    }

    const selectChat = (item) => {
        setSelectedChat(item);

        getMessages(item);
    }

    const toggleModal = () => {
        setOpen(!open)
    }

    const headers = {
        'Content-Type': 'application/json',
        username: localStorage.getItem(USERNAME),
    };

    const getChats = () => {
        console.log(headers.username);
        axios.get(
            WEBSOCKET_GET_CHATS_PATH,
            {headers}
        ).then(res => {
            console.log(res);
            setChats(res.data.data)
        })
    }
    
    let chatId = selectedChat.id;

    const getMessages = (item) => {
        axios.get(
            WEBSOCKET_GET_MESSAGES_PATH + '/' + chatId,
            {headers}
        ).then( res => {
            console.log(res);
            setMessages(res.data.data)
        })
    }
    
    

    useEffect(() => {
        if (!localStorage.getItem(USERNAME))
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
            <Row style={{margin: '50px'}}>
                <Col md={3}>
                    <Input
                        style={{height: '75px'}}
                        placeholder={"Search chat"}/>
                    {chats.map(item =>
                        <Card>
                            <CardBody
                                onClick={() => selectChat(item)}
                                style={{cursor: 'pointer'}}>
                                <CardTitle>
                                    <h3>{item.username}
                                        <Badge style={{marginLeft: '200px'}} color="secondary">
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
                            <CardBody style={{cursor: 'pointer'}}>
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
                                    <Card style={{
                                        marginTop: '10px',
                                        width: '50%'
                                    }}>
                                        <CardBody>
                                            {item.content}
                                        </CardBody>
                                    </Card>)}
                            </CardBody>
                        </Card>
                    </Row>
                    <Row style={{position: 'relative'}}>
                        <div
                            style={{display: 'flex', position: 'absolute'}}>
                            <Input
                                id = "message"
                                name = "message"
                                onChange={setText()}
                                type={"textarea"}
                                style={{width: '80%'}} placeholder={"Enter message text"}/>
                            <Badge onClick={addMessage()} style={{cursor: 'pointer', width: '10%'}} color="secondary">Send</Badge>
                        </div>
                    </Row>
                </Col>
            </Row>
        }
    </>)
}

export default Chat;