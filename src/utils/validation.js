export function ValidateEmail(mail, validation, setValidation, order) {
    const val = validation.validation;
    const error = validation.errorMessage;
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)) {
        val[order] = true;
        error[order] = 'valid';
        setValidation({ validation: val, errorMessage: error })
    }else{
    val[order] = false;
    error[order] = 'You have entered invalid email address';
    setValidation({ validation: val, errorMessage: error })
}

}

export function isRequired(value, validation, setValidation, order, placeholder) {
    const val = validation.validation;
    const error = validation.errorMessage;
    if (value !== '') {
        val[order] = true;
        error[order] = 'valid';        
        setValidation({ validation: val, errorMessage: error })
        
    } else {
        val[order] = false;
        error[order] = 'Enter '+placeholder;
        setValidation({ validation: val, errorMessage: error })
    }

}




export function isNumeric(value, validation, setValidation, order, placeholder) {
    const val = validation.validation;
    const error = validation.errorMessage;
    if (Number(value)) {
        val[order] = true;
        error[order] = 'valid';
        setValidation({ validation: val, errorMessage: error })
    } else {
        val[order] = false;
        error[order] = 'Enter numeric value to '+placeholder;
        setValidation({ validation: val, errorMessage: error })
    }
}


