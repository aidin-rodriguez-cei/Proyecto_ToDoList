import { useRouteError } from "react-router-dom";
import '@/css/style.css';

const ErrorPage = () => {
    const error = useRouteError();
    console.log(error);

    return (
        <div className="error-page">
            <h1>Oopsi, tuvimos un error!</h1>
            <p>
                {error?.statusText || error?.message || "Lo sentimos :( la página que buscas no existe"}
            </p>
        </div>
    );
};

export default ErrorPage;
