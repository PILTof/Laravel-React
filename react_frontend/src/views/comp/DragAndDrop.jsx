import { useRef, useState } from "react";
import { Overlay, Spinner } from "react-bootstrap";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios-client";
import { useNavigate } from "react-router-dom";

export default function FileUpload(props) {
    const navigator = useNavigate();
    const { user } = useStateContext();
    const [showErr, setShowErr] = useState(false);
    const [err, setErr] = useState(false);
    const [isLoad, setLoad] = useState(false);
    const [file, setFile] = useState(null);
    // drag state
    const [dragActive, setDragActive] = useState(false);
    // ref
    const formRef = useRef(null);
    const mainInputRef = useRef(null);
    const hiddenBtnRef = useRef(null);
    const labelRef = useRef(null);
    const priceRef = useRef(null);
    const bidRef = useRef(null);
    const descRef = useRef(null);

    const onSubmit = (ev) => {
        ev.preventDefault();
        if (
            priceRef.current.value == "" ||
            bidRef.current.value == "" ||
            labelRef.current.value == "" ||
            file == null
        ) {
            setErr(
                `${priceRef.current.value == "" ? "Price is required." : ""}\n${
                    bidRef.current.value == "" ? "Bid is required." : ""
                }\n${
                    labelRef.current.value == "" ? "Label is required." : ""
                }\n${file == null ? "File is requried." : ""}`
            );
            setShowErr(true);
            setTimeout(() => {
                setShowErr(false);
            }, 2000);
            return;
        }
        file.append("label", labelRef.current.value);
        file.append("price", priceRef.current.value);
        file.append("bid", bidRef.current.value);
        file.append("desc", descRef.current.value);
        file.append("user_id", user.data.id);
        file.append("email", user.data.email);

        console.log(file);
        axiosClient
            .post("/createPost", file)
            .then(({ data }) => {
                console.log(data);
                window.location.reload();
            })
            .catch(({ response }) => {
                console.error(response.data);
                setErr(response.data.message);
                setShowErr(true);
                setTimeout(() => {
                    setShowErr(false);
                }, 1500);
            });
    };

    // handle drag events
    const handleDrag = function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    // triggers when file is dropped
    const handleDrop = function (e) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            if (e.dataTransfer.files[0].type == "image/png" || e.dataTransfer.files[0].type == "image/jpeg") {
                let data = new FormData();
                data.append("nft_image", e.dataTransfer.files[0]);
                setFile(data);
                console.log(data.get("nft_image"));
                setLoad(true);
                setTimeout(() => {
                    setLoad(false);
                }, 2000);
            } else {
                setErr("File must be a image");
                setShowErr(true);
                setTimeout(() => {
                    setShowErr(false);
                }, 2000);
                console.log("File must be a image");
            }
        }
    };

    // triggers when file is selected with click
    const handleChange = function (e) {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            if (e.target.files[0].type == "image/png") {
                let data = new FormData();
                data.append("nft_image", e.target.files[0]);
                setFile(data);
                setLoad(true);
                setTimeout(() => {
                    setLoad(false);
                }, 100);
                console.log(data.get("nft_image"));
            } else {
                setErr("File must be a image");
                setShowErr(true);
                setTimeout(() => {
                    setShowErr(false);
                }, 2000);
                console.log("File must be a image");
            }
        }
    };

    // triggers the input when the button is clicked
    const onButtonClick = (ev) => {
        ev.preventDefault();
        mainInputRef.current.click();
    };
    // Нужный костыль
    const onSumbitClick = () => {
        hiddenBtnRef.current.click();
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", rowGap: 30 }}>
            <Overlay target={formRef.current} show={showErr} placement="top">
                {({
                    placement: _placement,
                    arrowProps: _arrowProps,
                    show: _show,
                    popper: _popper,
                    hasDoneInitialMeasure: _hasDoneInitialMeasure,
                    ...props
                }) => (
                    <div
                        {...props}
                        style={{
                            position: "absolute",
                            backgroundColor: "rgb(175, 55, 135, 0.85)",
                            padding: "2px 10px",
                            color: "white",
                            borderRadius: 10,
                            marginBottom: 10,
                            ...props.style,
                        }}
                    >
                        {err}
                    </div>
                )}
            </Overlay>
            <form
                id="form-file-upload"
                onDragEnter={handleDrag}
                onSubmit={onSubmit}
                ref={formRef}
            >
                <input
                    ref={mainInputRef}
                    type="file"
                    id="input-file-upload"
                    multiple={false}
                    onChange={handleChange}
                />

                <label
                    id="label-file-upload"
                    htmlFor="input-file-upload"
                    className={dragActive ? "drag-active" : ""}
                >
                    <div>
                        {!isLoad ? (
                            <p>
                                {file == null
                                    ? `Drag and drop your file here or`
                                    : "Loaded"}
                            </p>
                        ) : (
                            <Spinner
                                style={{ marginBlock: "auto" }}
                                animation="border"
                                role="status"
                            >
                                <div className="visually-hidden">
                                    Loading...
                                </div>
                            </Spinner>
                        )}
                        <button
                            className="upload-button"
                            onClick={onButtonClick}
                        >
                            {!isLoad && `Upload a file`}
                        </button>
                    </div>
                </label>

                {dragActive && (
                    <div
                        id="drag-file-element"
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                    ></div>
                )}

                <div className="create-group-input">
                    <input
                        ref={labelRef}
                        type="text"
                        placeholder="Name your card"
                    />
                    <br />
                    <input
                        ref={priceRef}
                        type="text"
                        placeholder="Specify a price"
                    />
                    <br />
                    <input ref={bidRef} type="text" placeholder="Bid" />
                    <br />
                    <input
                        ref={descRef}
                        type="text"
                        placeholder="Description"
                    />
                </div>
                <button ref={hiddenBtnRef} hidden={true}></button>
            </form>
            <button className="submit-btn-profile" onClick={onSumbitClick}>
                Submit
            </button>
        </div>
    );
}
