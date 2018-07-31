import React from 'react';
import { ReactiveVar } from 'meteor/reactive-var'
import { withTracker } from 'meteor/react-meteor-data';
//import {AutoForm,LongTextField,ErrorsField} from 'uniforms-unstyled';
//import CommentSchema from '/db/comments/schema';
import CommentList from './CommentList';
import {Meteor} from 'meteor/meteor';
import PropTypes from 'prop-types';
import CommentCreateBtn from './CommentCreateBtn';

class PostView extends React.Component {
    constructor() {
        super();
        this.state = {post: null};
        this.redirecttoPost.bind(this);
        this.redirectLogout.bind(this);
    }

    componentDidMount() {
        Meteor.call('secured.updateviews',this.props.match.params._id);//increase the view by one
    }

    redirecttoPost = () => {
        if(this.props.history)
            this.props.history.push('/posts');
    }

    redirectLogout = () => {
        if(this.props.history)
            Meteor.logout(() => this.props.history.push('/login'));
    }

    render() {
        const { post } = this.props;
        if(this.state.post){this.props.post = this.state.post;}
        if(!post){
            return <div>Loading....</div>
        }else{
            return(
                <div className="post">
                    {
                        post.map((post) => {
                            return(
                                <div key={post._id}>
                                    <p>Post id: {post._id} </p>
                                    <p>Type : { post.type}</p>
                                    <p>Post title:{post.title},Post Description:{post.description}</p>
                                    <p>Views : {post.views } </p>
                                    <p> Total Comments: {post.cmt ? post.cmt.length : 0}</p>
                                    <CommentCreateBtn  postId={post._id}/>
                                    <CommentList commentdata={post} />
                                    <button onClick={ this.redirecttoPost }>Back to listing </button>
                                    {Meteor.user() ? (<div><button onClick={ this.redirectLogout }>Logout</button></div>): ''}
                                </div>
                            )
                        })
                    }
                </div>
            )
        }
    }
}

PostView.propTypes = {
    history: PropTypes.object,
    post:PropTypes.array,
    postId:PropTypes.string,
    match: PropTypes.object,
    params: PropTypes.func,
    _id: PropTypes.string,
};

const pd = new ReactiveVar([]);
export default withTracker(props => {
    const handle = Meteor.subscribe('posts');
    Meteor.subscribe('comments');
    Meteor.call('secured.getPost',props.match.params._id,(err,post)=>{
        pd.set(post);
    })

    return {
        loading: !handle.ready(),
        post: pd.get(),
        ...props
    };
})(PostView);
