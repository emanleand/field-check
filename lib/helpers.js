/**
 * expose object
 */
var helpers = module.exports;

helpers.replace = function sanitize(value, regex) {
    try {
        if (value == '') {
            return false;
        }
        let result;
        switch (regex) {

            case 'alpha':/* This removes non-alphabet characters */
                result = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚÑñäëïöüÄËÏÖÜàèìòùÀÈÌÒÙ]/g, "");
                if (result.length > 0) { return result; }
                return false;

            case 'alpha+': /* This removes non-alphabet characters. allow blanks */
                result = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚÑñäëïöüÄËÏÖÜàèìòùÀÈÌÒÙ\s]/g, ""); arguments
                if (result.length > 0) { return result; }
                return false;

            case 'alpha-num':/* This removes non-alphabet characters. allow numbers */
                result = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚÑñäëïöüÄËÏÖÜàèìòùÀÈÌÒÙ\0-9]/g, "");
                if (result.length > 0) { return result; }
                return false;

            case 'alpha-num+': /* This removes non-alphabet characters. it allow numbers and spaces  */
                result = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚÑñäëïöüÄËÏÖÜàèìòùÀÈÌÒÙ\0-9\s]/g, "");
                if (result.length > 0) { return result; }
                return false;

            case 'num': /* This removes the characters that are not integers */
                result = value.replace(/[^0-9]/g, "");
                if (result.length > 0) { return result; }
                return false;

            case 'date': /* This removes the characters that are not integers. allows - and / */
                result = value.replace(/[^0-9\-\ /]/g, "");
                if (result.length > 0) { return result; }
                return false;

            case 'no-spaces': /* This removes whitespace */
                result = value.replace(/\s+/g, "");
                if (result.length > 0) { return result; }
                return false;

            default:
                return false;

        }
    } catch (e) {
        return false;
    }

}

helpers.validate = function validate(regex, value = '') {
    try {
        let cadena;
        if (value == '') {
            return false;
        }
        switch (regex) {
            case 'email': /* This verify that the email format is correct */
                cadena = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (cadena.test(value)) { return value; }
                return false;

            case 'cuil': /* This verify that the cuil/cuit is correct for Argentina */
                let cuit = value;
                if (cuit.length != 11) {
                    return false;
                }
                let acumulado = 0;
                let digitos = cuit.split("");
                let digito = digitos.pop();

                for (let i = 0; i < digitos.length; i++) {
                    acumulado += digitos[9 - i] * (2 + (i % 6));
                }

                let verif = 11 - (acumulado % 11);
                if (verif == 11) {
                    verif = 0;
                } else if (verif == 10) {
                    verif = 9;
                }
                if (digito == verif) { return value; }
                return false;

            case 'phone_number': /* This verify that the phone number have only numbers and a longitud between 7 and 13 digit */
                cadena = /^[1-9]{1}[0-9]{6,12}$/;
                if (cadena.test(value)) { return value; }
                return false;

            case 'phone_number_arg13': /* This verifies that the phone number has the Argentine 13-digit format */
                cadena = /^[5]{1}[4]{1}[9]{1}[0-9]{10}$/;
                if (cadena.test(value)) { return value; }
                return false;

            case 'activity_code': /* This verify that the activity code have only numbers and a longitud 6 digit */
                cadena = /^[0-9]{6}$/;
                if (cadena.test(value)) { return value; }
                return false;

            case 'alpha1':
                cadena = /^[a-zA-ZáéíóúÁÉÍÓÚÑñäëïöüÄËÏÖÜàèìòùÀÈÌÒÙ]{1}$/;
                if (cadena.test(value)) { return value; }
                return false;

            case 'alpha':
                cadena = /^[a-zA-ZáéíóúÁÉÍÓÚÑñäëïöüÄËÏÖÜàèìòùÀÈÌÒÙ]{1,30}$/;
                if (cadena.test(value)) { return value; }
                return false;

            case 'alpha+':
                cadena = /^[a-zA-ZáéíóúÁÉÍÓÚÑñäëïöüÄËÏÖÜàèìòùÀÈÌÒÙ\s]{1,30}$/;
                if (cadena.test(value)) { return value; }
                return false;

            case 'alpha-num+':
                cadena = /^[a-zA-ZáéíóúÁÉÍÓÚÑñäëïöüÄËÏÖÜàèìòùÀÈÌÒÙ\0-9\s]{1,30}$/;
                if (cadena.test(value)) { return value; }
                return false;

            case 'num':
                cadena = /^[0-9]{1,10}$/;
                if (cadena.test(value)) { return value; }
                return false;

            case 'url':
                cadena = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*){1,50}$/;
                if (cadena.test(value)) { return value; }
                return false;

            case 'date':
                cadena = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
                if (cadena.test(value)) { return value; }
                return false;

            default:
                return false
        }
    } catch (e) {
        return false
    }
}   
