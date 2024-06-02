import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import { readToken } from '@/token'
import { useRouter } from 'next/router'

export default function Products() {
    const [products, setProdcuts] = useState([])
    const [stocks, setStocks] = useState({})
    const [isAuthorized, setIsAuthorized] = useState(false);
    const router = useRouter()
    let token;

    const getProducts = async () => {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/products`).then(res => res.json())
            .then(data => setProdcuts(data));
    }

    useEffect(() => {
        getProducts();
        token = readToken()
        if(token){
            setIsAuthorized(true);
        }
    }, [router.asPath]);

    const removeProduct = async (id) => {
        const token = localStorage.getItem('admin-token')
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/deleteproduct`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'admin-token':token
            },
            body: JSON.stringify({ id: id })
        }).then(data => data.json())
        await getProducts();
    }

    const handleChange = (id, stockValue) => {
        setStocks(prev => ({ ...prev, [id]: stockValue }));
    };

    const updateProduct = async (id) => {
        const token = localStorage.getItem('admin-token')
        const newStock = stocks[id];
        console.log(id + 'lskfls' + newStock);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/update/${id}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'admin-token':token
            },
            body: JSON.stringify({ stock: newStock })
        })
        const data = await res.json()
        console.log(data);
        data.success ? alert('Product Updated') : alert('Failed');
    }
    if(!isAuthorized) return <p>Unauthorized</p>

    return (
        <Container>
            <Container>
                <Row className='d-flex justify-content-center fs-5 m-3 p-2 fw-bold'>
                    <Col md={1}>Sl.No</Col>
                    <Col md={2}>Products</Col>
                    <Col md={3}>Title</Col>
                    <Col md={1}>Stock</Col>
                    <Col>Old Price</Col>
                    <Col>New Price</Col>
                    <Col>Category</Col>
                    <Col>Remove</Col>
                </Row>
            </Container>
            <Container >
                {products.map((item, index) => (
                    <Row key={index} className='d-flex justify-content-center m-3 p-1'>
                        <Col md={1}>{index + 1}</Col>
                        <Col md={2}>
                            <Image src={item.image} alt='' width={120} height={120} />
                        </Col>
                        <Col md={{ span: '3'}}>{item.name}</Col>
                        <Col md={1}>
                            <Form.Control type="text" onChange={(e) => handleChange(item.id, e.target.value)} defaultValue={item.stock} />
                            <Button className='mt-2' onClick={() => updateProduct(item.id)} >Update</Button>
                        </Col>
                        <Col>${item.old_price}</Col>
                        <Col>${item.new_price}</Col>
                        <Col>{item.category}</Col>
                        <Col>
                            <Button className='bg-danger' variant='light' onClick={() => { removeProduct(item.id) }}>Delete</Button>
                        </Col>
                    </Row>
                ))}
            </Container>
        </Container>
    )
}
