import React, {useEffect, useState} from "react";
import {
    Badge,
    Button,
    Card,
    CardBody,
    CardTitle,
    Col,
    Form,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row
} from "reactstrap";
import {Link} from "react-router-dom";
import axios from "axios";
import {
    WEBSOCKET_ADD_USER_PATH,
    WEBSOCKET_GET_CHATS_PATH,
    WEBSOCKET_GET_MESSAGES_PATH,
    WEBSOCKET_SEARCH_USERS_PATH,
    WEBSOCKET_SEND_MESSAGE_PATH
} from "../../utils/api";
import {USERNAME} from "../../utils/RestContants";
import {toast} from "react-toastify";

const Chat = () => {
    const [chats, setChats] = useState([]);
    const [searches, setSearches] = useState([]);
    const [messages, setMessages] = useState([]);
    const [selectedChat, setSelectedChat] = useState({});
    const [open, setOpen] = useState(false);
    const [searching, setSearching] = useState(false);

    const addUser = (e) => {

        e.preventDefault();

        axios.get(
            WEBSOCKET_ADD_USER_PATH,
            {
                headers: {
                    username: e.target.username.value
                }
            }
        ).then(res => {
            localStorage.setItem(USERNAME, res.data.data.username);
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
            // console.log(res);
            setChats(res.data.data)
            // console.log(chats);

        })
    }

    const getMessagesByChatId = (e) => {
        let path = '';
        if (e.id)
            path = '?chatId=' + e.id
        axios.get(
            WEBSOCKET_GET_MESSAGES_PATH + path,
            {headers: {username: e.username}}
        ).then(res => {
            setMessages(res.data.data)
        })
    }

    const headers = {
        'username': localStorage.getItem(USERNAME)
    }


    const setChatAndGetMessages = (e) => {
        setSelectedChat(e);
        console.log(selectedChat);
        getMessagesByChatId(e)
        // setSearching(false)
    }

    const sendMessage = (e) => {
        console.log(e);
        axios.post(WEBSOCKET_SEND_MESSAGE_PATH, {
            text: e,
            toUser: selectedChat.username
        }, {
            headers: headers
        })
            .then(res => {
                console.log(res);
                messages.concat(...messages, res.data.data)
            })

    }

    const searchChats = (e) => {
        axios.get(
            WEBSOCKET_SEARCH_USERS_PATH + e.target.value
        )
            .then(res => {
                setSearches(res.data.data)
                setSearching(true)
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
                                onClick={toggleModal}
                                type={"submit"}>Save</Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </>
            :
            <Row style={{margin: '50px'}}>
                <Col md={3}>
                    <Input
                        onSubmit={searchChats}
                        style={{height: '75px'}}
                        id={"search"}
                        name={"search"}
                        onClick={searchChats}
                        placeholder={"Search chat"}/>
                    {searching ?
                        searches.map(search =>
                            <Card>
                                <CardBody
                                    onClick={() => setChatAndGetMessages(search)}
                                    style={{cursor: 'pointer'}}>
                                    <CardTitle>
                                        <h3>{search.username}
                                        </h3>
                                    </CardTitle>
                                </CardBody>
                            </Card>)
                        : chats.map(item =>
                            <Card>
                                <CardBody
                                    onClick={() => setChatAndGetMessages(item)}
                                    style={{cursor: 'pointer'}}>
                                    <CardTitle>
                                        <h3>{item.username}
                                            <Badge style={{marginLeft: '200px'}} color="secondary">
                                                {1}
                                            </Badge>
                                        </h3>
                                    </CardTitle>

                                </CardBody>
                            </Card>
                        )}
                </Col>
                <Col md={9}>
                    {(selectedChat.id || selectedChat.userId) && <Row>
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
                                            {item.text}
                                        </CardBody>
                                    </Card>)}
                            </CardBody>
                        </Card>
                    </Row>
                    <Row style={{position: 'relative'}}>
                        <div
                            style={{display: 'flex', position: 'absolute'}}>
                            <Input
                                type={"textarea"}
                                id={"message"}
                                onClick={() => sendMessage(document.getElementById("message").value)}
                                onSubmit={sendMessage}
                                style={{width: '80%'}} placeholder={"Enter message text"}/>
                            <Badge
                                style={{cursor: 'pointer', width: '10%'}}
                                color="secondary"
                                onClick={sendMessage}
                                onSubmit={sendMessage}
                            >Send</Badge>
                        </div>
                    </Row>
                </Col>
            </Row>
        }
    </>)
}

export default Chat;