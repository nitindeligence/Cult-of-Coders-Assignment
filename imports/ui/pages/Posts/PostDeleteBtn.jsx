import React from 'react';
import PropTypes from 'prop-types';
class PostDeleteBtn extends React.Component {
    constructor(...props) {
        super(...props);
        this.onClickDelete = this.onClickDelete.bind(this);
    }

    onClickDelete(){
 
        if(this.props)
            this.props.onClickdeletePost(this.props.postId);
    }

    render()
    {
        return (
            <div>
                {
                    (<button onClick={ this.onClickDelete } type="button">Delete Post</button>)
                }
            </div>
        );
    }
}

PostDeleteBtn.propTypes = {
    postId: PropTypes.string,
    onClickdeletePost: PropTypes.func,
};
export default PostDeleteBtn;