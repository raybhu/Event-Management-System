/**
 * Event.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
module.exports = {
  attributes: {
    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    eventName: {
      type: 'string'
    },
    shortDescription: {
      type: 'string'
    },
    fullDescription: {
      type: 'string'
    },
    imageUrl: {
      type: 'string'
    },
    organizer: {
      type: 'string'
    },
    eventDate: {
      type: 'ref',
      columnType: 'datetime',
    },
    startTime: {
      type: 'string'
    },
    endTime: {
      type: 'string'
    },
    venue: {
      type: 'string'
    },
    quota: {
      type: 'number'
    },
    highlightedEvent: {
      type: 'boolean',
      defaultsTo: false
    },
    beRegister: {
      collection: 'User',
      via: 'registered',
    }
    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝
    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
  },
};
