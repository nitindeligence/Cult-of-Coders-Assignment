import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';
export default class Security {

    static checkRole(userId, role) {
        if (!this.hasRole(userId, role)) {
            throw new Meteor.Error('not-authorized');
        }
    }

    static hasRole(userId, role) {
        return Roles.userIsInRole(userId, role);
    }
    
    static checkLoggedIn(userId) {
        if (!userId) {
            throw new Meteor.Error('not-authorized', 'You are not authorized');
        }
    }
}