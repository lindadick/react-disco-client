import React from 'react';
import { Link } from 'react-router-dom';
import { ART_URL } from 'discoConfig';
import { Modal, ModalBody } from 'reactstrap';

export default class AlbumArt extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          modal: false
        };

        this.toggleModal = this.toggleModal.bind(this);
    }
    
    toggleModal() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    render() {
        let albumArtURL = ART_URL + "/" + this.props.id.toString().padStart(4, "0") + ".png"
        let extraClassNames = ""
        if (this.props.size === "large") {
            extraClassNames = "large-cover"
        } else {
            extraClassNames = "small-cover"
        }
        if (this.props.linkToAlbum) {
            return (
                <Link to={"/albumdetails/" + this.props.id} title="View album details">                
                    <img 
                        src={albumArtURL} 
                        alt="" 
                        className={extraClassNames + " img-thumbnail img-responsive img-fluid float-left mr-2"}
                    />
                </Link>
            )
        } else if (this.props.displayModal) {
            return (
                <React.Fragment>
                    <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                        <ModalBody toggle={this.toggleModal}>
                            <img 
                                onClick={this.toggleModal}
                                src={albumArtURL} 
                                alt="" 
                                className={"img-thumbnail img-responsive mx-auto d-block"}
                            />
                        </ModalBody>
                    </Modal>
                    <img 
                        onClick={this.toggleModal}
                        src={albumArtURL} 
                        alt="" 
                        className={extraClassNames + " img-thumbnail img-responsive img-fluid float-left mr-2"}
                    />
                </React.Fragment>                    
            )
        } else {
            return (
                <img 
                    src={albumArtURL} 
                    alt="" 
                    className={extraClassNames + " img-thumbnail img-responsive img-fluid float-left mr-2"}
                />
            )    
        }
    }
}