import {Row, Col} from 'react-bootstrap'
import {ToastContainer} from 'react-toastify';
import AddSubcategoryHook from './../../hook/subcategory/addSubcategoryHook';

const AdminAddSubCategory = () => {
    const [, name, , category, , handelChange, handelSubmit, onChangeName] = AddSubcategoryHook();

    return (
        <div>
            <Row className="justify-content-start ">
                <div className="admin-content-text pb-4">Add new subcategory</div>
                <Col sm="8">
                    <input
                        value={name}
                        onChange={onChangeName}
                        type="text"
                        className="input-form d-block mt-3 px-3"
                        placeholder="Subcategory name"
                    />
                    <select name="category" id="cat" className="select mt-3 px-2 " onChange={handelChange}>
                        <option value="0">Select main category</option>
                        {
                            category.data ? (category?.data.map(item => {
                                return (<option key={item?._id} value={item?._id}>{item?.name}</option>)
                            })) : null
                        }
                    </select>
                </Col>
            </Row>
            <Row>
                <Col sm="8" className="d-flex justify-content-end ">
                    <button onClick={handelSubmit} className="btn-save d-inline mt-2 ">Save changes</button>
                </Col>
            </Row>
            <ToastContainer/>
        </div>
    )
}

export default AdminAddSubCategory