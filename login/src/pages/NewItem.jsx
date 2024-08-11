import { useEffect } from "react";
import InputForm from "../components/InputForm";
import { useNavigate } from "react-router-dom";

function NewItem({auth, user}){
    const navigate = useNavigate();
    useEffect( () => {
        if(!auth){
            navigate('/')
        }
    }, []);

    return (
        <InputForm auth={auth} user={user} header={'New Listing'}/>
    );
}
export default NewItem;