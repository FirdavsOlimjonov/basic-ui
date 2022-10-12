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
        axios.get(
            // WEBSOCKET_ADD_USER_PATH,
            "http://localhost:8090/api/telegram/login",
            {
                headers:
                    {
                        username: e.target.username.value
                    }
            }
        ).then(res => {
            localStorage.setItem(USERNAME, res.data.data.username);
            toggleModal();
        }).catch(err => {
            toast.error(err + "!")
        })
    }

    let setSelectedChatAndGEtMessage = (e) => {
        console.log(e)
        setSelectedChat(e);
        getMessage(e)
    };

    const toggleModal = () => {
        setOpen(!open)
    }

    const getChats = () => {
        axios.get(
            "http://localhost:8090/api/telegram/get-chats",
            {headers: {username: localStorage.getItem(USERNAME)}}
        ).then(res => {
            setChats(res.data.data)
        })
    }

    const getMessage = (e) => {
        axios.post(
            "http://localhost:8090/api/telegram/get-message",
            {
                chatid: selectedChat?.id,
                fromId: e.from.id,
                toId: e.to.id
            }
        ).then(res => {
            setMessages(res.data.data)
        })
    }


    const sendMessage = (e) => {

        e.preventDefault();


        axios.post(
            "http://localhost:8090/api/telegram/send-message",
            {
                message: e.target.message.value,
                chatId: selectedChat?.id
            }
        ).then(res => {
            console.log(res)
            setMessages([...messages, res.data.data])
        })
    };

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
                        item.to.username === localStorage.getItem(USERNAME)
                            ? ''
                            :
                            <Card className={"card"}>
                                <CardBody onClick={
                                    () => setSelectedChatAndGEtMessage(item)}
                                >
                                    <CardTitle className={"title"}>
                                        <h3 className={"h3"}>{item.to.username}</h3>
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
                                    <h3>{selectedChat?.to?.username}</h3>
                                </CardTitle>
                            </CardBody>
                        </Card>
                    </Row>
                    <Row className={"middle"}>
                        <Card style={{borderRadius: "0px"}}>
                            <CardBody>
                                {
                                    console.log(messages)
                                }
                                {
                                    messages?.map(item =>
                                        <Card style={
                                            {
                                                width: '250px',
                                                marginTop: '5px'
                                            }
                                        }>
                                            <CardBody>
                                                {item.message}
                                            </CardBody>
                                            <div className={"send_date"}>
                                                {
                                                    new Date(item.messageDate).getFullYear()+"."+
                                                    new Date(item.messageDate).getMonth()+"."+
                                                    new Date(item.messageDate).getDate()+"."+
                                                    new Date(item.messageDate).getHours()+"."+
                                                    new Date(item.messageDate).getMinutes()
                                                }
                                            </div>
                                        </Card>)
                                }
                            </CardBody>
                        </Card>
                    </Row>
                    <Row>
                        <div className="message">
                            <Form onSubmit={sendMessage} style={{width: "100%"}}>
                                <Input
                                    type={"textarea"}
                                    className={"send_message"}
                                    name={"message"}
                                />
                                <Button className={"send"} type={"submit"}>Send</Button>
                            </Form>
                        </div>
                    </Row>
                </Col>
            </Row>
        }
    </>);
}

export default Chat;