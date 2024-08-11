function About() {
    return (
        <div className="container py-5">
            <div className="text-center mb-5">
                <h1 className="display-4 mb-4">About FS Marketplace</h1>
                <p className="lead text-muted">
                    Connecting university students for buying and selling used items, promoting sustainability, and saving money.
                </p>
            </div>

            <section className="my-5">
                <h2 className="text-center mb-4">Our Mission</h2>
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <p className="text-center">
                            At FS Marketplace, our goal is to facilitate the reuse of items within the university community. By providing a platform where students can easily buy and sell used goods, we aim to promote sustainability and help students save money.
                        </p>
                    </div>
                </div>
            </section>

            <section className="my-5">
                <h2 className="text-center mb-4">How It Works</h2>
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <p className="text-center">Using FS Marketplace is simple:</p>
                                <ol>
                                    <li>Register for an account using your university email address.</li>
                                    <li>Browse through listings to find items you need, or create your own listings to sell items you no longer need.</li>
                                    <li>Contact sellers or buyers through our secure messaging system to arrange for payment and pickup.</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="my-5">
                <h2 className="text-center mb-4">Benefits</h2>
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <ul className="list-unstyled text-center">
                                    <li className="my-3">
                                        <i className="bi bi-cash-coin h4"></i>
                                        <p>Save Money: Find great deals on used items.</p>
                                    </li>
                                    <li className="my-3">
                                        <i className="bi bi-clock h4"></i>
                                        <p>Convenience: Easily buy and sell within your university community.</p>
                                    </li>
                                    <li className="my-3">
                                        <i className="bi bi-recycle h4"></i>
                                        <p>Sustainability: Reduce waste by reusing items.</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="my-5">
                <h2 className="text-center mb-4">Contact Us</h2>
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <p className="text-center">
                            If you have any questions or feedback, feel free to reach out to us at <a href="mailto:support@fsmarketplace.com">support@fsmarketplace.com</a>.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default About;
