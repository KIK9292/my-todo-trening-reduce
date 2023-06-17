import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from "../Button/Button";

type AddItemForm = {
    callback: (title: string) => void
}

export const AddItemForm = (props: AddItemForm) => {
    const {callback} = props
    const [value, setValue] = useState<string>("")
    let [error, setError] = useState<string | null>(null)
    const onKeyHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
        setError("")
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            ClickCallback()
        }
    }
    const ClickCallback = () => {
        let newvalue=value.trim()
        if (newvalue === "") {
            setError("ERROR")
        } else {
            callback(newvalue)
            setValue("")
        }
    }
    return (
        <div>
            <input value={value} onChange={onKeyHandler} onKeyDown={onKeyDownHandler}/>
            <Button nameButton={"Add"} callback={ClickCallback}/>
            {/*{error?error:""}*/}
            {error && <div>{error}</div>}
        </div>
    );
};

