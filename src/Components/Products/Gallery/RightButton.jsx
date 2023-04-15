import prev from '../../../imgs/Icons/previous.png'

const RightButton = (onClick) => {
    return (
        <img
            src={prev}
            alt=""
            width="35px"
            onClick={onClick}
            height="35px"
            style={{
                cursor: "pointer",
                position: "absolute",
                zIndex: 100,
                left: "15px",
                top: "50%",
                transform: "translateY(-50%)"
            }}
        />
    )
}


export default RightButton
