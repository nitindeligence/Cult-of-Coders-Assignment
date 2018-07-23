import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Comments } from '/db';
import {Meteor} from 'meteor/meteor'
import { browserHistory } from 'react-router';
class PostListCount extends React.Component {
render() {
        const { history,noofcomments } = this.props;
       
             return (
             <div className="comm">
              {           
                <div>
                <p>Comments: {noofcomments} </p>
                </div>
                }
                 </div>
            );
        
       
    }
}


export default withTracker((props) => {
    const com=Meteor.subscribe('comments');
    return {
        noofcomments : Comments.find({postId:props.val}).count(),
        ...props    
    };
})(PostListCount);

