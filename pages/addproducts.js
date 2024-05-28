import React, { useState } from 'react'
import upload_area from '@/public/Assets/upload_area.svg'
import Image from 'next/image'
import { Container, Form, Row, Col, Button, FormText } from 'react-bootstrap'

export default function AddProduct() {
    const [image, setImage] = useState(false);
    const [productDetails, setProductDetails] = useState({
        id: '',
        name: '',
        description: '',
        image: '',
        category: 'Home office',
        new_price: '',
        old_price: '',
        quantity: '',
    })

    const imagehandler = (e) => {
        setImage(e.target.files[0]);
    }

    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value })
    }

    const addProduct = async () => {
        console.log(productDetails);
        let responseData;
        let product = productDetails;

        let formData = new FormData();
        formData.append('product', image);

        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload`, {
            method: 'POST',
            headers: {
                Accept: 'application/json'
            },
            body: formData,
        }).then((res) => res.json()).then((data) => responseData = data);


        if (responseData.success) {
            product.image = responseData.image_url;
            console.log(product);
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/addproduct`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            }).then(res => res.json()).then((data) => {
                data.success ? alert('Product Added') : alert('Failed');
            })
        }
    }

    return (
        <Container className='d-flex w-50 p-4 justify-content-center'>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>ID</Form.Label>
                    <Form.Control value={productDetails.id} onChange={changeHandler} name='id' type="text" placeholder="" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type='text' value={productDetails.name} onChange={changeHandler} name='name' placeholder="" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type='text' value={productDetails.description} onChange={changeHandler} name='description' placeholder="" />
                </Form.Group>
                <Row>
                    <Col><Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Old Price</Form.Label>
                        <Form.Control type='text' value={productDetails.old_price} onChange={changeHandler} name='old_price' placeholder="" />
                    </Form.Group></Col>
                    <Col><Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>New Price</Form.Label>
                        <Form.Control type='text' value={productDetails.new_price} onChange={changeHandler} name='new_price' placeholder="" />
                    </Form.Group></Col>
                    <Col><Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control type='text' value={productDetails.quantity} onChange={changeHandler} name='quantity' placeholder="" />
                    </Form.Group></Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="formFile" className="mb-3 d">
                            <Col className='d-flex flex-column'>
                                <FormText className='fs-5'>Image</FormText>
                                <Form.Label>
                                    <Image className='w-50' src={image ? URL.createObjectURL(image) : upload_area} width={200} height={200} alt='' />
                                </Form.Label>
                            </Col>
                            <Form.Control onChange={imagehandler} type='file' name='image' />
                        </Form.Group>
                    </Col>
                    <Col className='m-3 fs-5 p-3'>
                        <FormText>Category</FormText>
                        <Form.Select value={productDetails.category} onChange={changeHandler} name='category' aria-label="Default select example">
                            <option>Select Category</option>
                            <option value="Home Office">Home Office</option>
                            <option value="Bedroom">Bedroom</option>
                            <option value="Kitchen">Kitchen</option>
                            <option value="Bathroom">Bathroom</option>
                            <option value="Living Room">Living Room</option>
                        </Form.Select>
                    </Col>
                </Row>
                <Row className='d-flex w-25'>
                    <Button className='m-3 w-50' onClick={addProduct} >Submit</Button>
                </Row>
            </Form>
        </Container>
    )
}
