import {useState} from 'react'
import {useDispatch} from 'react-redux';
import {deleteUserAddress} from '../../redux/actions/userAddressActions';

const DeleteAddressHook = (id) => {

    const dispatch = useDispatch()

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //const dispatch = useDispatch();

    const handelDelete = async () => {
        await dispatch(deleteUserAddress(id))
        setShow(false);
        window.location.reload();
    }


    return [show, handleClose, handleShow, handelDelete]
}

export default DeleteAddressHook