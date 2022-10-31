import { HTTP_FORBIDDEN_CODE, HTTP_INTERNAL_SERVER_ERROR_CODE, HTTP_NOT_FOUND_CODE } from "../constants/httpStatusCodes";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export default function errorHandler(error) {
    const errorResponseStatus = error.response?.status;
    switch (errorResponseStatus) {
        case HTTP_INTERNAL_SERVER_ERROR_CODE:
            return (
                <Alert severity="warning">
                    <AlertTitle>Internel Server Error</AlertTitle>
                    Currently our developers are looking at it.
                </Alert>
            )
        case HTTP_NOT_FOUND_CODE | HTTP_FORBIDDEN_CODE:
            return (
                <Alert severity="error">
                    <AlertTitle>Something went wrong</AlertTitle>
                    Please try again
                </Alert>
            )
        default:
            return (
                <Alert severity="warning">
                    <AlertTitle>Internel Server Error</AlertTitle>
                    Currently our developers are looking at it.
                </Alert>
            )
    }
}