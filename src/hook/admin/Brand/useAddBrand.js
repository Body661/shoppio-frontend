import {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {createBrand} from "../../../redux/actions/BrandActions";
import addImg from "../../../images/Icons/addImg.png";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const useAddBrand = () => {
    const dispatch = useDispatch();
    const [img, setImg] = useState(addImg);
    const [name, setName] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const navigate = useNavigate();

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImg(URL.createObjectURL(file));
            setSelectedFile(file);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (name.trim() === "") {
            toast("Brand name is required", {type: "error"});
            return;
        }

        if (!selectedFile) {
            toast("Brand logo is required", {type: "error"});
            return;
        }

        // Create a FormData object to handle image upload
        const formData = new FormData();
        formData.append("name", name);
        formData.append("img", selectedFile);

        setLoading(true);
        setIsSubmitted(true);
        await dispatch(createBrand(formData));
        setLoading(false);
    };

    // useSelector to track the create brand response
    const addBrandRes = useSelector((state) => state.brandReducer.createBrand);

    useEffect(() => {
        if (loading === false && isSubmitted) {
            if (addBrandRes?.status === 201) {
                toast("Brand added successfully", {
                    type: "success",
                    toastId: "brandAdded",
                });
                setTimeout(() => {
                    navigate("/admin/brands");
                }, 1500);
            } else {
                toast(
                    addBrandRes?.data?.errors
                        ? addBrandRes?.data?.errors[0]?.msg
                        : "Error while adding the brand",
                    {
                        type: "error",
                        toastId: "addBrandAnother",
                    }
                );
            }
        }
    }, [loading, addBrandRes, isSubmitted, navigate]);

    return {
        img,
        name,
        loading,
        isSubmitted,
        handleNameChange,
        handleImageChange,
        handleSubmit,
    };
};

export default useAddBrand;
