import { AbstractControl } from '@angular/forms'

export function passwordValidator(control: AbstractControl) {
    console.log(control.value.length);
    var s = control.value;
    var print = 0;
    console.log(s);
    let p1 = 0; let p2 = 0; let p3 = 0; let p4 = 0;
    for (let i = 0; i < s.length; i++) {
        let val = s.charCodeAt(i);
        if (val >= 48 && val <= 57)       { p1 = 1; }
        else if (val >= 97 && val <= 122) { p2 = 1; }
        else if (val >= 65 && val <= 90)  { p3 = 1; }
        else                              { p4 = 1; }

    }
    if ((p1 + p2 + p3 + p4) === 4) {
        p1 = 0; p2 = 0; p3 = 0; p4 = 0;
        print = 1;
    }
    if (control.value != null && (print === 0 || s.length < 8)) {
        print = 0;
        return ({ passwordValidator: true });
    }
    return null;
    /*
    (another procedure)
    var checkPattern=/[a-z,A-Z,0-9]/;
    var check=checkPattern.test(s);
    var checkPattern2=/[^a-zA-Z0-9]/;
    var check2=checkPattern.test(s);
    if(check==true && check2==true)
    {
     return null;
    }
    return({passwordValidator:true});
    */
}