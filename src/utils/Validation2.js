
export function ValidateEmail(mail, validation, setValidation, order) {
    const val = validation.validation;
    const error = validation.errorMessage;
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)) {
        val[order] = false;
        error[order] = '';
        setValidation({ validation: val, errorMessage: error })
    }else{
    val[order] = true;
    error[order] = 'You have entered invalid email address';
    setValidation({ validation: val, errorMessage: error })
}

}

export function isRequired(value, validation, setValidation, order, placeholder) {
    const val = validation.validation;
    const error = validation.errorMessage;
    if (value !== '') {
        val[order] = false;
        error[order] = '';        
        setValidation({ validation: val, errorMessage: error })
        
    } else {
        val[order] = true;
        error[order] = 'Enter '+placeholder;
        setValidation({ validation: val, errorMessage: error })
    }

}




export function isNumeric(value, validation, setValidation, order, placeholder) {
    const val = validation.validation;
    const error = validation.errorMessage;
    if (Number(value)) {
        val[order] = false;
        error[order] = '';
        setValidation({ validation: val, errorMessage: error })
    } else {
        val[order] = true;
        error[order] = 'Enter numeric value to '+placeholder;
        setValidation({ validation: val, errorMessage: error })
    }
}



export function isRequiredArr(value, validation, setValidation, order, placeholder) {
    const val = validation.validation;
    const error = validation.errorMessage;
    if (value.length > 0) {
        val[order] = false;
        error[order] = '';
        setValidation({ validation: val, errorMessage: error })
    } else {
        val[order] = true;
        error[order] = 'Select '+placeholder;
        setValidation({ validation: val, errorMessage: error })
    }

}