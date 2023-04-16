import React from 'react'
import { Container } from 'react-bootstrap'
import ChoosePayMethod from '../../../Components/User/Cart/ChoosePayMethod'

const ChoosePayMethodPage = () => {
    return (
        <Container style={{minHeight:'80vh'}}>
           <ChoosePayMethod />
        </Container>
    )
}

export default ChoosePayMethodPage
