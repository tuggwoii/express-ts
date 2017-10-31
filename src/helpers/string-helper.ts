
export class StringHelper {

    static onlyLetters(str: string): string {
        return str.replace(/[^a-zA-Z ]/g, '')
    }

    static onlyLettersAndNumbers(str: string): string {
        return str.replace(/[^a-zA-Z0-9]/g, '');
    }

    static removeSpecialChars(str: string): string {
        str = str.split('^').join('');
        str = str.split('%').join('');
        str = str.split('[').join('');
        str = str.split(']').join('');
        return str.replace(/[&\/\\|#,+-_=()$~%.'":*?<>{}!@$]/g, '');
    }
}