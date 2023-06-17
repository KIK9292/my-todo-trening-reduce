import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType={
    callBack:(newTitle:string)=>void
    oldtitle:string
}


export const EditableSpan = (props:EditableSpanPropsType) => {
    const {callBack,oldtitle}=props

    const[editStatus,setEditStatus]=useState<boolean>(false)
    const [updateTitle,setUpdateStatus]=useState<string>(oldtitle)
    let [error, setError] = useState<string | null>(null)
const EditFoo=()=>{
        setEditStatus(!editStatus)
    if (editStatus){
        AddNewTitile()
    }}
const AddNewTitile=()=>{
    callBack(updateTitle)
}


    const onChangeHandler =(e:ChangeEvent<HTMLInputElement>)=>{
        setUpdateStatus(e.currentTarget.value)
    }
    return (
        editStatus ?
            <input value={updateTitle} onBlur={EditFoo} onChange={onChangeHandler} autoFocus/>:
                <span onDoubleClick={EditFoo}>{oldtitle}</span>




    );
};

