import React, { useState, useEffect } from 'react'
import Axios from "axios";
import { Form, Button } from 'react-bootstrap';
import jsPDF from 'jspdf';


const ref = React.createRef();
function HomePage(props) {

    // auth check
    const id = window.sessionStorage.getItem('id')
    if (!id) {
        props.history.push('/login')

    }

    const [AddressValue, setAddressValue] = useState();
    const [PinCodeValue, setPinCodeValue] = useState();
    const [AgeValue, setAgeValue] = useState();

    const onAddressChange = (event) => {
        setAddressValue(event.currentTarget.value);
    };
    const onPinCodeChange = (event) => {
        setPinCodeValue(event.currentTarget.value);
    };
    const onAgeChange = (event) => {
        setAgeValue(event.currentTarget.value);
    };

    useEffect(() => {
        Axios.post("api/pdfData/getPdfData", { id: id }).then((response) => {
            if (response.data.status) {
                console.log(response.data)
                setAddressValue(response.data.pdf.address)
                setPinCodeValue(response.data.pdf.pincode)
                setAgeValue(response.data.pdf.age)
            } else {
                setAddressValue()
                setPinCodeValue()
                setAgeValue()
            }
        })
    }, [id]);

    const onSubmit = () => {
        console.log(AddressValue, AgeValue, PinCodeValue)
        Axios.post("api/pdfData/addData", { id: id, address: AddressValue, age: AgeValue, pincode: PinCodeValue }).then((response) => {
            if (response.data.status) {
                alert('data added')
            } else {
                setAddressValue()
                setPinCodeValue()
                setAgeValue()
            }
        })
    }

    // generate pdf
    const generatePdf = () => {
        let document = new jsPDF('p', 'pt')

        // add text
        document.text(20, 20, `address is ${AddressValue}`)
        document.text(20, 40, `pincode is ${PinCodeValue}`)

        // set font
        document.setFont('courier')

        // save pdf
        document.save('info.pdf')
    }

    return (
        <div className='register'>
            <h1>Details</h1>
            <Form onSubmit={onSubmit}>
                <Form.Group >
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" placeholder="Enter address" onChange={onAddressChange} value={AddressValue} />
                </Form.Group>

                <Form.Group >
                    <Form.Label>PinCode</Form.Label>
                    <Form.Control type="number" placeholder="Pincode" onChange={onPinCodeChange} value={PinCodeValue} />
                </Form.Group>
                <Form.Group >
                    <Form.Label>Age</Form.Label>
                    <Form.Control type="number" placeholder="Age" onChange={onAgeChange} value={AgeValue} />
                </Form.Group>
                <Button className='homepage-btn' variant="primary" onClick={onSubmit}>Submit</Button>
                <Button className='homepage-btn' variant="primary" onClick={generatePdf}>Pdf</Button>
            </Form>
        </div>
    )
}

export default HomePage
