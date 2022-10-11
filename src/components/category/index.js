import React, {useContext, useEffect, useState} from "react";
import {
    Button,
    Col,
    Form,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row,
    Table
} from "reactstrap";
import axios from "axios";
import {ADD_CATEGORY_PATH, CATEGORIES_PATH, DELETE_CATEGORY_PATH, EDIT_CATEGORY_PATH} from "../../utils/api";
import {ACCESS_TOKEN} from "../../utils/RestContants";
import {toast} from "react-toastify";
import Sidebar from "../sidebar";
import CurrentUserContext from "../../utils/CurrentUserContext";

const CategoryComponent = () => {
    const [categories, setCategories] = useState([]);
    const [open, setOpen] = useState(false);
    const [category, setCategory] = useState({});


    const currentUser = useContext(CurrentUserContext).currentUser;

    const getCategories = () => {
        axios.post(
            CATEGORIES_PATH
        ).then(res => {
            setCategories(
                res.data.data
            )
        }).catch(e => {
            alert('Xatolil')
        })
    }

    useEffect(() => {
            getCategories()
        },
        []);

    const openAddModal = (e) => {
        setCategory(e ? e : {});

        setOpen(!open)
    }

    const addCategory = (e) => {
        e.preventDefault();
        let data = {
            nameUz: e.target.nameUz.value,
            nameRu: e.target.nameRu.value,
            parentId: e.target.parentId.value,
        };

        //backend

        let edited = category.id;
        axios({
            url: edited ? EDIT_CATEGORY_PATH + category.id : ADD_CATEGORY_PATH,
            method: edited ? 'put' : 'post',
            data,
            headers: {Authorization: localStorage.getItem(ACCESS_TOKEN)}
        }).then(res => {
            setCategories(
                [...categories, res.data.data]
            );
            openAddModal();
            toast.success(res.data.message);
        }).catch(err => {
            toast.error(err.response.data.errors[0].msg)
        })


    }

    const deleteCategory = (e) => {
        let enteredName = prompt("Enter name category");
        if (e.nameUz === enteredName) {
            axios
                .delete(DELETE_CATEGORY_PATH + e.id)
                .then(res => {
                    toast.success(res.data.message);
                    getCategories();
                }).catch(err => {
                toast.error(err.response.data.errors[0].msg)
            })
        }
    }

    const hasPermission = (permission) => {
        return currentUser?.permissions?.includes(permission);
    }
    return (
        <>
            <Row>
                <Col md={2}>
                    {hasPermission("ADD_CATEGORY") &&
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

            <Row>
                <Col md={9}>
                    <Table>
                        <thead>
                        <tr key={54545}>
                            <th>#</th>
                            <th>Category uz</th>
                            <th>Category ru</th>
                            <th>Bosh category</th>
                            <th colSpan={2} style={{"textAlign": "center"}}>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {categories.map((category, i) => {
                            return <tr>
                                <th scope="row">{i + 1}</th>
                                <td>{category.nameUz}</td>
                                <td>{category.nameRu}</td>
                                <td>{category.parent?.nameUz}</td>
                                <td>{currentUser?.permission?.canEditCategory && <Button
                                    onClick={() => openAddModal(category)}
                                    color={"warning"}>Edit</Button>}</td>
                                <td>{
                                    hasPermission('DELETE_CATEGORY') &&
                                    <Button
                                        onClick={() => deleteCategory(category)}
                                        color={"danger"}>Delete</Button>}</td>
                            </tr>
                        })}
                        </tbody>

                    </Table>
                </Col>
            </Row>

            <Modal isOpen={open}
                   size={"lg"}>
                <ModalHeader
                    // toggle={this.toggle}
                >Modal title</ModalHeader>
                <Form onSubmit={addCategory}>
                    <ModalBody>
                        <FormGroup>
                            <Label for="nameUz" sm={2}>Name uz</Label>
                            <Input
                                defaultValue={category.nameUz}
                                id={"nameUz"}
                                name={"nameUz"}
                                placeholder={"Name uz"}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="nameRu" sm={2}>Name ru</Label>
                            <Input
                                defaultValue={category.nameRu}
                                id={"nameRu"}
                                name={"nameRu"}
                                placeholder={"Name ru"}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="parent">Parent</Label>
                            <Input
                                id="parent"
                                name="parentId"
                                defaultValue={category.parent?.id}
                                type={"select"}>
                                <option value="">NONE</option>
                                {categories.map(item => {
                                        return <option
                                            key={item.id}
                                            value={item.id}>{item.nameUz}</option>
                                    }
                                )}
                            </Input>
                        </FormGroup>

                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="danger"
                            type={"button"}
                            onClick={() => openAddModal('')}>Close</Button>{' '}
                        <Button
                            color="success"
                            type={"submit"}>Save</Button>
                    </ModalFooter>
                </Form>
            </Modal>

        </>
    )
}

export default CategoryComponent;