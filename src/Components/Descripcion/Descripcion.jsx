import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Descripcion.css";

const Descripcion = () => {
    return (
        <div className="container my-5">
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <a className="nav-link active" href="#description" data-bs-toggle="tab">Descripción</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#reviews" data-bs-toggle="tab">Opiniones (122)</a>
                </li>
            </ul>
            <div className="tab-content p-3 border">
                <div className="tab-pane fade show active" id="description">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Suspendisse commodo erat ut mi finibus aliquet.
                        Nam blandit lacus eget libero fringilla, varius egestas ex vulputate.
                        showcase their products, interact with customers, and conduct
                        Etiam sodales, ipsum sed gravida sagittis, sem eros mollis libero,
                        a vulputate urna nisl vulputate arcu. Fusce cursus ex eget dictum scelerisque.
                        Vestibulum varius eros a eros elementum feugiat.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Suspendisse commodo erat ut mi finibus aliquet.
                        Nam blandit lacus eget libero fringilla, varius egestas ex vulputate.
                        showcase their products, interact with customers, and conduct
                    </p>
                </div>
                <div className="tab-pane fade" id="reviews">
                </div>
            </div>
        </div>
    );
};

export default Descripcion;
