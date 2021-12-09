export default function handleHttpErrors(response) {
    console.log(response);
    if(response.status === 422){
        return response.data.message
    }
    else{
        if (Array.isArray(response.data.errors)) {
            let msgText = "";
            response.data.errors.forEach((item) => (msgText += `\n${item.param}: ${item.msg}\n`));
            return msgText;
        } else {
            return response.data.errors;
        }
    }
}
