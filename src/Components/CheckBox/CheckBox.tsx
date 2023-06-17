import React, {ChangeEvent} from 'react';

type CheckBoxTypeProps={
    callback: (checkedStatus:boolean) => void
    checked:boolean
}


export const CheckBox = (props:CheckBoxTypeProps) => {
    const {callback,checked} = props
    const onChangeChecked=(e:ChangeEvent<HTMLInputElement>)=>{
        callback(e.currentTarget.checked)
    }
    return (

            <input type="checkbox" checked={checked} onChange={onChangeChecked}/>

    );
};

