import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link, withRouter } from 'react-router-dom';
import { firestore } from '../../firebase/firebase.utils';
import SunEditor from 'suneditor-react';
import plugins from 'suneditor/src/plugins';
import image from 'suneditor/src/plugins/dialog/link';
import Hbone from '../../assets/Hbone.jpg'
import Hb2 from '../../assets/Hb2.jpg'
import Hb3 from '../../assets/Hb3.jpg'
import { setWisher } from '../../redux/actions'
import FormInput from '../../Components/form-input/form-input';
import CustomButton from '../../Components/custom-button/custom-button';
import { selectWisher } from '../../redux/selectors';
import loader from '../../assets/loader.gif';
import thanks from '../../assets/thanks.svg'

import 'suneditor/dist/css/suneditor.min.css';
import './WishHer.scss';
class WishHer extends Component {
    state = {
        name: '',
        wish: '',
        errorMessage: '',
        isLoading: false,
        selected: 'hb1'
    }
    handleSubmit = async (event) => {
        event.preventDefault();
        const { name, wish, selected } = this.state;
        const newTripRef = firestore.collection(`wishes`).doc();
        try {
            await newTripRef.set({ name, wish, selected });
            this.setState({ isLoading: true });
            this.setState({ name: '', wish: '', isLoading: false });
            this.props.setWisher({ name, wish })
        } catch (error) {
            console.log('Error Creating Trip', error.message);
        }
    };
    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
            errorMessage: '',
        });
    };
    handleChange(content) {
        this.setState({ body: content });
    }
    handleSelected = (selected) => {

        this.setState({ selected })
    }
    render() {
        const {
            name,
            wish,
            errorMessage,
            isLoading,
            selected
        } = this.state;
        return this.props.wisher ? (<div className="thanks">
            <img src={thanks} alt="Thank You" />
        </div>) : (
                <div className="wish">
                    <div>
                        {errorMessage !== '' ? (
                            <span className="error">{errorMessage}</span>
                        ) : null}
                        <span className="instruction">Please select a card</span>
                        <div className="hb-icons">
                            <div className={`${selected === "hb1" ? 'selected' : ''}  select`}>
                                <img src={Hbone} alt="HB icon" onClick={this.handleSelected.bind(this, 'hb1')} />
                            </div>
                            <div className={`${selected === "hb2" ? 'selected' : ''}  select`}>
                                <img src={Hb2} alt="HB icon" onClick={this.handleSelected.bind(this, 'hb2')} />
                            </div>
                            <div className={`${selected === "hb3" ? 'selected' : ''}  select`}>
                                <img src={Hb3} alt="HB icon" onClick={this.handleSelected.bind(this, 'hb3')} />
                            </div>
                        </div>
                        <form onSubmit={this.handleSubmit}>
                            <FormInput
                                type="name"
                                name="name"
                                value={name}
                                required
                                handleChange={this.handleInputChange}
                                label="Enter your name 🙂"
                            />
                            <SunEditor
                                onChange={this.handleChange}
                                enableToolbar={true}
                                showToolbar={true}
                                image={image}
                                show={true}
                                enable={true}
                                setOptions={{
                                    height: 100,
                                    plugins: plugins,
                                    buttonList: [
                                        ['undo', 'redo'],
                                        ['bold', 'italic', 'strike', 'subscript', 'superscript'],
                                        ['align', 'list'],
                                        ['blockquote'],
                                        ['outdent', 'indent'],
                                        ['link', 'image'],
                                        ['codeView'],
                                    ],
                                }}
                            />
                            {/* <div className="text-area">
                                <textarea
                                    required
                                    name="wish"
                                    value={wish}
                                    id=""
                                    onChange={this.handleChange}
                                    className={`${wish.length ? 'expand' : null}`}
                                    cols="100"
                                    rows="1"
                                ></textarea>
                                <label
                                    className={`${
                                        wish.length ? 'shrink' : ''
                                        } form-input-label`}
                                >
                                    Write your wish for her.
                  </label>
                            </div> */}
                            <div className="buttons">
                                <CustomButton type="button" onClick={this.handleSubmit}>
                                    Wish Her {isLoading ? <img src={loader} alt="Loader" /> : null}
                                </CustomButton>
                            </div>

                        </form>
                    </div>
                </div>
            );
    }
}
const mapStateToProps = createStructuredSelector({
    wisher: selectWisher
});
const mapDispatchToProps = (dispatch) => ({
    setWisher: (wisher) => dispatch(setWisher(wisher)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WishHer))