import { FormGroup } from '@angular/forms'

export function passwordMatchValidator(passwordString, checkString) {

    return (control: FormGroup) => {
        if (!control) {
            return null;
        }
        console.log(control.get(passwordString).value);
        console.log(control.get(checkString).value);
        if (control.get(passwordString).value === control.get(checkString).value) {
            return null;
        }
        else
            return { passwordMatchValidator: true };
    };
}