import PropTypes from 'prop-types';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

function Layout(props) {
    return (
        <>
            <Navbar/>
                <main>
                    {props.children}
                </main>
            <Footer/>
        </>
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired 
};

export default Layout;