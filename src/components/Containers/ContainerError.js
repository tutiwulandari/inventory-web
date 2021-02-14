import React, {useEffect, useState} from "react";

export default function Container(props) {
    const[error, setErrorState] = useState(null)

    useEffect(() => {
        if (props.error) {
            setErrorState(props.error);
        }
    }, [props.error])

    const onErrorClick = () => {
        setErrorState(null)
    };

    return(
    <div>
        {error && <div onClick={onErrorClick}>{error.message}</div>}
            {props.children}
    </div>
    );
}