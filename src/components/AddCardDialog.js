import React, { useState } from "react";

function AddCardDialog(props) {

    const [cardData, setCardData] = useState({});

    function onClickClose() {
        props.onClose();
    }

    function onAddCard() {
        props.onAddCardCB(cardData);
        props.onClose();
    }

    function onChangeData(e) {
        let cardObj = Object.assign({}, cardData);
        cardObj[e.target.name] = e.target.value;
        setCardData(cardObj);
    }

    return (
        <div className='dialog-base'>
            <div className="window">
                <div className="header">
                    <div>
                        Create Task
                    </div>
                </div>
                <div className="body">
                    <div className="data-row">
                        <div className="label">
                            Title
                        </div>
                        <div className="divider">:</div>
                        <div className="input-div">
                            <input value={cardData.title} name="title" onChange={onChangeData} />
                        </div>
                    </div>
                    <div className="data-row">
                        <div className="label">
                            Description
                        </div>
                        <div className="divider">:</div>
                        <div className="input-div">
                            <textarea value={cardData.description} name="desc" onChange={onChangeData} />
                        </div>
                    </div>

                    <div className="data-row">
                        <div className="label">
                            Status
                        </div>
                        <div className="divider">:</div>
                        <div className="input-div">
                            <select
                                style={{ padding: "5px", marginTop: "2px", marginRight: "8px", marginLeft: "2px" }}
                                value={cardData.status}
                                onChange={onChangeData}
                                name="status"
                            >
                                <option value="Not Set">Select</option>
                                <option value="To Do">To DO</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                                <option value="Tested">Tested</option>
                            </select>
                        </div>
                    </div>

                    <div className="btn-row">
                        <button onClick={onClickClose}>
                            Cancel
                        </button>
                        <button onClick={onAddCard}>
                            Create
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddCardDialog;