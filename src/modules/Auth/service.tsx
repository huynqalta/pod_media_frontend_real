import {login} from "@reducer/loginReducer";

export const loginCMS = (raw?:any) => {
    return {
        endpoint: `/api/user/login`,
        method: "POST",
        body: raw,
        action: login
    };

};

export const changePass = (raw?:any) => {
    return {
        endpoint: `/api/user/changePassword`,
        method: "POST",
        body: raw,
    };
};

export const forgotPassword = (raw?:any) => {
    return {
        endpoint: `/api/user/sendMail`,
        method: "POST",
        body: raw,
    };
};

export const newPassword = (key?:any, raw?:any) => {
    return {
        endpoint: `/api/user/updatePasswordNew/key=${key}`,
        method: "PUT",
        body: raw,
    };
};