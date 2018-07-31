import React from 'react';
import PropTypes from 'prop-types';
class PostViewBtn extends React.Component {
    constructor(...props) {
        super(...props);
        this.onClickView = this.onClickView.bind(this);
    }

    onClickView(){
        if(this.props)
            this.props.onClickViewPost(this.props.postId);
    }

    render()
    {
        return (
            <div>
                {
                    (<button  onClick={ this.onClickView }>View Details</button>)
                }
            
            </div>
        );
    }
}

PostViewBtn.propTypes = {
    onClickViewPost: PropTypes.func,
    postId:PropTypes.string,
};
export default PostViewBtn;
