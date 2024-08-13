import { useLocation, useNavigate } from "react-router-dom";
import UpdateForm from "../components/UpdateForm";
import { useEffect } from "react";

function UpdateItem({auth, user}){
    const navigate = useNavigate();
    useEffect( () => {
        if(!auth){
            navigate('/')
        }
    }, []);
    const location = useLocation();
    const product = location.state;
    console.log('Product from updateItem', product);
    return (
        <UpdateForm auth={auth} user={user} header={'Update Listing'} product={product}/>
    );
}
export default UpdateItem;