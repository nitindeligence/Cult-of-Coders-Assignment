import React from 'react';
import PropTypes from 'prop-types';
class PostEditBtn extends React.Component {
    constructor(...props) {
        super(...props);
        this.onClickEdit = this.onClickEdit.bind(this);
    }

    onClickEdit(){
        if(this.props)
            this.props.onClickEditPost(this.props.postId);
    }

    render()
    {
        return (
            <div>
                {
                    (<button onClick={ this.onClickEdit } type="button">Edit Post</button>)
                }
            </div>
        );
    }
}

PostEditBtn.propTypes = {
    onClickEditPost: PropTypes.func,
    postId:PropTypes.string,
};

export default PostEditBtn;