import {Row, Button, FormControl, Form} from 'react-bootstrap';
import useUserProfile from "../../hook/user/useUserProfile";
import {Backdrop, CircularProgress} from "@mui/material";

const ChangePassword = () => {

    const {
        handleUpdatePassword,
        currentPassword,
        newPassword,
        confirmNewPassword,
        handleChangeCurrentPassword,
        handleChangeNewPass,
        handleChangeConfirmPass,
        isSubmittedUpdatePass,
        loadingUpdatePass,
        validated
    } = useUserProfile();

    return (
        <>
            <div className="mt-4">
                <Row style={{backgroundColor: "var(--main-gray)"}} className="b-radius-10 pt-2 pb-2">

                    <Backdrop
                        sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                        open={(isSubmittedUpdatePass && loadingUpdatePass)}
                    >
                        <CircularProgress color="inherit"/>
                    </Backdrop>

                    <Form className="d-flex flex-column justify-content-center" noValidate validated={validated}>
                        <FormControl
                            required
                            type="password"
                            minLength={8}
                            className="input-form d-block mt-3 px-3 b-radius-10"
                            placeholder="Current password"
                            name="Current password"
                            value={currentPassword}
                            onChange={handleChangeCurrentPassword}
                        />

                        <FormControl
                            required
                            type="password"
                            minLength={8}
                            className="input-form d-block mt-3 px-3 b-radius-10"
                            placeholder="New password"
                            name="new password"
                            value={newPassword}
                            onChange={handleChangeNewPass}
                        />

                        <FormControl
                            required
                            minLength={8}
                            type="password"
                            className="input-form d-block mt-3 px-3 b-radius-10"
                            placeholder="Confirm new password"
                            name="confirm new password"
                            value={confirmNewPassword}
                            onChange={handleChangeConfirmPass}
                        />

                        <Button onClick={handleUpdatePassword} className="mt-3 b-radius-10" variant="dark">
                            Save new password
                        </Button>
                    </Form>
                </Row>
            </div>
        </>
    )

};

export default ChangePassword;