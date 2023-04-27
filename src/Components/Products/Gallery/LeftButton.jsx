import next from '../../../images/Icons/next.png'

const LeftButton = (onClick
) => {
    return (
        <img
            src={next}
            alt=""
            width="35px"
            onClick={onClick}
            height="35px"
            style={{
                cursor: "pointer",
                position: "absolute",
                zIndex: 100,
                right: "15px",
                top: "50%",
                transform: "translateY(-50%)"
            }}
        />
    )
}

export default LeftButton
