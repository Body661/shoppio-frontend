import {Row, FormControl, Form, Button, Container} from 'react-bootstrap';
import useAddAddress from '../../../hook/user/useAddAddress';
import {LocalShipping} from "@mui/icons-material";

const AddAddress = () => {
    const {address, handleChange, handleSubmit} = useAddAddress();

    const renderInputField = (name, placeholder) => (
        <FormControl
            name={name}
            type="text"
            className="input-form d-block mt-3 px-3 b-radius-10"
            placeholder={placeholder}
            value={address[name]}
            onChange={handleChange}
        />
    );

    return (
        <Container>
            <Row>
                <Row>
                    <div className="page-header mt-4">
                        <LocalShipping style={{fontSize: "45px"}}/>
                        <span className="page-header-text"> Add address </span>
                    </div>
                </Row>

                <Form className="d-flex justify-content-center flex-column p-3 mt-4 b-radius-20"
                      style={{backgroundColor: "var(--main-gray)"}}>
                    {renderInputField('alias', 'Address alias')}
                    {renderInputField('street', 'Street')}
                    {renderInputField('postalCode', 'Postal code')}
                    {renderInputField('phone', 'Phone number')}
                    {renderInputField('city', 'City')}
                    {renderInputField('country', 'Country')}

                    <Button className="btn-dark d-inline mt-2 b-radius-10 mt-4" onClick={handleSubmit}>
                        Add address
                    </Button>
                </Form>
            </Row>
        </Container>
    );
};

export default AddAddress;
