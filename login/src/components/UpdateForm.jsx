import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function UpdateForm({auth, user, header, product}){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);
    const [contact, setContact] = useState('');
    const [price, setPrice] = useState('');
    const [updatedImages, setUpdatedImages] = useState(false);
    const productId = product._id;
    const navigate = useNavigate();

    useEffect(() => {
        setTitle(product.title);
        setDescription(product.description);
        
        setImages(product.images);
        setContact(product.contact);
        setPrice(product.price);
    }, []);
    
    const handleSubmit = async (e) => {
        console.log('Images', images);
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('contact', contact);
        formData.append('price', price);
        formData.append('user', user);
        console.log(images)
        images.forEach((image) => {
            formData.append('images', image); // All files are appended under the same field name
        });
        try {
            const response = await axios.put(`http://localhost:3002/products/${productId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status === 200) {
                const action = 'UPDATE';
                navigate('/accounts', {state: action});
            } 
        } catch (error) {
            setTitle('');
            setDescription('');
            setImages([]);
            setContact('');
            setPrice('');
        }
    };

    return (
        <div className="container p-3">
            <div className="container p-5 mb-4 bg-light rounded-3">
                <h1 className="display-5">{header}</h1>
                <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: '400px' }}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label text-start w-100">Product Title:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label text-start w-100">Description:</label>
                        <input
                            type="textarea"
                            className="form-control"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="images" className="form-label text-start w-100">Images:</label>
                        <input
                            type="file"
                            className="form-control"
                            id="images"
                            accept="image/*"
                            onChange={(e) => {
                                setUpdatedImages(true)
                                setImages([...e.target.files])
                                }
                            }
                            multiple
                        />
                        <div>
                         {images.length > 0 && (
                            <div>
                                <ul>
                                    {
                                        updatedImages ? Array.from(images).map((image, index) => (
                                            <li key={index}>
                                                <p>File name: {image.name}</p>
                                            </li>
                                            )) :
                                            images.map((image, index) => (
                                                <li key={index}>
                                                    <p>File name: {image}</p>
                                                </li>
                                                ))           
                                    }
                                </ul>
                            </div>
                        )}
                        </div>
                        
                    </div>
                    <div className="mb-3">
                        <label htmlFor="contact" className="form-label text-start w-100">Contact Information:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="contact"
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="price" className="form-label text-start w-100">Price:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Submit</button>
                </form>
            </div>
        </div>
    )
}
export default UpdateForm;