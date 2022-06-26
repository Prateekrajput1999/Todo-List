import React, { useState } from "react";
import Button from "./Button";
import { MdCheckBoxOutlineBlank, MdDelete, MdEditNote, MdCheckBox, MdLibraryAddCheck } from 'react-icons/md';

export default function TodoItem(props) {
    const { id, title, isDone } = props.itemProperties;
    const [line, setLine] = useState(isDone);
    const [edit, setEdit] = useState(false);
    const [listContent, setListContent] = useState(title);

    function isChecked(id) {
        setLine((prevValue) => {
            return !prevValue;
        })

        props.setTodos((prevValue) => {
            prevValue.forEach((eachItem) => {
                if (eachItem.id === id) {
                    eachItem.isDone = !line;
                }
            })
            props.setPendingTask(() => {
                return (prevValue.filter((eachItem) => {
                    return !eachItem.isDone;
                })).length;
            })
            localStorage.setItem("todo", JSON.stringify(prevValue));
            return prevValue;
        })
    }

    function handleEdit(id) {
        setEdit(prevValue => {
            return !prevValue;
        })

        props.setTodos((prevValue) => {
            prevValue.forEach((eachItem) => {
                if (eachItem.id === id) {
                    eachItem.title = listContent;
                }
            });
            localStorage.setItem("todo", JSON.stringify(prevValue));
            return prevValue;
        });
    }

    function editContentInsideItem(event) {
        const updatedContent = event.target.textContent;
        setListContent(updatedContent);
    }

    return (
        <div id={id} className="todo-item-card" style={props.style}>
            <Button
                icon={line ? MdCheckBox : MdCheckBoxOutlineBlank}
                title=""
                style={{
                    backgroundColor: "transparent",
                    border: "none",
                    color: "#fff"
                }
                }
                onClick={() => isChecked(id)}
            />
            <div
                className="text"
                style={{ textDecoration: line ? "line-through" : null }}
                suppressContentEditableWarning={true}
                contentEditable={edit}
                onInput={editContentInsideItem}
            >
                {title}
            </div>
            <div className="edit-delete-btn">
                <Button
                    icon={edit ? MdLibraryAddCheck : MdEditNote}
                    title=""
                    style={{
                        backgroundColor: "transparent",
                        border: "none",
                        color: "#fff"
                    }
                    }
                    onClick={() => handleEdit(id)}
                />
                <Button
                    icon={MdDelete}
                    title=""
                    style={{
                        backgroundColor: "transparent",
                        border: "none",
                        color: "#fff"
                    }
                    }
                    onClick={props.onClick}
                />
            </div>
        </div>
    )
};