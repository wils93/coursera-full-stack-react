import React, { Component } from 'react';
import {
    Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button,
    Modal, ModalHeader, ModalBody, Label, Row, Col
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

function RenderDish({ dish }) {
    if (dish != null) {
        return (
            <FadeTransform in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }} >
                <Card key={dish.id}>
                    <CardImg width="100%" top src={baseUrl + dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
        );
    }
    else
        return (
            <div></div>
        );
}

function RenderComments({ comments, postComment, dishId }) {
    if (comments != null) {
        console.log(comments)
        return (
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    <Stagger in>
                        {comments.map((comment) => {
                            return (
                                <Fade in>
                                    <li>
                                        <p>{comment.comment}</p>
                                        <p>-- {comment.author},
                                            {new Intl.DateTimeFormat('en-US',
                                                { year: 'numeric', month: 'short', day: '2-digit' })
                                                .format(new Date(Date.parse(comment.date)))}
                                        </p>
                                    </li>
                                </Fade>
                            )
                        })}
                    </Stagger>
                </ul>
                <CommentForm dishId={dishId} postComment={postComment} />
            </div>
        )
    }
    else {
        return (
            <div></div>
        )
    }
}

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);
class CommentForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        console.log(values)
        this.props.postComment(this.props.dishId, values.rating, values.name, values.comment);
        this.toggleModal();
    }

    render() {
        return (
            <>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil"> Submit Comment</span>
                </Button>
                <Modal className="center" isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <div className="container">
                                <Row className="form-group">
                                    <Label htmlFor="rating">Rating</Label>
                                    <Control.select model=".rating" id="rating" className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="name">Your Name</Label>
                                    <Control.text model=".name" id="name" name="name"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{ required, minLength: minLength(3), maxLength: maxLength(15) }} />
                                    <Errors className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            required: "Required",
                                            minLength: "Must be greater than 2 characters",
                                            maxLength: "Must be 15 characters or less",
                                        }} />
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="comment">Comment</Label>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6"
                                        className="form-control" />
                                </Row>
                                <Button type="submit" color="primary">
                                    Submit
                                </Button>
                            </div>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </>
        );
    };
}

const DishDetail = (props) => {
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        )
    }
    else if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        )
    }
    else if (props.dish != null)
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <RenderComments comments={props.comments}
                        postComment={props.postComment}
                        dishId={props.dish.id} />
                </div>
            </div>
        );
    else {
        return (
            <div></div>
        )
    }
}

export default DishDetail;