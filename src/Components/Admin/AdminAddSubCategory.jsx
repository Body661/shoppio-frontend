import { Row, Col } from 'react-bootstrap';
import useAddSubcategory from '../../hook/subcategory/useAddSubcategory';

const AdminAddSubCategory = () => {
    const { name, category, handleChange, handleSubmit, onChangeName } = useAddSubcategory();

    return (
        <div>
            <Row className="justify-content-start">
                <div className="admin-content-text pb-4">Add new subcategory</div>
                <Col sm="8">
                    <input
                        value={name}
                        onChange={onChangeName}
                        type="text"
                        className="input-form d-block mt-3 px-3"
                        placeholder="Subcategory name"
                    />
                    <select name="category" id="cat" className="select mt-3 px-2" onChange={handleChange}>
                        <option value="0">Select main category</option>
                        {category?.data?.data?.map((item) => (
                            <option key={item?._id} value={item?._id}>
                                {item?.name}
                            </option>
                        ))}
                    </select>
                </Col>
            </Row>
            <Row>
                <Col sm="8" className="d-flex justify-content-end">
                    <button onClick={handleSubmit} className="btn-save d-inline mt-2">
                        Save changes
                    </button>
                </Col>
            </Row>
        </div>
    );
};

export default AdminAddSubCategory;