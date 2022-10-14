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
import {
    WEBSOCKET_ADD_USER_PATH,
    WEBSOCKET_GET_CHATS_PATH,
    WEBSOCKET_GET_MESSAGES_PATH,
    WEBSOCKET_SEARCH_USER_PATH
} from "../../utils/api";
import {USERNAME} from "../../utils/RestContants";
import {toast} from "react-toastify";
import SockJsClient from 'react-stomp'

const Chat = () => {
    const [chats, setChats] = useState([]);
    const [messages, setMessages] = useState([]);
    const [selectedChat, setSelectedChat] = useState({});
    const [open, setOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [content, setContent] = useState('');
    const [clientRef, setClientRef] = useState('');

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

    const getMessagesByChatId = (chatId) => {
        axios.get(
            WEBSOCKET_GET_MESSAGES_PATH + '/' + chatId
        ).then(res => {
            console.log(res);
            setMessages(res.data)
        })
    }

    const searchUser = (e) => {
        axios.post(
            WEBSOCKET_SEARCH_USER_PATH,
            {username: e.target.value},
            {headers: {username}}
        )
            .then(res => {
                console.log(res);
                setChats([
                    ...res.data.global,
                    ...res.data.local]
                )
            })
    }

    const writeMessage = (e) => {
        setContent(e.target.value)
    }

    const sendMessage = () => {
        clientRef.sendMessage('/my-app/send-message', JSON.stringify({
            username,
            content,
            receiverUsername: selectedChat.username
        }));
        let obj = {username,
            content,
            receiverUsername: selectedChat.username};
        setMessages([...messages,obj])
    }

    useEffect(() => {
        if (!localStorage.getItem("username"))
            setOpen(true);
        else {
            getChats();
            setUsername(localStorage.getItem(USERNAME))
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
                        onChange={searchUser}
                        style={{height: '75px'}}
                        placeholder={"Search chat"}/>
                    {chats.map(item =>
                        <Card>
                            <CardBody
                                onClick={() => {
                                    setSelectedChat(item);
                                    getMessagesByChatId(item.chatId);
                                }}
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
                    {selectedChat.username && <Row>
                        <Card>
                            <CardBody style={{cursor: 'pointer'}}>
                                <CardTitle>
                                    <h3>{selectedChat.username}</h3>
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
                                onChange={writeMessage}
                                type={"textarea"}
                                style={{width: '80%'}} placeholder={"Enter message text"}/>
                            <Badge
                                onClick={sendMessage}
                                style={{cursor: 'pointer', width: '10%'}} color="secondary">Send</Badge>
                        </div>
                    </Row>
                </Col>
            </Row>
        }

        <SockJsClient url='http://localhost:8080/ketmon-register/'
                      topics={['/telegram/' + username]}
                      onConnect={() => {
                          console.log("connected");
                      }}
                      onDisconnect={() => {
                          console.log("Disconnected");
                      }}
                      onMessage={(msg) => {
                          setMessages([...messages, msg])
                      }}
                      ref={(client) => {
                          setClientRef(client)
                      }}/>
    </>)
}

export default Chat;