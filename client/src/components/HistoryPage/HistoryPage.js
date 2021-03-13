import React,{useEffect,useState} from 'react'
import { Table } from "react-bootstrap";
import Axios from "axios";
function HistoryPage(props) {
    const [PdfData,setPdfData ] = useState([]);
    const id = window.sessionStorage.getItem('id')
    if (!id) {
        props.history.push('/login')

    }

    useEffect(() => {
        Axios.post("api/pdfData/getPdfData", { id: id }).then((response) => {
            if (response.data.status) {
                setPdfData(response.data.pdf.updatedItems)


            } else {
                alert('no data')
            }
        })
    }, [id]);

    const data =  PdfData.map((pdf, index) => {
        return (
            <tr value={pdf._id} key={pdf._id}>
                <td>{pdf.updatedAt}</td>
                <td>{pdf.address}</td>
                <td>{pdf.pincode}</td>
                <td>{pdf.age}</td>
            </tr>
        );
    });
    return (
        <>
            <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Updated At</th>
                            <th>Address</th>
                            <th>Pincode</th>
                            <th>Age</th>
                        </tr>
                    </thead>
                    <tbody>{data}</tbody>
                </Table>
        </>
    )
}

export default HistoryPage
